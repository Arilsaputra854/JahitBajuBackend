import designerService from "../service/designer-service.js";
import { validate } from "../validation/validation.js";
import { registerDesignerValidation, getDesignerValidation, updateDesignerValidation } from "../validation/designer-validation.js";

const register = async (req, res, next) => {
  try {
    validate(registerDesignerValidation, req.body);
    const result = await designerService.register(req.body);
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
      validate(getDesignerValidation, id);
      result = await designerService.get(id);
    } else {
      result = await designerService.list();
    }
    res.status(200).json({
      error: false,
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const getLatest = async (req, res, next) => {
  try {
    const result = await designerService.getByLastUpdate();
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
    validate(updateDesignerValidation, req.body);
    const result = await designerService.update(id, req.body);
    res.status(200).json({ error: false, data: result });
  } catch (e) {
    next(e);
  }
};

const remove = async (req, res, next) => {
  try {
    const { id } = req.query;
    await designerService.remove(id);
    res.status(200).json({
      error: false,
      data: "Designer deleted successfully",
    });
  } catch (e) {
    next(e);
  }
};

export default {
  register,
  get,
  getLatest,
  update,
  remove,
};
