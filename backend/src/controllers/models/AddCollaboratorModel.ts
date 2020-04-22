import { Required, Email } from '@tsed/common';

export class AddCollaboratorModel {
  @Required()
  @Email()
  email: string;
}
