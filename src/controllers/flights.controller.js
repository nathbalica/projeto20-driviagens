import httpStatus from 'http-status';
import flightsService from "../services/flights.service.js"
import moment from 'moment';

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
    
    const formattedFlights = flights.rows.map(flight => {
        return {
            ...flight,
            date: moment(flight.date).format('DD-MM-YYYY')
        };
    });
    
    res.json(formattedFlights);
};

export const flightsController = { create, get };
