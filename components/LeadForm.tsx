'use client';

import { useMemo, useState } from 'react';

export function LeadForm({ topic, variant }: { topic: string; variant: 'A' | 'B' }) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');

  const utm = useMemo(() => {
    if (typeof window === 'undefined') return {};
    const q = new URLSearchParams(window.location.search);
    return {
      utm_source: q.get('utm_source') || undefined,
      utm_medium: q.get('utm_medium') || undefined,
      utm_campaign: q.get('utm_campaign') || undefined
    };
  }, []);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('Saving...');

    const res = await fetch('/api/lead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, topic, variant, ...utm })
    });

    setStatus(res.ok ? 'Saved' : 'Failed');
    if (res.ok) setEmail('');
  }

  return (
    <form id="lead-form" onSubmit={submit} style={{ display: 'flex', gap: 8, marginTop: 16 }}>
      <input
        required
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@domain.com"
        style={{ padding: 10, borderRadius: 8, border: '1px solid #334', flex: 1 }}
      />
      <button
        type="submit"
        style={{ padding: '10px 14px', borderRadius: 8, background: '#4f7cff', color: 'white', border: 0 }}
      >
        {variant === 'A' ? 'Get the playbook' : 'Get free growth plan'}
      </button>
      <span style={{ fontSize: 12, opacity: 0.8 }}>{status}</span>
    </form>
  );
}
