// Controller: Updated methods
import CartService from "../service/cart-service.js";
import { validateCartItem, validateCart } from "../validation/cart-validation.js";

// Get or create cart by buyer ID
const getCart = async (req, res, next) => {
    try {
        const buyerId = req.user.id;
        const result = await CartService.getCartByBuyerId(buyerId);
        res.status(200).json({
            error : false, data: result });
    } catch (e) {
        next(e);
    }
};

// Update cart
const updateCart = async (req, res, next) => {
    try {
        const { buyerId } = req.user.id;
        const { error } = validateCartItem(req.body);

        if (error) {
            return res.status(400).json({ 
                error : true,
                message: error.details[0].message });
        }

        const result = await CartService.updateCart(buyerId, req.body);
        res.status(200).json({
            error : false,
            message: "Cart item updated successfully",
            data: result,
        });
    } catch (e) {
        next(e);
    }
};

// Add product to cart
const addToCart = async (req, res, next) => {
    try {
        const buyerId = req.user.id;
        const { error } = validateCartItem(req.body);

        if (error) {
            return res.status(400).json({
                error : true, message: error.details[0].message });
        }

        const result = await CartService.addToCart(buyerId, req.body);
        res.status(200).json({
            error : false,
            message: "Product added to cart successfully",
            data: result,
        });
    } catch (e) {
        next(e);
    }
};

const listCarts = async (req, res, next) => {
    try {
        const result = await CartService.listCarts();
        res.status(200).json({
            error : false, data: result });
    } catch (e) {
        next(e);
    }
};

// Remove cart
const removeCart = async (req, res, next) => {
    try {
        const buyerId = req.user.id;
        await CartService.removeCart(buyerId);
        res.status(200).json({
            error : false, message: "Cart deleted successfully" });
    } catch (e) {
        next(e);
    }
};

// Remove item from cart
const removeCartItem = async (req, res, next) => {
    try {
        const buyerId = req.user.id
        const { itemId } = req.params;

        // Validate itemId and cartId if necessary
        if (!itemId) {
            return res.status(400).json({
                error : true, message: "Cart Item ID are required" });
        }

        await CartService.removeCartItem(buyerId, itemId);

        res.status(200).json({ 
            error : false,message: "Cart item removed successfully" });
    } catch (e) {
        next(e);
    }
};

export default {
    getCart,
    updateCart,
    addToCart, // New method
    listCarts,
    removeCart,
    removeCartItem,
};
