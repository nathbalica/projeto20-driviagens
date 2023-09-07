import httpStatus from 'http-status';
import { incompleteDataError } from '../errors/types.js';
import travelsService from '../services/travels.service.js';

async function create(req, res) {
    const { passengerId, flightId } = req.body;

    if (!passengerId || !flightId) throw incompleteDataError()


    const travel = await travelsService.createTravels(passengerId, flightId);
    res.status(httpStatus.CREATED).json(travel);
}

export const travelsController = { create };