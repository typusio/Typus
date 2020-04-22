import { Required, MaxLength, Email } from '@tsed/common';
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

  fromAddress: string;
}
