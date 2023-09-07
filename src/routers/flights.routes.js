import { Router } from "express";
import { validateSchema } from "../middlewares/validateSchema.middlewares.js";
import { flightSchema } from "../schemas/schema.js";
import { flightsController } from "../controllers/flights.controller.js";

const flightsRouter = Router();

flightsRouter.post("/flights", validateSchema(flightSchema), flightsController.create);
flightsRouter.get("/flights", flightsController.get);

export default flightsRouter;