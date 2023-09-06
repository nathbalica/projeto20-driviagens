import { Router } from "express";
import httpStatus from "http-status";
import passengersRouter from "./passenger.router.js";
import citiesRouter from "./cities.router.js";

const router = Router()

// app.get("/health", (req, res) => res.sendStatus(httpStatus.OK));
router.use(passengersRouter);
router.use(citiesRouter);

export default router;

