import { Required, MaxLength, Email, Allow } from '@tsed/common';
import { isEmpty } from '@tsed/core';

export class EditConfirmationModel {
  @Required()
  field: string;

  @Required()
  subject: string;

  @Required()
  body: string;

  @MaxLength(60)
  fromName: string;

  @Allow()
  fromAddress: string;
}
