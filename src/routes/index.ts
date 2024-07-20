import express from "express";
import userRoutes from "./user";

const router = express.Router();

// Register routes
router.use("/users", userRoutes);

export default router;
