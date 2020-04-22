import { MinItems, Required } from '@tsed/common';

export class DeleteSubmissionsModel {
  @MinItems(1)
  @Required()
  submissions: number[];
}
