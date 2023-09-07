import httpStatus from 'http-status';
import passengerService from "../services/passenger.service.js"

async function create(req, res) {
    const { firstName, lastName} = req.body;

    const newPassenger = await passengerService.createPassenger(firstName, lastName);
    res.status(httpStatus.CREATED).json(newPassenger);
}

async function get(req, res){
    const { name } = req.query;
    const passengers = await passengerService.getPassengerTravels(name);
    res.json(passengers.rows);
};

export const passengerController = { create, get };
