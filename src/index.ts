import express, { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import routes from "./routes";
import cors from "cors";
import { CLIENT_URL } from "./lib";
import logger from "./utils/logger";
import morgan from "morgan";
import { errorHandler } from "./utils";

const app = express();

dotenv.config();

app.use(morgan("combined"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);

      if (CLIENT_URL !== origin) {
        const msg = `The CORS policy for this site does not allow access from the specified origin: ${origin}`;
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    credentials: true,
  })
);

// Register all routes
app.use("/api", routes);

// Catch-all route handler for 404
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({ message: "Not Found" });
});

// General error handling middleware
app.use(errorHandler);

const dbURI =
  process.env.NODE_ENV === "production"
    ? process.env.MONGODB_URI_PROD
    : process.env.MONGODB_URI_DEV;
if (!dbURI) throw new Error("MongoDB URI is not defined in ENV");

mongoose
  .connect(dbURI)
  .then(() => logger.info("MongoDB connected"))
  .catch((error) => logger.error(`Error connecting to MongoDB:, ${error}`));

const PORT = process.env.PORT || 3030;
app.listen(PORT, () => logger.info(`Server running on PORT ${PORT}`));
