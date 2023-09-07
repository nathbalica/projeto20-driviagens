import * as passengerRepository from '../repositories/passenger.repository.js';
import { conflictError } from '../errors/types.js';

async function createPassenger(firstName, lastName){
    const existingPassenger = await passengerRepository.findPassengerByNames(firstName, lastName);

    if (existingPassenger) {
        throw conflictError("Passenger with the same names");
    }

    return await passengerRepository.createPassenger(firstName, lastName);
}

const passengerService = {
    createPassenger
  }

export default passengerService;