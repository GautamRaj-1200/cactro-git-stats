import app from "./app.js";
import { config } from "./config/config.js";

// Check for required environment variables
if (!config.github.token) {
  console.error("ERROR: GITHUB_TOKEN environment variable is required");
  process.exit(1);
}

if (!config.github.username) {
  console.error("WARNING: GITHUB_USERNAME not set, using default value");
}

// Start the server
const server = app.listen(config.app.port, () => {
  console.log(`Server running on port ${config.app.port}`);
});

// Handle unhandled rejections
process.on("unhandledRejection", (err) => {
  console.error("UNHANDLED REJECTION! Shutting down...", err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

// Handle SIGTERM
process.on("SIGTERM", () => {
  console.log("SIGTERM received. Shutting down gracefully");
  server.close(() => {
    console.log("Process terminated");
  });
});
