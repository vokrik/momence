//Importing project dependancies that we installed earlier
import * as dotenv from "dotenv";
import apidoc from "./apidoc";
import errorHandlerMiddleware from "./errorHandlerMiddleware";
import express from "express";
import swaggerUi from "swagger-ui-express";
import cors from "cors";
import helmet from "helmet";

import { router as exchangeRatesRouter } from "./exchangeRates";
import YAML from "yamljs";

dotenv.config();

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use("/api/api-docs", swaggerUi.serve, swaggerUi.setup(apidoc));
app.use("/api/exchange-rates/", exchangeRatesRouter);

app.use(errorHandlerMiddleware);
export default app;
