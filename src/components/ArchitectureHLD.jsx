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
    { id: 'category-8', label: '8. Performance & Scale' },
    { id: 'category-9', label: '9. Ecosystem & APIs' },
    { id: 'category-10', label: '10. Pipeline Engine' },
  ];

  return (
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
        <div style={{ width: '280px', flexShrink: 0, position: 'relative' }}>
          <div style={{ position: 'sticky', top: '100px', background: 'rgba(255,255,255,0.02)', padding: '24px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
            <h3 style={{ fontSize: '14px', textTransform: 'uppercase', letterSpacing: '1px', color: '#94A3B8', marginBottom: '20px', fontWeight: '700' }}>Architecture Layers</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {navItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => scrollToSection(item.id)}
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
              code={`┌─────────────────────────────────────────────────────────────────────────────┐
│                    AI & AUTOMATION LAYER                                   │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐  │
│  │  AI RULE INFERENCE V2                                                │  │
│  │  ┌──────────────────────────────────────────────────────────────────┐│  │
│  │  │  INPUT: Historical Data (12+ months)                            ││  │
│  │  │  PROCESS: Statistical Analysis + ML Models                      ││  │
│  │  │  OUTPUT: Inferred Rules with Confidence Scores                  ││  │
│  │  │  USER: Review & Accept/Reject/Modify                            ││  │
│  │  └──────────────────────────────────────────────────────────────────┘│  │
│  └─────────────────────────────────────────────────────────────────────┘  │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐  │
│  │  PREDICTIVE QUALITY ENGINE                                           │  │
│  │  ┌──────────────────────────────────────────────────────────────────┐│  │
│  │  │  INPUT: Historical Data + Real-time Streams                     ││  │
│  │  │  PROCESS: Prophet + XGBoost + Isolation Forest                  ││  │
│  │  │  OUTPUT: Prediction + Risk Score + Alert 24hrs Before          ││  │
│  │  │  USER: Receives Alert with Recommended Action                   ││  │
│  │  └──────────────────────────────────────────────────────────────────┘│  │
│  └─────────────────────────────────────────────────────────────────────┘  │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐  │
│  │  AUTO-CORRECTION V2                                                  │  │
│  │  ┌──────────────────────────────────────────────────────────────────┐│  │
│  │  │  INPUT: Data Quality Issue                                       ││  │
│  │  │  PROCESS: Root Cause Analysis → Fix Strategy → Apply Fix        ││  │
│  │  │  OUTPUT: Corrected Data + Audit Trail + Rollback Option         ││  │
│  │  │  USER: Notification only — zero-touch                          ││  │
│  │  └──────────────────────────────────────────────────────────────────┘│  │
│  └─────────────────────────────────────────────────────────────────────┘  │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐  │
│  │  AUTO-DOCUMENTATION                                                  │  │
│  │  ┌──────────────────────────────────────────────────────────────────┐│  │
│  │  │  INPUT: Metric Metadata                                          ││  │
│  │  │  PROCESS: LLM Summarization (LangChain + Groq)                  ││  │
│  │  │  OUTPUT: Business-friendly Documentation                        ││  │
│  │  │  USER: Read-only, always up-to-date                              ││  │
│  │  └──────────────────────────────────────────────────────────────────┘│  │
│  └─────────────────────────────────────────────────────────────────────┘  │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐  │
│  │  AI RECOMMENDATIONS                                                  │  │
│  │  ┌──────────────────────────────────────────────────────────────────┐│  │
│  │  │  INPUT: User Behavior + Data Patterns                           ││  │
│  │  │  PROCESS: Collaborative Filtering + Pattern Matching            ││  │
│  │  │  OUTPUT: "You might want to create this metric..."              ││  │
│  │  │  USER: Suggestion-based guidance                                 ││  │
│  │  └──────────────────────────────────────────────────────────────────┘│  │
│  └─────────────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────────────┘`}
              dataFlow={`Historical Data → AI Rule Inference → Rules Created
Historical Data → Predictive Quality → 24hr Alert
Issue Detected → Auto-Correction → Zero-Touch Fix
Metric Created → Auto-Documentation → Docs Generated
User Behavior → AI Recommendations → Suggestions`}
            />
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
              code={`┌─────────────────────────────────────────────────────────────────────────────┐
│                    NATURAL LANGUAGE QUERY LAYER                            │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐  │
│  │  NLQ → SQL ENGINE                                                    │  │
│  │  ┌──────────────────────────────────────────────────────────────────┐│  │
│  │  │  INPUT: "What was Q4 Revenue for West region?"                  ││  │
│  │  │  STEP 1: Embedding (OpenAI text-embedding-3-small)              ││  │
│  │  │  STEP 2: Semantic Search (pgvector) → 95% match                ││  │
│  │  │  STEP 3: LLM Translation (LangChain + Groq) → SQL              ││  │
│  │  │  STEP 4: Quality Engine Validation → ✅ Pass                   ││  │
│  │  │  STEP 5: Execute on Snowflake → Result in 2 seconds            ││  │
│  │  │  OUTPUT: ₹85.4 Cr + Lineage Attached                           ││  │
│  │  └──────────────────────────────────────────────────────────────────┘│  │
│  └─────────────────────────────────────────────────────────────────────┘  │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐  │
│  │  pgvector SEMANTIC SEARCH                                            │  │
│  │  ┌──────────────────────────────────────────────────────────────────┐│  │
│  │  │  INPUT: User Question "customer churn"                          ││  │
│  │  │  PROCESS: Vector Similarity Search                              ││  │
│  │  │  OUTPUT: Churn Rate (95%), Retention (88%), MAU (72%)           ││  │
│  │  │  USER: Finds metrics by meaning, not just keywords              ││  │
│  │  └──────────────────────────────────────────────────────────────────┘│  │
│  └─────────────────────────────────────────────────────────────────────┘  │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐  │
│  │  RAG-POWERED ACCURACY                                                │  │
│  │  ┌──────────────────────────────────────────────────────────────────┐│  │
│  │  │  INPUT: User Question + Relevant Metrics                        ││  │
│  │  │  PROCESS: Retrieval-Augmented Generation                       ││  │
│  │  │  OUTPUT: Accurate SQL with 90%+ Accuracy                        ││  │
│  │  │  USER: Gets correct answer every time                           ││  │
│  │  └──────────────────────────────────────────────────────────────────┘│  │
│  └─────────────────────────────────────────────────────────────────────┘  │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐  │
│  │  NLQ IN EXCEL RIBBON                                                 │  │
│  │  ┌──────────────────────────────────────────────────────────────────┐│  │
│  │  │  INPUT: User types question directly in Excel                   ││  │
│  │  │  PROCESS: Same NLQ Engine + Excel Write-back                   ││  │
│  │  │  OUTPUT: Data loads directly into Excel sheet                   ││  │
│  │  │  USER: No need to leave Excel                                   ││  │
│  │  └──────────────────────────────────────────────────────────────────┘│  │
│  └─────────────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────────────┘`}
              dataFlow={`User Question → Embedding → Semantic Search → LLM → SQL → Validate → Execute → Excel`}
            />
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
              code={`┌─────────────────────────────────────────────────────────────────────────────┐
│                    MULTI-CLOUD CONNECTIVITY LAYER                          │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐  │
│  │  CONNECTOR LAYER                                                     │  │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐              │  │
│  │  │  Snowflake   │  │  Databricks  │  │  Fabric      │              │  │
│  │  │  Connector   │  │  Connector   │  │  Connector   │              │  │
│  │  └──────────────┘  └──────────────┘  └──────────────┘              │  │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐              │  │
│  │  │  Redshift    │  │  BigQuery    │  │  Azure SQL   │              │  │
│  │  │  Connector   │  │  Connector   │  │  Connector   │              │  │
│  │  └──────────────┘  └──────────────┘  └──────────────┘              │  │
│  │  ┌──────────────┐  ┌──────────────┐                                 │  │
│  │  │  dbt         │  │  Looker/     │                                 │  │
│  │  │  Connector   │  │  Tableau     │                                 │  │
│  │  └──────────────┘  └──────────────┘                                 │  │
│  └─────────────────────────────────────────────────────────────────────┘  │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐  │
│  │  UNIFIED SEMANTIC LAYER                                              │  │
│  │  • One definition for every metric across ALL clouds                 │  │
│  │  • Revenue = SUM(net_sales) WHERE status='Completed'                │  │
│  │  • Same number, regardless of source                                 │  │
│  └─────────────────────────────────────────────────────────────────────┘  │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐  │
│  │  QUERY ROUTER                                                       │  │
│  │  • Determines which cloud to query                                   │  │
│  │  • Optimizes for performance                                         │  │
│  │  • Handles cross-cloud joins                                         │  │
│  └─────────────────────────────────────────────────────────────────────┘  │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐  │
│  │  UNIFIED VIEW                                                       │  │
│  │  • User sees ONE dashboard                                           │  │
│  │  • Source doesn't matter                                             │  │
│  │  • Data from ALL clouds combined                                     │  │
│  └─────────────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────────────┘`}
              dataFlow={`Cloud A → Connector A → Semantic Layer → Query Router → Unified View
Cloud B → Connector B → Semantic Layer → Query Router → Unified View
User sees: ONE dashboard, ALL data, ANY cloud`}
            />
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
  );
};

export default ArchitectureHLD;
