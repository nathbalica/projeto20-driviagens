import * as passengerRepository from '../repositories/passenger.repository.js';
import { conflictError, tooManyResultsError } from '../errors/types.js';


async function createPassenger(firstName, lastName){
    const existingPassenger = await passengerRepository.findPassengerByNames(firstName, lastName);

    if (existingPassenger) {
        throw conflictError("Passenger with the same names");
    }

    return await passengerRepository.createPassenger(firstName, lastName);
}

export const getPassengerTravels = async (name) => {
    const results = await passengerRepository.getPassengerTravels(name);

    if (results.length > 10) {
        throw tooManyResultsError();
    }

    return results;
};

const passengerService = {
    createPassenger,
    getPassengerTravels
  }

export default passengerService;