import careGuideService from "../service/care-guide-service.js";


const add = async (req, res, next) => {
    try {
        const result = await careGuideService.add(req.body);
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
        
        const result = await careGuideService.get(req.body);
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
        const { id } = req.params;
        const result = await careGuideService.update(id,req.body);
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
