import Joi from "joi";

const createLookOrderValidation = Joi.object({
    look_id: Joi.string().max(100).required()
});

export {
    createLookOrderValidation,
}
