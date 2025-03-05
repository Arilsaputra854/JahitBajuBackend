import orderService from "../service/order-product-service.js";
import { validateOrder } from "../validation/order-product-validation.js";
import { validate } from "../validation/validation.js";

// Create Order
const createOrder = async (req, res, next) => {
    try {
       const body = validate(validateOrder,req.body);
        
        // Call orderService untuk membuat order dengan data lengkap
        const result = await orderService.createOrder(body,req.user.id, req.user.email, req.user.address);

        // Mengirimkan response dengan data order yang berhasil dibuat
        res.status(201).json({
            error: false,
            data: result,
        });
    } catch (e) {
        next(e); // Mengoper error ke middleware penanganan error
    }
};

// Get Order by ID
const getOrder = async (req, res, next) => {
    try {
        const { buyerId } = req.body;
        const result = await orderService.getOrder(buyerId);
        res.status(200).json({
            error: false,
            data: result,
        });
    } catch (e) {
        next(e);
    }
};

// Update Order
const updateOrder = async (req, res, next) => {
    try {
        const { id } = req.params;

        const { error } = validateOrderItem(req.body);
        if (error) {
            return res.status(400).json({ error: true, message: error.details[0].message });
        }

        const body = req.body;

        // Panggil service untuk update status
        const result = await orderService.updateOrder(id, body);

        res.status(200).json({
            error: false,
            message: "Order updated successfully",
            data: result,
        });
    } catch (e) {
        next(e);
    }
};

// Remove Order
const removeOrder = async (req, res, next) => {
    try {
        const { id } = req.params;
        await orderService.removeOrder(id);
        res.status(200).json({
            error: false,
            message: "Order deleted successfully",
        });
    } catch (e) {
        next(e);
    }
};

// Remove Order Items
const removeOrderItem = async (req, res, next) => {
    try {
        const { orderId, itemId } = req.params;
        await orderService.removeOrderItem(orderId, itemId);
        res.status(200).json({
            error: false,
            message: "Order item deleted successfully",
        });
    } catch (e) {
        next(e);
    }
};

// List Orders
const listOrders = async (req, res, next) => {
    try {
        const result = await orderService.listOrders();
        res.status(200).json({
            error: false,
            data: result,
        });
    } catch (e) {
        next(e);
    }
};

export default {
    createOrder,
    getOrder,
    updateOrder,
    removeOrder,
    removeOrderItem,
    listOrders,
};
