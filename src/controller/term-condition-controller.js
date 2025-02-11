
import termConditionService from "../service/term-condition-service.js";

const add = async (req, res, next) => {
    try {
        
        const result = await termConditionService.addTermCondition(req.body);
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
        
        const result = await termConditionService.getTermCondition(req.body);
        res.status(200).json({
            error : false,
            data: result
        });
    } catch (e) {
        next(e); 
    }
};


const update = async (req, res, next) => {
    try {
        const result = await termConditionService.updateTermCondition(req.body);
        res.status(200).json({error : false, data: result });
    } catch (e) {
        next(e);
    }
};


export default {
    add,
    get,
    update,
};
