import dayjs from 'dayjs';
import * as flightsRepository from '../repositories/flights.repository.js';
import { conflictError, notFoundError, incompleteDataError } from '../errors/types.js';

async function createFlight (origin, destination, date){

    if (origin === destination) {
        throw conflictError('Origin and destination');
    }

    const originCity = await flightsRepository.findCityById(origin);
    const destinationCity = await flightsRepository.findCityById(destination);
    
    if (!originCity || !destinationCity) {
        throw notFoundError('Origin or destination city');
    }

    const currentDate = dayjs(); // pega a data atual usando o Day.js
    const flightDate = dayjs(date, 'DD-MM-YYYY'); // formata a data usando o Day.js

    if (flightDate.diff(currentDate) <= 0) {
        throw incompleteDataError(); // Considerando que a data de voo anterior à atual é uma "incomplete data"
    }

    return flightsRepository.createFlight(origin, destination, date);
};

const flightsService = {
    createFlight
}

export default flightsService;
