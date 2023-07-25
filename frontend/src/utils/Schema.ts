import { z } from "zod";

export const SignupFormSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Name cannot be less than 3 characters" })
    .max(36),
  email: z
    .string()
    .email({ message: "Invalid email address" })
    .min(1, { message: "Email is required" }),
  password: z
    .string()
    .min(1, { message: "Password is required" })
    .min(8, { message: "Must be 8 or more characters long" }),
});

export const loginFormSchema = z.object({
  email: z
    .string()
    .email({ message: "Invalid email address" })
    .min(1, { message: "Email is required" }),
  password: z
    .string()
    .min(1, { message: "Password is required" })
    .min(8, { message: "Must be 8 or more characters long" }),
});
