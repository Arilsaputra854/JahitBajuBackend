
import customizationAccessService from "../service/customization-access-service.js";
import { 
  createCustomizationAccessValidation, 
  updateCustomizationAccessValidation 
} from "../validation/customization-access-validation.js";
import { validate } from "../validation/validation.js";

const register = async (req, res, next) => {
  try {
    const body = validate(createCustomizationAccessValidation, req.body);
    const result = await customizationAccessService.register(body);
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
    const result = await customizationAccessService.get();
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
    const body = validate(updateCustomizationAccessValidation, req.body);
    const result = await customizationAccessService.update(body);
    res.status(200).json({ error: false, data: result });
  } catch (e) {
    next(e);
  }
};

export default {
  register,
  get,
  update,
};
