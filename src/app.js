import express from "express";
const app = express();
import cors from "cors";

const allowedOrigins = [
  "https://gautamraj.vercel.app",
  "http://localhost:3000",
];

app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST"],
    credentials: true,
  })
);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
import githubRoutes from "./routes/githubRoutes.js";
app.use("/github", githubRoutes);
export default app;
