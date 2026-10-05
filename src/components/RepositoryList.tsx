import { useGitHub } from "../context/GitHubContext";

export function RepositoryList() {
  const { profile, repositories, page, hasNextPage, changePage } = useGitHub();
  if (!profile) return null;
  return (
    <section
      className="repository-section"
      aria-labelledby="repositories-heading"
    >
      <div className="section-heading">
        <div>
          <p className="eyebrow">Public projects</p>
          <h2 id="repositories-heading">Repositories</h2>
        </div>
      </div>
      <div className="repository-grid">
        {repositories.map((repository) => (
          <details className="repository-card" key={repository.id}>
            <summary>
              <h3>{repository.name}</h3>
              <p className="repository-meta">
                Language: {repository.language || "Not available"}
                <br />
                Stars: {repository.stargazers_count}
              </p>
            </summary>
            <div className="repository-details">
              <p>{repository.description || "No description available."}</p>
              <p className="repository-meta">
                <strong>Forks:</strong> {repository.forks_count}
                <br />
                <strong>Watchers:</strong> {repository.watchers_count}
                <br />
                <strong>Open issues:</strong> {repository.open_issues_count}
                <br />
                <strong>Last updated:</strong>{" "}
                {new Intl.DateTimeFormat("en", { dateStyle: "medium" }).format(
                  new Date(repository.updated_at),
                )}
              </p>
              <a
                className="repository-link"
                href={repository.html_url}
                target="_blank"
                rel="noreferrer"
              >
                View Repository on GitHub
              </a>
            </div>
          </details>
        ))}
      </div>
      {(page > 1 || hasNextPage) && (
        <div className="pagination">
          <button
            type="button"
            onClick={() => void changePage(page - 1)}
            disabled={page === 1}
          >
            Previous
          </button>
          <span>Page {page}</span>
          <button
            type="button"
            onClick={() => void changePage(page + 1)}
            disabled={!hasNextPage}
          >
            Next
          </button>
        </div>
      )}
    </section>
  );
}
