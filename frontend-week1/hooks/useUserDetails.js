// hooks/useUserDetails.js
'use client';
import { useState, useEffect } from 'react';
import { getUserById, getPostsByUser, getPreferences } from '../lib/api';

export default function useUserDetails(userId) {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [prefs, setPrefs] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function loadAll() {
    setLoading(true);
    try {
      const [u, p, pf] = await Promise.all([
        getUserById(userId),
        getPostsByUser(userId),
        getPreferences(userId).catch(() => null)
      ]);
      setUser(u);
      setPosts(p || []);
      setPrefs(pf || null);
      setError(null);
    } catch (err) {
      setError(err.message || JSON.stringify(err));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { if (userId) loadAll(); }, [userId]);

  return { user, posts, prefs, loading, error, reload: loadAll };
}
