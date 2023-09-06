import { Router } from "express";
import { passengerController } from "../controllers/passengers.controller.js";
import { validateSchema } from "../middlewares/validateSchema.middlewares.js";
import passengerSchema from "../schemas/passenger.schema.js";

const passengersRouter = Router();

passengersRouter.post("/passengers", validateSchema(passengerSchema), passengerController.create);

export default passengersRouter;