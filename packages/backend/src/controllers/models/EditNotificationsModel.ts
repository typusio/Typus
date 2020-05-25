import { Allow } from '@tsed/common';

export class EditNotificationsModel {
  @Allow()
  emailsEnabled: boolean;

  @Allow()
  emails: string;

  @Allow()
  webhooksEnabled: boolean;

  @Allow()
  webhooks: string;
}
