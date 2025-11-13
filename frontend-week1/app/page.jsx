'use client';
import { useRouter } from 'next/navigation';
import './page.css'; // Import the CSS file

export default function HomePage() {
  const router = useRouter();

  return (
    <div className="dashboard-container">
      <div className="dashboard-card">
        <h1 className="dashboard-title">Welcome to the User Management App</h1>
        <p className="dashboard-subtitle">
          Manage users, view profiles, and create new accounts effortlessly.
        </p>

        <div className="button-group">
          <button onClick={() => router.push('/users')} className="view-btn">
            View All Users
          </button>
          <button onClick={() => router.push('/create')} className="create-btn">
            Create New User
          </button>
        </div>
      </div>
    </div>
  );
}
