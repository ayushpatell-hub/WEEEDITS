import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import authRoutes from "./routes/authRoutes";
import contactRoutes from "./routes/contactRoutes";
import userRoutes from "./routes/userRoutes";
import requestRoutes from "./routes/requestRoutes";
import messageRoutes from "./routes/messageRoutes";
import adminRoutes from "./routes/adminRoutes";
import { apiLimiter, authLimiter, contactLimiter } from "./middleware/security";
import { notFound, errorHandler } from "./middleware/error";

const app = express();

app.use(helmet());
app.use(
  cors({
    origin: [
      process.env.CLIENT_URL || "http://localhost:3000",
      process.env.ADMIN_URL || "http://localhost:3001",
    ],
    credentials: true,
  })
);
app.use(express.json());
app.use(morgan("dev"));

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", app: "WEEEDITS" });
});

app.use("/api", apiLimiter);
app.use("/api/auth", authLimiter);
app.use("/api/contact", contactLimiter);

app.use("/api/auth", authRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/users", userRoutes);
app.use("/api/requests", requestRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/admin", adminRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;