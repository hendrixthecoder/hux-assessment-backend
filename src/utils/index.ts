import { SignJWT } from "jose";
import dotenv from "dotenv";
import { getJWTSecret } from "../lib";
import { IUser } from "../models/User";
import { nanoid } from "nanoid";

dotenv.config();

export const generateToken = async (user: IUser) => {
  const userObject = user.toObject();
  delete userObject.password;

  const secretKey = getJWTSecret();
  const encoder = new TextEncoder();

  const jwt = await new SignJWT(userObject)
    .setProtectedHeader({ alg: "HS256" })
    .setJti(nanoid())
    .setIssuedAt()
    .setExpirationTime("1h")
    .sign(encoder.encode(secretKey));

  return jwt;
};
