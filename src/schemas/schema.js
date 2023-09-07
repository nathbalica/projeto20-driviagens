import Joi from 'joi';

export const passengerSchema = Joi.object({
    firstName: Joi.string().min(2).max(100).required(),
    lastName: Joi.string().min(2).max(100).required()
});

export const citySchema = Joi.object({
    name: Joi.string().min(2).max(50).required()
});

export const flightSchema = Joi.object({
    origin: Joi.number().integer().required(),
    destination: Joi.number().integer().required(),
    date: Joi.string().pattern(/^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-\d{4}$/).required()
});

export const travelschema = Joi.object({
    passengerId: Joi.number().integer().required(),
    flightId: Joi.number().integer().required(),
});


