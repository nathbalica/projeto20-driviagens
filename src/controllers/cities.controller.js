import * as cityService from '../services/cities.service.js';
import httpStatus from 'http-status';

async function create(req, res) {
    const cityData = req.body;
    const newCity = await cityService.createCity(cityData);
    res.status(httpStatus.CREATED).json(newCity);
}

export const citiesController = { create };
