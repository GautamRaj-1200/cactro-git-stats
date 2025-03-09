import dotenv from "dotenv";
dotenv.config();

export const config = {
  app: {
    port: process.env.PORT || 3000,
  },
  github: {
    token: process.env.GITHUB_TOKEN,
    username: process.env.GITHUB_USERNAME || "your-username",
    apiUrl: "https://api.github.com",
  },
};
