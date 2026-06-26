import React, { useState, useEffect } from 'react';
import { Database, Zap, Shield, CheckCircle, FileSpreadsheet, Play, RefreshCw, Activity, ArrowRight, BookOpen, Code } from './Icons';
import CodeBlock from './CodeBlock';

export default function DataFlowDocs() {
  const [activeStage, setActiveStage] = useState(1);
  const [simRunning, setSimRunning] = useState(false);
  const [simStep, setSimStep] = useState(0);
  const [simLogs, setSimLogs] = useState([]);
  
  const stages = [
    {
      id: 1,
      title: '1. Data Source (Warehouse)',
      purpose: 'Raw data storage and secure retrieval',
      icon: <Database size={24} color="#3B82F6" />,
      color: '#3B82F6',
      input: 'None (Primary source)',
      output: 'Raw dataset with schema metadata (columns, data types, nullability, relationships)',
      processing: [
        'Establish connection via Admin Console configured credentials (Snowflake, Databricks, Fabric, etc.)',
        'Fetch schema metadata and build catalog database',
        'Read raw, unvalidated tables in real-time or via optimized scheduled syncs',
        'Cache table relationships for multi-cloud queries'
      ],
      interconnections: [
        { name: 'Semantic Engine', desc: 'Sends schema metadata + column definitions' },
        { name: 'Quality Engine', desc: 'Sends raw data streams for statistical inspection' },
        { name: 'Audit Engine', desc: 'Logs warehouse query execution and access events' }
      ],
      code: `// Stage 1: Warehouse Connection Handshake
{
  "datasource": "Snowflake_Prod_DW",
  "connection_status": "CONNECTED",
  "schema": "analytics_sales",
  "table": "sales_transactions",
  "columns": {
    "transaction_id": "VARCHAR(36) NOT NULL",
    "sales_amount": "DECIMAL(18, 2) NULL",
    "units": "INTEGER NULL",
    "region": "VARCHAR(50) NULL"
  }
}`
    },
    {
      id: 2,
      title: '2. Semantic Engine',
      purpose: 'Transforms raw database columns into governed business metrics',
      icon: <BrainIcon size={24} color="#A855F7" />,
      color: '#A855F7',
      input: 'Raw dataset from warehouse (Stage 1) + Metric definitions from Admin Console',
      output: 'Governed dataset with business rules applied, compiler optimized SQL query, and full lineage map',
      processing: [
        'Metric Resolution: Match "Revenue" -> SUM(net_sales) WHERE status="completed"',
        'SQL Generation: Automatically compile optimized, secure SQL code representing the metric',
        'Lineage Capture: Trace source columns to the final semantic metrics',
        'Version Management: Tag compilation with rule version tags (e.g. v1.2.0)'
      ],
      interconnections: [
        { name: 'Quality Engine', desc: 'Sends computed governed data and metrics definition context' },
        { name: 'Audit Engine', desc: 'Logs semantic metric compilation and SQL code generation' },
        { name: 'Data Warehouse', desc: 'Executes compiler optimized SQL queries' }
      ],
      code: `-- Stage 2: Compiled Metric SQL
SELECT 
  region,
  SUM(sales_amount) as revenue,
  SUM(units) as total_units
FROM analytics_sales.sales_transactions
WHERE transaction_status = 'Completed'
GROUP BY region`
    },
    {
      id: 3,
      title: '3. Quality Engine',
      purpose: 'Proactive quality monitoring and statistical anomaly detection',
      icon: <Activity size={24} color="#F59E0B" />,
      color: '#F59E0B',
      input: 'Governed data from Semantic Engine (Stage 2) + Validation constraints',
      output: 'Data quality health score (0-100), violation tags per row, and anomaly alert notifications',
      processing: [
        'Rule Validation: Compute standard statistical and column constraints on the dataset',
        'Anomaly Detection: Run Isolation Forest & Prophet forecasting on historical metrics data',
        'Predictive Quality: Identify volume drops or outlier ratios 24 hours BEFORE publication',
        'Quality Scoring: Compute overall health score index based on rule failures and weights'
      ],
      interconnections: [
        { name: 'Validation Engine', desc: 'Sends validated data and lists of specific rule violations' },
        { name: 'Alert Engine', desc: 'Triggers priority Webhooks (Slack/Teams) on high severity anomalies' },
        { name: 'Audit Engine', desc: 'Logs anomaly check scores, model outputs, and prediction limits' }
      ],
      code: `# Stage 3: Statistical Outlier Check
# Isolation Forest (contamination=0.01)
import numpy as np
from sklearn.ensemble import IsolationForest

data = np.array([4.2, 3.8, 1.1, 2.9, 8.5]) # revenue (Cr)
clf = IsolationForest(random_state=42).fit(data.reshape(-1, 1))
predictions = clf.predict(data.reshape(-1, 1)) 
# Result: 1.1 Cr flagged as anomaly (-1)`
    },
    {
      id: 4,
      title: '4. Validation Engine',
      purpose: 'Enforces business rules and applies zero-touch auto-corrections',
      icon: <Shield size={24} color="#10B981" />,
      color: '#10B981',
      input: 'Quality Engine output + Active auto-correction rules',
      output: 'Fully validated dataset, auto-correction change logs, and publication-ready states',
      processing: [
        'Rule Enforcement: Verify business relationships (e.g. Revenue = Units * Price) row-by-row',
        'Violation Analysis: Categorize failures (null values, boundary exceedances, formatting errors)',
        'Zero-Touch Auto-Correction: Run AI-supported fix actions (e.g., fill default values, trim space, drop duplicates)',
        'Re-Validation: Run final validation pass on auto-corrected records to guarantee compliance'
      ],
      interconnections: [
        { name: 'Excel Add-in', desc: 'Dispatches validated rows and cell metadata flags for display' },
        { name: 'Audit Engine', desc: 'Logs applied auto-correction strategies, reasons, and rollback targets' },
        { name: 'Alert Engine', desc: 'Dispatches alerts if rules fail and cannot be auto-corrected' }
      ],
      code: `// Stage 4: Auto-Correction Log
{
  "pipeline_run": "run_9a2f1b7",
  "rule_violation": "DUPLICATE_ROWS",
  "affected_rows": 42,
  "action_taken": "DROP_DUPLICATES",
  "original_revenue": "87.5 Cr",
  "corrected_revenue": "85.0 Cr",
  "validation_status": "PASSED"
}`
    },
    {
      id: 5,
      title: '5. Excel Add-in (Live Refresh)',
      purpose: 'Delivers governed, validated data directly inside Microsoft Excel worksheets',
      icon: <FileSpreadsheet size={24} color="#10B981" />,
      color: '#10B981',
      input: 'Validation Engine output + Excel workbook context',
      output: 'Excel workbook containing live, validated, governed data with lineage panels',
      processing: [
        'Live Data Ingest: Push clean records directly to sheets via Office JS APIs',
        'Formula Auto-Correction: Scan spreadsheet formulas and fix broken reference metrics',
        'Data Validation Display: Render green, yellow, and red highlights directly in cells',
        'Audit Trail Attachment: Link active workbook instance with DataTrust central audit logs'
      ],
      interconnections: [
        { name: 'Excel Users', desc: 'Provides the trusted reporting environment' },
        { name: 'Audit Engine', desc: 'Logs sheet refresh events, active worksheets, and manual cell overrides' }
      ],
      code: `// Stage 5: Office.js Data Sync
Excel.run(async (context) => {
  const sheet = context.workbook.worksheets.getActiveWorksheet();
  const range = sheet.getRange("A2:D5");
  range.values = [
    ["North", 42000000, 8400, "✓ OK"],
    ["South", 38000000, 7600, "✓ OK"],
    ["West", 11000000, 6200, "✓ OK"],
    ["East", 29000000, 5800, "✓ OK"]
  ];
  await context.sync();
});`
    },
    {
      id: 6,
      title: '6. Excel Users (Trusted Report)',
      purpose: 'Enables business users to consume and share audited data for executive decisions',
      icon: <CheckCircle size={24} color="#00BFA5" />,
      color: '#00BFA5',
      input: 'Excel worksheet data + Add-in status indicators',
      output: 'Auditable planning and forecasting reports for board meetings and CFO compliance review',
      processing: [
        'Finance Analysts: Open spreadsheets, refresh, and run validations immediately',
        'CFO & Leadership: View certified spreadsheets, inspect lineage, and trust metrics',
        'Data Teams: Track anomalies in real-time, inspect custom formulas, and monitor health scores',
        'Compliance Officers: Access audit trail portal to review full pipeline history'
      ],
      interconnections: [
        { name: 'Audit Engine', desc: 'Logs user interaction events and export actions' }
      ],
      code: `// Stage 6: Corporate Trusted Report Metadata
{
  "report_name": "Q4_Financial_Consolidation_v3",
  "data_governed_status": "100% COMPLIANT",
  "last_refresh": "09:02 AM",
  "sign_off_status": "APPROVED",
  "audit_trail_id": "DT-AUD-88921-A"
}`
    }
  ];

  const simulationSteps = [
    {
      title: '1. Handshake with Snowflake',
      stage: 1,
      log: 'Connecting to database schema analytics_sales...\nHandshake completed. Fetched table: sales_transactions (4 columns, 5,000 rows).',
      status: 'success'
    },
    {
      title: '2. Compile Semantic Metrics',
      stage: 2,
      log: 'Resolving metric: Revenue = SUM(sales_amount)\nCompiling optimized Snowflake SQL...\nCapturing lineage map: sales_transactions.sales_amount -> Q4 Revenue.',
      status: 'success'
    },
    {
      title: '3. Run ML Quality Anomalies',
      stage: 3,
      log: 'Applying Isolation Forest model for anomaly check...\nProphet forecast loaded: expected range [₹8.0 Cr - ₹12.0 Cr]\nWarning: West region units ratio is atypical (anomaly detected). Health score: 76.',
      status: 'warning'
    },
    {
      title: '4. Validation & Auto-Correction',
      stage: 4,
      log: 'Enforcing rule: sales_amount > 0 and units > 0.\n42 duplicate rows identified in West region data.\nExecuting Zero-Touch Auto-Correction: Dropping duplicates...\nRe-running validation: PASS. Health score: 100.',
      status: 'success'
    },
    {
      title: '5. Office JS Excel Synchronizer',
      stage: 5,
      log: 'Connecting to Excel Add-in websocket...\nStreaming clean dataset values: 4 regional summary rows written.\nRunning Excel formula scanner: Fixed 1 broken SUM reference. Attaching metadata...',
      status: 'success'
    },
    {
      title: '6. Report Verified by CFO Office',
      stage: 6,
      log: 'Sheet initialized successfully. CFO workspace visual banner set to Certified green.\nAudit Trail ID generated: DT-AUD-88921-A.\nQ4 Report is now trusted and published.',
      status: 'success'
    }
  ];

  const runSimulation = () => {
    if (simRunning) return;
    setSimRunning(true);
    setSimStep(0);
    setSimLogs([]);
    
    let currentStep = 0;
    const interval = setInterval(() => {
      if (currentStep < simulationSteps.length) {
        const stepInfo = simulationSteps[currentStep];
        setSimStep(currentStep + 1);
        setActiveStage(stepInfo.stage);
        setSimLogs(prev => [
          ...prev,
          {
            timestamp: new Date().toLocaleTimeString(),
            title: stepInfo.title,
            log: stepInfo.log,
            status: stepInfo.status
          }
        ]);
        currentStep++;
      } else {
        clearInterval(interval);
        setSimRunning(false);
      }
    }, 2000);
  };

  return (
    <div style={{ padding: '60px 0', background: '#0F172A', color: '#CBD5E1' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
        
        {/* Header */}
        <div style={{ marginBottom: '50px', textAlign: 'center' }}>
          <div style={{ color: '#00BFA5', fontSize: '14px', fontWeight: '800', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '12px' }}>
            DataTrust Platform Flow
          </div>
          <h2 style={{ color: '#fff', fontSize: '36px', fontWeight: '800', marginBottom: '16px' }}>
            End-to-End Governance Data Flow
          </h2>
          <p style={{ color: '#94A3B8', fontSize: '18px', maxWidth: '850px', margin: '0 auto', lineHeight: '1.6' }}>
            Trace how metrics pass from raw cloud warehouses into governed business equations, clean anomaly filters, auto-corrections, and directly into client Excel worksheets with real-time audit logging.
          </p>
        </div>

        {/* High-Level Design (HLD) Diagrams */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))', gap: '30px', marginBottom: '50px' }}>
          <div style={{ background: '#1E293B', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px', padding: '30px', display: 'flex', flexDirection: 'column', justifyBetween: 'space-between' }}>
            <h3 style={{ margin: '0 0 12px', color: '#fff', fontSize: '20px', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ color: '#00BFA5' }}>📐</span> 1.1 High-Level Overview HLD
            </h3>
            <p style={{ color: '#94A3B8', fontSize: '14px', marginBottom: '20px', lineHeight: '1.6' }}>
              Data flow showing raw warehouse tables parsed by the Semantic Engine, validated by the Quality/Validation Engines, refreshed in real-time in the Excel Add-in, and continuously logged.
            </p>
            <div style={{ marginTop: 'auto' }}>
              <CodeBlock 
                title="1.1_high_level_overview.txt"
                language="plaintext"
                code={`┌─────────────────────────────────────────────────────────────────────────────────────┐
│           END-TO-END DATA FLOW — WAREHOUSE TO TRUSTED EXCEL REPORT                │
├─────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                     │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐         │
│  │  1. DATA   │    │  2. SEMANTIC│    │  3. QUALITY │    │  4. VALIDATION│         │
│  │  SOURCE    │───▶│   ENGINE    │───▶│   ENGINE    │───▶│   ENGINE     │         │
│  │  (Warehouse)│    │             │    │             │    │              │         │
│  └─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘         │
│                                                                                     │
│                                                                                     │
│  ┌─────────────┐    ┌─────────────┐                                                │
│  │  5. EXCEL  │    │  6. EXCEL   │                                                │
│  │   ADD-IN   │───▶│   USERS     │                                                │
│  │   Live     │    │   Trusted   │                                                │
│  │   Refresh  │    │   Report    │                                                │
│  └─────────────┘    └─────────────┘                                                │
│                                                                                     │
│                    ┌─────────────────────────────────────────────────┐              │
│                    │         AUDIT TRAIL ENGINE (Continuous)        │              │
│                    │  Every refresh, formula correction, rule change│              │
│                    │  and override is logged in real-time           │              │
│                    └─────────────────────────────────────────────────┘              │
│                                                                                     │
└─────────────────────────────────────────────────────────────────────────────────────┘`}
              />
            </div>
          </div>

          <div style={{ background: '#1E293B', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px', padding: '30px', display: 'flex', flexDirection: 'column', justifyBetween: 'space-between' }}>
            <h3 style={{ margin: '0 0 12px', color: '#fff', fontSize: '20px', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ color: '#6366F1' }}>🛡️</span> 1.3 Data Flow with Audit Trail HLD
            </h3>
            <p style={{ color: '#94A3B8', fontSize: '14px', marginBottom: '20px', lineHeight: '1.6' }}>
              Complete audit tracking details showing how query execution, semantic compilations, anomaly detections, auto-corrections, and cell actions feed into the Audit Trail Engine.
            </p>
            <div style={{ marginTop: 'auto' }}>
              <CodeBlock 
                title="1.3_data_flow_with_audit.txt"
                language="plaintext"
                code={`┌─────────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│                        COMPLETE DATA FLOW WITH AUDIT TRAIL (Continuous Logging)                           │
├─────────────────────────────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                                             │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐    ┌──────────────┐    ┌──────────────┐         │
│  │    DATA      │    │   SEMANTIC   │    │   QUALITY    │    │  VALIDATION  │    │    EXCEL     │         │
│  │   SOURCE     │───▶│    ENGINE    │───▶│    ENGINE    │───▶│    ENGINE    │───▶│    ADD-IN    │         │
│  │  (Warehouse) │    │              │    │              │    │              │    │              │         │
│  └──────────────┘    └──────────────┘    └──────────────┘    └──────────────┘    └──────────────┘         │
│        │                    │                    │                    │                    │               │
│        ▼                    ▼                    ▼                    ▼                    ▼               │
│  ┌──────────────────────────────────────────────────────────────────────────────────────────────────────┐ │
│  │                                    AUDIT TRAIL ENGINE (Real-Time)                                   │ │
│  │                                                                                                      │ │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌────────────────────────┐ │ │
│  │  │  Data Access │  │   Metric     │  │   Anomaly    │  │   Auto-     │  │   Refresh & User       │ │ │
│  │  │    Logged    │  │  Application │  │  Detection   │  │  Correction  │  │  Interactions Logged   │ │ │
│  │  │  (PII Masking)│  │   Audited    │  │  Recorded    │  │   Logged     │  │    (CFO Dashboard)     │ │ │
│  │  └──────────────┘  └──────────────┘  └──────────────┘  └──────────────┘  └────────────────────────┘ │ │
│  └──────────────────────────────────────────────────────────────────────────────────────────────────────┘ │
│                                                                                                             │
└─────────────────────────────────────────────────────────────────────────────────────────────────────────────┘`}
              />
            </div>
          </div>
        </div>

        {/* 1. Interactive Flow Diagram & Simulation */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '30px', marginBottom: '50px' }}>
          
          {/* Flow Visualizer Box */}
          <div style={{ background: '#1E293B', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px', padding: '30px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', position: 'relative', overflow: 'hidden' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h3 style={{ margin: 0, color: '#fff', fontSize: '20px', fontWeight: '700' }}>Pipeline Lifecycle Map</h3>
              <button 
                onClick={runSimulation} 
                disabled={simRunning}
                style={{ 
                  background: simRunning ? 'rgba(0,191,165,0.1)' : 'linear-gradient(135deg, #00BFA5 0%, #00BFA5 100%)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '10px 18px',
                  fontWeight: '700',
                  fontSize: '14px',
                  cursor: simRunning ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  boxShadow: '0 4px 14px rgba(0, 191, 165, 0.25)',
                  transition: 'all 0.2s',
                  border: 'none'
                }}
              >
                {simRunning ? (
                  <>
                    <RefreshCw size={14} className="animate-spin" />
                    Simulating...
                  </>
                ) : (
                  <>
                    <Play size={14} />
                    Run Simulation
                  </>
                )}
              </button>
            </div>

            {/* Stages Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', position: 'relative', zIndex: 2 }}>
              {stages.map((stg) => {
                const isActive = activeStage === stg.id;
                const isPassed = simStep > stg.id;
                
                return (
                  <div 
                    key={stg.id}
                    onClick={() => !simRunning && setActiveStage(stg.id)}
                    style={{
                      background: isActive ? 'rgba(255,255,255,0.04)' : '#0F172A',
                      border: isActive 
                        ? `2px solid ${stg.color}` 
                        : isPassed 
                          ? `1px solid rgba(16, 185, 129, 0.4)`
                          : '1px solid rgba(255,255,255,0.06)',
                      borderRadius: '12px',
                      padding: '20px',
                      cursor: simRunning ? 'default' : 'pointer',
                      transition: 'all 0.3s ease',
                      position: 'relative',
                      boxShadow: isActive ? `0 0 20px ${stg.color}20` : 'none'
                    }}
                  >
                    {/* Badge */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        {stg.icon}
                        <span style={{ fontSize: '12px', color: '#94A3B8', fontWeight: '700' }}>Stage {stg.id}</span>
                      </div>
                      
                      {/* Pulse indicator */}
                      {isActive && simRunning && (
                        <span style={{ display: 'flex', height: '8px', width: '8px', position: 'relative' }}>
                          <span style={{ animation: 'ping 1s cubic-bezier(0, 0, 0.2, 1) infinite', position: 'absolute', display: 'inline-flex', height: '100%', width: '100%', borderRadius: '9999px', opacity: 0.75, background: stg.color }}></span>
                          <span style={{ position: 'relative', display: 'inline-flex', borderRadius: '9999px', height: '8px', width: '8px', background: stg.color }}></span>
                        </span>
                      )}
                      {isPassed && (
                        <span style={{ color: '#10B981', fontSize: '11px', fontWeight: 'bold' }}>✓ Done</span>
                      )}
                    </div>

                    <div style={{ color: '#F8FAFC', fontWeight: '700', fontSize: '14px', marginBottom: '6px' }}>
                      {stg.title.split('. ')[1]}
                    </div>
                    <div style={{ color: '#94A3B8', fontSize: '12px', lineHeight: '1.4' }}>
                      {stg.purpose.substring(0, 50)}...
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Connecting Pulse Line */}
            <div style={{ 
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.05)',
              borderRadius: '10px',
              padding: '14px 20px',
              marginTop: '24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontSize: '12px',
              color: '#94A3B8'
            }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span className="dot-pulse" style={{ background: '#00BFA5' }}></span>
                <strong>Continuous Logging Engine:</strong> Real-time Audit tracking connected to every pipeline node.
              </span>
              <span style={{ color: '#00BFA5', fontWeight: '700' }}>Active</span>
            </div>
          </div>

          {/* Simulation Console Window */}
          <div className="nlq-terminal" style={{ height: '100%', minHeight: '360px', display: 'flex', flexDirection: 'column' }}>
            <div className="nlq-topbar">
              <span className="nlq-dot" style={{ background: '#EF4444' }}></span>
              <span className="nlq-dot" style={{ background: '#F59E0B' }}></span>
              <span className="nlq-dot" style={{ background: '#10B981' }}></span>
              <span style={{ color: '#94A3B8', fontSize: '11px', fontFamily: 'monospace', marginLeft: 'auto' }}>datatrust-flow-sim.sh</span>
            </div>
            
            <div style={{ flex: 1, padding: '20px', fontFamily: 'monospace', fontSize: '12px', overflowY: 'auto', background: '#090D16', color: '#8892B0', lineHeight: '1.6' }}>
              {simLogs.length === 0 ? (
                <div style={{ color: '#6366F1', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', gap: '12px', textAlign: 'center' }}>
                  <Zap size={32} />
                  <span>Click "Run Simulation" to watch raw tables transform and compile down to validated spreadsheets in real-time.</span>
                </div>
              ) : (
                simLogs.map((log, index) => (
                  <div key={index} style={{ marginBottom: '16px', borderBottom: '1px solid rgba(255,255,255,0.03)', paddingBottom: '12px' }}>
                    <div style={{ display: 'flex', gap: '10px', color: log.status === 'error' ? '#EF4444' : log.status === 'warning' ? '#F59E0B' : '#7EE7B8', fontWeight: 'bold', marginBottom: '4px' }}>
                      <span>[{log.timestamp}]</span>
                      <span>{log.title}</span>
                    </div>
                    <div style={{ color: '#E2E8F0', whiteSpace: 'pre-wrap', paddingLeft: '15px' }}>{log.log}</div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* 2. Detailed Stage Inspector */}
        <div style={{ background: '#1E293B', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px', padding: '36px', marginBottom: '50px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '24px' }}>
            {stages[activeStage - 1].icon}
            <h3 style={{ margin: 0, color: '#fff', fontSize: '24px', fontWeight: '800' }}>
              Stage Detail: {stages[activeStage - 1].title}
            </h3>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '40px' }}>
            
            {/* Left Specs */}
            <div>
              <div style={{ marginBottom: '20px' }}>
                <span style={{ fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', color: '#94A3B8', display: 'block', marginBottom: '6px' }}>Purpose</span>
                <p style={{ color: '#E2E8F0', fontSize: '15px', margin: 0, lineHeight: '1.6' }}>{stages[activeStage - 1].purpose}</p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '24px' }}>
                <div style={{ background: '#0F172A', padding: '14px 18px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.04)' }}>
                  <span style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', color: '#6366F1', display: 'block', marginBottom: '4px' }}>Inputs</span>
                  <span style={{ color: '#CBD5E1', fontSize: '13px' }}>{stages[activeStage - 1].input}</span>
                </div>
                <div style={{ background: '#0F172A', padding: '14px 18px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.04)' }}>
                  <span style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', color: '#00BFA5', display: 'block', marginBottom: '4px' }}>Outputs</span>
                  <span style={{ color: '#CBD5E1', fontSize: '13px' }}>{stages[activeStage - 1].output}</span>
                </div>
              </div>

              <div style={{ marginBottom: '24px' }}>
                <span style={{ fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', color: '#94A3B8', display: 'block', marginBottom: '10px' }}>Internal Processing Operations</span>
                <ul style={{ paddingLeft: '20px', margin: 0 }}>
                  {stages[activeStage - 1].processing.map((proc, pi) => (
                    <li key={pi} style={{ color: '#CBD5E1', fontSize: '14px', marginBottom: '8px', lineHeight: '1.5' }}>{proc}</li>
                  ))}
                </ul>
              </div>

              <div>
                <span style={{ fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', color: '#94A3B8', display: 'block', marginBottom: '10px' }}>Engine Interconnections</span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {stages[activeStage - 1].interconnections.map((conn, ci) => (
                    <div key={ci} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px' }}>
                      <span style={{ display: 'inline-block', background: 'rgba(99,102,241,0.12)', border: '1px solid rgba(99,102,241,0.3)', color: '#818CF8', padding: '2px 8px', borderRadius: '4px', fontWeight: 'bold' }}>
                        → {conn.name}
                      </span>
                      <span style={{ color: '#94A3B8' }}>{conn.desc}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Code Display */}
            <div>
              <span style={{ fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', color: '#94A3B8', display: 'block', marginBottom: '8px' }}>Internal Schema & Logic Representation</span>
              <CodeBlock 
                title={`${stages[activeStage - 1].title.split('. ')[1]} Code Snippet`}
                code={stages[activeStage - 1].code}
              />
            </div>

          </div>
        </div>

        {/* 3. Real-Time Audit Trail Demonstration */}
        <div style={{ background: '#111827', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '16px', padding: '36px' }}>
          <div style={{ display: 'flex', justifyBetween: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '12px', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
                <Shield size={24} color="#00BFA5" />
                <h3 style={{ margin: 0, color: '#fff', fontSize: '22px', fontWeight: '800' }}>Real-Time Audit Trail Engine</h3>
              </div>
              <p style={{ color: '#94A3B8', fontSize: '14px', margin: 0 }}>Every refresh, formula correction, rule change, and manual cell override is audited continuously.</p>
            </div>
            <span style={{ background: 'rgba(0,191,165,0.1)', border: '1px solid rgba(0,191,165,0.2)', borderRadius: '6px', padding: '6px 12px', color: '#00BFA5', fontSize: '12px', fontWeight: 'bold' }}>
              ✓ Compliance Matrix: SOX, GDPR, HIPAA
            </span>
          </div>

          {/* Audit Logs Table */}
          <div style={{ overflowX: 'auto', background: '#0F172A', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.05)' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
              <thead>
                <tr style={{ background: '#1E293B', color: '#94A3B8', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                  <th style={{ padding: '14px 20px', fontWeight: '700' }}>Timestamp</th>
                  <th style={{ padding: '14px 20px', fontWeight: '700' }}>Event Category</th>
                  <th style={{ padding: '14px 20px', fontWeight: '700' }}>Pipeline Module</th>
                  <th style={{ padding: '14px 20px', fontWeight: '700' }}>Audit Description</th>
                  <th style={{ padding: '14px 20px', fontWeight: '700' }}>Triggered By</th>
                  <th style={{ padding: '14px 20px', fontWeight: '700' }}>Compliance Verification</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { time: '09:02:14 AM', cat: 'USER_REFRESH', module: 'Excel Add-in V3', desc: 'Workbook data refresh triggered for Q4 Financial Report.', actor: 'Rahul Sharma (Finance)', comp: 'PASSED' },
                  { time: '09:02:13 AM', cat: 'FORMULA_CORRECT', module: 'Validation Engine', desc: 'Auto-fixed broken SUM formula in sheet cells E4-E24.', actor: 'System (AI Auto-Fix)', comp: 'COMPLIANT' },
                  { time: '09:02:12 AM', cat: 'CLEANSE_RECORDS', module: 'Validation Engine', desc: 'Dropped 42 duplicate rows violating store limits (Store 42).', actor: 'System (Rule Engine)', comp: 'SOX Section 404' },
                  { time: '09:02:11 AM', cat: 'ANOMALY_ALERTS', module: 'Quality Engine V2', desc: 'Isolation forest flagged abnormal revenue ratios in West region values.', actor: 'System (Predictive QA)', comp: 'VERIFIED' },
                  { time: '09:02:10 AM', cat: 'SQL_EXECUTION', module: 'Semantic Engine V2', desc: 'Compiled metric "Revenue" executed as optimized SQL query on Snowflake.', actor: 'System (Semantic Layer)', comp: 'COMPLIANT' },
                  { time: '09:02:08 AM', cat: 'ACCESS_HANDSHAKE', module: 'Data Source Connector', desc: 'Established secure connection with Snowflake endpoint prod_dw.', actor: 'System (Handshake)', comp: 'SOC-2 Secure' }
                ].map((row, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.03)', color: '#CBD5E1' }}>
                    <td style={{ padding: '14px 20px', color: '#94A3B8', fontFamily: 'monospace' }}>{row.time}</td>
                    <td style={{ padding: '14px 20px' }}>
                      <span style={{ 
                        background: row.cat === 'ANOMALY_ALERTS' ? 'rgba(245,158,11,0.1)' : 'rgba(255,255,255,0.04)',
                        border: row.cat === 'ANOMALY_ALERTS' ? '1px solid rgba(245,158,11,0.2)' : '1px solid rgba(255,255,255,0.06)',
                        padding: '3px 8px',
                        borderRadius: '4px',
                        fontSize: '11px',
                        fontWeight: 'bold',
                        color: row.cat === 'ANOMALY_ALERTS' ? '#F59E0B' : '#E2E8F0'
                      }}>
                        {row.cat}
                      </span>
                    </td>
                    <td style={{ padding: '14px 20px', fontWeight: 'bold' }}>{row.module}</td>
                    <td style={{ padding: '14px 20px', color: '#E2E8F0' }}>{row.desc}</td>
                    <td style={{ padding: '14px 20px' }}>{row.actor}</td>
                    <td style={{ padding: '14px 20px', color: '#10B981', fontWeight: 'bold' }}>✓ {row.comp}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}

// Minimal placeholder Brain icon
function BrainIcon({ size = 18, color = "currentColor" }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z"/>
      <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z"/>
    </svg>
  );
}
