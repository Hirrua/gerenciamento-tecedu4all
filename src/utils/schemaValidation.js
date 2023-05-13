import Joi from 'joi';

const userSchema = Joi.object({
    name: Joi.string().required().max(50),
    cpf: Joi.string().regex(/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/).required(),
    email: Joi.string().email().required().max(50),
    password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9@]{3,30}$")).max(8),
});


const estudanteSchema = Joi.object({
    name: Joi.string().required().max(50),
    image_profile: Joi.string().required().max(50),
    email: Joi.string().email().required().max(50),
    cpf: Joi.string().regex(/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/).required(),
    telephone: Joi.string().regex(/^\d{2}-\d{4,5}-\d{4}$/).required(),
    password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9@]{3,30}$")).max(8),
    status: Joi.boolean().required(),
});  


export {
    userSchema,
    estudanteSchema,
};