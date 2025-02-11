# JAHIT BAJU API SPECIFICATION

# User API Spec

## Register User API
Endpoint : POST /api/users/register

Request Body :
```json
{
    "id" : "arilsaputra@gmail.com",
    "password" : "Rahasia",
    "name" : "Aril Saputra",
    "phone_number" : "08123456789",
    "address" : "Komplek ABC, jalak A, RT/RW 00/00",
    "img_url" : "api.jahitbaju.com/storage/arilsaputra854/pic.png"
}
```

Response Body Sucess:
```json
{
    "data" : {
        "id" : "arilsaputra@gmail.com",
        "name" : "Aril Saputra",
        "phone_number" : "08123456789",
        "address" : "Komplek ABC, jalak A, RT/RW 00/00",
        "img_url" : "api.jahitbaju.com/storage/arilsaputra854/pic.png"
    }
}
```


Response Body Error:
```json
{
    "errors" : "Email already registered"
}
```

## Login User API
Endpoint : POST /api/users/login


Request Body:
```json
{
    "id" : "arilsaputra@gmail.com",
    "password" : "Rahasia"
}
```


Response Body Sucess:
```json
{
    "data" : {
        "token" : "unique-token"
    }
}
```


Response Body Error:
```json
{
    "errors" : "Email or password invalid"
}
```

## Update User API
Endpoint : PATCH /api/users/current

Headers : 
- Authorizaton : token

Request Body:
```json
{
    "name" : "Aril S" ,// optional
    "password" : "new password" //optional
}
```


Response Body Sucess:
```json
{
    "data" : {
        "id" : "arilsaputra854",
        "name" : "Aril S"
    }
}
```


Response Body Error:
```json
{
    "errors" : "Name length max 100"
}
```

## Get User API
Endpoint : GET /api/users/current

Headers : 
- Authorizaton : token


Response Body Sucess:
```json
{
    "id" : "arilsaputra@gmail.com",
    "name" : "Aril Saputra",
    "phone_number" : "08123456789",
    "address" : "Komplek ABC, jalak A, RT/RW 00/00",
    "img_url" : "api.jahitbaju.com/storage/arilsaputra854/pic.png"
}
```

Response Body Error:
```json
{
    "errors" : "Unauthorized"
}
```


## Logout User API
Endpoint : DELETE /api/users/logout

Headers : 
- Authorizaton : token


Response Body Sucess:
```json
{
    "data" : "OK"
}
```

Response Body Error:
```json
{
    "errors" : "Unauthorized"
}
```
