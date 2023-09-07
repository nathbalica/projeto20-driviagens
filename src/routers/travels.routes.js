import { Router } from "express";
import { validateSchema } from "../middlewares/validateSchema.middlewares.js";
import { travelschema } from "../schemas/schema.js";
import { travelsController } from "../controllers/travels.controller.js";

const travelsRouter = Router();

travelsRouter.post("/travels", validateSchema(travelschema), travelsController.create);

export default travelsRouter;