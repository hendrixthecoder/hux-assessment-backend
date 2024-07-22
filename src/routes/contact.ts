import { Router } from "express";
import {
  createNewContact,
  fetchUserContacts,
  fetchUserContact,
  editUserContact,
} from "../controllers/contact";
import { authenticateJWT } from "../middleware/auth";
import { validateCreateUserParams } from "../middleware/user";
import { validateEditContactParams } from "../middleware/contact";

const router = Router();
router.use(authenticateJWT);

router.get("/", fetchUserContacts);
router.post("/", validateCreateUserParams, createNewContact);
router.get("/:id", fetchUserContact);
router.put("/:id", validateEditContactParams, editUserContact);

export default router;
