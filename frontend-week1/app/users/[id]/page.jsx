"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import "./userdetails.css"; // custom css

export default function UserDetails() {
  const { id } = useParams();
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [preferences, setPreferences] = useState(null);
  const [activeTab, setActiveTab] = useState("about");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const userRes = await fetch(`http://localhost:5000/api/v1/users/${id}`);
        const postRes = await fetch(`http://localhost:5000/api/v1/users/${id}/posts`);
        const prefRes = await fetch(`http://localhost:5000/api/v1/users/${id}/preferences`);

        const userData = await userRes.json();
        const postData = await postRes.json();
        const prefData = await prefRes.json();

        setUser(userData);
        setPosts(postData);
        setPreferences(prefData);
      } catch (error) {
        console.error("Error fetching:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [id]);

  if (loading)
    return (
      <div className="loader-bg">
        <div className="loader">Loading...</div>
      </div>
    );

  if (!user)
    return <div className="notfound">User not found.</div>;

  return (
    <div className="user-details-page">
      {/* Header */}
      <header className="user-header">
        <button className="back-btn" onClick={() => router.push("/users")}>← Back</button>
        <h1>User Dashboard</h1>
      </header>

      {/* Main Content */}
      <div className="user-card">
        <div className="avatar">{user.name[0]}</div>
        <h2>{user.name}</h2>
        <p className="email">{user.email}</p>
        <span className={`status ${user.isDeleted ? "inactive" : "active"}`}>
          {user.isDeleted ? "Inactive" : "Active"}
        </span>

        {/* Tabs */}
        <div className="tab-buttons">
          <button className={activeTab === "about" ? "active" : ""} onClick={() => setActiveTab("about")}>About</button>
          <button className={activeTab === "preferences" ? "active" : ""} onClick={() => setActiveTab("preferences")}>Preferences</button>
          <button className={activeTab === "posts" ? "active" : ""} onClick={() => setActiveTab("posts")}>Posts</button>
        </div>

        {/* Tab Content */}
        <div className="tab-content">
          {activeTab === "about" && (
            <div className="fade-in">
              <p><b>Email:</b> {user.email}</p>
              <p><b>Roles:</b> {user.roles.join(", ")}</p>
              <p><b>Status:</b> {user.isDeleted ? "Inactive" : "Active"}</p>
            </div>
          )}

          {activeTab === "preferences" && (
            <div className="fade-in">
              <p><b>Theme:</b> {preferences?.settings?.theme || "—"}</p>
              <p><b>Language:</b> {preferences?.settings?.language || "—"}</p>
              <p><b>Notifications:</b> {preferences?.settings?.notifications ? "Enabled" : "Disabled"}</p>
            </div>
          )}

          {activeTab === "posts" && (
            <div className="fade-in">
              {posts.length > 0 ? (
                posts.map((p) => (
                  <div key={p._id} className="post-card">
                    <h3>{p.title}</h3>
                    <p>{p.content}</p>
                  </div>
                ))
              ) : (
                <p>No posts available.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
