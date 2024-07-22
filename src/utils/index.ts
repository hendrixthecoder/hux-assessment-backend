import { SignJWT } from "jose";
import dotenv from "dotenv";
import { getJWTSecret } from "../lib";
import { IUser } from "../models/User";
import { randomBytes } from "crypto";
import { NextFunction, Request, Response } from "express";
import logger from "./logger";

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
    .setExpirationTime("1h")
    .sign(encoder.encode(secretKey));

  return jwt;
};

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.error(err.stack);
  if (err.name === "UnauthorizedError") {
    return res.status(401).json({ error: "Unauthorized" });
  }

  return res.status(500).json({ error: "Internal Server Error" });
};
