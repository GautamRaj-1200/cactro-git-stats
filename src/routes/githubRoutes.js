/**
 * GitHub API routes
 */
import express from "express";
const router = express.Router();
import * as githubController from "../controllers/githubController.js";

// Get user profile and repositories
router.get("/", githubController.getUserProfile);

// Get repository details
router.get("/:repoName", githubController.getRepository);

// Create an issue in a repository
router.post("/:repoName/issues", githubController.createRepoIssue);

export default router;
