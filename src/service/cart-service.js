// Service: Updated and cleaned up functions
import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";
import { v4 as uuid } from "uuid";


const addToCart = async (buyerId, body) => {
    // Get or create the cart for the buyer
    let cart = await prismaClient.cart.findFirst({
        where: { buyerId },
        include: { items: true }, // Include items to calculate the total price
    });

    if (!cart) {
        // If cart doesn't exist, create a new one with total price 0
        cart = await prismaClient.cart.create({
            data: {
                id: uuid(),
                buyerId,
                totalPrice: 0,
            },
        });
    }

    // Check if the product with the same size is already in the cart
    let cartItem = await prismaClient.cartItem.findFirst({
        where: {
            cartId: cart.id,
            productId: body.productId,
            size: body.size,  // Check if the product with the same size is in the cart
        },
    });

    if (cartItem) {
        // If the product with the same size exists, update the quantity
        cartItem = await prismaClient.cartItem.update({
            where: { id: cartItem.id },
            data: {
                quantity: cartItem.quantity + body.quantity,
                price: body.price,
            },
        });
    } else {
        // If the product with the size doesn't exist, add it as a new item
        cartItem = await prismaClient.cartItem.create({
            data: {
                id: uuid(),
                cartId: cart.id,
                productId: body.productId,
                quantity: body.quantity,
                price: body.price,
                size: body.size,  // Make sure to store the size as well
            },
        });
    }

    // Reload cart with updated items to calculate total price
    const updatedCart = await prismaClient.cart.findFirst({
        where: { id: cart.id },
        include: { items: true },
    });

    // Calculate total price manually
    let totalPrice = 0;
    if (updatedCart.items) {
        for (let item of updatedCart.items) {
            totalPrice += item.price * item.quantity;
        }
    }

    // Update the cart total price
    await prismaClient.cart.update({
        where: { id: cart.id },
        data: { totalPrice: totalPrice }, // Update the total price
    });

    return cartItem;
};



// Update cart item and recalculate total price
const updateCart = async (buyerId, body) => {
    // Find the cart by buyerId
    const cart = await prismaClient.cart.findFirst({
        where: { buyerId },
    });

    if (!cart) throw new ResponseError(404, "Cart not found");

    // Find the specific cart item within the buyer's cart
    const cartItem = await prismaClient.cartItem.findFirst({
        where: {
            cartId: cart.id,
            productId: body.productId,
        },
    });

    if (!cartItem) throw new ResponseError(404, "Cart item not found");

    // Prepare the update data
    const updateData = {};
    if (body.price !== undefined) updateData.price = body.price;
    if (body.quantity !== undefined) updateData.quantity = body.quantity;
    if (body.size !== undefined) updateData.size = body.size;

    // Update the cart item
    const updatedCartItem = await prismaClient.cartItem.update({
        where: { id: cartItem.id },
        data: updateData,
        select: {
            id: true,
            cartId: true,
            productId: true,
            quantity: true,
            price: true,
            size: true,
        },
    });

    // Recalculate the total price of the cart
    const newTotalPrice = await prismaClient.cartItem.aggregate({
        where: { cartId: cart.id },
        _sum: { price: true },
    });

    await prismaClient.cart.update({
        where: { id: cart.id },
        data: { totalPrice: newTotalPrice._sum.price || 0 },
    });

    return updatedCartItem;
};


const listCarts = async () => {
    return prismaClient.cart.findMany({
        select: { id: true, buyerId: true, totalPrice: true, items : true },
    });
};


// Remove entire cart and associated items
const removeCart = async (buyerId) => {
    const cart = await prismaClient.cart.findFirst({ where: { buyerId } });
    if (!cart) throw new ResponseError(404, "Cart not found");

    await prismaClient.cartItem.deleteMany({ where: { cartId: cart.id } });
    return prismaClient.cart.delete({ where: { id: cart.id } });
};

// Remove a specific cart item and update total price
const removeCartItem = async (buyerId, cartItemId) => {
    // 1. Ambil cart berdasarkan buyerId
    const cart = await prismaClient.cart.findFirst({
        where: { buyerId: buyerId },
    });
    
    if (!cart) throw new ResponseError(404, "Cart not found");

    // 2. Ambil cartItem berdasarkan cartItemId yang diberikan
    const cartItem = await prismaClient.cartItem.findFirst({
        where: {
            id: cartItemId,  // Menyesuaikan pencarian dengan cartItemId
            cartId: cart.id  // Pastikan item berasal dari cart yang benar
        }
    });
    if (!cartItem) throw new ResponseError(404, "Cart item not found");

    // 3. Hapus cartItem berdasarkan id yang benar
    await prismaClient.cartItem.delete({ where: { id: cartItem.id } });

    const cartId = cart.id;

    // 4. Hitung total harga setelah penghapusan
    const newTotalPrice = await prismaClient.cartItem.aggregate({
        where: { cartId },
        _sum: { price: true },
    });

    // 5. Perbarui total price di cart
    await prismaClient.cart.update({
        where: { id: cartId },
        data: { totalPrice: newTotalPrice._sum.price || 0 },
    });

    // 6. Kembalikan response dengan total harga terbaru
    return { cartId, totalPrice: newTotalPrice._sum.price || 0 };
};


// Retrieve or create a cart for a buyer
const getCartByBuyerId = async (buyerId) => {
    let cart = await prismaClient.cart.findFirst({
        where: { buyerId },
        select: { id: true, buyerId: true, totalPrice: true, items: true },
    });

    if (!cart) {
        cart = await prismaClient.cart.create({
            data: {
                id: uuid(),
                buyerId,
                totalPrice: 0,
            },
            select: { id: true, buyerId: true, totalPrice: true, items: true },
        });
    }

    return cart;
};

export default {
    addToCart,
    getCartByBuyerId,
    updateCart,
    listCarts,
    removeCart,
    removeCartItem,
};