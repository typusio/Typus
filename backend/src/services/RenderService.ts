import { Service } from '@tsed/di';
import { Request, Response } from 'express';
import { db } from '../Prisma';
import { Submission } from '@prisma/client';

@Service()
export class RenderService {
  private formUrl(url: string, data: string, key: string) {
    if (!url.includes('http')) url = `https://` + url;

    if (url.includes('?')) return url + `&${key}=${encodeURIComponent(data)}`;
    return url + `?${key}=${encodeURIComponent(data)}`;
  }

  async renderSuccess(res: Response, formId: string, submission?: Submission) {
    const appearance = await db.form.findOne({ where: { id: formId } }).appearance();

    if (appearance!.successMode == 'Custom' && appearance!.successCustomRedirect) {
      return res.redirect(this.formUrl(appearance!.successCustomRedirect, submission!.data, 'data'));
    }

    return res.render('success', { appearance });
  }

  async renderError({ title, error }: { title: string; error: string }, res: Response, formId: string) {
    const appearance = await db.form.findOne({ where: { id: formId } }).appearance();

    if (appearance!.errorMode == 'Custom' && appearance!.errorCustomRedirect) {
      return res.redirect(this.formUrl(appearance!.successCustomRedirect, error, 'error'));
    }

    return res.render('error', { appearance, title, error });
  }
}
