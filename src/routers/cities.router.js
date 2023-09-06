import { Router } from "express";
import { citiesController } from "../controllers/cities.controller.js";
import { validateSchema } from "../middlewares/validateSchema.middlewares.js";
import { citySchema } from "../schemas/schema.js";

const citiesRouter = Router();

citiesRouter.post("/cities", validateSchema(citySchema), citiesController.create);

export default citiesRouter;
