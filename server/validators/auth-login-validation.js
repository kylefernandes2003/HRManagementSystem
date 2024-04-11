const { z } = require("zod");

const loginSchema = z.object({
    email: z
        .string({ required_error: "Email is required"})
        .trim()
        .email({message: "Invalid email address"})
        .min(3, {message: "Email must be atleast 3 charcters"})
        .max(255, {message: "Email must not be more than 255 characters"}),
    password: z
        .string({ required_error: "Password is required"})
        .trim()
        .min(6, {message: "Password must be atleast 6 charcters"})
        .max(20, {message: "Password must not be more than 20 characters"}),
})

module.exports = loginSchema;