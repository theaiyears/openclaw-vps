'use client';

export function StickyCta() {
  return (
    <div
      style={{
        position: 'fixed',
        bottom: 12,
        left: 12,
        right: 12,
        background: 'rgba(20,28,48,0.96)',
        border: '1px solid #35507a',
        borderRadius: 12,
        padding: 12,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 50
      }}
    >
      <span style={{ fontSize: 14 }}>Steal the weekly trend playbook + monetization templates</span>
      <a
        href="#lead-form"
        style={{
          textDecoration: 'none',
          background: '#4f7cff',
          color: 'white',
          borderRadius: 8,
          padding: '8px 12px',
          fontWeight: 700
        }}
      >
        Get it free
      </a>
    </div>
  );
}
