import { ICreateUserDTO } from "../../modules/accounts/dtos/ICreateUserDTO";
import { User } from "../../modules/accounts/entities/User";
import { IUsersRepository } from "../../modules/accounts/repositories/IUsersRepository";

class FakeUsersRepository implements IUsersRepository {
  users: User[] = [];

  async create({
    name,
    username,
    email,
    password,
    driver_license,
    avatar,
  }: ICreateUserDTO): Promise<void> {
    const user = new User();

    Object.assign(user, {
      name,
      username,
      email,
      password,
      driver_license,
      avatar,
    });

    this.users.push(user);
  }

  async findById(id: string): Promise<User> {
    const user = this.users.find((user) => user.id === id);
    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const user = this.users.find((user) => user.email === email);
    return user;
  }

  async findByUsername(username: string): Promise<User> {
    const user = this.users.find((user) => user.username === username);
    return user;
  }

  async findByDriverLicense(driver_license: string): Promise<User> {
    const user = this.users.find(
      (user) => user.driver_license === driver_license
    );
    return user;
  }
}

export { FakeUsersRepository };
