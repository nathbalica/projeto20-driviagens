import httpStatus from 'http-status';
import passengerService from "../services/passenger.service.js"
import { badRequestError } from '../errors/types.js';

async function create(req, res) {
    const { firstName, lastName} = req.body;

    const newPassenger = await passengerService.createPassenger(firstName, lastName);
    res.status(httpStatus.CREATED).json(newPassenger);
}

async function get(req, res){
    const { name } = req.query;
    // Capturando e validando o parâmetro de paginação
    const page = parseInt(req.query.page) || 1;
    if (isNaN(page) || page <= 0) {
        throw badRequestError("Invalid page value");
    }

    const passengers = await passengerService.getPassengerTravels(name, page);
    res.json(passengers.rows);
};

export const passengerController = { create, get };
