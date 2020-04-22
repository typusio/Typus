import { Required, MinLength, MaxLength } from '@tsed/common';

export class CreateFormModel {
  @Required()
  @MinLength(2)
  @MaxLength(50)
  name: string;
}
