import * as cityRepository from '../repositories/cities.repository.js';

const createCity = async (cityData) => {
    const { name } = cityData;
    const existingCity = await cityRepository.findCityByName(name);

    if (existingCity) {
        throw new Error("City with this name already exists");
    }

    return cityRepository.createCity(name);
};

export { createCity };
