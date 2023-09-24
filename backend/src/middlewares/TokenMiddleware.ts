import SECRET_KEY from '../constants/SECRET_KEY';
import jwt from 'jsonwebtoken';
import { Middleware } from '../core/infra/Middleware';
import { HttpResponse, ok, unauthorized } from '../core/infra/HttpResponse';

type TokenMiddlewareRequest = {
  authorization: string;
};

class TokenMiddleware implements Middleware {
  async handler({ authorization }: TokenMiddlewareRequest): Promise<HttpResponse> {
    if (!authorization) {
      return unauthorized({
        name: 'Unauthorized',
        message: 'Token não é valido',
      })
    }
    const token = authorization.slice(7);

    return new Promise((resolve, reject) => {
      jwt.verify(token, SECRET_KEY, (error, user) => {
        if (error) {
          resolve(
            unauthorized({
              name: 'Unauthorized',
              message: 'Token não é valido',
            })
          );
        } else {
          resolve(ok({ user: user }));
        }
      });
    });
  }
}

export default TokenMiddleware;
