import { Request, Response } from "express";
import User from "../models/User";
import { generateToken } from "../utils";

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

export const loginUser = async (req: Request, res: Response) => {
  // TODO
};
