import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";

import userRoutes from "./routes/user";

const app = express();

dotenv.config();

app.use(bodyParser.json());

app.use("/api/user", userRoutes);

const dbURI =
  process.env.NODE_ENV === "production"
    ? process.env.MONGODB_URI_PROD
    : process.env.MONGODB_URI_DEV;
if (!dbURI) throw new Error("MongoDB URI is not defined in ENV");

mongoose
  .connect(dbURI)
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.log("Error connecting to MongoDB:", error));

const PORT = process.env.PORT || 3030;
app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
