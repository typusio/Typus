import { Middleware, IMiddleware, Req } from '@tsed/common';
import { Forbidden, Unauthorized } from 'ts-httpexceptions';

import { Request } from 'express';

@Middleware()
export class RequireAuth implements IMiddleware {
  public use(@Req() request: Request) {
    if (!request.session?.user) {
      throw new Unauthorized('You must be logged in to do this');
    }

    return;
  }
}
