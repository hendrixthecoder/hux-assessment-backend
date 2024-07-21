import { Router } from "express";
import {
  createNewContact,
  fetchUserContacts,
  fetchUserContact,
} from "../controllers/contact";
import { authenticateJWT } from "../middleware/auth";

const router = Router();
router.use(authenticateJWT);

router.get("/", fetchUserContacts);
router.get("/:id", fetchUserContact);
router.post("/", createNewContact);

export default router;
