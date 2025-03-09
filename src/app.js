import express from "express";
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
import githubRoutes from "./routes/githubRoutes.js";
app.use("/github", githubRoutes);
export default app;
