import { Request, Response, NextFunction } from "express";
import User from "../models/User";
import logger from "../utils/logger";
import { RequestWithUser } from "../middleware/auth";

export const fetchUserContacts = async (
  req: RequestWithUser,
  res: Response
) => {
  try {
    return req.user;
  } catch (error) {
    // Send error response
    logger.error(error);
    res.status(500).json({ message: "Something went wrong try again later!" });
  }
};

export const fetchUserContact = async (
  req: RequestWithUser,
  res: Response
) => {};

export const createNewContact = async (req: RequestWithUser, res: Response) => {
  try {
    return req.user;
  } catch (error) {
    // Send error response
    logger.error(error);
    res.status(500).json({ message: "Something went wrong try again later!" });
  }
};
