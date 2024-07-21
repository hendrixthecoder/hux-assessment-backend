import { NextFunction, Response, Request } from "express";
import { jwtVerify } from "jose";
import { getJWTSecret } from "../lib";
import { UserTypeNoPass } from "../types";

export interface RequestWithUser extends Request {
  user?: UserTypeNoPass;
}

export const authenticateJWT = async (
  request: RequestWithUser, // Changed to use the extended RequestWithUser interface
  response: Response,
  next: NextFunction
) => {
  const token = request.cookies.session_token;

  if (!token) {
    return response.status(401).json({ message: "Unauthorized" }); // Return JSON response for better error handling
  }

  try {
    const secretKey = getJWTSecret();
    const encoder = new TextEncoder();

    const { payload } = await jwtVerify(token, encoder.encode(secretKey));

    request.user = payload as UserTypeNoPass; // Attach the user payload to the request object

    next();
  } catch (error) {
    return response.status(403).json({ message: "Forbidden" }); // Return JSON response for better error handling
  }
};
