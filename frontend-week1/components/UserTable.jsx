'use client';
import Link from 'next/link';
import { useState } from 'react';

export default function UserTable({ users = [] }) {
  const [userList, setUserList] = useState(users);

  // 🟢 Toggle Active/Inactive (U4)
  const handleToggleStatus = async (userId, currentStatus) => {
    try {
      const res = await fetch(`http://localhost:5000/api/v1/users/${userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isDeleted: !currentStatus }),
      });

      if (res.ok) {
        alert('User status updated successfully!');
        setUserList((prev) =>
          prev.map((u) =>
            u._id === userId ? { ...u, isDeleted: !currentStatus } : u
          )
        );
      } else {
        alert('Failed to update user status');
      }
    } catch (error) {
      console.error(error);
      alert('Error updating status');
    }
  };

  // 🔴 Soft Delete User (U5)
  const handleDelete = async (userId) => {
    if (!confirm('Are you sure you want to delete this user?')) return;

    try {
      const res = await fetch(`http://localhost:5000/api/v1/users/${userId}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        alert('User deleted successfully!');
        setUserList((prev) => prev.filter((u) => u._id !== userId));
      } else {
        alert('Failed to delete user');
      }
    } catch (error) {
      console.error(error);
      alert('Error deleting user');
    }
  };

  if (!userList.length) return <p>No users yet.</p>;

  return (
    <div style={{ marginTop: '20px' }}>
      <table
        style={{
          width: '100%',
          borderCollapse: 'collapse',
          border: '1px solid #ccc',
        }}
      >
        <thead>
          <tr style={{ backgroundColor: '#f3f3f3' }}>
            <th style={{ textAlign: 'left', padding: '8px' }}>Username</th>
            <th style={{ textAlign: 'left', padding: '8px' }}>Email</th>
            <th style={{ textAlign: 'left', padding: '8px' }}>Name</th>
            <th style={{ textAlign: 'left', padding: '8px' }}>Status</th>
            <th style={{ textAlign: 'center', padding: '8px' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {userList.map((u) => (
            <tr key={u._id} style={{ borderBottom: '1px solid #ddd' }}>
              <td style={{ padding: '8px' }}>{u.username}</td>
              <td style={{ padding: '8px' }}>{u.email}</td>
              <td style={{ padding: '8px' }}>{u.name}</td>
              <td style={{ padding: '8px' }}>
                {u.isDeleted ? 'Inactive' : 'Active'}
              </td>
              <td style={{ padding: '8px', display: 'flex', gap: '10px' }}>
                {/* 👁 View */}
                <Link href={`/users/${u._id}`}>
                  <button
                    style={{
                      backgroundColor: '#3b82f6',
                      color: 'white',
                      padding: '5px 10px',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                    }}
                  >
                    View
                  </button>
                </Link>

                {/* 🔁 Toggle Status */}
                <button
                  onClick={() => handleToggleStatus(u._id, u.isDeleted)}
                  style={{
                    backgroundColor: u.isDeleted ? '#22c55e' : '#eab308',
                    color: 'white',
                    padding: '5px 10px',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                  }}
                >
                  {u.isDeleted ? 'Activate' : 'Deactivate'}
                </button>

                {/* ❌ Delete */}
                <button
                  onClick={() => handleDelete(u._id)}
                  style={{
                    backgroundColor: '#ef4444',
                    color: 'white',
                    padding: '5px 10px',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
