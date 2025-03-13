// Service: Updated and cleaned up functions
import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";
import { v4 as uuid } from "uuid";

const addToCart = async (buyerId, body) => {
  // Get or create the cart for the buyer
  let cart = await prismaClient.cart.findFirst({
    where: { buyer_id: buyerId },
    include: { items: true },
  });

  if (!cart) {
    cart = await prismaClient.cart.create({
      data: {
        id: uuid(),
        buyer_id: buyerId,
        total_price: 0,
        custom_price: 0,
        rtw_price: 0,
      },
    });
  }

  // Check if the product with the same size is already in the cart
  if (body.product_id) {
    let cartItem = await prismaClient.cartItem.findFirst({
      where: {
        cart_id: cart.id,
        product_id: body.product_id,
        size: body.size,
      },
    });

    if (cartItem) {
      cartItem = await prismaClient.cartItem.update({
        where: { id: cartItem.id },
        data: {
          quantity: cartItem.quantity + body.quantity,
          price: body.price,
          weight: cartItem.weight + body.weight,
          last_update: new Date(),
        },
      });
    } else {
      // Jika produk belum ada di keranjang, tambahkan sebagai item baru

      cartItem = await prismaClient.cartItem.create({
        data: {
          id: uuid(),
          last_update: new Date(),
          cart_id: cart.id,
          product_id: body.product_id,
          quantity: body.quantity,
          price: body.price,
          weight: body.weight,
          custom_design: body.custom_design,
          size: body.size,
        },
      });
    }

    // Ambil ulang cart dengan item yang sudah diupdate
    const updatedCart = await prismaClient.cart.findFirst({
      where: { id: cart.id },
      include: { items: true },
    });

    // Hitung total harga
    let totalPrice = 0;
    let rtwPrice = 0;

    if (updatedCart.items) {
      for (let item of updatedCart.items) {
        totalPrice += item.price * item.quantity;

        rtwPrice += item.price * item.quantity;
      }
    }

    await prismaClient.cart.update({
      where: { id: cart.id },
      data: {
        total_price: totalPrice,
        rtw_price: rtwPrice,
        last_update: new Date(),
      },
    });

    return cartItem;
  } else {
    let cartItem = await prismaClient.cartItem.findFirst({
      where: {
        cart_id: cart.id,
        look_id: body.look_id,
        size: body.size,
      },
    });

    if (cartItem) {
      cartItem = await prismaClient.cartItem.update({
        where: { id: cartItem.id },
        data: {
          last_update: new Date(),
          quantity: cartItem.quantity + body.quantity,
          price: body.price,
          weight : body.weight
        },
      });
    } else {
      cartItem = await prismaClient.cartItem.create({
        data: {
          id: uuid(),
          cart_id: cart.id,
          look_id: body.look_id,
          quantity: body.quantity,
          price: body.price,
          custom_design: body.custom_design,
          size: body.size,
          weight : body.weight
        },
      });
    }

    // Ambil ulang cart dengan item yang sudah diupdate
    const updatedCart = await prismaClient.cart.findFirst({
      where: { id: cart.id },
      include: { items: true },
    });

    // Hitung total harga
    let totalPrice = 0;
    let rtwPrice = 0;

    if (updatedCart.items) {
      for (let item of updatedCart.items) {
        totalPrice += item.price * item.quantity;

        rtwPrice += item.price * item.quantity;
      }
    }

    await prismaClient.cart.update({
      where: { id: cart.id },
      data: {
        total_price: totalPrice,
        rtw_price: rtwPrice,
        last_update: new Date(),
      },
    });

    return cartItem;
  }
};

