import { Required, Email, MinLength } from '@tsed/common';

export class RegisterModel {
  @Required()
  @Email()
  email: string;

  @Required()
  @MinLength(1)
  password: string;
}
