
import surveiService from "../service/survei-service.js";
import { validateSurvei } from "../validation/survei-validation.js";
import { validate } from "../validation/validation.js";

const add = async (req, res, next) => {
    try {        
        const body = validate(validateSurvei, req.body)
        const userId = req.user.id;
        const result = await surveiService.addSurveiData(body, userId);
        res.status(200).json({
            error : false,
            data: result
        });
    } catch (e) {
        next(e); 
    }
};

const get = async (req, res, next) => {
    try {        
        const userId = req.user.id;
        const result = await surveiService.getSurveiData(userId);
        res.status(200).json({
            error : false,
            data: result
        });
    } catch (e) {
        next(e); 
    }
};


const getAll = async (req, res, next) => {
    try {
        
        const result = await surveiService.getAllSurveiData();
        res.status(200).json({
            error : false,
            data: result
        });
    } catch (e) {
        next(e); 
    }
};

export default {
    add,
    get,
    getAll
};
