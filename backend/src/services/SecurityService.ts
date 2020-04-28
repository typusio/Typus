import { Service } from '@tsed/di';
import { Form, Security } from '@prisma/client';
import { db } from '../Prisma';

import { Request, Response } from 'express';

import fetch from 'node-fetch';

@Service()
export class SecurityService {
  private async handleRecaptcha(security: Security, req: Request, res: Response) {
    if (!req.body['g-recaptcha-response']) {
      const appearance = await db.form.findOne({ where: { id: security.formId } }).appearance();

      return res.render('error', { title: 'ReCaptcha Error', body: 'Please provide a recaptcha with your response', appearance });
    }

    const data = await fetch(
      `https://google.com/recaptcha/api/siteverify?secret=${encodeURIComponent(security.recaptchaSecret)}&response=${encodeURIComponent(
        req.body['g-recaptcha-response'],
      )}&remoteip=${encodeURIComponent((req.headers['x-forwarded-for'] || req.connection.remoteAddress) as string)}`,
    ).then(res => res.json());

    console.log(data);

    return false;
  }

  private async handleHoney() {
    // todo
    return true;
  }

  async handleSecurity(form: Form, req: Request, res: Response) {
    const security = await db.form.findOne({ where: { id: form.id } }).security();

    if (security!.recaptchaSecret !== '') {
      const result = await this.handleRecaptcha(security!, req, res);
    }
  }
}
