import { HttpResponse, ok } from '../core/infra/HttpResponse';

class UserController {
  static async open(): Promise<HttpResponse> {
    return ok({ message: 'Usuário autenticado sucesso' })
  }
}

export default UserController;
