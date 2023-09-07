import { Router } from "express";
import { validateSchema } from "../middlewares/validateSchema.middlewares.js";
import { flightSchema } from "../schemas/schema.js";

const flightsRouter = Router();

flightsRouter.post("/flights", validateSchema(flightSchema), flightsController.create);

export default flightsRouter;