import cors from "cors";
import compression from "compression";
import express, { Application } from "express";
import helmet from "helmet";
import { env } from "~/utils/envConfig";
import router from "./routes";
import errorHandler from "./middlewares/errorHandler";
import rateLimiter from "./middlewares/rateLimiter";

export const app: Application = express();

// Middlewares
app.use(cors({ origin: env.CORS_ORIGIN, credentials: true }));
app.use(helmet());
app.use(compression());
app.use(rateLimiter);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/", router);

// Error handler
app.use(errorHandler());
