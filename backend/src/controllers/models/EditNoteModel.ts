import { Required } from '@tsed/common';

export class EditNoteModel {
  @Required()
  note: string;
}
