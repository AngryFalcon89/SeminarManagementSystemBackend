import Joi from "@hapi/joi"

const authSchema = Joi.object({
    email: Joi.string().email().lowercase().required(),
    password: Joi.string().min(3).required(),
})

export { authSchema }