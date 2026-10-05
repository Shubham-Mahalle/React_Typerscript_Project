import { createContext, useContext, useState, type ReactNode } from "react";
import { getProfile, getRepositories } from "../services/githubApi";
import type { GitHubRepository, GitHubUser } from "../types/github";

interface GitHubContextValue {
  profile: GitHubUser | null;
  repositories: GitHubRepository[];
  page: number;
  hasNextPage: boolean;
  loadingMessage: string;
  error: string;
  search: (username: string) => Promise<void>;
  changePage: (nextPage: number) => Promise<void>;
  clearError: () => void;
}

const GitHubContext = createContext<GitHubContextValue | undefined>(undefined);

export function GitHubProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<GitHubUser | null>(null);
  const [repositories, setRepositories] = useState<GitHubRepository[]>([]);
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("");
  const [error, setError] = useState("");
  const [username, setUsername] = useState("");

  async function search(nextUsername: string) {
    setError("");
    setProfile(null);
    setRepositories([]);
    setPage(1);
    try {
      setLoadingMessage("Loading profile...");
      const user = await getProfile(nextUsername);
      setProfile(user);
      setUsername(nextUsername);
      setLoadingMessage("Loading repositories...");
      const repositoryPage = await getRepositories(nextUsername, 1);
      setRepositories(repositoryPage.list);
      setHasNextPage(repositoryPage.hasNextPage);
    } catch (problem) {
      setError(
        problem instanceof Error
          ? problem.message
          : "Something went wrong. Please try again.",
      );
    } finally {
      setLoadingMessage("");
    }
  }

  async function changePage(nextPage: number) {
    if (!username || nextPage < 1 || (nextPage > page && !hasNextPage)) return;
    const previousPage = page;
    setLoadingMessage("Loading more repositories...");
    setError("");
    setPage(nextPage);
    try {
      const repositoryPage = await getRepositories(username, nextPage);
      if (repositoryPage.list.length === 0 && nextPage > previousPage) {
        setPage(previousPage);
        setHasNextPage(false);
        return;
      }
      setRepositories(repositoryPage.list);
      setHasNextPage(repositoryPage.hasNextPage);
    } catch (problem) {
      setPage(previousPage);
      setError(
        problem instanceof Error
          ? problem.message
          : "Unable to load repositories.",
      );
    } finally {
      setLoadingMessage("");
    }
  }

  return (
    <GitHubContext.Provider
      value={{
        profile,
        repositories,
        page,
        hasNextPage,
        loadingMessage,
        error,
        search,
        changePage,
        clearError: () => setError(""),
      }}
    >
      {children}
    </GitHubContext.Provider>
  );
}

export function useGitHub() {
  const context = useContext(GitHubContext);
  if (!context) throw new Error("useGitHub must be used inside GitHubProvider");
  return context;
}
