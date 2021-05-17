import { Router } from "express";
import multer from "multer";

import { uploadConfig } from "@config/upload";
import { ensureAuthenticated } from "@middlewares/ensureAuthenticated";
import { CreateUserController } from "@modules/accounts/usecases/createUser/CreateUserController";
import { UpdateUserAvatarController } from "@modules/accounts/usecases/updateUserAvatar/UpdateUserAvatarController";

const usersRoutes = Router();

const uploadAvatarMiddleware = multer(
  uploadConfig.upload("./tmp/uploads/avatar")
);

const createUserController = new CreateUserController();
const updateUserAvatarController = new UpdateUserAvatarController();

usersRoutes.post("/", createUserController.handle);
usersRoutes.patch(
  "/avatar",
  ensureAuthenticated,
  uploadAvatarMiddleware.single("avatar"),
  updateUserAvatarController.handle
);

export { usersRoutes };
