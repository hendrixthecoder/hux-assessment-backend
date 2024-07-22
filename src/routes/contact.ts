import { Router } from "express";
import {
  createNewContact,
  fetchUserContacts,
  fetchUserContact,
  editUserContact,
  deleteUserContact,
} from "../controllers/contact";
import { authenticateJWT } from "../middleware/auth";
import { validateEditContactParams } from "../middleware/contact";

const router = Router();
router.use(authenticateJWT);

router.get("/", fetchUserContacts);
router.post("/", validateEditContactParams, createNewContact);
router.get("/:id", fetchUserContact);
router.put("/:id", validateEditContactParams, editUserContact);
router.delete("/:id", deleteUserContact);

export default router;
