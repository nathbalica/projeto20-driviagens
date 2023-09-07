import * as cityRepository from '../repositories/cities.repository.js';

const createCity = async (cityData) => {
    const { name } = cityData;
    const existingCity = await cityRepository.findCityByName(name);

    if (existingCity) {
       const error = new Error("City with this name already exists");
       error.type = "ConflictError";
       throw error;
    }

    return cityRepository.createCity(name);
};

export { createCity };
