import * as cityRepository from '../repositories/cities.repository.js';
import { conflictError } from '../errors/types.js';

async function createCity(name){
    const existingCity = await cityRepository.findCityByName(name);

    if (existingCity) {
        throw conflictError('There is already a city with the same name.');
    }

    return cityRepository.createCity(name);
};

const citiesService = {
    createCity
}

export default citiesService;

