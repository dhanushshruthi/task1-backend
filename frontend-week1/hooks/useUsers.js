// hooks/useUsers.js
'use client';
import { useState, useEffect } from 'react';
import { getUsers } from '../lib/api';

export default function useUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function load() {
    setLoading(true);
    try {
      const data = await getUsers();
      setUsers(Array.isArray(data) ? data : []);
      setError(null);
    } catch (err) {
      setError(err.message || JSON.stringify(err));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  return { users, loading, error, reload: load };
}
