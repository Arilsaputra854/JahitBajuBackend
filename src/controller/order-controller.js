import orderService from "../service/order-service.js";
import { validateOrderItem } from "../validation/order-validation.js";
import { validateOrder } from "../validation/order-validation.js";

const createOrder = async (req, res, next) => {
    try {
        // Validasi request body menggunakan Joi
        const { error } = validateOrder(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        // Ambil buyerId dari user yang sedang login
        const buyerId = req.user.id; // Pastikan middleware menambahkan `req.user`

        // Hitung totalPrice berdasarkan item
        const totalPrice = req.body.items.reduce((sum, item) => {
            return sum + (item.quantity * item.priceAtPurchase);
        }, 0);

        // Tambahkan buyerId dan totalPrice ke request body
        const orderData = { ...req.body, totalPrice, buyerId };

        // Call orderService untuk membuat order dengan data lengkap
        const result = await orderService.createOrder(orderData);

        // Mengirimkan response dengan data order yang berhasil dibuat
        res.status(201).json({
            data: result
        });
    } catch (e) {
        next(e); // Mengoper error ke middleware penanganan error
    }
};


// Get Order by ID
const getOrder = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await orderService.getOrder(id);
        res.status(200).json({
            data: result
        });
    } catch (e) {
        next(e);
    }
};

// Update Order
const updateOrder = async (req, res, next) => {
     try {

        const {id} = req.params

        const { error } = validateOrderItem(req.body);

        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        const body = req.body;

        // Panggil service untuk update status
        const result = await orderService.updateOrder(id,body);

        res.status(200).json({
            message: "Order item status updated successfully",
            data: result
        });
    } catch (e) {
        next(e); // Pass error to middleware
    }
};

// Remove Order
const removeOrder = async (req, res, next) => {
    try {
        const { id } = req.params;
        await orderService.removeOrder(id);
        res.status(200).json({
            message: "Order deleted successfully"
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
            data: result
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
    listOrders
};
