import React, { useState } from 'react';

// Comprehensive Q&A data for the VC Interrogator Simulator
const qaSimulatorData = [
  {
    q: "How will you compete with Microsoft Purview + Copilot?",
    a: "Purview is a massive, slow-moving compliance database built for IT admins, not business analysts. Microsoft's Copilot in Excel helps write formulas, but it does NOT enforce semantic layers or catch anomalies on the DWH. DataTrust's key advantage is execution speed and single-minded focus. We bridge Snowflake/Databricks to Excel with zero-touch auto-correction and pgvector semantic query routing. We land, configure, and demonstrate value in 1 day—Microsoft Purview takes 6 months of enterprise consulting.",
    avatar: "MR",
    name: "Manoj Singh Rajput",
    category: "strategy"
  },
  {
    q: "What is your GTM (Go-To-Market) strategy and Customer Acquisition Cost (CAC)?",
    a: "Our customer acquisition strategy is highly optimized with an estimated CAC of ₹5-10 Lakh, resulting in a 3-6 month payback period. We target enterprise divisions utilizing Snowflake/Databricks. We start with a single team (e.g. Finance or Supply Chain) using a 'land-and-expand' play at ₹10-15 Lakh/month. Once they experience Q&A in plain English without SQL/DAX errors, we expand to other departments and unlock enterprise-level subscriptions.",
    avatar: "SL",
    name: "Sushil Lalhal",
    category: "gtm"
  },
  {
    q: "What is the technical moat of DataTrust V3.0?",
    a: "Our moat consists of three core layers. First, our self-learning Rule Inference V2 automatically learns normal data parameters from DWH history, meaning zero manual rule configuration for developers. Second, our pgvector hybrid RAG router translates plain English to safe, verified queries in under 2 seconds. Third, our Auto-Correction engine corrects Excel column shifts and formats silently, rolling back changes if constraints fail. Competitors only track data catalog metadata; we govern the operational spreadsheets dynamically.",
    avatar: "MR",
    name: "Manoj Singh Rajput",
    category: "tech"
  },
  {
    q: "How do you handle offline access and security compliance?",
    a: "Security is non-negotiable for Fortune 500 clients. DataTrust V3.0 supports air-gapped enclaves deployed via local Kubernetes nodes. All telemetry is encrypted via AES-256 and TLS 1.3, and column-level masking (PII, ITARspec) is applied at the proxy node before cell outputs are populated. Our append-only PostgreSQL ledger records every sync event, keeping audit cycles compliant with HIPAA, GDPR, and SOX guidelines.",
    avatar: "SL",
    name: "Sushil Lalhal",
    category: "tech"
  },
  {
    q: "What is your biggest risk, and how do you mitigate it?",
    a: "Our biggest risk is big cloud players copycatting our Excel connectivity or long sales cycles. We mitigate this by executing at rapid startup speed to capture early adopters before incumbents can react. On the sales side, we use a friction-free 'land-and-expand' model. Our platform is built on Kubernetes, Redis, and Kafka for horizontal scaling, with SOC2, GDPR, and HIPAA security compliance standard from Day 1.",
    avatar: "SL",
    name: "Sushil Lalhal",
    category: "strategy"
  },
  {
    q: "What are your main customer acquisition channels?",
    a: "We acquire customers through four main channels: 1) Inbound thought leadership and webinars on spreadsheet compliance (CAC: ₹2-5L). 2) Direct outbound campaigns to CFO offices and Heads of Analytics facing manual reconciliation overheads (CAC: ₹5-10L). 3) CDW partnerships with Snowflake and Databricks who recommend us to solve data extraction pain (CAC: ₹3-8L). 4) Referral loops with early adopter incentives.",
    avatar: "MR",
    name: "Manoj Singh Rajput",
    category: "gtm"
  },
  {
    q: "What is your churn rate projection, and how do you keep customers?",
    a: "We project annual logo churn under 10% and Net Revenue Retention (NRR) above 120%. DataTrust acts as a mission-critical governance bridge. Once embedded in financial, operational, and board reporting workflows, the switching cost is extremely high. We maintain this stickiness with dedicated Customer Success Managers (CSMs) who map ROI metrics and ensure smooth data flows daily.",
    avatar: "SL",
    name: "Sushil Lalhal",
    category: "gtm"
  },
  {
    q: "What do your unit economics look like?",
    a: "We operate with standard software-as-a-service gross margins of 85-90%. Annual Contract Value (ACV) ranges between ₹1.0 Cr - ₹1.8 Cr for Enterprises and ₹60L - ₹1.5 Cr for Mid-Market clients. With a low hosting and compute cost per tenant (~₹10-15L/year) and CAC at ₹8-10L, our LTV is ₹5-9 Cr per enterprise client, creating a strong LTV/CAC ratio of 6-9x.",
    avatar: "MR",
    name: "Manoj Singh Rajput",
    category: "gtm"
  },
  {
    q: "What is your competition's weakness, and how will you exploit it?",
    a: "Our competitors leave a massive gap: Collibra and Atlan focus only on technical databases, leaving Excel as a blind spot. Monte Carlo provides data quality pipelines for engineers, but has no business user interface or NLQ. Microsoft Purview is complex to configure and lacks active semantic enforcement in spreadsheets. We attack by going directly to the business user's canvas—Excel—and wrapping it in an invisible governance blanket.",
    avatar: "MR",
    name: "Manoj Singh Rajput",
    category: "strategy"
  },
  {
    q: "What is your team's biggest achievement so far?",
    a: "We are not a concept-stage company; we have fully built and launched V2.0 with a functional codebase. We have closed 1 pilot customer who uses DataTrust for board reporting (saving them 8 hours of manual Monday reconciliation in 10 minutes), validated our scalable architecture (Kafka, Kubernetes, pgvector, LangChain), and bootstrapped the entire development phase self-funded.",
    avatar: "MR",
    name: "Manoj Singh Rajput",
    category: "tech"
  },
  {
    q: "What will you spend the raised capital on?",
    a: "We will allocate the Seed funding into four key areas: 40% on Product Development (finalizing Predictive Quality, Auto-Correction V2, and the Excel ribbon V3), 35% on Sales & Marketing (hiring enterprise reps and CDW channel setups), 15% on Operations and compliance audits (SOC2 certification), and a 10% administrative contingency buffer.",
    avatar: "SL",
    name: "Sushil Lalhal",
    category: "gtm"
  },
  {
    q: "What is your 5-year growth vision?",
    a: "Our 5-year vision is to become the default governance bridge for spreadsheet users globally. By Year 2, we target 50-150 enterprise customers. By Year 4, we scale to 300-500 clients across APAC. By Year 5, we plan to scale to 1,000+ enterprises, generating ₹800 - ₹1,600 Cr ($100M - $200M) ARR at a valuation of $1B - $3B.",
    avatar: "MR",
    name: "Manoj Singh Rajput",
    category: "strategy"
  },
  {
    q: "What is your capital ask and investor profile?",
    a: "We are raising a $1.0M - $2.0M (₹8-16 Cr) Seed round for 10-20% equity. Beyond capital, we are looking for strategic venture partners who can introduce us to CFO networks, accelerate our listings in Snowflake and Databricks directories, and guide us through scaling enterprise sales organizations.",
    avatar: "SL",
    name: "Sushil Lalhal",
    category: "strategy"
  }
];

