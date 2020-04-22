import { Required, MinLength } from '@tsed/common';

export class CreateRuleModel {
  @Required()
  @MinLength(1)
  field: string;

  @Required()
  validator: string;

  detail?: string;

  errorMessage?: string;
}
