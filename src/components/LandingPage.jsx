import React, { useState, useEffect } from 'react';
import { ArrowRight, RefreshCw } from './Icons';
import Footer from './Footer';
import logoImg from '../assets/DataTrust-Logo.png';

export default function LandingPage({ onEnterWorkspace, setView }) {
  const [activeCase, setActiveCase] = useState('reporting');

  // Scroll Animation Hook
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.15 });

    document.querySelectorAll('.flow-animate, .scroll-reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="landing-layout">
      {/* NAVIGATION */}
      <nav className="marketing-nav">
        <div className="logo" onClick={() => window.scrollTo(0, 0)} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
          <img src={logoImg} alt="DataTrust Logo" style={{ height: '64px' }} />
        </div>
        <ul>
          <li><a href="#problems">Problems</a></li>
          <li><a href="#how">How It Works</a></li>
          <li><a href="#features">Features</a></li>
          <li><a href="#usecases">Use Cases</a></li>
          <li><a href="#roi">ROI Calculator</a></li>
          <li><a href="#pricing">Pricing</a></li>
          <li>
            <button onClick={onEnterWorkspace} className="nav-cta border-none cursor-pointer">
              Launch Limited UI Demo
            </button>
          </li>
        </ul>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero-badge scroll-reveal fade-up">
          <span className="dot-pulse"></span>
          Enterprise Data Governance Platform
        </div>
        <h1 className="scroll-reveal fade-up delay-100">Stop debating numbers.<br />Start <span>trusting</span> them.</h1>
        <p className="scroll-reveal fade-up delay-200">DataTrust connects Snowflake directly to Excel with live, validated data and proactive quality alerts—so every decision is backed by numbers everyone agrees on.</p>
        <div className="hero-actions scroll-reveal fade-up delay-300">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <button onClick={onEnterWorkspace} className="btn-primary" style={{ alignSelf: 'flex-start' }}>
              Launch Limited UI Demo <ArrowRight size={18} />
            </button>
            <p style={{ fontSize: '13px', color: '#64748B', maxWidth: '400px' }}>
              Note: This is a limited UI demo to protect our IP. For a full product demo, please email us directly at <a href="mailto:datatrust.ai@zohomail.in" style={{ color: '#00BFA5' }}>datatrust.ai@zohomail.in</a>.
            </p>
          </div>
          <a href="#usecases" className="btn-outline" style={{ alignSelf: 'flex-start' }}>
            See Before & After Cases
          </a>
        </div>
        <div className="hero-stats scroll-reveal fade-up delay-400">
          <div className="stat-item">
            <div className="stat-num">₹15 Cr</div>
            <div className="stat-label">avg. annual savings per enterprise</div>
          </div>
          <div className="stat-item">
            <div className="stat-num">70%</div>
            <div className="stat-label">reduction in manual Excel work</div>
          </div>
          <div className="stat-item">
            <div className="stat-num">10 min</div>
            <div className="stat-label">monthly reporting (was 8 hours)</div>
          </div>
          <div className="stat-item">
            <div className="stat-num">31x</div>
            <div className="stat-label">maximum ROI</div>
          </div>
        </div>
      </section>

      {/* INTEGRATIONS STRIP — Right after Hero */}
      <div className="scroll-reveal fade-up" style={{ backgroundColor: 'var(--navy-mid)', borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)', padding: '20px 5%' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '24px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <span style={{ color: 'var(--gray)', fontSize: '13px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.08em', whiteSpace: 'nowrap' }}>🔗 Works with your stack:</span>
          {['Snowflake', 'Databricks', 'Microsoft Fabric', 'Power BI', 'Tableau', 'Qlik', 'Excel'].map((tool, idx) => (
            <span key={tool} className={`scroll-reveal scale-in delay-${(idx + 1) * 100}`} style={{ fontSize: '13px', fontWeight: '600', color: 'var(--white)', background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)', padding: '6px 16px', borderRadius: '999px' }}>{tool}</span>
          ))}
        </div>
      </div>

      {/* EXECUTIVE SUMMARY */}
      <section className="executive-summary" style={{ padding: '80px 20px', backgroundColor: 'transparent', overflow: 'hidden' }}>

        <style>{`
          .pipeline-wrapper {
            position: relative;
            padding-left: 40px;
          }
          .pipeline-wrapper::before {
            content: '';
            position: absolute;
            left: 10px;
            top: 20px;
            bottom: 20px;
            width: 4px;
            background: linear-gradient(to bottom, #EF4444, #10B981, #3B82F6);
            border-radius: 4px;
            opacity: 0.2;
          }
          .flow-animate {
            opacity: 0;
            transform: translateY(40px);
            transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
            position: relative;
          }
          .flow-animate::before {
            content: '';
            position: absolute;
            left: -34px;
            top: 36px;
            width: 12px;
            height: 12px;
            border-radius: 50%;
            background: #f8fafc;
            border: 3px solid currentColor;
            z-index: 2;
            transition: all 0.4s ease;
          }
          .flow-animate.visible {
            opacity: 1;
            transform: translateY(0);
          }
          .flow-animate.visible::before {
            background: currentColor;
            box-shadow: 0 0 10px currentColor;
          }
          .flow-delay-1 { transition-delay: 0.1s; color: #EF4444; }
          .flow-delay-2 { transition-delay: 0.3s; color: #10B981; }
          .flow-delay-3 { transition-delay: 0.5s; color: #3B82F6; }

          /* General Scroll Reveal Animations */
          .scroll-reveal {
            opacity: 0;
            transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
            will-change: transform, opacity;
          }
          .scroll-reveal.fade-up {
            transform: translateY(30px);
          }
          .scroll-reveal.fade-down {
            transform: translateY(-30px);
          }
          .scroll-reveal.fade-left {
            transform: translateX(30px);
          }
          .scroll-reveal.fade-right {
            transform: translateX(-30px);
          }
          .scroll-reveal.scale-in {
            transform: scale(0.95);
          }
          .scroll-reveal.visible {
            opacity: 1;
            transform: translate(0) scale(1);
          }
          
          /* Staggered Delays */
          .delay-100 { transition-delay: 0.1s; }
          .delay-200 { transition-delay: 0.2s; }
          .delay-300 { transition-delay: 0.3s; }
          .delay-400 { transition-delay: 0.4s; }
          .delay-500 { transition-delay: 0.5s; }
          .delay-600 { transition-delay: 0.6s; }
          .delay-700 { transition-delay: 0.7s; }
          .delay-800 { transition-delay: 0.8s; }

          /* Case content fade-in when switching tabs */
          .case-content.active {
            animation: caseFadeIn 0.4s ease forwards;
          }
          @keyframes caseFadeIn {
            from { opacity: 0; transform: translateY(12px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}</style>

        <div className="section-label" style={{ textAlign: 'center', marginBottom: '40px' }}>Overview</div>
        <div className="pipeline-wrapper" style={{ maxWidth: '900px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '40px' }}>

          <div className="summary-block flow-animate flow-delay-1" style={{ backgroundColor: 'transparent', padding: '20px 0' }}>
            <h3 style={{ fontSize: '24px', color: '#1e293b', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '10px' }}>🔴 Problem Statement</h3>
            <p className="flow-content" style={{ color: '#475569', fontSize: '16px', lineHeight: '1.8', margin: 0 }}>
              Enterprises running multiple BI tools (Power BI, Tableau, Qlik) and cloud data platforms (Snowflake, Databricks, Fabric) suffer from <strong>semantic drift</strong> — the same metric returns different values depending on which tool a stakeholder opens. Board meetings become definition debates. Finance teams waste 40+ hours weekly on manual Excel exports, copy-paste cycles, and broken formulas. Data quality issues are detected reactively, often after wrong decisions are made. Audit questions take 7 hours to answer. And when AI agents query raw tables with no business context, they hallucinate metrics, producing answers that conflict with your BI reports. This results in ₹15+ Crores annually wasted — in manual effort, data errors, delayed decisions, and eroded trust. The problem is not that data is wrong; the problem is that nobody agrees on what "right" means.
            </p>
          </div>

          <div className="summary-block flow-animate flow-delay-2" style={{ backgroundColor: 'transparent', padding: '20px 0' }}>
            <h3 style={{ fontSize: '24px', color: '#1e293b', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '10px' }}>🟢 Solution Statement</h3>
            <p className="flow-content" style={{ color: '#475569', fontSize: '16px', lineHeight: '1.8', margin: 0 }}>
              DataTrust is an enterprise data governance platform that connects Snowflake, Databricks, and Fabric directly to Excel with live, validated data and proactive quality alerts. It introduces a canonical semantic layer — one definition for every metric — automatically syncing business logic across Power BI, Snowflake, Databricks, and Excel. Our AI-powered quality engine learns your data patterns, detects anomalies in under 5 minutes, and alerts you in plain business language before anyone complains. With a full audit trail that answers any question in seconds, DataTrust eliminates manual work, prevents data errors before they reach decision-makers, and enables AI agents to answer with confidence. One platform. Trusted data. ₹15+ Crores annual savings. 31x ROI.
            </p>
          </div>

          <div className="summary-block flow-animate flow-delay-3" style={{ backgroundColor: 'transparent', padding: '20px 0' }}>
            <h3 style={{ fontSize: '24px', color: '#1e293b', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '10px' }}>📊 Example</h3>
            <p className="flow-content" style={{ color: '#475569', fontSize: '16px', lineHeight: '1.8', margin: 0 }}>
              A leading Indian retail chain had 15 analysts spending 8 hours each every Monday on manual Excel reporting — 120 hours monthly wasted. Revenue figures differed between Finance, Sales, and Marketing. Data quality incidents took 4 hours to detect and 3 days to fix. Audit questions consumed 7 hours each. After deploying DataTrust, reporting dropped from 8 hours to 10 minutes, data quality incidents reduced by 80%, audit questions answered in 1 second, and board meetings no longer debated definitions — they debated strategy. Total savings: ₹15.7 Crores annually on a ₹50 Lakh investment — 31x ROI.
            </p>
          </div>

        </div>
      </section>

      {/* PROBLEMS */}
      <section className="problems" id="problems">
        <div className="section-label scroll-reveal fade-up">The Root Cause</div>
        <h2 className="section-title scroll-reveal fade-up delay-100">5 problems costing you ₹15 Cr a year</h2>
        <p className="section-subtitle scroll-reveal fade-up delay-200">Every enterprise with Snowflake and Excel faces the same challenges. DataTrust solves all of them together.</p>
        <div className="problems-grid">
          <div className="problem-card scroll-reveal fade-up delay-300">
            <div className="problem-icon" style={{ background: 'rgba(239,68,68,0.1)' }}>📊</div>
            <h3>Semantic Chaos</h3>
            <p>Marketing, Finance, and Sales each define "Revenue" differently. Board meetings become definition debates, not strategy discussions.</p>
            <div className="problem-cost">₹1.5 Cr / year</div>
          </div>
          <div className="problem-card scroll-reveal fade-up delay-400">
            <div className="problem-icon" style={{ background: 'rgba(245,158,11,0.1)' }}>📁</div>
            <h3>Excel Export Hell</h3>
            <p>Every Monday: export from Power BI → open Excel → copy-paste → fix formulas → find errors. 20 analysts × 2 hours = 40 hours wasted weekly.</p>
            <div className="problem-cost">₹2 Cr / year</div>
          </div>
          <div className="problem-card scroll-reveal fade-up delay-500">
            <div className="problem-icon" style={{ background: 'rgba(99,102,241,0.1)' }}>❓</div>
            <h3>Trust Deficit</h3>
            <p>CFO gets two different Revenue figures on two different days. Investigation takes 3 days. Confidence in data disappears.</p>
            <div className="problem-cost">₹5 Cr / year</div>
          </div>
          <div className="problem-card scroll-reveal fade-up delay-600">
            <div className="problem-icon" style={{ background: 'rgba(239,68,68,0.1)' }}>🔥</div>
            <h3>Reactive Quality</h3>
            <p>Issue happens → someone notices 4 hours later → investigation → fix → republish. 21 hours of delay on average. Wrong decisions made.</p>
            <div className="problem-cost">₹3 Cr / year</div>
          </div>
          <div className="problem-card scroll-reveal fade-up delay-700">
            <div className="problem-icon" style={{ background: 'rgba(0,191,165,0.1)' }}>📋</div>
            <h3>Audit Nightmare</h3>
            <p>"Who changed the Revenue definition?" Search emails, Slack, Jira, interview the team. 7 hours per audit question.</p>
            <div className="problem-cost">₹2 Cr / year</div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how">
        <div className="section-label scroll-reveal fade-up">How It Works</div>
        <h2 className="section-title scroll-reveal fade-up delay-100">Governed data in Excel. In seconds.</h2>
        <p className="section-subtitle scroll-reveal fade-up delay-200">One platform that bridges the gap between your data warehouse and your Excel users—with quality checks baked in.</p>
        <div className="how-grid">
          <div className="how-steps">
            <div className="step scroll-reveal fade-right delay-300">
              <div className="step-num">1</div>
              <div className="step-content">
                <h4>Connect your data warehouse</h4>
                <p>Link Snowflake, Databricks, or any supported warehouse. Define your metrics once in the Semantic Layer.</p>
              </div>
            </div>
            <div className="step scroll-reveal fade-right delay-400">
              <div className="step-num">2</div>
              <div className="step-content">
                <h4>Set business rules & alerts</h4>
                <p>Configure quality rules in plain English. DataTrust auto-infers patterns from your data history too.</p>
              </div>
            </div>
            <div className="step scroll-reveal fade-right delay-500">
              <div className="step-num">3</div>
              <div className="step-content">
                <h4>Click Refresh in Excel</h4>
                <p>Live, validated data streams directly into your spreadsheet. No export, no copy-paste, no broken formulas.</p>
              </div>
            </div>
            <div className="step scroll-reveal fade-right delay-600">
              <div className="step-num">4</div>
              <div className="step-content">
                <h4>Get alerts before anyone complains</h4>
                <p>Anomalies detected in under 5 minutes. Business-language alerts tell you exactly what's wrong and what to do.</p>
              </div>
            </div>
          </div>
 
          {/* MOCK EXCEL UI */}
          <div className="mock-excel scroll-reveal scale-in delay-300">
            <div className="mock-topbar">
              <div className="mock-dots">
                <div className="mock-dot" style={{ background: '#FF5F57' }}></div>
                <div className="mock-dot" style={{ background: '#FFBD2E' }}></div>
                <div className="mock-dot" style={{ background: '#28C840' }}></div>
              </div>
              <div className="mock-title">Monthly_Revenue_Q4.xlsx — DataTrust</div>
            </div>
            <div className="mock-body">
              <div className="mock-ribbon">
                <span>🔗 Connected:</span>
                <strong>Snowflake → sales_transactions</strong>
                <span style={{ marginLeft: 'auto' }}>✅ Validated</span>
              </div>
              <div className="mock-table-container">
                <table className="mock-table">
                  <thead>
                    <tr>
                      <th>Region</th>
                      <th>Revenue</th>
                      <th>Units</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="ok">
                      <td>North</td>
                      <td>₹4.2 Cr</td>
                      <td>8,400</td>
                      <td><span className="mock-badge badge-ok">✓ OK</span></td>
                    </tr>
                    <tr className="ok">
                      <td>South</td>
                      <td>₹3.8 Cr</td>
                      <td>7,600</td>
                      <td><span className="mock-badge badge-ok">✓ OK</span></td>
                    </tr>
                    <tr className="warn">
                      <td>West</td>
                      <td>₹1.1 Cr</td>
                      <td>6,200</td>
                      <td><span className="mock-badge badge-warn">⚠ Review</span></td>
                    </tr>
                    <tr className="ok">
                      <td>East</td>
                      <td>₹2.9 Cr</td>
                      <td>5,800</td>
                      <td><span className="mock-badge badge-ok">✓ OK</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="mock-footer">
                <span>Last refreshed: 09:02 AM · 4,234 rows</span>
                <button className="refresh-btn" onClick={onEnterWorkspace}>
                  <RefreshCw size={12} /> Test Live Sync
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="features" id="features">
        <div className="section-label scroll-reveal fade-up">Core Features</div>
        <h2 className="section-title scroll-reveal fade-up delay-100">Everything you need for trusted data</h2>
        <p className="section-subtitle scroll-reveal fade-up delay-200">Four engines working together to make sure every number in every Excel report is accurate and traceable.</p>
        <div className="features-grid">
          <div className="feature-card scroll-reveal fade-up delay-300">
            <div className="feature-icon">🧩</div>
            <h3>Semantic Layer</h3>
            <p>One definition for every metric. Revenue is Revenue, for Finance, Sales, and the CFO—always the same number, everywhere.</p>
          </div>
          <div className="feature-card scroll-reveal fade-up delay-400">
            <div className="feature-icon">⚡</div>
            <h3>Live Excel Connector</h3>
            <p>One-click data refresh pulls directly from Snowflake into Excel. Auto-corrects broken formulas. Saves 2 hours per analyst per week.</p>
          </div>
          <div className="feature-card scroll-reveal fade-up delay-500">
            <div className="feature-icon">🤖</div>
            <h3>AI Quality Engine</h3>
            <p>Learns your data patterns, detects anomalies in under 5 minutes, and alerts you in plain business language—before anyone complains.</p>
          </div>
          <div className="feature-card scroll-reveal fade-up delay-600">
            <div className="feature-icon">📜</div>
            <h3>Full Audit Trail</h3>
            <p>Every data change, formula correction, and metric update is logged. Audit questions answered in 1 second, not 7 days.</p>
          </div>
          <div className="feature-card scroll-reveal fade-up delay-700">
            <div className="feature-icon">🔔</div>
            <h3>Business Alerts</h3>
            <p>No more cryptic technical errors. Alerts say "Revenue dropped 40%—check duplicate entries in Store 42" not "NULL constraint violation."</p>
          </div>
          <div className="feature-card scroll-reveal fade-up delay-800">
            <div className="feature-icon">🔐</div>
            <h3>Enterprise Security</h3>
            <p>SOC2, GDPR, SOX, HIPAA compliant. SSO, role-based access control, end-to-end encryption. Ready for your security team's questions.</p>
          </div>
        </div>
      </section>

      {/* USE CASES */}
      <section className="use-cases" id="usecases">
        <div className="section-label scroll-reveal fade-up">Real Impact</div>
        <h2 className="section-title scroll-reveal fade-up delay-100">Before & After DataTrust</h2>
        <p className="section-subtitle scroll-reveal fade-up delay-200">Real workflows from real teams—and how DataTrust transforms them.</p>

        <div className="cases-tabs scroll-reveal scale-in delay-300">
          {['reporting', 'quality', 'audit', 'budget'].map(tab => (
            <button
              key={tab}
              className={`case-tab ${activeCase === tab ? 'active' : ''}`}
              onClick={() => setActiveCase(tab)}
            >
              {tab === 'reporting' && 'Monthly Reporting'}
              {tab === 'quality' && 'Data Quality'}
              {tab === 'audit' && 'Audit & Compliance'}
              {tab === 'budget' && 'Budget Planning'}
            </button>
          ))}
        </div>

        {activeCase === 'reporting' && (
          <div className="case-content active">
            <div className="case-box before">
              <h4>Before DataTrust — 8 Hours</h4>
              <div className="case-step"><span className="cs-time">09:00 AM</span> Export Revenue from Power BI to CSV</div>
              <div className="case-step"><span className="cs-time">09:30 AM</span> Export Customer & Sales reports</div>
              <div className="case-step"><span className="cs-time">10:00 AM</span> Open Excel, copy-paste all data</div>
              <div className="case-step"><span className="cs-time">12:00 PM</span> Fix broken SUMIFS formula</div>
              <div className="case-step"><span className="cs-time">02:00 PM</span> Fix VLOOKUP references</div>
              <div className="case-step"><span className="cs-time">03:00 PM</span> Suspicious revenue numbers—investigate</div>
              <div className="case-step"><span className="cs-time">04:00 PM</span> Found data quality issue</div>
              <div className="case-step"><span className="cs-time">05:00 PM</span> Regenerate with correct data</div>
              <div className="case-step"><span className="cs-time">06:00 PM</span> Final formatting done</div>
              <div className="case-total red">Total: 8 hours · Monthly cost: ₹39,000</div>
            </div>
            <div className="case-box after">
              <h4>After DataTrust — 10 Minutes</h4>
              <div className="case-step"><span className="cs-time">09:00 AM</span> Open Excel template</div>
              <div className="case-step"><span className="cs-time">09:01 AM</span> Click "Refresh All"—data loads live</div>
              <div className="case-step"><span className="cs-time">09:02 AM</span> Auto-validation complete, no issues</div>
              <div className="case-step"><span className="cs-time">09:05 AM</span> Review numbers</div>
              <div className="case-step"><span className="cs-time">09:10 AM</span> Click "Publish Report"—done</div>
              <div className="case-total green">Total: 10 minutes · Annual savings: ₹4.7 Lakhs</div>
            </div>
          </div>
        )}

        {activeCase === 'quality' && (
          <div className="case-content active">
            <div className="case-box before">
              <h4>Before DataTrust — 10 Hours</h4>
              <div className="case-step"><span className="cs-time">08:00 AM</span> Sales report shows ₹5 Cr (expected ₹4.5 Cr)</div>
              <div className="case-step"><span class="cs-time">10:00 AM</span> VP Sales flags: "Revenue seems wrong"</div>
              <div className="case-step"><span className="cs-time">12:00 PM</span> Data Engineer starts investigation</div>
              <div className="case-step"><span className="cs-time">02:00 PM</span> Duplicate entries found from 10 stores</div>
              <div className="case-step"><span className="cs-time">04:00 PM</span> Data corrected</div>
              <div className="case-step"><span className="cs-time">06:00 PM</span> Report regenerated</div>
              <div className="case-total red">Total: 10 hours · 1 full day of wrong decisions</div>
            </div>
            <div className="case-box after">
              <h4>After DataTrust — 15 Minutes</h4>
              <div className="case-step"><span className="cs-time">08:00 AM</span> Alert: "Revenue anomaly detected"</div>
              <div className="case-step"><span className="cs-time">08:05 AM</span> Alert: "Duplicates from Store 42, 53, 89"</div>
              <div className="case-step"><span className="cs-time">08:10 AM</span> Click "Fix in Excel"</div>
              <div className="case-step"><span className="cs-time">08:11 AM</span> Auto-correction applied</div>
              <div className="case-step"><span className="cs-time">08:15 AM</span> Report shows correct numbers</div>
              <div className="case-total green">Total: 15 minutes · 95% reduction in resolution time</div>
            </div>
          </div>
        )}

        {activeCase === 'audit' && (
          <div className="case-content active">
            <div className="case-box before">
              <h4>Before DataTrust — 7 Days</h4>
              <div className="case-step"><span className="cs-time">Day 1</span> Auditor requests Revenue definition proof</div>
              <div className="case-step"><span className="cs-time">Day 2</span> Search emails for history</div>
              <div className="case-step"><span className="cs-time">Day 3</span> Interview team members</div>
              <div className="case-step"><span class="cs-time">Day 4</span> Piece together change history</div>
              <div className="case-step"><span className="cs-time">Day 5</span> Document findings</div>
              <div className="case-step"><span class="cs-time">Day 6</span> Verify with stakeholders</div>
              <div className="case-step"><span className="cs-time">Day 7</span> Submit to auditor</div>
              <div className="case-total red">Total: 56 hours · Cost: ₹2.8 Lakhs</div>
            </div>
            <div className="case-box after">
              <h4>After DataTrust — 1 Hour</h4>
              <div className="case-step"><span className="cs-time">Step 1</span> Open DataTrust, search "Revenue"</div>
              <div className="case-step"><span class="cs-time">Step 2</span> Full definition history loads in 1 second</div>
              <div className="case-step"><span className="cs-time">Step 3</span> See all change approvals and lineage</div>
              <div className="case-step"><span class="cs-time">Step 4</span> Click "Export Audit Report"</div>
              <div className="case-step"><span className="cs-time">Step 5</span> Send to auditor</div>
              <div className="case-total green">Total: 1 hour · Cost: ₹5,000 · 98% time saved</div>
            </div>
          </div>
        )}

        {activeCase === 'budget' && (
          <div className="case-content active">
            <div className="case-box before">
              <h4>Before DataTrust — 3 Weeks</h4>
              <div className="case-step"><span className="cs-time">Week 1</span> Sales, Finance, Marketing each pull their own revenue data</div>
              <div className="case-step"><span className="cs-time">Week 2</span> Numbers don't match—reconciliation meetings begin</div>
              <div className="case-step"><span className="cs-time">Week 2</span> Endless definition debates slow everything down</div>
              <div className="case-step"><span className="cs-time">Week 3</span> Final agreed numbers, Excel model created</div>
              <div className="case-step"><span className="cs-time">Week 3</span> Board presentation prepared</div>
              <div className="case-total red">Total: 3 weeks · 40+ hours of reconciliation meetings</div>
            </div>
            <div className="case-box after">
              <h4>After DataTrust — 1 Week</h4>
              <div className="case-step"><span className="cs-time">Day 1</span> Open budget template, click Refresh—live data for everyone</div>
              <div className="case-step"><span className="cs-time">Day 2</span> Scenario planning and what-if analysis</div>
              <div className="case-step"><span className="cs-time">Day 3</span> Real-time updates, no meetings to reconcile</div>
              <div className="case-step"><span className="cs-time">Day 4</span> Review and finalize</div>
              <div className="case-step"><span className="cs-time">Day 5</span> Click Publish—board ready</div>
              <div className="case-total green">Total: 1 week · 67% faster · Zero definition debates</div>
            </div>
          </div>
        )}
      </section>

      {/* ROI CALCULATOR */}
      <section className="roi" id="roi">
        <div className="section-label scroll-reveal fade-up">Business Case</div>
        <h2 className="section-title scroll-reveal fade-up delay-100">The numbers behind the numbers</h2>
        <p className="section-subtitle scroll-reveal fade-up delay-200">For a typical 500-person enterprise, DataTrust delivers ₹15.7 Cr in annual savings across five categories.</p>
        <div className="roi-table-container scroll-reveal scale-in delay-300">
          <table className="roi-table">
            <thead>
              <tr>
                <th>Category</th>
                <th>Annual Savings</th>
                <th>How</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Excel Manual Work</td>
                <td className="amount">₹2.5 Cr</td>
                <td>70% reduction in export/copy/fix cycles</td>
              </tr>
              <tr>
                <td>Data Quality Issues</td>
                <td className="amount">₹3.2 Cr</td>
                <td>80% fewer issues reaching the business</td>
              </tr>
              <tr>
                <td>Audit & Compliance</td>
                <td className="amount">₹1.5 Cr</td>
                <td>90% reduction in audit preparation time</td>
              </tr>
              <tr>
                <td>Opportunity Loss</td>
                <td className="amount">₹6.0 Cr</td>
                <td>Better, faster decisions from trusted data</td>
              </tr>
              <tr>
                <td>Trust Premium</td>
                <td className="amount">₹2.5 Cr</td>
                <td>No more time spent verifying numbers</td>
              </tr>
              <tr>
                <td><strong>Total Annual Savings</strong></td>
                <td className="total-amount"><strong>₹15.7 Cr</strong></td>
                <td><strong>vs. ₹50L–₹1.5Cr investment → 10x–31x ROI</strong></td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* PRICING */}
      <section className="pricing" id="pricing">
        <div className="section-label scroll-reveal fade-up">Pricing</div>
        <h2 className="section-title scroll-reveal fade-up delay-100">Transparent plans. Measurable ROI.</h2>
        <p className="section-subtitle scroll-reveal fade-up delay-200">Every plan comes with a 30-day pilot. See the value before you commit.</p>
        <div className="pricing-grid">
          <div className="plan-card scroll-reveal fade-up delay-300">
            <div className="plan-name">Starter</div>
            <div className="plan-price">₹15L</div>
            <div className="plan-users">Up to 10 users · Annual</div>
            <ul className="plan-features">
              <li>Excel Add-in (Live Refresh)</li>
              <li>Semantic Layer (basic)</li>
              <li>Data Validation</li>
              <li>Audit Trail</li>
              <li>Email support</li>
            </ul>
            <div className="plan-roi">ROI: up to 5x</div>
          </div>
          <div className="plan-card scroll-reveal fade-up delay-400">
            <div className="plan-name">Professional</div>
            <div className="plan-price">₹30L</div>
            <div className="plan-users">Up to 25 users · Annual</div>
            <ul className="plan-features">
              <li>Everything in Starter</li>
              <li>AI Quality Engine</li>
              <li>Business Alerts</li>
              <li>Anomaly Detection</li>
              <li>Priority support</li>
            </ul>
            <div className="plan-roi">ROI: up to 10x</div>
          </div>
          <div className="plan-card popular scroll-reveal fade-up delay-500">
            <div className="popular-badge">Most Popular</div>
            <div className="plan-name">Enterprise</div>
            <div className="plan-price">₹50L</div>
            <div className="plan-users">Up to 50 users · Annual</div>
            <ul className="plan-features">
              <li>Full Platform</li>
              <li>Rule Inference Engine</li>
              <li>Data Lineage</li>
              <li>RBAC & SSO</li>
              <li>Dedicated CSM</li>
            </ul>
            <div className="plan-roi">ROI: up to 20x</div>
          </div>
          <div className="plan-card scroll-reveal fade-up delay-600">
            <div className="plan-name">Platinum</div>
            <div className="plan-price">₹75L</div>
            <div className="plan-users">100+ users · Annual</div>
            <ul className="plan-features">
              <li>Everything in Enterprise</li>
              <li>Custom integrations</li>
              <li>On-prem deployment</li>
              <li>SLA guarantee</li>
              <li>24/7 support</li>
            </ul>
            <div className="plan-roi">ROI: up to 31x</div>
          </div>
        </div>
      </section>

      {/* MEET THE TEAM */}
      <section style={{ padding: '100px 5%', backgroundColor: 'var(--navy)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', textAlign: 'center' }}>
          <div className="section-label scroll-reveal fade-up" style={{ marginBottom: '1rem' }}>The People Behind DataTrust</div>
          <h2 className="section-title scroll-reveal fade-up delay-100" style={{ color: '#fff', margin: '0 auto 1rem', maxWidth: '600px' }}>Built by someone who lived the problem</h2>
          <p className="section-subtitle scroll-reveal fade-up delay-200" style={{ color: 'var(--gray)', margin: '0 auto 3.5rem', maxWidth: '580px' }}>
            Not a random SaaS idea — DataTrust was born from real enterprise pain.
          </p>
 
          {/* Team Cards */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '32px', flexWrap: 'wrap' }}>
            <div className="scroll-reveal fade-up delay-300" style={{ maxWidth: '360px', width: '100%' }}>
              <div style={{
                background: 'var(--navy-mid)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '20px',
                padding: '40px',
                textAlign: 'center',
                transition: 'transform 0.3s, box-shadow 0.3s',
                boxShadow: '0 10px 40px rgba(0,0,0,0.3)',
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.boxShadow = '0 20px 50px rgba(0,0,0,0.4)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 10px 40px rgba(0,0,0,0.3)'; }}
              >
                {/* Avatar */}
                <div style={{ position: 'relative', display: 'inline-block', marginBottom: '24px' }}>
                  <img
                    src="https://media.licdn.com/dms/image/v2/D5603AQFhJDtaHrHn2A/profile-displayphoto-scale_400_400/B56Z5vZEShIoAk-/0/1779985304253?e=1783555200&v=beta&t=F0gCCbUwZ7j1vERCtOraIUSxZoox3OGDeyOn2pDbP04"
                    alt="Manoj Rajput"
                    style={{ width: '120px', height: '120px', borderRadius: '50%', objectFit: 'cover', border: '3px solid var(--teal)', boxShadow: '0 0 0 6px rgba(0,191,165,0.12)' }}
                  />
                  <div style={{ position: 'absolute', bottom: '4px', right: '4px', background: 'var(--teal)', borderRadius: '50%', width: '22px', height: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', border: '2px solid var(--navy-mid)' }}>✓</div>
                </div>
 
                {/* Name & Title */}
                <h3 style={{ fontSize: '22px', fontWeight: '700', color: '#fff', marginBottom: '4px' }}>Manoj Singh Rajput</h3>
                <p style={{ color: 'var(--teal)', fontWeight: '600', fontSize: '14px', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Founder & Creator</p>
 
                {/* Bio */}
                <p style={{ color: 'var(--gray)', fontSize: '14px', lineHeight: '1.7', marginBottom: '24px' }}>
                  "I watched finance teams spend entire Mondays manually exporting data and reconciling numbers that still didn't match. DataTrust is the platform I wished existed."
                </p>
 
                {/* Badges */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center', marginBottom: '28px' }}>
                  {['Data Engineering', 'Enterprise SaaS', 'AI/ML', 'Governance'].map(tag => (
                    <span key={tag} style={{ fontSize: '12px', padding: '4px 12px', borderRadius: '999px', background: 'rgba(0,191,165,0.1)', color: 'var(--teal)', border: '1px solid rgba(0,191,165,0.2)', fontWeight: '600' }}>{tag}</span>
                  ))}
                </div>
 
                {/* LinkedIn Button */}
                <a
                  href="https://www.linkedin.com/in/manojrajput2065/"
                  target="_blank"
                  rel="noreferrer"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: '#0A66C2', color: '#ffffff', padding: '11px 26px', borderRadius: '30px', textDecoration: 'none', fontWeight: '600', fontSize: '14px', boxShadow: '0 4px 12px rgba(10,102,194,0.35)', transition: 'opacity 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
                  onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" /><circle cx="4" cy="4" r="2" /></svg>
                  Connect on LinkedIn
                </a>
              </div>
            </div>
 
            {/* Card 2 - Sushil */}
            <div className="scroll-reveal fade-up delay-400" style={{ maxWidth: '360px', width: '100%' }}>
              <div style={{
                background: 'var(--navy-mid)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '20px',
                padding: '40px',
                textAlign: 'center',
                transition: 'transform 0.3s, box-shadow 0.3s',
                boxShadow: '0 10px 40px rgba(0,0,0,0.3)',
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.boxShadow = '0 20px 50px rgba(0,0,0,0.4)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 10px 40px rgba(0,0,0,0.3)'; }}
              >
                <div style={{ position: 'relative', display: 'inline-block', marginBottom: '24px' }}>
                  <img
                    src="https://media.licdn.com/dms/image/v2/D5603AQFm-xoz0HDvkQ/profile-displayphoto-crop_800_800/B56ZypFfKyIIAI-/0/1772363315544?e=1783555200&v=beta&t=48nCotodmY4GQZ-0Bt0edbSjDoqmBt0RXLGjLjjInoo"
                    alt="Sushil Lalhal"
                    style={{ width: '120px', height: '120px', borderRadius: '50%', objectFit: 'cover', border: '3px solid var(--blue-light)', boxShadow: '0 0 0 6px rgba(30,136,229,0.12)' }}
                  />
                  <div style={{ position: 'absolute', bottom: '4px', right: '4px', background: 'var(--blue-light)', borderRadius: '50%', width: '22px', height: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', border: '2px solid var(--navy-mid)' }}>&#10003;</div>
                </div>
                <h3 style={{ fontSize: '22px', fontWeight: '700', color: '#fff', marginBottom: '4px' }}>Sushil Lalhal</h3>
                <p style={{ color: 'var(--blue-light)', fontWeight: '600', fontSize: '14px', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Co-Founder</p>
                <p style={{ color: 'var(--gray)', fontSize: '14px', lineHeight: '1.7', marginBottom: '24px' }}>
                  "Bringing the technical backbone to DataTrust — ensuring our platform's architecture is not just scalable, but enterprise-grade from day one."
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center', marginBottom: '28px' }}>
                  {['Backend Systems', 'Cloud Architecture', 'Data Pipelines', 'Security'].map(tag => (
                    <span key={tag} style={{ fontSize: '12px', padding: '4px 12px', borderRadius: '999px', background: 'rgba(30,136,229,0.1)', color: 'var(--blue-light)', border: '1px solid rgba(30,136,229,0.2)', fontWeight: '600' }}>{tag}</span>
                  ))}
                </div>
                <a
                  href="https://www.linkedin.com/in/sushil-lalhal-24396b300/"
                  target="_blank"
                  rel="noreferrer"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: '#0A66C2', color: '#ffffff', padding: '11px 26px', borderRadius: '30px', textDecoration: 'none', fontWeight: '600', fontSize: '14px', boxShadow: '0 4px 12px rgba(10,102,194,0.35)', transition: 'opacity 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
                  onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" /><circle cx="4" cy="4" r="2" /></svg>
                  Connect on LinkedIn
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS — After Team */}
      <section style={{ padding: '100px 5%', backgroundColor: 'transparent' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', textAlign: 'center' }}>
          <div className="section-label scroll-reveal fade-up" style={{ marginBottom: '1rem' }}>Social Proof</div>
          <h2 className="section-title scroll-reveal fade-up delay-100" style={{ margin: '0 auto 1rem', maxWidth: '600px' }}>What decision-makers say</h2>
          <p className="section-subtitle scroll-reveal fade-up delay-200" style={{ margin: '0 auto 3.5rem' }}>Early feedback from enterprise stakeholders who tested DataTrust.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
            {[
              { quote: '"DataTrust ne hamara monthly reporting time 8 hours se 10 minutes kar diya. Board meetings ab numbers pe nahi, strategy pe hoti hain."', author: 'CFO', company: 'Leading Indian Retail Chain' },
              { quote: '"Audit questions jo pehle 7 din lagte the, ab 1 second mein answer ho jaate hain. Compliance team ka confidence is platform se aayi hai."', author: 'Head of Compliance', company: 'Enterprise Finance Firm' },
              { quote: '"Revenue figures ab sabke liye same hain — Finance, Sales, Marketing. Semantic drift khatam. Trust wapas aaya."', author: 'VP of Data', company: 'Multi-BU Conglomerate' },
            ].map((t, i) => (
              <div key={i} className={`scroll-reveal fade-up delay-${(i + 3) * 100}`} style={{ background: '#FFFFFF', borderRadius: '16px', padding: '32px', border: '1px solid var(--gray-light)', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', textAlign: 'left' }}>
                <div style={{ fontSize: '28px', color: 'var(--teal)', lineHeight: 1, marginBottom: '16px' }}>&ldquo;</div>
                <p style={{ color: 'var(--text)', fontSize: '15px', lineHeight: '1.75', marginBottom: '20px', fontStyle: 'italic' }}>{t.quote}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', borderTop: '1px solid var(--gray-light)', paddingTop: '16px' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--navy)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--teal)', fontWeight: '700', fontSize: '16px' }}>{t.author[0]}</div>
                  <div>
                    <div style={{ fontWeight: '700', fontSize: '14px', color: 'var(--text)' }}>{t.author}</div>
                    <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{t.company}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section style={{ padding: '100px 5%', backgroundColor: '#FFFFFF' }} id="faq">
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div className="section-label scroll-reveal fade-up" style={{ marginBottom: '1rem', textAlign: 'center', display: 'block' }}>FAQ</div>
          <h2 className="section-title scroll-reveal fade-up delay-100" style={{ textAlign: 'center', margin: '0 auto 1rem', maxWidth: '600px' }}>Frequently Asked Questions</h2>
          <p className="section-subtitle scroll-reveal fade-up delay-200" style={{ textAlign: 'center', margin: '0 auto 3.5rem' }}>Everything you need to know before getting started.</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {[
              { q: 'Does DataTrust store my data?', a: 'No. DataTrust runs entirely within your own environment. Your data never leaves your perimeter — all processing happens locally in your infrastructure.' },
              { q: 'Can I try before buying?', a: 'Yes. Every plan includes a 30-day pilot on your actual data. You see the value on your own numbers before committing.' },
              { q: 'How long does implementation take?', a: 'Typically 2–4 weeks from contract signing to go-live, depending on your data warehouse setup and team size.' },
              { q: 'Is DataTrust SOC2 / GDPR / SOX compliant?', a: 'Yes. DataTrust is built for enterprise security standards — SOC2, GDPR, SOX, and HIPAA ready. Full audit trail included.' },
              { q: 'What if my data is on-premise?', a: 'DataTrust fully supports on-premise deployment. We work with your existing infrastructure — no cloud migration required.' },
              { q: 'Does it work with Power BI and Tableau?', a: 'Yes. DataTrust integrates with Snowflake, Databricks, Microsoft Fabric, Power BI, Tableau, Qlik, and Excel out of the box.' },
            ].map((item, i) => (
              <details key={i} className={`scroll-reveal fade-up delay-${(i + 1) * 100}`} style={{ background: 'var(--off-white)', borderRadius: '12px', border: '1px solid var(--gray-light)', padding: '0' }}>
                <summary style={{ padding: '20px 24px', fontWeight: '600', fontSize: '16px', color: 'var(--text)', cursor: 'pointer', listStyle: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  {item.q} <span style={{ fontSize: '20px', color: 'var(--teal)', marginLeft: '12px', flexShrink: 0 }}>+</span>
                </summary>
                <div style={{ padding: '0 24px 20px', color: 'var(--text-muted)', fontSize: '15px', lineHeight: '1.7' }}>{item.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* SECURITY BADGES */}
      <div className="scroll-reveal fade-up" style={{ backgroundColor: 'var(--navy)', padding: '28px 5%', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
          <span className="scroll-reveal fade-up delay-100" style={{ color: 'var(--gray)', fontSize: '13px', fontWeight: '600', marginRight: '8px' }}>Enterprise Security:</span>
          {[{ icon: '🔐', label: 'SOC2 Compliant' }, { icon: '🇪🇺', label: 'GDPR Ready' }, { icon: '🏥', label: 'HIPAA Compliant' }, { icon: '📋', label: 'SOX Ready' }, { icon: '🔒', label: 'End-to-End Encryption' }].map((b, idx) => (
            <span key={b.label} className={`scroll-reveal scale-in delay-${(idx + 2) * 100}`} style={{ fontSize: '13px', fontWeight: '600', color: 'var(--white)', background: 'rgba(0,191,165,0.1)', border: '1px solid rgba(0,191,165,0.2)', padding: '7px 16px', borderRadius: '999px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              {b.icon} {b.label}
            </span>
          ))}
        </div>
      </div>

      {/* CTA SECTION */}
      <section className="cta-section" id="contact">
        <h2 className="scroll-reveal fade-up">Ready to trust your numbers?</h2>
        <p className="scroll-reveal fade-up delay-100">Launch the interactive web simulator now to test connections, build rules, and inspect downstream schema impacts.</p>
        <div className="cta-buttons scroll-reveal fade-up delay-200" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
          <div style={{ display: 'flex', gap: '20px' }}>
            <button onClick={onEnterWorkspace} className="btn-primary">
              Launch Limited UI Demo
            </button>
            <a href="mailto:datatrust.ai@zohomail.in" className="btn-outline">
              Email: datatrust.ai@zohomail.in
            </a>
          </div>
          <p style={{ fontSize: '13px', color: '#64748B', marginTop: '10px' }}>
            To view the full product demo and features, please email us directly at datatrust.ai@zohomail.in.
          </p>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section style={{ padding: '80px 5%', backgroundColor: '#FFFFFF' }}>
        <div style={{ maxWidth: '560px', margin: '0 auto', textAlign: 'center' }}>
          <div className="scroll-reveal fade-up" style={{ fontSize: '32px', marginBottom: '16px' }}>🔔</div>
          <h3 className="scroll-reveal fade-up delay-100" style={{ fontSize: '28px', fontWeight: '700', color: 'var(--text)', marginBottom: '12px', fontFamily: 'var(--font-display)' }}>Stay in the loop</h3>
          <p className="scroll-reveal fade-up delay-200" style={{ color: 'var(--text-muted)', fontSize: '16px', marginBottom: '32px', lineHeight: '1.7' }}>Get product updates, case studies, and early access announcements. No spam. Unsubscribe anytime.</p>
          <form
            onSubmit={e => { e.preventDefault(); alert('Thanks! We will be in touch at datatrust.ai@zohomail.in'); }}
            className="scroll-reveal fade-up delay-300"
            style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}
          >
            <input
              type="email"
              placeholder="Enter your work email"
              required
              style={{ flex: '1', minWidth: '240px', padding: '14px 20px', borderRadius: '8px', border: '1px solid var(--gray-light)', fontSize: '15px', color: 'var(--text)', outline: 'none', fontFamily: 'var(--font-sans)' }}
            />
            <button
              type="submit"
              style={{ padding: '14px 28px', background: 'var(--teal)', color: 'var(--navy)', fontWeight: '700', fontSize: '15px', border: 'none', borderRadius: '8px', cursor: 'pointer', whiteSpace: 'nowrap', transition: 'opacity 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
              onMouseLeave={e => e.currentTarget.style.opacity = '1'}
            >
              Subscribe
            </button>
          </form>
          <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '16px' }}>📧 Responses go to datatrust.ai@zohomail.in</p>
        </div>
      </section>
 
      {/* FOOTER */}
      <Footer setView={setView} />
    </div>
  );
}
