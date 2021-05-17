import { Router } from "express";
import multer from "multer";

import { uploadConfig } from "@config/upload";
import { CreateCategoryController } from "@modules/cars/usecases/createCategory/CreateCategoryController";
import { ImportCategoryController } from "@modules/cars/usecases/importCategory/ImportCategoryController";
import { ListCategoriesController } from "@modules/cars/usecases/listCategories/ListCategoriesController";

const categoriesRoutes = Router();

const uploadCategoryMiddleware = multer(
  uploadConfig.upload("./tmp/uploads/categories")
);

const createCategoryController = new CreateCategoryController();
const listCategoriesController = new ListCategoriesController();
const importCategoryController = new ImportCategoryController();

categoriesRoutes.post("/", createCategoryController.handle);

categoriesRoutes.get("/", listCategoriesController.handle);

categoriesRoutes.post(
  "/import",
  uploadCategoryMiddleware.single("file"),
  importCategoryController.handle
);

export { categoriesRoutes };
