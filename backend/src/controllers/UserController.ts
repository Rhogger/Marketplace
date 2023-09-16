import { users } from '../core/factories/controllers/UserFactory';
import * as http from '../core/infra/HttpResponse';

type RegisterRequest = {
  username: string;
  password: string;
}

type FindRequest = {
  id: number;
}

class UserController {
  static async register({ username, password }: RegisterRequest): Promise<http.HttpResponse> {
    const userFinded = users.findUserByUsername(username);

    if (userFinded) {
      return http.notAllowed('Usuário já existe, tente outro Username.');
    }

    users.createUser({
      username,
      password,
    });

    return http.created();
  }

  static async list(): Promise<http.HttpResponse> {
    return http.ok(users.allUsers());
  }

  static async find({ id }: FindRequest): Promise<http.HttpResponse> {
    const userFinded = users.findUserById(id);

    if (!userFinded) {
      return http.notFound('Usuário não encontrado');
    }

    return http.ok(userFinded);
  }
}

export default UserController;
