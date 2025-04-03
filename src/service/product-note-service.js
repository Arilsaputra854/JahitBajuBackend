// Service: Updated and cleaned up functions
import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";

const add = async (body) => {

    if (!body || !body.data) {
        throw new ResponseError(400, "product note are required.");
    }
    
    var productNote = await prismaClient.productNote.create({
        data : {
            ...body,
        },
    });

    return productNote;
};



const update = async (body) => {


    let productNote = await prismaClient.productNote.findFirst({
        where: { id : body.id }
    });


    if (!productNote) throw new ResponseError(404, "product note not found.");
    

    const productNoteUpdated = await prismaClient.productNote.update({
        where: { id : body.id },
        data: {last_update: new Date(),
            ...body,
        }
    });

    return productNoteUpdated;
};




const getAll = async () => {    

    let productNote = await prismaClient.productNote.findMany({
        select: { id: true, data: true},
    });

    if (!productNote) throw new ResponseError(404, "product note not found.");
    return productNote;
};




const getRtw = async () => {    

    let productNote = await prismaClient.productNote.findFirst({
        where: { type: 1 },
        select: { id: true, data: true},
    });

    console.log("rtw")
    if (!productNote) throw new ResponseError(404, "product note not found.");

    console.log(productNote)
    return productNote;
};


const getCustome = async () => {    

    let productNote = await prismaClient.productNote.findFirst({
        where: { type: 2 },
        select: { id: true, data: true},
    });


    if (!productNote) throw new ResponseError(404, "product note not found.");

    console.log(productNote)
    return productNote;
};

export default {
    add,
    update,    
    getAll,    
    getCustome,
    getRtw
};