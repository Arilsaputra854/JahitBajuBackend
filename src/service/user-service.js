import { response } from "express";
import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";
import { getUserValidation, loginUserValidation, registerUserValidation, updateUserValidation } from "../validation/user-validation.js"
import { validate } from "../validation/validation.js"
import bcrypt from "bcrypt"
import { v4 as uuid } from "uuid";

const register = async(request)=>{
    var user = validate(registerUserValidation, request);

    const countUser = await prismaClient.user.count({
        where : {
            email : user.email
        }
    })

    if(countUser === 1){
        throw new ResponseError(400,"Email already exists")
    }

    user.password = await bcrypt.hash(user.password, 10)

    return prismaClient.user.create({
        data : user,
        select : {
            email : true,
            name : true,
            address : true,
            phone_number : true,
            img_url : true
        }
    })
}

const login = async (request) =>{
    var loginRequest = validate(loginUserValidation, request);

    const user = await prismaClient.user.findUnique({
        where :{
            email : loginRequest.email
        },
        select : {
            email : true,
            password : true
        }
    })

    if(!user){
        throw new ResponseError(401,"User not found")
    }

    const isPasswordValid = await bcrypt.compare(loginRequest.password, user.password)

    if(!isPasswordValid){
        throw new ResponseError(401,"Email or password is invalid")
    }

    const token = uuid().toString()
    return await prismaClient.user.update({
        data : {
            token : token
        },
        where : {
            email : user.email
        },
        select : {
            token : true
        }
    })

}

const get = async(id) =>{
    id = validate(getUserValidation, id)

    const user = await prismaClient.user.findUnique({
        where : {
            id : id
        },
        select : {
            id : true,
            email : true,
            name : true,
            address : true,
            phone_number : true,
            img_url : true
        }
    })

    if(!user){
        throw new ResponseError(404, "User is not found")
    }

    return user
}


// Update user function
const update = async (id, request) => {
    const userData = validate(updateUserValidation, request);

    const userExists = await prismaClient.user.findUnique({
        where: { id: id }
    });

    if (!userExists) {
        throw new ResponseError(404, "User not found");
    }

    if (userData.password) {
        userData.password = await bcrypt.hash(userData.password, 10);
    }

    return prismaClient.user.update({
        where: { id: id },
        data: userData,
        select: {
            email: true,
            name: true,
            address: true,
            phone_number: true,
            img_url: true
        }
    });
};

// Delete user function
const remove = async (id) => {
    id = validate(getUserValidation, id);

    const user = await prismaClient.user.findUnique({
        where: { id: id }
    });

    if (!user) {
        throw new ResponseError(404, "User not found");
    }

    return prismaClient.user.delete({
        where: { id: id },
        select : {
            id: true,
            email : true
        }
    });
};

export default {
    register,
    login,
    get,
    update,  // Export the update function
    remove   // Export the remove function
};