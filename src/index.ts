import express, { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import passport from "../config/passport";
import routes from "./routes";
import cors from "cors";
import { CLIENT_URL } from "./lib";

const app = express();

dotenv.config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());

app.use(
  cors({
    origin: (origin, callback) => {
      if (CLIENT_URL !== origin) {
        const msg = `The CORS policy for this site does not allow access from the specified origin: ${origin}`;
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    credentials: true,
  })
);

app.use("/api", routes);

// Catch-all route handler for 404
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({ message: "Not Found" });
});

// General error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal Server Error" });
});

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
