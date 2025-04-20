import Joi from "joi";

const validateRequestForgotOtp = Joi.object({
        email : Joi.string().max(100).required(),
    });


const validateForgotOtp = Joi.object({
    email : Joi.string().max(100).required(),
    otp : Joi.string().required()
});


export{
    validateRequestForgotOtp,
    validateForgotOtp
}
