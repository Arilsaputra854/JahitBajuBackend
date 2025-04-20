import { ResponseError } from "../error/response-error.js";
import textureService from "../service/texture-service.js";
import { registerTextureValidation, updateTextureValidation } from "../validation/texture-validation.js";
import { validate } from "../validation/validation.js";

const register = async (req, res, next) => {
  try {
    const body = validate(registerTextureValidation, req.body);
    const result = await textureService.register(body);
    res.status(200).json({
      error: false,
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const get = async (req, res, next) => {
  try {
    const  id  = req.query.id;    

    let result;
    if (id) {      
      result = await textureService.get(id);
    } else {
      result = await textureService.list();
    }
    res.status(200).json({
      error: false,
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const update = async (req, res, next) => {
  try {
    const id = req.query.id;
    const body = validate(updateTextureValidation, req.body);
    const result = await textureService.update(id, body);
    res.status(200).json({ error: false, data: result });
  } catch (e) {
    next(e);
  }
};

const remove = async (req, res, next) => {
  try {
    const id = req.query.id;
    if(!id){
      throw new ResponseError(401,"texture id is required.")
    }
    await textureService.remove(id);
    res.status(200).json({
      error: false,
      data: "texture deleted successfully.",
    });
  } catch (e) {
    next(e);
  }
};

export default {
  register,
  get,
  update,
  remove,
};
