import Joi from "joi";

const validateSurvei = Joi.object({
    question_1: Joi.string().max(100).required(),
    question_2: Joi.string().max(100).required(),
    question_3: Joi.string().max(100).required(),
});


export {
    validateSurvei
};
