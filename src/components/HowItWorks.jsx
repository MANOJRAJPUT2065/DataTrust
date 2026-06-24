import React, { useEffect } from 'react';

const timelineData = [
  {
    day: 'Day 1 — 08:00 AM',
    title: 'Data Engineer Defines Semantic Model',
    actor: 'Raj (Data Engineer)',
    action: 'Opens DataTrust Semantic Layer UI to define quarterly metrics.',
    color: '#00BFA5',
    details: [
      { label: 'Revenue', text: "SUM(net_sales) - SUM(returns) | Source: sales_transactions | Filter: status='Completed' AND region IN ('US', 'UK', 'HK')" },
      { label: 'Risk-Weighted Assets (RWA)', text: 'SUM(asset_value * risk_weight) | Source: risk_assets' },
      { label: 'Capital Adequacy Ratio (CAR)', text: '(Tier1_Capital + Tier2_Capital) / RWA' }
    ],
    aiAction: '🧠 AI Rule Inference V2 — Auto-detects patterns',
    aiDetails: [
      'Analyzing historical data (12 months)...',
      '✅ Revenue_Positive — Revenue >= 0 — 99% conf',
      '✅ Revenue_Units_Relationship — Revenue = Units × Price — 92% conf',
      '✅ RWA_Range — RWA BETWEEN 100B AND 500B — 85% conf',
      '✅ CAR_Minimum — CAR >= 10% — 90% conf',
      '⚠️ Revenue_Monday_Drop — 78% conf (review suggested)'
    ],
    outcome: 'Raj clicks "Accept All" → Rules go live instantly. Manual work: 0 hours (was 8 hours)'
  },
  {
    day: 'Day 1 — 09:00 AM',
    title: 'Finance Analyst Prepares Report',
    actor: 'Morgan (Finance Analyst)',
    action: 'Opens "Q3_2026_Board_Report.xlsx" with DataTrust Excel Add-in V3.',
    color: '#3B82F6',
    details: [
      { label: 'Refresh All', text: 'Live data from Snowflake loads in 2.3 seconds. Auto-validation runs (4 rules pass).' },
      { label: 'Investigation', text: 'Clicks Revenue cell -> "View Lineage". Sees reason for 12% jump (New APAC region added).' },
      { label: 'Natural Language Query', text: 'Types: "Show revenue by region for Q3 2026" → SQL generated & executed in 1.8 seconds.' }
    ],
    aiAction: '🔮 NLQ → SQL Engine & Auto-Correction',
    aiDetails: [
      'NLQ Engine: Semantic search finds Revenue (95%), Region (92%). LangChain+Groq generates Snowflake SQL.',
      'Quality Engine: Validates SQL against governance rules. Executes in 0.8s.',
      'Auto-Correction (Silent): Detected shifted column in source data, auto-fixed SUMIFS reference. Logged to audit.'
    ],
    outcome: 'Report prepared and published by 09:15 AM.'
  },
  {
    day: 'Day 2 — 10:00 AM',
    title: 'CFO Reviews and Approves',
    actor: 'Diana (CFO)',
    action: 'Opens Excel Dashboard & Alert Center to review numbers.',
    color: '#8B5CF6',
    details: [
      { label: 'Dashboard View', text: 'Revenue: ₹8,500 Cr ✅ | Profit: ₹2,100 Cr ✅ | RWA: ₹4,200 Cr ✅ | CAR: 18.5% ✅' },
      { label: 'Alert Center', text: '1 Warning: "Revenue growth 12% above historical average" -> Impact: ₹500 Cr variance.' },
      { label: 'Approval Flow', text: 'Reviews Raj\'s definition update (added APAC). Approves change. Board presentation ready in 2 days (was 14).' }
    ],
    aiAction: '👥 Collaborative Workspaces & Audit Trail',
    aiDetails: [
      'Impact Analysis: 3 reports affected, 2 teams impacted.',
      'Approval Workflow: Raj → Priya (Data Lead) → Diana (CFO).',
      'Audit Trail: Raj updated 10:15 AM, Priya approved 10:30 AM, Diana approved 10:45 AM. Version bumped to v3.2.0.'
    ],
    outcome: 'Morgan notified instantly: "Revenue definition updated — refresh to apply".'
  },
  {
    day: 'Day 2 — 02:00 PM',
    title: 'Predictive Quality Catches an Issue',
    actor: 'System Auto-Alert',
    action: 'Predictive Quality Engine detects a potential issue 24 hours before it happens.',
    color: '#EC4899',
    details: [
      { label: 'Alert Triggered', text: 'Risk Score: 87% (HIGH). "RWA may drop 15% tomorrow based on market data".' },
      { label: 'Notification', text: 'Sent to Raj (Slack), Priya (Email), Diana (Dashboard).' },
      { label: 'Impact & Action', text: 'CAR may drop below 10%. Action: Check market data feed.' }
    ],
    aiAction: '🧠 Predictive Quality Engine Analysis',
    aiDetails: [
      'Historical pattern: RWA always > ₹4,000 Cr.',
      'Market data feed: Detected 15% drop in 2 markets via external stream.',
      'ML Model: 87% confident RWA will drop. Triggered 24hr early warning.',
      'Zero manual detection required.'
    ],
    outcome: 'Raj investigates, finds failed feed, fixes it. RWA corrected, Alert auto-resolves.'
  },
  {
    day: 'Day 3 — 09:00 AM',
    title: 'Auto-Correction Fixes Data Quality Issue',
    actor: 'Auto-Correction Engine V2',
    action: 'Nightly pipeline runs. Quality Engine detects an anomaly.',
    color: '#F59E0B',
    details: [
      { label: 'Issue', text: 'Revenue 40% higher than expected. Root Cause: 42 duplicate rows in Store 42. Impact: ₹2.5 Cr overstated.' },
      { label: 'Correction Applied', text: 'Identified 42 duplicates -> Removed duplicates -> Re-validated (All rules pass).' }
    ],
    aiAction: '🛠️ Zero-Touch Fix & Audit',
    aiDetails: [
      'Strategy: Rule-based duplicate removal.',
      'Logged: System (Auto-Correction) removed 42 rows at 09:02 AM. Reason: ETL job ran twice.',
      'Notified Morgan: "Revenue corrected from ₹8,500 Cr to ₹8,450 Cr".'
    ],
    outcome: 'Morgan clicks "Refresh" → Revenue updated. Zero touch required.'
  },
  {
    day: 'Day 4 — 11:00 AM',
    title: 'Compliance Team Prepares for Audit',
    actor: 'Compliance Team',
    action: 'Regulatory audit requires definition history of RWA used in Q3.',
    color: '#10B981',
    details: [
      { label: 'Audit Portal', text: 'Searches "RWA" -> Results in 0.5 seconds.' },
      { label: 'View History', text: 'v3.0.0 (Initial) -> v3.1.0 (Added market risk) -> v3.2.0 (Updated weightings).' },
      { label: 'Lineage', text: 'RWA -> risk_assets.asset_value × risk_weight. Used in Board Report & Regulatory Submission.' }
    ],
    aiAction: '📜 Audit Engine V3',
    aiDetails: [
      'Logs every change: who created, who updated, who approved.',
      'Generates interactive column-level lineage and impact analysis.',
      'Export PDF with full audit trail in 2 seconds.'
    ],
    outcome: 'Audit response sent to regulator in 1 hour (historically took 7 days).'
  },
  {
    day: 'Day 5 — 09:00 AM',
    title: 'Board Presentation',
    actor: 'Diana (CFO)',
    action: 'Presents quarterly numbers to the Board of Directors.',
    color: '#F43F5E',
    details: [
      { label: 'Final Numbers', text: 'Revenue: ₹8,450 Cr ✅ | Profit: ₹2,100 Cr ✅ | RWA: ₹4,200 Cr ✅ | CAR: 18.5% ✅' },
      { label: 'Board Query 1', text: '"Where does this data come from?" -> Diana opens lineage: "Snowflake → semantic layer → validated".' },
      { label: 'Board Query 2', text: '"Who approved the changes?" -> Diana opens audit trail: "Approved by Priya and Diana".' }
    ],
    aiAction: '🏆 End Result: Trust in Every Number',
    aiDetails: [
      'No debates over data accuracy.',
      'Total transparent lineage presented live.',
      'Sign-off received in 2 hours.'
    ],
    outcome: 'Before V3: 14 days, 20 people, ₹2 Cr cost. After V3: 5 days, 5 people, ₹20 Lakh cost. 90% faster.'
  }
];

