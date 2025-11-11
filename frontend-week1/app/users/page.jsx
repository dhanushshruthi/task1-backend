'use client';
import { useEffect, useState } from 'react';
import UserTable from '@/components/UserTable';
import Link from 'next/link';

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchUsers() {
      try {
        const res = await fetch('http://localhost:5000/api/v1/users');
        if (!res.ok) throw new Error('Failed to fetch users');
        const data = await res.json();
        setUsers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchUsers();
  }, []);

  if (loading) return <p>Loading users...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div style={{ padding: '20px' }}>
      <h1>User Management Console</h1>
      <div style={{ marginBottom: '15px' }}>
        <Link href="/create">
          <button
            style={{
              backgroundColor: '#3b82f6',
              color: 'white',
              padding: '8px 15px',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            Create User
          </button>
        </Link>
      </div>

      {/* ✅ UserTable component renders the full table */}
      <UserTable users={users} />
    </div>
  );
}
