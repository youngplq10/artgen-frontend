import Joi from "joi"

const newUserSchema = Joi.object({
    username: Joi.string().alphanum().min(3).max(20).required().messages({
        "string.empty": "Username can't be empty.",
        "string.min": "Username is too short. Minimum 3 characters.",
        "string.max": "Username is too long. Maximum 20 characters.",
        "any.required": "Username field is required to process.",
        "string.alphanum": "Username doesn't only contain alphanumeric characters."
    }),
    email: Joi.string().email({ minDomainSegments: 2, tlds: false }).required().messages({
        "string.empty": "Email can't be empty.",
        "string.email": "Email is not valid."
    }),
    password: Joi.string().min(3).max(20).pattern(new RegExp('^[a-zA-Z0-9@#$%^&+=]{3,20}$')).required().messages({
        "string.empty": "Password can't be empty.",
        "string.pattern.base": "Password is not valid.",
        "string.min": "Password is too short. Minimum 3 characters.",
        "string.max": "Password is too long. Maximum 20 characters."
    }),
    repassword: Joi.any().valid(Joi.ref('password')).required().messages({
        "any.only": "Passwords do not match.",
        "any.required": "Please confirm your password."
    })
})

const existingUserSchema = Joi.object({
    username: Joi.string().alphanum().min(3).max(20).required().messages({
        "string.empty": "Username can't be empty.",
        "string.min": "Username is too short. Minimum 3 characters.",
        "string.max": "Username is too long. Maximum 20 characters.",
        "any.required": "Username field is required to process.",
        "string.alphanum": "Username doesn't only contain alphanumeric characters."
    }),
    password: Joi.string().min(3).max(20).required().messages({
        "string.empty": "Password can't be empty.",
        "string.pattern.base": "Password is not valid.",
        "string.min": "Password is too short. Minimum 3 characters.",
        "string.max": "Password is too long. Maximum 20 characters."
    }),
})

export const validateNewUser = (getUsername: string, getEmail: string, getPassword: string, getRepassword: string) : string => {
    const result = newUserSchema.validate({ username: getUsername, email: getEmail, password: getPassword, repassword: getRepassword});

    if (result.error != null) {
        return result.error.message;
    }
    
    return "Success";
}

export const validateExistingUser = (getUsername: string, getPassword: string) : string => {
    const result = existingUserSchema.validate({ username: getUsername, password: getPassword });

    if (result.error != null) {
        return result.error.message;
    }
    
    return "Success";
}