export default function HowItWorks() {
  
  // Basic scroll reveal animation
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.scroll-reveal').forEach(el => observer.observe(el));
    
    return () => observer.disconnect();
  }, []);

  return (
    <div style={{ minHeight: '100vh', background: '#0F172A', color: '#F8FAFC', paddingBottom: '100px', fontFamily: '"Inter", sans-serif' }}>
      
      {/* Header */}
      <div style={{ background: 'linear-gradient(to right, #1E293B, #0F172A)', borderBottom: '1px solid rgba(255,255,255,0.05)', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }} onClick={() => window.location.href = '/'}>
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'linear-gradient(135deg, #00BFA5 0%, #00897B 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ color: '#fff', fontWeight: 'bold', fontSize: '18px' }}>D</span>
            </div>
            <span style={{ fontSize: '20px', fontWeight: '700', letterSpacing: '-0.02em', color: '#fff' }}>DataTrust V3.0</span>
          </div>
          <button onClick={() => window.close()} style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', color: '#CBD5E1', padding: '8px 16px', borderRadius: '6px', fontSize: '14px', cursor: 'pointer', transition: 'all 0.2s' }}>
            Close Tab
          </button>
        </div>
      </div>

      {/* Hero Section */}
      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '80px 40px 40px', textAlign: 'center' }} className="scroll-reveal fade-up">
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(0,191,165,0.1)', border: '1px solid rgba(0,191,165,0.2)', padding: '6px 16px', borderRadius: '20px', marginBottom: '24px' }}>
          <span style={{ color: '#00BFA5', fontSize: '12px', fontWeight: '600', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Real-World Scenario</span>
        </div>
        <h1 style={{ fontSize: '48px', fontWeight: '800', marginBottom: '24px', letterSpacing: '-0.03em', background: 'linear-gradient(to right, #FFFFFF, #94A3B8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Global Investment Bank <br />Quarterly Board Reporting
        </h1>
        <p style={{ fontSize: '18px', color: '#94A3B8', lineHeight: '1.6', maxWidth: '800px', margin: '0 auto' }}>
          See how <b>DataTrust V3.0</b> transforms a chaotic 14-day financial reporting cycle into a smooth, automated 5-day flow using the AI-First Intelligence Layer.
        </p>
        
        {/* At a glance stats */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '24px', marginTop: '60px', flexWrap: 'wrap' }}>
          <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', padding: '24px', borderRadius: '16px', width: '220px', textAlign: 'left' }}>
            <div style={{ color: '#94A3B8', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>Reporting Time</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px' }}>
              <span style={{ fontSize: '32px', fontWeight: '700', color: '#00BFA5' }}>5 Days</span>
              <span style={{ fontSize: '14px', color: '#EF4444', textDecoration: 'line-through' }}>14 Days</span>
            </div>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', padding: '24px', borderRadius: '16px', width: '220px', textAlign: 'left' }}>
            <div style={{ color: '#94A3B8', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>People Involved</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px' }}>
              <span style={{ fontSize: '32px', fontWeight: '700', color: '#3B82F6' }}>5 People</span>
              <span style={{ fontSize: '14px', color: '#EF4444', textDecoration: 'line-through' }}>20 People</span>
            </div>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', padding: '24px', borderRadius: '16px', width: '220px', textAlign: 'left' }}>
            <div style={{ color: '#94A3B8', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>Cost / Quarter</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px' }}>
              <span style={{ fontSize: '32px', fontWeight: '700', color: '#8B5CF6' }}>₹20L</span>
              <span style={{ fontSize: '14px', color: '#EF4444', textDecoration: 'line-through' }}>₹2Cr</span>
            </div>
          </div>
        </div>
      </div>

      {/* Timeline Section */}
      <div style={{ maxWidth: '900px', margin: '80px auto 0', padding: '0 40px' }}>
        <div style={{ position: 'relative' }}>
          
          {/* Main vertical line */}
          <div style={{ position: 'absolute', top: '0', bottom: '0', left: '40px', width: '2px', background: 'rgba(255,255,255,0.1)' }}></div>

          {timelineData.map((item, idx) => (
            <div key={idx} className="scroll-reveal fade-up" style={{ position: 'relative', paddingLeft: '100px', marginBottom: '80px' }}>
              
              {/* Timeline dot */}
              <div style={{ position: 'absolute', left: '33px', top: '24px', width: '16px', height: '16px', borderRadius: '50%', background: '#0F172A', border: `3px solid ${item.color}`, boxShadow: `0 0 10px ${item.color}80`, zIndex: 2 }}></div>
              
              {/* Day Badge */}
              <div style={{ display: 'inline-block', background: `${item.color}15`, color: item.color, padding: '6px 12px', borderRadius: '6px', fontSize: '12px', fontWeight: '700', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '16px' }}>
                {item.day}
              </div>

              {/* Card */}
              <div style={{ background: '#1E293B', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.3)' }}>
                
                {/* User Action Header */}
                <div style={{ padding: '32px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
                    <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}>
                      🧑‍💻
                    </div>
                    <div>
                      <h3 style={{ fontSize: '22px', fontWeight: '700', margin: '0 0 4px', color: '#fff' }}>{item.title}</h3>
                      <div style={{ color: '#94A3B8', fontSize: '14px' }}>{item.actor} — {item.action}</div>
                    </div>
                  </div>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '24px' }}>
                    {item.details.map((detail, dIdx) => (
                      <div key={dIdx} style={{ background: 'rgba(0,0,0,0.2)', padding: '12px 16px', borderRadius: '8px', borderLeft: `2px solid ${item.color}40`, fontSize: '14px' }}>
                        <span style={{ fontWeight: '600', color: '#CBD5E1', marginRight: '8px' }}>{detail.label}:</span>
                        <span style={{ color: '#94A3B8', fontFamily: 'var(--font-mono, monospace)' }}>{detail.text}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* AI Action Footer */}
                <div style={{ background: `linear-gradient(to right, rgba(0,0,0,0.4), rgba(0,0,0,0.2))`, padding: '24px 32px' }}>
                  <div style={{ fontSize: '14px', fontWeight: '700', color: item.color, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: item.color, boxShadow: `0 0 8px ${item.color}` }}></div>
                    {item.aiAction}
                  </div>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '24px' }}>
                    {item.aiDetails.map((aiDetail, aIdx) => (
                      <div key={aIdx} style={{ fontSize: '13px', color: '#94A3B8', display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                        <span style={{ color: '#475569', marginTop: '2px' }}>▹</span>
                        <span dangerouslySetInnerHTML={{ __html: aiDetail.replace(/(✅|⚠️|❌)/g, '<b>$1</b>') }}></span>
                      </div>
                    ))}
                  </div>

                  <div style={{ background: `${item.color}10`, border: `1px dashed ${item.color}40`, padding: '16px', borderRadius: '8px', display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                    <span style={{ fontSize: '18px' }}>🎯</span>
                    <div>
                      <div style={{ fontSize: '12px', color: item.color, fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px' }}>Business Outcome</div>
                      <div style={{ fontSize: '14px', color: '#F8FAFC', fontWeight: '500', lineHeight: '1.5' }}>{item.outcome}</div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          ))}

        </div>
      </div>
      
      {/* Conclusion */}
      <div style={{ maxWidth: '800px', margin: '40px auto 0', textAlign: 'center', padding: '40px', background: 'rgba(255,255,255,0.02)', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.05)' }} className="scroll-reveal fade-up">
        <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(0,191,165,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#00BFA5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
        </div>
        <h2 style={{ fontSize: '32px', fontWeight: '700', marginBottom: '16px', color: '#fff' }}>Trust in Every Number.</h2>
        <p style={{ color: '#94A3B8', fontSize: '16px', lineHeight: '1.6', marginBottom: '32px' }}>
          By shifting from reactive data firefighting to proactive AI-first intelligence, DataTrust empowers enterprise teams to close books faster, with absolute confidence and a 100% auditable trail.
        </p>
        <button onClick={() => window.location.href = '/?view=workspace'} style={{ background: 'linear-gradient(135deg, #00BFA5 0%, #00897B 100%)', color: '#fff', border: 'none', padding: '16px 32px', borderRadius: '8px', fontSize: '16px', fontWeight: '600', cursor: 'pointer', boxShadow: '0 10px 20px rgba(0,191,165,0.3)', transition: 'all 0.3s' }}>
          Try DataTrust V3 Workspace
        </button>
      </div>

    </div>
  );
}
