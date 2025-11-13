'use client';
import { useState } from 'react';
import { createUser } from '../lib/api';
import { useRouter } from 'next/navigation';

export default function UserForm() {
  const router = useRouter();
  const [form, setForm] = useState({ username: '', email: '', name: '', roles: '' });
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setErr(null);

    try {
      const payload = { ...form, roles: form.roles.split(',').map(r => r.trim()).filter(Boolean) };
      await createUser(payload);
      alert('✅ User created successfully!');
      router.push('/users');
    } catch (e) {
      alert('❌ Failed to create user');
      setErr(e.message || JSON.stringify(e));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #e3f2fd, #f5f5f5)',
      paddingTop: '50px'
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: '30px 40px',
        borderRadius: '12px',
        boxShadow: '0px 4px 10px rgba(0,0,0,0.1)',
        width: '400px'
      }}>
        <h2 style={{
          textAlign: 'center',
          marginBottom: '25px',
          color: '#0070f3'
        }}>Create New User</h2>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '15px' }}>
            <label style={{ fontWeight: '500' }}>Username</label>
            <input
              placeholder="Enter username"
              value={form.username}
              onChange={e => setForm({ ...form, username: e.target.value })}
              required
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #ccc',
                borderRadius: '6px',
                marginTop: '5px'
              }}
            />
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label style={{ fontWeight: '500' }}>Email</label>
            <input
              type="email"
              placeholder="Enter email"
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
              required
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #ccc',
                borderRadius: '6px',
                marginTop: '5px'
              }}
            />
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label style={{ fontWeight: '500' }}>Name</label>
            <input
              placeholder="Enter name"
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
              required
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #ccc',
                borderRadius: '6px',
                marginTop: '5px'
              }}
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ fontWeight: '500' }}>Roles</label>
            <input
              placeholder="Enter roles (comma separated)"
              value={form.roles}
              onChange={e => setForm({ ...form, roles: e.target.value })}
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #ccc',
                borderRadius: '6px',
                marginTop: '5px'
              }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '10px',
              backgroundColor: loading ? '#90caf9' : '#0070f3',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              fontWeight: '600',
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: '0.3s'
            }}
          >
            {loading ? 'Saving...' : 'Create User'}
          </button>

          {/* Back Button */}
          <button
            type="button"
            onClick={() => router.push('/')}
            style={{
              width: '100%',
              padding: '10px',
              marginTop: '10px',
              backgroundColor: '#6c757d',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: '0.3s'
            }}
          >
            ← Back to Home
          </button>
        </form>

        {err && (
          <p style={{ color: 'red', textAlign: 'center', marginTop: '15px' }}>{err}</p>
        )}
      </div>
    </div>
  );
}
