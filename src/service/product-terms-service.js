// Service: Updated and cleaned up functions
import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";

const addProductTerms = async (size, color, texture) => {

    if (!size || !color || !texture) {
        throw new ResponseError(400,"Size, color, and texture are required.");
    }

    var productTerm = await prismaClient.productTerms.create({        
        data: {
            color : color,
            size : size,
            texture :texture
        },
    });

    return productTerm;
};



const updateProductTerms = async (body) => {


    let productTerm = await prismaClient.productTerms.findFirst({
        where: { id : body.id }
    });


    if (!productTerm) throw new ResponseError(404, "Product Terms not found");    

    const productTermUpdated = await prismaClient.productTerms.update({
        where: { id : body.id },
        data: body.data,
        select: {
            id: true,
            color : true,
            size : true,
            texture : true,
        },
    });

    return productTermUpdated;
};



const getProductTerms = async (body) => {    

    let productTerm = await prismaClient.productTerms.findFirst({
        where: { id : body.id },
        select: { id: true, 
            color : true,
            size : true,
            texture : true,},
    });

    if (!productTerm) throw new ResponseError(404, "Product Terms not found");
    return productTerm;
};

export default {
    addProductTerms,
    updateProductTerms,    
    getProductTerms,    
};