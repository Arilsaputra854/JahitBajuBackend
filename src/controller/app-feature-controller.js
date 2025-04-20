
import { ResponseError } from "../error/response-error.js";
import appFeatureService from "../service/app-feature-service.js";
import { createFeatureValidation, updateFeatureValidation } from "../validation/app-feature-validation.js";
import { validate } from "../validation/validation.js";


const getFeature = async (req, res, next) => {
    let result;
    try {        
        const type = req.query.type;
        if(!type){            
            result = await appFeatureService.listFeatures();
        }
        
        result = await appFeatureService.getFeature(type)
        
        res.status(200).json({
            error: false,
            data: result,
        });
    } catch (e) {
        next(e); 
    }
};

const buyFeature = async (req, res, next) => {
    let result;
    const type = req.query.type;
    try {        
        if(!type){
            throw new ResponseError(400,"type is required.")
        }
        if(type == "CUSTOMIZATION"){
            result = await appFeatureService.buyCustomizationFeature(req.user);
        }
                
        res.status(201).json({
            error: false,
            data: result,
        });
    } catch (e) {
        next(e); 
    }
};


const createFeature = async (req, res, next) => {
    try {        

        let body = validate( createFeatureValidation, req.body)
        const result = await appFeatureService.createFeature(body);         
                
        res.status(201).json({
            error: false,
            data: result,
        });
    } catch (e) {
        next(e); 
    }
};


const updateFeature = async (req, res, next) => {
    try {        
        let body = validate( updateFeatureValidation, req.body)
        const result = await appFeatureService.updateFeature(body);
                        
        res.status(201).json({
            error: false,
            data: result,
        });
    } catch (e) {
        next(e); 
    }
};


const getOrderFeature = async (req, res, next) => {
    try {        
        const id = req.params.id

        if(!id){
            throw new ResponseError(400,"id is required.")
        }
        const result = await appFeatureService.getOrderFeature(id);
                        
        res.status(200).json({
            error: false,
            data: result,
        });
    } catch (e) {
        next(e); 
    }
};

export default {
    getFeature,
    buyFeature,
    updateFeature,
    createFeature,
    getOrderFeature
};
