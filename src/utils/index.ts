import { SignJWT } from "jose";
import dotenv from "dotenv";
import { getJWTSecret } from "../lib";
import { IUser } from "../models/User";
import { randomBytes } from "crypto";

dotenv.config();

export const generateToken = async (user: IUser) => {
  const userObject = user.toObject();
  delete userObject.password;

  const secretKey = getJWTSecret();
  const encoder = new TextEncoder();
  const jwtId = randomBytes(16).toString("hex");

  const jwt = await new SignJWT(userObject)
    .setProtectedHeader({ alg: "HS256" })
    .setJti(jwtId)
    .setIssuedAt()
    .setExpirationTime("10m")
    .sign(encoder.encode(secretKey));

  return jwt;
};
