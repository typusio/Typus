import { Controller, Get, Post, Res, Req, PathParams, MergeParams, QueryParams, Delete, BodyParams, UseBefore, Patch, Put, Locals } from '@tsed/common';
import { Request, Response } from 'express';
import { db } from '../Prisma';
import { IpService } from '../services/IpService';
import { NotFound, BadRequest } from 'ts-httpexceptions';
import { RequireAuth } from '../middleware/RequireAuth';
import { EditNoteModel } from './models/EditNoteModel';

import * as crypto from 'crypto';
import { ValidationService } from '../services/ValidationService';
import { UploadedFile } from 'express-fileupload';
import { ConfirmationService } from '../services/ConfirmationService';
import { RequireFormAccess } from '../middleware/RequireFormAccess';
import { hasFormAccess } from '../util/hasFormAccess';
import { SecurityService } from '../services/SecurityService';
import { RenderService } from '../services/RenderService';
import { NotificationsService } from '../services/NotificationsService';
import { Submission, Form } from '@prisma/client';
import { ElasticService } from '../services/ElasticService';
import { elastic } from '../Elastic';

@Controller('/:formId')
@MergeParams()
export class SubmissionController {
  public constructor(
    private readonly ipService: IpService,
    private readonly validationService: ValidationService,
    private readonly confirmationService: ConfirmationService,
    private readonly securityService: SecurityService,
    private readonly renderService: RenderService,
    private readonly notificationsService: NotificationsService,
    private readonly elasticService: ElasticService,
  ) {}

  private async handleFiles(req: Request) {
    for (const key of Object.keys(req.files!)) {
      const file = req.files![key] as UploadedFile;

      let split = file.name.split('.');
      split[split.length - 1] = crypto.randomBytes(4).toString('hex') + '.' + split[split.length - 1];

      const path = split.join('.');

      await file.mv(`./uploads/${path}`);

      req.body[key] = `fileupload:${path}`;
    }

    return req.body;
  }

  private async handleSuccess(req: Request, res: Response, formId: string, submission: Submission) {
    if (req.headers['content-type']?.includes('application/json')) {
      return res.status(201).json({ message: 'recieved successfully' });
    }

    return this.renderService.renderSuccess(res, formId, submission);
  }

  private handleFields(form: Form, data: any) {
    for (const value of form.hiddenFields.split(',').map(f => f.trim())) {
      delete data[value];
    }

    for (const mapping of form.mappedFields
      .split(',')
      .map(f => f.trim())
      .map(f => f.split(':'))) {
      const value = data[mapping[0]];

      delete data[mapping[0]];

      data[mapping[1]] = value;
    }

    return data;
  }

  @Post('/')
  async create(@Req() req: Request, @PathParams('formId') formId: string, @Res() res: Response) {
    console.log(req.headers);

    const ip = await this.ipService.find(req);
    const form = await db.form.findOne({ where: { id: formId } });

    if (!form) throw new NotFound('Form not found');

    req.body = this.handleFields(form, req.body);

    if (req.files) {
      const size = Object.keys(req.files)
        .map(key => (req.files![key] as UploadedFile).size)
        .reduce((acc, curr) => acc + curr);

      if (size > 2.5e7) {
        return this.renderService.renderError({ title: 'Upload error', error: 'Your files must collectively be less then 25mb.' }, res, form.id);
      }

      req.body = await this.handleFiles(req);
    }

    if (!(await this.securityService.handleSecurity(form, req, res))) return;

    delete req.body['g-recaptcha-response'];

    if (!(await this.validationService.handleValidation(req, res, form))) return;

    const submission = await db.submission.create({
      data: { data: JSON.stringify(req.body), form: { connect: { id: form.id } }, ip: { connect: { address: ip.address } } },
    });

    await this.handleSuccess(req, res, form.id, submission);

    await this.elasticService.indexSubmission(submission, form);

    this.confirmationService.handleSubmission(form, submission);
    this.notificationsService.handleSubmission(form, submission);
  }

  @Get('/submissions')
  @UseBefore(RequireAuth, RequireFormAccess)
  async get(@PathParams('formId') formId: string, @QueryParams('perPage') perPage: number, @QueryParams('page', Number) page: number) {
    if (!perPage || (!page && page !== 0)) throw new BadRequest('Please include perPage and page');

    const form = await db.form.findOne({ where: { id: formId } });
    if (!form) throw new NotFound('Form not found');

    const submissions = await db.submission.findMany({ skip: perPage * page, first: perPage, where: { formId: form.id }, include: { ip: true, form: true } });

    return {
      submissions,
      total: await db.submission.count({ where: { formId: form.id } }),
    };
  }

  @Delete('/submissions')
  @UseBefore(RequireAuth)
  async delete(@Req() req: Request) {
    for (const submission of req.body.submissions as number[]) {
      const dbSubmission = await db.submission.findOne({ where: { id: submission }, include: { form: true } });

      if (!(await hasFormAccess(dbSubmission!.form.id, req.session!.user))) {
        throw new BadRequest('You must be the owner of these submissions to do this');
      }

      if (dbSubmission) {
        await db.submission.delete({ where: { id: submission } });
        await this.elasticService.deleteSubmission(submission);
      }
    }
  }

  @Patch('/:submissionId/note')
  @UseBefore(RequireAuth)
  async editNote(@BodyParams() { note }: EditNoteModel, @Req() req: Request, @PathParams('submissionId') submissionId: number) {
    const dbSubmission = await db.submission.findOne({ where: { id: submissionId }, include: { form: true } });

    if (!(await hasFormAccess(dbSubmission!.form.id, req.session!.user))) {
      throw new BadRequest('You must be the owner of this submission to do this');
    }

    const submission = await db.submission.update({ where: { id: submissionId }, data: { note } });

    return submission;
  }

  @Get('/:submissionId')
  @UseBefore(RequireAuth)
  async getSingular(@PathParams('submissionId') submissionId: number, @Req() req: Request) {
    const submission = await db.submission.findOne({ where: { id: submissionId }, include: { form: true, ip: true } });

    if (!submission) throw new NotFound('Form not found');

    if (!(await hasFormAccess(submission.form.id, req.session!.user))) {
      throw new BadRequest('You must be the owner of this submission to do this');
    }

    return submission;
  }

  @Put('/:submissionId/spam')
  @UseBefore(RequireAuth)
  async markAsSpam(@PathParams('submissionId') submissionId: number, @Req() req: Request) {
    const submission = await db.submission.findOne({ where: { id: submissionId }, include: { form: true, ip: true } });
    if (!submission) throw new NotFound('Form not found');
    if (!hasFormAccess(submission.form.id, req.session!.user)) throw new BadRequest('You must be the owner of this submission to do this');
    if (submission.spam) {
      await db.submission.update({ where: { id: submissionId }, data: { spam: false } });

      return 'spam_removed';
    }

    await db.submission.update({ where: { id: submissionId }, data: { spam: true } });

    return 'spam_added';
  }

  @Get('/search/:query')
  @UseBefore(RequireAuth, RequireFormAccess)
  async search(@PathParams('query') query: string, @Locals('form') form: Form) {
    const { body } = await elastic.search({ index: 'submissions', body: { query: { multi_match: { query, fields: ['data.*'], fuzziness: '1' } } } });
    const hits = body.hits.hits.sort((a: any, b: any) => a._score + b._score);

    const result = [];

    for (const hit of hits) {
      let submission = await db.submission.findOne({ where: { id: hit._source.id }, include: { ip: true, form: true } });
      if (!submission) continue;

      result.push(submission);
    }

    return result;
  }
}
