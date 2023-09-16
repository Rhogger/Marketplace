import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';

import User from '../models/User';
import SECRET_KEY from '../constants/SECRET_KEY';

const user = new User();

class AuthController {
  static async signin(request: Request, response: Response) {
    const { username, password } = request.body;

    const userFinded = user.findUserByUsername(username);

    if (!userFinded) {
      response.json({
        message: 'Usuário não encontrado',
      });

      return;
    }

    if (!(await bcrypt.compare(password, userFinded.password))) {
      response.json({
        message: 'Usuário ou senha incorreto.',
      });

      return;
    }

    const token = jwt.sign(
      {
        id: userFinded.id,
      },
      SECRET_KEY,
      {
        expiresIn: '1h',
      }
    );

    response.json({ token });
  }

  static async signup(request: Request, response: Response) {
    const { username, password } = request.body;

    const userFinded = user.findUserByUsername(username);

    if (userFinded) {
      response.json({
        message: 'Usuário já existe, tente outro Username.',
      });

      return;
    }

    user.createUser({
      username,
      password,
    });

    response.json({
      message: 'Usuário criado.',
    });
  }
}

export default AuthController;
