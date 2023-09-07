import dayjs from 'dayjs';
import * as flightsRepository from '../repositories/flights.repository.js';
import { conflictError, notFoundError, incompleteDataError, queryError } from '../errors/types.js';
import { dateValidationSchema } from "../schemas/schema.js"


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

async function getFilteredFlights(filters) {
    // Validando as datas.
    if (filters.biggerDate && filters.smallerDate) {
        if (dayjs(filters.smallerDate, 'DD-MM-YYYY').isAfter(dayjs(filters.biggerDate, 'DD-MM-YYYY'))) {
            throw badRequestError("smaller-date cannot be bigger than bigger-date");
        }
    }

    if ((!filters.biggerDate && filters.smallerDate) || (filters.biggerDate && !filters.smallerDate)) {
        throw queryError("Both bigger-date and smaller-date are required together.");
    }

    const validationResult = dateValidationSchema.validate({ biggerDate: filters.biggerDate, smallerDate: filters.smallerDate });

    if (validationResult.error) {
        throw queryError(validationResult.error.message);
    }

    // Buscando os voos após todas as validações.
    const results = await flightsRepository.getFilteredFlights(filters);

    // Se origin estiver definido no filtro e nenhum resultado for encontrado, retornar um array vazio.
    if (results.length === 0) {
        return [];
    }

    return results;
}


const flightsService = {
    createFlight,
    getFilteredFlights
}

export default flightsService;
