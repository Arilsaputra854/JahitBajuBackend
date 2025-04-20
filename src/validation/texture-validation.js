import Joi from "joi";

const registerTextureValidation = Joi.object({
  look_id: Joi.string().max(100).required(),
  title: Joi.string().max(100).required(),
  url_texture: Joi.string().uri().optional(),
  hex: Joi.string()
    .pattern(/^#[0-9A-Fa-f]{6}$/)
    .optional(),
  description: Joi.string().max(1000).required(),
  looks: Joi.array()
    .items(
      Joi.object({
        id: Joi.number().integer().optional(),
        look_id: Joi.number().integer().optional(),
        texture_url: Joi.string().uri().required(),
      })
    )
    .optional(),
}).xor("hex", "url_texture");

const updateTextureValidation = Joi.object({
  title: Joi.string().max(100).optional(),
  url_texture: Joi.string().uri().optional(),
  hex: Joi.string()
    .pattern(/^#[0-9A-Fa-f]{6}$/)
    .optional(),
  description: Joi.string().max(1000).required(),
  looks: Joi.array()
    .items(
      Joi.object({
        id: Joi.number().integer().optional(),
        look_id: Joi.number().integer().optional(),
        texture_url: Joi.string().uri().optional(),
      })
    )
    .optional(),
}).xor("hex", "url_texture");

export { registerTextureValidation, updateTextureValidation };
