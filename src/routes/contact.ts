import { Router } from "express";
import {
  createNewContact,
  fetchUserContacts,
  fetchUserContact,
} from "../controllers/contact";

const router = Router();

router.get("/", fetchUserContacts);
router.get("/:id", fetchUserContact);
router.post("/", createNewContact);

export default router;
