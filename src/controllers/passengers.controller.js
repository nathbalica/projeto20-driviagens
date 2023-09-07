import httpStatus from 'http-status';
import passengerService from "../services/passenger.service.js"

async function create(req, res) {
    const { firstName, lastName} = req.body;

    const newPassenger = await passengerService.createPassenger(firstName, lastName);
    res.status(httpStatus.CREATED).json(newPassenger);
}

export const passengerController = { create };
