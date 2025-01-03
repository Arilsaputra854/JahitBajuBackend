import sizeGuideService from "../service/size-guide-service.js";


const add = async (req, res, next) => {
    try {
        const result = await sizeGuideService.addSizeGuide(req.body);
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
        
        const result = await sizeGuideService.getSizeGuide(req.body);
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
        const result = await sizeGuideService.updateSizeGuide(req.body);
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
