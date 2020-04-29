import { Service } from '@tsed/di';
import { Request, Response } from 'express';
import { db } from '../Prisma';

@Service()
export class RenderService {
  async renderSuccess(res: Response, formId: string) {
    const appearance = await db.form.findOne({ where: { id: formId } }).appearance();

    if (appearance!.successMode == 'Custom' && appearance!.successCustomRedirect) {
      let url = appearance!.successCustomRedirect;

      if (!url.includes('http')) url = `https://` + url;

      return res.redirect(url);
    }

    return res.render('success', { appearance });
  }

  async renderError({ title, error }: { title: string; error: string }, res: Response, formId: string) {
    const appearance = await db.form.findOne({ where: { id: formId } }).appearance();

    if (appearance!.errorMode == 'Custom' && appearance!.errorCustomRedirect) {
      let url = appearance!.errorCustomRedirect;

      if (!url.includes('http')) url = `https://` + url;

      return res.redirect(url);
    }

    return res.render('error', { appearance, title, error });
  }
}
