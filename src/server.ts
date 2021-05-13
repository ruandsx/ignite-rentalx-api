import express from "express";
import { serve, setup } from "swagger-ui-express";

import { router } from "./routes";
import swaggerOptions from "./swagger.json";

import "./database";

const app = express();
app.use(express.json());
app.use("/docs", serve, setup(swaggerOptions));
app.use(router);

app.listen(3333, () => console.log(`Server started at port ${3333}`));
