import { Allow } from '@tsed/common';

export class EditFormModel {
  @Allow() name: string;
}
