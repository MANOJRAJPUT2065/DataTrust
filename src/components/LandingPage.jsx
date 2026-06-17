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
    }, { threshold: 0.2 });

    document.querySelectorAll('.flow-animate').forEach(el => observer.observe(el));
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
        <div className="hero-badge">
          <span className="dot-pulse"></span>
          Enterprise Data Governance Platform
        </div>
        <h1>Stop debating numbers.<br />Start <span>trusting</span> them.</h1>
        <p>DataTrust connects Snowflake directly to Excel with live, validated data and proactive quality alerts—so every decision is backed by numbers everyone agrees on.</p>
        <div className="hero-actions">
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
        <div className="hero-stats">
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
        <div className="section-label">The Root Cause</div>
        <h2 className="section-title">5 problems costing you ₹15 Cr a year</h2>
        <p className="section-subtitle">Every enterprise with Snowflake and Excel faces the same challenges. DataTrust solves all of them together.</p>
        <div className="problems-grid">
          <div className="problem-card">
            <div className="problem-icon" style={{ background: 'rgba(239,68,68,0.1)' }}>📊</div>
            <h3>Semantic Chaos</h3>
            <p>Marketing, Finance, and Sales each define "Revenue" differently. Board meetings become definition debates, not strategy discussions.</p>
            <div className="problem-cost">₹1.5 Cr / year</div>
          </div>
          <div className="problem-card">
            <div className="problem-icon" style={{ background: 'rgba(245,158,11,0.1)' }}>📁</div>
            <h3>Excel Export Hell</h3>
            <p>Every Monday: export from Power BI → open Excel → copy-paste → fix formulas → find errors. 20 analysts × 2 hours = 40 hours wasted weekly.</p>
            <div className="problem-cost">₹2 Cr / year</div>
          </div>
          <div className="problem-card">
            <div className="problem-icon" style={{ background: 'rgba(99,102,241,0.1)' }}>❓</div>
            <h3>Trust Deficit</h3>
            <p>CFO gets two different Revenue figures on two different days. Investigation takes 3 days. Confidence in data disappears.</p>
            <div className="problem-cost">₹5 Cr / year</div>
          </div>
          <div className="problem-card">
            <div className="problem-icon" style={{ background: 'rgba(239,68,68,0.1)' }}>🔥</div>
            <h3>Reactive Quality</h3>
            <p>Issue happens → someone notices 4 hours later → investigation → fix → republish. 21 hours of delay on average. Wrong decisions made.</p>
            <div className="problem-cost">₹3 Cr / year</div>
          </div>
          <div className="problem-card">
            <div className="problem-icon" style={{ background: 'rgba(0,191,165,0.1)' }}>📋</div>
            <h3>Audit Nightmare</h3>
            <p>"Who changed the Revenue definition?" Search emails, Slack, Jira, interview the team. 7 hours per audit question.</p>
            <div className="problem-cost">₹2 Cr / year</div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how">
        <div className="section-label">How It Works</div>
        <h2 className="section-title">Governed data in Excel. In seconds.</h2>
        <p className="section-subtitle">One platform that bridges the gap between your data warehouse and your Excel users—with quality checks baked in.</p>
        <div className="how-grid">
          <div className="how-steps">
            <div className="step">
              <div className="step-num">1</div>
              <div className="step-content">
                <h4>Connect your data warehouse</h4>
                <p>Link Snowflake, Databricks, or any supported warehouse. Define your metrics once in the Semantic Layer.</p>
              </div>
            </div>
            <div className="step">
              <div className="step-num">2</div>
              <div className="step-content">
                <h4>Set business rules & alerts</h4>
                <p>Configure quality rules in plain English. DataTrust auto-infers patterns from your data history too.</p>
              </div>
            </div>
            <div className="step">
              <div className="step-num">3</div>
              <div className="step-content">
                <h4>Click Refresh in Excel</h4>
                <p>Live, validated data streams directly into your spreadsheet. No export, no copy-paste, no broken formulas.</p>
              </div>
            </div>
            <div className="step">
              <div className="step-num">4</div>
              <div className="step-content">
                <h4>Get alerts before anyone complains</h4>
                <p>Anomalies detected in under 5 minutes. Business-language alerts tell you exactly what's wrong and what to do.</p>
              </div>
            </div>
          </div>

          {/* MOCK EXCEL UI */}
          <div className="mock-excel">
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
        <div className="section-label">Core Features</div>
        <h2 className="section-title">Everything you need for trusted data</h2>
        <p className="section-subtitle">Four engines working together to make sure every number in every Excel report is accurate and traceable.</p>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🧩</div>
            <h3>Semantic Layer</h3>
            <p>One definition for every metric. Revenue is Revenue, for Finance, Sales, and the CFO—always the same number, everywhere.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">⚡</div>
            <h3>Live Excel Connector</h3>
            <p>One-click data refresh pulls directly from Snowflake into Excel. Auto-corrects broken formulas. Saves 2 hours per analyst per week.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🤖</div>
            <h3>AI Quality Engine</h3>
            <p>Learns your data patterns, detects anomalies in under 5 minutes, and alerts you in plain business language—before anyone complains.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📜</div>
            <h3>Full Audit Trail</h3>
            <p>Every data change, formula correction, and metric update is logged. Audit questions answered in 1 second, not 7 days.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🔔</div>
            <h3>Business Alerts</h3>
            <p>No more cryptic technical errors. Alerts say "Revenue dropped 40%—check duplicate entries in Store 42" not "NULL constraint violation."</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🔐</div>
            <h3>Enterprise Security</h3>
            <p>SOC2, GDPR, SOX, HIPAA compliant. SSO, role-based access control, end-to-end encryption. Ready for your security team's questions.</p>
          </div>
        </div>
      </section>

      {/* USE CASES */}
      <section className="use-cases" id="usecases">
        <div className="section-label">Real Impact</div>
        <h2 className="section-title">Before & After DataTrust</h2>
        <p className="section-subtitle">Real workflows from real teams—and how DataTrust transforms them.</p>

        <div className="cases-tabs">
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
        <div className="section-label">Business Case</div>
        <h2 className="section-title">The numbers behind the numbers</h2>
        <p className="section-subtitle">For a typical 500-person enterprise, DataTrust delivers ₹15.7 Cr in annual savings across five categories.</p>
        <div className="roi-table-container">
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
        <div className="section-label">Pricing</div>
        <h2 className="section-title">Transparent plans. Measurable ROI.</h2>
        <p className="section-subtitle">Every plan comes with a 30-day pilot. See the value before you commit.</p>
        <div className="pricing-grid">
          <div className="plan-card">
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
          <div className="plan-card">
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
          <div className="plan-card popular">
            <div className="popular-badge">Most Popular</div>
            <div className="plan-name">Enterprise</div>
            <div className="plan-price">₹50L</div>
            <div className="plan-users">Up to 50 users · Annual</div>
            <ul class="plan-features">
              <li>Full Platform</li>
              <li>Rule Inference Engine</li>
              <li>Data Lineage</li>
              <li>RBAC & SSO</li>
              <li>Dedicated CSM</li>
            </ul>
            <div className="plan-roi">ROI: up to 20x</div>
          </div>
          <div className="plan-card">
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
          <div className="section-label" style={{ marginBottom: '1rem' }}>The People Behind DataTrust</div>
          <h2 className="section-title" style={{ color: '#fff', margin: '0 auto 1rem', maxWidth: '600px' }}>Built by someone who lived the problem</h2>
          <p className="section-subtitle" style={{ color: 'var(--gray)', margin: '0 auto 3.5rem', maxWidth: '580px' }}>
            Not a random SaaS idea — DataTrust was born from real enterprise pain.
          </p>

          {/* Team Cards */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '32px', flexWrap: 'wrap' }}>
            <div style={{
              background: 'var(--navy-mid)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '20px',
              padding: '40px',
              maxWidth: '360px',
              width: '100%',
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

            {/* Card 2 - Sushil */}
            <div style={{
              background: 'var(--navy-mid)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '20px',
              padding: '40px',
              maxWidth: '360px',
              width: '100%',
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
      </section>

      {/* CTA SECTION */}
      <section className="cta-section" id="contact">
        <h2>Ready to trust your numbers?</h2>
        <p>Launch the interactive web simulator now to test connections, build rules, and inspect downstream schema impacts.</p>
        <div className="cta-buttons" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
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

      {/* FOOTER */}
      <Footer setView={setView} />
    </div>
  );
}
