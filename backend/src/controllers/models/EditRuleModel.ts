import { Required, Allow } from '@tsed/common';

export class EditRuleModel {
  @Required()
  field: string;

  @Allow()
  detail?: string;

  @Allow()
  errorMessage?: string;
}
