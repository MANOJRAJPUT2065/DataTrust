import React, { useState, useEffect } from 'react';
import logoImg from '../assets/DataTrust-Logo.png';

const docsNav = [
  {
    group: "1. Core & Architecture Overview",
    items: [
      { id: 'architecture-hld', label: '📐 Technical Architecture HLD', desc: 'Core platform architecture blueprint & data flow diagrams' },
      { id: 'data-flow', label: '📊 End-to-End Data Lifecycle Flow', desc: 'Step-by-step route of data from Snowflake into Excel' },
      { id: 'post-sync-arch', label: '🔄 Post-Sync Lifecycle Engine', desc: 'Event-driven actions taking place after database discovery' }
    ]
  },
  {
    group: "2. V2 Core Infrastructure HLDs",
    items: [
      { id: 'metadata-sync', label: '🗄️ Metadata Sync & Table Selection', desc: 'Live Snowflake table cache and column metadata indexing' },
      { id: 'redis-sync', label: '⚡ Redis Pub/Sub Live Sync', desc: 'Real-time WebSocket event broadcasting system architecture' },
      { id: 'semantic-engine', label: '💡 V2 DAX-to-SQL Compiler', desc: 'Logical rule-based translator for DAX calculations' }
    ]
  },
  {
    group: "3. V3.0 Advanced Intelligence HLDs",
    items: [
      { id: 'semantic-engine-v2', label: '🧠 Semantic Engine V3 HLD', desc: 'pgvector semantic search and OpenAI text-embeddings' },
      { id: 'quality-engine-v2', label: '✅ Quality Engine V3 HLD', desc: 'Isolation Forest anomaly detection & Meta Prophet forecasts' },
      { id: 'audit-engine-v2', label: '📋 Audit Engine V3 HLD', desc: 'Immutable change tracking & single-second audit timeline query' },
      { id: 'pipeline-engine-v2', label: '⚙️ Pipeline Engine V3 HLD', desc: '5-stage execution pipelines and live progress logging' },
      { id: 'intelligence-layer', label: '🔮 AI Predictive Rule Inference', desc: 'Self-learning governance rules and metadata curation' },
      { id: 'notification-system', label: '🔔 Notification Alert Routing', desc: 'Slack/Teams webhooks and automated owner escalations' }
    ]
  },
  {
    group: "4. Demos & Business Case Studies",
    items: [
      { id: 'case-studies', label: '🏢 Enterprise Case Studies', desc: 'Business ROI metrics and platform deployment outcomes' },
      { id: 'case-studies-hld', label: '📐 Case Studies Integration HLD', desc: 'Visual multi-system integration architecture maps' },
      { id: 'investor-pitch', label: '🚀 Investor Pitch Deck', desc: 'DataTrust vision, slide deck, problem & ROI overview' },
      { id: 'how-it-works', label: '📖 Platform How It Works Guide', desc: 'Step-by-step feature breakdown for operations' },
      { id: 'user-journey', label: '👤 User Timeline Journey', desc: 'Chronological timeline of system interactions' }
    ]
  }
];

