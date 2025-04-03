import productNoteService from "../service/product-note-service.js";
import { addNoteProductValidation, updateNoteProductValidation } from "../validation/product-note-validation.js";
import { validate } from "../validation/validation.js";
const add = async (req, res, next) => {

  try {
    const body = validate(addNoteProductValidation,req.body)
    const result = await productNoteService.add(body);
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
    const type = req.query.type
    var result
    if(type == 1){
      result = await productNoteService.getRtw();
    }else if (type == 2){
      result = await productNoteService.getCustome();
    }else{
      result = await productNoteService.getAll();
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
    const body = validate(updateNoteProductValidation,req.body)
    const result = await productNoteService.update(body);
    res.status(200).json({ error: false, data: result });
  } catch (e) {
    next(e);
  }
};

export default {
  add,
  get,
  update,
};