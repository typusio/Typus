import { Required, Email, MinLength } from '@tsed/common';

export class LoginModel {
  @Required()
  email: string;

  @Required()
  password: string;
}
