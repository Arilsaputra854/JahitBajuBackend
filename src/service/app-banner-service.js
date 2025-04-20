// Service: Updated and cleaned up functions
import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";

const addAppBanner = async (body) => {

    if(body.link  == null)
        body.link = "-"

    var appBanner = await prismaClient.appBanner.create({
        data: {
            image_url : body.image_url ,
            link : body.link        
        },
    });

    return appBanner;
};



const updateAppBanner = async (id, body) => {

    let appBanner = await prismaClient.appBanner.findFirst({
        where: { id : id }
    });


    if (!appBanner) throw new ResponseError(404, "App Banner not exist.");
    

    // Update the app banner
    const appBannerUpdated = await prismaClient.appBanner.update({
        where: { id : id },
        data: {
            image_url: body.image_url,
            link: body.link,
            last_update : new Date()
        }
    });

    return appBannerUpdated;
};


const getAppBanner = async (body) => {    

    let appBanner = await prismaClient.appBanner.findFirst({
        where: { id : body.id },
        select: { id: true, image_url: true,link:true},
    });

    
    if (!appBanner) throw new ResponseError(404, "App Banner not exist.");
    return appBanner;
};


const getAllAppBanner = async () => {    

    let appBanner = await prismaClient.appBanner.findMany({        
        select: { id: true, image_url: true,link:true},
    });
    
    return appBanner;
};



const deleteAppBanner = async (id) => {

    let appBanner = await prismaClient.appBanner.findFirst({
        where: { id : id }
    });


    if (!appBanner) throw new ResponseError(404, "App Banner not exist.");
    

    return await prismaClient.appBanner.delete({
        where: { id : id },
    });
};


export default {
    addAppBanner,
    updateAppBanner,    
    getAppBanner,    
    deleteAppBanner,
    getAllAppBanner
};