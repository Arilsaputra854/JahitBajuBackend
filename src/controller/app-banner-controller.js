import appBannerService from "../service/app-banner-service.js";
import { validateAddAppBanner, validateUpdateAppBanner } from "../validation/app-banner-validation.js";
import { validate } from "../validation/validation.js";



const add = async (req, res, next) => {
    try {        
        const body = validate(validateAddAppBanner, req.body)
        const result = await appBannerService.addAppBanner(body);
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
        const  id  = req.query.id;
        var result;
        if(id){ 
            result = await appBannerService.getAppBanner(id);
        }else{
            result = await appBannerService.getAllAppBanner();
        }
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
        const  id  = req.params.id;
        const body = validate(validateUpdateAppBanner, req.body)
        const result = await appBannerService.updateAppBanner(id,body);
        res.status(200).json({error : false, data: result });
    } catch (e) {
        next(e);
    }
};


const remove = async (req, res, next) => {
    try {
        const  id  = req.params.id;
        const result = await appBannerService.deleteAppBanner(id);
        res.status(200).json({error : false, data: result });
    } catch (e) {
        next(e);
    }
};

export default {
    add,
    get,
    update,
    remove
};
