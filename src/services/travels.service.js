import * as travelsRepository from '../repositories/travels.repository.js';
import { notFoundError } from '../errors/types.js';

async function createTravels(passengerId, flightId){
    const existingPassenger = await travelsRepository.findPassengerById(passengerId);
    if (!existingPassenger) {
        throw notFoundError('Passenger');
    }

    const existingFlight = await travelsRepository.findFlightById(flightId);
    if (!existingFlight) {
        throw notFoundError('Flight');
    }

    return await travelsRepository.createTravel(passengerId, flightId);
}

const travelsService = {
    createTravels
}

export default travelsService;
