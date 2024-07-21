import { Request, Response, NextFunction } from "express";
import User from "../models/User";
import logger from "../utils/logger";

export const fetchUserContacts = async (req: Request, res: Response) => {
  try {
  } catch (error) {
    // Send error response
    logger.error(error);
    res.status(500).json({ message: "Something went wrong try again later!" });
  }
};

export const fetchUserContact = async (req: Request, res: Response) => {
  try {
  } catch (error) {
    // Send error response
    logger.error(error);
    res.status(500).json({ message: "Something went wrong try again later!" });
  }
};

export const createNewContact = async (req: Request, res: Response) => {};
