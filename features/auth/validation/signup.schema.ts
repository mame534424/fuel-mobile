import { z } from "zod";

export const signupSchema = z
  .object({

    email: z
      .string()
      .email("Invalid email"),

    username: z
      .string()
      .min(
        3,
        "Username too short"
      ),

    password: z
      .string()
      .min(
        6,
        "Password must be at least 6 characters"
      ),

    confirmPassword: z
      .string(),

  })

  .refine(
    (data) =>
      data.password ===
      data.confirmPassword,// this will check if the password and confirm password fields match

    {
      message:
        "Passwords do not match",

      path: [
        "confirmPassword",
      ],// this will show the error message on the confirm password field
    }
  );