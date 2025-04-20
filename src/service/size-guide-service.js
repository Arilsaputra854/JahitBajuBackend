// Service: Updated and cleaned up functions
import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";

const addSizeGuide = async (body) => {

    if (!body || !body.data) {
        throw new ResponseError(400, "Data are required");
    }

    var sizeGuide = await prismaClient.sizeGuide.create({
        data : {
            data: body.data
        }
    });

    return sizeGuide;
};



const updateSizeGuide = async (body) => {


    let sizeGuide = await prismaClient.sizeGuide.findFirst({
        where: { id : body.id }
    });


    if (!sizeGuide) throw new ResponseError(404, "Size guide not found");
    

    
    const sizeGuideUpdated = await prismaClient.sizeGuide.update({
        where: { id : body.id },
        data: {
            data : body.data,
            last_update : new Date()
        },        
    });

    return sizeGuideUpdated;
};



// Retrieve specific packaging
const getSizeGuide = async (body) => {    

    let sizeGuide = await prismaClient.sizeGuide.findFirst({
        where: { id : body.id },
        select: { id: true, data: true},
    });

    if (!sizeGuide) throw new ResponseError(404, "Size guide not found");
    return sizeGuide;
};

export default {
    addSizeGuide,
    updateSizeGuide,    
    getSizeGuide,    
};