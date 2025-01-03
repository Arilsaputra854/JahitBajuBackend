import packagingService from "../service/packaging-service.js";

const add = async (req, res, next) => {
    try {
        
        const result = await packagingService.addPackaging(req.body);
        res.status(200).json({
            error : false,
            data: result
        });
    } catch (e) {
        next(e); // Pass the error to the error-handling middleware
    }
};

const get = async (req, res, next) => {
    try {
        
        const result = await packagingService.getPackaging(req.body);
        res.status(200).json({
            error : false,
            data: result
        });
    } catch (e) {
        next(e); // Pass the error to the error-handling middleware
    }
};


const update = async (req, res, next) => {
    try {
        const result = await packagingService.updatePackaging(req.body);
        res.status(200).json({error : false, data: result });
    } catch (e) {
        next(e);
    }
};

const remove = async (req, res, next) => {
    try {
        await packagingService.removePackaging(req.body);
        res.status(200).json({
            error : false,
            data : "Packaging delete successfuly"
        })
    } catch (e) {
        next(e);
    }
};

const list = async (req, res, next) => {
    try {
        const result = await packagingService.listPackagings();
        res.status(200).json({error : false, data: result });
    } catch (e) {
        next(e);
    }
};

export default {
    add,
    get,
    update,
    remove,
    list // Export the new list function
};
