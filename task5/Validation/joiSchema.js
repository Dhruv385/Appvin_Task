const Joi = require('joi');

const userSchema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    age: Joi.number().integer().min(18).max(100).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    phoneNo: Joi.string().length(10).pattern(/^[0-9]+$/).required()
});

module.exports = userSchema;
