// Service: Updated and cleaned up functions
import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";
import { v4 as uuid } from "uuid";
import { validateShippingMethod,validateGetShippingMethod,validateUpdateShippingMethod } from "../validation/shipping-method-validation.js";
import { validate } from "../validation/validation.js"

const addShippingMethod = async (req) => {
    
    var body = validate(validateShippingMethod, req);
    

    let shipping = await prismaClient.shipping.findFirst({
        where: { name : body.name }
    });

    if (!shipping) {
        shipping = await prismaClient.shipping.create({
            data: {
                id : uuid(),
                name : body.name,
                img_url : body.img_url,
                type : body.type,
                price : body.price
            },
        });
    }

    return shipping;
};



const updateShippingMethod = async (req) => {

    var body = validate(validateUpdateShippingMethod, req);

    let shipping = await prismaClient.shipping.findFirst({
        where: { id : body.id }
    });


    if (!shipping) throw new ResponseError(404, "Shipping method not found");
    


    // Prepare the update data
    const updateData = {};
    if (body.price !== undefined) updateData.price = body.price; 
    if (body.name !== undefined) updateData.name = body.name; 
    if (body.img_url !== undefined) updateData.img_url = body.img_url; 
    if (body.type !== undefined) updateData.type = body.type; 

    // Update the cart item
    const updatedShippingMethod = await prismaClient.shipping.update({
        where: { id : body.id },
        data: updateData,
        select: {
            id: true,
            name: true,
            price: true,
            img_url : true,
            type : true
        },
    });

    return updatedShippingMethod;
};


const listShippingMethods = async () => {
    return prismaClient.shipping.findMany({
        
        select: { id: true, name: true, price:true, img_url : true, type : true},
    });
};


const removeShippingMethods = async (body) => {

    validate(validateShippingMethod, body);

    const shippingMethod = await prismaClient.shipping.findFirst({ where: { name : body.name } });
    if (!shippingMethod) throw new ResponseError(404, "Shipping method not found");

    return prismaClient.shipping.delete({ where: { name: body.name } });
};

// Retrieve or create a cart for a buyer
const getShipingMethod = async (id) => {

    let shippingMethod = await prismaClient.shipping.findFirst({
        where: { id : id },
        select: { id: true, name: true, price:true, img_url : true, type : true},
    });

    if (!shippingMethod) throw new ResponseError(404, "Shipping method not found");
    return shippingMethod;
};

export default {
    addShippingMethod,
    getShipingMethod,
    updateShippingMethod,
    listShippingMethods,
    removeShippingMethods,    
};