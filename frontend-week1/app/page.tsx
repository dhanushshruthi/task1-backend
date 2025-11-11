'use client';
import Link from 'next/link';

export default function Home() {
  return (
    <div style={{ padding: '40px', textAlign: 'center', fontFamily: 'Arial' }}>
      <h1>Welcome to the User Management App</h1>
      <p>This is the frontend for your backend API project.</p>

      <div style={{ marginTop: '30px' }}>
        <Link href="/users">
          <button style={{ marginRight: '15px', padding: '10px 20px' }}>View All Users</button>
        </Link>
        <Link href="/create">
          <button style={{ padding: '10px 20px' }}>Create New User</button>
        </Link>
      </div>
    </div>
  );
}
