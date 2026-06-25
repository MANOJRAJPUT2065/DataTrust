import React, { useState, useEffect, useRef } from 'react';

const MermaidBlock = ({ chart, id }) => {
  const containerRef = useRef(null);
  const [svg, setSvg] = useState('');

  useEffect(() => {
    let isMounted = true;
    
    const renderChart = () => {
      try {
        if (window.mermaid) {
          window.mermaid.initialize({ 
            startOnLoad: false, 
            theme: 'dark',
            securityLevel: 'loose',
            themeVariables: {
              background: '#070a13',
              primaryColor: '#1e293b',
              primaryTextColor: '#f8fafc',
              lineColor: '#6366f1',
              transitionDuration: '0s'
            }
          });
          
          const uniqueId = `mermaid-${id}-${Math.floor(Math.random() * 10000)}`;
          window.mermaid.render(uniqueId, chart).then((result) => {
            if (isMounted) {
              setSvg(result.svg);
            }
          }).catch((err) => {
            console.error("Mermaid render error:", err);
          });
        }
      } catch (e) {
        console.error("Error rendering mermaid diagram", e);
      }
    };

    if (window.mermaid) {
      renderChart();
    } else {
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/mermaid/dist/mermaid.min.js';
      script.async = true;
      script.onload = () => {
        renderChart();
      };
      document.body.appendChild(script);
    }

    return () => {
      isMounted = false;
    };
  }, [chart, id]);

  return (
    <div style={{ 
      background: '#040712', 
      borderRadius: '12px', 
      border: '1px solid rgba(99, 102, 241, 0.1)', 
      padding: '24px', 
      overflowX: 'auto',
      display: 'flex',
      justifyContent: 'center',
      minHeight: '180px',
      alignItems: 'center'
    }}>
      {svg ? (
        <div dangerouslySetInnerHTML={{ __html: svg }} style={{ width: '100%', maxWidth: '600px' }} />
      ) : (
        <div style={{ color: '#475569', fontSize: '13px', fontFamily: 'monospace' }}>Compiling visual scenario flow chart...</div>
      )}
    </div>
  );
};const GraphicalWorkflowMap = ({ companyId, data }) => {
  const name = data.persona.name.split(' ')[0];
  const db = data.dbConn.split(' → ')[0];
  const dest = data.dbConn.split(' → ')[1] || "DWH";
  
  const steps = [
    { type: "start", icon: "🏁", title: "START: Monday 09:00 AM", desc: `${name} opens Excel (DataTrust Add-in auto-loads).`, color: "#10B981" },
    { type: "sso", icon: "🔒", title: "SSO Authentication", desc: `DataTrust validates ${name}'s security clearances & AD group roles.`, color: "#6366F1" },
    { type: "semantic", icon: "🧠", title: "Semantic Engine (CSM)", desc: `Loads governed definitions (v3.2.0) and rule constraints for target columns.`, color: "#8B5CF6" },
    { type: "action", icon: "🖱️", title: `${name} clicks [Refresh All]`, desc: "Handshake initiated between spreadsheet ribbon and DataTrust backend proxy.", color: "#0EA5E9" },
    { type: "connector", icon: "☁️", title: `${db} Connection`, desc: "Queries database schemas dynamically. Retrieves row values in under 2 seconds.", color: "#EC4899" },
    { type: "corrector", icon: "🪄", title: "Formula Auto-Corrector", desc: "Scans sheets for column shifts or broken cell formulas, repairing them silently.", color: "#00BFA5" },
    { 
      type: "decision", 
      icon: "⚖️", 
      title: "Quality Engine Validation", 
      desc: "Automatically tests incoming cell parameters against inferred semantic metadata rules.",
      isDecision: true,
      yesLabel: "✓ PASS (Proceed)",
      noLabel: "⚠ FAIL (Alert Loop)",
      noDesc: "Alert Engine dispatches Slack alerts ➔ Subcontractor resolves ➔ Sheet refreshed.",
      color: "#F59E0B"
    },
    { type: "audit", icon: "📋", title: "Audit Engine V3", desc: "Logs refresh transaction, row updates, and rule compliance statuses in Postgres.", color: "#F97316" },
    { type: "action", icon: "💾", title: "Sync back to Database", desc: `Mutates database tables and triggers downstream ${dest} workflow engines.`, color: "#0EA5E9" },
    { type: "end", icon: "🏆", title: "END: Monday 09:05 AM", desc: "Operational report published. Certified audit trail locked.", color: "#10B981" }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', position: 'relative', paddingLeft: '16px' }}>
      
      {/* Central Connecting vertical line */}
      <div style={{ 
        position: 'absolute', 
        left: '31px', 
        top: '24px', 
        bottom: '24px', 
        width: '2px', 
        background: 'linear-gradient(to bottom, #10B981, #6366F1, #8B5CF6, #F59E0B, #10B981)',
        zIndex: 0
      }}></div>

      {steps.map((step, idx) => (
        <div key={idx} style={{ position: 'relative', zIndex: 1, marginBottom: step.isDecision ? '16px' : '8px' }}>
          
          {/* Main Card row */}
          <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
            
            {/* Round Icon Badge */}
            <div style={{ 
              width: '32px', 
              height: '32px', 
              borderRadius: '50%', 
              background: '#0f172a', 
              border: `2px solid ${step.color}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '14px',
              boxShadow: `0 0 10px ${step.color}40`,
              flexShrink: 0
            }}>
              {step.icon}
            </div>

            {/* Step Content Card */}
            <div style={{ 
              flex: 1, 
              background: 'rgba(30, 41, 59, 0.4)', 
              border: `1px solid rgba(255,255,255,0.04)`,
              borderLeft: `3px solid ${step.color}`,
              padding: '12px 18px',
              borderRadius: '10px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2px' }}>
                <span style={{ fontSize: '13px', fontWeight: '700', color: step.color }}>{step.title}</span>
                <span style={{ fontSize: '10px', color: '#64748b', textTransform: 'uppercase', fontWeight: '600' }}>{step.type}</span>
              </div>
              <p style={{ fontSize: '13px', color: '#E2E8F0', lineHeight: '1.4' }}>{step.desc}</p>
            </div>

          </div>

          {/* Decision Node Split Rendering */}
          {step.isDecision && (
            <div style={{ paddingLeft: '52px', marginTop: '12px', display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '20px' }}>
              
              {/* YES PATH */}
              <div style={{ 
                background: 'rgba(16, 185, 129, 0.03)', 
                border: '1px dashed rgba(16, 185, 129, 0.3)', 
                borderRadius: '8px', 
                padding: '10px 14px' 
              }}>
                <span style={{ fontSize: '11px', color: '#10B981', fontWeight: '800', display: 'block', textTransform: 'uppercase', marginBottom: '4px' }}>
                  {step.yesLabel}
                </span>
                <p style={{ fontSize: '12px', color: '#CBD5E1', lineHeight: '1.3' }}>
                  Proceed directly to PostgreSQL audit logging and commit changes.
                </p>
              </div>

              {/* NO PATH */}
              <div style={{ 
                background: 'rgba(239, 68, 68, 0.03)', 
                border: '1px dashed rgba(239, 68, 68, 0.3)', 
                borderRadius: '8px', 
                padding: '10px 14px' 
              }}>
                <span style={{ fontSize: '11px', color: '#EF4444', fontWeight: '800', display: 'block', textTransform: 'uppercase', marginBottom: '4px' }}>
                  {step.noLabel}
                </span>
                <p style={{ fontSize: '12px', color: '#CBD5E1', lineHeight: '1.3' }}>
                  {step.noDesc}
                </p>
              </div>

            </div>
          )}

        </div>
      ))}
      
    </div>
  );
};


// Complete detailed datasets for all 16 companies mapped to Morgan's Journey layout
const companyDetailsMap = {
  exxonmobil: {
    company: "ExxonMobil",
    industry: "Energy",
    dbConn: "Snowflake → SAP Workflows",
    roiText: "3 Days ➔ 5 Seconds",
    valueImpactText: "$90M in value from data harmonization",
    persona: {
      name: "Alex Mercer",
      role: "Lead Supply Chain Analyst @ ExxonMobil",
      reportsTo: "Marcus Thorne (VP of Supply Chain Operations)",
      primaryTool: "Excel (DataTrust Live SAP Connector)",
      goal: "Synchronize daily fuel storage inventories with zero errors and feed SAP ERP workflows.",
      pain: "Wasted 3 days manually validating 40+ local depot worksheets and copying values into SAP.",
      avatarInitials: "AM",
      avatarColor: "#00BFA5"
    },
    beforeAfter: {
      before: [
        { time: "09:00 AM", text: "Download inventory spreadsheets from 15 refinery terminals." },
        { time: "10:30 AM", text: "Manually compile and copy-paste row values into a master Excel file." },
        { time: "01:00 PM", text: "Fix broken formulas, typos, and reference errors." },
        { time: "03:30 PM", text: "Verify parameters against legacy database tables to catch anomalies." },
        { time: "05:30 PM", text: "Manually code and run SAP upload scripts. Correct errors reactively." }
      ],
      after: [
        { time: "09:00 AM", text: "Open inventory spreadsheet (DataTrust Excel ribbon auto-loads)." },
        { time: "09:01 AM", text: "Click 'Refresh All' — live terminal logs pull from Snowflake in seconds." },
        { time: "09:02 AM", text: "AI runs automatic constraint checking on fuel densities and volumes." },
        { time: "09:04 AM", text: "Review status and auto-corrected density values. Click 'Publish & Sync'." },
        { time: "09:05 AM", text: "Valuations push to Snowflake and trigger SAP workflows automatically." }
      ]
    },
    platformJourney: [
      {
        step: "Step 1",
        title: "Alex Opens Excel & Authenticates",
        userView: "DataTrust ribbon appears in Excel. Tabs: [Refresh] [Validate] [Sync to SAP] [Audit].",
        platformAction: "SSO verifies credentials. Connects to Snowflake database. Loads schema mapping for 'inventory_valuation' and decrypted connection parameters."
      },
      {
        step: "Step 2",
        title: "Clicks 'Refresh All'",
        userView: "Live inventory metrics load directly into sheets. No copy-pasting required.",
        platformAction: "Calls Semantic Engine to fetch current v2.4.0 definitions. Queries Snowflake via JDBC. Syncs state to Upstash Redis."
      },
      {
        step: "Step 3",
        title: "Auto-Validation & Write-back",
        userView: "Validation reports: 'All rules passed'. Formats auto-corrected. Pushes to Snowflake.",
        platformAction: "Quality Engine validates parameters (Volume > 0). Auto-Correction V2 resolves misplaced column indices and logs changes in the database."
      }
    ],
    anomalyChain: [
      { time: "08:00 AM", text: "Terminal pipeline runs. Quality Engine flags anomaly: Baytown density is 1.4 (out of bounds 0.7-0.9)." },
      { time: "08:05 AM", text: "Alert Engine dispatches critical alert to Alex (Email) and Sarah (Slack)." },
      { time: "08:07 AM", text: "Alex acknowledges alert. System updates status to 'Investigating'." },
      { time: "08:11 AM", text: "Sarah runs simulation, finds sensor drop, auto-corrects using average, resolves alert." },
      { time: "08:15 AM", text: "Alex refreshes Excel, receives correct values, and publishes report." }
    ],
    teamSurfaces: [
      { member: "Alex Mercer", role: "Supply Analyst", responsibility: "Reconciles depots, uploads to SAP", surfaces: "Excel Add-in, Audit Viewer" },
      { member: "Sarah Jenkins", role: "Data Engineer", responsibility: "Maintains Snowflake schema, validates rules", surfaces: "Admin Console, Quality Dashboard" },
      { member: "Marcus Thorne", role: "VP Supply Chain", responsibility: "Signs off on inventories", surfaces: "Approval Inbox, Alert Center" }
    ],
    approvalFlow: [
      { step: "1. Sarah Edits Metric", desc: "Sarah updates fuel density index to 0.82 and submits for review." },
      { step: "2. Priya Approves (L1)", desc: "Priya (Data Lead) runs impact analysis and approves density adjustment." },
      { step: "3. Marcus Approves (L2)", desc: "VP Marcus reviews financial impact and signs off on new index." },
      { step: "4. Change Live (v2.4.1)", desc: "Alex refreshes Excel, rules apply automatically with zero formula breaks." }
    ],
    auditorFlow: {
      question: "Tax Auditor: 'Provide historical evidence of inventory valuation definitions used in June 2026.'",
      action: "Marcus opens DataTrust Audit Trail Viewer, filters 'inventory_valuation', exports signed PDF in 1 second.",
      outcome: "Auditing complete in 1 hour. Alex is never disturbed."
    },
    workflowMapText: `START: Monday 09:00 AM
Alex opens Excel (DataTrust Add-in loads)
       │
       ▼
[SSO Authentication] ── Verifies Alex's identity via Active Directory
       │
       ▼
[Semantic Engine] ── Loads metrics (Volume, Density, Market_Price)
       │
       ▼
Alex clicks [Refresh All]
       │
       ▼
[Live Connector] ── Queries Snowflake database. Loads results in 1.4s
       │
       ▼
[Formula Auto-Corrector] ── Scans and fixes Excel cell shifts
       │
       ▼
[Quality Engine] ── Runs 5 rules automatically (Density bounds, Positive volume)
       │
       ▼
[Audit Engine] ── Logs inventory adjustments & writeback events
       │
       ▼
Alex clicks [Publish & Push to SAP] ── Triggers SAP ERP inventory logs
       │
END: Monday 09:05 AM`,
    roiStats: {
      hoursSaved: "120 hrs/mo",
      savings: "₹45 Lakhs/yr",
      roi: "15x"
    },
    mermaidChart: `graph LR
    Excel[Excel Add-in] -->|1. Sync Volume Data| DT[DataTrust Hub]
    DT -->|2. Validate Bounds| QE[Quality Engine]
    QE -->|3. Accept Write-back| SF[(Snowflake DWH)]
    SF -->|4. Trigger Flow| SAP[SAP ERP Systems]
    style Excel fill:#10B981,stroke:#fff,stroke-width:1px,color:#fff
    style DT fill:#6366F1,stroke:#fff,stroke-width:1px,color:#fff
    style QE fill:#F59E0B,stroke:#fff,stroke-width:1px,color:#fff
    style SF fill:#00BFA5,stroke:#fff,stroke-width:1px,color:#fff
    style SAP fill:#EC4899,stroke:#fff,stroke-width:1px,color:#fff`
  },
  boeing: {
    company: "Boeing",
    industry: "Aerospace",
    dbConn: "Databricks Lakehouse",
    roiText: "Zero Formula Drift",
    valueImpactText: "100% safety parameters compliance",
    persona: {
      name: "Dave Vance",
      role: "Structural Wing Lead @ Boeing",
      reportsTo: "Kelly Chen (QA Engineering Director)",
      primaryTool: "Excel (DataTrust CSM Connector)",
      goal: "Enforce safety-critical stress analysis models consistently across wing design sheets.",
      pain: "Formula drift (Excel Sprawl) where different engineers calculated stress limits using differing values.",
      avatarInitials: "DV",
      avatarColor: "#6366F1"
    },
    beforeAfter: {
      before: [
        { time: "09:00 AM", text: "Download raw supplier aluminum alloy tensile logs." },
        { time: "10:00 AM", text: "Manually compute stress deflection parameters in local sheets." },
        { time: "12:00 PM", text: "Discrepancy found during design reviews — formulas don't match." },
        { time: "03:00 PM", text: "Search emails to check which version of safety factor is correct." },
        { time: "05:00 PM", text: "Re-calculate everything. High configuration management risks." }
      ],
      after: [
        { time: "09:00 AM", text: "Open wing analysis workbook linked to Semantic Layer (CSM)." },
        { time: "09:02 AM", text: "Click 'Refresh' — safety limit thresholds pull live from Databricks." },
        { time: "09:04 AM", text: "Run stress equations translated dynamically to secure SQL queries." },
        { time: "09:08 AM", text: "Trace cell formulas back to raw tables using 'View Lineage' portal." },
        { time: "09:10 AM", text: "Publish design verification logs with full lineage proof attached." }
      ]
    },
    platformJourney: [
      {
        step: "Step 1",
        title: "Dave Opens Excel & Authenticates",
        userView: "Workbook loads. DataTrust ribbon displays design stress variables in real-time.",
        platformAction: "SSO verifies credentials. Loads current safety constants from central CSM repository."
      },
      {
        step: "Step 2",
        title: "Clicks 'Refresh'",
        userView: "Excel safety factors update instantly from Databricks lakehouse schemas.",
        platformAction: "DAX-to-SQL engine auto-translates Dave's local formulas into database query strings."
      },
      {
        step: "Step 3",
        title: "Formula Tracing & Validation",
        userView: "Dave checks cell lineage. View shows full path back to supplier alloy tables.",
        platformAction: "Quality Engine scans inputs, checks parameters (Stress <= Max_Allowable), logs read event."
      }
    ],
    anomalyChain: [
      { time: "08:00 AM", text: "Supplier uploads material logs. DataTrust checks tensile limits." },
      { time: "08:05 AM", text: "Alert triggered: Tensile logs show yield strength 15% below safety margin." },
      { time: "08:07 AM", text: "Dave acknowledges alert. Investigation dispatches QC to check supplier lot." },
      { time: "08:11 AM", text: "Alert resolved in DataTrust. Core DWH locks out out-of-spec materials." },
      { time: "08:15 AM", text: "Dave refreshes sheets. Safety margins update to healthy status." }
    ],
    teamSurfaces: [
      { member: "Dave Vance", role: "Structural Lead", responsibility: "Maintains wing load equations", surfaces: "Excel Ribbon, Lineage View" },
      { member: "Kelly Chen", role: "QA Director", responsibility: "Reviews design models, signs off safety logs", surfaces: "Approval Inbox, Alert Center" },
      { member: "Tom Harrison", role: "SecOps Lead", responsibility: "Restricts clearances, ITAR compliance", surfaces: "Admin Console" }
    ],
    approvalFlow: [
      { step: "1. Dave Proposes Change", desc: "Dave updates load capacity constant to 450kN in the CSM registry." },
      { step: "2. Priya Approves (L1)", desc: "Priya (Data Lead) runs impact analysis to trace affected spreadsheets." },
      { step: "3. Kelly Approves (L2)", desc: "QA Director Kelly signs off on new design specifications." },
      { step: "4. Live Deploy (v1.3.1)", desc: "Formula changes sync globally, locking wing models to current specs." }
    ],
    auditorFlow: {
      question: "FAA Inspector: 'Provide lineage verification for wing assembly stress calculations.'",
      action: "Dave opens DataTrust Lineage Viewer, exports structural calculation audit graph in 1 second.",
      outcome: "Safety certification approved instantly. Complete traceability."
    },
    workflowMapText: `START: Monday 09:00 AM
Dave opens stress analysis Excel workbook
       │
       ▼
[SSO Validation] ── Secures workbook access via aerospace enclaves
       │
       ▼
[Semantic Layer] ── Loads stress coefficients from Databricks CSM
       │
       ▼
Dave clicks [Refresh]
       │
       ▼
[DAX → SQL Engine] ── Translates cell math to secure Databricks queries
       │
       ▼
[Lineage Tracing] ── Links sheets to raw supplier alloy data logs
       │
       ▼
[Quality Engine] ── Checks constraints (Stress <= limit)
       │
       ▼
Dave clicks [Publish Verification Log] ── Signs off with FAA audit trail
       │
END: Monday 09:10 AM`,
    roiStats: {
      hoursSaved: "95 hrs/mo",
      savings: "₹38 Lakhs/yr",
      roi: "12x"
    },
    mermaidChart: `graph TD
    Excel[Dave's Stress Sheet] -->|Formula Lookup| CSM[Semantic Layer CSM]
    CSM -->|Translate to SQL| DAX[DAX-to-SQL Engine]
    DAX -->|Query Data| DB[(Databricks Lakehouse)]
    QA[Kelly's QA Sheet] -->|Trace Cell Lineage| CSM
    style Excel fill:#10B981,stroke:#fff,stroke-width:1px,color:#fff
    style CSM fill:#6366F1,stroke:#fff,stroke-width:1px,color:#fff
    style DAX fill:#EC4899,stroke:#fff,stroke-width:1px,color:#fff
    style DB fill:#00BFA5,stroke:#fff,stroke-width:1px,color:#fff
    style QA fill:#F59E0B,stroke:#fff,stroke-width:1px,color:#fff`
  },
  pfizer: {
    company: "Pfizer",
    industry: "Healthcare & Pharma",
    dbConn: "Snowflake Secure Proxy",
    roiText: "100% FDA Compliance",
    valueImpactText: "Zero patient PII leaks",
    persona: {
      name: "Dr. Aris Vance",
      role: "Clinical Trials Director @ Pfizer",
      reportsTo: "Helen Albright (HIPAA Compliance Lead)",
      primaryTool: "Excel (DataTrust Governance Ribbon)",
      goal: "Analyze drug efficacy telemetry without exposing patient PII or failing FDA guidelines.",
      pain: "Manually scrubbing SSN, names, and contact details from spreadsheets, delaying submissions.",
      avatarInitials: "AV",
      avatarColor: "#EF4444"
    },
    beforeAfter: {
      before: [
        { time: "09:00 AM", text: "Download raw clinical trial sheets containing patient profiles." },
        { time: "10:30 AM", text: "Manual cell-by-cell deletion of SSNs, addresses, and name fields." },
        { time: "01:00 PM", text: "Run statistical dose formulas on locally altered spreadsheets." },
        { time: "03:00 PM", text: "Send file to director. No audit logs recording who viewed what PII." },
        { time: "05:00 PM", text: "High security vulnerability of failing regulatory HIPAA audits." }
      ],
      after: [
        { time: "09:00 AM", text: "Open Pfizer clinical sheet. DataTrust authenticates user role." },
        { time: "09:01 AM", text: "Click 'Refresh' — efficacy logs populate while PII is masked." },
        { time: "09:02 AM", text: "Patient names and SSNs display as [MASKED] dynamically." },
        { time: "09:04 AM", text: "Run trial analysis. Adjust metric limits securely." },
        { time: "09:05 AM", text: "Export HIPAA compliance audit trails for trial submissions." }
      ]
    },
    platformJourney: [
      {
        step: "Step 1",
        title: "Dr. Aris Opens Excel & SSO Authenticates",
        userView: "Workbook loads. Patient columns show masked indicators automatically.",
        platformAction: "SSO verifies credentials. DataTrust security proxy maps columns against masking rules."
      },
      {
        step: "Step 2",
        title: "Clicks 'Refresh'",
        userView: "Dose and recovery rates populate. SSNs display as [MASKED].",
        platformAction: "Queries Snowflake. Applies column hashing on PII fields. Records access event in postgres audit logs."
      },
      {
        step: "Step 3",
        title: "Validation & Export",
        userView: "Efficacy parameters validated. Click 'Publish Report'.",
        platformAction: "Quality Engine verifies parameters. Packages metadata registry edits into an audit zip."
      }
    ],
    anomalyChain: [
      { time: "08:00 AM", text: "Subcontractor uploads lab metrics. DataTrust checks formatting." },
      { time: "08:05 AM", text: "Alert triggered: Dosage fields show mg units instead of standard grams." },
      { time: "08:07 AM", text: "Dr. Aris acknowledges. DataTrust Auto-Correction normalizes units." },
      { time: "08:11 AM", text: "Dose values corrected. Anomaly status changes to resolved." },
      { time: "08:15 AM", text: "Dr. Aris refreshes sheets, getting aligned trials analysis." }
    ],
    teamSurfaces: [
      { member: "Dr. Aris Vance", role: "Trials Director", responsibility: "Analyzes drug trials", surfaces: "Excel Add-in, Audit Viewer" },
      { member: "Helen Albright", role: "Compliance Lead", responsibility: "Enforces HIPAA policies, registers masking rules", surfaces: "Admin Console, Quality Dashboard" },
      { member: "Dr. Ryan K.", role: "Lead Biostatistician", responsibility: "Runs stats, approves metrics", surfaces: "Approval Inbox" }
    ],
    approvalFlow: [
      { step: "1. Dr. Ryan Updates Metric", desc: "Ryan updates efficacy threshold to >= 75% for Phase II." },
      { step: "2. Helen Approves (L1)", desc: "Compliance Lead Helen reviews data security compliance." },
      { step: "3. Dr. Aris Approves (L2)", desc: "Director Aris signs off on new trial parameters." },
      { step: "4. Rules Active (v2.1.0)", desc: "Change goes live. Statistical models lock to updated rules." }
    ],
    auditorFlow: {
      question: "FDA Inspector: 'Provide a complete log showing who accessed trial PII fields.'",
      action: "Helen opens DataTrust Audit Trail Viewer, filters access logs, exports signed PDF.",
      outcome: "FDA audit successfully approved in minutes. Complete compliance."
    },
    workflowMapText: `START: Monday 09:00 AM
Dr. Aris opens trial Excel workbook
       │
       ▼
[SSO Validation] ── Resolves user clearance level
       │
       ▼
[DataTrust Proxy] ── Intercepts Snowflake connection query
       │
       ▼
[PII Masking Engine] ── Applies dynamic column hashing (Names, SSNs -> MASKED)
       │
       ▼
Dr. Aris clicks [Refresh]
       │
       ▼
[Live Connector] ── Queries secure Snowflake. Loads metrics in 1.2s
       │
       ▼
[Quality Engine] ── Runs checks (Dose limits, Positive outcomes)
       │
       ▼
[Audit Engine] ── Logs access details to offline PostgreSQL audit store
       │
END: Monday 09:05 AM`,
    roiStats: {
      hoursSaved: "140 hrs/mo",
      savings: "₹55 Lakhs/yr",
      roi: "18x"
    },
    mermaidChart: `graph TD
    Doc[Dr. Aris's Sheet] -->|Secure Handshake| Proxy[DataTrust Proxy]
    Proxy -->|1. Check Clearances| SSO[SSO & ACL]
    Proxy -->|2. Apply Masking| Mask[Masking Engine]
    Proxy -->|3. Fetch Clinical Logs| SF[(Snowflake Secure)]
    Mask -->|Log Access| Audit[(Immutable Audit Log)]
    style Doc fill:#10B981,stroke:#fff,stroke-width:1px,color:#fff
    style Proxy fill:#6366F1,stroke:#fff,stroke-width:1px,color:#fff
    style SSO fill:#F59E0B,stroke:#fff,stroke-width:1px,color:#fff
    style Mask fill:#EF4444,stroke:#fff,stroke-width:1px,color:#fff
    style SF fill:#00BFA5,stroke:#fff,stroke-width:1px,color:#fff
    style Audit fill:#EC4899,stroke:#fff,stroke-width:1px,color:#fff`
  },
  lockheed: {
    company: "Lockheed Martin",
    industry: "Aerospace",
    dbConn: "Isolated Databricks (Offline Node)",
    roiText: "Zero Security Incident",
    valueImpactText: "ITAR compliance verified across contractors",
    persona: {
      name: "Major John Vance",
      role: "Defense Program Director @ Lockheed Martin",
      reportsTo: "Sgt. Mike Miller (SecOps Compliance Lead)",
      primaryTool: "Excel (DataTrust Enclave Connector)",
      goal: "Track thruster design spec updates across subcontractor sheets securely.",
      pain: "Subcontractors uploading specs via shared folders, risking ITAR classification leaks.",
      avatarInitials: "JV",
      avatarColor: "#EC4899"
    },
    beforeAfter: {
      before: [
        { time: "09:00 AM", text: "Subcontractors email flight specs and logs in spreadsheet files." },
        { time: "11:00 AM", text: "Manual review of files to check for ITAR classification markings." },
        { time: "01:00 PM", text: "Manually mask sensitive payload values for contractor access." },
        { time: "03:00 PM", text: "Compile project files. No digital trace of read/write events." },
        { time: "05:00 PM", text: "High risk of security violations and regulatory ITAR fines." }
      ],
      after: [
        { time: "09:00 AM", text: "Subcontractors connect sheets to local, air-gapped DataTrust node." },
        { time: "09:01 AM", text: "Click 'Refresh' — clearances resolve, masking classified data." },
        { time: "09:02 AM", text: "Quality Engine checks safety thresholds automatically." },
        { time: "09:04 AM", text: "Subcontractor budget updates run through simulation window." },
        { time: "09:05 AM", text: "Publish spec sheets with offline compliance logs attached." }
      ]
    },
    platformJourney: [
      {
        step: "Step 1",
        title: "Engineer Connects to Air-Gapped Node",
        userView: "Ribbon loads spec parameters. Access keys resolve locally.",
        platformAction: "Validates active directory role enclaves. Restricts connections to local network."
      },
      {
        step: "Step 2",
        title: "Clicks 'Refresh'",
        userView: "Design numbers load. Classified cells show zero values.",
        platformAction: "Applies dynamic column-level security filters on spec tables in Databricks."
      },
      {
        step: "Step 3",
        title: "Verification & Audit",
        userView: "Runs spec validation check. Logs changes to local audit database.",
        platformAction: "Quality Engine verifies thruster limits (Thrust <= 450kN). Records events offline."
      }
    ],
    anomalyChain: [
      { time: "08:00 AM", text: "Subcontractor inputs spec sheet values. DataTrust checks limits." },
      { time: "08:05 AM", text: "Alert triggered: Payload specs exceed safe structural bounds." },
      { time: "08:07 AM", text: "Major Vance acknowledges. DataTrust blocks database update." },
      { time: "08:11 AM", text: "Subcontractor corrects calculations, resolving alert." },
      { time: "08:15 AM", text: "Major Vance refreshes sheet, getting safe parameters." }
    ],
    teamSurfaces: [
      { member: "Major John Vance", role: "Program Director", responsibility: "Manages procurement specs", surfaces: "Excel Add-in, Approval Inbox" },
      { member: "Elena Rostova", role: "Systems Engineer", responsibility: "Designs rocket spec parameters", surfaces: "Excel Ribbon, Lineage View" },
      { member: "Sgt. Mike Miller", role: "SecOps Lead", responsibility: "ITAR security, cleanroom configurations", surfaces: "Admin Console" }
    ],
    approvalFlow: [
      { step: "1. Elena Proposes Spec Update", desc: "Elena updates booster specification and clicks Submit." },
      { step: "2. Mike Miller Approves (L1)", desc: "SecOps Lead Mike reviews security clearance mappings." },
      { step: "3. Major Vance Approves (L2)", desc: "VP Vance signs off on final procurement spec changes." },
      { step: "4. Live Deploy (v1.5.0)", desc: "Specifications publish to air-gapped DWH." }
    ],
    auditorFlow: {
      question: "ITAR Inspector: 'Show calculation access history for payload Spec values.'",
      action: "Tom opens offline DataTrust Audit Viewer, exports access records in 1 second.",
      outcome: "Compliance audit successfully passed. Security records verified."
    },
    workflowMapText: `START: Monday 09:00 AM
Elena opens rocket Spec Excel workbook
       │
       ▼
[Clearance Lookup] ── Enclave SSO resolves Elena's clearance credentials
       │
       ▼
[DataTrust Proxy] ── Filters Databricks queries. Blocks classified specifications
       │
       ▼
[ITAR Masking] ── Hides turbine details for unprivileged users
       │
       ▼
Elena clicks [Refresh]
       │
       ▼
[Quality Engine] ── Validates specs (Booster load limits check)
       │
       ▼
[Audit Engine] ── Encrypts and writes access records to local PostgreSQL
       │
END: Monday 09:05 AM`,
    roiStats: {
      hoursSaved: "110 hrs/mo",
      savings: "₹52 Lakhs/yr",
      roi: "20x"
    },
    mermaidChart: `graph TD
    Eng[Contractor Excel] -->|Submit Project Spec| Gate[Offline DataTrust Gate]
    Gate -->|Verify clearance| SSO[Enclave Active Directory]
    Gate -->|Apply Masking| ITAR[ITAR Compliance Engine]
    Gate -->|Write Logs| Postgres[(Offline Audit Database)]
    style Eng fill:#10B981,stroke:#fff,stroke-width:1px,color:#fff
    style Gate fill:#6366F1,stroke:#fff,stroke-width:1px,color:#fff
    style SSO fill:#F59E0B,stroke:#fff,stroke-width:1px,color:#fff
    style ITAR fill:#EF4444,stroke:#fff,stroke-width:1px,color:#fff
    style Postgres fill:#00BFA5,stroke:#fff,stroke-width:1px,color:#fff`
  },
  glaxosmithkline: {
    company: "GlaxoSmithKline",
    industry: "Healthcare & Pharma",
    dbConn: "Snowflake Secure (Compliance Pack)",
    roiText: "85% Less Auditing Time",
    valueImpactText: "Traceability of clinical trial variables",
    persona: {
      name: "Helen Ross",
      role: "Compliance Lead @ GlaxoSmithKline",
      reportsTo: "Dr. Andrew Patel (Director of Research Auditing)",
      primaryTool: "Excel (DataTrust Versioning Connector)",
      goal: "Maintain strict version control and audit logs for clinical trial datasets.",
      pain: "No history tracking for spreadsheet parameters. Researcher changes left no trails.",
      avatarInitials: "HR",
      avatarColor: "#00BFA5"
    },
    beforeAfter: {
      before: [
        { time: "09:00 AM", text: "Researchers edit parameters in shared clinical logs." },
        { time: "11:00 AM", text: "Compliance team reviews logs manually, looking for adjustments." },
        { time: "01:00 PM", text: "Email researchers to track down why a trial variable shifted." },
        { time: "03:00 PM", text: "No central database logging the change history of variables." },
        { time: "05:00 PM", text: "Spend days preparing clinical audits. High compliance risks." }
      ],
      after: [
        { time: "09:00 AM", text: "Open clinical trials master workbook." },
        { time: "09:02 AM", text: "DataTrust registers research parameters in Git-like snapshots." },
        { time: "09:04 AM", text: "Click 'View Version History' to track variable edits (v1.1.1 vs v1.2.0)." },
        { time: "09:08 AM", text: "Run pre-change impact analysis before publishing dataset updates." },
        { time: "09:10 AM", text: "Export complete compliance logs for audit reviews instantly." }
      ]
    },
    platformJourney: [
      {
        step: "Step 1",
        title: "Helen Opens Excel & Loads Version Manager",
        userView: "DataTrust pane loads. Shows revision timelines of trial variables.",
        platformAction: "SSO verifies identity. DataTrust pulls Git-like snapshots from CSM database."
      },
      {
        step: "Step 2",
        title: "Reviews Metrics History",
        userView: "Helen compares change entries side-by-side inside the workbook.",
        platformAction: "Compares version registry tables. Traces changes back to specific author IDs."
      },
      {
        step: "Step 3",
        title: "Runs Impact Simulation",
        userView: "Simulation reports: '3 pipelines, 12 reports affected by variable update'.",
        platformAction: "Calculates metric dependency maps. Validates rules on target Snowflake tables."
      }
    ],
    anomalyChain: [
      { time: "08:00 AM", text: "Researcher edits threshold values. DataTrust checks ranges." },
      { time: "08:05 AM", text: "Alert: Efficacy constants have modified. Review suggested." },
      { time: "08:07 AM", text: "Helen acknowledges. System locks variable edits pending approvals." },
      { time: "08:11 AM", text: "Researcher details change reason. Andrew Patel signs off." },
      { time: "08:15 AM", text: "Alert resolves. Excel updates to current approved version." }
    ],
    teamSurfaces: [
      { member: "Helen Ross", role: "Compliance Lead", responsibility: "Tracks variable version control", surfaces: "Excel Add-in, Versioning Console" },
      { member: "Andrew Patel", role: "Research Audit Director", responsibility: "Verifies clinical compliance", surfaces: "Approval Inbox, Quality Alerts" },
      { member: "Raj Sharma", role: "Data Engineer", responsibility: "Maintains Snowflake schemas", surfaces: "Admin Console" }
    ],
    approvalFlow: [
      { step: "1. Researcher Edits Metric", desc: "Researcher adjusts dosage baseline constant in sheets." },
      { step: "2. Helen Approves (L1)", desc: "Helen runs impact checks to ensure validation rules remain healthy." },
      { step: "3. Andrew Approves (L2)", desc: "Audit Director signs off on final clinical trial baseline update." },
      { step: "4. Change Deployed (v2.3.0)", desc: "Variable logs commit. Version updates globally in the CSM." }
    ],
    auditorFlow: {
      question: "Regulatory Audit: 'Provide history of clinical metrics used in June reports.'",
      action: "Helen opens DataTrust Audit Trail, searches metric revisions, exports signed PDF.",
      outcome: "Clinical metrics verified. Audit completed in 10 minutes."
    },
    workflowMapText: `START: Monday 09:00 AM
Helen opens clinical trial sheet (Version Manager loads)
       │
       ▼
[SSO Validation] ── Resolves Helen's compliance clearances
       │
       ▼
[Metadata Snapshot] ── Pulls variable edit logs from Postgres
       │
       ▼
Helen clicks [View History]
       │
       ▼
[Version Comparer] ── Displays side-by-side metric definitions (v1.1 vs v1.2)
       │
       ▼
[Impact Engine] ── Models how changes alter downstream trial sheets
       │
       ▼
[Audit Engine] ── Generates PDF compliance files in 1.2 seconds
       │
END: Monday 09:10 AM`,
    roiStats: {
      hoursSaved: "115 hrs/mo",
      savings: "₹48 Lakhs/yr",
      roi: "14x"
    },
    mermaidChart: `graph TD
    Excel[Excel Add-in] -->|Submit Update| VM[DataTrust Version Manager]
    VM -->|Git Commit| History[(Immutable Metadata History)]
    VM -->|Impact Analysis| Visual[Pre-Change Impact Graph]
    style Excel fill:#10B981,stroke:#fff,stroke-width:1px,color:#fff
    style VM fill:#6366F1,stroke:#fff,stroke-width:1px,color:#fff
    style History fill:#00BFA5,stroke:#fff,stroke-width:1px,color:#fff
    style Visual fill:#F59E0B,stroke:#fff,stroke-width:1px,color:#fff`
  },
  procterandgamble: {
    company: "Procter & Gamble",
    industry: "Consumer Goods",
    dbConn: "Microsoft Fabric & Snowflake",
    roiText: "Real-time Supply Chain",
    valueImpactText: "22% reduction in stockouts",
    persona: {
      name: "Vikram Malhotra",
      role: "Global Logistics Planner @ P&G",
      reportsTo: "Nisha Goel (Supply Chain Lead)",
      primaryTool: "Excel (DataTrust Live Fabric Connector)",
      goal: "Track regional inventory stock quantities in real time and schedule shipments.",
      pain: "Logistics planners worked with 48-hour-old data, causing warehouse stockouts.",
      avatarInitials: "VM",
      avatarColor: "#00BFA5"
    },
    beforeAfter: {
      before: [
        { time: "09:00 AM", text: "Wait for nightly batch extraction scripts to output files." },
        { time: "11:00 AM", text: "Import inventory logs to spreadsheets. Data is already 24 hours stale." },
        { time: "01:00 PM", text: "Manually reconcile warehouse logs. Spot typos in SKU codes." },
        { time: "03:00 PM", text: "Logistics orders submitted based on inaccurate data estimates." },
        { time: "05:00 PM", text: "Refinery/distribution stockouts identified too late." }
      ],
      after: [
        { time: "09:00 AM", text: "Open shipping workbook connected to Snowflake and Fabric." },
        { time: "09:01 AM", text: "Click 'Refresh All' — live metrics load in sub-seconds." },
        { time: "09:02 AM", text: "Upstash Redis sync fetches current warehouse capacities." },
        { time: "09:04 AM", text: "Verify inventories, run automated checks on SKU format tags." },
        { time: "09:05 AM", text: "Place logistics orders based on live numbers." }
      ]
    },
    platformJourney: [
      {
        step: "Step 1",
        title: "Vikram Opens Excel & Authenticates",
        userView: "Workbook loads. DataTrust ribbon connects to regional nodes.",
        platformAction: "SSO verifies identity. Locks connection parameters to Fabric inventory APIs."
      },
      {
        step: "Step 2",
        title: "Clicks 'Refresh'",
        userView: "Live inventory stock levels populate cells in under 2 seconds.",
        platformAction: "Checks Upstash Redis cache. Retrieves cached queries, executing Snowflake connections only on cache misses."
      },
      {
        step: "Step 3",
        title: "Reconciliation & Check",
        userView: "Rules check parameters automatically. Corrects formatting discrepancies.",
        platformAction: "Quality Engine checks bounds (SKU stock >= Safety_Stock). Auto-Correction V2 fixes shifted headers."
      }
    ],
    anomalyChain: [
      { time: "08:00 AM", text: "ETL pipeline runs. Quality Engine flags anomaly: SKU quantities duplicate." },
      { time: "08:05 AM", text: "Alert sent to Vikram (Email) and data leads (Slack)." },
      { time: "08:07 AM", text: "Vikram acknowledges. DataTrust Auto-Correction removes duplicate keys." },
      { time: "08:11 AM", text: "Inventory levels corrected. Anomaly status changes to resolved." },
      { time: "08:15 AM", text: "Vikram clicks refresh, loading accurate product quantities." }
    ],
    teamSurfaces: [
      { member: "Vikram Malhotra", role: "Logistics Planner", responsibility: "Schedules product distribution", surfaces: "Excel Add-in, Audit Viewer" },
      { member: "Nisha Goel", role: "Logistics Lead", responsibility: "Manages shipment SLAs", surfaces: "Approval Inbox, Alert Center" },
      { member: "Rahul Dev", role: "Data Engineer", responsibility: "Maintains Fabric connectors", surfaces: "Admin Console" }
    ],
    approvalFlow: [
      { step: "1. Nisha Updates Safety Threshold", desc: "Nisha adjusts safety stock limit for liquid soaps to 12k units." },
      { step: "2. Rahul Approves (L1)", desc: "Rahul reviews schema constraints to verify database limits." },
      { step: "3. Nisha Approves (L2)", desc: "Lead signs off on new threshold. Change commits globally." },
      { step: "4. Live Update (v2.2.0)", desc: "Vikram refreshes Excel. Updated bounds apply to SKU columns." }
    ],
    auditorFlow: {
      question: "Operations Audit: 'Provide shipment history and valuation tracking logs.'",
      action: "Nisha opens DataTrust Audit Trail, searches logistics, exports signed audit PDF.",
      outcome: "Valuations and deliveries verified. Audit completed in minutes."
    },
    workflowMapText: `START: Monday 09:00 AM
Vikram opens logistics Excel workbook
       │
       ▼
[SSO Validation] ── Resolves Vikram's distribution clearances
       │
       ▼
[Live Connection] ── Connects to Upstash Redis cache
       │
  ┌────┴────┐
  │ Cache?  │
  └────┬────┘
  YES  │          NO
       │          └──► Queries Snowflake and Microsoft Fabric
       │               Loads data into Redis Cache
       │               ◄──────────────────────────────────┘
       ▼
[Quality Engine] ── Runs checks (SKUs checks, non-negative stocks)
       │
       ▼
[Audit Engine] ── Logs transaction metrics to PostgreSQL
       │
END: Monday 09:05 AM`,
    roiStats: {
      hoursSaved: "105 hrs/mo",
      savings: "₹42 Lakhs/yr",
      roi: "13x"
    },
    mermaidChart: `graph TD
    Planners[Global Planners Excel] -->|Fast WebSocket| Redis[Upstash Redis Cache]
    Redis -->|Instantly Return Cached Metrics| Planners
    DB[(Microsoft Fabric / Snowflake)] -->|Ingest Stream| Redis
    style Planners fill:#10B981,stroke:#fff,stroke-width:1px,color:#fff
    style Redis fill:#F59E0B,stroke:#fff,stroke-width:1px,color:#fff
    style DB fill:#00BFA5,stroke:#fff,stroke-width:1px,color:#fff`
  },
  goodyeartireandrubber: {
    company: "Goodyear Tire & Rubber",
    industry: "Manufacturing",
    dbConn: "Databricks & Kafka Streams",
    roiText: "Automated Bounds Check",
    valueImpactText: "Caught defects 4x faster",
    persona: {
      name: "Rajesh Kumar",
      role: "Quality Control Lead @ Goodyear",
      reportsTo: "Nisha Patel (Manufacturing Director)",
      primaryTool: "Excel (DataTrust Kafka Connector)",
      goal: "Analyze tire tread thickness metrics and flag manufacturing exceptions.",
      pain: "Technicians manually copying telemetry parameters into spreadsheets, causing typos.",
      avatarInitials: "RK",
      avatarColor: "#F59E0B"
    },
    beforeAfter: {
      before: [
        { time: "09:00 AM", text: "Download raw machinery telemetry log files from depots." },
        { time: "11:00 AM", text: "Copy and paste tread metrics into local analysis spreadsheets." },
        { time: "01:00 PM", text: "Manual checking of values. Misplaced decimal errors go unnoticed." },
        { time: "03:00 PM", text: "Quality reports emailed to production directors." },
        { time: "05:00 PM", text: "Manufacturing anomalies identified after product has shipped." }
      ],
      after: [
        { time: "09:00 AM", text: "Open QC sheet (DataTrust Kafka connection active)." },
        { time: "09:01 AM", text: "Click 'Refresh' — live parameters stream from Databricks." },
        { time: "09:02 AM", text: "AI rule engine verifies tread thickness bounds automatically." },
        { time: "09:04 AM", text: "Review flagged anomalies on screen. Trigger recalibrations." },
        { time: "09:05 AM", text: "Sync verified reports to master database with full audit trail." }
      ]
    },
    platformJourney: [
      {
        step: "Step 1",
        title: "Rajesh Opens Excel & SSO Authenticates",
        userView: "Workbook loads. Connection parameters link to factory telemetry nodes.",
        platformAction: "SSO verifies credentials. Connects to Kafka stream client."
      },
      {
        step: "Step 2",
        title: "Clicks 'Refresh'",
        userView: "Live tread thickness parameters populate cells in under 2 seconds.",
        platformAction: "Queries Databricks. Fetches historical baselines and streams current metrics."
      },
      {
        step: "Step 3",
        title: "Auto-Validation & Bounds checking",
        userView: "Out-of-spec thicknesses highlighted. Auto-Correction flags anomalies.",
        platformAction: "Quality Engine checks bounds (Tread BETWEEN 8mm AND 12mm). Records exceptions."
      }
    ],
    anomalyChain: [
      { time: "08:00 AM", text: "Telemetry stream runs. Quality Engine flags anomaly: Tread thickness is 14mm." },
      { time: "08:05 AM", text: "Alert sent to Rajesh (Email) and engineers (Slack)." },
      { time: "08:07 AM", text: "Rajesh acknowledges. Systems update status to 'Investigating'." },
      { time: "08:11 AM", text: "Technician recalibrates molding machine, resolving alert." },
      { time: "08:15 AM", text: "Rajesh refreshes sheet, verifying tread thickness returned to normal." }
    ],
    teamSurfaces: [
      { member: "Rajesh Kumar", role: "Quality Control Lead", responsibility: "Validates product specifications", surfaces: "Excel Add-in, Lineage View" },
      { member: "Nisha Patel", role: "Manufacturing Lead", responsibility: "Manages assembly SLA yields", surfaces: "Approval Inbox, Alert Center" },
      { member: "Amit Goel", role: "Data Engineer", responsibility: "Maintains Databricks schemas", surfaces: "Admin Console" }
    ],
    approvalFlow: [
      { step: "1. Nisha Updates Thresholds", desc: "Nisha adjusts tread thickness baseline limits in the CSM." },
      { step: "2. Amit Approves (L1)", desc: "Amit verifies schema parameters on Snowflake database." },
      { step: "3. Rajesh Approves (L2)", desc: "QC Lead Rajesh signs off on new limits. Changes commit." },
      { step: "4. Rules Active (v2.0.1)", desc: "Updated rules sync to sheets. Formula ranges adjust." }
    ],
    auditorFlow: {
      question: "Product Safety Audit: 'Provide history of tread thickness variables.'",
      action: "Nisha opens DataTrust Audit Trail, searches metrics, exports signed PDF.",
      outcome: "Lineage and safety logs verified. Audit completed in 10 minutes."
    },
    workflowMapText: `START: Monday 09:00 AM
Rajesh opens QC Excel workbook
       │
       ▼
[SSO Validation] ── Resolves Rajesh's factory clearance level
       │
       ▼
[Databricks Connector] ── Connects to Kafka telemetry stream
       │
       ▼
Rajesh clicks [Refresh]
       │
       ▼
[Live Connection] ── Queries Databricks database. Loads metrics in 1.4s
       │
       ▼
[Quality Engine] ── Runs checks (Tread bounds, sensor validation)
       │
       ▼
[Audit Engine] ── Logs quality exceptions to PostgreSQL
       │
END: Monday 09:05 AM`,
    roiStats: {
      hoursSaved: "110 hrs/mo",
      savings: "₹40 Lakhs/yr",
      roi: "14x"
    },
    mermaidChart: `graph LR
    Sensors[Factory Sensors] -->|Telemetry| Kafka[Kafka Event Bus]
    Kafka -->|Stream Ingestion| DB[(Databricks Lakehouse)]
    DB -->|Fetch| DT[DataTrust AI Layer]
    DT -->|Infer Bounds & Alerts| Excel[Quality Control Spreadsheet]
    style Sensors fill:#EC4899,stroke:#fff,stroke-width:1px,color:#fff
    style Kafka fill:#F59E0B,stroke:#fff,stroke-width:1px,color:#fff
    style DB fill:#00BFA5,stroke:#fff,stroke-width:1px,color:#fff
    style DT fill:#6366F1,stroke:#fff,stroke-width:1px,color:#fff
    style Excel fill:#10B981,stroke:#fff,stroke-width:1px,color:#fff`
  },
  johndeere: {
    company: "John Deere",
    industry: "Manufacturing",
    dbConn: "Google BigQuery & Amazon Redshift",
    roiText: "Unified Cloud Schema",
    valueImpactText: "Forecasting across 2,000+ dealers",
    persona: {
      name: "Claire Bennett",
      role: "Operations Planner @ John Deere",
      reportsTo: "Markus Vance (Operations Director)",
      primaryTool: "Excel (DataTrust NLQ Ribbon)",
      goal: "Analyze dealer inventories across Redshift and BigQuery databases.",
      pain: "Operations log fragments across different clouds, causing forecast errors.",
      avatarInitials: "CB",
      avatarColor: "#00BFA5"
    },
    beforeAfter: {
      before: [
        { time: "09:00 AM", text: "Run Redshift query for dealer inventory logs." },
        { time: "11:00 AM", text: "Run separate BigQuery for telematics data." },
        { time: "01:00 PM", text: "Manually align schemas and copy-paste values in Excel." },
        { time: "03:00 PM", text: "Re-calculate formulas to verify aggregate numbers." },
        { time: "05:00 PM", text: "Forecasting reports finished with high margin of error." }
      ],
      after: [
        { time: "09:00 AM", text: "Open forecast sheet (DataTrust Multi-Cloud connector loads)." },
        { time: "09:01 AM", text: "Ask query in Excel ribbon: 'Show Q3 dealer inventory'." },
        { time: "09:02 AM", text: "DataTrust queries both clouds and unifies schemas in 2s." },
        { time: "09:04 AM", text: "Review live charts. Run automated quality checks." },
        { time: "09:05 AM", text: "Publish forecasts with full audit logs. Done." }
      ]
    },
    platformJourney: [
      {
        step: "Step 1",
        title: "Claire Opens Excel & SSO Authenticates",
        userView: "Workbook loads. DataTrust ribbon connects to cloud enclaves.",
        platformAction: "SSO verifies credentials. Loads metadata definitions from central CSM."
      },
      {
        step: "Step 2",
        title: "Claire Asks NLQ Query",
        userView: "Claire types question in plain English. Results populate cells.",
        platformAction: "pgvector semantic engine maps query. Groq translates question to unified SQL."
      },
      {
        step: "Step 3",
        title: "Federated Query & Sync",
        userView: "Inventory figures pull from BigQuery and Redshift automatically.",
        platformAction: "Query router runs federated queries, unifies schemas, and returns data."
      }
    ],
    anomalyChain: [
      { time: "08:00 AM", text: "Nightly sync runs. Quality Engine flags anomaly: Dealer codes shifted." },
      { time: "08:05 AM", text: "Alert sent to Claire (Email) and engineers (Slack)." },
      { time: "08:07 AM", text: "Claire acknowledges. DataTrust Auto-Correction fixes cell alignment." },
      { time: "08:11 AM", text: "Metrics corrected. Anomaly status changes to resolved." },
      { time: "08:15 AM", text: "Claire refreshes sheet, loading aligned forecast data." }
    ],
    teamSurfaces: [
      { member: "Claire Bennett", role: "Operations Planner", responsibility: "Manages dealer inventories", surfaces: "Excel Add-in, Lineage View" },
      { member: "Markus Vance", role: "Operations Director", responsibility: "Reviews and approves forecasts", surfaces: "Approval Inbox, Alert Center" },
      { member: "Rajesh Dev", role: "Data Engineer", responsibility: "Maintains cloud schemas", surfaces: "Admin Console" }
    ],
    approvalFlow: [
      { step: "1. Markus Updates Forecast Rule", desc: "Markus updates inventory limit criteria in the CSM." },
      { step: "2. Rajesh Approves (L1)", desc: "Rajesh verifies Snowflake and BigQuery connection schemas." },
      { step: "3. Claire Approves (L2)", desc: "Planner Claire signs off on final rule modifications." },
      { step: "4. Live Update (v2.1.0)", desc: "Updated rules sync to sheets. Calculations lock to new limits." }
    ],
    auditorFlow: {
      question: "Forecasting Audit: 'Provide history of dealer stock definitions.'",
      action: "Claire opens DataTrust Audit Trail, searches definitions, exports signed PDF.",
      outcome: "Inventory definitions and revisions verified. Audit completed in minutes."
    },
    workflowMapText: `START: Monday 09:00 AM
Claire opens forecast Excel workbook
       │
       ▼
[SSO Validation] ── Resolves Claire's planning clearances
       │
       ▼
[NLQ Engine] ── Translates Claire's question to unified SQL
       │
       ▼
[Query Router] ── Routes queries to Redshift & BigQuery
       │
       ▼
[Live Connection] ── Queries databases. Loads unified metrics in 2s
       │
       ▼
[Quality Engine] ── Runs checks (SKU counts, dealer codes)
       │
       ▼
[Audit Engine] ── Logs query event to PostgreSQL audit store
       │
END: Monday 09:05 AM`,
    roiStats: {
      hoursSaved: "100 hrs/mo",
      savings: "₹38 Lakhs/yr",
      roi: "13x"
    },
    mermaidChart: `graph TD
    Planner[Planners Excel Ribbon] -->|NLQ: 'Show dealer stock'| NLQ[DataTrust NLQ Engine]
    NLQ -->|Translate query| Fed[Federated Query Router]
    Fed -->|Redshift Query| RS[(Amazon Redshift)]
    Fed -->|BigQuery Query| BQ[(Google BigQuery)]
    RS & BQ -->|Aggregate Results| Planner
    style Planner fill:#10B981,stroke:#fff,stroke-width:1px,color:#fff
    style NLQ fill:#6366F1,stroke:#fff,stroke-width:1px,color:#fff
    style Fed fill:#F59E0B,stroke:#fff,stroke-width:1px,color:#fff
    style RS fill:#EF4444,stroke:#fff,stroke-width:1px,color:#fff
    style BQ fill:#3B82F6,stroke:#fff,stroke-width:1px,color:#fff`
  },
  whirlpool: {
    company: "Whirlpool",
    industry: "Manufacturing",
    dbConn: "Snowflake DWH (Granular Workspaces)",
    roiText: "Unified Calculations",
    valueImpactText: "Disputes down by 95%",
    persona: {
      name: "Jean-Pierre",
      role: "Europe Logistics Manager @ Whirlpool",
      reportsTo: "Astrid Lindgren (CFO Office Coordinator)",
      primaryTool: "Excel (DataTrust Workspace Ribbon)",
      goal: "Track yield metrics and shipping times globally with standardized definitions.",
      pain: "Planners in Europe and NA used differing calculation metrics, causing board disputes.",
      avatarInitials: "JP",
      avatarColor: "#00BFA5"
    },
    beforeAfter: {
      before: [
        { time: "09:00 AM", text: "Download shipping logs from regional SQL instances." },
        { time: "11:00 AM", text: "Import values to spreadsheets. Run calculation scripts." },
        { time: "01:00 PM", text: "Discrepancy identified between Europe and NA yield reports." },
        { time: "03:00 PM", text: "Attempt to manually reconcile calculation criteria via email." },
        { time: "05:00 PM", text: "Board meeting delayed due to conflicting metric definitions." }
      ],
      after: [
        { time: "09:00 AM", text: "Open yields worksheet linked to central DataTrust Workspace." },
        { time: "09:01 AM", text: "Click 'Refresh' — yield metrics pull live from Snowflake." },
        { time: "09:02 AM", text: "Master definitions enforce standardized formulas automatically." },
        { time: "09:04 AM", text: "Review logistics reports. Auto-Correction flags format shifts." },
        { time: "09:05 AM", text: "Publish reports with unified yield metrics." }
      ]
    },
    platformJourney: [
      {
        step: "Step 1",
        title: "Jean Opens Excel & SSO Authenticates",
        userView: "Workbook loads. DataTrust ribbon connects to Europe workspace node.",
        platformAction: "SSO verifies credentials. Maps connection schema to Snowflake views."
      },
      {
        step: "Step 2",
        title: "Clicks 'Refresh'",
        userView: "Live logistics yields populate spreadsheet in under 2 seconds.",
        platformAction: "Queries Snowflake. Applies yield metrics defined in central CSM."
      },
      {
        step: "Step 3",
        title: "Reconciliation & Check",
        userView: "Yield parameters verified. Click 'Publish Report'.",
        platformAction: "Quality Engine verifies parameters. Logs writebacks to central audit ledger."
      }
    ],
    anomalyChain: [
      { time: "08:00 AM", text: "Yield sync runs. Quality Engine flags anomaly: Yield ratios out of bounds." },
      { time: "08:05 AM", text: "Alert sent to Jean (Email) and data leads (Slack)." },
      { time: "08:07 AM", text: "Jean acknowledges. DataTrust Auto-Correction adjusts out-of-spec cells." },
      { time: "08:11 AM", text: "Yield metrics corrected. Anomaly status changes to resolved." },
      { time: "08:15 AM", text: "Jean refreshes sheet, loading correct metrics." }
    ],
    teamSurfaces: [
      { member: "Jean-Pierre", role: "Logistics Manager", responsibility: "Tracks European yields", surfaces: "Excel Add-in, Audit Viewer" },
      { member: "Astrid Lindgren", role: "CFO Lead", responsibility: "Signs off on global yields", surfaces: "Approval Inbox, Alert Center" },
      { member: "Sarah Dev", role: "Data Engineer", responsibility: "Maintains Snowflake schemas", surfaces: "Admin Console" }
    ],
    approvalFlow: [
      { step: "1. Astrid Updates Yield Metric", desc: "Astrid adjusts standard yield metric in the CSM." },
      { step: "2. Sarah Approves (L1)", desc: "Sarah verifies Snowflake connection schemas." },
      { step: "3. Jean Approves (L2)", desc: "Jean-Pierre signs off on new yield parameters." },
      { step: "4. Live Update (v2.3.0)", desc: "Updated rules sync. yield metrics lock globally." }
    ],
    auditorFlow: {
      question: "Yield Audit: 'Provide history of global yield definitions.'",
      action: "Astrid opens DataTrust Audit Trail, searches yields, exports signed PDF.",
      outcome: "Yield definitions verified. Audit completed in minutes."
    },
    workflowMapText: `START: Monday 09:00 AM
Jean opens logistics Excel workbook
       │
       ▼
[SSO Validation] ── Resolves Jean's logistics clearances
       │
       ▼
[Live Connection] ── Queries Snowflake database. Loads metrics in 1.4s
       │
       ▼
[Quality Engine] ── Runs checks (Yield ratios checks, non-negative yields)
       │
       ▼
[Audit Engine] ── Logs yields metrics to PostgreSQL
       │
END: Monday 09:05 AM`,
    roiStats: {
      hoursSaved: "105 hrs/mo",
      savings: "₹42 Lakhs/yr",
      roi: "13x"
    },
    mermaidChart: `graph TD
    EU[Europe Logistics Excel] -->|Fetch Master Definition| CSM[DataTrust Semantic Layer]
    NA[North America Excel] -->|Fetch Master Definition| CSM
    CSM -->|Single Version of Truth| DB[(Snowflake Warehouse)]
    style EU fill:#10B981,stroke:#fff,stroke-width:1px,color:#fff
    style NA fill:#10B981,stroke:#fff,stroke-width:1px,color:#fff
    style CSM fill:#6366F1,stroke:#fff,stroke-width:1px,color:#fff
    style DB fill:#00BFA5,stroke:#fff,stroke-width:1px,color:#fff`
  },
  bpexploration: {
    company: "BP Exploration",
    industry: "Energy",
    dbConn: "Databricks Core (Geological Tables)",
    roiText: "Formula Integrity",
    valueImpactText: "Zero drill errors from modeling typos",
    persona: {
      name: "Marcus Thorne",
      role: "Geologist Analyst @ BP Exploration",
      reportsTo: "Nisha Patel (Exploration Director)",
      primaryTool: "Excel (DataTrust Lineage Ribbon)",
      goal: "Analyze drilling projection variables and track formula dependencies.",
      pain: "Calculations drift in spreadsheets, risking multi-million dollar dry holes.",
      avatarInitials: "MT",
      avatarColor: "#00BFA5"
    },
    beforeAfter: {
      before: [
        { time: "09:00 AM", text: "Download raw geological telemetry files from depots." },
        { time: "11:00 AM", text: "Copy and paste parameters into local analysis spreadsheets." },
        { time: "01:00 PM", text: "Discrepancy identified between different geologists' metrics." },
        { time: "03:00 PM", text: "Attempt to manually reconcile calculation variables." },
        { time: "05:00 PM", text: "Exploration reports finished with high margin of error." }
      ],
      after: [
        { time: "09:00 AM", text: "Open forecast sheet (DataTrust Lineage connector loads)." },
        { time: "09:01 AM", text: "Click 'Refresh' — live metrics pull from Databricks." },
        { time: "09:02 AM", text: "Data Lineage traces calculations to source tables automatically." },
        { time: "09:04 AM", text: "Review status and auto-corrected parameters. Click 'Publish'." },
        { time: "09:05 AM", text: "Publish forecasts with full audit logs. Done." }
      ]
    },
    platformJourney: [
      {
        step: "Step 1",
        title: "Marcus Opens Excel & SSO Authenticates",
        userView: "Workbook loads. DataTrust ribbon connects to DWH.",
        platformAction: "SSO verifies credentials. Loads metadata definitions from central CSM."
      },
      {
        step: "Step 2",
        title: "Clicks 'Refresh'",
        userView: "Live inventory stock levels populate cells in under 2 seconds.",
        platformAction: "Queries Snowflake. Applies yield metrics defined in central CSM."
      },
      {
        step: "Step 3",
        title: "Reconciliation & Check",
        userView: "Yield parameters verified. Click 'Publish Report'.",
        platformAction: "Quality Engine verifies parameters. Logs writebacks to central audit ledger."
      }
    ],
    anomalyChain: [
      { time: "08:00 AM", text: "Telemetry stream runs. Quality Engine flags anomaly: Yield ratios out of bounds." },
      { time: "08:05 AM", text: "Alert sent to Marcus (Email) and data leads (Slack)." },
      { time: "08:07 AM", text: "Marcus acknowledges. DataTrust Auto-Correction adjusts out-of-spec cells." },
      { time: "08:11 AM", text: "Yield metrics corrected. Anomaly status changes to resolved." },
      { time: "08:15 AM", text: "Marcus refreshes sheet, loading correct metrics." }
    ],
    teamSurfaces: [
      { member: "Marcus Thorne", role: "Geologist Analyst", responsibility: "Validates drilling metrics", surfaces: "Excel Add-in, Lineage View" },
      { member: "Nisha Patel", role: "Exploration Lead", responsibility: "Manages yields SLAs", surfaces: "Approval Inbox, Alert Center" },
      { member: "Amit Goel", role: "Data Engineer", responsibility: "Maintains Databricks schemas", surfaces: "Admin Console" }
    ],
    approvalFlow: [
      { step: "1. Nisha Updates Thresholds", desc: "Nisha adjusts tread thickness baseline limits in the CSM." },
      { step: "2. Amit Approves (L1)", desc: "Amit verifies schema parameters on Snowflake database." },
      { step: "3. Marcus Approves (L2)", desc: "QC Lead Marcus signs off on new limits. Changes commit." },
      { step: "4. Rules Active (v2.0.1)", desc: "Updated rules sync to sheets. Formula ranges adjust." }
    ],
    auditorFlow: {
      question: "Product Safety Audit: 'Provide history of tread thickness variables.'",
      action: "Nisha opens DataTrust Audit Trail, searches metrics, exports signed PDF.",
      outcome: "Lineage and safety logs verified. Audit completed in 10 minutes."
    },
    workflowMapText: `START: Monday 09:00 AM
Marcus opens drilling Excel workbook
       │
       ▼
[SSO Validation] ── Resolves Marcus's exploration clearances
       │
       ▼
[Databricks Connector] ── Connects to Kafka telemetry stream
       │
       ▼
Marcus clicks [Refresh]
       │
       ▼
[Live Connection] ── Queries Databricks database. Loads metrics in 1.4s
       │
       ▼
[Quality Engine] ── Runs checks (Tread bounds, sensor validation)
       │
       ▼
[Audit Engine] ── Logs quality exceptions to PostgreSQL
       │
END: Monday 09:05 AM`,
    roiStats: {
      hoursSaved: "110 hrs/mo",
      savings: "₹40 Lakhs/yr",
      roi: "14x"
    },
    mermaidChart: `graph TD
    Excel[Drilling Spreadsheet Cell] -->|Trace formula| Lineage[DataTrust Lineage View]
    Lineage -->|Upstream Table| Raw[(Geological Raw Logs)]
    Lineage -->|Auto-Docs| AI[AI Plain English Definition]
    style Excel fill:#10B981,stroke:#fff,stroke-width:1px,color:#fff
    style Lineage fill:#6366F1,stroke:#fff,stroke-width:1px,color:#fff
    style Raw fill:#00BFA5,stroke:#fff,stroke-width:1px,color:#fff
    style AI fill:#F59E0B,stroke:#fff,stroke-width:1px,color:#fff`
  },
  statoilequinor: {
    company: "Statoil (Equinor)",
    industry: "Energy",
    dbConn: "Equinor Core DWH (Secure Approvals)",
    roiText: "Automated JV Audits",
    valueImpactText: "90% reduction in partner report delays",
    persona: {
      name: "Björn Lindqvist",
      role: "JV Finance Manager @ Statoil",
      reportsTo: "Astrid Lindgren (CFO Office Coordinator)",
      primaryTool: "Excel (DataTrust Approvals Connector)",
      goal: "Enforce cost sheet approval workflows across shared joint venture logs.",
      pain: "Shared partner spreadsheets lacked audit paths, causing budget discrepancies.",
      avatarInitials: "BL",
      avatarColor: "#00BFA5"
    },
    beforeAfter: {
      before: [
        { time: "09:00 AM", text: "Download cost sheets from regional SQL instances." },
        { time: "11:00 AM", text: "Import values to spreadsheets. Run calculation scripts." },
        { time: "01:00 PM", text: "Discrepancy identified between Europe and NA yield reports." },
        { time: "03:00 PM", text: "Attempt to manually reconcile calculation criteria via email." },
        { time: "05:00 PM", text: "Board meeting delayed due to conflicting metric definitions." }
      ],
      after: [
        { time: "09:00 AM", text: "Open yields worksheet linked to central DataTrust Workspace." },
        { time: "09:01 AM", text: "Click 'Refresh' — yield metrics pull live from Snowflake." },
        { time: "09:02 AM", text: "Master definitions enforce standardized formulas automatically." },
        { time: "09:04 AM", text: "Review logistics reports. Auto-Correction flags format shifts." },
        { time: "09:05 AM", text: "Publish reports with unified yield metrics." }
      ]
    },
    platformJourney: [
      {
        step: "Step 1",
        title: "Jean Opens Excel & SSO Authenticates",
        userView: "Workbook loads. DataTrust ribbon connects to Europe workspace node.",
        platformAction: "SSO verifies credentials. Maps connection schema to Snowflake views."
      },
      {
        step: "Step 2",
        title: "Clicks 'Refresh'",
        userView: "Live logistics yields populate spreadsheet in under 2 seconds.",
        platformAction: "Queries Snowflake. Applies yield metrics defined in central CSM."
      },
      {
        step: "Step 3",
        title: "Reconciliation & Check",
        userView: "Yield parameters verified. Click 'Publish Report'.",
        platformAction: "Quality Engine verifies parameters. Logs writebacks to central audit ledger."
      }
    ],
    anomalyChain: [
      { time: "08:00 AM", text: "Yield sync runs. Quality Engine flags anomaly: Yield ratios out of bounds." },
      { time: "08:05 AM", text: "Alert sent to Björn (Email) and data leads (Slack)." },
      { time: "08:07 AM", text: "Björn acknowledges. DataTrust Auto-Correction adjusts out-of-spec cells." },
      { time: "08:11 AM", text: "Yield metrics corrected. Anomaly status changes to resolved." },
      { time: "08:15 AM", text: "Björn refreshes sheet, loading correct metrics." }
    ],
    teamSurfaces: [
      { member: "Björn Lindqvist", role: "JV Finance Manager", responsibility: "Tracks European yields", surfaces: "Excel Add-in, Audit Viewer" },
      { member: "Astrid Lindgren", role: "CFO Lead", responsibility: "Signs off on global yields", surfaces: "Approval Inbox, Alert Center" },
      { member: "Sarah Dev", role: "Data Engineer", responsibility: "Maintains Snowflake schemas", surfaces: "Admin Console" }
    ],
    approvalFlow: [
      { step: "1. Astrid Updates Yield Metric", desc: "Astrid adjusts standard yield metric in the CSM." },
      { step: "2. Sarah Approves (L1)", desc: "Sarah verifies Snowflake connection schemas." },
      { step: "3. Björn Approves (L2)", desc: "Jean-Pierre signs off on new yield parameters." },
      { step: "4. Live Update (v2.3.0)", desc: "Updated rules sync. yield metrics lock globally." }
    ],
    auditorFlow: {
      question: "Yield Audit: 'Provide history of global yield definitions.'",
      action: "Astrid opens DataTrust Audit Trail, searches yields, exports signed PDF.",
      outcome: "Yield definitions verified. Audit completed in minutes."
    },
    workflowMapText: `START: Monday 09:00 AM
Björn opens logistics Excel workbook
       │
       ▼
[SSO Validation] ── Resolves Björn's logistics clearances
       │
       ▼
[Live Connection] ── Queries Snowflake database. Loads metrics in 1.4s
       │
       ▼
[Quality Engine] ── Runs checks (Yield ratios checks, non-negative yields)
       │
       ▼
[Audit Engine] ── Logs yields metrics to PostgreSQL
       │
END: Monday 09:05 AM`,
    roiStats: {
      hoursSaved: "105 hrs/mo",
      savings: "₹42 Lakhs/yr",
      roi: "13x"
    },
    mermaidChart: `graph TD
    Partner[JV Partner Sheet] -->|Submit Update| PM[DataTrust Pipeline Gateway]
    PM -->|Require Approval| Appr1[JV Lead Approval]
    Appr1 -->|Passed| Appr2[Finance Director Approval]
    Appr2 -->|Commit Sync| DB[(Equinor Core DWH)]
    style Partner fill:#10B981,stroke:#fff,stroke-width:1px,color:#fff
    style PM fill:#6366F1,stroke:#fff,stroke-width:1px,color:#fff
    style Appr1 fill:#F59E0B,stroke:#fff,stroke-width:1px,color:#fff
    style Appr2 fill:#EC4899,stroke:#fff,stroke-width:1px,color:#fff
    style DB fill:#00BFA5,stroke:#fff,stroke-width:1px,color:#fff`
  },
  abb: {
    company: "ABB",
    industry: "Automation & Industrial",
    dbConn: "Snowflake DWH (Template Hub)",
    roiText: "Unified Project Health",
    valueImpactText: "Active tracking for 500+ projects",
    persona: {
      name: "Marcus Vance",
      role: "Logistics Manager @ ABB",
      reportsTo: "Astrid Lindgren (CFO Office Coordinator)",
      primaryTool: "Excel (DataTrust Workspace Ribbon)",
      goal: "Track yield metrics and shipping times globally with standardized definitions.",
      pain: "Planners in Europe and NA used differing calculation metrics, causing board disputes.",
      avatarInitials: "MV",
      avatarColor: "#00BFA5"
    },
    beforeAfter: {
      before: [
        { time: "09:00 AM", text: "Download shipping logs from regional SQL instances." },
        { time: "11:00 AM", text: "Import values to spreadsheets. Run calculation scripts." },
        { time: "01:00 PM", text: "Discrepancy identified between Europe and NA yield reports." },
        { time: "03:00 PM", text: "Attempt to manually reconcile calculation criteria via email." },
        { time: "05:00 PM", text: "Board meeting delayed due to conflicting metric definitions." }
      ],
      after: [
        { time: "09:00 AM", text: "Open yields worksheet linked to central DataTrust Workspace." },
        { time: "09:01 AM", text: "Click 'Refresh' — yield metrics pull live from Snowflake." },
        { time: "09:02 AM", text: "Master definitions enforce standardized formulas automatically." },
        { time: "09:04 AM", text: "Review logistics reports. Auto-Correction flags format shifts." },
        { time: "09:05 AM", text: "Publish reports with unified yield metrics." }
      ]
    },
    platformJourney: [
      {
        step: "Step 1",
        title: "Jean Opens Excel & SSO Authenticates",
        userView: "Workbook loads. DataTrust ribbon connects to Europe workspace node.",
        platformAction: "SSO verifies credentials. Maps connection schema to Snowflake views."
      },
      {
        step: "Step 2",
        title: "Clicks 'Refresh'",
        userView: "Live logistics yields populate spreadsheet in under 2 seconds.",
        platformAction: "Queries Snowflake. Applies yield metrics defined in central CSM."
      },
      {
        step: "Step 3",
        title: "Reconciliation & Check",
        userView: "Yield parameters verified. Click 'Publish Report'.",
        platformAction: "Quality Engine verifies parameters. Logs writebacks to central audit ledger."
      }
    ],
    anomalyChain: [
      { time: "08:00 AM", text: "Yield sync runs. Quality Engine flags anomaly: Yield ratios out of bounds." },
      { time: "08:05 AM", text: "Alert sent to Marcus (Email) and data leads (Slack)." },
      { time: "08:07 AM", text: "Marcus acknowledges. DataTrust Auto-Correction adjusts out-of-spec cells." },
      { time: "08:11 AM", text: "Yield metrics corrected. Anomaly status changes to resolved." },
      { time: "08:15 AM", text: "Marcus refreshes sheet, loading correct metrics." }
    ],
    teamSurfaces: [
      { member: "Marcus Vance", role: "Logistics Manager", responsibility: "Tracks European yields", surfaces: "Excel Add-in, Audit Viewer" },
      { member: "Astrid Lindgren", role: "CFO Lead", responsibility: "Signs off on global yields", surfaces: "Approval Inbox, Alert Center" },
      { member: "Sarah Dev", role: "Data Engineer", responsibility: "Maintains Snowflake schemas", surfaces: "Admin Console" }
    ],
    approvalFlow: [
      { step: "1. Astrid Updates Yield Metric", desc: "Astrid adjusts standard yield metric in the CSM." },
      { step: "2. Sarah Approves (L1)", desc: "Sarah verifies Snowflake connection schemas." },
      { step: "3. Marcus Approves (L2)", desc: "Jean-Pierre signs off on new yield parameters." },
      { step: "4. Live Update (v2.3.0)", desc: "Updated rules sync. yield metrics lock globally." }
    ],
    auditorFlow: {
      question: "Yield Audit: 'Provide history of global yield definitions.'",
      action: "Astrid opens DataTrust Audit Trail, searches yields, exports signed PDF.",
      outcome: "Yield definitions verified. Audit completed in minutes."
    },
    workflowMapText: `START: Monday 09:00 AM
Marcus opens logistics Excel workbook
       │
       ▼
[SSO Validation] ── Resolves Marcus's logistics clearances
       │
       ▼
[Live Connection] ── Queries Snowflake database. Loads metrics in 1.4s
       │
       ▼
[Quality Engine] ── Runs checks (Yield ratios checks, non-negative yields)
       │
       ▼
[Audit Engine] ── Logs yields metrics to PostgreSQL
       │
END: Monday 09:05 AM`,
    roiStats: {
      hoursSaved: "105 hrs/mo",
      savings: "₹42 Lakhs/yr",
      roi: "13x"
    },
    mermaidChart: `graph TD
    Eng[Active Grid Spreadsheet] -->|Sync Milestone| DT[DataTrust Analytics]
    DT -->|Verify Sequence Rules| AE[Quality Alerts Engine]
    AE -->|Flag Delay| Web[Enterprise Program Dashboard]
    style Eng fill:#10B981,stroke:#fff,stroke-width:1px,color:#fff
    style DT fill:#6366F1,stroke:#fff,stroke-width:1px,color:#fff
    style AE fill:#F59E0B,stroke:#fff,stroke-width:1px,color:#fff
    style Web fill:#EC4899,stroke:#fff,stroke-width:1px,color:#fff`
  },
  honeywell: {
    company: "Honeywell",
    industry: "Automation & Industrial",
    dbConn: "Databricks DWH (Cache Node)",
    roiText: "Zero Excel Crashes",
    valueImpactText: "Query performance increased 15x",
    persona: {
      name: "Marcus Vance",
      role: "Logistics Manager @ Honeywell",
      reportsTo: "Astrid Lindgren (CFO Office Coordinator)",
      primaryTool: "Excel (DataTrust Workspace Ribbon)",
      goal: "Track yield metrics and shipping times globally with standardized definitions.",
      pain: "Planners in Europe and NA used differing calculation metrics, causing board disputes.",
      avatarInitials: "MV",
      avatarColor: "#00BFA5"
    },
    beforeAfter: {
      before: [
        { time: "09:00 AM", text: "Download shipping logs from regional SQL instances." },
        { time: "11:00 AM", text: "Import values to spreadsheets. Run calculation scripts." },
        { time: "01:00 PM", text: "Discrepancy identified between Europe and NA yield reports." },
        { time: "03:00 PM", text: "Attempt to manually reconcile calculation criteria via email." },
        { time: "05:00 PM", text: "Board meeting delayed due to conflicting metric definitions." }
      ],
      after: [
        { time: "09:00 AM", text: "Open yields worksheet linked to central DataTrust Workspace." },
        { time: "09:01 AM", text: "Click 'Refresh' — yield metrics pull live from Snowflake." },
        { time: "09:02 AM", text: "Master definitions enforce standardized formulas automatically." },
        { time: "09:04 AM", text: "Review logistics reports. Auto-Correction flags format shifts." },
        { time: "09:05 AM", text: "Publish reports with unified yield metrics." }
      ]
    },
    platformJourney: [
      {
        step: "Step 1",
        title: "Jean Opens Excel & SSO Authenticates",
        userView: "Workbook loads. DataTrust ribbon connects to Europe workspace node.",
        platformAction: "SSO verifies credentials. Maps connection schema to Snowflake views."
      },
      {
        step: "Step 2",
        title: "Clicks 'Refresh'",
        userView: "Live logistics yields populate spreadsheet in under 2 seconds.",
        platformAction: "Queries Snowflake. Applies yield metrics defined in central CSM."
      },
      {
        step: "Step 3",
        title: "Reconciliation & Check",
        userView: "Yield parameters verified. Click 'Publish Report'.",
        platformAction: "Quality Engine verifies parameters. Logs writebacks to central audit ledger."
      }
    ],
    anomalyChain: [
      { time: "08:00 AM", text: "Yield sync runs. Quality Engine flags anomaly: Yield ratios out of bounds." },
      { time: "08:05 AM", text: "Alert sent to Marcus (Email) and data leads (Slack)." },
      { time: "08:07 AM", text: "Marcus acknowledges. DataTrust Auto-Correction adjusts out-of-spec cells." },
      { time: "08:11 AM", text: "Yield metrics corrected. Anomaly status changes to resolved." },
      { time: "08:15 AM", text: "Marcus refreshes sheet, loading correct metrics." }
    ],
    teamSurfaces: [
      { member: "Marcus Vance", role: "Logistics Manager", responsibility: "Tracks European yields", surfaces: "Excel Add-in, Audit Viewer" },
      { member: "Astrid Lindgren", role: "CFO Lead", responsibility: "Signs off on global yields", surfaces: "Approval Inbox, Alert Center" },
      { member: "Sarah Dev", role: "Data Engineer", responsibility: "Maintains Snowflake schemas", surfaces: "Admin Console" }
    ],
    approvalFlow: [
      { step: "1. Astrid Updates Yield Metric", desc: "Astrid adjusts standard yield metric in the CSM." },
      { step: "2. Sarah Approves (L1)", desc: "Sarah verifies Snowflake connection schemas." },
      { step: "3. Marcus Approves (L2)", desc: "Jean-Pierre signs off on new yield parameters." },
      { step: "4. Live Update (v2.3.0)", desc: "Updated rules sync. yield metrics lock globally." }
    ],
    auditorFlow: {
      question: "Yield Audit: 'Provide history of global yield definitions.'",
      action: "Astrid opens DataTrust Audit Trail, searches yields, exports signed PDF.",
      outcome: "Yield definitions verified. Audit completed in minutes."
    },
    workflowMapText: `START: Monday 09:00 AM
Marcus opens logistics Excel workbook
       │
       ▼
[SSO Validation] ── Resolves Marcus's logistics clearances
       │
       ▼
[Live Connection] ── Queries Snowflake database. Loads metrics in 1.4s
       │
       ▼
[Quality Engine] ── Runs checks (Yield ratios checks, non-negative yields)
       │
       ▼
[Audit Engine] ── Logs yields metrics to PostgreSQL
       │
END: Monday 09:05 AM`,
    roiStats: {
      hoursSaved: "105 hrs/mo",
      savings: "₹42 Lakhs/yr",
      roi: "13x"
    },
    mermaidChart: `graph TD
    Excel[Aerospace Engineering Sheet] -->|Query| Cache[DataTrust Redis Cache]
    Cache -->|Cache Hit: <2 sec| Excel
    Cache -->|Cache Miss| DB[(Snowflake / Databricks)]
    style Excel fill:#10B981,stroke:#fff,stroke-width:1px,color:#fff
    style Cache fill:#F59E0B,stroke:#fff,stroke-width:1px,color:#fff
    style DB fill:#00BFA5,stroke:#fff,stroke-width:1px,color:#fff`
  },
  siemens: {
    company: "Siemens",
    industry: "Industrial & Energy",
    dbConn: "Snowflake DWH (Compliance Nodes)",
    roiText: "Audits Completed in 1 Day",
    valueImpactText: "$12M saved in audit overheads",
    persona: {
      name: "Marcus Vance",
      role: "Logistics Manager @ Siemens",
      reportsTo: "Astrid Lindgren (CFO Office Coordinator)",
      primaryTool: "Excel (DataTrust Workspace Ribbon)",
      goal: "Track yield metrics and shipping times globally with standardized definitions.",
      pain: "Planners in Europe and NA used differing calculation metrics, causing board disputes.",
      avatarInitials: "MV",
      avatarColor: "#00BFA5"
    },
    beforeAfter: {
      before: [
        { time: "09:00 AM", text: "Download shipping logs from regional SQL instances." },
        { time: "11:00 AM", text: "Import values to spreadsheets. Run calculation scripts." },
        { time: "01:00 PM", text: "Discrepancy identified between Europe and NA yield reports." },
        { time: "03:00 PM", text: "Attempt to manually reconcile calculation criteria via email." },
        { time: "05:00 PM", text: "Board meeting delayed due to conflicting metric definitions." }
      ],
      after: [
        { time: "09:00 AM", text: "Open yields worksheet linked to central DataTrust Workspace." },
        { time: "09:01 AM", text: "Click 'Refresh' — yield metrics pull live from Snowflake." },
        { time: "09:02 AM", text: "Master definitions enforce standardized formulas automatically." },
        { time: "09:04 AM", text: "Review logistics reports. Auto-Correction flags format shifts." },
        { time: "09:05 AM", text: "Publish reports with unified yield metrics." }
      ]
    },
    platformJourney: [
      {
        step: "Step 1",
        title: "Jean Opens Excel & SSO Authenticates",
        userView: "Workbook loads. DataTrust ribbon connects to Europe workspace node.",
        platformAction: "SSO verifies credentials. Maps connection schema to Snowflake views."
      },
      {
        step: "Step 2",
        title: "Clicks 'Refresh'",
        userView: "Live logistics yields populate spreadsheet in under 2 seconds.",
        platformAction: "Queries Snowflake. Applies yield metrics defined in central CSM."
      },
      {
        step: "Step 3",
        title: "Reconciliation & Check",
        userView: "Yield parameters verified. Click 'Publish Report'.",
        platformAction: "Quality Engine verifies parameters. Logs writebacks to central audit ledger."
      }
    ],
    anomalyChain: [
      { time: "08:00 AM", text: "Yield sync runs. Quality Engine flags anomaly: Yield ratios out of bounds." },
      { time: "08:05 AM", text: "Alert sent to Marcus (Email) and data leads (Slack)." },
      { time: "08:07 AM", text: "Marcus acknowledges. DataTrust Auto-Correction adjusts out-of-spec cells." },
      { time: "08:11 AM", text: "Yield metrics corrected. Anomaly status changes to resolved." },
      { time: "08:15 AM", text: "Marcus refreshes sheet, loading correct metrics." }
    ],
    teamSurfaces: [
      { member: "Marcus Vance", role: "Logistics Manager", responsibility: "Tracks European yields", surfaces: "Excel Add-in, Audit Viewer" },
      { member: "Astrid Lindgren", role: "CFO Lead", responsibility: "Signs off on global yields", surfaces: "Approval Inbox, Alert Center" },
      { member: "Sarah Dev", role: "Data Engineer", responsibility: "Maintains Snowflake schemas", surfaces: "Admin Console" }
    ],
    approvalFlow: [
      { step: "1. Astrid Updates Yield Metric", desc: "Astrid adjusts standard yield metric in the CSM." },
      { step: "2. Sarah Approves (L1)", desc: "Sarah verifies Snowflake connection schemas." },
      { step: "3. Marcus Approves (L2)", desc: "Jean-Pierre signs off on new yield parameters." },
      { step: "4. Live Update (v2.3.0)", desc: "Updated rules sync. yield metrics lock globally." }
    ],
    auditorFlow: {
      question: "Yield Audit: 'Provide history of global yield definitions.'",
      action: "Astrid opens DataTrust Audit Trail, searches yields, exports signed PDF.",
      outcome: "Yield definitions verified. Audit completed in minutes."
    },
    workflowMapText: `START: Monday 09:00 AM
Marcus opens logistics Excel workbook
       │
       ▼
[SSO Validation] ── Resolves Marcus's logistics clearances
       │
       ▼
[Live Connection] ── Queries Snowflake database. Loads metrics in 1.4s
       │
       ▼
[Quality Engine] ── Runs checks (Yield ratios checks, non-negative yields)
       │
       ▼
[Audit Engine] ── Logs yields metrics to PostgreSQL
       │
END: Monday 09:05 AM`,
    roiStats: {
      hoursSaved: "105 hrs/mo",
      savings: "₹42 Lakhs/yr",
      roi: "13x"
    },
    mermaidChart: `graph LR
    User[Grid Operator Sheet] -->|Action| DT[DataTrust Gateway]
    DT -->|Write Audit Event| DB[(PostgreSQL Ledger)]
    DT -->|Secure Sync| SF[(Snowflake DWH)]
    DB -->|1-Second Audit Query| Reg[Regulator Audit Portal]
    style User fill:#10B981,stroke:#fff,stroke-width:1px,color:#fff
    style DT fill:#6366F1,stroke:#fff,stroke-width:1px,color:#fff
    style DB fill:#EF4444,stroke:#fff,stroke-width:1px,color:#fff
    style SF fill:#00BFA5,stroke:#fff,stroke-width:1px,color:#fff
    style Reg fill:#EC4899,stroke:#fff,stroke-width:1px,color:#fff`
  },
  ch2mhill: {
    company: "CH2M Hill",
    industry: "Engineering",
    dbConn: "Databricks (Simulation Workspace)",
    roiText: "Zero Project Collisions",
    valueImpactText: "Change approvals loop speeded up 300%",
    persona: {
      name: "Marcus Vance",
      role: "Logistics Manager @ CH2M Hill",
      reportsTo: "Astrid Lindgren (CFO Office Coordinator)",
      primaryTool: "Excel (DataTrust Workspace Ribbon)",
      goal: "Track yield metrics and shipping times globally with standardized definitions.",
      pain: "Planners in Europe and NA used differing calculation metrics, causing board disputes.",
      avatarInitials: "MV",
      avatarColor: "#00BFA5"
    },
    beforeAfter: {
      before: [
        { time: "09:00 AM", text: "Download shipping logs from regional SQL instances." },
        { time: "11:00 AM", text: "Import values to spreadsheets. Run calculation scripts." },
        { time: "01:00 PM", text: "Discrepancy identified between Europe and NA yield reports." },
        { time: "03:00 PM", text: "Attempt to manually reconcile calculation criteria via email." },
        { time: "05:00 PM", text: "Board meeting delayed due to conflicting metric definitions." }
      ],
      after: [
        { time: "09:00 AM", text: "Open yields worksheet linked to central DataTrust Workspace." },
        { time: "09:01 AM", text: "Click 'Refresh' — yield metrics pull live from Snowflake." },
        { time: "09:02 AM", text: "Master definitions enforce standardized formulas automatically." },
        { time: "09:04 AM", text: "Review logistics reports. Auto-Correction flags format shifts." },
        { time: "09:05 AM", text: "Publish reports with unified yield metrics." }
      ]
    },
    platformJourney: [
      {
        step: "Step 1",
        title: "Jean Opens Excel & SSO Authenticates",
        userView: "Workbook loads. DataTrust ribbon connects to Europe workspace node.",
        platformAction: "SSO verifies credentials. Maps connection schema to Snowflake views."
      },
      {
        step: "Step 2",
        title: "Clicks 'Refresh'",
        userView: "Live logistics yields populate spreadsheet in under 2 seconds.",
        platformAction: "Queries Snowflake. Applies yield metrics defined in central CSM."
      },
      {
        step: "Step 3",
        title: "Reconciliation & Check",
        userView: "Yield parameters verified. Click 'Publish Report'.",
        platformAction: "Quality Engine verifies parameters. Logs writebacks to central audit ledger."
      }
    ],
    anomalyChain: [
      { time: "08:00 AM", text: "Yield sync runs. Quality Engine flags anomaly: Yield ratios out of bounds." },
      { time: "08:05 AM", text: "Alert sent to Marcus (Email) and data leads (Slack)." },
      { time: "08:07 AM", text: "Marcus acknowledges. DataTrust Auto-Correction adjusts out-of-spec cells." },
      { time: "08:11 AM", text: "Yield metrics corrected. Anomaly status changes to resolved." },
      { time: "08:15 AM", text: "Marcus refreshes sheet, loading correct metrics." }
    ],
    teamSurfaces: [
      { member: "Marcus Vance", role: "Logistics Manager", responsibility: "Tracks European yields", surfaces: "Excel Add-in, Audit Viewer" },
      { member: "Astrid Lindgren", role: "CFO Lead", responsibility: "Signs off on global yields", surfaces: "Approval Inbox, Alert Center" },
      { member: "Sarah Dev", role: "Data Engineer", responsibility: "Maintains Snowflake schemas", surfaces: "Admin Console" }
    ],
    approvalFlow: [
      { step: "1. Astrid Updates Yield Metric", desc: "Astrid adjusts standard yield metric in the CSM." },
      { step: "2. Sarah Approves (L1)", desc: "Sarah verifies Snowflake connection schemas." },
      { step: "3. Marcus Approves (L2)", desc: "Jean-Pierre signs off on new yield parameters." },
      { step: "4. Live Update (v2.3.0)", desc: "Updated rules sync. yield metrics lock globally." }
    ],
    auditorFlow: {
      question: "Yield Audit: 'Provide history of global yield definitions.'",
      action: "Astrid opens DataTrust Audit Trail, searches yields, exports signed PDF.",
      outcome: "Yield definitions verified. Audit completed in minutes."
    },
    workflowMapText: `START: Monday 09:00 AM
Marcus opens logistics Excel workbook
       │
       ▼
[SSO Validation] ── Resolves Marcus's logistics clearances
       │
       ▼
[Live Connection] ── Queries Snowflake database. Loads metrics in 1.4s
       │
       ▼
[Quality Engine] ── Runs checks (Yield ratios checks, non-negative yields)
       │
       ▼
[Audit Engine] ── Logs yields metrics to PostgreSQL
       │
END: Monday 09:05 AM`,
    roiStats: {
      hoursSaved: "105 hrs/mo",
      savings: "₹42 Lakhs/yr",
      roi: "13x"
    },
    mermaidChart: `graph TD
    Sub[Subcontractor Sheet] -->|Propose Change| Sim[Simulation Workspace]
    Sim -->|Impact Engine| Graph[Downstream Dependency Graph]
    Graph -->|Alerts| PM[Program Manager Approval]
    style Sub fill:#10B981,stroke:#fff,stroke-width:1px,color:#fff
    style Sim fill:#6366F1,stroke:#fff,stroke-width:1px,color:#fff
    style Graph fill:#F59E0B,stroke:#fff,stroke-width:1px,color:#fff
    style PM fill:#EC4899,stroke:#fff,stroke-width:1px,color:#fff`
  },
  rollsroyce: {
    company: "Rolls Royce",
    industry: "Aerospace",
    dbConn: "Databricks & Spark Streams",
    roiText: "High-Precision Modeling",
    valueImpactText: "Turbine maintenance metrics resolved",
    persona: {
      name: "Marcus Vance",
      role: "Logistics Manager @ Rolls Royce",
      reportsTo: "Astrid Lindgren (CFO Office Coordinator)",
      primaryTool: "Excel (DataTrust Workspace Ribbon)",
      goal: "Track yield metrics and shipping times globally with standardized definitions.",
      pain: "Planners in Europe and NA used differing calculation metrics, causing board disputes.",
      avatarInitials: "MV",
      avatarColor: "#00BFA5"
    },
    beforeAfter: {
      before: [
        { time: "09:00 AM", text: "Download shipping logs from regional SQL instances." },
        { time: "11:00 AM", text: "Import values to spreadsheets. Run calculation scripts." },
        { time: "01:00 PM", text: "Discrepancy identified between Europe and NA yield reports." },
        { time: "03:00 PM", text: "Attempt to manually reconcile calculation criteria via email." },
        { time: "05:00 PM", text: "Board meeting delayed due to conflicting metric definitions." }
      ],
      after: [
        { time: "09:00 AM", text: "Open yields worksheet linked to central DataTrust Workspace." },
        { time: "09:01 AM", text: "Click 'Refresh' — yield metrics pull live from Snowflake." },
        { time: "09:02 AM", text: "Master definitions enforce standardized formulas automatically." },
        { time: "09:04 AM", text: "Review logistics reports. Auto-Correction flags format shifts." },
        { time: "09:05 AM", text: "Publish reports with unified yield metrics." }
      ]
    },
    platformJourney: [
      {
        step: "Step 1",
        title: "Jean Opens Excel & SSO Authenticates",
        userView: "Workbook loads. DataTrust ribbon connects to Europe workspace node.",
        platformAction: "SSO verifies credentials. Maps connection schema to Snowflake views."
      },
      {
        step: "Step 2",
        title: "Clicks 'Refresh'",
        userView: "Live logistics yields populate spreadsheet in under 2 seconds.",
        platformAction: "Queries Snowflake. Applies yield metrics defined in central CSM."
      },
      {
        step: "Step 3",
        title: "Reconciliation & Check",
        userView: "Yield parameters verified. Click 'Publish Report'.",
        platformAction: "Quality Engine verifies parameters. Logs writebacks to central audit ledger."
      }
    ],
    anomalyChain: [
      { time: "08:00 AM", text: "Yield sync runs. Quality Engine flags anomaly: Yield ratios out of bounds." },
      { time: "08:05 AM", text: "Alert sent to Marcus (Email) and data leads (Slack)." },
      { time: "08:07 AM", text: "Marcus acknowledges. DataTrust Auto-Correction adjusts out-of-spec cells." },
      { time: "08:11 AM", text: "Yield metrics corrected. Anomaly status changes to resolved." },
      { time: "08:15 AM", text: "Marcus refreshes sheet, loading correct metrics." }
    ],
    teamSurfaces: [
      { member: "Marcus Vance", role: "Logistics Manager", responsibility: "Tracks European yields", surfaces: "Excel Add-in, Audit Viewer" },
      { member: "Astrid Lindgren", role: "CFO Lead", responsibility: "Signs off on global yields", surfaces: "Approval Inbox, Alert Center" },
      { member: "Sarah Dev", role: "Data Engineer", responsibility: "Maintains Snowflake schemas", surfaces: "Admin Console" }
    ],
    approvalFlow: [
      { step: "1. Astrid Updates Yield Metric", desc: "Astrid adjusts standard yield metric in the CSM." },
      { step: "2. Sarah Approves (L1)", desc: "Sarah verifies Snowflake connection schemas." },
      { step: "3. Marcus Approves (L2)", desc: "Jean-Pierre signs off on new yield parameters." },
      { step: "4. Live Update (v2.3.0)", desc: "Updated rules sync. yield metrics lock globally." }
    ],
    auditorFlow: {
      question: "Yield Audit: 'Provide history of global yield definitions.'",
      action: "Astrid opens DataTrust Audit Trail, searches yields, exports signed PDF.",
      outcome: "Yield definitions verified. Audit completed in minutes."
    },
    workflowMapText: `START: Monday 09:00 AM
Marcus opens logistics Excel workbook
       │
       ▼
[SSO Validation] ── Resolves Marcus's logistics clearances
       │
       ▼
[Live Connection] ── Queries Snowflake database. Loads metrics in 1.4s
       │
       ▼
[Quality Engine] ── Runs checks (Yield ratios checks, non-negative yields)
       │
       ▼
[Audit Engine] ── Logs yields metrics to PostgreSQL
       │
END: Monday 09:05 AM`,
    roiStats: {
      hoursSaved: "105 hrs/mo",
      savings: "₹42 Lakhs/yr",
      roi: "13x"
    },
    mermaidChart: `graph LR
    Engine[Turbine Sensors] -->|High-Freq Logs| DB[(Databricks Lakehouse)]
    DB -->|Pre-compute statistics| DT[DataTrust Semantic Layer]
    DT -->|Cached Fetch| Excel[Turbine Analysis Workbook]
    style Engine fill:#EC4899,stroke:#fff,stroke-width:1px,color:#fff
    style DB fill:#00BFA5,stroke:#fff,stroke-width:1px,color:#fff
    style DT fill:#6366F1,stroke:#fff,stroke-width:1px,color:#fff
    style Excel fill:#10B981,stroke:#fff,stroke-width:1px,color:#fff`
  }
};

// Generates fallback mock metrics dynamically for any company not fully listed above
const getCompanyData = (id) => {
  const compId = id.toLowerCase().replace(/[^a-z0-9]/g, '');
  if (companyDetailsMap[compId]) {
    return companyDetailsMap[compId];
  }

  // Fallback template matching the search list
  const base = directoryData.find(c => c.company.toLowerCase().replace(/[^a-z0-9]/g, '') === compId) || directoryData[0];
  
  const sectorMap = {
    "Energy": { name: "Ingrid", initials: "IB", color: "#10B981" },
    "Aerospace": { name: "Arthur", initials: "AW", color: "#6366F1" },
    "Healthcare & Pharma": { name: "Dr. Sarah", initials: "SK", color: "#EF4444" },
    "Manufacturing": { name: "Rajesh", initials: "RK", color: "#F59E0B" }
  };
  const profile = sectorMap[base.industry] || { name: "Manoj", initials: "MR", color: "#6366F1" };

  return {
    company: base.company,
    industry: base.industry,
    dbConn: "Snowflake DWH Ingest",
    roiText: base.roi,
    valueImpactText: base.metric,
    persona: {
      name: `${profile.name} Singh`,
      role: `Lead Operations Specialist @ ${base.company}`,
      reportsTo: "Priya Sharma (Data Operations Lead)",
      primaryTool: "Excel (DataTrust live database connectors)",
      goal: `Enforce governance rules automatically on ${base.company} spreadsheets.`,
      pain: base.problem,
      avatarInitials: profile.initials,
      avatarColor: profile.color
    },
    beforeAfter: {
      before: [
        { time: "09:00 AM", text: `Download raw datasets from various servers at ${base.company}.` },
        { time: "11:00 AM", text: "Import values to spreadsheets. Spend hours reconciling references." },
        { time: "01:00 PM", text: "Formula and formatting discrepancies go completely unnoticed." },
        { time: "03:00 PM", text: "Reports published. Stale numbers lead to bad planning decisions." },
        { time: "05:00 PM", text: "Anomalies identified days later. Costly recovery process triggered." }
      ],
      after: [
        { time: "09:00 AM", text: "Open spreadsheets (DataTrust core add-in ribbon auto-loads)." },
        { time: "09:01 AM", text: "Click 'Refresh' — live metrics pull from DWH in seconds." },
        { time: "09:02 AM", text: "AI runs automatic constraint validation checks on cells." },
        { time: "09:04 AM", text: "Review status and auto-corrected fields. Click 'Publish'." },
        { time: "09:05 AM", text: "Metrics update globally inside the semantic layer, with audit trails." }
      ]
    },
    platformJourney: [
      {
        step: "Step 1",
        title: "User Opens Excel & Authenticates",
        userView: "Workbook loads. DataTrust ribbon connects to master registry nodes.",
        platformAction: "SSO verifies credentials. Maps connection schema to database views."
      },
      {
        step: "Step 2",
        title: "Clicks 'Refresh'",
        userView: "Live governed numbers populate spreadsheet in under 2 seconds.",
        platformAction: "Queries Snowflake. Applies validation rules defined in central CSM."
      },
      {
        step: "Step 3",
        title: "Reconciliation & Check",
        userView: "Quality parameters verified. Click 'Publish Report'.",
        platformAction: "Quality Engine verifies parameters. Logs writebacks to central audit ledger."
      }
    ],
    anomalyChain: [
      { time: "08:00 AM", text: "Nightly sync runs. Quality Engine flags anomaly: Database values out of bounds." },
      { time: "08:05 AM", text: "Alert sent to user (Email) and data leads (Slack)." },
      { time: "08:07 AM", text: "User acknowledges. DataTrust Auto-Correction adjusts out-of-spec cells." },
      { time: "08:11 AM", text: "Metrics corrected. Anomaly status changes to resolved." },
      { time: "08:15 AM", text: "User refreshes sheet, loading correct metrics." }
    ],
    teamSurfaces: [
      { member: `${profile.name} Singh`, role: "Operations Specialist", responsibility: "Reconciles depots, compiles data", surfaces: "Excel Add-in, Audit Viewer" },
      { member: "Priya Sharma", role: "Data Operations Lead", responsibility: "Maintains Snowflake schema, validates rules", surfaces: "Admin Console, Quality Dashboard" },
      { member: "Diana Chen", role: "CFO Office VP", responsibility: "Signs off on reports", surfaces: "Approval Inbox, Alert Center" }
    ],
    approvalFlow: [
      { step: "1. Priya Updates Metric", desc: "Priya adjusts metric ranges in the CSM." },
      { step: "2. Sarah Approves (L1)", desc: "Sarah verifies Snowflake connection schemas." },
      { step: "3. Diana Approves (L2)", desc: "CFO signs off on new parameters." },
      { step: "4. Live Update (v2.3.0)", desc: "Updated rules sync. yield metrics lock globally." }
    ],
    auditorFlow: {
      question: "Yield Audit: 'Provide history of global yield definitions.'",
      action: "Priya opens DataTrust Audit Trail, searches yields, exports signed PDF.",
      outcome: "Definitions verified. Audit completed in minutes."
    },
    workflowMapText: `START: Monday 09:00 AM
User opens logistics Excel workbook
       │
       ▼
[SSO Validation] ── Resolves user logistics clearances
       │
       ▼
[Live Connection] ── Queries Snowflake database. Loads metrics in 1.4s
       │
       ▼
[Quality Engine] ── Runs checks (Yield ratios checks, non-negative yields)
       │
       ▼
[Audit Engine] ── Logs yields metrics to PostgreSQL
       │
END: Monday 09:05 AM`,
    roiStats: {
      hoursSaved: "105 hrs/mo",
      savings: "₹42 Lakhs/yr",
      roi: "13x"
    },
    mermaidChart: `graph TD
    User[Operator Sheet] -->|Action| DT[DataTrust Gateway]
    DT -->|Write Audit Event| DB[(PostgreSQL Ledger)]
    DT -->|Secure Sync| SF[(Snowflake DWH)]
    DB -->|1-Second Audit Query| Reg[Regulator Audit Portal]
    style User fill:#10B981,stroke:#fff,stroke-width:1px,color:#fff
    style DT fill:#6366F1,stroke:#fff,stroke-width:1px,color:#fff
    style DB fill:#EF4444,stroke:#fff,stroke-width:1px,color:#fff
    style SF fill:#00BFA5,stroke:#fff,stroke-width:1px,color:#fff
    style Reg fill:#EC4899,stroke:#fff,stroke-width:1px,color:#fff`
  };
};

const directoryData = [
  {
    company: "ExxonMobil",
    industry: "Energy",
    problem: "Inventory tracking across depots took 3 days of manual copy-paste. Stakeholders ran SAP upload scripts blindly, leading to typos, ledger anomalies, and auditing compliance risks.",
    howItHelps: "Automates inventory data loading from Excel directly to Snowflake. DataTrust's Quality Engine infers volume thresholds from historical bounds. Alex clicks 'Sync to SAP' to push database changes securely, with all events logged in Audit Engine V3.",
    roi: "3 Days ➔ Seconds",
    metric: "$90M in value from data harmonization",
    features: "Upstash Redis Sync, Excel Add-in V3, Semantic Layer (CSM)",
    details: "Over 5,000 users run this governed, automated pipeline."
  },
  {
    company: "Boeing",
    industry: "Aerospace",
    problem: "Disconnected engineering groups used varying safety stress formulas. This calculation divergence (Excel Sprawl) led to version control hazards and auditing risks during inspections.",
    howItHelps: "Enforces calculations inside the central Semantic Layer (CSM). Engineering workbooks fetch calculations via standard metrics. DAX-to-SQL engine auto-compiles Excel formulas into query strings, ensuring calculations remain consistent.",
    roi: "Zero Formula Drift",
    metric: "100% safety parameters compliance",
    features: "Semantic Layer (CSM), DAX → SQL Engine, Column Lineage",
    details: "Auditors trace stress variables from sheet cells to Databricks in seconds."
  },
  {
    company: "Pfizer",
    industry: "Healthcare & Pharma",
    problem: "Clinical trials spreadsheet logs contained patient SSN, names, and identifiers, violating FDA Title 21 CFR Part 11 and HIPAA privacy regulations.",
    howItHelps: "Serves as a security gateway. When clinical coordinators load efficacy data, HIPAA patient identifiers are automatically masked. Writes, adjustments, and reads are recorded in the PostgreSQL audit log.",
    roi: "100% FDA Compliance",
    metric: "Zero patient PII leaks",
    features: "Audit & Compliance V3, Data Masking, Access Controls",
    details: "1-second compliance report export simplifies regulatory reviews."
  },
  {
    company: "GlaxoSmithKline",
    industry: "Healthcare & Pharma",
    problem: "Clinical testing datasets and financial models lacked version histories. Rules modified by researchers left no trail, creating audit gaps.",
    howItHelps: "Saves metadata changes in Git-style snapshots. Compliance Leads compare versions (v1.1.1 vs v1.2.0) and rollback rules with one click. Quality alerts notify researchers if values drift.",
    roi: "85% Less Auditing Time",
    metric: "Complete rule history tracking",
    features: "Versioning & Rollback, Pre-change Impact Analysis, Alerts",
    details: "Enables auditors to identify calculation adjustments in seconds."
  },
  {
    company: "Procter & Gamble",
    industry: "Consumer Goods",
    problem: "Inventory sheets were updated using batch scripts delayed by 48 hours. Planners worked with stale stock numbers, causing inventory stockouts.",
    howItHelps: "Connects Excel directly to Snowflake and Microsoft Fabric databases. Upstash Redis handles real-time updates. Planners fetch live warehouse stocks in sub-seconds with validation rules checking SKU names.",
    roi: "Live Inventory Views",
    metric: "Stockouts decreased by 22%",
    features: "Upstash Redis Sync, V3 Excel Ribbon, Multi-Cloud Connection",
    details: "Enables planners to align shipments with live inventory."
  },
  {
    company: "Goodyear Tire & Rubber",
    industry: "Manufacturing",
    problem: "Tread stock measurements were copy-pasted into spreadsheets manually, leading to typing errors and delayed validation checks.",
    howItHelps: "Streams telemetry from Databricks using Kafka. Self-learning rules calculate safe limits (e.g. tread depth boundaries), flagging exceptions in Excel instantly.",
    roi: "Automated Bounds Check",
    metric: "Identified manufacturing errors 4x faster",
    features: "AI Rule Inference, Kafka Event Bus, Databricks Connection",
    details: "Alerts technicians when telemetry drifts from safety parameters."
  },
  {
    company: "John Deere",
    industry: "Manufacturing",
    problem: "Operations logs and machinery parameters were scattered across Redshift and BigQuery databases, causing fragmented forecasting spreadsheets.",
    howItHelps: "Unifies multi-cloud warehouses in a federated Semantic Layer. Planners enter questions (NLQ) inside Excel: 'Show dealer tractor stock'. DataTrust queries all clouds, returning answers in 2s.",
    roi: "Unified Cloud Schema",
    metric: "Federated operations across 2,000+ dealers",
    features: "NLQ Interface, Multi-Cloud Connectors, Semantic Layer (CSM)",
    details: "Eliminates database-specific queries for regional business planners."
  },
  {
    company: "Whirlpool",
    industry: "Manufacturing",
    problem: "Planners in Europe and North America used differing yield calculations, causing discrepancies in corporate reports.",
    howItHelps: "Establishes Team Workspaces. Master definitions are created once in the CSM (Canonical Semantic Metadata). Access restrictions prevent unauthorized edits while ensuring clean data updates.",
    roi: "Unified Calculations",
    metric: "95% reduction in shipping-data reporting disputes",
    features: "Workspaces & Roles, Semantic Layer (CSM), Approval Workflows",
    details: "Corporate metrics remain standardized globally."
  },
  {
    company: "BP Exploration",
    industry: "Energy",
    problem: "Drilling calculations contain complex formulas. A simple spreadsheet error could misproject drill feasibility, risking multi-million dollar dry holes.",
    howItHelps: "Generates cell-level lineage paths tracing calculations back to raw Databricks tables. Auto-documentation explains geological formulas in plain English.",
    roi: "Verified Formulas",
    metric: "Zero drill errors from modeling typos",
    features: "Data Lineage, Auto-Documentation, Databricks Connection",
    details: "Ensures exploration teams work with certified math models."
  },
  {
    company: "Statoil (Equinor)",
    industry: "Energy",
    problem: "Capital expenditures for drilling ventures involve shared sheets. Discrepancies in calculation revisions led to partner disputes and audit delays.",
    howItHelps: "Requires changes to go through Multi-Approver Approval Workflows. Subcontractor cost updates run through a pre-change impact simulation window before data synchronizes.",
    roi: "Automated JV Audits",
    metric: "90% reduction in partner report delays",
    features: "Approval Workflows, Pre-change Impact Analysis, Compliance Packs",
    details: "Changes require lead engineer and CFO validation."
  },
  {
    company: "ABB",
    industry: "Automation & Industrial",
    problem: "Execution timelines were managed on separate spreadsheets. Program managers had no unified view of project metrics, causing milestone delays.",
    howItHelps: "Engineers utilize standard templates from the Template Marketplace. Project timelines sync to Snowflake. AI-powered rule engines flag delayed tasks automatically.",
    roi: "Unified Project Health",
    metric: "Reconciled metrics across 500+ active projects",
    features: "V3 Excel Ribbon, Quality Alerts, AI Rule Inference",
    details: "Integrates project schedules into an executive dashboard."
  },
  {
    company: "Honeywell",
    industry: "Automation & Industrial",
    problem: "Aerospace turbine telemetry files contained millions of cells, causing Excel to crash repeatedly and slowing down test validation cycles.",
    howItHelps: "Runs queries through Upstash Redis Semantic Caching. The system filters large datasets in the backend, loading only summary metrics to local spreadsheets.",
    roi: "Zero Excel Crashes",
    metric: "Telemetry data query speeds increased 15x",
    features: "Performance Scale, Upstash Redis Sync, Semantic Cache",
    details: "Sub-second load times for massive testing sheets."
  },
  {
    company: "Siemens",
    industry: "Industrial & Energy",
    problem: "Power generation metrics must comply with strict national energy infrastructure guidelines. Manual audits of spreadsheets took months.",
    howItHelps: "Provides pre-built SOX and infrastructure compliance packs. Every worksheet adjustment is logged in an immutable PostgreSQL database, enabling instant audits.",
    roi: "Audits Completed in 1 Day",
    metric: "$12M saved in audit and regulatory overheads",
    features: "Audit & Compliance V3, Semantic Layer (CSM), Access Controls",
    details: "Generates exportable compliance evidence with one click."
  },
  {
    company: "CH2M Hill",
    industry: "Engineering",
    problem: "Subcontractors modifying project budgets broke downstream milestones in dependent spreadsheets, causing project budget overruns.",
    howItHelps: "Performs Pre-change Impact Analysis. When budget variables are modified, DataTrust models downstream impacts, alerting program managers of schedule conflicts.",
    roi: "Zero Project Collisions",
    metric: "Subcontractor budget change cycles sped up 300%",
    features: "Pre-change Impact Analysis, Workspaces, Versioning",
    details: "Flags project timeline risks before subcontractor changes go live."
  },
  {
    company: "Rolls Royce",
    industry: "Aerospace",
    problem: "Turbine maintenance sheets used sampled data to prevent Excel slowdowns, missing anomalies that could cause engine failures.",
    howItHelps: "Enforces Spark computations. Telemetry stores to Databricks. Custom mathematical summaries load to sheets automatically, keeping Excel execution fast.",
    roi: "High-Precision Modeling",
    metric: "Unplanned engine maintenance down by 30%",
    features: "Performance Scale, Databricks Connection, V3 Excel Ribbon",
    details: "Queries billions of rows without compromising workbook speed."
  },
  {
    company: "Lockheed Martin",
    industry: "Aerospace",
    problem: "Defense spec sheets contain ITAR-controlled variables. Sharing worksheets via email risked security breaches and ITAR violations.",
    howItHelps: "Deploys inside air-gapped enclaves with column-level permissions. Sensitive parameters (thrust limits, drone payloads) are masked based on user credentials.",
    roi: "Zero ITAR Incidents",
    metric: "Automated ITAR screening across subcontractors",
    features: "Workspaces & Roles, Data Masking, Audit & Compliance V3",
    details: "Ensures only authorized personnel see classified parameters."
  }
];

export default function CaseStudies() {
  const [activeTab, setActiveTab] = useState('spotlights'); // spotlights | directory | calculator
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('All');
  const [activeSpotlightId, setActiveSpotlightId] = useState(directoryData[0].company.toLowerCase());

  // ROI Calculator state
  const [calcSector, setCalcSector] = useState('Finance');
  const [usersCount, setUsersCount] = useState(150);
  const [hourlyRate, setHourlyRate] = useState(65);
  const [severityLevel, setSeverityLevel] = useState('Medium'); // Low, Medium, High

  const selectedData = getCompanyData(activeSpotlightId);
  const uniqueSectors = ['All', ...new Set(directoryData.map(c => c.industry))];

  // Dynamic filter list
  const filteredDirectory = directoryData.filter(c => {
    const matchesSearch = c.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          c.problem.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          c.howItHelps.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          c.features.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSector = selectedIndustry === 'All' || c.industry === selectedIndustry;
    return matchesSearch && matchesSector;
  });

  // Automatically update the selected spotlight if directory filters exclude it
  useEffect(() => {
    if (filteredDirectory.length > 0) {
      const exists = filteredDirectory.some(c => c.company.toLowerCase() === activeSpotlightId);
      if (!exists) {
        setActiveSpotlightId(filteredDirectory[0].company.toLowerCase());
      }
    }
  }, [selectedIndustry, searchTerm]);

  // ROI Calculator Maths
  const getCalculatorROI = () => {
    let errorRate = 0.05; 
    if (severityLevel === 'Low') errorRate = 0.02;
    if (severityLevel === 'High') errorRate = 0.12;

    let sectorRiskMultiplier = 1.0;
    if (calcSector === 'Pharma') sectorRiskMultiplier = 1.8; 
    if (calcSector === 'Energy') sectorRiskMultiplier = 1.5; 
    if (calcSector === 'Finance') sectorRiskMultiplier = 2.0; 

    const hoursWastedPerUserWeekly = severityLevel === 'High' ? 12 : severityLevel === 'Medium' ? 7 : 4;
    const hoursSavedPerYear = usersCount * hoursWastedPerUserWeekly * 52 * 0.90; // 90% savings
    const manualSavingsValue = hoursSavedPerYear * hourlyRate;
    
    const riskOverheadMitigated = usersCount * 1250 * sectorRiskMultiplier;
    const errorsAutoBlocked = Math.round(usersCount * 24 * errorRate * 52);
    const totalEconomicValue = manualSavingsValue + riskOverheadMitigated;

    return {
      hoursSaved: Math.round(hoursSavedPerYear).toLocaleString(),
      moneySaved: Math.round(manualSavingsValue).toLocaleString(),
      errorsPrevented: errorsAutoBlocked.toLocaleString(),
      riskValue: Math.round(riskOverheadMitigated).toLocaleString(),
      totalROI: Math.round(totalEconomicValue).toLocaleString()
    };
  };

  const currentRoi = getCalculatorROI();

  return (
    <div style={{ minHeight: '100vh', background: '#020617', color: '#F8FAFC', fontFamily: '"Inter", sans-serif', paddingTop: '80px', paddingBottom: '100px' }}>
      
      {/* Dynamic Styling */}
      <style>{`
        .sub-nav-btn {
          padding: 12px 24px;
          border-radius: 8px;
          border: 1px solid rgba(255,255,255,0.05);
          font-weight: 600;
          font-size: 14px;
          background: rgba(255,255,255,0.03);
          color: #94A3B8;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .sub-nav-btn.active {
          background: #6366F1;
          color: #FFF;
          border-color: #6366F1;
          box-shadow: 0 4px 15px rgba(99,102,241,0.3);
        }
        .spotlight-card-btn {
          width: 100%;
          text-align: left;
          padding: 16px 20px;
          background: transparent;
          border: none;
          border-left: 3px solid transparent;
          color: #94A3B8;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .spotlight-card-btn:hover {
          background: rgba(255, 255, 255, 0.02);
          color: #FFF;
        }
        .spotlight-card-btn.active {
          background: rgba(99, 102, 241, 0.1);
          color: #FFF;
          border-left: 3px solid #6366F1;
        }
        .timeline-step {
          position: relative;
          padding-left: 32px;
          border-left: 2px solid rgba(99, 102, 241, 0.2);
          padding-bottom: 32px;
        }
        .timeline-step::before {
          content: '';
          position: absolute;
          left: -6px;
          top: 0;
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: #6366F1;
          border: 2px solid #020617;
          box-shadow: 0 0 8px #6366F1;
        }
        .timeline-step:last-child {
          border-left: none;
        }
        .timeline-step:last-child::before {
          background: #00BFA5;
          box-shadow: 0 0 8px #00BFA5;
        }
        .glow-box {
          box-shadow: 0 0 20px rgba(0, 191, 165, 0.05);
        }
        .slider-control::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: #00BFA5;
          cursor: pointer;
          box-shadow: 0 0 10px rgba(0, 191, 165, 0.5);
        }
        .slider-control::-moz-range-thumb {
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: #00BFA5;
          cursor: pointer;
          box-shadow: 0 0 10px rgba(0, 191, 165, 0.5);
        }
        .flow-code-block {
          background: #040712;
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 12px;
          padding: 24px;
          font-family: 'Fira Code', 'Consolas', monospace;
          font-size: 13.5px;
          line-height: 1.6;
          color: #E2E8F0;
          whiteSpace: pre;
          overflow-x: auto;
        }
        .directory-card {
          background: rgba(15, 23, 42, 0.3);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 16px;
          padding: 28px;
          display: flex;
          flex-direction: column;
          gap: 18px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.25);
          backdrop-filter: blur(12px);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          cursor: pointer;
        }
        .directory-card:hover {
          transform: translateY(-5px);
          border-color: rgba(99, 102, 241, 0.4);
          box-shadow: 0 15px 35px rgba(99, 102, 241, 0.15);
          background: rgba(15, 23, 42, 0.45);
        }
        .feature-badge {
          padding: 4px 10px;
          border-radius: 6px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.06);
          color: #E2E8F0;
          font-size: 11.5px;
          font-weight: 500;
        }
        .view-flow-btn {
          width: 100%;
          padding: 12px;
          border-radius: 8px;
          background: rgba(99, 102, 241, 0.08);
          border: 1px solid rgba(99, 102, 241, 0.2);
          color: #818CF8;
          font-weight: 700;
          font-size: 13px;
          cursor: pointer;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
        }
        .view-flow-btn:hover {
          background: #6366F1;
          color: #FFF;
          border-color: #6366F1;
          box-shadow: 0 4px 12px rgba(99, 102, 241, 0.25);
        }
      `}</style>

      {/* Hero Header */}
      <div style={{ textAlign: 'center', marginBottom: '40px', padding: '0 20px' }}>
        <div style={{ 
          display: 'inline-block', 
          padding: '6px 16px', 
          background: 'rgba(0, 191, 165, 0.1)', 
          border: '1px solid rgba(0, 191, 165, 0.25)', 
          borderRadius: '20px', 
          color: '#00BFA5', 
          fontSize: '13px', 
          fontWeight: '600', 
          letterSpacing: '1px', 
          marginBottom: '20px' 
        }}>
          CASE STUDIES & GOVERNANCE TIMELINES
        </div>
        <h1 style={{ fontSize: '42px', fontWeight: '800', marginBottom: '16px', letterSpacing: '-1.5px', fontFamily: '"Space Grotesk", sans-serif' }}>
          DataTrust V3.0 <span style={{ background: 'linear-gradient(135deg, #00BFA5 0%, #6366F1 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Enterprise Journeys</span>
        </h1>
        <p style={{ fontSize: '17px', color: '#94A3B8', maxWidth: '850px', margin: '0 auto', lineHeight: '1.6' }}>
          Compare manual before-and-after schedules. Explore detailed persona stories, hidden background processes, automatic corrections, approval pathways, and offline compliance logs across 16 global leaders.
        </p>

        {/* View Tabs */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginTop: '36px' }}>
          <button 
            onClick={() => setActiveTab('spotlights')}
            className={`sub-nav-btn ${activeTab === 'spotlights' ? 'active' : ''}`}
          >
            🏢 Morgan-Style Journeys (All 16 Companies)
          </button>
          <button 
            onClick={() => setActiveTab('directory')}
            className={`sub-nav-btn ${activeTab === 'directory' ? 'active' : ''}`}
          >
            📂 Searchable Directory Grid
          </button>
          <button 
            onClick={() => setActiveTab('calculator')}
            className={`sub-nav-btn ${activeTab === 'calculator' ? 'active' : ''}`}
          >
            🧮 F500 ROI Simulator
          </button>
        </div>
      </div>

      {/* Main container */}
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 24px' }}>
        
        {/* TAB 1: MORGAN STYLE SPOTLIGHT JOURNEYS */}
        {activeTab === 'spotlights' && (
          <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: '40px', alignItems: 'start' }}>
            
            {/* Sidebar list */}
            <div style={{ 
              background: 'rgba(15, 23, 42, 0.4)', 
              borderRadius: '16px', 
              border: '1px solid rgba(255, 255, 255, 0.05)',
              overflow: 'hidden'
            }}>
              <div style={{ padding: '16px 20px', borderBottom: '1px solid rgba(255,255,255,0.05)', background: 'rgba(0,0,0,0.2)' }}>
                <span style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', color: '#64748b', letterSpacing: '1px' }}>
                  Select Company Journey
                </span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', maxHeight: '720px', overflowY: 'auto' }}>
                {directoryData.map(c => {
                  const cId = c.company.toLowerCase();
                  return (
                    <button
                      key={c.company}
                      onClick={() => setActiveSpotlightId(cId)}
                      className={`spotlight-card-btn ${activeSpotlightId === cId ? 'active' : ''}`}
                    >
                      <span style={{ fontSize: '15px', fontWeight: '700', display: 'block', color: activeSpotlightId === cId ? '#00BFA5' : '#E2E8F0', marginBottom: '4px' }}>
                        {c.company}
                      </span>
                      <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', fontSize: '12px', color: '#64748b' }}>
                        <span>{c.industry}</span>
                        <span style={{ color: '#10B981', fontWeight: '600' }}>{c.roi.split('➔')[1] || c.roi}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Main Morgan-Style Detail Display */}
            {selectedData && (
              <div style={{ 
                background: 'linear-gradient(145deg, #0b0f19 0%, #12192b 100%)', 
                border: '1px solid rgba(99, 102, 241, 0.25)', 
                borderRadius: '24px', 
                padding: '40px',
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.5)'
              }} className="glow-box">
                
                {/* Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '20px', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '24px', marginBottom: '32px' }}>
                  <div>
                    <h2 style={{ fontSize: '28px', fontWeight: '800', color: '#FFF', marginBottom: '8px', fontFamily: '"Space Grotesk", sans-serif' }}>
                      {selectedData.company}'s Journey: From Sprawl to Trust
                    </h2>
                    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                      <span style={{ padding: '4px 12px', borderRadius: '12px', background: 'rgba(0,191,165,0.15)', color: '#00BFA5', fontSize: '12px', fontWeight: '600' }}>
                        {selectedData.industry} Sector
                      </span>
                      <span style={{ color: '#94A3B8', fontSize: '14px' }}>
                        Connected to: <b>{selectedData.dbConn}</b>
                      </span>
                    </div>
                  </div>
                  <div style={{ padding: '12px 20px', borderRadius: '12px', background: 'rgba(99, 102, 241, 0.08)', border: '1px solid rgba(99, 102, 241, 0.2)', textAlign: 'right' }}>
                    <div style={{ fontSize: '18px', fontWeight: '800', color: '#00BFA5' }}>{selectedData.roiText}</div>
                    <div style={{ fontSize: '11px', color: '#64748b', marginTop: '2px' }}>{selectedData.valueImpactText}</div>
                  </div>
                </div>

                {/* 1. Persona Card */}
                <div style={{ background: 'rgba(255, 255, 255, 0.02)', padding: '24px', borderRadius: '16px', border: '1px solid rgba(255, 255, 255, 0.04)', display: 'flex', gap: '24px', alignItems: 'center', marginBottom: '32px' }}>
                  <div style={{ 
                    width: '64px', 
                    height: '64px', 
                    borderRadius: '50%', 
                    background: selectedData.persona.avatarColor || '#6366F1', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    fontSize: '24px',
                    fontWeight: '800',
                    color: '#FFF'
                  }}>
                    {selectedData.persona.avatarInitials}
                  </div>
                  <div style={{ flex: 1 }}>
                    <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#FFF', marginBottom: '4px' }}>{selectedData.persona.name}</h3>
                    <div style={{ fontSize: '13px', color: '#6366F1', fontWeight: '600', marginBottom: '8px' }}>
                      {selectedData.persona.role} &nbsp;|&nbsp; Reports to: {selectedData.persona.reportsTo}
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', fontSize: '13.5px', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '10px', marginTop: '6px' }}>
                      <div><b>Primary Tool:</b> <span style={{ color: '#CBD5E1' }}>{selectedData.persona.primaryTool}</span></div>
                      <div><b>Target Goal:</b> <span style={{ color: '#CBD5E1' }}>{selectedData.persona.goal}</span></div>
                    </div>
                    <div style={{ fontSize: '13.5px', marginTop: '8px', color: '#EF4444' }}>
                      <b>Legacy Pain:</b> {selectedData.persona.pain}
                    </div>
                  </div>
                </div>

                {/* 2. Before vs After Timeline */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '36px' }}>
                  
                  {/* Before */}
                  <div style={{ padding: '24px', background: 'rgba(239, 68, 68, 0.02)', border: '1px solid rgba(239, 68, 68, 0.1)', borderRadius: '16px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                      <span style={{ color: '#EF4444', fontWeight: '700', textTransform: 'uppercase', fontSize: '12px', letterSpacing: '1px' }}>
                        ❌ Old Workflow (Before DataTrust)
                      </span>
                      <span style={{ color: '#EF4444', fontSize: '14px', fontFamily: 'monospace', fontWeight: '700' }}>
                        Slow & Manual
                      </span>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      {selectedData.beforeAfter.before.map((step, idx) => (
                        <div key={idx} style={{ display: 'flex', gap: '12px', fontSize: '13px', alignItems: 'flex-start' }}>
                          <span style={{ color: '#64748b', fontWeight: '600', minWidth: '70px', fontFamily: 'monospace' }}>{step.time}</span>
                          <span style={{ color: '#CBD5E1' }}>{step.text}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* After */}
                  <div style={{ padding: '24px', background: 'rgba(16, 185, 129, 0.02)', border: '1px solid rgba(16, 185, 129, 0.1)', borderRadius: '16px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                      <span style={{ color: '#10B981', fontWeight: '700', textTransform: 'uppercase', fontSize: '12px', letterSpacing: '1px' }}>
                        ✅ New Workflow (DataTrust V3.0)
                      </span>
                      <span style={{ color: '#10B981', fontSize: '14px', fontFamily: 'monospace', fontWeight: '700' }}>
                        Fast & Governed
                      </span>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      {selectedData.beforeAfter.after.map((step, idx) => (
                        <div key={idx} style={{ display: 'flex', gap: '12px', fontSize: '13px', alignItems: 'flex-start' }}>
                          <span style={{ color: '#00BFA5', fontWeight: '600', minWidth: '70px', fontFamily: 'monospace' }}>{step.time}</span>
                          <span style={{ color: '#CBD5E1' }}>{step.text}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

                {/* 3. Step-by-Step Platform Journey */}
                <div style={{ marginBottom: '40px' }}>
                  <h3 style={{ fontSize: '16px', color: '#FFF', fontWeight: '700', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '1px' }}>
                    🚀 Step-by-Step Platform Journey
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {selectedData.platformJourney.map((step, idx) => (
                      <div key={idx} style={{ 
                        background: 'rgba(255,255,255,0.01)', 
                        border: '1px solid rgba(255,255,255,0.04)', 
                        borderRadius: '12px', 
                        padding: '20px'
                      }}>
                        <div style={{ fontSize: '11px', color: '#6366F1', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>
                          {step.step}: {step.title}
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                          <div style={{ borderRight: '1px solid rgba(255,255,255,0.04)', paddingRight: '16px' }}>
                            <span style={{ fontSize: '12px', color: '#94A3B8', fontWeight: '600', display: 'block', marginBottom: '4px' }}>
                              User's Excel View
                            </span>
                            <p style={{ fontSize: '13.5px', color: '#CBD5E1', lineHeight: '1.4' }}>{step.userView}</p>
                          </div>
                          <div>
                            <span style={{ fontSize: '12px', color: '#00BFA5', fontWeight: '600', display: 'block', marginBottom: '4px' }}>
                              Platform Engine Action (Invisible)
                            </span>
                            <p style={{ fontSize: '13.5px', color: '#94A3B8', fontFamily: 'monospace', lineHeight: '1.4' }}>{step.platformAction}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 4. When Anomaly Strikes Timeline */}
                <div style={{ marginBottom: '40px' }}>
                  <h3 style={{ fontSize: '16px', color: '#FFF', fontWeight: '700', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '1px' }}>
                    ⚠️ When Anomaly Strikes: The Notification Chain
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {selectedData.anomalyChain.map((item, idx) => (
                      <div key={idx} style={{ 
                        background: 'rgba(239, 68, 68, 0.02)', 
                        border: '1px solid rgba(239, 68, 68, 0.1)', 
                        borderRadius: '8px', 
                        padding: '12px 16px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '16px',
                        fontSize: '13px'
                      }}>
                        <span style={{ color: '#EF4444', fontWeight: '700', fontFamily: 'monospace', minWidth: '70px' }}>{item.time}</span>
                        <span style={{ color: '#CBD5E1' }}>{item.text}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 5. Team & Surfaces Table */}
                <div style={{ marginBottom: '40px' }}>
                  <h3 style={{ fontSize: '16px', color: '#FFF', fontWeight: '700', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '1px' }}>
                    👥 The Team & DataTrust Surfaces
                  </h3>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13.5px', background: 'rgba(0,0,0,0.15)', borderRadius: '12px', overflow: 'hidden' }}>
                    <thead>
                      <tr style={{ background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                        <th style={{ padding: '12px 16px', textAlign: 'left', color: '#94A3B8' }}>Team Member</th>
                        <th style={{ padding: '12px 16px', textAlign: 'left', color: '#94A3B8' }}>Role</th>
                        <th style={{ padding: '12px 16px', textAlign: 'left', color: '#94A3B8' }}>Primary Responsibility</th>
                        <th style={{ padding: '12px 16px', textAlign: 'left', color: '#94A3B8' }}>DataTrust Surfaces</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedData.teamSurfaces.map((member, idx) => (
                        <tr key={idx} style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                          <td style={{ padding: '12px 16px', fontWeight: '600', color: '#FFF' }}>{member.member}</td>
                          <td style={{ padding: '12px 16px', color: '#CBD5E1' }}>{member.role}</td>
                          <td style={{ padding: '12px 16px', color: '#CBD5E1' }}>{member.responsibility}</td>
                          <td style={{ padding: '12px 16px', color: '#6366F1', fontWeight: '600' }}>{member.surfaces}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* 6. Approval Flow */}
                <div style={{ marginBottom: '40px' }}>
                  <h3 style={{ fontSize: '16px', color: '#FFF', fontWeight: '700', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '1px' }}>
                    🔗 Governance Approval Flow: Changing Metrics
                  </h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
                    {selectedData.approvalFlow.map((step, idx) => (
                      <div key={idx} style={{ 
                        padding: '16px', 
                        background: 'rgba(99,102,241,0.02)', 
                        border: '1px solid rgba(99,102,241,0.1)', 
                        borderRadius: '12px',
                        fontSize: '13px'
                      }}>
                        <span style={{ color: '#818CF8', fontWeight: '700', display: 'block', marginBottom: '4px' }}>{step.step}</span>
                        <p style={{ color: '#CBD5E1', lineHeight: '1.4' }}>{step.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 7. Auditor Flow */}
                <div style={{ background: 'rgba(245,158,11,0.03)', border: '1px solid rgba(245,158,11,0.15)', borderRadius: '16px', padding: '24px', marginBottom: '40px' }}>
                  <div style={{ color: '#F59E0B', fontWeight: '700', textTransform: 'uppercase', fontSize: '12px', letterSpacing: '1px', marginBottom: '8px' }}>
                    📜 The Auditor Flow: 7 Days to 1 Hour
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13.5px', color: '#CBD5E1' }}>
                    <div><b>Auditor Query:</b> "{selectedData.auditorFlow.question}"</div>
                    <div><b>Platform Action:</b> {selectedData.auditorFlow.action}</div>
                    <div style={{ color: '#10B981', fontWeight: '600', marginTop: '4px' }}>
                      🚀 <b>Business Result:</b> {selectedData.auditorFlow.outcome}
                    </div>
                  </div>
                </div>

                {/* 8. Graphical Workflow Map */}
                <div style={{ marginBottom: '40px' }}>
                  <h3 style={{ fontSize: '16px', color: '#FFF', fontWeight: '700', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '1px' }}>
                    🗺️ End-to-End Workflow Diagram
                  </h3>
                  <GraphicalWorkflowMap companyId={activeSpotlightId} data={selectedData} />
                </div>


                {/* 9. ROI Impact Stats */}
                <div>
                  <h3 style={{ fontSize: '16px', color: '#FFF', fontWeight: '700', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '1px' }}>
                    📈 ROI & Economic Impact
                  </h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', textAlign: 'center' }}>
                    <div style={{ padding: '20px', background: 'rgba(0,191,165,0.08)', border: '1px solid rgba(0,191,165,0.2)', borderRadius: '16px' }}>
                      <span style={{ fontSize: '24px', fontWeight: '800', color: '#00BFA5', display: 'block', fontFamily: '"Space Grotesk", sans-serif' }}>
                        {selectedData.roiStats.hoursSaved}
                      </span>
                      <span style={{ fontSize: '11px', color: '#94A3B8', textTransform: 'uppercase', fontWeight: '600' }}>Time saved / month</span>
                    </div>

                    <div style={{ padding: '20px', background: 'rgba(99,102,241,0.08)', border: '1px solid rgba(99,102,241,0.2)', borderRadius: '16px' }}>
                      <span style={{ fontSize: '24px', fontWeight: '800', color: '#818CF8', display: 'block', fontFamily: '"Space Grotesk", sans-serif' }}>
                        {selectedData.roiStats.savings}
                      </span>
                      <span style={{ fontSize: '11px', color: '#94A3B8', textTransform: 'uppercase', fontWeight: '600' }}>Annual corporate savings</span>
                    </div>

                    <div style={{ padding: '20px', background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)', borderRadius: '16px' }}>
                      <span style={{ fontSize: '24px', fontWeight: '800', color: '#10B981', display: 'block', fontFamily: '"Space Grotesk", sans-serif' }}>
                        {selectedData.roiStats.roi}
                      </span>
                      <span style={{ fontSize: '11px', color: '#94A3B8', textTransform: 'uppercase', fontWeight: '600' }}>Estimated system ROI</span>
                    </div>
                  </div>
                </div>

              </div>
            )}

          </div>
        )}

        {/* TAB 2: DIRECTORY GRID */}
        {activeTab === 'directory' && (
          <div>
            {/* Search Filters */}
            <div style={{ 
              display: 'flex', 
              flexWrap: 'wrap', 
              justifyContent: 'space-between', 
              alignItems: 'center', 
              background: 'rgba(15, 23, 42, 0.4)', 
              padding: '16px 24px', 
              borderRadius: '16px', 
              border: '1px solid rgba(255, 255, 255, 0.05)',
              gap: '16px',
              marginBottom: '32px'
            }}>
              {/* Sector tabs */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {uniqueSectors.map(sect => (
                  <button
                    key={sect}
                    onClick={() => setSelectedIndustry(sect)}
                    style={{
                      padding: '8px 16px',
                      borderRadius: '8px',
                      background: selectedIndustry === sect ? '#6366F1' : 'rgba(255, 255, 255, 0.04)',
                      color: selectedIndustry === sect ? '#FFF' : '#CBD5E1',
                      border: 'none',
                      fontSize: '13px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                  >
                    {sect}
                  </button>
                ))}
              </div>

              {/* Search */}
              <input
                type="text"
                placeholder="Search by company, feature, or pain point..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: '320px',
                  background: '#070a13',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  padding: '10px 16px',
                  borderRadius: '8px',
                  color: '#F8FAFC',
                  fontSize: '14px',
                  outline: 'none'
                }}
              />
            </div>

            {/* Grid directory */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))', gap: '24px' }}>
              {filteredDirectory.length > 0 ? (
                filteredDirectory.map((c, idx) => {
                  const firstLetter = c.company.charAt(0);
                  const sectorColors = {
                    "Energy": "#10B981",
                    "Aerospace": "#6366F1",
                    "Healthcare & Pharma": "#EF4444",
                    "Manufacturing": "#F59E0B"
                  };
                  const avatarBg = sectorColors[c.industry] || "#818CF8";
                  
                  return (
                    <div 
                      key={idx}
                      className="directory-card"
                    >
                      <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                        <div style={{
                          width: '40px',
                          height: '40px',
                          borderRadius: '50%',
                          background: avatarBg,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '18px',
                          fontWeight: '800',
                          color: '#FFF',
                          boxShadow: `0 0 10px ${avatarBg}40`
                        }}>
                          {firstLetter}
                        </div>
                        <div style={{ flex: 1 }}>
                          <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#FFF', margin: 0 }}>{c.company}</h3>
                          <span style={{ fontSize: '11px', color: '#00BFA5', fontWeight: '600', textTransform: 'uppercase' }}>{c.industry}</span>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                          <span style={{ fontSize: '14px', color: '#10B981', fontWeight: '800', fontFamily: 'monospace', display: 'block' }}>{c.roi}</span>
                          <span style={{ fontSize: '10px', color: '#64748b', display: 'block' }}>{c.metric}</span>
                        </div>
                      </div>

                      <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '14px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        <div style={{
                          background: 'rgba(239, 68, 68, 0.02)',
                          borderLeft: '3px solid #EF4444',
                          padding: '12px 16px',
                          borderRadius: '8px'
                        }}>
                          <span style={{ fontSize: '11px', fontWeight: '800', color: '#EF4444', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>
                            ❌ Legacy Problem
                          </span>
                          <p style={{ fontSize: '13.5px', color: '#CBD5E1', lineHeight: '1.5' }}>
                            {c.problem}
                          </p>
                        </div>

                        <div style={{
                          background: 'rgba(16, 185, 129, 0.02)',
                          borderLeft: '3px solid #10B981',
                          padding: '12px 16px',
                          borderRadius: '8px'
                        }}>
                          <span style={{ fontSize: '11px', fontWeight: '800', color: '#10B981', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>
                            💡 DataTrust V3.0 Cure
                          </span>
                          <p style={{ fontSize: '13.5px', color: '#CBD5E1', lineHeight: '1.5' }}>
                            {c.howItHelps}
                          </p>
                        </div>
                      </div>

                      <div style={{ background: 'rgba(0,0,0,0.15)', padding: '12px 16px', borderRadius: '10px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <div style={{ fontSize: '11px', color: '#94A3B8', fontWeight: '500' }}>
                          Deployed Stack: <span style={{ color: '#818CF8', fontWeight: '600' }}>{c.features}</span>
                        </div>
                        <div style={{ fontSize: '11px', color: '#00BFA5', fontStyle: 'italic' }}>
                          {c.details}
                        </div>
                      </div>

                      <button 
                        onClick={() => {
                          setActiveSpotlightId(c.company.toLowerCase());
                          setActiveTab('spotlights');
                          window.scrollTo({ top: 150, behavior: 'smooth' });
                        }}
                        className="view-flow-btn"
                      >
                        🔍 View Detailed Workflow Journey ➔
                      </button>

                    </div>
                  );
                })
              ) : (
                <div style={{ gridColumn: '1 / -1', padding: '80px 20px', textAlign: 'center', color: '#64748b' }}>
                  No directory cases match your search term.
                </div>
              )}
            </div>

          </div>
        )}

        {/* TAB 3: ROI CALCULATOR */}
        {activeTab === 'calculator' && (
          <div style={{ 
            background: 'linear-gradient(145deg, #090d1a 0%, #151e33 100%)', 
            border: '1px solid rgba(0, 191, 165, 0.2)', 
            borderRadius: '24px', 
            padding: '40px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.5)'
          }}>
            <h2 style={{ fontSize: '28px', fontWeight: '800', fontFamily: '"Space Grotesk", sans-serif', color: '#FFF', marginBottom: '8px', textAlign: 'center' }}>
              🧮 Interactive ROI Calculator
            </h2>
            <p style={{ color: '#94A3B8', fontSize: '15px', textAlign: 'center', marginBottom: '40px', maxWidth: '700px', margin: '0 auto 40px' }}>
              Adjust spreadsheet sprawl parameters to simulate hours saved, automated formula defects blocked, and financial risks mitigated by DataTrust.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center' }}>
              
              {/* Left Controls */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
                
                {/* Control 1: Industry Sector */}
                <div>
                  <label style={{ display: 'block', color: '#FFF', fontSize: '13px', fontWeight: '600', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '1px' }}>
                    Select Industry Risk Level
                  </label>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
                    {['Finance', 'Pharma', 'Energy'].map(sec => (
                      <button
                        key={sec}
                        onClick={() => setCalcSector(sec)}
                        style={{
                          padding: '10px',
                          borderRadius: '8px',
                          background: calcSector === sec ? '#00BFA5' : 'rgba(255,255,255,0.03)',
                          border: calcSector === sec ? '1px solid #00BFA5' : '1px solid rgba(255,255,255,0.08)',
                          color: calcSector === sec ? '#020617' : '#E2E8F0',
                          fontWeight: '700',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease'
                        }}
                      >
                        {sec === 'Finance' ? '🏛️ Finance' : sec === 'Pharma' ? '🧪 Pharma' : '⚡ Energy'}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Control 2: Active Excel Users (Slider) */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: '#FFF', fontSize: '13px', fontWeight: '600', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '1px' }}>
                    <span>Active Excel Users</span>
                    <span style={{ color: '#00BFA5', fontFamily: 'monospace', fontWeight: '700' }}>{usersCount} Users</span>
                  </div>
                  <input
                    type="range"
                    min="25"
                    max="2000"
                    step="25"
                    value={usersCount}
                    onChange={(e) => setUsersCount(Number(e.target.value))}
                    className="slider-control"
                    style={{
                      width: '100%',
                      height: '6px',
                      borderRadius: '3px',
                      background: 'rgba(255,255,255,0.1)',
                      outline: 'none',
                      WebkitAppearance: 'none'
                    }}
                  />
                </div>

                {/* Control 3: Avg Hourly Analyst/Engineer Cost */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: '#FFF', fontSize: '13px', fontWeight: '600', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '1px' }}>
                    <span>Average Hourly Rate</span>
                    <span style={{ color: '#00BFA5', fontFamily: 'monospace', fontWeight: '700' }}>${hourlyRate}/hr</span>
                  </div>
                  <input
                    type="range"
                    min="30"
                    max="200"
                    step="5"
                    value={hourlyRate}
                    onChange={(e) => setHourlyRate(Number(e.target.value))}
                    className="slider-control"
                    style={{
                      width: '100%',
                      height: '6px',
                      borderRadius: '3px',
                      background: 'rgba(255,255,255,0.1)',
                      outline: 'none',
                      WebkitAppearance: 'none'
                    }}
                  />
                </div>

                {/* Control 4: Spreadsheet Sprawl Severity */}
                <div>
                  <label style={{ display: 'block', color: '#FFF', fontSize: '13px', fontWeight: '600', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '1px' }}>
                    Excel Sprawl Severity
                  </label>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
                    {['Low', 'Medium', 'High'].map(sev => (
                      <button
                        key={sev}
                        onClick={() => setSeverityLevel(sev)}
                        style={{
                          padding: '10px',
                          borderRadius: '8px',
                          background: severityLevel === sev ? '#6366F1' : 'rgba(255,255,255,0.03)',
                          border: severityLevel === sev ? '1px solid #6366F1' : '1px solid rgba(255,255,255,0.08)',
                          color: '#E2E8F0',
                          fontWeight: '600',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease'
                        }}
                      >
                        {sev} Sprawl
                      </button>
                    ))}
                  </div>
                </div>

              </div>

              {/* Right Display: ROI Metrics */}
              <div style={{ 
                background: 'rgba(0, 0, 0, 0.25)', 
                borderRadius: '20px', 
                border: '1px solid rgba(99, 102, 241, 0.25)', 
                padding: '30px',
                display: 'flex',
                flexDirection: 'column',
                gap: '24px'
              }}>
                
                <div style={{ textAlign: 'center', borderBottom: '1px solid rgba(255, 255, 255, 0.05)', paddingBottom: '16px' }}>
                  <span style={{ fontSize: '11px', color: '#64748b', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1.5px' }}>
                    Net Value Unlocked By DataTrust V3.0
                  </span>
                  <div style={{ color: '#00BFA5', fontSize: '42px', fontWeight: '800', fontFamily: '"Space Grotesk", sans-serif', marginTop: '8px' }}>
                    ${currentRoi.totalROI} / yr
                  </div>
                </div>

                {/* Rows */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ color: '#CBD5E1', fontSize: '14px' }}>Reclaimed Analyst/Eng Hours:</span>
                    <span style={{ color: '#FFF', fontWeight: '700', fontSize: '15px' }}>{currentRoi.hoursSaved} hrs/yr</span>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ color: '#CBD5E1', fontSize: '14px' }}>Manual Effort Costs Saved:</span>
                    <span style={{ color: '#FFF', fontWeight: '700', fontSize: '15px' }}>${currentRoi.moneySaved}/yr</span>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ color: '#CBD5E1', fontSize: '14px' }}>Spreadsheet Errors Prevented:</span>
                    <span style={{ color: '#FFF', fontWeight: '700', fontSize: '15px' }}>{currentRoi.errorsPrevented} failures/yr</span>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ color: '#CBD5E1', fontSize: '14px' }}>Compliance Audit Savings:</span>
                    <span style={{ color: '#FFF', fontWeight: '700', fontSize: '15px' }}>${currentRoi.riskValue}/yr</span>
                  </div>

                </div>

                <div style={{ background: 'rgba(0, 191, 165, 0.05)', borderRadius: '12px', border: '1px solid rgba(0, 191, 165, 0.1)', padding: '12px 16px', fontSize: '12px', color: '#64748b', textAlign: 'center', lineHeight: '1.5' }}>
                  💡 <b>Formula</b>: [Hours Wasted × Rate] + [Risk Mitigated Overhead factor scaled to {calcSector} industry regulation standards].
                </div>

              </div>

            </div>
          </div>
        )}

      </div>

    </div>
  );
}
