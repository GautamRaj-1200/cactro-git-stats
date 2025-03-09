import * as githubService from "../services/githubService.js";

/**
 * Get user profile and repositories
 */
export async function getUserProfile(req, res) {
  try {
    const userData = await githubService.getUserData();
    res.json(userData);
  } catch (error) {
    res
      .status(500)
      .json({ error: `Failed to fetch user data: ${error.message}` });
  }
}

/**
 * Get repository details
 */
export async function getRepository(req, res) {
  try {
    const repoName = req.params.repoName;
    const repoData = await githubService.getRepositoryData(repoName);
    res.json(repoData);
  } catch (error) {
    res
      .status(500)
      .json({ error: `Failed to fetch repository data: ${error.message}` });
  }
}

/**
 * Create an issue in a repository
 */
export async function createRepoIssue(req, res) {
  try {
    const repoName = req.params.repoName;
    const { title, body } = req.body;

    // Validate request
    if (!title) {
      return res.status(400).json({ error: "Issue title is required" });
    }

    const issue = await githubService.createIssue(repoName, { title, body });

    res.status(201).json({
      message: "Issue created successfully",
      issue,
    });
  } catch (error) {
    res.status(500).json({ error: `Failed to create issue: ${error.message}` });
  }
}
