'use client';
import { useState } from 'react';
import { createUser } from '../lib/api';
import { useRouter } from 'next/navigation';

export default function UserForm() {
  const router = useRouter();
  const [form, setForm] = useState({ username:'', email:'', name:'', roles:'' });
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = { ...form, roles: form.roles.split(',').map(r=>r.trim()).filter(Boolean) };
      await createUser(payload);
      router.push('/users');
    } catch (e) {
      setErr(e.message || JSON.stringify(e));
    } finally { setLoading(false); }
  }

  return (
    <form onSubmit={handleSubmit} style={{maxWidth:600}}>
      <div><input placeholder="username" value={form.username} onChange={e=>setForm({...form, username:e.target.value})} required/></div>
      <div><input placeholder="email" value={form.email} onChange={e=>setForm({...form, email:e.target.value})} required/></div>
      <div><input placeholder="name" value={form.name} onChange={e=>setForm({...form, name:e.target.value})} required/></div>
      <div><input placeholder="roles (comma separated)" value={form.roles} onChange={e=>setForm({...form, roles:e.target.value})}/></div>
      <button type="submit" disabled={loading}>{loading ? 'Saving...' : 'Create'}</button>
      {err && <p style={{color:'red'}}>{err}</p>}
    </form>
  );
}
