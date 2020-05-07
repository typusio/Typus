import { Allow } from '@tsed/common';

export class EditValidationModel {
  @Allow() strict: boolean;
}
