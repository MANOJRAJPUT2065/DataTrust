import React, { useEffect, useState } from 'react';

const CodeBlock = ({ title, code, dataFlow }) => {
  const [expanded, setExpanded] = useState(false);
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    alert('Code copied to clipboard!');
  };

  // Enhance the ASCII art with syntax highlighting using Regex
  const colorizedCode = code
    .replace(/([┌┬┐├┼┤└┴┘─│]+)/g, '<span style="color: #6366F1; opacity: 0.7;">$1</span>')
    .replace(/(INPUT:|PROCESS:|OUTPUT:|USER:|STEP \d+:)/g, '<span style="color: #10B981; font-weight: 700;">$1</span>')
    .replace(/(AI RULE INFERENCE V2|PREDICTIVE QUALITY ENGINE|AUTO-CORRECTION V2|AUTO-DOCUMENTATION|AI RECOMMENDATIONS|NLQ → SQL ENGINE|pgvector SEMANTIC SEARCH|RAG-POWERED ACCURACY|NLQ IN EXCEL RIBBON|CONNECTOR LAYER|UNIFIED SEMANTIC LAYER|QUERY ROUTER|UNIFIED VIEW|METRIC REGISTRY|VECTOR EMBEDDINGS|DATA LINEAGE|SEMANTIC SEARCH|EXCEL DASHBOARD BUILDER|REAL-TIME COLLABORATION|TEMPLATE MARKETPLACE|POWER BI INTEGRATION|APPROVAL WORKFLOWS|IMPACT ANALYSIS|GRANULAR PERMISSIONS|TEAM WORKSPACES|IMMUTABLE AUDIT LOG|ONE-SECOND AUDIT QUERY|DATA QUALITY REPORTING|DATA RETENTION POLICIES)/g, '<span style="color: #38BDF8; font-weight: 700;">$1</span>')
    .replace(/(Snowflake|Databricks|Fabric|Redshift|BigQuery|Azure SQL|dbt|Looker|Tableau|Excel|Power BI)/g, '<span style="color: #F59E0B; font-weight: 700;">$1</span>');

  return (
    <div style={{ marginBottom: '40px', background: 'linear-gradient(145deg, #0F172A 0%, #1E293B 100%)', borderRadius: '16px', border: '1px solid rgba(99,102,241,0.2)', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.4)' }}>
      {/* MacOS style window header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 20px', background: 'rgba(0,0,0,0.4)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#EF4444' }}></div>
          <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#F59E0B' }}></div>
          <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#10B981' }}></div>
          <div style={{ color: '#94A3B8', fontSize: '13px', fontFamily: '"Fira Code", monospace', marginLeft: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ color: '#6366F1' }}>⚡</span> {title}
          </div>
        </div>
        <button 
          onClick={copyToClipboard}
          style={{ background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.3)', color: '#818CF8', padding: '6px 14px', borderRadius: '6px', fontSize: '12px', cursor: 'pointer', transition: 'all 0.2s ease', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '6px' }}
          onMouseOver={(e) => { e.currentTarget.style.background = 'rgba(99,102,241,0.2)'; e.currentTarget.style.color = '#fff'; }}
          onMouseOut={(e) => { e.currentTarget.style.background = 'rgba(99,102,241,0.1)'; e.currentTarget.style.color = '#818CF8'; }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
          Copy HLD
        </button>
      </div>
      
      <div style={{ position: 'relative' }}>
        <div style={{ 
          padding: '24px 32px', 
          overflowX: 'auto', 
          fontFamily: '"Fira Code", "Consolas", monospace', 
          fontSize: '14px', 
          lineHeight: '1.6', 
          color: '#E2E8F0', 
          whiteSpace: 'pre',
          maxHeight: expanded ? 'none' : '280px',
          overflowY: expanded ? 'visible' : 'hidden',
          transition: 'max-height 0.3s ease'
        }}
        dangerouslySetInnerHTML={{ __html: colorizedCode }}
        />
        
        {!expanded && (
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '120px',
            background: 'linear-gradient(to bottom, transparent, #1E293B)',
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'center',
            paddingBottom: '20px'
          }}>
            <button 
              onClick={() => setExpanded(true)}
              style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', padding: '8px 24px', borderRadius: '20px', color: '#fff', cursor: 'pointer', backdropFilter: 'blur(4px)', fontWeight: '500', transition: 'all 0.2s', boxShadow: '0 4px 15px rgba(0,0,0,0.3)' }}
              onMouseOver={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.2)' }}
              onMouseOut={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)' }}
            >
              Show Full Architecture ↓
            </button>
          </div>
        )}
      </div>

      {expanded && (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '16px', borderTop: '1px solid rgba(255,255,255,0.05)', background: 'rgba(0,0,0,0.2)' }}>
           <button 
              onClick={() => setExpanded(false)}
              style={{ background: 'transparent', border: 'none', color: '#94A3B8', cursor: 'pointer', fontWeight: '500', transition: 'all 0.2s' }}
              onMouseOver={(e) => { e.currentTarget.style.color = '#fff' }}
              onMouseOut={(e) => { e.currentTarget.style.color = '#94A3B8' }}
            >
              Collapse Architecture ↑
            </button>
        </div>
      )}

      {dataFlow && (
        <div style={{ padding: '20px 32px', background: 'rgba(16, 185, 129, 0.05)', borderTop: '1px solid rgba(16, 185, 129, 0.2)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#10B981', fontSize: '12px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '12px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10B981', display: 'inline-block', boxShadow: '0 0 10px #10B981' }}></span>
            Data Flow Pipeline
          </div>
          <div style={{ fontFamily: '"Fira Code", monospace', fontSize: '13px', color: '#A7F3D0', whiteSpace: 'pre-wrap', lineHeight: '1.8' }}>
            {dataFlow.split('\n').map((line, i) => (
              <div key={i} style={{ display: 'flex', gap: '12px', marginBottom: '4px' }}>
                <span style={{ opacity: 0.5 }}>{String(i + 1).padStart(2, '0')}</span>
                <span>{line}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const ArchitectureHLD = () => {
  const [activeSection, setActiveSection] = useState('category-1');
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const toggleMobileNav = () => setIsMobileNavOpen(!isMobileNavOpen);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.05, rootMargin: '0px 0px -10% 0px' }
    );

    document.querySelectorAll('.scroll-reveal').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const y = element.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };



  const navItems = [
    { id: 'category-1', label: '1. AI & Automation' },
    { id: 'category-2', label: '2. Natural Language Query' },
    { id: 'category-3', label: '3. Multi-Cloud Connectivity' },
    { id: 'category-4', label: '4. Semantic Layer' },
    { id: 'category-5', label: '5. Excel Add-in V3' },
    { id: 'category-6', label: '6. Team Collaboration' },
    { id: 'category-7', label: '7. Audit & Compliance' },
    { id: 'category-8', label: '8. Performance, Scale & Pipeline' },
    { id: 'category-9', label: '9. Ecosystem & APIs' },
  ];

  return (<>
    <div style={{ minHeight: '100vh', background: '#020617', color: '#F8FAFC', fontFamily: '"Inter", sans-serif', paddingTop: '80px', paddingBottom: '100px' }}>
      
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '60px', padding: '0 20px' }} className="scroll-reveal fade-up">
        <div style={{ display: 'inline-block', padding: '6px 16px', background: 'rgba(99, 102, 241, 0.1)', border: '1px solid rgba(99, 102, 241, 0.2)', borderRadius: '20px', color: '#818CF8', fontSize: '13px', fontWeight: '600', letterSpacing: '1px', marginBottom: '24px' }}>
          TECHNICAL ARCHITECTURE
        </div>
        <h1 style={{ fontSize: '48px', fontWeight: '800', marginBottom: '20px', letterSpacing: '-1px' }}>
          DataTrust V3.0 <br />
          <span style={{ background: 'linear-gradient(135deg, #818CF8 0%, #C084FC 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Complete High-Level Design</span>
        </h1>
        <p style={{ fontSize: '20px', color: '#94A3B8', maxWidth: '800px', margin: '0 auto', lineHeight: '1.6' }}>
          The architectural blueprint spanning 9 core categories of the DataTrust ecosystem. Explore the data flows, integrations, and intelligent layers.
        </p>
      </div>

      <div style={{ display: 'flex', maxWidth: '1400px', margin: '0 auto', padding: '0 40px', gap: '60px' }}>
        
        {/* Sidebar Navigation */}
          {/* Mobile Nav Toggle */}
          <button onClick={toggleMobileNav} className="mobile-toggle" style={{
            position: 'fixed',
            top: '20px',
            right: '20px',
            background: 'rgba(99,102,241,0.2)',
            border: 'none',
            borderRadius: '8px',
            color: '#818CF8',
            padding: '8px 12px',
            fontSize: '16px',
            cursor: 'pointer',
            zIndex: 1001
          }}>☰</button>
          <div
            className={isMobileNavOpen ? 'sidebar mobile-open' : 'sidebar'}
            style={{
              width: '280px',
              flexShrink: 0,
              position: isMobileNavOpen ? 'fixed' : 'relative',
              top: isMobileNavOpen ? '0' : 'auto',
              left: isMobileNavOpen ? '0' : '-300px',
              height: '100vh',
              background: 'rgba(255,255,255,0.02)',
              padding: '24px',
              borderRadius: '16px',
              border: '1px solid rgba(255,255,255,0.05)',
              transition: 'left 0.3s ease',
              zIndex: 1000
            }}
          >
            <h3 style={{ fontSize: '14px', textTransform: 'uppercase', letterSpacing: '1px', color: '#94A3B8', marginBottom: '20px', fontWeight: '700' }}>Architecture Layers</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {navItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => { scrollToSection(item.id); setIsMobileNavOpen(false); }}
                    style={{
                      width: '100%',
                      textAlign: 'left',
                      padding: '10px 16px',
                      background: activeSection === item.id ? 'rgba(99,102,241,0.1)' : 'transparent',
                      color: activeSection === item.id ? '#818CF8' : '#CBD5E1',
                      border: 'none',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontSize: '14px',
                      fontWeight: activeSection === item.id ? '600' : '400',
                      transition: 'all 0.2s ease',
                      borderLeft: activeSection === item.id ? '3px solid #818CF8' : '3px solid transparent'
                    }}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
              </ul>
          </div>

        {/* Content Area */}
        <div style={{ flexGrow: 1, minWidth: 0 }}>
          
          {/* Category 1 */}
          <section id="category-1" className="scroll-reveal fade-up" style={{ marginBottom: '80px', scrollMarginTop: '100px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
              <div style={{ width: '48px', height: '48px', background: 'rgba(99,102,241,0.1)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#818CF8', fontSize: '24px' }}>🧠</div>
              <h2 style={{ fontSize: '32px', fontWeight: '700' }}>Category 1: AI & Automation</h2>
            </div>
            <p style={{ color: '#94A3B8', fontSize: '18px', marginBottom: '32px' }}>AI Intelligence Layer — Self-learning rules, predictive quality, and auto-correction</p>
            <CodeBlock 
              title="ai_automation_hld.txt"
              code={`┌─────────────────────────────────────────────────────────────────────────────────────┐
│                    AI & AUTOMATION LAYER — COMPLETE HLD                            │
├─────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                     │
│  ┌─────────────────────────────────────────────────────────────────────────────┐  │
│  │                          INPUT LAYER                                         │  │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌──────────────────┐ │  │
│  │  │  Historical  │  │  Real-Time   │  │   User       │  │   Metric         │ │  │
│  │  │  Data        │  │  Streams     │  │   Behavior   │  │   Metadata       │ │  │
│  │  │  (12+ months)│  │              │  │              │  │                  │ │  │
│  │  └──────────────┘  └──────────────┘  └──────────────┘  └──────────────────┘ │  │
│  └─────────────────────────────────────────────────────────────────────────────┘  │
│                                    │                                                │
│                                    ▼                                                │
│  ┌─────────────────────────────────────────────────────────────────────────────┐  │
│  │                      AI PROCESSING ENGINE                                    │  │
│  │  ┌─────────────────────────────────────────────────────────────────────────┐│  │
│  │  │  1. AI RULE INFERENCE V2 (Self-Learning)                                ││  │
│  │  │     ┌─────────────────────────────────────────────────────────────────┐││  │
│  │  │     │  • Statistical Analysis (Mean, Std, Percentiles)                │││  │
│  │  │     │  • Correlation Analysis (Revenue = Units × Price)               │││  │
│  │  │     │  • Temporal Pattern Detection (Monday drops)                    │││  │
│  │  │     │  • ML Models (Isolation Forest, XGBoost)                        │││  │
│  │  │     │  • Confidence Scoring (99% → Accept, 85% → Review)              │││  │
│  │  │     └─────────────────────────────────────────────────────────────────┘││  │
│  │  └─────────────────────────────────────────────────────────────────────────┘│  │
│  │  ┌─────────────────────────────────────────────────────────────────────────┐│  │
│  │  │  2. PREDICTIVE QUALITY ENGINE (Prophet + XGBoost + Isolation Forest)    ││  │
│  │  │     ┌─────────────────────────────────────────────────────────────────┐││  │
│  │  │     │  • Time-Series Forecasting (Prophet Meta)                       │││  │
│  │  │     │  • Trend + Seasonality + Holiday Effects                        │││  │
│  │  │     │  • Anomaly Detection (Isolation Forest)                         │││  │
│  │  │     │  • Risk Scoring (0.0 → 1.0)                                     │││  │
│  │  │     │  • 24-Hour Early Warning Alerts                                 │││  │
│  │  │     └─────────────────────────────────────────────────────────────────┘││  │
│  │  └─────────────────────────────────────────────────────────────────────────┘│  │
│  │  ┌─────────────────────────────────────────────────────────────────────────┐│  │
│  │  │  3. AUTO-CORRECTION V2 (Zero-Touch Fix)                                 ││  │
│  │  │     ┌─────────────────────────────────────────────────────────────────┐││  │
│  │  │     │  • Root Cause Analysis                                          │││  │
│  │  │     │  • Fix Strategy Selection (Rule-based vs LLM-based)             │││  │
│  │  │     │  • Automatic Application with Rollback Support                  │││  │
│  │  │     │  • Audit Logging (What, When, Why, Who Fixed)                   │││  │
│  │  │     └─────────────────────────────────────────────────────────────────┘││  │
│  │  └─────────────────────────────────────────────────────────────────────────┘│  │
│  │  ┌─────────────────────────────────────────────────────────────────────────┐│  │
│  │  │  4. AUTO-DOCUMENTATION (LLM-Generated)                                  ││  │
│  │  │     ┌─────────────────────────────────────────────────────────────────┐││  │
│  │  │     │  • LangChain + Groq Summarization                               │││  │
│  │  │     │  • Business-Friendly Descriptions                               │││  │
│  │  │     │  • Context-Aware (Schema + Lineage + Usage)                     │││  │
│  │  │     │  • Always Up-to-Date                                            │││  │
│  │  │     └─────────────────────────────────────────────────────────────────┘││  │
│  │  └─────────────────────────────────────────────────────────────────────────┘│  │
│  │  ┌─────────────────────────────────────────────────────────────────────────┐│  │
│  │  │  5. AI RECOMMENDATIONS (Pattern Matching)                               ││  │
│  │  │     ┌─────────────────────────────────────────────────────────────────┐││  │
│  │  │     │  • Collaborative Filtering                                      │││  │
│  │  │     │  • Pattern Recognition                                          │││  │
│  │  │     │  • "You might want to create this metric..."                    │││  │
│  │  │     │  • Suggestion-Based Guidance                                    │││  │
│  │  │     └─────────────────────────────────────────────────────────────────┘││  │
│  │  └─────────────────────────────────────────────────────────────────────────┘│  │
│  └─────────────────────────────────────────────────────────────────────────────┘  │
│                                    │                                                │
│                                    ▼                                                │
│  ┌─────────────────────────────────────────────────────────────────────────────┐  │
│  │                         OUTPUT LAYER                                        │  │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌──────────────────┐ │  │
│  │  │  Inferred    │  │  Predictive  │  │  Auto-       │  │  Generated       │ │  │
│  │  │  Rules       │  │  Alerts      │  │  Corrections │  │  Documentation   │ │  │
│  │  └──────────────┘  └──────────────┘  └──────────────┘  └──────────────────┘ │  │
│  └─────────────────────────────────────────────────────────────────────────────┘  │
│                                                                                     │
└─────────────────────────────────────────────────────────────────────────────────────┘`}
              dataFlow={`Historical Data → AI Rule Inference → Rules Created (Confidence Scored)
Historical Data → Predictive Quality → 24hr Alert Generated
Issue Detected → Auto-Correction → Zero-Touch Fix Applied
Metric Created → Auto-Documentation → Docs Generated
User Behavior → AI Recommendations → Suggestions Shown`}
            />

            <div style={{ marginTop: '24px', background: 'rgba(15, 23, 42, 0.4)', padding: '24px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
              <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#E2E8F0', marginBottom: '16px' }}>Feature Breakdown & Capabilities</h3>
              <div style={{ overflowX: 'auto', marginBottom: '24px' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px', color: '#94A3B8' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                      <th style={{ padding: '12px 8px', color: '#818CF8', fontWeight: '600' }}>Feature</th>
                      <th style={{ padding: '12px 8px', color: '#818CF8', fontWeight: '600' }}>Status</th>
                      <th style={{ padding: '12px 8px', color: '#818CF8', fontWeight: '600' }}>Tech Stack</th>
                      <th style={{ padding: '12px 8px', color: '#818CF8', fontWeight: '600' }}>Key Metrics</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                      <td style={{ padding: '12px 8px', fontWeight: '600', color: '#E2E8F0' }}>AI Rule Inference V2</td>
                      <td style={{ padding: '12px 8px', color: '#F59E0B' }}>In Progress</td>
                      <td style={{ padding: '12px 8px' }}>pandas, numpy, scikit-learn, xgboost</td>
                      <td style={{ padding: '12px 8px' }}>&gt; 85% accuracy, &lt; 5 min creation</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                      <td style={{ padding: '12px 8px', fontWeight: '600', color: '#E2E8F0' }}>Predictive Quality Engine</td>
                      <td style={{ padding: '12px 8px', color: '#F59E0B' }}>In Progress</td>
                      <td style={{ padding: '12px 8px' }}>Prophet, XGBoost, Isolation Forest</td>
                      <td style={{ padding: '12px 8px' }}>24hr early warning, &gt; 90% accuracy</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                      <td style={{ padding: '12px 8px', fontWeight: '600', color: '#E2E8F0' }}>Auto-Correction V2</td>
                      <td style={{ padding: '12px 8px', color: '#F59E0B' }}>In Progress</td>
                      <td style={{ padding: '12px 8px' }}>LangChain, Groq, pandas</td>
                      <td style={{ padding: '12px 8px' }}>&gt; 85% success rate, &lt; 1 sec fix</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                      <td style={{ padding: '12px 8px', fontWeight: '600', color: '#E2E8F0' }}>Auto-Documentation</td>
                      <td style={{ padding: '12px 8px', color: '#F59E0B' }}>In Progress</td>
                      <td style={{ padding: '12px 8px' }}>LangChain, Groq, Jinja2</td>
                      <td style={{ padding: '12px 8px' }}>100% coverage, real-time updates</td>
                    </tr>
                    <tr>
                      <td style={{ padding: '12px 8px', fontWeight: '600', color: '#E2E8F0' }}>AI Recommendations</td>
                      <td style={{ padding: '12px 8px', color: '#3B82F6' }}>Planned</td>
                      <td style={{ padding: '12px 8px' }}>Collaborative Filtering</td>
                      <td style={{ padding: '12px 8px' }}>&lt; 60% acceptance rate</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#E2E8F0', marginBottom: '16px' }}>LLM Fallback & Orchestration Chain</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', background: 'rgba(0,0,0,0.2)', padding: '20px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ background: '#10B981', color: '#fff', fontSize: '11px', fontWeight: 'bold', padding: '3px 8px', borderRadius: '4px' }}>PRIMARY</span>
                  <span style={{ fontFamily: 'monospace', color: '#E2E8F0' }}>Groq (Llama 3.3 70B)</span>
                  <span style={{ color: '#64748B', fontSize: '13px' }}>— Fastest performance, open tier</span>
                </div>
                <div style={{ color: '#64748B', paddingLeft: '20px', fontSize: '12px' }}>▼ Fallback 1 (If API Limit Exceeded)</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ background: '#3B82F6', color: '#fff', fontSize: '11px', fontWeight: 'bold', padding: '3px 8px', borderRadius: '4px' }}>SECONDARY</span>
                  <span style={{ fontFamily: 'monospace', color: '#E2E8F0' }}>OpenAI (GPT-4o)</span>
                  <span style={{ color: '#64748B', fontSize: '13px' }}>— High logic accuracy</span>
                </div>
                <div style={{ color: '#64748B', paddingLeft: '20px', fontSize: '12px' }}>▼ Fallback 2 (If Gateway Error)</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ background: '#8B5CF6', color: '#fff', fontSize: '11px', fontWeight: 'bold', padding: '3px 8px', borderRadius: '4px' }}>TERTIARY</span>
                  <span style={{ fontFamily: 'monospace', color: '#E2E8F0' }}>Gemini (1.5 Flash)</span>
                  <span style={{ color: '#64748B', fontSize: '13px' }}>— Massively scalable fallback</span>
                </div>
                <div style={{ color: '#64748B', paddingLeft: '20px', fontSize: '12px' }}>▼ Fallback 3 (If Network Disruption)</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ background: '#EF4444', color: '#fff', fontSize: '11px', fontWeight: 'bold', padding: '3px 8px', borderRadius: '4px' }}>OFFLINE</span>
                  <span style={{ fontFamily: 'monospace', color: '#E2E8F0' }}>Ollama (Llama 3.2 3B)</span>
                  <span style={{ color: '#64748B', fontSize: '13px' }}>— Local computation host, 100% free</span>
                </div>
              </div>
            </div>
          </section>

          {/* Category 2 */}
          <section id="category-2" className="scroll-reveal fade-up" style={{ marginBottom: '80px', scrollMarginTop: '100px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
              <div style={{ width: '48px', height: '48px', background: 'rgba(16,185,129,0.1)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10B981', fontSize: '24px' }}>💬</div>
              <h2 style={{ fontSize: '32px', fontWeight: '700' }}>Category 2: Natural Language Query</h2>
            </div>
            <p style={{ color: '#94A3B8', fontSize: '18px', marginBottom: '32px' }}>NLQ — Ask in Plain English, Get Answers in Excel</p>
            <CodeBlock 
              title="nlq_hld.txt"
              code={`┌─────────────────────────────────────────────────────────────────────────────────────┐
│                    NATURAL LANGUAGE QUERY LAYER — COMPLETE HLD                     │
├─────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                     │
│  ┌─────────────────────────────────────────────────────────────────────────────┐  │
│  │  USER INPUT: "What was Q4 Revenue for West region?"                         │  │
│  └─────────────────────────────────────────────────────────────────────────────┘  │
│                                    │                                                │
│                                    ▼                                                │
│  ┌─────────────────────────────────────────────────────────────────────────────┐  │
│  │  STEP 1: EMBEDDING (OpenAI text-embedding-3-small)                          │  │
│  │  ┌─────────────────────────────────────────────────────────────────────────┐│  │
│  │  │  • Convert question to 1536-dimension vector                            ││  │
│  │  │  • Semantic understanding of intent                                     ││  │
│  │  └─────────────────────────────────────────────────────────────────────────┘│  │
│  └─────────────────────────────────────────────────────────────────────────────┘  │
│                                    │                                                │
│                                    ▼                                                │
│  ┌─────────────────────────────────────────────────────────────────────────────┐  │
│  │  STEP 2: SEMANTIC SEARCH (pgvector)                                         │  │
│  │  ┌─────────────────────────────────────────────────────────────────────────┐│  │
│  │  │  • Vector similarity search in PostgreSQL                                ││  │
│  │  │  • Revenue → 95% match                                                   ││  │
│  │  │  • Region dimension → 92% match                                          ││  │
│  │  │  • Quarter filter → 88% match                                            ││  │
│  │  └─────────────────────────────────────────────────────────────────────────┘│  │
│  └─────────────────────────────────────────────────────────────────────────────┘  │
│                                    │                                                │
│                                    ▼                                                │
│  ┌─────────────────────────────────────────────────────────────────────────────┐  │
│  │  STEP 3: LLM TRANSLATION (LangChain + Groq)                                 │  │
│  │  ┌─────────────────────────────────────────────────────────────────────────┐│  │
│  │  │  • Few-shot translation with examples                                   ││  │
│  │  │  • Convert to Snowflake SQL                                             ││  │
│  │  │  • SQL: SELECT SUM(revenue) FROM sales WHERE quarter=4 AND region='West' ││  │
│  │  └─────────────────────────────────────────────────────────────────────────┘│  │
│  └─────────────────────────────────────────────────────────────────────────────┘  │
│                                    │                                                │
│                                    ▼                                                │
│  ┌─────────────────────────────────────────────────────────────────────────────┐  │
│  │  STEP 4: QUALITY VALIDATION                                                 │  │
│  │  ┌─────────────────────────────────────────────────────────────────────────┐│  │
│  │  │  • Check against governance rules                                        ││  │
│  │  │  • Dry-run validation (DuckDB)                                           ││  │
│  │  │  • Security check (no DROP/DELETE/UPDATE)                               ││  │
│  │  └─────────────────────────────────────────────────────────────────────────┘│  │
│  └─────────────────────────────────────────────────────────────────────────────┘  │
│                                    │                                                │
│                                    ▼                                                │
│  ┌─────────────────────────────────────────────────────────────────────────────┐  │
│  │  STEP 5: EXECUTE & RETURN                                                   │  │
│  │  ┌─────────────────────────────────────────────────────────────────────────┐│  │
│  │  │  • Run on Snowflake (or fallback)                                       ││  │
│  │  │  • Result: ₹85.4 Cr + Lineage Attached                                   ││  │
│  │  │  • Time: < 2 seconds                                                     ││  │
│  │  └─────────────────────────────────────────────────────────────────────────┘│  │
│  └─────────────────────────────────────────────────────────────────────────────┘  │
│                                    │                                                │
│                                    ▼                                                │
│  ┌─────────────────────────────────────────────────────────────────────────────┐  │
│  │  OUTPUT: Excel Worksheet with Live Data                                     │  │
│  │  ┌─────────────────────────────────────────────────────────────────────────┐│  │
│  │  │  • Data loads directly into Excel sheet                                  ││  │
│  │  │  • Lineage attached to every cell                                       ││  │
│  │  │  • Trusted number with green status                                      ││  │
│  │  └─────────────────────────────────────────────────────────────────────────┘│  │
│  └─────────────────────────────────────────────────────────────────────────────┘  │
│                                                                                     │
└─────────────────────────────────────────────────────────────────────────────────────┘`}
              dataFlow={`User Question → Embedding → Semantic Search → LLM → SQL → Validate → Execute → Excel`}
            />

            <div style={{ marginTop: '24px', background: 'rgba(15, 23, 42, 0.4)', padding: '24px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
              <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#E2E8F0', marginBottom: '16px' }}>Feature Breakdown & Targets</h3>
              <div style={{ overflowX: 'auto', marginBottom: '24px' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px', color: '#94A3B8' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                      <th style={{ padding: '12px 8px', color: '#10B981', fontWeight: '600' }}>Feature</th>
                      <th style={{ padding: '12px 8px', color: '#10B981', fontWeight: '600' }}>Status</th>
                      <th style={{ padding: '12px 8px', color: '#10B981', fontWeight: '600' }}>Tech Stack</th>
                      <th style={{ padding: '12px 8px', color: '#10B981', fontWeight: '600' }}>Key Metrics</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                      <td style={{ padding: '12px 8px', fontWeight: '600', color: '#E2E8F0' }}>NLQ → SQL Engine</td>
                      <td style={{ padding: '12px 8px', color: '#F59E0B' }}>In Progress</td>
                      <td style={{ padding: '12px 8px' }}>LangChain, Groq, OpenAI</td>
                      <td style={{ padding: '12px 8px' }}>&lt; 2 sec response</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                      <td style={{ padding: '12px 8px', fontWeight: '600', color: '#E2E8F0' }}>pgvector Semantic Search</td>
                      <td style={{ padding: '12px 8px', color: '#F59E0B' }}>In Progress</td>
                      <td style={{ padding: '12px 8px' }}>pgvector, IVFFlat</td>
                      <td style={{ padding: '12px 8px' }}>&gt; 90% match accuracy</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                      <td style={{ padding: '12px 8px', fontWeight: '600', color: '#E2E8F0' }}>RAG-Powered Accuracy</td>
                      <td style={{ padding: '12px 8px', color: '#F59E0B' }}>In Progress</td>
                      <td style={{ padding: '12px 8px' }}>LangChain, pgvector</td>
                      <td style={{ padding: '12px 8px' }}>&gt; 90% accuracy</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                      <td style={{ padding: '12px 8px', fontWeight: '600', color: '#E2E8F0' }}>90%+ Translation Accuracy</td>
                      <td style={{ padding: '12px 8px', color: '#F59E0B' }}>In Progress</td>
                      <td style={{ padding: '12px 8px' }}>Groq, OpenAI, Gemini</td>
                      <td style={{ padding: '12px 8px' }}>&gt; 90% accuracy</td>
                    </tr>
                    <tr>
                      <td style={{ padding: '12px 8px', fontWeight: '600', color: '#E2E8F0' }}>NLQ in Excel Ribbon</td>
                      <td style={{ padding: '12px 8px', color: '#3B82F6' }}>Planned</td>
                      <td style={{ padding: '12px 8px' }}>Office.js</td>
                      <td style={{ padding: '12px 8px' }}>Native Excel integration</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#E2E8F0', marginBottom: '16px' }}>Technology Stack Reference</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
                <div style={{ background: 'rgba(0,0,0,0.2)', padding: '16px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <div style={{ color: '#10B981', fontWeight: '600', fontSize: '14px', marginBottom: '4px' }}>Orchestration & LLM</div>
                  <div style={{ fontSize: '13px', color: '#94A3B8' }}>LangChain, Groq (Llama 3.3 70B), OpenAI (GPT-4o)</div>
                </div>
                <div style={{ background: 'rgba(0,0,0,0.2)', padding: '16px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <div style={{ color: '#10B981', fontWeight: '600', fontSize: '14px', marginBottom: '4px' }}>Vector Databases</div>
                  <div style={{ fontSize: '13px', color: '#94A3B8' }}>pgvector (IVFFlat), OpenAI text-embedding-3-small</div>
                </div>
                <div style={{ background: 'rgba(0,0,0,0.2)', padding: '16px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <div style={{ color: '#10B981', fontWeight: '600', fontSize: '14px', marginBottom: '4px' }}>Offline Processing</div>
                  <div style={{ fontSize: '13px', color: '#94A3B8' }}>Ollama (Llama 3.2 3B local sandbox node)</div>
                </div>
              </div>
            </div>
          </section>

          {/* Category 3 */}
          <section id="category-3" className="scroll-reveal fade-up" style={{ marginBottom: '80px', scrollMarginTop: '100px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
              <div style={{ width: '48px', height: '48px', background: 'rgba(56,189,248,0.1)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#38BDF8', fontSize: '24px' }}>🌐</div>
              <h2 style={{ fontSize: '32px', fontWeight: '700' }}>Category 3: Multi-Cloud Connectivity</h2>
            </div>
            <p style={{ color: '#94A3B8', fontSize: '18px', marginBottom: '32px' }}>Every Cloud, Every Stack — Connect to Any Data Platform</p>
            <CodeBlock 
              title="multicloud_hld.txt"
              code={`┌─────────────────────────────────────────────────────────────────────────────────────┐
│                    MULTI-CLOUD CONNECTIVITY LAYER — COMPLETE HLD                  │
├─────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                     │
│  ┌─────────────────────────────────────────────────────────────────────────────┐  │
│  │  CONNECTOR LAYER                                                             │  │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐    │  │
│  │  │  Snowflake   │  │  Databricks  │  │   Fabric     │  │   Redshift   │    │  │
│  │  │  Connector   │  │  Connector   │  │  Connector   │  │  Connector   │    │  │
│  │  └──────────────┘  └──────────────┘  └──────────────┘  └──────────────┘    │  │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐    │  │
│  │  │  BigQuery    │  │  Azure SQL   │  │     dbt      │  │  Looker/     │    │  │
│  │  │  Connector   │  │  Connector   │  │  Connector   │  │  Tableau     │    │  │
│  │  └──────────────┘  └──────────────┘  └──────────────┘  └──────────────┘    │  │
│  └─────────────────────────────────────────────────────────────────────────────┘  │
│                                    │                                                │
│                                    ▼                                                │
│  ┌─────────────────────────────────────────────────────────────────────────────┐  │
│  │  UNIFIED SEMANTIC LAYER                                                      │  │
│  │  ┌─────────────────────────────────────────────────────────────────────────┐│  │
│  │  │  • One definition for every metric across ALL clouds                    ││  │
│  │  │  • Revenue = SUM(net_sales) WHERE status='Completed'                    ││  │
│  │  │  • Same number, regardless of source                                    ││  │
│  │  └─────────────────────────────────────────────────────────────────────────┘│  │
│  └─────────────────────────────────────────────────────────────────────────────┘  │
│                                    │                                                │
│                                    ▼                                                │
│  ┌─────────────────────────────────────────────────────────────────────────────┐  │
│  │  QUERY ROUTER                                                               │  │
│  │  ┌─────────────────────────────────────────────────────────────────────────┐│  │
│  │  │  • Determines which cloud to query                                      ││  │
│  │  │  • Optimizes for performance                                            ││  │
│  │  │  • Handles cross-cloud joins                                            ││  │
│  │  └─────────────────────────────────────────────────────────────────────────┘│  │
│  └─────────────────────────────────────────────────────────────────────────────┘  │
│                                    │                                                │
│                                    ▼                                                │
│  ┌─────────────────────────────────────────────────────────────────────────────┐  │
│  │  UNIFIED VIEW                                                               │  │
│  │  ┌─────────────────────────────────────────────────────────────────────────┐│  │
│  │  │  • User sees ONE dashboard                                              ││  │
│  │  │  • Source doesn't matter                                                ││  │
│  │  │  • Data from ALL clouds combined                                        ││  │
│  │  └─────────────────────────────────────────────────────────────────────────┘│  │
│  └─────────────────────────────────────────────────────────────────────────────┘  │
│                                                                                     │
└─────────────────────────────────────────────────────────────────────────────────────┘`}
              dataFlow={`Cloud A → Connector A → Semantic Layer → Query Router → Unified View
Cloud B → Connector B → Semantic Layer → Query Router → Unified View
User sees: ONE dashboard, ALL data, ANY cloud`}
            />

            <div style={{ marginTop: '24px', background: 'rgba(15, 23, 42, 0.4)', padding: '24px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
              <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#E2E8F0', marginBottom: '16px' }}>Multi-Cloud Driver Implementation</h3>
              <p style={{ color: '#94A3B8', fontSize: '14px', marginBottom: '16px' }}>
                The connector architecture abstracts the queries, translating them based on unified semantic registry rules into dialect-compliant backend structures.
              </p>
              <CodeBlock 
                title="multi_cloud_connector.py"
                code={`class MultiCloudConnector:
    def __init__(self, connection_type, credentials):
        self.connection_type = connection_type
        self.credentials = credentials
        self._connector = self._get_connector()
    
    def _get_connector(self):
        if self.connection_type == "snowflake":
            import snowflake.connector
            return snowflake.connector.connect(**self.credentials)
        elif self.connection_type == "databricks":
            import databricks.sql
            return databricks.sql.connect(**self.credentials)
        elif self.connection_type == "redshift":
            import psycopg2
            return psycopg2.connect(**self.credentials)
        elif self.connection_type == "bigquery":
            from google.cloud import bigquery
            return bigquery.Client(**self.credentials)
        raise ValueError(f"Unknown connection type: {self.connection_type}")`}
              />
            </div>
          </section>

          {/* Category 4 */}
          <section id="category-4" className="scroll-reveal fade-up" style={{ marginBottom: '80px', scrollMarginTop: '100px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
              <div style={{ width: '48px', height: '48px', background: 'rgba(245,158,11,0.1)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#F59E0B', fontSize: '24px' }}>🧩</div>
              <h2 style={{ fontSize: '32px', fontWeight: '700' }}>Category 4: Semantic Layer</h2>
            </div>
            <p style={{ color: '#94A3B8', fontSize: '18px', marginBottom: '32px' }}>One Source of Truth — Foundation of Everything</p>
            <CodeBlock 
              title="semantic_layer_hld.txt"
              code={`┌─────────────────────────────────────────────────────────────────────────────┐
│                    SEMANTIC LAYER — FOUNDATION                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐  │
│  │  METRIC REGISTRY                                                     │  │
│  │  ┌──────────────────────────────────────────────────────────────────┐│  │
│  │  │  Name: Revenue                                                    ││  │
│  │  │  Definition: SUM(net_sales) WHERE status='Completed'              ││  │
│  │  │  Owner: finance@company.com                                       ││  │
│  │  │  Version: v2.3.0 → v2.3.1 (history tracked)                      ││  │
│  │  │  Synonyms: Sales, Turnover, Gross Revenue                         ││  │
│  │  └──────────────────────────────────────────────────────────────────┘│  │
│  └─────────────────────────────────────────────────────────────────────┘  │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐  │
│  │  VECTOR EMBEDDINGS (V3.0 NEW)                                       │  │
│  │  ┌──────────────────────────────────────────────────────────────────┐│  │
│  │  │  • Each metric converted to vector (1536 dimensions)              ││  │
│  │  │  • Stored in pgvector                                             ││  │
│  │  │  • Enables semantic search                                        ││  │
│  │  └──────────────────────────────────────────────────────────────────┘│  │
│  └─────────────────────────────────────────────────────────────────────┘  │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐  │
│  │  DATA LINEAGE                                                       │  │
│  │  ┌──────────────────────────────────────────────────────────────────┐│  │
│  │  │  • Column-level lineage                                           ││  │
│  │  │  • Full transformation history                                    ││  │
│  │  │  • Source → Transformation → Metric → Report                      ││  │
│  │  └──────────────────────────────────────────────────────────────────┘│  │
│  └─────────────────────────────────────────────────────────────────────┘  │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐  │
│  │  SEMANTIC SEARCH                                                     │  │
│  │  ┌──────────────────────────────────────────────────────────────────┐│  │
│  │  │  INPUT: "customer churn"                                          ││  │
│  │  │  PROCESS: Vector similarity search                                ││  │
│  │  │  OUTPUT: Churn Rate (95%), Retention (88%), MAU (72%)             ││  │
│  │  └──────────────────────────────────────────────────────────────────┘│  │
│  └─────────────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────────────┘`}
              dataFlow={`All Metrics → Metric Registry → Vector Embeddings → Semantic Search
All Changes → Version History → Audit Trail
All Lineage → Column-Level Tracking → Impact Analysis`}
            />

            <div style={{ marginTop: '24px', background: 'rgba(15, 23, 42, 0.4)', padding: '24px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
              <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#E2E8F0', marginBottom: '16px' }}>Feature Breakdown</h3>
              <div style={{ overflowX: 'auto', marginBottom: '24px' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px', color: '#94A3B8' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                      <th style={{ padding: '12px 8px', color: '#F59E0B', fontWeight: '600' }}>Feature</th>
                      <th style={{ padding: '12px 8px', color: '#F59E0B', fontWeight: '600' }}>Status</th>
                      <th style={{ padding: '12px 8px', color: '#F59E0B', fontWeight: '600' }}>Tech Stack</th>
                      <th style={{ padding: '12px 8px', color: '#F59E0B', fontWeight: '600' }}>Key Metrics</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                      <td style={{ padding: '12px 8px', fontWeight: '600', color: '#E2E8F0' }}>Canonical Metric Definitions</td>
                      <td style={{ padding: '12px 8px', color: '#10B981' }}>✅ Complete</td>
                      <td style={{ padding: '12px 8px' }}>PostgreSQL, SQLAlchemy</td>
                      <td style={{ padding: '12px 8px' }}>100% definition coverage</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                      <td style={{ padding: '12px 8px', fontWeight: '600', color: '#E2E8F0' }}>Full Version History</td>
                      <td style={{ padding: '12px 8px', color: '#10B981' }}>✅ Complete</td>
                      <td style={{ padding: '12px 8px' }}>PostgreSQL, Pydantic</td>
                      <td style={{ padding: '12px 8px' }}>Every change tracked</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                      <td style={{ padding: '12px 8px', fontWeight: '600', color: '#E2E8F0' }}>Column-Level Lineage</td>
                      <td style={{ padding: '12px 8px', color: '#10B981' }}>✅ Complete</td>
                      <td style={{ padding: '12px 8px' }}>PostgreSQL, JSONB</td>
                      <td style={{ padding: '12px 8px' }}>Source → target mapping</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                      <td style={{ padding: '12px 8px', fontWeight: '600', color: '#E2E8F0' }}>Vector Embeddings</td>
                      <td style={{ padding: '12px 8px', color: '#F59E0B' }}>In Progress</td>
                      <td style={{ padding: '12px 8px' }}>OpenAI, pgvector</td>
                      <td style={{ padding: '12px 8px' }}>1536 dimensions</td>
                    </tr>
                    <tr>
                      <td style={{ padding: '12px 8px', fontWeight: '600', color: '#E2E8F0' }}>Semantic Search</td>
                      <td style={{ padding: '12px 8px', color: '#F59E0B' }}>In Progress</td>
                      <td style={{ padding: '12px 8px' }}>pgvector, IVFFlat</td>
                      <td style={{ padding: '12px 8px' }}>&gt; 90% relevance</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
                <div style={{ background: 'rgba(0,0,0,0.2)', padding: '16px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <div style={{ color: '#F59E0B', fontWeight: '600', fontSize: '14px', marginBottom: '4px' }}>Storage Layer</div>
                  <div style={{ fontSize: '13px', color: '#94A3B8' }}>PostgreSQL + pgvector (IVFFlat index) for sub-50ms vector searches</div>
                </div>
                <div style={{ background: 'rgba(0,0,0,0.2)', padding: '16px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <div style={{ color: '#F59E0B', fontWeight: '600', fontSize: '14px', marginBottom: '4px' }}>Embedding Model</div>
                  <div style={{ fontSize: '13px', color: '#94A3B8' }}>OpenAI text-embedding-3-small producing 1536-dim vectors per metric</div>
                </div>
                <div style={{ background: 'rgba(0,0,0,0.2)', padding: '16px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <div style={{ color: '#F59E0B', fontWeight: '600', fontSize: '14px', marginBottom: '4px' }}>Versioning</div>
                  <div style={{ fontSize: '13px', color: '#94A3B8' }}>SemVer (MAJOR.MINOR.PATCH) with immutable history — every change is auditable</div>
                </div>
              </div>
            </div>
          </section>

          {/* Category 5 */}
          <section id="category-5" className="scroll-reveal fade-up" style={{ marginBottom: '80px', scrollMarginTop: '100px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
              <div style={{ width: '48px', height: '48px', background: 'rgba(34,197,94,0.1)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#22C55E', fontSize: '24px' }}>⚡</div>
              <h2 style={{ fontSize: '32px', fontWeight: '700' }}>Category 5: Excel Add-in V3</h2>
            </div>
            <p style={{ color: '#94A3B8', fontSize: '18px', marginBottom: '32px' }}>Excel Transformed — Bring Governance to Where Users Work</p>
            <CodeBlock 
              title="excel_addin_hld.txt"
              code={`┌─────────────────────────────────────────────────────────────────────────────┐
│                    EXCEL ADD-IN V3 — USER EXPERIENCE                       │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐  │
│  │  EXCEL DASHBOARD BUILDER                                             │  │
│  │  ┌──────────────────────────────────────────────────────────────────┐│  │
│  │  │  • Drag-and-drop dashboard builder in Excel                      ││  │
│  │  │  • Live data from Snowflake/Databricks                           ││  │
│  │  │  • Auto-validated data                                            ││  │
│  │  └──────────────────────────────────────────────────────────────────┘│  │
│  └─────────────────────────────────────────────────────────────────────┘  │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐  │
│  │  REAL-TIME COLLABORATION                                             │  │
│  │  ┌──────────────────────────────────────────────────────────────────┐│  │
│  │  │  • Multiple users on same workbook                                ││  │
│  │  │  • Live updates                                                   ││  │
│  │  │  • Change tracking                                                ││  │
│  │  └──────────────────────────────────────────────────────────────────┘│  │
│  └─────────────────────────────────────────────────────────────────────┘  │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐  │
│  │  TEMPLATE MARKETPLACE                                               │  │
│  │  ┌──────────────────────────────────────────────────────────────────┐│  │
│  │  │  • Pre-built templates for common use cases                      ││  │
│  │  │  • Financial Reporting, Sales Dashboard, HR Analytics             ││  │
│  │  │  • One-click install                                              ││  │
│  │  └──────────────────────────────────────────────────────────────────┘│  │
│  └─────────────────────────────────────────────────────────────────────┘  │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐  │
│  │  NLQ IN EXCEL RIBBON                                                 │  │
│  │  ┌──────────────────────────────────────────────────────────────────┐│  │
│  │  │  • Type questions directly in Excel                               ││  │
│  │  │  • Answer loads in 2 seconds                                      ││  │
│  │  │  • No need to leave Excel                                         ││  │
│  │  └──────────────────────────────────────────────────────────────────┘│  │
│  └─────────────────────────────────────────────────────────────────────┘  │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐  │
│  │  POWER BI INTEGRATION                                                │  │
│  │  ┌──────────────────────────────────────────────────────────────────┐│  │
│  │  │  • Push validated data to Power BI                                ││  │
│  │  │  • Consistent metrics across tools                                ││  │
│  │  │  • One-click publish                                              ││  │
│  │  └──────────────────────────────────────────────────────────────────┘│  │
│  └─────────────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────────────┘`}
              dataFlow={`User Opens Excel → DataTrust Ribbon → Refresh → Validate → Publish
User Types NLQ → NLQ Engine → SQL → Execute → Excel Sheet
User Builds Dashboard → Live Data → Auto-Validate → Publish`}
            />

            <div style={{ marginTop: '24px', background: 'rgba(15, 23, 42, 0.4)', padding: '24px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
              <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#E2E8F0', marginBottom: '16px' }}>Feature Breakdown &amp; Roadmap</h3>
              <div style={{ overflowX: 'auto', marginBottom: '24px' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px', color: '#94A3B8' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                      <th style={{ padding: '12px 8px', color: '#22C55E', fontWeight: '600' }}>Feature</th>
                      <th style={{ padding: '12px 8px', color: '#22C55E', fontWeight: '600' }}>Status</th>
                      <th style={{ padding: '12px 8px', color: '#22C55E', fontWeight: '600' }}>Tech Stack</th>
                      <th style={{ padding: '12px 8px', color: '#22C55E', fontWeight: '600' }}>Key Metrics</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                      <td style={{ padding: '12px 8px', fontWeight: '600', color: '#E2E8F0' }}>Excel Dashboard Builder</td>
                      <td style={{ padding: '12px 8px', color: '#F59E0B' }}>In Progress</td>
                      <td style={{ padding: '12px 8px' }}>Office.js, React</td>
                      <td style={{ padding: '12px 8px' }}>Drag-and-drop, live data</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                      <td style={{ padding: '12px 8px', fontWeight: '600', color: '#E2E8F0' }}>Real-Time Collaboration</td>
                      <td style={{ padding: '12px 8px', color: '#F59E0B' }}>In Progress</td>
                      <td style={{ padding: '12px 8px' }}>WebSockets, Office.js</td>
                      <td style={{ padding: '12px 8px' }}>Multi-user sync &lt; 500ms</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                      <td style={{ padding: '12px 8px', fontWeight: '600', color: '#E2E8F0' }}>Template Marketplace</td>
                      <td style={{ padding: '12px 8px', color: '#3B82F6' }}>Planned</td>
                      <td style={{ padding: '12px 8px' }}>Office.js, PostgreSQL</td>
                      <td style={{ padding: '12px 8px' }}>Financial, Sales, HR templates</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                      <td style={{ padding: '12px 8px', fontWeight: '600', color: '#E2E8F0' }}>NLQ in Excel Ribbon</td>
                      <td style={{ padding: '12px 8px', color: '#3B82F6' }}>Planned</td>
                      <td style={{ padding: '12px 8px' }}>Office.js, LangChain</td>
                      <td style={{ padding: '12px 8px' }}>&lt; 2 sec response in Excel</td>
                    </tr>
                    <tr>
                      <td style={{ padding: '12px 8px', fontWeight: '600', color: '#E2E8F0' }}>Power BI Integration</td>
                      <td style={{ padding: '12px 8px', color: '#3B82F6' }}>Planned</td>
                      <td style={{ padding: '12px 8px' }}>Power BI REST API</td>
                      <td style={{ padding: '12px 8px' }}>One-click publish to Power BI</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
                <div style={{ background: 'rgba(0,0,0,0.2)', padding: '16px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <div style={{ color: '#22C55E', fontWeight: '600', fontSize: '14px', marginBottom: '4px' }}>Ribbon Buttons</div>
                  <div style={{ fontSize: '13px', color: '#94A3B8' }}>[Refresh] [Validate] [Publish] [Audit] [Settings] [NLQ] — native Excel toolbar</div>
                </div>
                <div style={{ background: 'rgba(0,0,0,0.2)', padding: '16px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <div style={{ color: '#22C55E', fontWeight: '600', fontSize: '14px', marginBottom: '4px' }}>Collaboration Tech</div>
                  <div style={{ fontSize: '13px', color: '#94A3B8' }}>WebSocket channels per workbook — change conflicts resolved via CRDT</div>
                </div>
                <div style={{ background: 'rgba(0,0,0,0.2)', padding: '16px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <div style={{ color: '#22C55E', fontWeight: '600', fontSize: '14px', marginBottom: '4px' }}>Data Trust Score</div>
                  <div style={{ fontSize: '13px', color: '#94A3B8' }}>Green ✅ = governed, Yellow ⚠️ = needs review, Red ❌ = invalid — shown per cell</div>
                </div>
              </div>
            </div>
          </section>

          {/* Category 6 */}
          <section id="category-6" className="scroll-reveal fade-up" style={{ marginBottom: '80px', scrollMarginTop: '100px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
              <div style={{ width: '48px', height: '48px', background: 'rgba(236,72,153,0.1)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#EC4899', fontSize: '24px' }}>👥</div>
              <h2 style={{ fontSize: '32px', fontWeight: '700' }}>Category 6: Team Collaboration</h2>
            </div>
            <p style={{ color: '#94A3B8', fontSize: '18px', marginBottom: '32px' }}>Workspaces & Governance — Secure Departmental Environments</p>
            <CodeBlock 
              title="collaboration_hld.txt"
              code={`┌─────────────────────────────────────────────────────────────────────────────┐
│                    TEAM COLLABORATION LAYER                                │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐  │
│  │  TEAM WORKSPACES                                                     │  │
│  │  ┌──────────────────────────────────────────────────────────────────┐│  │
│  │  │  • Finance Workspace — Revenue, Profit, RWA                      ││  │
│  │  │  • Sales Workspace — Pipeline, Deals, Quota                      ││  │
│  │  │  • HR Workspace — Headcount, Attrition, Hiring                   ││  │
│  │  │  • Each workspace: isolated, secure, department-specific         ││  │
│  │  └──────────────────────────────────────────────────────────────────┘│  │
│  └─────────────────────────────────────────────────────────────────────┘  │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐  │
│  │  FINE-GRAINED PERMISSIONS                                            │  │
│  │  ┌──────────────────────────────────────────────────────────────────┐│  │
│  │  │  • Column-level security: PII columns masked                     ││  │
│  │  │  • Row-level security: Users see only their data                 ││  │
│  │  │  • Role-based: Viewer, Editor, Admin, Owner                      ││  │
│  │  └──────────────────────────────────────────────────────────────────┘│  │
│  └─────────────────────────────────────────────────────────────────────┘  │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐  │
│  │  APPROVAL WORKFLOWS V2                                               │  │
│  │  ┌──────────────────────────────────────────────────────────────────┐│  │
│  │  │  • Multi-approver chains: Raj → Priya → Diana                  ││  │
│  │  │  • Comments & sign-off                                            ││  │
│  │  │  • SLA-based: 5 days for approval                               ││  │
│  │  └──────────────────────────────────────────────────────────────────┘│  │
│  └─────────────────────────────────────────────────────────────────────┘  │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐  │
│  │  IMPACT ANALYSIS V2                                                  │  │
│  │  ┌──────────────────────────────────────────────────────────────────┐│  │
│  │  │  • "Changing Revenue will affect 3 reports and 2 teams"         ││  │
│  │  │  • Risk assessment: High / Medium / Low                         ││  │
│  │  │  • Mitigation: Backup pipeline available                        ││  │
│  │  └──────────────────────────────────────────────────────────────────┘│  │
│  └─────────────────────────────────────────────────────────────────────┘  │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐  │
│  │  DATA CATALOG V2                                                    │  │
│  │  ┌──────────────────────────────────────────────────────────────────┐│  │
│  │  │  • Full data discovery                                           ││  │
│  │  │  • Business classification                                       ││  │
│  │  │  • Search & browse                                               ││  │
│  │  └──────────────────────────────────────────────────────────────────┘│  │
│  └─────────────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────────────┘`}
              dataFlow={`User Request → Approval Workflow → Multi-Level Approvers → Change Live
Impact Analysis → Show Dependencies → Risk Assessment → Decision
Permissions → Column/Row Level → Data Access → Secure Data`}
            />

            <div style={{ marginTop: '24px', background: 'rgba(15, 23, 42, 0.4)', padding: '24px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
              <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#E2E8F0', marginBottom: '16px' }}>Feature Breakdown &amp; Access Control</h3>
              <div style={{ overflowX: 'auto', marginBottom: '24px' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px', color: '#94A3B8' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                      <th style={{ padding: '12px 8px', color: '#EC4899', fontWeight: '600' }}>Feature</th>
                      <th style={{ padding: '12px 8px', color: '#EC4899', fontWeight: '600' }}>Status</th>
                      <th style={{ padding: '12px 8px', color: '#EC4899', fontWeight: '600' }}>Tech Stack</th>
                      <th style={{ padding: '12px 8px', color: '#EC4899', fontWeight: '600' }}>Key Metrics</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                      <td style={{ padding: '12px 8px', fontWeight: '600', color: '#E2E8F0' }}>Team Workspaces</td>
                      <td style={{ padding: '12px 8px', color: '#10B981' }}>✅ Complete</td>
                      <td style={{ padding: '12px 8px' }}>PostgreSQL, FastAPI</td>
                      <td style={{ padding: '12px 8px' }}>Isolated dept environments</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                      <td style={{ padding: '12px 8px', fontWeight: '600', color: '#E2E8F0' }}>Fine-Grained Permissions</td>
                      <td style={{ padding: '12px 8px', color: '#10B981' }}>✅ Complete</td>
                      <td style={{ padding: '12px 8px' }}>RBAC, PostgreSQL RLS</td>
                      <td style={{ padding: '12px 8px' }}>Column + Row level security</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                      <td style={{ padding: '12px 8px', fontWeight: '600', color: '#E2E8F0' }}>Approval Workflows V2</td>
                      <td style={{ padding: '12px 8px', color: '#F59E0B' }}>In Progress</td>
                      <td style={{ padding: '12px 8px' }}>FastAPI, Celery</td>
                      <td style={{ padding: '12px 8px' }}>Multi-approver, SLA 5 days</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                      <td style={{ padding: '12px 8px', fontWeight: '600', color: '#E2E8F0' }}>Impact Analysis V2</td>
                      <td style={{ padding: '12px 8px', color: '#F59E0B' }}>In Progress</td>
                      <td style={{ padding: '12px 8px' }}>Graph DB, NetworkX</td>
                      <td style={{ padding: '12px 8px' }}>Dependency graph + risk score</td>
                    </tr>
                    <tr>
                      <td style={{ padding: '12px 8px', fontWeight: '600', color: '#E2E8F0' }}>Data Catalog V2</td>
                      <td style={{ padding: '12px 8px', color: '#3B82F6' }}>Planned</td>
                      <td style={{ padding: '12px 8px' }}>pgvector, Elasticsearch</td>
                      <td style={{ padding: '12px 8px' }}>Full metadata discovery</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
                <div style={{ background: 'rgba(0,0,0,0.2)', padding: '16px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <div style={{ color: '#EC4899', fontWeight: '600', fontSize: '14px', marginBottom: '4px' }}>RBAC Roles</div>
                  <div style={{ fontSize: '13px', color: '#94A3B8' }}>Viewer → Editor → Admin → Owner — hierarchical with workspace isolation</div>
                </div>
                <div style={{ background: 'rgba(0,0,0,0.2)', padding: '16px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <div style={{ color: '#EC4899', fontWeight: '600', fontSize: '14px', marginBottom: '4px' }}>Approval Chain</div>
                  <div style={{ fontSize: '13px', color: '#94A3B8' }}>Raj → Priya → Diana — configurable multi-approver chains with SLA enforcement</div>
                </div>
                <div style={{ background: 'rgba(0,0,0,0.2)', padding: '16px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <div style={{ color: '#EC4899', fontWeight: '600', fontSize: '14px', marginBottom: '4px' }}>Impact Graph</div>
                  <div style={{ fontSize: '13px', color: '#94A3B8' }}>Change Revenue → see all 3 downstream reports + 2 teams affected instantly</div>
                </div>
              </div>
            </div>
          </section>

          {/* Category 7 */}
          <section id="category-7" className="scroll-reveal fade-up" style={{ marginBottom: '80px', scrollMarginTop: '100px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
              <div style={{ width: '48px', height: '48px', background: 'rgba(168,85,247,0.1)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#A855F7', fontSize: '24px' }}>📜</div>
              <h2 style={{ fontSize: '32px', fontWeight: '700' }}>Category 7: Audit & Compliance V3</h2>
            </div>
            <p style={{ color: '#94A3B8', fontSize: '18px', marginBottom: '32px' }}>Zero-Effort Compliance — Automated Audit Trails</p>
            <CodeBlock 
              title="compliance_hld.txt"
              code={`┌─────────────────────────────────────────────────────────────────────────────┐
│                    AUDIT & COMPLIANCE V3 LAYER                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐  │
│  │  PRE-BUILT COMPLIANCE REPORTS                                        │  │
│  │  ┌──────────────────────────────────────────────────────────────────┐│  │
│  │  │  • GDPR Audit Pack: 15 pre-built reports                        ││  │
│  │  │  • SOC2 Audit Pack: 20 pre-built reports                        ││  │
│  │  │  • SOX Audit Pack: 12 pre-built reports                         ││  │
│  │  │  • HIPAA Audit Pack: 18 pre-built reports                       ││  │
│  │  │  • One-click generate → Ready in 2 seconds                      ││  │
│  │  └──────────────────────────────────────────────────────────────────┘│  │
│  └─────────────────────────────────────────────────────────────────────┘  │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐  │
│  │  DATA MASKING (PII)                                                  │  │
│  │  ┌──────────────────────────────────────────────────────────────────┐│  │
│  │  │  • Customer Name: John Doe → J*** D**                           ││  │
│  │  │  • Email: john.doe@email.com → j****@e***.com                  ││  │
│  │  │  • Phone: +91 98765 43210 → +91 ***** ****                     ││  │
│  │  │  • Configurable masking rules                                    ││  │
│  │  └──────────────────────────────────────────────────────────────────┘│  │
│  └─────────────────────────────────────────────────────────────────────┘  │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐  │
│  │  DATA RETENTION POLICIES                                            │  │
│  │  ┌──────────────────────────────────────────────────────────────────┐│  │
│  │  │  • Audit logs: 7 years (configurable)                           ││  │
│  │  │  • Reports: 5 years (configurable)                              ││  │
│  │  │  • Metrics: 10 years (configurable)                             ││  │
│  │  │  • Auto-purge after retention period                            ││  │
│  │  └──────────────────────────────────────────────────────────────────┘│  │
│  └─────────────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────────────┘`}
              dataFlow={`Platform Activity → Automated Audit Trail → Compliance Ready`}
            />

            <div style={{ marginTop: '24px', background: 'rgba(15, 23, 42, 0.4)', padding: '24px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
              <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#E2E8F0', marginBottom: '16px' }}>Compliance Standards &amp; Feature Status</h3>
              <div style={{ overflowX: 'auto', marginBottom: '24px' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px', color: '#94A3B8' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                      <th style={{ padding: '12px 8px', color: '#A855F7', fontWeight: '600' }}>Feature</th>
                      <th style={{ padding: '12px 8px', color: '#A855F7', fontWeight: '600' }}>Status</th>
                      <th style={{ padding: '12px 8px', color: '#A855F7', fontWeight: '600' }}>Tech Stack</th>
                      <th style={{ padding: '12px 8px', color: '#A855F7', fontWeight: '600' }}>Key Metrics</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                      <td style={{ padding: '12px 8px', fontWeight: '600', color: '#E2E8F0' }}>Immutable Audit Log</td>
                      <td style={{ padding: '12px 8px', color: '#10B981' }}>✅ Complete</td>
                      <td style={{ padding: '12px 8px' }}>PostgreSQL, TimescaleDB</td>
                      <td style={{ padding: '12px 8px' }}>Every action logged</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                      <td style={{ padding: '12px 8px', fontWeight: '600', color: '#E2E8F0' }}>Pre-Built Compliance Reports</td>
                      <td style={{ padding: '12px 8px', color: '#F59E0B' }}>In Progress</td>
                      <td style={{ padding: '12px 8px' }}>Jinja2, FastAPI, PDF</td>
                      <td style={{ padding: '12px 8px' }}>GDPR/SOC2/SOX/HIPAA packs</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                      <td style={{ padding: '12px 8px', fontWeight: '600', color: '#E2E8F0' }}>Data Masking (PII)</td>
                      <td style={{ padding: '12px 8px', color: '#F59E0B' }}>In Progress</td>
                      <td style={{ padding: '12px 8px' }}>PostgreSQL RLS, Custom</td>
                      <td style={{ padding: '12px 8px' }}>Name, email, phone masking</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                      <td style={{ padding: '12px 8px', fontWeight: '600', color: '#E2E8F0' }}>One-Second Audit Query</td>
                      <td style={{ padding: '12px 8px', color: '#F59E0B' }}>In Progress</td>
                      <td style={{ padding: '12px 8px' }}>TimescaleDB, Redis</td>
                      <td style={{ padding: '12px 8px' }}>&lt; 1 sec on 100M+ events</td>
                    </tr>
                    <tr>
                      <td style={{ padding: '12px 8px', fontWeight: '600', color: '#E2E8F0' }}>Data Retention Policies</td>
                      <td style={{ padding: '12px 8px', color: '#F59E0B' }}>In Progress</td>
                      <td style={{ padding: '12px 8px' }}>Celery, PostgreSQL</td>
                      <td style={{ padding: '12px 8px' }}>7yr audit, 10yr metrics</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
                <div style={{ background: 'rgba(0,0,0,0.2)', padding: '16px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)', textAlign: 'center' }}>
                  <div style={{ color: '#A855F7', fontWeight: '700', fontSize: '24px', marginBottom: '4px' }}>15</div>
                  <div style={{ color: '#94A3B8', fontSize: '13px' }}>GDPR Pre-built Reports</div>
                </div>
                <div style={{ background: 'rgba(0,0,0,0.2)', padding: '16px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)', textAlign: 'center' }}>
                  <div style={{ color: '#A855F7', fontWeight: '700', fontSize: '24px', marginBottom: '4px' }}>20</div>
                  <div style={{ color: '#94A3B8', fontSize: '13px' }}>SOC2 Pre-built Reports</div>
                </div>
                <div style={{ background: 'rgba(0,0,0,0.2)', padding: '16px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)', textAlign: 'center' }}>
                  <div style={{ color: '#A855F7', fontWeight: '700', fontSize: '24px', marginBottom: '4px' }}>12</div>
                  <div style={{ color: '#94A3B8', fontSize: '13px' }}>SOX Pre-built Reports</div>
                </div>
                <div style={{ background: 'rgba(0,0,0,0.2)', padding: '16px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)', textAlign: 'center' }}>
                  <div style={{ color: '#A855F7', fontWeight: '700', fontSize: '24px', marginBottom: '4px' }}>18</div>
                  <div style={{ color: '#94A3B8', fontSize: '13px' }}>HIPAA Pre-built Reports</div>
                </div>
              </div>
            </div>
          </section>

          {/* Category 8 */}
          <section id="category-8" className="scroll-reveal fade-up" style={{ scrollMarginTop: '100px', marginBottom: '80px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(56, 189, 248, 0.1)', border: '1px solid rgba(56, 189, 248, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px' }}>
                🚀
              </div>
              <h2 style={{ fontSize: '32px', fontWeight: '700', letterSpacing: '-0.02em', margin: 0 }}>Category 8: Performance & Scale</h2>
            </div>
            <p style={{ color: '#94A3B8', fontSize: '18px', marginBottom: '32px' }}>Enterprise-Grade Scale — Built to Handle 1B+ Rows</p>
            <CodeBlock 
              title="performance_scale_hld.txt"
              code={`┌─────────────────────────────────────────────────────────────────────────────┐
│                    PERFORMANCE & SCALE LAYER                               │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐  │
│  │  REDIS SEMANTIC CACHE                                                │  │
│  │  ┌──────────────────────────────────────────────────────────────────┐│  │
│  │  │  • Cache query results with TTL (5-15 min)                      ││  │
│  │  │  • 80%+ cache hit rate for repeated queries                     ││  │
│  │  │  • Sub-50ms response for cached results                         ││  │
│  │  │  • Invalidation on data updates                                 ││  │
│  │  └──────────────────────────────────────────────────────────────────┘│  │
│  └─────────────────────────────────────────────────────────────────────┘  │
│                                    │                                        │
│  ┌─────────────────────────────────────────────────────────────────────┐  │
│  │  KAFKA EVENT BUS                                                    │  │
│  │  ┌──────────────────────────────────────────────────────────────────┐│  │
│  │  │  • Event-driven architecture for async processing               ││  │
│  │  │  • Producers: Semantic Engine, Quality Engine, Excel Add-in    ││  │
│  │  │  • Consumers: Alert Engine, Audit Engine, Lineage Engine       ││  │
│  │  │  • Topics: metric.events, quality.alerts, pipeline.status      ││  │
│  │  └──────────────────────────────────────────────────────────────────┘│  │
│  └─────────────────────────────────────────────────────────────────────┘  │
│                                    │                                        │
│  ┌─────────────────────────────────────────────────────────────────────┐  │
│  │  KUBERNETES + HELM                                                  │  │
│  │  ┌──────────────────────────────────────────────────────────────────┐│  │
│  │  │  • Cloud-native microservices architecture                      ││  │
│  │  │  • Helm charts for easy deployment & upgrades                   ││  │
│  │  │  • Zero-downtime rolling updates                                ││  │
│  │  │  • Multi-region deployment support                              ││  │
│  │  └──────────────────────────────────────────────────────────────────┘│  │
│  └─────────────────────────────────────────────────────────────────────┘  │
│                                    │                                        │
│  ┌─────────────────────────────────────────────────────────────────────┐  │
│  │  AUTO-SCALING HPA (Horizontal Pod Autoscaler)                      │  │
│  │  ┌──────────────────────────────────────────────────────────────────┐│  │
│  │  │  • Scale based on CPU (70% threshold)                           ││  │
│  │  │  • Scale based on Memory (80% threshold)                        ││  │
│  │  │  • Scale based on Request Rate (1000 req/sec)                   ││  │
│  │  │  • 1-20 replicas based on load                                  ││  │
│  │  │  • Scale to zero during idle (cost optimization)                ││  │
│  │  └──────────────────────────────────────────────────────────────────┘│  │
│  └─────────────────────────────────────────────────────────────────────┘  │
│                                    │                                        │
│  ┌─────────────────────────────────────────────────────────────────────┐  │
│  │  DATA PARTITIONING (1B+ Rows)                                      │  │
│  │  ┌──────────────────────────────────────────────────────────────────┐│  │
│  │  │  • Time-based partitioning (daily/monthly)                      ││  │
│  │  │  • Region-based partitioning (multi-region)                     ││  │
│  │  │  • Hash-based partitioning (for large fact tables)              ││  │
│  │  │  • Query performance: < 5 seconds for 1B+ rows                  ││  │
│  │  └──────────────────────────────────────────────────────────────────┘│  │
│  └─────────────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────────────┘`}
              dataFlow={`Query → Redis Cache (hit) → Sub-second response
Query → Redis Cache (miss) → Snowflake → Cache → Response
Event → Kafka → Multiple Consumers → Parallel Processing
Load → HPA → Auto-Scale → New Pods → Load Balancer
Partition → Query Router → Relevant Partition → Faster Query`}
            />

            <div style={{ marginTop: '24px', background: 'rgba(15, 23, 42, 0.4)', padding: '24px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
              <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#E2E8F0', marginBottom: '16px' }}>Infrastructure &amp; Scale Breakdown</h3>
              <div style={{ overflowX: 'auto', marginBottom: '24px' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px', color: '#94A3B8' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                      <th style={{ padding: '12px 8px', color: '#38BDF8', fontWeight: '600' }}>Component</th>
                      <th style={{ padding: '12px 8px', color: '#38BDF8', fontWeight: '600' }}>Status</th>
                      <th style={{ padding: '12px 8px', color: '#38BDF8', fontWeight: '600' }}>Tech Stack</th>
                      <th style={{ padding: '12px 8px', color: '#38BDF8', fontWeight: '600' }}>Target SLA</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                      <td style={{ padding: '12px 8px', fontWeight: '600', color: '#E2E8F0' }}>Redis Semantic Cache</td>
                      <td style={{ padding: '12px 8px', color: '#F59E0B' }}>In Progress</td>
                      <td style={{ padding: '12px 8px' }}>Redis, Python</td>
                      <td style={{ padding: '12px 8px' }}>&lt; 50ms cached, 80% hit rate</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                      <td style={{ padding: '12px 8px', fontWeight: '600', color: '#E2E8F0' }}>Kafka Event Bus</td>
                      <td style={{ padding: '12px 8px', color: '#F59E0B' }}>In Progress</td>
                      <td style={{ padding: '12px 8px' }}>Apache Kafka, aiokafka</td>
                      <td style={{ padding: '12px 8px' }}>Async decoupled processing</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                      <td style={{ padding: '12px 8px', fontWeight: '600', color: '#E2E8F0' }}>Kubernetes + Helm</td>
                      <td style={{ padding: '12px 8px', color: '#3B82F6' }}>Planned</td>
                      <td style={{ padding: '12px 8px' }}>K8s, Helm, Docker</td>
                      <td style={{ padding: '12px 8px' }}>Zero-downtime rolling deploys</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                      <td style={{ padding: '12px 8px', fontWeight: '600', color: '#E2E8F0' }}>Auto-Scaling HPA</td>
                      <td style={{ padding: '12px 8px', color: '#3B82F6' }}>Planned</td>
                      <td style={{ padding: '12px 8px' }}>K8s HPA, Prometheus</td>
                      <td style={{ padding: '12px 8px' }}>1–20 replicas, CPU &lt; 70%</td>
                    </tr>
                    <tr>
                      <td style={{ padding: '12px 8px', fontWeight: '600', color: '#E2E8F0' }}>Data Partitioning (1B+ rows)</td>
                      <td style={{ padding: '12px 8px', color: '#3B82F6' }}>Planned</td>
                      <td style={{ padding: '12px 8px' }}>TimescaleDB, Snowflake</td>
                      <td style={{ padding: '12px 8px' }}>&lt; 5 sec on 1B+ rows</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                <div style={{ background: 'rgba(0,0,0,0.2)', padding: '16px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)', textAlign: 'center' }}>
                  <div style={{ color: '#38BDF8', fontWeight: '700', fontSize: '22px', marginBottom: '4px' }}>50ms</div>
                  <div style={{ color: '#94A3B8', fontSize: '13px' }}>Redis Cache Response</div>
                </div>
                <div style={{ background: 'rgba(0,0,0,0.2)', padding: '16px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)', textAlign: 'center' }}>
                  <div style={{ color: '#38BDF8', fontWeight: '700', fontSize: '22px', marginBottom: '4px' }}>80%+</div>
                  <div style={{ color: '#94A3B8', fontSize: '13px' }}>Cache Hit Rate</div>
                </div>
                <div style={{ background: 'rgba(0,0,0,0.2)', padding: '16px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)', textAlign: 'center' }}>
                  <div style={{ color: '#38BDF8', fontWeight: '700', fontSize: '22px', marginBottom: '4px' }}>1B+</div>
                  <div style={{ color: '#94A3B8', fontSize: '13px' }}>Rows Supported</div>
                </div>
                <div style={{ background: 'rgba(0,0,0,0.2)', padding: '16px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)', textAlign: 'center' }}>
                  <div style={{ color: '#38BDF8', fontWeight: '700', fontSize: '22px', marginBottom: '4px' }}>20x</div>
                  <div style={{ color: '#94A3B8', fontSize: '13px' }}>Auto-Scale Replicas</div>
                </div>
              </div>
            </div>
          </section>

          {/* Category 9 */}
          <section id="category-9" className="scroll-reveal fade-up" style={{ scrollMarginTop: '100px', marginBottom: '80px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(245, 158, 11, 0.1)', border: '1px solid rgba(245, 158, 11, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px' }}>
                🔌
              </div>
              <h2 style={{ fontSize: '32px', fontWeight: '700', letterSpacing: '-0.02em', margin: 0 }}>Category 9: Ecosystem & APIs</h2>
            </div>
            <p style={{ color: '#94A3B8', fontSize: '18px', marginBottom: '32px' }}>Open & Extensible — Integrate Into Any Workflow</p>
            <CodeBlock 
              title="ecosystem_apis_hld.txt"
              code={`┌─────────────────────────────────────────────────────────────────────────────┐
│                    ECOSYSTEM & APIS LAYER                                   │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐  │
│  │  OPEN REST API V3                                                   │  │
│  │  ┌──────────────────────────────────────────────────────────────────┐│  │
│  │  │  • Full public API with 50+ endpoints                           ││  │
│  │  │  • Authentication: API Keys + JWT                               ││  │
│  │  │  • Rate Limiting: 1000 req/min per API key                      ││  │
│  │  │  • Documentation: Swagger UI (/docs) + ReDoc (/redoc)           ││  │
│  │  │  • Versioned: /api/v1/, /api/v2/, /api/v3/                      ││  │
│  │  └──────────────────────────────────────────────────────────────────┘│  │
│  └─────────────────────────────────────────────────────────────────────┘  │
│                                    │                                        │
│  ┌─────────────────────────────────────────────────────────────────────┐  │
│  │  WEBHOOKS                                                            │  │
│  │  ┌──────────────────────────────────────────────────────────────────┐│  │
│  │  │  • Real-time event notifications                                ││  │
│  │  │  • Events: metric.created, alert.sent, pipeline.completed       ││  │
│  │  │  • Custom endpoints per event type                              ││  │
│  │  │  • Retry on failure (3 attempts, exponential backoff)           ││  │
│  │  │  • Delivery status tracking                                     ││  │
│  │  └──────────────────────────────────────────────────────────────────┘│  │
│  └─────────────────────────────────────────────────────────────────────┘  │
│                                    │                                        │
│  ┌─────────────────────────────────────────────────────────────────────┐  │
│  │  PLUGIN SYSTEM                                                       │  │
│  │  ┌──────────────────────────────────────────────────────────────────┐│  │
│  │  │  • Custom connectors for new data sources                       ││  │
│  │  │  • Custom rules for validation                                  ││  │
│  │  │  • Custom alerts for business logic                             ││  │
│  │  │  • Plugin Marketplace for community plugins                     ││  │
│  │  │  • Plugin versioning & compatibility                            ││  │
│  │  └──────────────────────────────────────────────────────────────────┘│  │
│  └─────────────────────────────────────────────────────────────────────┘  │
│                                    │                                        │
│  ┌─────────────────────────────────────────────────────────────────────┐  │
│  │  PYTHON / JS / JAVA SDKs                                            │  │
│  │  ┌──────────────────────────────────────────────────────────────────┐│  │
│  │  │  • Python: pip install datatrust                                 ││  │
│  │  │  • JavaScript: npm install datatrust                            ││  │
│  │  │  • Java: mvn datatrust                                          ││  │
│  │  │  • Type-safe client generation from OpenAPI spec                ││  │
│  │  │  • Full API coverage + examples                                 ││  │
│  │  └──────────────────────────────────────────────────────────────────┘│  │
│  └─────────────────────────────────────────────────────────────────────┘  │
│                                    │                                        │
│  ┌─────────────────────────────────────────────────────────────────────┐  │
│  │  GITHUB ACTIONS / GITLAB CI                                         │  │
│  │  ┌──────────────────────────────────────────────────────────────────┐│  │
│  │  │  • GitHub Action: datatrust-deploy                              ││  │
│  │  │  • GitLab CI: datatrust-sync                                    ││  │
│  │  │  • Automated semantic model deployment from CI/CD               ││  │
│  │  │  • Pipeline triggers on metric changes                          ││  │
│  │  │  • Rollback via git revert                                      ││  │
│  │  └──────────────────────────────────────────────────────────────────┘│  │
│  └─────────────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────────────┘`}
              dataFlow={`External App → REST API → DataTrust Engine → Response
Event → Webhook → External Endpoint → Action
Custom Plugin → Plugin System → New Feature → Marketplace
CI/CD Pipeline → GitHub Action → Deploy Semantic Model → Live
SDK → API Client → DataTrust → Type-Safe Responses`}
            />

            <div style={{ marginTop: '24px', background: 'rgba(15, 23, 42, 0.4)', padding: '24px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
              <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#E2E8F0', marginBottom: '16px' }}>API &amp; Ecosystem Breakdown</h3>
              <div style={{ overflowX: 'auto', marginBottom: '24px' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px', color: '#94A3B8' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                      <th style={{ padding: '12px 8px', color: '#F59E0B', fontWeight: '600' }}>Integration</th>
                      <th style={{ padding: '12px 8px', color: '#F59E0B', fontWeight: '600' }}>Status</th>
                      <th style={{ padding: '12px 8px', color: '#F59E0B', fontWeight: '600' }}>Tech Stack</th>
                      <th style={{ padding: '12px 8px', color: '#F59E0B', fontWeight: '600' }}>Key Detail</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                      <td style={{ padding: '12px 8px', fontWeight: '600', color: '#E2E8F0' }}>Open REST API V3</td>
                      <td style={{ padding: '12px 8px', color: '#10B981' }}>✅ Complete</td>
                      <td style={{ padding: '12px 8px' }}>FastAPI, Swagger UI</td>
                      <td style={{ padding: '12px 8px' }}>50+ endpoints, versioned</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                      <td style={{ padding: '12px 8px', fontWeight: '600', color: '#E2E8F0' }}>Webhooks</td>
                      <td style={{ padding: '12px 8px', color: '#F59E0B' }}>In Progress</td>
                      <td style={{ padding: '12px 8px' }}>FastAPI, Celery</td>
                      <td style={{ padding: '12px 8px' }}>Real-time event notifications</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                      <td style={{ padding: '12px 8px', fontWeight: '600', color: '#E2E8F0' }}>Plugin System</td>
                      <td style={{ padding: '12px 8px', color: '#3B82F6' }}>Planned</td>
                      <td style={{ padding: '12px 8px' }}>Python Plugin API</td>
                      <td style={{ padding: '12px 8px' }}>Custom connectors &amp; rules</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                      <td style={{ padding: '12px 8px', fontWeight: '600', color: '#E2E8F0' }}>Python / JS / Java SDKs</td>
                      <td style={{ padding: '12px 8px', color: '#3B82F6' }}>Planned</td>
                      <td style={{ padding: '12px 8px' }}>OpenAPI codegen</td>
                      <td style={{ padding: '12px 8px' }}>pip / npm / mvn packages</td>
                    </tr>
                    <tr>
                      <td style={{ padding: '12px 8px', fontWeight: '600', color: '#E2E8F0' }}>GitHub Actions / GitLab CI</td>
                      <td style={{ padding: '12px 8px', color: '#3B82F6' }}>Planned</td>
                      <td style={{ padding: '12px 8px' }}>YAML, GitHub Actions</td>
                      <td style={{ padding: '12px 8px' }}>CI/CD semantic model deploy</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
                <div style={{ background: 'rgba(0,0,0,0.2)', padding: '16px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <div style={{ color: '#F59E0B', fontWeight: '600', fontSize: '14px', marginBottom: '4px' }}>Auth Methods</div>
                  <div style={{ fontSize: '13px', color: '#94A3B8' }}>API Keys + JWT Bearer tokens with per-key rate limiting (1000 req/min)</div>
                </div>
                <div style={{ background: 'rgba(0,0,0,0.2)', padding: '16px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <div style={{ color: '#F59E0B', fontWeight: '600', fontSize: '14px', marginBottom: '4px' }}>API Versioning</div>
                  <div style={{ fontSize: '13px', color: '#94A3B8' }}>/api/v1/, /api/v2/, /api/v3/ — backward-compatible with deprecation warnings</div>
                </div>
                <div style={{ background: 'rgba(0,0,0,0.2)', padding: '16px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <div style={{ color: '#F59E0B', fontWeight: '600', fontSize: '14px', marginBottom: '4px' }}>Webhook Retry</div>
                  <div style={{ fontSize: '13px', color: '#94A3B8' }}>3 retries with exponential backoff — delivery status visible in dashboard</div>
                </div>
              </div>
            </div>
          </section>

          {/* Category 10 */}
          <section id="category-10" className="scroll-reveal fade-up" style={{ scrollMarginTop: '100px', marginBottom: '80px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(236, 72, 153, 0.1)', border: '1px solid rgba(236, 72, 153, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px' }}>
                ⚙️
              </div>
              <h2 style={{ fontSize: '32px', fontWeight: '700', letterSpacing: '-0.02em', margin: 0 }}>Category 10: Pipeline Engine</h2>
            </div>
            <p style={{ color: '#94A3B8', fontSize: '18px', marginBottom: '32px' }}>10-Stage Execution — Architecture & Algorithms</p>
            <CodeBlock 
              title="pipeline_engine_hld.txt"
              code={`┌─────────────────────────────────────────────────────────────────────────────┐
│                    PIPELINE EXECUTION ENGINE                               │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│                     [ CLIENT / EXCEL ADD-IN ]                               │
│                                │                                            │
│                                ▼                                            │
│                       ( FastAPI Gateway )                                   │
│                                │                                            │
│   ┌────────────────────────────┴────────────────────────────┐               │
│   ▼                                                         ▼               │
│[ 1. CONNECT & 2. EXTRACT ]                      [ 3. PARSE DAX & 4. CLASSIFY ]
│   │                                                         │               │
│   ├─► Decrypts Host/Warehouse Credentials                   ├─► Tokenizes DAX Formulas
│   ├─► Snowflake TLS Handshake Session                       └─► FACT vs DIMENSION labeling
│   │                                                         │               │
│   ▼                                                         ▼               │
│[ 5. RULE CONVERT & 8. VALIDATE ]                [ 6. LLM CONVERT & 7. TRANSLATE ]
│   │                                                         │               │
│   ├─► Infer Constraints (Mean ± 3*Std)                      ├─► LangChain LLM Translation
│   ├─► Row-level Rules Verification                          └─► Transpile to Snowflake SQL Dialect
│   │                                                         │               │
│   └────────────────────────────┬────────────────────────────┘               │
│                                │                                            │
│                                ▼                                            │
│                        [ 9. GOVERNANCE ]                                    │
│                                │                                            │
│                                ▼                                            │
│                         [ 10. EMISSION ]                                    │
│                                │                                            │
│                                ▼                                            │
│                     [ EXCEL GRID AUTO-SYNC ]                                │
└─────────────────────────────────────────────────────────────────────────────┘`}
              dataFlow={`Trigger → Connect & Extract → Semantic Parse → ML Inference & LLM Translate → Validation → Governance Review → Emit Report`}
            />
            
            <div style={{ marginTop: '40px', background: 'rgba(30, 41, 59, 0.5)', padding: '32px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
              <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#E2E8F0', marginBottom: '24px' }}>Stage-by-Stage Algorithms & Tech Breakdown</h3>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
                <div style={{ background: 'rgba(15, 23, 42, 0.6)', padding: '20px', borderRadius: '12px', borderLeft: '3px solid #3B82F6' }}>
                  <h4 style={{ color: '#60A5FA', fontSize: '15px', marginBottom: '8px' }}>1-2: Connect & Extract</h4>
                  <p style={{ color: '#94A3B8', fontSize: '13px', lineHeight: '1.6' }}><strong>AES-GCM-256 Decryption:</strong> Directly pulls connection specs from metadata DB and decrypts passwords securely.<br/><strong>Information Schema Scanning & Pagination:</strong> Dynamic LIMIT injections to control warehouse load.</p>
                </div>
                
                <div style={{ background: 'rgba(15, 23, 42, 0.6)', padding: '20px', borderRadius: '12px', borderLeft: '3px solid #8B5CF6' }}>
                  <h4 style={{ color: '#A78BFA', fontSize: '15px', marginBottom: '8px' }}>3-4: Semantic Parse & Classify</h4>
                  <p style={{ color: '#94A3B8', fontSize: '13px', lineHeight: '1.6' }}><strong>Regex Lexer & AST Generation:</strong> Parses DAX into trees.<br/><strong>Heuristic Classification:</strong> Infers FACT vs DIMENSION using primary key ratios and entropy algorithms.</p>
                </div>

                <div style={{ background: 'rgba(15, 23, 42, 0.6)', padding: '20px', borderRadius: '12px', borderLeft: '3px solid #F59E0B' }}>
                  <h4 style={{ color: '#FCD34D', fontSize: '15px', marginBottom: '8px' }}>5: Rule Inference Engine</h4>
                  <p style={{ color: '#94A3B8', fontSize: '13px', lineHeight: '1.6' }}><strong>Statistical Outlier Detection:</strong> Uses Mean ± 3*Std to construct normal distribution bounds dynamically. Calculates uniqueness coefficient to assume PK constraints.</p>
                </div>

                <div style={{ background: 'rgba(15, 23, 42, 0.6)', padding: '20px', borderRadius: '12px', borderLeft: '3px solid #10B981' }}>
                  <h4 style={{ color: '#34D399', fontSize: '15px', marginBottom: '8px' }}>6-7: LLM & Dialect Translation</h4>
                  <p style={{ color: '#94A3B8', fontSize: '13px', lineHeight: '1.6' }}><strong>Few-Shot Translation Chain:</strong> Invokes LLMs. Uses Cosine Similarity matching for confidence grading. <strong>SQL Syntax Generator:</strong> Transpiles AST into dialect-safe SQL.</p>
                </div>

                <div style={{ background: 'rgba(15, 23, 42, 0.6)', padding: '20px', borderRadius: '12px', borderLeft: '3px solid #EF4444' }}>
                  <h4 style={{ color: '#F87171', fontSize: '15px', marginBottom: '8px' }}>8-9: Validate & Review</h4>
                  <p style={{ color: '#94A3B8', fontSize: '13px', lineHeight: '1.6' }}><strong>Boolean Evaluation Engine:</strong> Runs Pandas dynamic indexing for fast anomaly isolation.<br/><strong>Hierarchical Role Verification:</strong> Evaluates RBAC policies for automated sign-offs.</p>
                </div>

                <div style={{ background: 'rgba(15, 23, 42, 0.6)', padding: '20px', borderRadius: '12px', borderLeft: '3px solid #EC4899' }}>
                  <h4 style={{ color: '#F472B6', fontSize: '15px', marginBottom: '8px' }}>10: Structured Emit</h4>
                  <p style={{ color: '#94A3B8', fontSize: '13px', lineHeight: '1.6' }}><strong>Office XML Formatting:</strong> Manipulates memory grids via Pandas and OpenPyXL to serialize final multi-sheet reports and publish to Redis/Storage.</p>
                </div>
              </div>

              {/* Execution Output Interfaces */}
              <div style={{ marginTop: '40px', paddingTop: '32px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#E2E8F0', marginBottom: '24px' }}>Execution Output Interfaces</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  
                  <div style={{ background: 'rgba(15, 23, 42, 0.4)', padding: '20px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                      <span style={{ fontSize: '20px' }}>📊</span>
                      <h4 style={{ color: '#E2E8F0', fontSize: '16px', margin: 0 }}>1. Excel Add-in Simulator Page (Live Data Sheets)</h4>
                    </div>
                    <ul style={{ color: '#94A3B8', fontSize: '14px', lineHeight: '1.6', margin: 0, paddingLeft: '24px', listStyleType: 'disc' }}>
                      <li><strong>Location:</strong> <code style={{ background: 'rgba(0,0,0,0.3)', padding: '2px 6px', borderRadius: '4px', color: '#38BDF8', fontFamily: '"Fira Code", monospace' }}>http://localhost:3000/excel</code></li>
                      <li><strong>Connect Tab:</strong> Refreshed Snowflake query data rows populate directly into worksheet grid cells.</li>
                      <li><strong>Formulas Tab:</strong> Scanner dynamically highlights corrections (green background & cell tags).</li>
                      <li><strong>NLQ Sync Tab:</strong> Question input dynamically loads compiled SQL text and results into the spreadsheet.</li>
                      <li><strong>Dashboard Tab:</strong> KPI cards and interactive charts update visually.</li>
                    </ul>
                  </div>

                  <div style={{ background: 'rgba(15, 23, 42, 0.4)', padding: '20px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                      <span style={{ fontSize: '20px' }}>🛡️</span>
                      <h4 style={{ color: '#E2E8F0', fontSize: '16px', margin: 0 }}>2. Pipeline Run Logs & Stages Console</h4>
                    </div>
                    <ul style={{ color: '#94A3B8', fontSize: '14px', lineHeight: '1.6', margin: 0, paddingLeft: '24px', listStyleType: 'disc' }}>
                      <li><strong>Location:</strong> <code style={{ background: 'rgba(0,0,0,0.3)', padding: '2px 6px', borderRadius: '4px', color: '#38BDF8', fontFamily: '"Fira Code", monospace' }}>http://localhost:3000/console/pipelines</code></li>
                      <li><strong>View:</strong> The 10-stage process loads in a real-time modal popup console with standard green checkboxes and detailed runtime terminal indicators.</li>
                    </ul>
                  </div>

                  <div style={{ background: 'rgba(15, 23, 42, 0.4)', padding: '20px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                      <span style={{ fontSize: '20px' }}>📂</span>
                      <h4 style={{ color: '#E2E8F0', fontSize: '16px', margin: 0 }}>3. Backend REST API Interactive Docs</h4>
                    </div>
                    <ul style={{ color: '#94A3B8', fontSize: '14px', lineHeight: '1.6', margin: 0, paddingLeft: '24px', listStyleType: 'disc' }}>
                      <li><strong>Location:</strong> <code style={{ background: 'rgba(0,0,0,0.3)', padding: '2px 6px', borderRadius: '4px', color: '#38BDF8', fontFamily: '"Fira Code", monospace' }}>http://localhost:8000/docs</code> (FastAPI Swagger UI)</li>
                      <li><strong>Testing:</strong> Target APIs (<code style={{ background: 'rgba(0,0,0,0.3)', padding: '2px 4px', borderRadius: '4px', color: '#A78BFA', fontSize: '12px' }}>correct_formulas</code>, <code style={{ background: 'rgba(0,0,0,0.3)', padding: '2px 4px', borderRadius: '4px', color: '#A78BFA', fontSize: '12px' }}>refresh</code>, <code style={{ background: 'rgba(0,0,0,0.3)', padding: '2px 4px', borderRadius: '4px', color: '#A78BFA', fontSize: '12px' }}>nl_query</code>) can be passed parameters to directly check raw database returns.</li>
                    </ul>
                  </div>

                </div>
              </div>

            </div>
          </section>

        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .scroll-reveal {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.6s ease-out, transform 0.6s ease-out;
        }
        .scroll-reveal.visible {
          opacity: 1;
          transform: translateY(0);
        }
      `}} />
    </div>
  </>);
};

export default ArchitectureHLD;
