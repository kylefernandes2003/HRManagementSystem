const { z } = require("zod");

const signUpSchema = z.object({
  username: z
    .string({ required_error: "Name is required" })
    .trim()
    .min(3, { message: "Name must be atleast 3 charcters" })
    .max(255, { message: "Name must not be more than 255 characters" }),
  email: z
    .string({ required_error: "Email is required" })
    .trim()
    .email({ message: "Invalid email address" })
    .min(3, { message: "Email must be atleast 3 charcters" })
    .max(255, { message: "Email must not be more than 255 characters" }),
  phone: z
    .string({ required_error: "Phone is required" })
    .trim()
    .min(10, { message: "Phone no. must be atleast 10 characters" })
    .max(20, { message: "Phone no. must not be more than 20 characters" }),
  age: z.string({ required_error: "Age is required" }).trim(),
  // .min(10, {message: "Phone no. must be atleast 10 charcters"})
  // .max(20, {message: "Phone no. must not be more than 20 characters"}),
  address: z
    .string({ required_error: "Address is required" })
    .trim()
    .min(10, { message: "Address must be atleast 10 characters" }),
  // .max(20, {message: "Phone no. must not be more than 20 characters"}),
  position: z.string({ required_error: "Position is required" }).trim(),
  // .min(10, {message: "Phone no. must be atleast 10 charcters"})
  // .max(20, {message: "Phone no. must not be more than 20 characters"}),
  department: z.string({ required_error: "Department is required" }).trim(),
  password: z
    .string({ required_error: "Password is required" })
    .trim()
    .min(6, { message: "Password must be atleast 6 charcters" })
    .max(20, { message: "Password must not be more than 20 characters" }),
});

module.exports = signUpSchema;
