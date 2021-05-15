import { hash } from "bcrypt";
import { inject, injectable } from "tsyringe";

import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { IUsersRepository } from "../../repositories/IUsersRepository";

@injectable()
class CreateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute({
    name,
    email,
    username,
    password,
    driver_license,
  }: ICreateUserDTO): Promise<void> {
    const userWithSameEmail = await this.usersRepository.findByEmail(email);
    if (userWithSameEmail) {
      throw new Error("Email already in use");
    }
    const userWithSameUsername = await this.usersRepository.findByUsername(
      username
    );
    if (userWithSameUsername) {
      throw new Error("Username already in use");
    }
    const userWithSameDriverLicense = await this.usersRepository.findByDriverLicense(
      driver_license
    );
    if (userWithSameDriverLicense) {
      throw new Error("Driver license already in use");
    }

    const passwordHash = await hash(password, 12);
    await this.usersRepository.create({
      name,
      email,
      username,
      password: passwordHash,
      driver_license,
    });
  }
}

export { CreateUserUseCase };
