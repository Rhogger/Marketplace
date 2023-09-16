import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import SECRET_KEY from '../constants/SECRET_KEY';
import * as http from '../core/infra/HttpResponse';
import { users } from '../core/factories/controllers/UserFactory';

class AuthController {
  static async signin({ username, password }: any): Promise<http.HttpResponse> {
    const userFinded = users.findUserByUsername(username);

    if (!userFinded) {
      return http.notAllowed('Usuário não encontrado');
    }

    if (!(await bcrypt.compare(password, userFinded.password))) {
      return http.notAllowed('Usuário ou senha incorreto.');
    }

    const token = jwt.sign({ id: userFinded.id, }, SECRET_KEY, { expiresIn: '1h' });

    return http.ok({ token });
  }
}

export default AuthController;
