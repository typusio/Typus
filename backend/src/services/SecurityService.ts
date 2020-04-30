import { Service } from '@tsed/di';
import { Form, Security } from '@prisma/client';
import { db } from '../Prisma';

import { Request, Response } from 'express';

import fetch from 'node-fetch';
import { RenderService } from './RenderService';

@Service()
export class SecurityService {
  public constructor(private readonly renderService: RenderService) {}

  private async handleRecaptcha(security: Security, req: Request, res: Response) {
    if (!req.body['g-recaptcha-response']) {
      await this.renderService.renderError({ title: 'ReCaptcha Error', error: 'Please provide a recaptcha with your response' }, res, security.formId);

      return false;
    }

    const data = await fetch(
      `https://google.com/recaptcha/api/siteverify?secret=${encodeURIComponent(security.recaptchaSecret)}&response=${encodeURIComponent(
        req.body['g-recaptcha-response'],
      )}&remoteip=${encodeURIComponent((req.headers['x-forwarded-for'] || req.connection.remoteAddress) as string)}`,
    ).then(res => res.json());

    if (!data?.success) {
      await this.renderService.renderError(
        { title: 'ReCaptcha Error', error: 'The ReCaptcha provided was not accepted. Please try again.' },
        res,
        security.formId,
      );

      return false;
    }

    return true;
  }

  private async handleHoney(security: Security, req: Request, res: Response) {
    if (req.body[security.honey]) {
      // Render a fake success page so the bot dosent know that their request didnt go through
      await this.renderService.renderSuccess(res, security.formId);
      return false;
    }

    return true;
  }

  async handleSecurity(form: Form, req: Request, res: Response) {
    const security = await db.form.findOne({ where: { id: form.id } }).security();

    if (security!.honey) {
      if (!(await this.handleHoney(security!, req, res))) return false;
    }

    if (security!.recaptchaSecret !== '' && security!.recaptchaEnabled) {
      if (!(await this.handleRecaptcha(security!, req, res))) return false;
    }

    return true;
  }
}
