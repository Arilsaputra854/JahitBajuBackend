// Service: Updated and cleaned up functions
import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";
import { v4 as uuid } from "uuid";
import {validateGetPackaging, validatePostPackaging} from "../validation/packaging-validation.js"
import { validate } from "../validation/validation.js"

const addPackaging = async (req) => {
    
    var body = validate(validatePostPackaging, req);
    

    let packaging = await prismaClient.shipping.findFirst({
        where: { name : body.name }
    });

    if (!packaging) {
        packaging = await prismaClient.packaging.create({
            data: {
                id : uuid(),
                name : body.name,
                description : body.description,
                price : body.price,
                last_update: new Date()
            },
        });
    }

    return packaging;
};



const updatePackaging = async (req) => {

    var body = validate(validatePostPackaging, req);

    let packaging = await prismaClient.packaging.findFirst({
        where: { id : body.id }
    });


    if (!packaging) throw new ResponseError(404, "Packaging method not found");
    


    // Prepare the update data
    const updateData = {};
    if (body.price !== undefined) updateData.price = body.price; 
    if (body.name !== undefined) updateData.name = body.name; 
    if (body.description !== undefined) updateData.description = body.description;     

    // Update the cart item
    const updatedPackagingMethod = await prismaClient.packaging.update({
        where: { id : body.id },
        data: updateData,
        select: {
            id: true,
            name: true,
            description : true,
            price: true
        },
    });

    return updatedPackagingMethod;
};


const listPackagings = async () => {
    return prismaClient.packaging.findMany({        
        select: { id: true, name: true, price:true, description : true},
    });
};


const removePackaging = async (body) => {

    validate(validatePostPackaging, body);

    const packaging = await prismaClient.shipping.findFirst({ where: { name : body.name } });
    if (!packaging) throw new ResponseError(404, "Packaging not found");

    return prismaClient.packaging.delete({ where: { name: body.name } });
};

// Retrieve specific packaging
const getPackaging = async (id) => {

    let packaging = await prismaClient.packaging.findFirst({
        where: { id : id },
        select: { id: true, name: true, price:true, description : true},
    });

    if (!packaging) throw new ResponseError(404, "Packaging not found");
    return packaging;
};

export default {
    addPackaging,
    updatePackaging,
    listPackagings,
    removePackaging,
    getPackaging,    
};