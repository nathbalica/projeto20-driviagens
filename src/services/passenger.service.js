import * as passengerRepository from '../repositories/passenger.repository.js';

const createPassenger = async (data) => {
    // Por exemplo: Verifique se o passageiro já existe
    const existingPassenger = await passengerRepository.findPassengerByNames(data.firstName, data.lastName);
    if (existingPassenger) {
        throw new Error('Passenger with the same names already exists');
    }

    return await passengerRepository.createPassenger(data.firstName, data.lastName);
}

export { createPassenger };
