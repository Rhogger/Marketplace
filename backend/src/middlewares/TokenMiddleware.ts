import SECRET_KEY from '../constants/SECRET_KEY';
import jwt from 'jsonwebtoken';

import { HttpResponse, ok, unauthorized } from '../core/infra/HttpResponse';
import { Middleware } from '../core/infra/Middleware';

type TokenMiddlewareRequest = {
  authorization: string
}

class TokenMiddleware implements Middleware {
  async handler({ authorization }: TokenMiddlewareRequest): Promise<HttpResponse> {
    return new Promise((resolve, reject) => {
      jwt.verify(authorization, SECRET_KEY, (error, user) => {
        if (error) {
          resolve(unauthorized({ name: 'Unauthorized', message: 'Token não é valido' }));
        } else {
          resolve(ok({ user: user }));
        }
      });
    });
  }
}

export default TokenMiddleware;
