import Joi from "joi";

const addNoteProductValidation = Joi.object({
    data: Joi.string().required(),
    type: Joi.number().max(2).required(),
});

const updateNoteProductValidation = Joi.object({
    id : Joi.string().required(),
    data: Joi.string().required(),
});




export {
    updateNoteProductValidation,
    addNoteProductValidation
};
