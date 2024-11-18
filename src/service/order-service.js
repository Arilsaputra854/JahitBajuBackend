import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";
import { validateOrder, validateOrderItem } from "../validation/order-validation.js";
import { v4 as uuid } from 'uuid';
// Create Order
const createOrder = async (request) => {
    // Validasi data order
    const { error } = validateOrder(request);
    if (error) throw new ResponseError(400, error.details[0].message);

    // Memastikan struktur items sesuai dengan yang diharapkan Prisma
    const orderItems = request.items.map(item => ({
        productId: item.productId,      // Asumsi "productId" adalah field yang benar
        quantity: item.quantity,
        priceAtPurchase: item.priceAtPurchase // Menggunakan priceAtPurchase sebagai field harga
    }));

    const totalPrice = orderItems.reduce((sum, item) => {
        return sum + (item.priceAtPurchase * item.quantity);
    }, 0);


    return prismaClient.order.create({
        data: {
            id: uuid(),
            buyerId: request.buyerId,
            orderDate: request.orderDate,
            totalPrice: totalPrice,
            items: {
                create: orderItems // Menggunakan 'create' untuk memasukkan item
            }
        },
        select: {
            id: true,
            buyerId: true,
            orderDate: true,
            totalPrice: true,
            items: true
        }
    });
};


// Get Order by ID
const getOrder = async (id) => {
    const order = await prismaClient.order.findUnique({
        where: { id: id },
        select: {
            id: true,
            buyerId: true,
            orderDate: true,
            totalPrice: true,
            items: true
        }
    });

    if (!order) {
        throw new ResponseError(404, "Order not found");
    }

    return order;
};

// Update Order
const updateOrder = async (id, body) => {
    // Cari order item berdasarkan `orderId` dan `productId`
    const orderItem = await prismaClient.orderItem.findFirst({
        where: {
            orderId: id,
            productId: body.productId
        }
    });

    if (!orderItem) {
        throw new ResponseError(404, "Order item not found");
    }

    // Siapkan data update secara dinamis
    const updateData = {
        status: body.status, // Status akan selalu diupdate
    };

    // Tambahkan priceAtPurchase jika ada
    if (body.priceAtPurchase !== undefined && body.priceAtPurchase !== null) {
        updateData.priceAtPurchase = body.priceAtPurchase;
    }

    // Update status pada order item
    const updatedOrderItem = await prismaClient.orderItem.update({
        where: {
            id: orderItem.id // Menggunakan ID dari order item
        },
        data: updateData, // Data yang diupdate dinamis
        select: {
            id: true,
            orderId: true,
            productId: true,
            status: true,
            priceAtPurchase: true // Tambahkan priceAtPurchase pada response
        }
    });

    // Hitung ulang totalPrice berdasarkan semua item di order terkait
    const orderItems = await prismaClient.orderItem.findMany({
        where: { orderId: id }
    });

    const newTotalPrice = orderItems.reduce((total, item) => {
        return total + (item.priceAtPurchase || 0) * (item.quantity || 1);
    }, 0);

    // Update totalPrice di tabel order
    await prismaClient.order.update({
        where: { id: id },
        data: { totalPrice: newTotalPrice }
    });

    // Kembalikan data order item yang diupdate
    return updatedOrderItem;
};



// Remove Order
const removeOrder = async (id) => {

    await prismaClient.orderItem.deleteMany({
        where : {
            orderId : id
        }
    })

    const order = await prismaClient.order.findUnique({
        where: { id: id }
    });

    if (!order) {
        throw new ResponseError(404, "Order not found");
    }

    return prismaClient.order.delete({
        where: { id: id }
    });
};

// List Orders
const listOrders = async () => {
    return prismaClient.order.findMany({
        select: {
            id: true,
            buyerId: true,
            orderDate: true,
            totalPrice: true,
            items: true
        }
    });
};

export default {
    createOrder,
    getOrder,
    updateOrder,
    removeOrder,
    listOrders
};
