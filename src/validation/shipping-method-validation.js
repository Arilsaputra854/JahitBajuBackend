import Joi from "joi";

const validateShippingMethod = Joi.object({
  name: Joi.string().max(100).required(),
  price: Joi.number().positive().required(),
  img_url: Joi.string().max(100).required(),
  type: Joi.string().valid("REGULER", "INSTANT").max(100).required(),
});


const validateGetShippingMethod = Joi.object({
  total_weight: Joi.number().optional(),
  destination: Joi.string().optional(),
  origin: Joi.string().optional(),
});

const validateUpdateShippingMethod = Joi.object({
  id: Joi.string().max(100).required(),
  name: Joi.string().max(100).optional(),
  price: Joi.number().positive().optional(),
  img_url: Joi.string().max(100).optional(),
  type: Joi.string().valid("REGULER", "INSTANT").max(100).optional(),
});

export {
  validateShippingMethod,
  validateGetShippingMethod,
  validateUpdateShippingMethod,
};
