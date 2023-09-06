import * as passengerService from '../services/passenger.service.js';
import httpStatus from 'http-status';

async function create(req, res){
    try {
        const passengerData = req.body;
        const newPassenger = await passengerService.createPassenger(passengerData);
        console.log(newPassenger)

        res.status(httpStatus.CREATED).json(newPassenger);
    } catch (error) {
        // Tratar erro diretamente no controller
        if (error.message.includes('already exists')) {
            res.status(httpStatus.CONFLICT).json({ message: error.message });
        } else {
            res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
        }
    }
};

export const passengerController = { create };
