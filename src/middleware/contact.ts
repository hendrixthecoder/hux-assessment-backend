import * as yup from "yup";
import { Request, Response, NextFunction } from "express";

// Middleware to validate contact editing parameters
export const validateEditContactParams = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await editContactSchema.validate(req.body, { abortEarly: false });
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

export const editContactSchema = yup.object().shape({
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
  phoneNumber: yup
    .string()
    .required("Phone number is required!")
    .matches(/^[0-9]+$/, "Phone number must contain only digits")
    .min(10, "Phone number must be at least 10 digits long!")
    .max(12, "Phone number must be at most 12 digits long!"),
});
