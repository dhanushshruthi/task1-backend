'use client';
import { useState } from 'react';
import { createPost } from '../lib/api';

export default function PostList({ posts = [], userId, onRefresh }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);

  async function submit() {
    setLoading(true);
    try {
      await createPost(userId, { title, content });
      setTitle(''); setContent('');
      onRefresh?.();
    } catch (e) {
      alert('Error: ' + (e.message || JSON.stringify(e)));
    } finally { setLoading(false); }
  }

  return (
    <div style={{border:'1px solid #ddd', padding:8}}>
      <h3>Posts</h3>
      <div>
        <input placeholder="title" value={title} onChange={e=>setTitle(e.target.value)} />
        <textarea placeholder="content" value={content} onChange={e=>setContent(e.target.value)} />
        <button onClick={submit} disabled={loading}>{loading ? 'Posting...' : 'Create Post'}</button>
      </div>
      <ul>
        {posts.map(p => <li key={p._id}><strong>{p.title}</strong><div>{p.content}</div></li>)}
      </ul>
    </div>
  );
}
