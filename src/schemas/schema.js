import Joi from 'joi';

export const passengerSchema = Joi.object({
    firstName: Joi.string().min(2).max(100).required(),
    lastName: Joi.string().min(2).max(100).required()
});

export const citySchema = Joi.object({
    name: Joi.string().min(2).max(50).required()
});


