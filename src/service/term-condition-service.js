// Service: Updated and cleaned up functions
import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";

const addTermCondition = async (body) => {

    var termCondition = await prismaClient.termCondition.create({
        data: {
            data : body.data,
        },
    });

    return termCondition;
};



const updateTermCondition = async (body) => {


    let termCondition = await prismaClient.termCondition.findFirst({
        where: { id : body.id }
    });


    if (!termCondition) throw new ResponseError(404, "Term & Condition not found");
    

    // Update the cart item
    const termConditionUpdated = await prismaClient.termCondition.update({
        where: { id : body.id },
        data: body.data,
        select: {
            id: true,
            data:true
        },
    });

    return termConditionUpdated;
};



// Retrieve specific packaging
const getTermCondition = async (body) => {    

    let termCondition = await prismaClient.termCondition.findFirst({
        where: { id : body.id },
        select: { id: true, data: true},
    });

    if (!termCondition) throw new ResponseError(404, "Term & Condition not found");
    return termCondition;
};

export default {
    addTermCondition,
    updateTermCondition,    
    getTermCondition,    
};