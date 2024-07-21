import { Router } from "express";
import { createUser, loginUser } from "../controllers/user";
import {
  validateCreateUserParams,
  validateLoginParams,
} from "../middleware/user";
import contactsRouter from "./contact";

const router = Router();

router.post("/register", validateCreateUserParams, createUser);
router.post("/login", validateLoginParams, loginUser);
router.use("/contacts", contactsRouter);

export default router;
