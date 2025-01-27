// Service: Updated and cleaned up functions
import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";
const addSurveiData = async (body, id) => {
    // jika id tidak ada
    if (!id) {
        throw new ResponseError(400, "ID user is required.");
    }

    // Validasi apakah user ada
    const existingUser = await prismaClient.user.findUnique({
        where: { id: id },
    });

    //user tidak ditemukan
    if (!existingUser) {
        throw new ResponseError(404, "User not found or not exists.");
    }

    try {
        //create dan update data
        const result = await prismaClient.$transaction([
            prismaClient.surveiCustom.create({
                data: {                    
                    question_1: body.question_1,
                    question_2: body.question_2,
                    question_3: body.question_3,
                    user_id : id
                },
            }),
            prismaClient.user.update({
                where: { id: id },
                data: { custom_access: true },
            }),
        ]);

        // kirim hasil survei
        return result[0];
    } catch (error) {
        console.error("Error adding survey data:", error);
        throw new ResponseError(500, "Internal Server Error");
    }
};

const getSurveiData = async (userId) => {
    if (!userId) {
        throw new ResponseError(400, "User ID is required.");
    }

    const survei = await prismaClient.surveiCustom.findFirst({
        where: { user_id: userId }, 
        select: {
            id: true,
            question_1: true,
            question_2: true,
            question_3: true,
        },
    });

    if (survei.length === 0) {
        throw new ResponseError(404, "No survey found for this user.");
    }

    return survei;
};



// Retrive survei data
const getAllSurveiData = async () => {    

    let survei = await prismaClient.surveiCustom.findMany({        
        select: { id: true, question_1 : true, question_2 : true, question_3 : true},
    });

    if (!survei) throw new ResponseError(404, "Survei is empty.");
    return survei;
};

export default {
    addSurveiData,    
    getSurveiData,    
    getAllSurveiData
};