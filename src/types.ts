import { userSchema } from "./middleware/user";
import { InferType } from "yup";

export type UserType = InferType<typeof userSchema>;
export type UserTypeNoPass = Omit<UserType, "password">;
