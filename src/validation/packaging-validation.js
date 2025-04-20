import Joi from "joi";

const validatePostPackaging = Joi.object({
        name: Joi.string().max(100).required(),
        price: Joi.number().positive().required(),       
        description: Joi.string().max(100).required(),        
    });

const validateGetPackaging = Joi.object({
        id: Joi.string().max(100).required()    
    });


const validateUpdatePackaging = Joi.object({
    id : Joi.string().max(100).required(),
    name: Joi.string().max(100).optional(), 
    description: Joi.number().positive().optional(),
});



export {
    validatePostPackaging,
    validateGetPackaging,
    validateUpdatePackaging
};
