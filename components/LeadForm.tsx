'use client';
import { useState } from 'react';
export function LeadForm({ topic }: { topic: string }) {
  const [email,setEmail]=useState(''); const [status,setStatus]=useState('');
  async function submit(e:React.FormEvent){e.preventDefault();setStatus('Saving...');const r=await fetch('/api/lead',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({email,topic})});setStatus(r.ok?'Saved':'Failed');if(r.ok)setEmail('');}
  return <form onSubmit={submit} style={{display:'flex',gap:8,marginTop:16}}><input required type='email' value={email} onChange={e=>setEmail(e.target.value)} placeholder='you@domain.com' style={{padding:10,borderRadius:8,border:'1px solid #334',flex:1}}/><button type='submit' style={{padding:'10px 14px',borderRadius:8,background:'#4f7cff',color:'white',border:0}}>Get the playbook</button><span style={{fontSize:12,opacity:.8}}>{status}</span></form>
}
