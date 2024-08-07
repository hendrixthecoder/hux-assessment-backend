import { Response } from "express";
import logger from "../utils/logger";
import { RequestWithUser } from "../middleware/auth";
import Contact from "../models/Contact";

// All contacts controllers are protected by middleware to ensure payload validation

export const fetchUserContacts = async (
  req: RequestWithUser,
  res: Response
) => {
  try {
    const contacts = await Contact.find({ user: req.user?._id }).sort({
      createdAt: -1,
    });

    return res.json(contacts);
  } catch (error) {
    // Send error response
    logger.error(error);
    res.status(500).json({ message: "Something went wrong try again later!" });
  }
};

export const fetchUserContact = async (req: RequestWithUser, res: Response) => {
  try {
    const contact = await Contact.findOne({
      _id: req.params.id,
      user: req.user?._id,
    });

    return res.status(200).json(contact);
  } catch (error) {
    // Send error response
    logger.error(error);
    res.status(500).json({ message: "Something went wrong try again later!" });
  }
};

export const createNewContact = async (req: RequestWithUser, res: Response) => {
  try {
    const contact = new Contact({ ...req.body, user: req.user?._id });
    await contact.save();
    return res.status(201).json(contact);
  } catch (error) {
    // Send error response
    logger.error(error);
    res.status(500).json({ message: "Something went wrong try again later!" });
  }
};

export const editUserContact = async (req: RequestWithUser, res: Response) => {
  try {
    const contact = await Contact.findOne({
      user: req.user?._id,
      _id: req.params.id,
    });

    if (!contact)
      return res
        .status(404)
        .json({ message: "Contact not found or may have been deleted!" });

    // To ensure user doesnt inadvertently changes password, not possible but just a precaution
    const { password, ...updates } = req.body;
    Object.assign(contact, updates);

    await contact.save();
    return res.status(200).json(contact);
  } catch (error) {
    logger.error(error);
    res.status(500).json({ message: "Something went wrong try again later!" });
  }
};

export const deleteUserContact = async (
  req: RequestWithUser,
  res: Response
) => {
  try {
    const contact = await Contact.findOne({
      user: req.user?._id,
      _id: req.params.id,
    });

    if (!contact)
      return res
        .status(404)
        .json({ message: "Contact not found or may have been deleted!" });

    await contact.deleteOne();
    res.status(204).end();
  } catch (error) {
    logger.error(error);
    res.status(500).json({ message: "Something went wrong try again later!" });
  }
};
