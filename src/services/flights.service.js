import dayjs from 'dayjs';
import * as flightsRepository from '../repositories/flights.repository.js';

export const createFlight = async (flightData) => {
    const { origin, destination, date } = flightData;

    if (origin === destination) {
        const error = new Error('Origin and destination cannot be the same.');
        error.type = 'ConflictError';
        throw error;
    }

    const originCity = await flightsRepository.findCityById(origin);
    const destinationCity = await flightsRepository.findCityById(destination);
    
    if (!originCity || !destinationCity) {
        const error = new Error('Origin or destination city not found.');
        error.type = 'ResourceNotFound';
        throw error;
    }

    const currentDate = dayjs(); // pega a data atual usando o Day.js
    const flightDate = dayjs(date, 'DD-MM-YYYY'); // formata a data usando o Day.js

    if (flightDate.diff(currentDate) <= 0) {
        const error = new Error('Flight date must be greater than the current date.');
        error.type = 'ValidationError';
        throw error;
    }

    return flightsRepository.createFlight(flightData);
};
