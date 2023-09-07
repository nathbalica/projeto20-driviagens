import * as flightService from '../services/flights.service.js';
import httpStatus from 'http-status';

const create = async (req, res, next) => {
    const flightData = req.body;
    
    const newFlight = await flightService.createFlight(flightData);
    
    res.status(httpStatus.CREATED).json(newFlight);
};

export const flightsController = { create };