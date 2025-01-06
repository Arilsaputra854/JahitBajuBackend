// Service: Updated and cleaned up functions
import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";

const addSurveiData = async (body) => {

    var survei = await prismaClient.surveiCustom.create({
        data: {
            question_1 : body.question_1,
            question_2 : body.question_2,
            question_3 : body.question_3,
        },
    });

    return survei;
};


// Retrive survei data
const getSurveiData = async () => {    

    let survei = await prismaClient.surveiCustom.findMany({        
        select: { id: true, question_1 : true, question_2 : true, question_3 : true},
    });

    if (!survei) throw new ResponseError(404, "Survei is empty");
    return survei;
};

export default {
    addSurveiData,    
    getSurveiData,    
};