import React from 'react';
import Footer from './Footer';
import logoImg from '../assets/DataTrust-Logo.png';

export default function PrivacyPolicy({ setView }) {
  return (
    <div className="landing-layout" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <nav className="marketing-nav">
        <div className="logo" onClick={() => setView('landing')} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
          <img src={logoImg} alt="DataTrust Logo" style={{ height: '64px' }} />
        </div>
        <ul>
          <li>
            <button onClick={() => setView('landing')} className="nav-cta border-none cursor-pointer">
              Back to Home
            </button>
          </li>
        </ul>
      </nav>

      <div style={{ padding: '120px 20px 60px', maxWidth: '800px', margin: '0 auto', flex: 1, color: '#333' }}>
        <h1 style={{ fontSize: '32px', marginBottom: '20px', color: '#0f172a' }}>Privacy Policy</h1>
        <p style={{ color: '#64748b', marginBottom: '40px' }}>Last Updated: June 2026</p>

        <h3 style={{ fontSize: '20px', marginTop: '20px', marginBottom: '10px', color: '#0f172a' }}>1. Information We Collect</h3>
        <p style={{ marginBottom: '20px' }}>DataTrust collects minimal personal information necessary to provide our services:</p>
        <ul style={{ paddingLeft: '20px', marginBottom: '20px' }}>
          <li>Name and email address (when you contact us or sign up)</li>
          <li>Company name and job title</li>
          <li>Usage data (how you interact with our platform)</li>
        </ul>

        <h3 style={{ fontSize: '20px', marginTop: '20px', marginBottom: '10px', color: '#0f172a' }}>2. How We Use Your Information</h3>
        <ul style={{ paddingLeft: '20px', marginBottom: '20px' }}>
          <li>To provide and maintain our services</li>
          <li>To respond to your inquiries and support requests</li>
          <li>To improve our platform and user experience</li>
          <li>To send you important updates and notifications</li>
        </ul>

        <h3 style={{ fontSize: '20px', marginTop: '20px', marginBottom: '10px', color: '#0f172a' }}>3. Data Storage and Security</h3>
        <p style={{ marginBottom: '20px' }}>DataTrust runs entirely within your own environment. Your data never leaves your infrastructure. We do not store your data on our servers. All processing happens locally in your environment.</p>

        <h3 style={{ fontSize: '20px', marginTop: '20px', marginBottom: '10px', color: '#0f172a' }}>4. Data Sharing</h3>
        <p style={{ marginBottom: '20px' }}>We do not sell, rent, or share your personal information with third parties. Your data remains yours.</p>

        <h3 style={{ fontSize: '20px', marginTop: '20px', marginBottom: '10px', color: '#0f172a' }}>5. Your Rights</h3>
        <p style={{ marginBottom: '10px' }}>You have the right to:</p>
        <ul style={{ paddingLeft: '20px', marginBottom: '20px' }}>
          <li>Access your personal information</li>
          <li>Request correction or deletion</li>
          <li>Opt-out of marketing communications</li>
        </ul>

        <h3 style={{ fontSize: '20px', marginTop: '20px', marginBottom: '10px', color: '#0f172a' }}>6. Contact Us</h3>
        <p style={{ marginBottom: '20px' }}>
          If you have questions about this Privacy Policy, contact us at:<br/>
          📧 <a href="mailto:datatrust.ai@zohomail.in" style={{ color: '#00BFA5' }}>datatrust.ai@zohomail.in</a>
        </p>

        <h3 style={{ fontSize: '20px', marginTop: '20px', marginBottom: '10px', color: '#0f172a' }}>7. Changes to This Policy</h3>
        <p style={{ marginBottom: '20px' }}>We may update this Privacy Policy from time to time. Check this page for updates.</p>
      </div>

      <Footer setView={setView} />
    </div>
  );
}
