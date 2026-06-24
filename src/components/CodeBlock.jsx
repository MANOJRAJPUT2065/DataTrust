import React, { useState } from 'react';

export default function CodeBlock({ title, code, language }) {
  const [copied, setCopied] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isLong = code.split('\n').length > 15;

  return (
    <div style={{ marginBottom: '40px', background: '#1E293B', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', overflow: 'hidden' }}>
      <div style={{ padding: '16px 20px', background: 'rgba(0,0,0,0.2)', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ color: '#F8FAFC', fontWeight: '600', fontSize: '16px' }}>{title}</span>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          {language && <span style={{ color: '#94A3B8', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.05em', background: 'rgba(255,255,255,0.05)', padding: '4px 8px', borderRadius: '4px' }}>{language}</span>}
          <button onClick={handleCopy} style={{ background: 'rgba(255,255,255,0.1)', border: 'none', color: '#CBD5E1', fontSize: '12px', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', transition: 'all 0.2s' }}>
            {copied ? (
              <>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#00BFA5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                <span style={{ color: '#00BFA5' }}>Copied!</span>
              </>
            ) : (
              <>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                Copy Code
              </>
            )}
          </button>
        </div>
      </div>
      <div style={{ position: 'relative' }}>
        <div style={{ padding: '20px', overflowX: 'auto', background: '#0D1117', maxHeight: expanded ? 'none' : '300px', overflowY: 'hidden', transition: 'max-height 0.3s ease' }}>
          <pre style={{ margin: 0, color: '#7EE7B8', fontSize: '13px', fontFamily: 'var(--font-mono, monospace)', lineHeight: '1.5' }}>
            {code}
          </pre>
        </div>
        {isLong && !expanded && (
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '100px', background: 'linear-gradient(to bottom, transparent, #0D1117)', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', paddingBottom: '20px' }}>
            <button onClick={() => setExpanded(true)} style={{ background: '#1E293B', border: '1px solid rgba(255,255,255,0.1)', color: '#00BFA5', padding: '8px 24px', borderRadius: '20px', fontSize: '13px', fontWeight: '600', cursor: 'pointer', boxShadow: '0 4px 12px rgba(0,0,0,0.5)', transition: 'all 0.2s', zIndex: 10 }}>
              Read More
            </button>
          </div>
        )}
        {isLong && expanded && (
          <div style={{ display: 'flex', justifyContent: 'center', background: '#0D1117', padding: '10px 0 20px' }}>
            <button onClick={() => setExpanded(false)} style={{ background: 'transparent', border: 'none', color: '#94A3B8', fontSize: '13px', fontWeight: '500', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="18 15 12 9 6 15"></polyline></svg>
              Show Less
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
