import * as cityService from '../services/cities.service.js';
import httpStatus from 'http-status';

async function create(req, res) {
    try {
        const cityData = req.body;
        const newCity = await cityService.createCity(cityData);

        res.status(httpStatus.CREATED).json(newCity);
    } catch (error) {
        // Tratar erro diretamente no controlador
        if (error.message.includes('already exists')) {
            res.status(httpStatus.CONFLICT).json({ message: error.message });
        } else {
            res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
        }
    }
}

export const citiesController = { create };
