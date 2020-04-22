import { Service } from '@tsed/di';
import { Form, Submission, Confirmation } from '@prisma/client';
import { db } from '../Prisma';
import { mailgun } from '../Mailgun';

@Service()
export class ConfirmationService {
  private generateFrom(confirmation: Confirmation) {
    return `${confirmation.fromName ? confirmation.fromName : 'Tumble Confirmation'} <${
      confirmation.fromAddress ? confirmation.fromAddress : 'noreply@tumble.com'
    }>`;
  }

  async handleSubmission(form: Form, submission: Submission) {
    const confirmation = await db.form.findOne({ where: { id: form.id } }).confirmation();

    if (!confirmation) return;
    if (!confirmation.field || !confirmation.subject || !confirmation.body) return;

    const field = JSON.parse(submission.data)[confirmation.field];
    if (!field) return;

    await mailgun.messages().send({ from: this.generateFrom(confirmation), to: field, subject: confirmation.subject, html: confirmation.body });
  }
}
