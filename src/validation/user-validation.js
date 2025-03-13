import Joi from "joi";

const addressValidation = Joi.object({
    street_address: Joi.string().max(255).required(), // Jalan utama
    rt: Joi.string().max(3).optional(), // RT opsional
    rw: Joi.string().max(3).optional(), // RW opsional
    subdistrict: Joi.string().max(100).optional(), // Kecamatan/Kelurahan
    city: Joi.number().required(), // Kota/Kabupaten
    province: Joi.number().required(), // Provinsi
    postal_code: Joi.number().required(), // Kode pos opsional
});

const registerUserValidation = Joi.object({
    email: Joi.string().max(100).required(),
    password: Joi.string().max(100).required(),
    name: Joi.string().max(100).required(),
    phone_number: Joi.string().max(100),
    address: addressValidation.optional(), // Alamat boleh ada atau tidak
    img_url: Joi.string().max(100)
});

const loginUserValidation = Joi.object({
    email: Joi.string().max(100).required(),
    password: Joi.string().max(100).required()
});

const getUserValidation = Joi.string().max(100).required();

const updateUserValidation = Joi.object({
    email: Joi.string().email().max(100).optional(),
    password: Joi.string().max(100).optional(),
    name: Joi.string().max(100).optional(),
    phone_number: Joi.string().max(100).optional(),
    address: addressValidation.optional(), // Alamat punya validasi khusus
    img_url: Joi.string().uri().max(100).optional()
}).min(1); 

export {
    registerUserValidation,
    loginUserValidation,
    getUserValidation,
    updateUserValidation
};
