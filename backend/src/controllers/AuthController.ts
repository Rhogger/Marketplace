import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import SECRET_KEY from '../constants/SECRET_KEY';
import * as http from '../core/infra/HttpResponse';

const user = new User();

class AuthController {
  static async signin({ username, password }: any): Promise<http.HttpResponse> {
    const userFinded = user.findUserByUsername(username);

    if (!userFinded) {
      return http.notAllowed('Usuário não encontrado');
    }

    if (!(await bcrypt.compare(password, userFinded.password))) {
      return http.notAllowed('Usuário ou senha incorreto.');
    }

    const token = jwt.sign({ id: userFinded.id, }, SECRET_KEY, { expiresIn: '1h' });

    return http.ok({ token });
  }

  static async signup({ username, password }: any): Promise<http.HttpResponse> {
    const userFinded = user.findUserByUsername(username);

    if (userFinded) {
      return http.notAllowed('Usuário já existe, tente outro Username.');
    }

    user.createUser({
      username,
      password,
    });

    return http.ok();
  }
}

export default AuthController;
