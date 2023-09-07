import * as passengerRepository from '../repositories/passenger.repository.js';

const createPassenger = async (data) => {
    // Por exemplo: Verifique se o passageiro já existe
    const existingPassenger = await passengerRepository.findPassengerByNames(data.firstName, data.lastName);
    if (existingPassenger) {
        const error = new Error('Passenger with the same names already exists');
        error.type = "ConflictError";
        throw error;
    }

    return await passengerRepository.createPassenger(data.firstName, data.lastName);
}

export { createPassenger };
