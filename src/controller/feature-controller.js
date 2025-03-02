import featureService from "../service/feature-service.js";


const buyCustomizationFeature = async (req, res, next) => {
    try {        
        const result = await featureService.customizationFeature(req.user);
        
        res.status(201).json({
            error: false,
            data: result,
        });
    } catch (e) {
        next(e); 
    }
};

export default {
    buyCustomizationFeature
};
