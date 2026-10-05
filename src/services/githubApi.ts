import type {
  GitHubRepository,
  GitHubUser,
  RepositoryPage,
} from "../types/github";

const GITHUB_API_URL = "https://api.github.com";
const REPOSITORIES_PER_PAGE = 8;

async function request<T>(url: string): Promise<T> {
  const response = await fetch(url);
  if (!response.ok) {
    if (response.status === 404) throw new Error("GitHub user not found.");
    throw new Error("Unable to load data from GitHub.");
  }
  return response.json() as Promise<T>;
}

export function getProfile(username: string): Promise<GitHubUser> {
  return request<GitHubUser>(
    `${GITHUB_API_URL}/users/${encodeURIComponent(username)}`,
  );
}

export async function getRepositories(
  username: string,
  page: number,
): Promise<RepositoryPage> {
  const repositories = await request<GitHubRepository[]>(
    `${GITHUB_API_URL}/users/${encodeURIComponent(username)}/repos?per_page=${REPOSITORIES_PER_PAGE + 1}&page=${page}`,
  );
  return {
    list: repositories.slice(0, REPOSITORIES_PER_PAGE),
    hasNextPage: repositories.length > REPOSITORIES_PER_PAGE,
  };
}
