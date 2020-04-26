import { Controller, Get, Post, Res, Req, PathParams, MergeParams, QueryParams, Delete, BodyParams, UseBefore, Patch, Put } from '@tsed/common';
import { Request, Response } from 'express';
import { db } from '../Prisma';
import { IpService } from '../services/IpService';
import { NotFound, BadRequest } from 'ts-httpexceptions';
import { RequireAuth } from '../middleware/RequireAuth';
import { EditNoteModel } from './models/EditNoteModel';

import * as crypto from 'crypto';
import { ValidationService } from '../services/ValidationService';
import { UploadedFile } from 'express-fileupload';
import { RequireFormOwner } from '../middleware/RequireFormOwner';
import { ConfirmationService } from '../services/ConfirmationService';
import { RequireFormAccess } from '../middleware/RequireFormAccess';
import { hasFormAccess } from '../util/hasFormAccess';

@Controller('/:formId')
@MergeParams()
export class SubmissionController {
  public constructor(
    private readonly ipService: IpService,
    private readonly validationService: ValidationService,
    private readonly confirmationService: ConfirmationService,
  ) {}

  private async handleFiles(req: Request) {
    if (req.files) {
      for (const key of Object.keys(req.files)) {
        const file = req.files[key] as UploadedFile;

        let split = file.name.split('.');
        split[split.length - 1] = crypto.randomBytes(4).toString('hex') + '.' + split[split.length - 1];

        const path = split.join('.');

        await file.mv(`./uploads/${path}`);

        req.body[key] = `fileupload:${path}`;
      }
    }

    return req.body;
  }

  private async handleValidationError(req: Request, res: Response, field: string, error: string, formId: string) {
    if (req.headers['content-type']?.includes('application/json')) {
      return res.status(400).json({ message: 'validation error', field, error });
    }

    const appearance = await db.form.findOne({ where: { id: formId } }).appearance();

    if (appearance!.errorMode == 'Custom' && appearance!.errorCustomRedirect) {
      let url = appearance!.errorCustomRedirect;

      if (!url.includes('http')) url = `https://` + url;

      return res.redirect(url);
    }

    return res.render('validationerror', { error, appearance });
  }

  private async handleSuccess(req: Request, res: Response, origin: string, formId: string) {
    if (req.headers['content-type']?.includes('application/json')) {
      return res.status(201).json({ message: 'recieved successfully' });
    }

    const appearance = await db.form.findOne({ where: { id: formId } }).appearance();

    if (appearance!.successMode == 'Custom' && appearance!.successCustomRedirect) {
      let url = appearance!.successCustomRedirect;

      if (!url.includes('http')) url = `https://` + url;

      return res.redirect(url);
    }

    return res.render('success', { origin, appearance });
  }

  @Post('/')
  async create(@Req() req: Request, @PathParams('formId') formId: string, @Res() res: Response) {
    const ip = await this.ipService.find(req);
    const form = await db.form.findOne({ where: { id: formId } });

    if (!form) throw new NotFound('Form not found');

    const rules = await db.form
      .findOne({ where: { id: formId } })
      .validation()
      .rules();

    if (rules) {
      for (const rule of rules) {
        if (!this.validationService.meta[rule.validator].required && !req.body[rule.field]) continue;

        let result: boolean = await this.validationService.validators[rule.validator]({
          formId: form.id,
          field: rule.field,
          value: req.body[rule.field],
          detail: rule.detail ? rule.detail : '',
        });

        if (result == false) {
          return this.handleValidationError(
            req,
            res,
            rule.field,
            (rule.errorMessage ? rule.errorMessage : this.validationService.meta[rule.validator].defaultError)
              .replace('{field}', rule.field.charAt(0).toUpperCase() + rule.field.slice(1))
              .replace('{detail}', rule.detail ? rule.detail : '')
              .replace('{value}', req.body[rule.field]),
            form.id,
          );
        }
      }
    }

    req.body = await this.handleFiles(req);

    const submission = await db.submission.create({
      data: { data: JSON.stringify(req.body), form: { connect: { id: form.id } }, ip: { connect: { address: ip.address } } },
    });

    await this.handleSuccess(req, res, req.get('host')?.toString() ?? '', form.id);

    this.confirmationService.handleSubmission(form, submission);
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

      console.log(dbSubmission);

      if (!(await hasFormAccess(dbSubmission!.form.id, req.session!.user))) {
        throw new BadRequest('You must be the owner of these submissions to do this');
      }

      if (dbSubmission) await db.submission.delete({ where: { id: submission } });
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
}
