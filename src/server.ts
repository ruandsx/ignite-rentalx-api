import express, { Request, Response, NextFunction } from "express";
import { serve, setup } from "swagger-ui-express";

import "express-async-errors";
import "dotenv/config";
import "./database";
import "./shared/container";

import { AppError } from "./errors/AppError";
import { router } from "./routes";
import swaggerOptions from "./swagger.json";

const app = express();
app.use(express.json());
app.use("/docs", serve, setup(swaggerOptions));
app.use(router);

app.use(
  (error: Error, request: Request, response: Response, next: NextFunction) => {
    if (error instanceof AppError) {
      return response.status(error.statusCode).json({
        statusCode: error.statusCode,
        message: error.message,
        error: error.error,
      });
    }

    return response.status(500).json({
      message: error.message,
      statusCode: 500,
      error: "Internal Server Error",
    });
  }
);

app.listen(3333, () => console.log(`Server started at port ${3333}`));
