import { Router } from "express";
import httpStatus from "http-status";
import passengersRouter from "./passenger.router.js";
import citiesRouter from "./cities.routes.js";
import flightsRouter from "./flights.routes.js";
import travelsRouter from "./travels.routes.js";


const router = Router()

// app.get("/health", (req, res) => res.sendStatus(httpStatus.OK));
router.use(passengersRouter);
router.use(citiesRouter);
router.use(flightsRouter);
router.use(travelsRouter);


export default router;

