import { Allow } from '@tsed/common';

export class EditSubmissionModel {
  @Allow()
  note: string;

  @Allow()
  spam: boolean;

  @Allow()
  data: string;
}
