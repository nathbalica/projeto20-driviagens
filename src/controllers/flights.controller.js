import httpStatus from 'http-status';
import flightsService from "../services/flights.service.js"

const create = async (req, res) => {
    const { origin, destination, date } = req.body;
    
    const newFlight = await flightsService.createFlight(origin, destination, date);
    
    res.status(httpStatus.CREATED).json(newFlight);
};

export const flightsController = { create };