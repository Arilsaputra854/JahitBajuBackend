// Controller: Updated methods
import FavoriteService from "../service/favorite-service.js";
import { validateProductIdFavorite, validateFavorite, validateIdFavorite} from "../validation/favorite-validation.js";
import { validate } from "../validation/validation.js";

// create favorite
const addFavorite = async (req, res, next) => {
    try {
        validate(validateFavorite, req.body)
        
        const result = await FavoriteService.addFavorite(req);
        res.status(200).json({
            error : false, data: result });
    } catch (e) {
        next(e);
    }
};


const getFavorite = async (req, res, next) => {
    try {
        const result = await FavoriteService.getFavoriteByUserId(req.user.id);
        res.status(200).json({
            error : false, data: result });
    } catch (e) {
        next(e);
    }
};


const getAllFavorites = async (req, res, next) => {
    try {
        const result = await FavoriteService.getAllFavorites();
        res.status(200).json({
            error : false, data: result });
    } catch (e) {
        next(e);
    }
};


const removeFavorite = async (req, res, next) => {
    try {
        
        const body = validate(validateIdFavorite, req.body)
        await FavoriteService.removeFavorite(body.id);
        res.status(200).json({
            error : false, message: "Favorite product delete successfully" });
    } catch (e) {
        next(e);
    }
};


const getProductFavoriteCount = async (req, res, next) => {
    try {
        
        const request = validate(validateProductIdFavorite, req.body)
        const result = await FavoriteService.getProductFavoriteCount(request.body);
        res.status(200).json({
            error : false, data: result});
    } catch (e) {
        next(e);
    }
};


export default {
    removeFavorite,
    getAllFavorites,
    addFavorite,
    getFavorite,
    getProductFavoriteCount,
};
