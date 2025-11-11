'use client';
import { useState } from 'react';
import { upsertPreference } from '../lib/api';

export default function PreferenceCard({ prefs, userId, onSaved }) {
  const initial = prefs?.settings || { theme:'light', language:'en', notifications:false };
  const [settings, setSettings] = useState(initial);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState(null);

  async function save() {
    setLoading(true);
    try {
      await upsertPreference(userId, settings);
      setMsg('Saved');
      onSaved?.();
    } catch (e) {
      setMsg('Error: ' + (e.message || JSON.stringify(e)));
    } finally { setLoading(false); setTimeout(()=>setMsg(null),2000); }
  }

  return (
    <div style={{border:'1px solid #ddd', padding:8, marginBottom:12}}>
      <h3>Preferences</h3>
      <div>
        <label>Theme</label>
        <select value={settings.theme} onChange={e=>setSettings({...settings, theme:e.target.value})}>
          <option value="light">light</option><option value="dark">dark</option>
        </select>
      </div>
      <div>
        <label>Language</label>
        <input value={settings.language} onChange={e=>setSettings({...settings, language:e.target.value})} />
      </div>
      <div>
        <label>
          <input type="checkbox" checked={!!settings.notifications} onChange={e=>setSettings({...settings, notifications:e.target.checked})} />
          Notifications
        </label>
      </div>
      <button onClick={save} disabled={loading}>{loading ? 'Saving...' : 'Save Preferences'}</button>
      {msg && <div>{msg}</div>}
    </div>
  );
}
