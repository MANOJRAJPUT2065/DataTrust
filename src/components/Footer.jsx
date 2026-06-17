import React from 'react';
import logoImg from '../assets/DataTrust-Logo.png';

export default function Footer({ setView }) {
  return (
    <footer style={{ backgroundColor: '#0a0a0a', color: '#ffffff', padding: '40px 20px', textAlign: 'center', fontFamily: 'Arial, sans-serif', borderTop: '1px solid #222' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '8px' }}>
          <img src={logoImg} alt="DataTrust Logo" style={{ height: '64px' }} />
        </div>
        <p style={{ color: '#666666', fontSize: '14px', marginBottom: '16px' }}>© 2026 DataTrust · Trust in Every Number</p>
        
        <p style={{ marginBottom: '12px' }}>
          <a href="mailto:datatrust.ai@zohomail.in" style={{ color: '#4a9eff', textDecoration: 'none', fontSize: '14px' }}>
            📧 datatrust.ai@zohomail.in
          </a>
        </p>
        
        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap', fontSize: '13px' }}>
          <a href="#privacy" onClick={(e) => { e.preventDefault(); if (setView) setView('privacy'); }} style={{ color: '#888888', textDecoration: 'none' }}>🔒 Privacy Policy</a>
          <a href="#terms" onClick={(e) => { e.preventDefault(); if (setView) setView('terms'); }} style={{ color: '#888888', textDecoration: 'none' }}>📋 Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}
