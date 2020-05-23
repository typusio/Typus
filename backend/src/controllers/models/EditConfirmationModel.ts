import { Required, MaxLength, Email, Allow } from '@tsed/common';
import { isEmpty } from '@tsed/core';

export class EditConfirmationModel {
  @Allow()
  field: string;

  @Allow()
  subject: string;

  @Allow()
  body: string;

  @MaxLength(60)
  @Allow()
  fromName: string;

  @Allow()
  fromAddress: string;
}
