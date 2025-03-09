/**
 * Service for interacting with GitHub API
 */
import axios from "axios";
import { config } from "../config/config.js";

// Create GitHub API client
const githubClient = axios.create({
  baseURL: config.github.apiUrl,
  headers: {
    Authorization: `token ${config.github.token}`,
    Accept: "application/vnd.github.v3+json",
  },
});

/**
 * Get user profile and repositories
 */
export async function getUserData() {
  try {
    const [userResponse, reposResponse] = await Promise.all([
      githubClient.get(`/users/${config.github.username}`),
      githubClient.get(
        `/users/${config.github.username}/repos?sort=updated&per_page=100`
      ),
    ]);

    return {
      username: userResponse.data.login,
      name: userResponse.data.name,
      avatar_url: userResponse.data.avatar_url,
      bio: userResponse.data.bio,
      public_repos: userResponse.data.public_repos,
      followers: userResponse.data.followers,
      following: userResponse.data.following,
      repositories: reposResponse.data.map((repo) => ({
        name: repo.name,
        description: repo.description,
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        language: repo.language,
        updated_at: repo.updated_at,
        html_url: repo.html_url,
      })),
    };
  } catch (error) {
    throw new Error(`Failed to fetch GitHub user data: ${error.message}`);
  }
}

/**
 * Get repository details
 * @param {string} repoName - Repository name
 */
export async function getRepositoryData(repoName) {
  try {
    const [repoResponse, contributorsResponse, issuesResponse] =
      await Promise.all([
        githubClient.get(`/repos/${config.github.username}/${repoName}`),
        githubClient.get(
          `/repos/${config.github.username}/${repoName}/contributors`
        ),
        githubClient.get(`/repos/${config.github.username}/${repoName}/issues`),
      ]);

    return {
      name: repoResponse.data.name,
      full_name: repoResponse.data.full_name,
      description: repoResponse.data.description,
      stars: repoResponse.data.stargazers_count,
      forks: repoResponse.data.forks_count,
      watchers: repoResponse.data.watchers_count,
      open_issues: repoResponse.data.open_issues_count,
      language: repoResponse.data.language,
      created_at: repoResponse.data.created_at,
      updated_at: repoResponse.data.updated_at,
      homepage: repoResponse.data.homepage,
      html_url: repoResponse.data.html_url,
      contributors: contributorsResponse.data.map((contributor) => ({
        username: contributor.login,
        contributions: contributor.contributions,
        avatar_url: contributor.avatar_url,
        profile_url: contributor.html_url,
      })),
      issues: issuesResponse.data.map((issue) => ({
        number: issue.number,
        title: issue.title,
        state: issue.state,
        created_at: issue.created_at,
        html_url: issue.html_url,
        user: {
          username: issue.user.login,
          avatar_url: issue.user.avatar_url,
        },
      })),
    };
  } catch (error) {
    throw new Error(`Failed to fetch repository data: ${error.message}`);
  }
}

/**
 * Create an issue in a repository
 * @param {string} repoName - Repository name
 * @param {Object} issueData - Issue data (title, body)
 */
export async function createIssue(repoName, issueData) {
  try {
    const response = await githubClient.post(
      `/repos/${config.github.username}/${repoName}/issues`,
      issueData
    );

    return {
      number: response.data.number,
      title: response.data.title,
      url: response.data.html_url,
    };
  } catch (error) {
    throw new Error(`Failed to create issue: ${error.message}`);
  }
}
