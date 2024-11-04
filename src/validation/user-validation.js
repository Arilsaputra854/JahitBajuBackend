import Joi from "joi"


const registerUserValidation = Joi.object({
    id : Joi.string().max(100).required(),
    password : Joi.string().max(100).required(),
    name : Joi.string().max(100).required(),
    phone_number : Joi.string().max(100),
    address : Joi.string().max(100),
    img_url : Joi.string().max(100)
})


const loginUserValidation = Joi.object({
    id : Joi.string().max(100).required(),
    password : Joi.string().max(100).required()
})

const getUserValidation = Joi.string().max(100).required()

export{
    registerUserValidation,
    loginUserValidation,
    getUserValidation
}