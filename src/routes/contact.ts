import { Router } from "express";
import {
  createNewContact,
  fetchUserContacts,
  fetchUserContact,
} from "../controllers/contact";
import { authenticateJWT } from "../middleware/auth";
import { validateCreateUserParams } from "../middleware/user";

const router = Router();
router.use(authenticateJWT);

router.get("/", fetchUserContacts);
router.get("/:id", fetchUserContact);
router.post("/", validateCreateUserParams, createNewContact);

export default router;
