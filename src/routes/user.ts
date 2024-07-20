import { Router } from "express";
import { createUser, loginUser } from "../controllers/user";
import {
  validateCreateUserParams,
  validateLoginParams,
} from "../middleware/user";

const router = Router();

router.post("/register", validateCreateUserParams, createUser);
router.post("/login", validateLoginParams, loginUser);

export default router;