export default function DocsLayout({ currentView, setView, onEnterWorkspace, children }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  useEffect(() => {
    // Scroll content panel to top whenever we switch views
    const mainContent = document.getElementById('docs-main-content');
    if (mainContent) mainContent.scrollTop = 0;
    window.scrollTo(0, 0);
  }, [currentView]);

  // Filter items based on search term
  const filteredNav = docsNav.map(group => {
    const items = group.items.filter(item => 
      item.label.toLowerCase().includes(searchTerm.toLowerCase()) || 
      item.desc.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return { ...group, items };
  }).filter(group => group.items.length > 0);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', background: '#020617', color: '#F8FAFC', fontFamily: '"Inter", sans-serif', overflow: 'hidden' }}>
      
      {/* ─── STICKY HEADER ────────────────────────────────────────────── */}
      <header style={{
        position: 'sticky', top: 0, zIndex: 1000,
        height: '70px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 32px', background: 'rgba(15, 23, 42, 0.96)', backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <button 
            onClick={() => setIsMobileNavOpen(!isMobileNavOpen)} 
            style={{ display: 'none', background: 'transparent', border: 'none', color: '#818CF8', fontSize: '24px', cursor: 'pointer' }}
            className="docs-mobile-hamburger"
          >
            ☰
          </button>
          <div onClick={() => setView('landing')} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
            <img src={logoImg} alt="DataTrust Logo" style={{ height: '52px' }} />
            <span style={{ fontSize: '13px', background: 'rgba(0,191,165,0.1)', color: '#00BFA5', padding: '2px 8px', borderRadius: '4px', marginLeft: '12px', fontWeight: '700', border: '1px solid rgba(0,191,165,0.2)' }}>HLD Docs</span>
          </div>
        </div>

        {/* Global Docs Search */}
        <div style={{ position: 'relative', width: '380px' }} className="docs-search-container">
          <input 
            type="text" 
            placeholder="Search documentation, HLDs, case studies..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%', padding: '10px 16px 10px 40px', background: '#090e17',
              border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '999px',
              fontSize: '13px', color: '#F8FAFC', outline: 'none', transition: 'border-color 0.2s',
              fontFamily: 'inherit'
            }}
            onFocus={(e) => e.target.style.borderColor = '#00BFA5'}
            onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
          />
          <svg style={{ position: 'absolute', left: '16px', top: '12px', color: '#64748B' }} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <button 
            onClick={() => setView('landing')}
            style={{ background: 'transparent', border: '1px solid rgba(255, 255, 255, 0.15)', color: '#CBD5E1', padding: '8px 18px', borderRadius: '8px', fontSize: '13px', cursor: 'pointer', transition: 'all 0.2s', fontWeight: '600' }}
            onMouseOver={(e) => e.target.style.background = 'rgba(255,255,255,0.05)'}
            onMouseOut={(e) => e.target.style.background = 'transparent'}
          >
            ← Back to Home
          </button>
          <button 
            onClick={onEnterWorkspace}
            style={{ background: '#00BFA5', border: 'none', color: '#090F16', padding: '8px 18px', borderRadius: '8px', fontSize: '13px', cursor: 'pointer', transition: 'all 0.2s', fontWeight: '700', boxShadow: '0 4px 14px rgba(0, 191, 165, 0.2)' }}
            onMouseOver={(e) => e.target.style.background = '#00E676'}
            onMouseOut={(e) => e.target.style.background = '#00BFA5'}
          >
            Launch Live Demo
          </button>
        </div>
      </header>

      {/* ─── MAIN DOCUMENTATION BODY ──────────────────────────────────── */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        
        {/* LEFT STICKY SIDEBAR */}
        <aside 
          style={{
            width: '320px', background: '#090e17', borderRight: '1px solid rgba(255, 255, 255, 0.08)',
            padding: '24px 16px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '24px',
            flexShrink: 0
          }}
          className={`docs-sidebar ${isMobileNavOpen ? 'mobile-open' : ''}`}
        >
          {filteredNav.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '30px 10px', color: '#64748B', fontSize: '13px' }}>
              No matches found for "{searchTerm}"
            </div>
          ) : (
            filteredNav.map((group, groupIdx) => (
              <div key={groupIdx} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <h4 style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1.5px', color: '#64748B', fontWeight: '800', paddingLeft: '8px', marginBottom: '4px' }}>
                  {group.group}
                </h4>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  {group.items.map((item) => {
                    const isActive = currentView === item.id;
                    return (
                      <li key={item.id}>
                        <button
                          onClick={() => { setView(item.id); setIsMobileNavOpen(false); }}
                          style={{
                            width: '100%', textAlign: 'left', padding: '10px 12px',
                            background: isActive ? 'rgba(99, 102, 241, 0.15)' : 'transparent',
                            color: isActive ? '#818CF8' : '#CBD5E1',
                            border: 'none', borderRadius: '8px', cursor: 'pointer',
                            transition: 'all 0.2s', borderLeft: isActive ? '3px solid #818CF8' : '3px solid transparent',
                            display: 'flex', flexDirection: 'column', gap: '2px'
                          }}
                          onMouseOver={(e) => {
                            if (!isActive) e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
                          }}
                          onMouseOut={(e) => {
                            if (!isActive) e.currentTarget.style.background = 'transparent';
                          }}
                        >
                          <span style={{ fontSize: '13px', fontWeight: isActive ? '600' : '500' }}>{item.label}</span>
                          <span style={{ fontSize: '10px', color: '#64748B', display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', width: '270px' }}>{item.desc}</span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))
          )}
        </aside>

        {/* CONTENT RENDERER */}
        <main 
          id="docs-main-content"
          style={{
            flex: 1, padding: '40px 60px', overflowY: 'auto', background: '#020617',
            scrollBehavior: 'smooth'
          }}
          className="docs-content-container"
        >
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            {children}
          </div>
        </main>
      </div>

      {/* Styled JSX for Responsive Layouts & Hamburger Toggle */}
      <style>{`
        /* Hide sidebars inside HLD components when viewed within DocsLayout */
        .docs-content-container .sidebar, 
        .docs-content-container .mobile-toggle {
          display: none !important;
        }
        .docs-content-container section {
          scroll-margin-top: 20px !important;
        }

        /* Sidebar Scrollbar Styling */
        .docs-sidebar::-webkit-scrollbar,
        #docs-main-content::-webkit-scrollbar {
          width: 6px;
        }
        .docs-sidebar::-webkit-scrollbar-thumb,
        #docs-main-content::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.08);
          border-radius: 99px;
        }
        .docs-sidebar::-webkit-scrollbar-thumb:hover,
        #docs-main-content::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.15);
        }

        @media (max-width: 1024px) {
          .docs-sidebar {
            position: fixed;
            top: 70px;
            left: -320px;
            bottom: 0;
            z-index: 999;
            transition: left 0.3s ease;
          }
          .docs-sidebar.mobile-open {
            left: 0;
          }
          .docs-mobile-hamburger {
            display: block !important;
          }
          .docs-search-container {
            width: 250px !important;
          }
          .docs-content-container {
            padding: 30px 20px !important;
          }
        }

        @media (max-width: 768px) {
          .docs-search-container {
            display: none !important;
          }
        }
      `}</style>

    </div>
  );
}
