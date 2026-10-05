import { useGitHub } from "../context/GitHubContext";

export function ProfileCard() {
  const { profile } = useGitHub();
  if (!profile) return null;

  const joinedDate = new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
  }).format(new Date(profile.created_at));

  return (
    <section className="profile-section" aria-labelledby="profile-heading">
      <details>
        <summary className="profile-content profile-summary">
          <img
            className="profile-image"
            src={profile.avatar_url}
            alt={`${profile.login} GitHub profile`}
          />
          <div>
            <h2 id="profile-heading">
              Username: {profile.login || "Not available"}
            </h2>
            <p>
              <strong>Followers:</strong> {profile.followers}
            </p>
            <span className="details-hint">Click to view profile details</span>
          </div>
        </summary>
        <div className="profile-details">
          <p>
            <strong>Name:</strong> {profile.name || "Not available"}
          </p>
          <p>
            <strong>Bio:</strong> {profile.bio || "Not available"}
          </p>
          <p>
            <strong>Company:</strong> {profile.company || "Not available"}
          </p>
          <p>
            <strong>Location:</strong> {profile.location || "Not available"}
          </p>
          <p>
            <strong>Public repositories:</strong> {profile.public_repos}
          </p>
          <p>
            <strong>Following:</strong> {profile.following}
          </p>
          <p>
            <strong>Joined GitHub:</strong> {joinedDate}
          </p>
          <p>
            <strong>Profile URL:</strong>{" "}
            <a
              className="profile-link"
              href={profile.html_url}
              target="_blank"
              rel="noreferrer"
            >
              {profile.html_url}
            </a>
          </p>
          {profile.blog && (
            <p>
              <strong>Website:</strong>{" "}
              <a className="profile-link" href={profile.blog} target="_blank" rel="noreferrer">
                {profile.blog}
              </a>
            </p>
          )}
        </div>
      </details>
    </section>
  );
}
