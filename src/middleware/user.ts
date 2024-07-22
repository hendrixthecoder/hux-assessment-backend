import * as yup from "yup";
import { Request, Response, NextFunction } from "express";

// Middleware to validate user creation parameters
export const validateCreateUserParams = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await userSchema.validate(req.body, { abortEarly: false });
    next();
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      return res.status(400).json({
        message: "Invalid request!",
        errors: error.errors,
      });
    }
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Middleware to validate login parameters
export const validateLoginParams = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const loginSchema = yup.object().shape({
    email: yup
      .string()
      .email("Invalid email address")
      .required("Email is required!"),
    password: yup
      .string()
      .required("Password is required!")
      .min(6, "Password must be at least 6 characters long!"),
  });

  try {
    await loginSchema.validate(req.body, { abortEarly: false });
    next();
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      return res.status(400).json({
        message: "Invalid request!",
        errors: error.errors,
      });
    }
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const userSchema = yup.object().shape({
  firstName: yup
    .string()
    .required("Firstname is required!")
    .min(1, "Firstname is required!"),
  lastName: yup
    .string()
    .required("Lastname is required!")
    .min(1, "Lastname is required!"),
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required!"),
  password: yup
    .string()
    .required("Password is required!")
    .min(6, "Password must be at least 6 characters long!"),
  phoneNumber: yup
    .string()
    .required("Phone number is required!")
    .matches(/^[0-9]+$/, "Phone number must contain only digits")
    .min(10, "Phone number must be at least 10 digits long!")
    .max(12, "Phone number must be at most 12 digits long!"),
});
