"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function UserDetails() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [preferences, setPreferences] = useState(null);
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
        console.error("Failed to fetch user details:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [id]);

  if (loading) return <p>Loading user data...</p>;
  if (!user) return <p>User not found.</p>;

  return (
    <div className="p-6">
      <h1>User Details</h1>
      <p><b>Name:</b> {user.name}</p>
      <p><b>Email:</b> {user.email}</p>
      <p><b>Roles:</b> {user.roles.join(", ")}</p>
      <p><b>Status:</b> {user.isDeleted ? "Inactive" : "Active"}</p>

      <h2>Preferences</h2>
      {preferences ? (
        <pre>{JSON.stringify(preferences, null, 2)}</pre>
      ) : (
        <p>No preferences found</p>
      )}

      <h2>Posts</h2>
      {posts.length > 0 ? (
        posts.map((p) => (
          <div key={p._id}>
            <p><b>Title:</b> {p.title}</p>
            <p>{p.content}</p>
          </div>
        ))
      ) : (
        <p>No posts found</p>
      )}
    </div>
  );
}