// Update cart item and recalculate total price
const updateCart = async (buyerId, body) => {
  // Find the cart by buyerId
  const cart = await prismaClient.cart.findFirst({
    where: { buyer_id: buyerId },
  });

  if (!cart) throw new ResponseError(404, "Cart not found");

  // Find the specific cart item within the buyer's cart
  const cartItem = await prismaClient.cartItem.findFirst({
    where: {
      cart_id: cart.id,
      product_id: body.product_id,
    },
  });

  if (!cartItem) throw new ResponseError(404, "Cart item not found");

  // Prepare the update data
  const updateData = {};
  updateData.last_update = new Date();
  if (body.price !== undefined) updateData.price = body.price;
  if (body.quantity !== undefined) updateData.quantity = body.quantity;
  if (body.size !== undefined) updateData.size = body.size;
  if (body.custom_design !== undefined)
    updateData.custom_design = body.custom_design;

  // Update the cart item
  const updatedCartItem = await prismaClient.cartItem.update({
    where: { id: cartItem.id },
    data: updateData,
    select: {
      id: true,
      cart_id: true,
      product_id: true,
      quantity: true,
      price: true,
      custom_design: true,
      size: true,
    },
  });

  // Recalculate the total price of the cart
  const newTotalPrice = await prismaClient.cartItem.aggregate({
    where: { cart_id: cart.id },
    _sum: { price: true },
  });

  await prismaClient.cart.update({
    where: { id: cart.id },
    data: {
      totalPrice: newTotalPrice._sum.price || 0,
      last_update: new Date(),
    },
  });

  return updatedCartItem;
};

const listCarts = async () => {
  return prismaClient.cart.findMany({
    select: {
      id: true,
      buyer_id: true,
      total_price: true,
      custom_price: true,
      rtw_price: true,
      items: true,
    },
  });
};

// Remove entire cart and associated items
const removeCart = async (buyerId) => {
  const cart = await prismaClient.cart.findFirst({
    where: { buyer_id: buyerId },
  });
  if (!cart) throw new ResponseError(404, "Cart not found");

  await prismaClient.cartItem.deleteMany({ where: { cart_id: cart.id } });
  return prismaClient.cart.delete({ where: { id: cart.id } });
};

// Remove a specific cart item and update total price
const removeCartItem = async (buyerId, cartItemId) => {
  // 1. Ambil cart berdasarkan buyerId
  const cart = await prismaClient.cart.findFirst({
    where: { buyer_id: buyerId },
  });

  if (!cart) throw new ResponseError(404, "Cart not found");

  // 2. Ambil cartItem berdasarkan cartItemId
  const cartItem = await prismaClient.cartItem.findFirst({
    where: {
      id: cartItemId,
      cart_id: cart.id,
    },
  });

  if (!cartItem) throw new ResponseError(404, "Cart item not found");

  // 3. Hapus cartItem berdasarkan id
  await prismaClient.cartItem.delete({ where: { id: cartItem.id } });

  const cart_id = cart.id;

  // 4. Hitung ulang total harga, rtw_price, dan custom_price
  const updatedPrices = await prismaClient.cartItem.groupBy({
    by: ["custom_design"],
    where: { cart_id },
    _sum: { price: true },
  });

  let newRtwPrice = 0;
  let newCustomPrice = 0;

  updatedPrices.forEach((group) => {
    if (group.custom_design === null) {
      newRtwPrice = group._sum.price || 0; // Jika bukan custom, masuk ke RTW
    } else {
      newCustomPrice = group._sum.price || 0; // Jika ada custom, masuk ke custom_price
    }
  });

  const newTotalPrice = newRtwPrice + newCustomPrice;

  // 5. Perbarui harga di cart
  await prismaClient.cart.update({
    where: { id: cart_id },
    data: {
      total_price: newTotalPrice,
      rtw_price: newRtwPrice,
      custom_price: newCustomPrice,
      last_update: new Date(),
    },
  });

  // 6. Kembalikan response dengan harga terbaru
  return {
    cart_id,
    total_price: newTotalPrice,
    rtw_price: newRtwPrice,
    custom_price: newCustomPrice,
  };
};

// Retrieve or create a cart for a buyer
const getCartByBuyerId = async (buyerId) => {
  let cart = await prismaClient.cart.findFirst({
    where: { buyer_id: buyerId },
    select: {
      id: true,
      buyer_id: true,
      total_price: true,
      items: true,
      custom_price: true,
      rtw_price: true,
    },
  });

  if (!cart) {
    cart = await prismaClient.cart.create({
      data: {
        id: uuid(),
        buyer_id: buyerId,
        total_price: 0,
        custom_price: 0,
        rtw_price: 0,
      },
      select: {
        id: true,
        buyer_id: true,
        total_price: true,
        custom_price: true,
        rtw_price: true,
        items: true,
      },
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
