import React from 'react';
import Footer from './Footer';
import logoImg from '../assets/DataTrust-Logo.png';

export default function TermsOfService({ setView }) {
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
        <h1 style={{ fontSize: '32px', marginBottom: '20px', color: '#0f172a' }}>Terms of Service</h1>
        <p style={{ color: '#64748b', marginBottom: '40px' }}>Last Updated: June 2026</p>

        <h3 style={{ fontSize: '20px', marginTop: '20px', marginBottom: '10px', color: '#0f172a' }}>1. Acceptance of Terms</h3>
        <p style={{ marginBottom: '20px' }}>By using DataTrust, you agree to these Terms of Service. If you do not agree, please do not use our platform.</p>

        <h3 style={{ fontSize: '20px', marginTop: '20px', marginBottom: '10px', color: '#0f172a' }}>2. Services Provided</h3>
        <p style={{ marginBottom: '10px' }}>DataTrust provides enterprise data governance tools including:</p>
        <ul style={{ paddingLeft: '20px', marginBottom: '20px' }}>
          <li>Live data validation from warehouses to Excel</li>
          <li>AI-powered quality monitoring</li>
          <li>Semantic layer management</li>
          <li>Audit trail and compliance tools</li>
        </ul>

        <h3 style={{ fontSize: '20px', marginTop: '20px', marginBottom: '10px', color: '#0f172a' }}>3. Data Ownership</h3>
        <p style={{ marginBottom: '20px' }}>You retain full ownership of your data. DataTrust does not claim ownership of any data you process through our platform.</p>

        <h3 style={{ fontSize: '20px', marginTop: '20px', marginBottom: '10px', color: '#0f172a' }}>4. Security</h3>
        <p style={{ marginBottom: '10px' }}>We take security seriously. Our platform:</p>
        <ul style={{ paddingLeft: '20px', marginBottom: '20px' }}>
          <li>Runs in your environment</li>
          <li>Stores no customer data on our servers</li>
          <li>Encrypts all communications</li>
        </ul>

        <h3 style={{ fontSize: '20px', marginTop: '20px', marginBottom: '10px', color: '#0f172a' }}>5. Customer Responsibilities</h3>
        <p style={{ marginBottom: '10px' }}>You are responsible for:</p>
        <ul style={{ paddingLeft: '20px', marginBottom: '20px' }}>
          <li>Ensuring your data complies with applicable laws</li>
          <li>Maintaining the security of your accounts</li>
          <li>Using our platform in compliance with these terms</li>
        </ul>

        <h3 style={{ fontSize: '20px', marginTop: '20px', marginBottom: '10px', color: '#0f172a' }}>6. Termination</h3>
        <p style={{ marginBottom: '20px' }}>We reserve the right to suspend or terminate access if these terms are violated.</p>

        <h3 style={{ fontSize: '20px', marginTop: '20px', marginBottom: '10px', color: '#0f172a' }}>7. Limitation of Liability</h3>
        <p style={{ marginBottom: '20px' }}>DataTrust is provided "as is" without warranties of any kind.</p>

        <h3 style={{ fontSize: '20px', marginTop: '20px', marginBottom: '10px', color: '#0f172a' }}>8. Governing Law</h3>
        <p style={{ marginBottom: '20px' }}>These terms are governed by the laws of India.</p>

        <h3 style={{ fontSize: '20px', marginTop: '20px', marginBottom: '10px', color: '#0f172a' }}>9. Contact</h3>
        <p style={{ marginBottom: '20px' }}>
          Questions? Contact us:<br/>
          📧 <a href="mailto:datatrust.ai@zohomail.in" style={{ color: '#00BFA5' }}>datatrust.ai@zohomail.in</a>
        </p>

        <h3 style={{ fontSize: '20px', marginTop: '20px', marginBottom: '10px', color: '#0f172a' }}>10. Changes to Terms</h3>
        <p style={{ marginBottom: '20px' }}>We may update these terms. Continued use constitutes acceptance of updated terms.</p>
      </div>

      <Footer setView={setView} />
    </div>
  );
}
