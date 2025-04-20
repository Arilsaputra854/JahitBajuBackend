import { prismaClient } from "../src/application/database"
import bcrypt from "bcrypt"

export const removeTestUser = async() =>{
    await prismaClient.user.deleteMany({
        where : {
            id : "test"
        }
    })
}

export const createTestUser = async()=>{
    await prismaClient.user.create({
        data:{
            id : "test",
            password : await bcrypt.hash("rahasia",10),
            name : "test",
            token : "token"
        }
    })
}
