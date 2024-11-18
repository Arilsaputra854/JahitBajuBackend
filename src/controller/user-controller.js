import userService  from "../service/user-service.js"


const register = async(req, res, next ) =>{

    try{
        const result = await userService.register(req.body)
        res.status(200).json({
            data : result
        })
    }catch(e){
        next(e)
    }

}

const login = async(req,res,next)=>{

    try{
        const result = await userService.login(req.body)
        res.status(200).json({
            data : result
        })
    }catch(e){
        next(e)
    }

}


const get  = async(req,res,next)=>{
    try{
        const id = req.user.id
        const result = await userService.get(id)
        res.status(200).json({
            data : result
        })
    }catch(e){
        next(e)
    }
}

// Update user function
const update = async (req, res, next) => {
    try {
        const id = req.user.id;
        const result = await userService.update(id, req.body);
        res.status(200).json({ data: result });
    } catch (e) {
        next(e);
    }
};

// Delete user function
const remove = async (req, res, next) => {
    try {
        const id = req.user.id;
        const result = await userService.remove(id);
        res.status(200).json({ data: result });
    } catch (e) {
        next(e);
    }
};

export default {
    register,
    login,
    get,
    update, 
    remove  
};
