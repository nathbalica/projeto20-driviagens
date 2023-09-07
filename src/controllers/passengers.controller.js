import * as passengerService from '../services/passenger.service.js';
import httpStatus from 'http-status';

async function create(req, res, next) {
    const passengerData = req.body;
    const newPassenger = await passengerService.createPassenger(passengerData);
    res.status(httpStatus.CREATED).json(newPassenger);
}

export const passengerController = { create };
