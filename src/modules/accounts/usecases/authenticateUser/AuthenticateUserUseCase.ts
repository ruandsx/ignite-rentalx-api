import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import { authConfig } from "@config/auth";
import { AppError } from "@errors/AppError";
import { IAuthenticateUserDTO } from "@modules/accounts/dtos/IAuthenticateUserDTO";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";

interface IResponse {
  user: {
    name: string;
    email: string;
    username: string;
  };
  token: string;
}

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute({ email, password }: IAuthenticateUserDTO): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);
    if (!user) {
      throw new AppError("Incorrect email/password combination", 401);
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new AppError("Incorrect email/password combination", 401);
    }

    const token = sign({}, authConfig.jwt.secret, {
      subject: user.id,
      expiresIn: authConfig.jwt.expiresIn,
    });

    const response = {
      user: {
        name: user.name,
        email: user.email,
        username: user.username,
      },
      token,
    };

    return response;
  }
}

export { AuthenticateUserUseCase };
