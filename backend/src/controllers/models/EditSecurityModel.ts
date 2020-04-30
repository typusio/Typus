import { Allow } from '@tsed/common';

export class EditSecurityModel {
  @Allow()
  recaptchaEnabled: boolean;

  @Allow()
  recaptchaSecret: string;

  @Allow()
  honey: string;

  @Allow()
  allowedDomains: string;
}
