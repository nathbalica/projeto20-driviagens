import moment from 'moment';
import * as flightsRepository from '../repositories/flights.repository.js';
import { conflictError, notFoundError, incompleteDataError, queryError } from '../errors/types.js';
import { dateValidationSchema } from "../schemas/schema.js"


async function createFlight (origin, destination, date) {
    if (origin === destination) {
        throw conflictError('Origin city and destination city are the same.');
    }

    const originCity = await flightsRepository.findCityById(origin);
    const destinationCity = await flightsRepository.findCityById(destination);
    
    if (!originCity || !destinationCity) {
        throw notFoundError('Origin city or destination city not found!');
    }

    const currentDate = moment();  // Mantenha isso como um objeto moment
    const flightDate = moment(date, 'DD-MM-YYYY'); 

    if (flightDate.isSameOrBefore(currentDate)) {  // Verifique se a flightDate é a mesma ou anterior à currentDate
        throw incompleteDataError(); 
    }
    
    return flightsRepository.createFlight(origin, destination, date);
};

async function getFilteredFlights(filters) {
    const validationResult = dateValidationSchema.validate({ 
        biggerDate: filters.biggerDate, 
        smallerDate: filters.smallerDate 
    });

    if (validationResult.error) {
        throw queryError(validationResult.error.message);
    }

    if (filters.biggerDate && filters.smallerDate) {
        const biggerDateFormatted = moment(filters.biggerDate, 'DD-MM-YYYY').format('YYYY-MM-DD');
        const smallerDateFormatted = moment(filters.smallerDate, 'DD-MM-YYYY').format('YYYY-MM-DD');
        
        if (moment(smallerDateFormatted).isAfter(biggerDateFormatted)) {
            throw badRequestError("smaller-date cannot be after bigger-date");
        }
        
        filters.biggerDate = biggerDateFormatted;
        filters.smallerDate = smallerDateFormatted;
    } else if ((!filters.biggerDate && filters.smallerDate) || (filters.biggerDate && !filters.smallerDate)) {
        throw queryError("Both bigger-date and smaller-date are required together.");
    }

    return await flightsRepository.getFilteredFlights(filters);
}

const flightsService = {
    createFlight,
    getFilteredFlights
}

export default flightsService;
