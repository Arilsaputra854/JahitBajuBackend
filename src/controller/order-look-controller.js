
import { ResponseError } from "../error/response-error.js";
import orderLookService from "../service/order-look-service.js";
import { createLookOrderValidation } from "../validation/order-look-validation.js";
import { validate } from "../validation/validation.js";


const getLookOrder = async (req, res, next) => {
    
    try {        
        const id = req.query.type;
        if(!id)
            throw new ResponseError(400,"id is required.")

        const result = await orderLookService.getLookOrder(id);
        
        res.status(200).json({
            error: false,
            data: result,
        });
    } catch (e) {
        next(e); 
    }
};

const createLookOrder = async (req, res, next) => {
    try {       
        const body = validate(createLookOrderValidation,req.body)
        const result = await orderLookService.createLookOrder(req.user, body);
                
        res.status(201).json({
            error: false,
            data: result,
        });
    } catch (e) {
        next(e); 
    }
};


export default {
    createLookOrder,
    getLookOrder
};
