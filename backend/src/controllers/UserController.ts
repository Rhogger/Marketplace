import { Request, Response } from 'express';

class UserController {
  static async open(request: Request, response: Response) {
    response.json({
      message: 'Usuário autenticado sucesso',
    });
  }
}

export default UserController;
