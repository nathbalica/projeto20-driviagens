import httpStatus from 'http-status';
import citiesService from "../services/cities.service.js"

async function create(req, res) {
    const { name } = req.body;
    const newCity = await citiesService.createCity(name);
    res.status(httpStatus.CREATED).json(newCity);
}

export const citiesController = { create };
