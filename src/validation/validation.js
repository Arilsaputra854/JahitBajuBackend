import { ResponseError } from "../error/response-error.js"

const validate = (schema, request) =>{
    var result = schema.validate(request,{
        abortEarly : false,
        allowUnknown : false
    })

    if(result.error){
        throw new ResponseError(400,result.error.message)
    }else{
        return result.value 
    }
}


export{
    validate
}