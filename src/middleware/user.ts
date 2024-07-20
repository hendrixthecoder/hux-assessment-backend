import { Request, Response, NextFunction } from "express";
import { z } from "zod";

const userSchema = z.object({
  firstName: z.string().min(1, "Firstname is required!"),
  lastName: z.string().min(1, "Lastname is required!"),
  email: z.string().email("Invalid email address").min(1, "Email is required!"),
  password: z.string().min(6, "Password must be at least 6 characters long!"),
  phoneNumber: z.string().min(10, "Number must be at least 10 digits long!"),
});

// Middleware to validate user creation parameters
export const validateCreateUserParams = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const validationResult = userSchema.safeParse(req.body);
  if (!validationResult.success) {
    return res.status(400).json({
      message: "Invalid request!",
      errors: validationResult.error.errors,
    });
  }
  next();
};

// Middleware to validate login parameters
export const validateLoginParams = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;
  const validationResult = z
    .object({
      email: z
        .string()
        .email("Invalid email address")
        .min(1, "Email is required!"),
      password: z
        .string()
        .min(6, "Password must be at least 6 characters long!"),
    })
    .safeParse({ email, password });

  if (!validationResult.success) {
    return res.status(400).json({
      message: "Invalid request!",
      errors: validationResult.error.errors,
    });
  }
  next();
};
