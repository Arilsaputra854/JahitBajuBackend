import Joi from "joi"


const registerUserValidation = Joi.object({
    email : Joi.string().max(100).required(),
    password : Joi.string().max(100).required(),
    name : Joi.string().max(100).required(),
    phone_number : Joi.string().max(100),
    address : Joi.string().max(100),
    img_url : Joi.string().max(100)
})


const loginUserValidation = Joi.object({
    email : Joi.string().max(100).required(),
    password : Joi.string().max(100).required()
})

const getUserValidation = Joi.string().max(100).required()

const updateUserValidation = Joi.object({
    email: Joi.string().email().max(100).optional(),
    password: Joi.string().max(100).optional(),
    name: Joi.string().max(100).optional(),
    phone_number: Joi.string().max(100).optional(),
    address: Joi.string().max(100).optional(),
    img_url: Joi.string().uri().max(100).optional()
}).min(1); 

export{
    registerUserValidation,
    loginUserValidation,
    getUserValidation,
    updateUserValidation
}