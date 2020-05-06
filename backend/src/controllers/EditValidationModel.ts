import { Allow } from '@tsed/common';

export class EditValidationModel {
  @Allow() allowUnknown: boolean;
}
