import { Router } from "express";

import { AuthenticateUserController } from "../modules/accounts/usecases/authenticateUser/AuthenticateUserController";

const authenticationRoutes = Router();

const authenticateUserController = new AuthenticateUserController();

authenticationRoutes.post("/sessions/store", authenticateUserController.handle);

export { authenticationRoutes };
