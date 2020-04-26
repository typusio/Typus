import { Required, MinLength, Allow } from '@tsed/common';

export class CreateRuleModel {
  @Required()
  @MinLength(1)
  field: string;

  @Required()
  validator: string;

  @Allow()
  detail?: string;

  @Allow()
  errorMessage?: string;
}
