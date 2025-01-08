import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";
import { v4 as uuid } from "uuid";

import axios from "axios"; // Import axios untuk request ke API Xendit

const XENDIT_SECRET_KEY =
  "xnd_development_COlOADCc4F1J9dKRYjuD9Ay1I85fpWdCBC0fGJ4BV7ANt1JBwNeIwK8h7S1h"; // Ganti dengan Secret Key Anda

const createOrder = async (body, buyerId,email ) => {
  const totalPrice = body.total_price || 0;

  let orderItems = [];

  if (body.cart_id) {
    // Fetch cart items for the buyer
    const cartItems = await prismaClient.cartItem.findMany({
      where: { cartId: body.cart_id },
    });

    if (!cartItems.length) {
      throw new ResponseError(400, "Cart is empty. Cannot create order.");
    }

    // Prepare items from cart
    orderItems = cartItems.map((item) => ({
      productId: item.productId,
      quantity: item.quantity,
      size: item.size,
      price: item.price,      
      custom_design : item.custom_design,
    }));
  } else if (body.product_id && body.quantity) {
    // Prepare items for "Buy Now"
    orderItems.push({      
      quantity: body.quantity,
      size: body.size, // Optional size
      price: body.price || 0, // Ensure price is 
      custom_design : body.custom_design,
      product: {
        connect: { id: body.product_id }, // Sambungkan ke produk yang sudah ada
      },  
    });
  } else {
    throw new ResponseError(400, "Invalid request. Missing cart_id or product details.");
  }

  // Create order with associated items
  const order = await prismaClient.order.create({
    data: {
      id: uuid(),
      buyer_id: buyerId,
      shipping_id: body.shipping_id,
      packaging_id: body.packaging_id,
      total_price: totalPrice,
      order_created: body.order_created || new Date(),
      order_status: body.order_status || "PENDING",
      last_update: new Date(),
      items: {
        create: orderItems,
      },
    },
    select: {
      id: true,
      buyer_id: true,
      shipping_id: true,
      packaging_id: true,
      total_price: true,
      order_created: true,
      order_status: true,
      last_update: true,
      items: true,
      payment_url: true,
    },
  });


  // ===== Integrasi ke Xendit =====
  try {
    const xenditResponse = await axios.post(
      "https://api.xendit.co/v2/invoices",
      {
        external_id: order.id, // ID unik untuk menghubungkan order
        amount: totalPrice, // Total harga
        payer_email: email, // Email pembeli
        description: `Payment for Order ${order.id}`,
      },
      {
        headers: {
          Authorization: `Basic ${Buffer.from(XENDIT_SECRET_KEY + ":").toString(
            "base64"
          )}`,
          "Content-Type": "application/json",
        },
      }
    );

    const { invoice_url, expiry_date } = xenditResponse.data;

    // Update order dengan payment_url dan expiry_date
    const updatedOrder = await prismaClient.order.update({
      where: { id: order.id },
      data: {
        payment_url: invoice_url,
        expiry_date: new Date(expiry_date), // Pastikan database menyimpan expiry_date
      },
      select: {
        id: true,
        buyer_id: true,
        shipping_id: true,
        packaging_id: true,
        total_price: true,
        order_created: true,
        order_status: true,
        last_update: true,
        items: true,
        payment_url: true,
        expiry_date: true, // Ambil expiry_date untuk dikembalikan
      },
    });

    // Clear the cart after creating the order
    if (body.cart_id) {
      await prismaClient.cartItem.deleteMany({
        where: { cartId: body.cart_id },
      });

      await prismaClient.cart.delete({
        where: { id: body.cart_id },
      });
    }

    return updatedOrder;
  } catch (error) {
    throw new ResponseError(
      500,
      `Failed to create payment invoice: ${
        error.response?.data?.message || error.message
      }`
    );
  }
};

// Get Order by ID
const getOrder = async (buyer_id) => {
  const order = await prismaClient.order.findMany({
    where: { id: buyer_id },
    select: {
      id: true,
      buyer_id: true,
      shipping_id: true,
      packaging_id: true,
      total_price: true,
      order_created: true,
      order_status: true,
      last_update: true,
      items: true,
      payment_url: true,
    },
  });

  if (!order) {
    throw new ResponseError(404, "Order not found");
  }

  return order;
};

// Update Order
const updateOrder = async (id, body) => {
  const order = await prismaClient.order.findUnique({
    where: { id: id },
  });

  if (!order) {
    throw new ResponseError(404, "Order not found");
  }

  return prismaClient.order.update({
    where: { id: id },
    data: {
      buyer_id: body.buyer_id || order.buyer_id,
      shipping_id: body.shipping_id || order.shipping_id,
      packaging_id: body.packaging_id || order.packaging_id,
      total_price: body.total_price?.toString() || order.total_price,
      order_status: body.order_status || order.order_status,
      last_update: new Date(),
      payment_url: body.payment_url || order.payment_url,
    },
    select: {
      id: true,
      buyer_id: true,
      shipping_id: true,
      packaging_id: true,
      total_price: true,
      order_created: true,
      order_status: true,
      last_update: true,
      payment_url: true,
    },
  });
};

// Remove Order
const removeOrder = async (id) => {
  const order = await prismaClient.order.findUnique({
    where: { id: id },
  });

  if (!order) {
    throw new ResponseError(404, "Order not found");
  }

  await prismaClient.orderItem.deleteMany({
    where: { orderId: id },
  });

  return prismaClient.order.delete({
    where: { id: id },
  });
};

// List Orders
const listOrders = async () => {
  return prismaClient.order.findMany({
    select: {
      id: true,
      buyer_id: true,
      shipping_id: true,
      packaging_id: true,
      total_price: true,
      order_created: true,
      order_status: true,
      last_update: true,
      items: true,
    },
  });
};

export default {
  createOrder,
  getOrder,
  updateOrder,
  removeOrder,
  listOrders,
};
