import httpStatus from 'http-status';
import flightsService from "../services/flights.service.js"

const create = async (req, res) => {
    const { origin, destination, date } = req.body;
    
    const newFlight = await flightsService.createFlight(origin, destination, date);
    
    res.status(httpStatus.CREATED).json(newFlight);
};

const get = async (req, res) => {
    const filters = {
        origin: req.query.origin,
        destination: req.query.destination,
        biggerDate: req.query['bigger-date'],
        smallerDate: req.query['smaller-date']
    };

    const flights = await flightsService.getFilteredFlights(filters);
    res.json(flights);
};


export const flightsController = { create, get };