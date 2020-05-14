import { Required } from '@tsed/common';

export class CreateFieldModel {
  @Required()
  name: string;

  @Required()
  required: boolean;

  @Required()
  type: string;
}
