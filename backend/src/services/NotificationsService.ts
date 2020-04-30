import { Service } from '@tsed/di';
import { Form, Submission, Notifications } from '@prisma/client';
import { db } from '../Prisma';
import { mailgun } from '../Mailgun';

import fetch from 'node-fetch';

import * as fs from 'fs';
import * as ejs from 'ejs';
import * as path from 'path';

@Service()
export class NotificationsService {
  private emailTemplate = fs.readFileSync(path.join(__dirname, '..', 'views', 'emails', 'submission.ejs')).toString();

  private validateEmail(email: string) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  private validateUrl(url: string) {
    const res = url.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);

    return res != null;
  }

  private async handleEmails(notifications: Notifications, submission: Submission, form: Form) {
    const data = JSON.parse(submission.data);

    const addresses = notifications.emails
      .split(',')
      .map(e => e.trim())
      .filter(e => this.validateEmail(e))
      .join(', ');

    mailgun.messages().send({
      to: addresses,
      from: 'noreply@typus.io',
      subject: `New submission on form ${form.name}`,
      html: ejs.render(this.emailTemplate, { formName: form.name, data }),
    });
  }

  private async handleWebhooks(notifications: Notifications, submission: Submission, form: Form) {
    const urls = notifications.webhooks
      .split(',')
      .map(e => e.trim())
      .filter(e => this.validateUrl(e));

    const data = { form: form.id, user: submission.ipId, data: JSON.parse(submission.data), createdAt: submission.createdAt, spam: submission.spam };

    for (const url of urls) {
      await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
    }
  }

  async handleSubmission(form: Form, submission: Submission) {
    const notifications = await db.form.findOne({ where: { id: form.id } }).notifications();

    if (notifications!.emailsEnabled && notifications!.emails) await this.handleEmails(notifications!, submission, form);
    if (notifications!.webhooksEnabled && notifications!.webhooks) await this.handleWebhooks(notifications!, submission, form);
  }
}
