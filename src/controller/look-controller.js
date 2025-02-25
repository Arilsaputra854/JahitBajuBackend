import { ResponseError } from "../error/response-error.js";
import designerService from "../service/designer-service.js";
import lookService from "../service/look-service.js";
import { registerLookValidation, updateLookValidation } from "../validation/look-validation.js";
import { validate } from "../validation/validation.js";

const register = async (req, res, next) => {
  try {
    const body = validate(registerLookValidation, req.body);
    const result = await lookService.register(body);
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
    const { id } = req.query;    

    let result;
    if (id) {      
      result = await lookService.get(id);
    } else {
      result = await lookService.list();
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
    const { id } = req.query;
    const body = validate(updateLookValidation, req.body);
    const result = await lookService.update(id, body);
    res.status(200).json({ error: false, data: result });
  } catch (e) {
    next(e);
  }
};

const remove = async (req, res, next) => {
  try {
    const { id } = req.query;
    if(!id){
      throw new ResponseError(401,"look id is required.")
    }
    await designerService.remove(id);
    res.status(200).json({
      error: false,
      data: "look deleted successfully.",
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
