import { Router } from "express";

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { authenticationRoutes } from "./authentication.routes";
import { categoriesRoutes } from "./categories.routes";
import { specificationsRoutes } from "./specifications.routes";
import { usersRoutes } from "./users.routes";

const router = Router();

router.use("/categories/", ensureAuthenticated, categoriesRoutes);
router.use("/specifications/", ensureAuthenticated, specificationsRoutes);
router.use("/users/", usersRoutes);
router.use(authenticationRoutes);

export { router };
