export interface GitHubUser {
  login: string;
  avatar_url: string;
  followers: number;
  html_url: string;
  name: string | null;
  bio: string | null;
  company: string | null;
  location: string | null;
  blog: string | null;
  public_repos: number;
  following: number;
  created_at: string;
}

export interface GitHubRepository {
  id: number;
  name: string;
  language: string | null;
  stargazers_count: number;
  html_url: string;
  description: string | null;
  forks_count: number;
  watchers_count: number;
  open_issues_count: number;
  updated_at: string;
}

export interface RepositoryPage {
  list: GitHubRepository[];
  hasNextPage: boolean;
}
