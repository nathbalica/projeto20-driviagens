import { Router } from "express";
import { passengerController } from "../controllers/passengers.controller.js";
import { validateSchema } from "../middlewares/validateSchema.middlewares.js";
import { passengerSchema } from "../schemas/schema.js"

const passengersRouter = Router();

passengersRouter.post("/passengers", validateSchema(passengerSchema), passengerController.create);
passengersRouter.get('/passengers/travels', passengerController.get);

export default passengersRouter;