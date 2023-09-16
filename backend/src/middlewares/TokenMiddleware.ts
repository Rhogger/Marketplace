import { NextFunction, Request, Response } from 'express';
import SECRET_KEY from '../constants/SECRET_KEY';
import jwt from 'jsonwebtoken';

class TokenMiddleware {
  static authenticate(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    const { authorization } = request.headers;

    jwt.verify(authorization as string, SECRET_KEY, (error, user) => {
      if (error) {
        response.status(401).json({
          message: 'Erro, token não autenticado!',
        });

        return;
      }

      request.body.user = user;

      next();
    });
  }
}

export default TokenMiddleware;
