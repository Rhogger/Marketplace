import bcrypt from 'bcrypt';

type UserProps = {
  id?: number;
  username: string;
  password: string;
};

class Users {
  private users: UserProps[] = [];

  async createUser(user: UserProps) {
    const pass = await this.hashPassword(user.password);

    //TODO: Atualizar para utilizar no PRISMA
    this.users.push({
      id: this.users.length + 1,
      username: user.username,
      password: pass,
    });
  }

  findUserByUsername(username: string) {
    return this.users.find((user: UserProps) => user.username == username);
  }

  findUserById(id: number) {
    return this.users.find((user: UserProps) => user.id == id);
  }

  allUsers() {
    return this.users;
  }

  async hashPassword(plainTextPassword: string) {
    const saltRounds = 12;

    try {
      const salt = await bcrypt.genSalt(saltRounds);

      const hashedPassword = await bcrypt.hash(plainTextPassword, salt);

      return hashedPassword;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

export default Users;
