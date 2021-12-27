import express from "express";
import logger from "./logger";
import { routes } from "./routes/router";

const app = express();

app.use(express.json());
app.use(routes);

app.listen(3000, () => logger.info("Server is running"));