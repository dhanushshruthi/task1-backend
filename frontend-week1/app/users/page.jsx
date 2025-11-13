'use client';
import { useEffect, useState } from 'react';
import UserTable from '@/components/UserTable';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

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

      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
        {/* ✅ Back to Home Button */}
        <button
          onClick={() => router.push('/')}
          style={{
            backgroundColor: '#6c757d',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            padding: '8px 16px',
            cursor: 'pointer',
          }}
        >
          ← Back to Home
        </button>

        
      </div>

      {/* ✅ UserTable component renders the full table */}
      <UserTable users={users} />
    </div>
  );
}
