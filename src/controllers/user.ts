import { Request, Response, NextFunction } from "express";
import User from "../models/User";
import { generateToken } from "../utils";
import logger from "../utils/logger";

export const createUser = async (req: Request, res: Response) => {
  try {
    const presaveUser = new User(req.body);
    const user = await presaveUser.save();

    const token = generateToken(user._id.toString());

    res.status(201).send({ token });
  } catch (error) {
    res.status(400).send(error);
  }
};

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Compare passwords
    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Generate JWT token
    const token = generateToken(user._id.toString());

    // Send the token in the response
    res.status(200).json({ user, token });
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
