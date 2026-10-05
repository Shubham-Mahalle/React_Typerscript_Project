import { SearchPanel } from "./components/SearchPanel";
import { ProfileCard } from "./components/ProfileCard";
import { RepositoryList } from "./components/RepositoryList";
import { GitHubProvider } from "./context/GitHubContext";
import "./index.css";

function App() {
  return (
    <GitHubProvider>
      <header className="site-header">
        <div className="container">
          <nav className="site-nav">
            <a className="site-title" href="/">
              GitHub Profile Fetcher
            </a>
            <span className="nav-label">Async React + TypeScript</span>
          </nav>
        </div>
      </header>
      <main className="container">
        <SearchPanel />
        <ProfileCard />
        <RepositoryList />
      </main>
      <footer className="site-footer">
        <div className="container">
          Built with React, TypeScript, and the GitHub API.
        </div>
      </footer>
    </GitHubProvider>
  );
}

export default App;
