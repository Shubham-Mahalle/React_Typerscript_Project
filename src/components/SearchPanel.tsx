import { useState, type FormEvent } from "react";
import { useGitHub } from "../context/GitHubContext";

export function SearchPanel() {
  const [username, setUsername] = useState("");
  const [validationError, setValidationError] = useState("");
  const { search, loadingMessage, error, clearError } = useGitHub();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmedUsername = username.trim();
    if (!trimmedUsername) {
      setValidationError("Please enter a GitHub username.");
      return;
    }
    setValidationError("");
    await search(trimmedUsername);
  }

  return (
    <section className="search-panel">
      <h2 id="search-heading">Find a GitHub user</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">GitHub username</label>
        <div className="search-row">
          <input
            id="username"
            type="text"
            value={username}
            onChange={(event) => {
              setUsername(event.target.value);
              setValidationError("");
              clearError();
            }}
            placeholder="Enter Username"
            autoComplete="off"
          />
          <button type="submit" disabled={Boolean(loadingMessage)}>
            Search Profile
          </button>
        </div>
      </form>
      {loadingMessage && (
        <p className="loading" role="status">
          {loadingMessage}
        </p>
      )}
      {(validationError || error) && (
        <p className="error" role="alert">
          {validationError || error}
        </p>
      )}
    </section>
  );
}