export default function InvestorPitch() {
  const [activeTab, setActiveTab] = useState('why-idea'); // why-idea | team | why-now | market | funding
  const [interrogatorQId, setInterrogatorQId] = useState(0);
  const [qFilter, setQFilter] = useState('all'); // all | strategy | tech | gtm
  const [customQuestion, setCustomQuestion] = useState('');
  const [customAnswer, setCustomAnswer] = useState(null);
  const [isTyping, setIsTyping] = useState(false);

  // Filtered preset questions for simulator
  const filteredQA = qaSimulatorData.filter(item => qFilter === 'all' || item.category === qFilter);
  const activeQA = filteredQA[interrogatorQId] || filteredQA[0] || qaSimulatorData[0];

  const handleAskQuestion = (e) => {
    e.preventDefault();
    if (!customQuestion.trim()) return;
    setIsTyping(true);
    setCustomAnswer(null);
    setTimeout(() => {
      setIsTyping(false);
      setCustomAnswer(
        `That is a critical scaling challenge. DataTrust's architecture specifically addresses '${customQuestion}' by routing metadata updates through our centralized Semantic Layer. This guarantees that whether you scale to 50 users or 5,000, definitions remain locked and auditable, keeping data drift to exactly 0%.`
      );
    }, 1200);
  };

  return (
    <div style={{ minHeight: '100vh', background: '#020617', color: '#F8FAFC', fontFamily: '"Inter", sans-serif', paddingTop: '80px', paddingBottom: '100px' }}>
      
      {/* Dynamic Style Accents */}
      <style>{`
        .pitch-tab-btn {
          padding: 14px 24px;
          border-radius: 8px;
          border: 1px solid rgba(255,255,255,0.05);
          font-weight: 700;
          font-size: 14px;
          background: rgba(255,255,255,0.03);
          color: #94A3B8;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .pitch-tab-btn:hover {
          color: #FFF;
          background: rgba(255,255,255,0.06);
          border-color: rgba(255,255,255,0.15);
        }
        .pitch-tab-btn.active {
          background: #00BFA5;
          color: #020617;
          border-color: #00BFA5;
          box-shadow: 0 4px 15px rgba(0,191,165,0.3);
        }
        .pitch-card {
          background: linear-gradient(145deg, #0b0f19 0%, #151e33 100%);
          border: 1px solid rgba(99, 102, 241, 0.2);
          border-radius: 24px;
          padding: 40px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
          margin-bottom: 40px;
        }
        .glow-neon-purple {
          box-shadow: 0 0 25px rgba(99, 102, 241, 0.15);
        }
        .timeline-box {
          position: relative;
          padding-left: 28px;
          border-left: 2px solid rgba(0,191,165,0.2);
          padding-bottom: 24px;
        }
        .timeline-box::before {
          content: '';
          position: absolute;
          left: -6px;
          top: 0;
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: #00BFA5;
          box-shadow: 0 0 8px #00BFA5;
        }
        .timeline-box:last-child {
          border-left: none;
        }
        .filter-btn {
          padding: 6px 12px;
          border-radius: 6px;
          font-size: 11px;
          font-weight: 700;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.06);
          color: #94A3B8;
          cursor: pointer;
          text-transform: uppercase;
          transition: all 0.2s;
        }
        .filter-btn.active {
          background: #6366F1;
          color: #FFF;
          border-color: #6366F1;
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        .economic-pill {
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.05);
          border-radius: 12px;
          padding: 16px;
        }
        .progress-bar-fill {
          height: 100%;
          border-radius: 4px;
          background: linear-gradient(90deg, #00BFA5, #6366F1);
        }
      `}</style>

      {/* Header Section */}
      <div style={{ textAlign: 'center', marginBottom: '48px', padding: '0 20px' }}>
        <div style={{ 
          display: 'inline-block', 
          padding: '6px 16px', 
          background: 'rgba(99, 102, 241, 0.1)', 
          border: '1px solid rgba(99, 102, 241, 0.25)', 
          borderRadius: '20px', 
          color: '#818CF8', 
          fontSize: '13px', 
          fontWeight: '600', 
          letterSpacing: '1px', 
          marginBottom: '20px' 
        }}>
          FOUNDER'S PITCH TO INVESTORS
        </div>
        <h1 style={{ fontSize: '46px', fontWeight: '800', marginBottom: '16px', letterSpacing: '-1.5px', fontFamily: '"Space Grotesk", sans-serif' }}>
          DataTrust V3.0 <span style={{ background: 'linear-gradient(135deg, #00BFA5 0%, #6366F1 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Seed Round Pitch</span>
        </h1>
        <p style={{ fontSize: '18px', color: '#94A3B8', maxWidth: '800px', margin: '0 auto', lineHeight: '1.6' }}>
          Excel is the operating system of business, but it's outside the enterprise governance bubble. We bridge this $100B market gap.
        </p>

        {/* Tabs navigation */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginTop: '36px', flexWrap: 'wrap' }}>
          <button 
            onClick={() => setActiveTab('why-idea')}
            className={`pitch-tab-btn ${activeTab === 'why-idea' ? 'active' : ''}`}
          >
            💡 1. Why This Idea?
          </button>
          <button 
            onClick={() => setActiveTab('team')}
            className={`pitch-tab-btn ${activeTab === 'team' ? 'active' : ''}`}
          >
            👥 2. Why Founders & Traction?
          </button>
          <button 
            onClick={() => setActiveTab('why-now')}
            className={`pitch-tab-btn ${activeTab === 'why-now' ? 'active' : ''}`}
          >
            ⏱️ 3. Why Now?
          </button>
          <button 
            onClick={() => setActiveTab('market')}
            className={`pitch-tab-btn ${activeTab === 'market' ? 'active' : ''}`}
          >
            📈 4. Market & Economics
          </button>
          <button 
            onClick={() => setActiveTab('funding')}
            className={`pitch-tab-btn ${activeTab === 'funding' ? 'active' : ''}`}
          >
            💰 5. Ask & Vision
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
        
        {/* TAB 1: WHY THIS IDEA */}
        {activeTab === 'why-idea' && (
          <div className="pitch-card glow-neon-purple">
            <h2 style={{ fontSize: '26px', fontWeight: '800', color: '#FFF', marginBottom: '8px', fontFamily: '"Space Grotesk", sans-serif' }}>
              Why This Idea? Data governance is broken, and Excel is the culprit.
            </h2>
            <p style={{ color: '#94A3B8', fontSize: '15px', marginBottom: '28px' }}>
              Every enterprise runs on spreadsheets. Over 1.2 Billion users manage financial planning, budgets, and operational yields in Excel, but these files live outside corporate data validation systems.
            </p>

            {/* Pain point grids */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '40px' }}>
              <div style={{ padding: '24px', background: 'rgba(239, 68, 68, 0.02)', border: '1px solid rgba(239, 68, 68, 0.1)', borderRadius: '16px' }}>
                <span style={{ fontSize: '24px', fontWeight: '800', color: '#EF4444', display: 'block', fontFamily: '"Space Grotesk", sans-serif' }}>70%</span>
                <span style={{ fontSize: '12px', color: '#64748b', fontWeight: '700', textTransform: 'uppercase', display: 'block', margin: '4px 0 8px' }}>CFO Spreadsheets</span>
                <p style={{ fontSize: '13.5px', color: '#CBD5E1', lineHeight: '1.5' }}>Of corporate finance offices rely heavily on Excel for planning and forecasts, with zero audits or version control.</p>
              </div>

              <div style={{ padding: '24px', background: 'rgba(245, 158, 11, 0.02)', border: '1px solid rgba(245, 158, 11, 0.1)', borderRadius: '16px' }}>
                <span style={{ fontSize: '24px', fontWeight: '800', color: '#F59E0B', display: 'block', fontFamily: '"Space Grotesk", sans-serif' }}>88%</span>
                <span style={{ fontSize: '12px', color: '#64748b', fontWeight: '700', textTransform: 'uppercase', display: 'block', margin: '4px 0 8px' }}>Spreadsheet Errors</span>
                <p style={{ fontSize: '13.5px', color: '#CBD5E1', lineHeight: '1.5' }}>Of spreadsheet models contain material formula defects, leading to over $100 Billion in annual global losses.</p>
              </div>

              <div style={{ padding: '24px', background: 'rgba(99, 102, 241, 0.02)', border: '1px solid rgba(99, 102, 241, 0.1)', borderRadius: '16px' }}>
                <span style={{ fontSize: '24px', fontWeight: '800', color: '#818CF8', display: 'block', fontFamily: '"Space Grotesk", sans-serif' }}>0%</span>
                <span style={{ fontSize: '12px', color: '#64748b', fontWeight: '700', textTransform: 'uppercase', display: 'block', margin: '4px 0 8px' }}>Semantic Harmony</span>
                <p style={{ fontSize: '13.5px', color: '#CBD5E1', lineHeight: '1.5' }}>Marketing, sales, and finance define key metrics differently. Board meetings become debates about data, not strategy.</p>
              </div>
            </div>

            {/* Gap Analysis Table */}
            <h3 style={{ fontSize: '18px', color: '#FFF', fontWeight: '700', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '1px' }}>
              Existing Solutions vs The DataTrust Approach
            </h3>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px', background: 'rgba(0,0,0,0.2)', borderRadius: '12px', overflow: 'hidden', marginBottom: '40px' }}>
              <thead>
                <tr style={{ background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                  <th style={{ padding: '12px 16px', textAlign: 'left', color: '#94A3B8' }}>Existing Solutions</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left', color: '#94A3B8' }}>What They Miss</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left', color: '#00BFA5' }}>DataTrust V3.0 Value</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                  <td style={{ padding: '14px 16px', fontWeight: '600', color: '#FFF' }}>Governance Platforms (Collibra, Atlan)</td>
                  <td style={{ padding: '14px 16px', color: '#CBD5E1' }}>Heavy, technical catalogs. Excel sits entirely outside their bubble.</td>
                  <td style={{ padding: '14px 16px', color: '#00BFA5', fontWeight: '600' }}>Governs data *inside* Excel where users work.</td>
                </tr>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                  <td style={{ padding: '14px 16px', fontWeight: '600', color: '#FFF' }}>BI Tools (Power BI, Tableau)</td>
                  <td style={{ padding: '14px 16px', color: '#CBD5E1' }}>Static dashboard reporting. Users still export to Excel to manipulate tables.</td>
                  <td style={{ padding: '14px 16px', color: '#00BFA5', fontWeight: '600' }}>Direct read-write pipeline to DWH with zero stale exports.</td>
                </tr>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                  <td style={{ padding: '14px 16px', fontWeight: '600', color: '#FFF' }}>Excel Add-ins (Copilot, GPT for Work)</td>
                  <td style={{ padding: '14px 16px', color: '#CBD5E1' }}>Help write formulas, but offer no data quality, no compliance logs, and no central rules.</td>
                  <td style={{ padding: '14px 16px', color: '#00BFA5', fontWeight: '600' }}>AI rule inference checks and auto-documentation.</td>
                </tr>
              </tbody>
            </table>

            {/* Founder quote */}
            <div style={{ padding: '24px', background: 'rgba(0, 191, 165, 0.03)', borderLeft: '4px solid #00BFA5', borderRadius: '8px', fontStyle: 'italic', color: '#E2E8F0', fontSize: '15px' }}>
              "DataTrust is the platform I wished existed when I watched finance teams spend entire Mondays manually exporting data and reconciling numbers that still didn't match." — Manoj Singh Rajput
            </div>
          </div>
        )}

        {/* TAB 2: WHY FOUNDERS & TRACTION */}
        {activeTab === 'team' && (
          <div className="pitch-card glow-neon-purple">
            <h2 style={{ fontSize: '26px', fontWeight: '800', color: '#FFF', marginBottom: '8px', fontFamily: '"Space Grotesk", sans-serif' }}>
              Why Us? We lived the problem. We didn't read about it in an analyst report.
            </h2>
            <p style={{ color: '#94A3B8', fontSize: '15px', marginBottom: '32px' }}>
              DataTrust is built by a team combining deep data architecture backgrounds with enterprise software operations experience.
            </p>

            {/* Founders profile */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', marginBottom: '40px' }}>
              
              {/* Manoj */}
              <div style={{ background: 'rgba(255, 255, 255, 0.02)', padding: '30px', borderRadius: '20px', border: '1px solid rgba(255, 255, 255, 0.04)' }}>
                <div style={{ display: 'flex', gap: '16px', alignItems: 'center', marginBottom: '16px' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#00BFA5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', color: '#020617', fontSize: '18px' }}>
                    MR
                  </div>
                  <div>
                    <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#FFF', margin: 0 }}>Manoj Singh Rajput</h3>
                    <span style={{ fontSize: '12px', color: '#6366F1', fontWeight: '600' }}>FOUNDER & CREATOR</span>
                  </div>
                </div>
                <div style={{ fontSize: '12px', color: '#64748b', fontWeight: '700', textTransform: 'uppercase', marginBottom: '6px' }}>Areas of Focus</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '16px' }}>
                  {['Data Engineering', 'Enterprise SaaS', 'AI/ML', 'Data Governance'].map(tag => (
                    <span key={tag} style={{ padding: '4px 8px', borderRadius: '4px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', color: '#CBD5E1', fontSize: '11px' }}>{tag}</span>
                  ))}
                </div>
                <p style={{ fontSize: '13.5px', color: '#94A3B8', lineHeight: '1.6' }}>
                  "I've sat with corporate analysts who spend entire days copy-pasting numbers that still had errors. We understand the technical math of data engines AND the exact business workflow of Excel users."
                </p>
              </div>

              {/* Sushil */}
              <div style={{ background: 'rgba(255, 255, 255, 0.02)', padding: '30px', borderRadius: '20px', border: '1px solid rgba(255, 255, 255, 0.04)' }}>
                <div style={{ display: 'flex', gap: '16px', alignItems: 'center', marginBottom: '16px' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#6366F1', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', color: '#FFF', fontSize: '18px' }}>
                    SL
                  </div>
                  <div>
                    <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#FFF', margin: 0 }}>Sushil Lalhal</h3>
                    <span style={{ fontSize: '12px', color: '#6366F1', fontWeight: '600' }}>CO-FOUNDER</span>
                  </div>
                </div>
                <div style={{ fontSize: '12px', color: '#64748b', fontWeight: '700', textTransform: 'uppercase', marginBottom: '6px' }}>Areas of Focus</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '16px' }}>
                  {['Backend Systems', 'Cloud Architecture', 'Data Pipelines', 'Security'].map(tag => (
                    <span key={tag} style={{ padding: '4px 8px', borderRadius: '4px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', color: '#CBD5E1', fontSize: '11px' }}>{tag}</span>
                  ))}
                </div>
                <p style={{ fontSize: '13.5px', color: '#94A3B8', lineHeight: '1.6' }}>
                  "My focus is scale, security, and air-gapped system stability. We design the backend to run 1-second audit queries and handle billions of rows of stream telemetry without lags."
                </p>
              </div>

            </div>

            {/* Traction & Achievements */}
            <h3 style={{ fontSize: '18px', color: '#FFF', fontWeight: '700', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '1px' }}>
              Our Traction & Major Achievements
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '40px' }}>
              <div style={{ background: 'rgba(0,191,165,0.02)', border: '1px solid rgba(0,191,165,0.1)', padding: '20px', borderRadius: '16px' }}>
                <span style={{ color: '#00BFA5', fontWeight: '800', fontSize: '15px', display: 'block', marginBottom: '8px' }}>🚀 Working Codebase (V2.0 Launched)</span>
                <p style={{ fontSize: '13.5px', color: '#CBD5E1', lineHeight: '1.5' }}>This is not a concept or PowerPoint-only company. Our active product is currently deployed, providing semantic sync, telemetry pipelines, and core schema validation services.</p>
              </div>
              <div style={{ background: 'rgba(0,191,165,0.02)', border: '1px solid rgba(0,191,165,0.1)', padding: '20px', borderRadius: '16px' }}>
                <span style={{ color: '#00BFA5', fontWeight: '800', fontSize: '15px', display: 'block', marginBottom: '8px' }}>🎯 1 Closed Pilot Customer & 5 Active Leads</span>
                <p style={{ fontSize: '13.5px', color: '#CBD5E1', lineHeight: '1.5' }}>A scaling pilot is actively using DataTrust for board reporting, compressing a weekly 8-hour manual spreadsheet compilation process down to exactly 10 minutes.</p>
              </div>
              <div style={{ background: 'rgba(0,191,165,0.02)', border: '1px solid rgba(0,191,165,0.1)', padding: '20px', borderRadius: '16px' }}>
                <span style={{ color: '#00BFA5', fontWeight: '800', fontSize: '15px', display: 'block', marginBottom: '8px' }}>🛠️ Validated Cloud Architecture</span>
                <p style={{ fontSize: '13.5px', color: '#CBD5E1', lineHeight: '1.5' }}>Built on robust microservices: Kubernetes orchestration, Redis caching, pgvector hybrid RAG indexing, and LangChain agents mapping definitions deterministically.</p>
              </div>
              <div style={{ background: 'rgba(0,191,165,0.02)', border: '1px solid rgba(0,191,165,0.1)', padding: '20px', borderRadius: '16px' }}>
                <span style={{ color: '#00BFA5', fontWeight: '800', fontSize: '15px', display: 'block', marginBottom: '8px' }}>💰 Bootstrapped Financial Discipline</span>
                <p style={{ fontSize: '13.5px', color: '#CBD5E1', lineHeight: '1.5' }}>Built entirely via self-funded bootstrapping. Every single rupee goes directly into pipeline optimization, engineering quality, and client pilots.</p>
              </div>
            </div>

            {/* Moat indicators */}
            <div style={{ background: 'rgba(99, 102, 241, 0.04)', padding: '24px', borderRadius: '16px', border: '1px solid rgba(99, 102, 241, 0.1)' }}>
              <span style={{ fontSize: '12px', fontWeight: '800', color: '#818CF8', textTransform: 'uppercase', letterSpacing: '1px', display: 'block', marginBottom: '12px' }}>
                Key Moats That Differentiate Us:
              </span>
              <ul style={{ paddingLeft: '16px', color: '#CBD5E1', fontSize: '13.5px', display: 'flex', flexDirection: 'column', gap: '10px', lineHeight: '1.5' }}>
                <li><b>Excel-Native Hook:</b> We deliver governance in the spreadsheet ribbon where business users already live, rather than asking them to learn BI dashboards or SQL.</li>
                <li><b>AI-Powered Autoregulation:</b> Machine learning inference autogenerates quality metrics from query logs, removing rule creation bottlenecks.</li>
                <li><b>Multi-Cloud Agnostic:</b> Bridges Snowflake, Databricks, Redshift, and Fabric natively with zero vendor lock-in.</li>
              </ul>
            </div>
          </div>
        )}

        {/* TAB 3: WHY NOW */}
        {activeTab === 'why-now' && (
          <div className="pitch-card glow-neon-purple">
            <h2 style={{ fontSize: '26px', fontWeight: '800', color: '#FFF', marginBottom: '8px', fontFamily: '"Space Grotesk", sans-serif' }}>
              Why Now? A perfect convergence of market trends.
            </h2>
            <p style={{ color: '#94A3B8', fontSize: '15px', marginBottom: '32px' }}>
              Three macro trends have converged to make DataTrust V3.0 the right solution at the right time.
            </p>

            {/* Timelines of Opportunity */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', marginBottom: '40px' }}>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div className="timeline-box">
                  <span style={{ fontSize: '13px', color: '#00BFA5', fontWeight: '700', fontFamily: 'monospace' }}>1. AI Is Table Stakes</span>
                  <p style={{ fontSize: '13.5px', color: '#CBD5E1', marginTop: '4px', lineHeight: '1.5' }}>Every enterprise is attempting to deploy AI agents. However, AI is useless without clean, validated data context. DataTrust establishes this context.</p>
                </div>
                <div className="timeline-box">
                  <span style={{ fontSize: '13px', color: '#00BFA5', fontWeight: '700', fontFamily: 'monospace' }}>2. Data Governance Mandates</span>
                  <p style={{ fontSize: '13.5px', color: '#CBD5E1', marginTop: '4px', lineHeight: '1.5' }}>DPDP Act in India, GDPR in Europe, and SOX in the US mean compliance is no longer optional. Excel spreadsheets are the #1 compliance audit risk.</p>
                </div>
                <div className="timeline-box">
                  <span style={{ fontSize: '13px', color: '#00BFA5', fontWeight: '700', fontFamily: 'monospace' }}>3. Spreadsheets Are Here to Stay</span>
                  <p style={{ fontSize: '13.5px', color: '#CBD5E1', marginTop: '4px', lineHeight: '1.5' }}>1.2 Billion users are not going to leave Excel. The solution must integrate directly into their workbooks rather than forcing them to learn SQL.</p>
                </div>
              </div>

              {/* Timing constraints explanation */}
              <div style={{ background: 'rgba(255,255,255,0.02)', padding: '28px', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.04)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <span style={{ fontSize: '12px', fontWeight: '800', color: '#EF4444', textTransform: 'uppercase' }}>Why not 2 years ago?</span>
                  <p style={{ fontSize: '13.5px', color: '#94A3B8', marginTop: '4px', lineHeight: '1.5' }}>
                    OpenAI/Groq LLM API integrations were not cheap or fast enough, vector databases like pgvector were not mature, and enterprises were not yet desperate about AI data readiness.
                  </p>
                </div>
                <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '16px' }}>
                  <span style={{ fontSize: '12px', fontWeight: '800', color: '#F59E0B', textTransform: 'uppercase' }}>Why not 2 years later?</span>
                  <p style={{ fontSize: '13.5px', color: '#94A3B8', marginTop: '4px', lineHeight: '1.5' }}>
                    Major database and cloud providers will attempt to build Excel connectors, but their solutions will be slow, generic, and expensive. We have a first-mover advantage right now.
                  </p>
                </div>
              </div>

            </div>

            <div style={{ background: 'rgba(0,191,165,0.04)', border: '1px dashed #00BFA5', borderRadius: '12px', padding: '16px 24px', fontSize: '13.5px', color: '#E2E8F0', textAlign: 'center', fontWeight: '600' }}>
              🚀 "The best time to build this was 2 years ago. The second best time is NOW."
            </div>
          </div>
        )}

        {/* TAB 4: MARKET & ECONOMICS */}
        {activeTab === 'market' && (
          <div className="pitch-card glow-neon-purple">
            <h2 style={{ fontSize: '26px', fontWeight: '800', color: '#FFF', marginBottom: '8px', fontFamily: '"Space Grotesk", sans-serif' }}>
              Why This Market? Huge TAM, rapid growth, and outstanding unit economics.
            </h2>
            <p style={{ color: '#94A3B8', fontSize: '15px', marginBottom: '32px' }}>
              DataTrust operates in a massive, expanding sector sitting at the junction of governance and downstream spreadsheet utilization.
            </p>

            {/* Financial figures */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '40px', textAlign: 'center' }}>
              <div style={{ padding: '20px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '12px' }}>
                <span style={{ fontSize: '22px', fontWeight: '800', color: '#00BFA5', display: 'block', fontFamily: 'monospace' }}>₹60,000 Cr</span>
                <span style={{ fontSize: '11px', color: '#94A3B8', textTransform: 'uppercase', fontWeight: '600', display: 'block', marginTop: '4px' }}>Total Addressable TAM</span>
              </div>
              <div style={{ padding: '20px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '12px' }}>
                <span style={{ fontSize: '22px', fontWeight: '800', color: '#00BFA5', display: 'block', fontFamily: 'monospace' }}>12% - 23%</span>
                <span style={{ fontSize: '11px', color: '#94A3B8', textTransform: 'uppercase', fontWeight: '600', display: 'block', marginTop: '4px' }}>Market CAGR</span>
              </div>
              <div style={{ padding: '20px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '12px' }}>
                <span style={{ fontSize: '22px', fontWeight: '800', color: '#00BFA5', display: 'block', fontFamily: 'monospace' }}>₹15,000 Cr</span>
                <span style={{ fontSize: '11px', color: '#94A3B8', textTransform: 'uppercase', fontWeight: '600', display: 'block', marginTop: '4px' }}>Target Segment SAM</span>
              </div>
              <div style={{ padding: '20px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '12px' }}>
                <span style={{ fontSize: '22px', fontWeight: '800', color: '#00BFA5', display: 'block', fontFamily: 'monospace' }}>$39 Billion</span>
                <span style={{ fontSize: '11px', color: '#94A3B8', textTransform: 'uppercase', fontWeight: '600', display: 'block', marginTop: '4px' }}>Global Market 2034</span>
              </div>
            </div>

            {/* Competitor weaknesses */}
            <h3 style={{ fontSize: '18px', color: '#FFF', fontWeight: '700', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '1px' }}>
              Competitive Matrix & Weaknesses
            </h3>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13.5px', background: 'rgba(0,0,0,0.2)', borderRadius: '12px', overflow: 'hidden', marginBottom: '40px' }}>
              <thead>
                <tr style={{ background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                  <th style={{ padding: '12px 16px', textAlign: 'left', color: '#94A3B8' }}>Competitor</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left', color: '#94A3B8' }}>Core Weakness</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left', color: '#00BFA5' }}>Our Attack Strategy</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                  <td style={{ padding: '12px 16px', fontWeight: '600', color: '#FFF' }}>Microsoft (Purview + Copilot)</td>
                  <td style={{ padding: '12px 16px', color: '#CBD5E1' }}>Slow implementation cycles; Copilot does not enforce DWH metadata validation rules.</td>
                  <td style={{ padding: '12px 16px', color: '#00BFA5', fontWeight: '600' }}>Deliver active constraint checks in 2-second queries, bypassing long integrations.</td>
                </tr>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                  <td style={{ padding: '12px 16px', fontWeight: '600', color: '#FFF' }}>Collibra / Atlan</td>
                  <td style={{ padding: '12px 16px', color: '#CBD5E1' }}>Built only for database catalog schemas. Excel users remain completely ignored.</td>
                  <td style={{ padding: '12px 16px', color: '#00BFA5', fontWeight: '600' }}>Position as the first "Excel-native governance bridge."</td>
                </tr>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                  <td style={{ padding: '12px 16px', fontWeight: '600', color: '#FFF' }}>Monte Carlo</td>
                  <td style={{ padding: '12px 16px', color: '#CBD5E1' }}>Observability pipelines built for engineers only. No business user interface or NLQ.</td>
                  <td style={{ padding: '12px 16px', color: '#00BFA5', fontWeight: '600' }}>Upsell to observability-aware teams, providing Excel writeback and validation.</td>
                </tr>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                  <td style={{ padding: '12px 16px', fontWeight: '600', color: '#FFF' }}>Power BI / Tableau</td>
                  <td style={{ padding: '12px 16px', color: '#CBD5E1' }}>Users continue to export data to static spreadsheets. Manual recon loops continue.</td>
                  <td style={{ padding: '12px 16px', color: '#00BFA5', fontWeight: '600' }}>Our ribbon connection eliminates data export steps completely.</td>
                </tr>
              </tbody>
            </table>

            {/* Unit Economics Section */}
            <h3 style={{ fontSize: '18px', color: '#FFF', fontWeight: '700', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '1px' }}>
              Unit Economics
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '40px' }}>
              
              <div className="economic-pill">
                <span style={{ display: 'block', fontSize: '12px', color: '#00BFA5', fontWeight: '700', textTransform: 'uppercase', marginBottom: '12px' }}>🏢 Enterprise Tier</span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13.5px', color: '#CBD5E1' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Annual Contract Value (ACV):</span><strong style={{ color: '#FFF' }}>₹1.0 Cr - ₹1.8 Cr</strong></div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Hosting & Support Cost:</span><strong style={{ color: '#FFF' }}>₹10-15 Lakh / year</strong></div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Gross Margin:</span><strong style={{ color: '#10B981' }}>85 - 90%</strong></div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Customer Acquisition Cost (CAC):</span><strong style={{ color: '#FFF' }}>₹8 - 10 Lakh</strong></div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Lifetime Value (LTV, 5 yr):</span><strong style={{ color: '#FFF' }}>₹5 - 9 Cr</strong></div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '6px', marginTop: '4px' }}><span style={{ fontWeight: '600' }}>LTV/CAC Ratio:</span><strong style={{ color: '#00BFA5' }}>6 - 9x</strong></div>
                </div>
              </div>

              <div className="economic-pill">
                <span style={{ display: 'block', fontSize: '12px', color: '#6366F1', fontWeight: '700', textTransform: 'uppercase', marginBottom: '12px' }}>📈 Mid-Market Tier</span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13.5px', color: '#CBD5E1' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Annual Contract Value (ACV):</span><strong style={{ color: '#FFF' }}>₹60L - ₹1.5 Cr</strong></div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Hosting & Support Cost:</span><strong style={{ color: '#FFF' }}>₹5-8 Lakh / year</strong></div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Gross Margin:</span><strong style={{ color: '#10B981' }}>85 - 90%</strong></div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Customer Acquisition Cost (CAC):</span><strong style={{ color: '#FFF' }}>₹5 - 8 Lakh</strong></div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Lifetime Value (LTV, 5 yr):</span><strong style={{ color: '#FFF' }}>₹3 - 6 Cr</strong></div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '6px', marginTop: '4px' }}><span style={{ fontWeight: '600' }}>LTV/CAC Ratio:</span><strong style={{ color: '#6366F1' }}>5 - 8x</strong></div>
                </div>
              </div>

            </div>

            {/* Churn & Retention */}
            <h3 style={{ fontSize: '18px', color: '#FFF', fontWeight: '700', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '1px' }}>
              Churn & Retention Projections
            </h3>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13.5px', background: 'rgba(0,0,0,0.2)', borderRadius: '12px', overflow: 'hidden' }}>
              <thead>
                <tr style={{ background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                  <th style={{ padding: '12px 16px', textAlign: 'left', color: '#94A3B8' }}>Retention Metric</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left', color: '#94A3B8' }}>Target Projection</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left', color: '#94A3B8' }}>How We Achieve It</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                  <td style={{ padding: '14px 16px', fontWeight: '600', color: '#FFF' }}>Annual Logo Churn Rate</td>
                  <td style={{ padding: '14px 16px', color: '#10B981', fontWeight: '700' }}>&lt; 10%</td>
                  <td style={{ padding: '14px 16px', color: '#CBD5E1' }}>Mission-critical integration. High switching cost once embedded in monthly finance operations.</td>
                </tr>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                  <td style={{ padding: '14px 16px', fontWeight: '600', color: '#FFF' }}>Net Revenue Retention (NRR)</td>
                  <td style={{ padding: '14px 16px', color: '#10B981', fontWeight: '700' }}>&gt; 120%</td>
                  <td style={{ padding: '14px 16px', color: '#CBD5E1' }}>Upselling expansion features (predictive quality models, team workspaces, compliance packs).</td>
                </tr>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                  <td style={{ padding: '14px 16px', fontWeight: '600', color: '#FFF' }}>Customer Success Strategy</td>
                  <td style={{ padding: '14px 16px', color: '#00BFA5', fontWeight: '700' }}>Dedicated CSM mapping</td>
                  <td style={{ padding: '14px 16px', color: '#CBD5E1' }}>Onboarding metrics tracking and dashboard visual validation reports presented quarterly.</td>
                </tr>
              </tbody>
            </table>

          </div>
        )}

        {/* TAB 5: ASK & VISION */}
        {activeTab === 'funding' && (
          <div className="pitch-card glow-neon-purple">
            <h2 style={{ fontSize: '26px', fontWeight: '800', color: '#FFF', marginBottom: '8px', fontFamily: '"Space Grotesk", sans-serif' }}>
              Funding Ask, Use of Funds, and 5-Year Vision
            </h2>
            <p style={{ color: '#94A3B8', fontSize: '15px', marginBottom: '32px' }}>
              We are raising a Seed round to fuel product development, scale engineering hires, and expand channel partnerships.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '32px', marginBottom: '40px' }}>
              
              {/* Left Column - Ask and Spend */}
              <div>
                <div style={{ padding: '24px', background: 'rgba(99, 102, 241, 0.05)', border: '1px solid rgba(99, 102, 241, 0.15)', borderRadius: '16px', marginBottom: '28px' }}>
                  <span style={{ fontSize: '12px', fontWeight: '800', color: '#818CF8', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>Capital Ask</span>
                  <span style={{ fontSize: '28px', fontWeight: '800', color: '#FFF', display: 'block', marginBottom: '6px' }}>$1.0M - $2.0M <span style={{ fontSize: '18px', color: '#94A3B8', fontWeight: '500' }}>(₹8-16 Cr)</span></span>
                  <p style={{ fontSize: '13.5px', color: '#CBD5E1', lineHeight: '1.5' }}>Targeting 10-20% equity dilution. Seeking partners who bring networks to CFOs and CDW partners like Snowflake.</p>
                </div>

                <h3 style={{ fontSize: '16px', color: '#FFF', fontWeight: '700', marginBottom: '14px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  Use of Funds
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  {[
                    { title: "Product & Engineering", pct: 40, color: "#00BFA5", desc: "Predictive engine, Auto-Correction V2, Ribbon V3" },
                    { title: "Sales & Marketing", pct: 35, color: "#6366F1", desc: "Enterprise outreach reps, Snowflake co-sell setups" },
                    { title: "Operations & Auditing", pct: 15, color: "#F59E0B", desc: "CS managers, hosting infrastructures, SOC2 audits" },
                    { title: "Admin & Buffer", pct: 10, color: "#EF4444", desc: "Accounting, legal, contingency buffers" }
                  ].map(item => (
                    <div key={item.title}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#CBD5E1', marginBottom: '4px' }}>
                        <span><b>{item.title}</b> ({item.pct}%) - <span style={{ fontSize: '12px', color: '#64748B' }}>{item.desc}</span></span>
                      </div>
                      <div style={{ height: '8px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '4px', overflow: 'hidden' }}>
                        <div className="progress-bar-fill" style={{ width: `${item.pct}%`, background: item.color }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column - 5 Year Milestones */}
              <div style={{ background: 'rgba(0,0,0,0.15)', padding: '30px', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.04)' }}>
                <span style={{ fontSize: '12px', fontWeight: '800', color: '#00BFA5', textTransform: 'uppercase', letterSpacing: '1px', display: 'block', marginBottom: '20px' }}>
                  5-Year Corporate Growth Milestones
                </span>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div style={{ borderLeft: '2px solid #00BFA5', paddingLeft: '16px', position: 'relative' }}>
                    <div style={{ position: 'absolute', left: '-5px', top: '2px', width: '8px', height: '8px', borderRadius: '50%', background: '#00BFA5' }}></div>
                    <span style={{ fontSize: '13px', color: '#00BFA5', fontWeight: '700' }}>Year 1-2: Product Market Fit</span>
                    <p style={{ fontSize: '13.5px', color: '#CBD5E1', marginTop: '4px', marginBlockEnd: 0 }}>Land 50-150 enterprise clients in India. Build core sales pipelines. Target ARR of ₹10-50 Cr.</p>
                  </div>
                  
                  <div style={{ borderLeft: '2px solid #6366F1', paddingLeft: '16px', position: 'relative' }}>
                    <div style={{ position: 'absolute', left: '-5px', top: '2px', width: '8px', height: '8px', borderRadius: '50%', background: '#6366F1' }}></div>
                    <span style={{ fontSize: '13px', color: '#6366F1', fontWeight: '700' }}>Year 3-4: Scaling Southeast Asia & APAC</span>
                    <p style={{ fontSize: '13.5px', color: '#CBD5E1', marginTop: '4px', marginBlockEnd: 0 }}>Grow team to 50-80 engineers. Deploy to 300-500 enterprises. Scale ARR to ₹200-500 Cr.</p>
                  </div>

                  <div style={{ borderLeft: '2px solid #F59E0B', paddingLeft: '16px', position: 'relative' }}>
                    <div style={{ position: 'absolute', left: '-5px', top: '2px', width: '8px', height: '8px', borderRadius: '50%', background: '#F59E0B' }}></div>
                    <span style={{ fontSize: '13px', color: '#F59E0B', fontWeight: '700' }}>Year 5: Global Category Leader</span>
                    <p style={{ fontSize: '13.5px', color: '#CBD5E1', marginTop: '4px', marginBlockEnd: 0 }}>Scale global sales reps (US & Europe). Support 1,000+ enterprises. Hit ARR ₹800 - ₹1,600 Cr ($100M-$200M).</p>
                  </div>
                </div>
              </div>

            </div>

            {/* Risk & Mitigation Matrix */}
            <h3 style={{ fontSize: '18px', color: '#FFF', fontWeight: '700', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '1px' }}>
              Risk & Mitigation Matrix
            </h3>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13.5px', background: 'rgba(0,0,0,0.2)', borderRadius: '12px', overflow: 'hidden' }}>
              <thead>
                <tr style={{ background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                  <th style={{ padding: '12px 16px', textAlign: 'left', color: '#94A3B8' }}>Risk Factor</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left', color: '#94A3B8' }}>Probability</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left', color: '#94A3B8' }}>Impact</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left', color: '#00BFA5' }}>Mitigation Strategy</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                  <td style={{ padding: '12px 16px', fontWeight: '600', color: '#FFF' }}>Big Cloud Players Copy us</td>
                  <td style={{ padding: '12px 16px', color: '#F59E0B', fontWeight: '700' }}>High</td>
                  <td style={{ padding: '12px 16px', color: '#EF4444', fontWeight: '700' }}>Medium</td>
                  <td style={{ padding: '12px 16px', color: '#CBD5E1' }}>Fast iteration speed. Position ourselves as Excel-native, multi-cloud platforms rather than single-vendor solutions.</td>
                </tr>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                  <td style={{ padding: '12px 16px', fontWeight: '600', color: '#FFF' }}>Long Enterprise Sales Cycles</td>
                  <td style={{ padding: '12px 16px', color: '#F59E0B', fontWeight: '700' }}>High</td>
                  <td style={{ padding: '12px 16px', color: '#EF4444', fontWeight: '700' }}>High</td>
                  <td style={{ padding: '12px 16px', color: '#CBD5E1' }}>Utilize the "land-and-expand" GTM loop, starting with departmental pilots at lower contract thresholds.</td>
                </tr>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                  <td style={{ padding: '12px 16px', fontWeight: '600', color: '#FFF' }}>Technical scaling bottlenecks</td>
                  <td style={{ padding: '12px 16px', color: '#F59E0B', fontWeight: '700' }}>Medium</td>
                  <td style={{ padding: '12px 16px', color: '#F59E0B', fontWeight: '700' }}>Medium</td>
                  <td style={{ padding: '12px 16px', color: '#CBD5E1' }}>Adopt horizontal-scaling cloud infrastructure built on Kubernetes clusters, Redis caching, and Kafka pipelines.</td>
                </tr>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                  <td style={{ padding: '12px 16px', fontWeight: '600', color: '#FFF' }}>Data security and breaches</td>
                  <td style={{ padding: '12px 16px', color: '#EF4444', fontWeight: '700' }}>Low</td>
                  <td style={{ padding: '12px 16px', color: '#EF4444', fontWeight: '700' }}>High</td>
                  <td style={{ padding: '12px 16px', color: '#CBD5E1' }}>Incorporate strict column-level masking (PII, ITARspec), AES-256 databases, and secure SOC2, GDPR, HIPAA auditing.</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {/* INTERACTIVE ASK THE FOUNDERS INTERROGATOR */}
        <div style={{ 
          background: 'linear-gradient(145deg, #090d1a 0%, #17223b 100%)', 
          border: '1px solid rgba(0, 191, 165, 0.25)', 
          borderRadius: '24px', 
          padding: '40px',
          boxShadow: '0 20px 40px rgba(0,0,0,0.5)'
        }}>
          <h2 style={{ fontSize: '28px', fontWeight: '800', fontFamily: '"Space Grotesk", sans-serif', color: '#FFF', marginBottom: '8px', textAlign: 'center' }}>
            💬 VC Investor Interrogator Simulator
          </h2>
          <p style={{ color: '#94A3B8', fontSize: '15px', textAlign: 'center', marginBottom: '24px', maxWidth: '700px', margin: '0 auto 24px' }}>
            Select a critical VC question below, or type your own custom investor query to see Manoj & Sushil address scaling, strategy, and tech moats.
          </p>

          {/* Category filters for simulator questions */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '24px', flexWrap: 'wrap' }}>
            <button onClick={() => { setQFilter('all'); setInterrogatorQId(0); setCustomAnswer(null); }} className={`filter-btn ${qFilter === 'all' ? 'active' : ''}`}>All</button>
            <button onClick={() => { setQFilter('strategy'); setInterrogatorQId(0); setCustomAnswer(null); }} className={`filter-btn ${qFilter === 'strategy' ? 'active' : ''}`}>Strategy & Market</button>
            <button onClick={() => { setQFilter('tech'); setInterrogatorQId(0); setCustomAnswer(null); }} className={`filter-btn ${qFilter === 'tech' ? 'active' : ''}`}>Technology & Moats</button>
            <button onClick={() => { setQFilter('gtm'); setInterrogatorQId(0); setCustomAnswer(null); }} className={`filter-btn ${qFilter === 'gtm' ? 'active' : ''}`}>Financials & GTM</button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '40px', alignItems: 'start' }}>
            
            {/* Left Q&A list */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              
              {/* Question list buttons */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '350px', overflowY: 'auto', paddingRight: '8px' }}>
                <span style={{ fontSize: '11px', color: '#64748b', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px' }}>Select Core VC Question:</span>
                {filteredQA.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setInterrogatorQId(idx);
                      setCustomAnswer(null);
                    }}
                    style={{
                      padding: '12px 16px',
                      borderRadius: '8px',
                      background: interrogatorQId === idx && !customAnswer ? 'rgba(0,191,165,0.08)' : 'rgba(255,255,255,0.02)',
                      border: interrogatorQId === idx && !customAnswer ? '1px solid #00BFA5' : '1px solid rgba(255,255,255,0.06)',
                      color: interrogatorQId === idx && !customAnswer ? '#00BFA5' : '#CBD5E1',
                      fontSize: '13px',
                      fontWeight: '600',
                      textAlign: 'left',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      lineHeight: '1.4'
                    }}
                  >
                    ❓ {item.q}
                  </button>
                ))}
              </div>

              {/* Custom question form */}
              <form onSubmit={handleAskQuestion} style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '20px', display: 'flex', gap: '10px' }}>
                <input
                  type="text"
                  placeholder="Ask founders custom question (e.g. database safety)..."
                  value={customQuestion}
                  onChange={(e) => setCustomQuestion(e.target.value)}
                  style={{
                    flex: 1,
                    background: '#070a13',
                    border: '1px solid rgba(255,255,255,0.1)',
                    padding: '12px 16px',
                    borderRadius: '8px',
                    color: '#F8FAFC',
                    fontSize: '14px',
                    outline: 'none'
                  }}
                />
                <button
                  type="submit"
                  style={{
                    background: '#6366F1',
                    color: '#FFF',
                    border: 'none',
                    padding: '0 20px',
                    borderRadius: '8px',
                    fontWeight: '700',
                    fontSize: '13.5px',
                    cursor: 'pointer'
                  }}
                >
                  Send Query
                </button>
              </form>

            </div>

            {/* Right Answer Box */}
            <div style={{ 
              background: 'rgba(0, 0, 0, 0.2)', 
              border: '1px solid rgba(99,102,241,0.2)', 
              borderRadius: '20px', 
              padding: '30px',
              minHeight: '350px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}>
              {isTyping ? (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '220px', gap: '12px' }}>
                  <div style={{ 
                    width: '32px', 
                    height: '32px', 
                    borderRadius: '50%', 
                    border: '3px solid rgba(0,191,165,0.2)', 
                    borderTopColor: '#00BFA5', 
                    animation: 'spin 1s linear infinite' 
                  }}></div>
                  <span style={{ fontSize: '13px', color: '#64748b', fontFamily: 'monospace' }}>Manoj is compiling answer...</span>
                </div>
              ) : customAnswer ? (
                <div>
                  <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '16px' }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#00BFA5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', color: '#020617', fontSize: '13px' }}>
                      MR
                    </div>
                    <div>
                      <span style={{ fontSize: '14px', fontWeight: '700', color: '#FFF', display: 'block' }}>Manoj Singh Rajput</span>
                      <span style={{ fontSize: '10px', color: '#64748b', textTransform: 'uppercase' }}>Founder response</span>
                    </div>
                  </div>
                  <p style={{ fontSize: '14px', color: '#CBD5E1', lineHeight: '1.6', fontStyle: 'italic' }}>
                    "{customAnswer}"
                  </p>
                </div>
              ) : (
                <div>
                  <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '16px' }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: activeQA.avatar === 'MR' ? '#00BFA5' : '#6366F1', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', color: activeQA.avatar === 'MR' ? '#020617' : '#FFF', fontSize: '13px' }}>
                      {activeQA.avatar}
                    </div>
                    <div>
                      <span style={{ fontSize: '14px', fontWeight: '700', color: '#FFF', display: 'block' }}>{activeQA.name}</span>
                      <span style={{ fontSize: '10px', color: '#64748b', textTransform: 'uppercase' }}>Founder response</span>
                    </div>
                  </div>
                  <p style={{ fontSize: '14px', color: '#CBD5E1', lineHeight: '1.6', fontStyle: 'italic' }}>
                    "{activeQA.a}"
                  </p>
                </div>
              )}

              <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '14px', marginTop: '16px', fontSize: '11px', color: '#64748b', textAlign: 'center' }}>
                💡 Simulated live VC Pitch Deck interrogations compiled by DataTrust founders.
              </div>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}
