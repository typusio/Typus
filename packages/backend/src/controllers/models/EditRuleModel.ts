import { Required, Allow } from '@tsed/common';

export class EditRuleModel {
  @Allow()
  field: string;

  @Allow()
  detail?: string;

  @Allow()
  errorMessage?: string;
}
