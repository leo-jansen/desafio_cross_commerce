import { Router } from "express";
import { EtlController } from "../controllers/EtlController";

const routes = Router();

routes.get("/", new EtlController().handle);

export { routes };