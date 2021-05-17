import { AppError } from "../../errors/AppError";
import { AuthenticateUserUseCase } from "../../modules/accounts/usecases/authenticateUser/AuthenticateUserUseCase";
import { CreateUserUseCase } from "../../modules/accounts/usecases/createUser/CreateUserUseCase"; //
import { FakeUsersRepository } from "../fakes/FakeUsersRepository";

let usersRepository: FakeUsersRepository;
let authenticateUserUseCase: AuthenticateUserUseCase;
let createUserUseCase: CreateUserUseCase;

describe("Authenticate User", () => {
  beforeEach(() => {
    usersRepository = new FakeUsersRepository();
    createUserUseCase = new CreateUserUseCase(usersRepository);
    authenticateUserUseCase = new AuthenticateUserUseCase(usersRepository);
  });

  it("Should be able to authenticate the user", async () => {
    const user = {
      name: "Test",
      email: "test@test.com",
      username: "test",
      password: "test",
      driver_license: "test",
    };
    await createUserUseCase.execute(user);

    const authentication = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password,
    });

    expect(authentication).toHaveProperty("token");
  });

  it("Should not be able to authenticate with wrong credentials", async () => {
    expect(async () => {
      const user = {
        name: "Test",
        email: "test@test.com",
        username: "test",
        password: "test",
        driver_license: "test",
      };
      await createUserUseCase.execute(user);

      await authenticateUserUseCase.execute({
        email: user.email,
        password: "wrong password",
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("Should not be able to authenticate with a non-existing user", async () => {
    expect(async () => {
      await authenticateUserUseCase.execute({
        email: "test@test.com",
        password: "test",
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
