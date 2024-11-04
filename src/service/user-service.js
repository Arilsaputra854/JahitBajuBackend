import { response } from "express";
import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";
import { getUserValidation, loginUserValidation, registerUserValidation } from "../validation/user-validation.js"
import { validate } from "../validation/validation.js"
import bcrypt from "bcrypt"
import { v4 as uuid } from "uuid";

const register = async(request)=>{
    var user = validate(registerUserValidation, request);

    const countUser = await prismaClient.user.count({
        where : {
            id : user.id
        }
    })

    if(countUser === 1){
        throw new ResponseError(400,"Email already exists")
    }

    user.password = await bcrypt.hash(user.password, 10)

    return prismaClient.user.create({
        data : user,
        select : {
            id : true,
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
            id : loginRequest.id
        },
        select : {
            id : true,
            password : true
        }
    })

    if(!user){
        throw new ResponseError(401,"Email or password is invalid")
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
            id : user.id
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

export default{
    register, login, get
}