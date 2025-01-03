import productService from "../service/product-service.js";

const register = async (req, res, next) => {
    try {
        // Call the register function from the productService and pass the request body
        const result = await productService.register(req.body);
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
        // Retrieve the product ID from the request parameters
        const { id } = req.params; // Assuming the product ID is passed as a URL parameter
        const result = await productService.get(id);
        res.status(200).json({
            error : false,
            data: result
        });
    } catch (e) {
        next(e); // Pass the error to the error-handling middleware
    }
};

// Update function
const update = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await productService.update(id, req.body);
        res.status(200).json({error : false, data: result });
    } catch (e) {
        next(e);
    }
};

const remove = async (req, res, next) => {
    try {
        const { id } = req.params;
        await productService.remove(id);
        res.status(200).json({
            error : false,
            data : "Product delete successfuly"
        })
    } catch (e) {
        next(e);
    }
};

const list = async (req, res, next) => {
    try {
        const result = await productService.list();
        res.status(200).json({error : false, data: result });
    } catch (e) {
        next(e);
    }
};

export default {
    register,
    get,
    update,
    remove,
    list // Export the new list function
};
