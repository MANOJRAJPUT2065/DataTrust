import React from 'react';
import CodeBlock from './CodeBlock';

const PipelineEngineDocs = () => {
  return (
    <div style={{ padding: '60px 0', background: '#0F172A', color: '#CBD5E1' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <h2 style={{ color: '#fff', fontSize: '32px', marginBottom: '40px' }}>DataTrust Pipeline Engine — Complete Guide</h2>

        {/* ─── NEW: BUSINESS USER GUIDE ─────────────────────────────────── */}
        <div style={{ background: 'rgba(99, 102, 241, 0.1)', borderLeft: '4px solid #6366F1', padding: '16px 20px', marginBottom: '40px', borderRadius: '4px' }}>
          <strong style={{ color: '#6366F1', fontSize: '20px' }}>Trust in Every Number</strong>
          <p style={{ margin: '10px 0 0 0', lineHeight: '1.6' }}>
            A Pipeline is like an Auto-Pilot for your Excel Reports. Set it up once, reports are ready automatically.
          </p>
        </div>

        <h3 style={{ color: '#00BFA5', fontSize: '24px', marginBottom: '20px' }}>1. What Data Can You Use? (All Teams, All Data)</h3>
        <p style={{ color: '#CBD5E1', marginBottom: '16px' }}><strong>✅ ANY Data — Not Just Financial!</strong></p>
        <div style={{ background: '#1E293B', padding: '24px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', marginBottom: '32px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', textAlign: 'left', color: '#94A3B8' }}>
                <th style={{ padding: '8px 0' }}>Team</th>
                <th style={{ padding: '8px 0' }}>Data Type</th>
                <th style={{ padding: '8px 0' }}>Example</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}><td style={{ padding: '8px 0' }}>💰 Finance</td><td style={{ padding: '8px 0' }}>Financial Data</td><td style={{ padding: '8px 0', color: '#93C5FD' }}>Revenue, Profit, Expenses, RWA</td></tr>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}><td style={{ padding: '8px 0' }}>📊 Sales</td><td style={{ padding: '8px 0' }}>Sales Data</td><td style={{ padding: '8px 0', color: '#93C5FD' }}>Deals, Pipeline, Quota, Forecast</td></tr>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}><td style={{ padding: '8px 0' }}>📣 Marketing</td><td style={{ padding: '8px 0' }}>Marketing Data</td><td style={{ padding: '8px 0', color: '#93C5FD' }}>Campaigns, Leads, CAC, ROI</td></tr>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}><td style={{ padding: '8px 0' }}>👥 HR</td><td style={{ padding: '8px 0' }}>HR Data</td><td style={{ padding: '8px 0', color: '#93C5FD' }}>Employees, Attrition, Headcount</td></tr>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}><td style={{ padding: '8px 0' }}>📦 Operations</td><td style={{ padding: '8px 0' }}>Inventory Data</td><td style={{ padding: '8px 0', color: '#93C5FD' }}>Stock, Supply Chain, Orders</td></tr>
            </tbody>
          </table>
        </div>
        
        <CodeBlock 
          title="Different Teams, Different Data"
          code={`┌─────────────────────────────────────────────────────────────────────────────┐
│                    PIPELINE — HAR TEAM KA ALAG DATA                        │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐  │
│  │  💰 FINANCE TEAM                                                     │  │
│  │  Data: sales_transactions (Revenue, Profit, RWA)                    │  │
│  │  Rules: Revenue >= 0, Revenue = Units × Price                       │  │
│  │  Output: Board Report → CFO                                          │  │
│  └─────────────────────────────────────────────────────────────────────┘  │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐  │
│  │  📊 SALES TEAM                                                       │  │
│  │  Data: deals, opportunities (Deal_Amount, Stage, Owner)             │  │
│  │  Rules: Deal_Amount >= 0, Stage IS NOT NULL                         │  │
│  │  Output: Pipeline Report → VP Sales                                  │  │
│  └─────────────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────────────┘`}
        />

        <h3 style={{ color: '#00BFA5', fontSize: '24px', margin: '40px 0 20px' }}>2. What Rules Can You Apply?</h3>
        <div style={{ background: '#1E293B', padding: '24px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', marginBottom: '40px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', textAlign: 'left', color: '#94A3B8' }}>
                <th style={{ padding: '8px 0' }}>Rule Type</th>
                <th style={{ padding: '8px 0' }}>What It Checks</th>
                <th style={{ padding: '8px 0' }}>Example</th>
                <th style={{ padding: '8px 0' }}>Team</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}><td style={{ padding: '8px 0', fontWeight: 'bold' }}>Constraint</td><td style={{ padding: '8px 0' }}>Value must be valid</td><td style={{ padding: '8px 0', color: '#A7F3D0' }}>Revenue {`>=`} 0</td><td style={{ padding: '8px 0' }}>Finance</td></tr>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}><td style={{ padding: '8px 0', fontWeight: 'bold' }}>Completeness</td><td style={{ padding: '8px 0' }}>No missing values</td><td style={{ padding: '8px 0', color: '#A7F3D0' }}>Customer_ID NOT NULL</td><td style={{ padding: '8px 0' }}>Marketing</td></tr>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}><td style={{ padding: '8px 0', fontWeight: 'bold' }}>Relationship</td><td style={{ padding: '8px 0' }}>Values must match</td><td style={{ padding: '8px 0', color: '#A7F3D0' }}>Revenue = Units × Price</td><td style={{ padding: '8px 0' }}>Finance</td></tr>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}><td style={{ padding: '8px 0', fontWeight: 'bold' }}>Historical</td><td style={{ padding: '8px 0' }}>Within normal range</td><td style={{ padding: '8px 0', color: '#A7F3D0' }}>Attrition {`<`} 15%</td><td style={{ padding: '8px 0' }}>HR</td></tr>
            </tbody>
          </table>
        </div>

        <h3 style={{ color: '#00BFA5', fontSize: '24px', margin: '40px 0 20px' }}>3. What Happens When Data Has Issues?</h3>
        <CodeBlock 
          title="Auto-Correction in Action"
          code={`┌─────────────────────────────────────────────────────────────────────────────┐
│                    AUTO-CORRECTION — REAL EXAMPLE                          │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  Issue Detected: Revenue is 40% higher than expected                       │
│  Root Cause: 42 duplicate rows in Store 42                                 │
│  Impact: ₹2.5 Cr overstated                                                │
│                                                                             │
│  Auto-Correction Applied:                                                   │
│  1. Identified 42 duplicates                                               │
│  2. Removed duplicates                                                     │
│  3. Re-validated data — All rules pass ✅                                  │
│                                                                             │
│  Notification Sent:                                                         │
│  "42 duplicate rows removed. Revenue corrected from ₹87.5 Cr to ₹85.0 Cr." │
│                                                                             │
│  User Action: Click "Refresh" → Report updated automatically               │
└─────────────────────────────────────────────────────────────────────────────┘`}
        />

        <h3 style={{ color: '#00BFA5', fontSize: '24px', margin: '40px 0 20px' }}>4. Where Can You Send the Output?</h3>
        <CodeBlock 
          title="Multiple Destinations"
          code={`┌─────────────────────────────────────────────────────────────────────────────┐
│                    PIPELINE OUTPUT — MULTIPLE DESTINATIONS                 │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐  │
│  │  FINANCE: SharePoint + Email to CFO                                │  │
│  └─────────────────────────────────────────────────────────────────────┘  │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐  │
│  │  SALES: Excel + Slack notification to VP Sales                     │  │
│  └─────────────────────────────────────────────────────────────────────┘  │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐  │
│  │  MARKETING: Excel + Teams notification to CMO                      │  │
│  └─────────────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────────────┘`}
        />

        <h3 style={{ color: '#00BFA5', fontSize: '24px', margin: '40px 0 20px' }}>5. Business Impact</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', marginBottom: '60px' }}>
          <div style={{ background: '#1E293B', padding: '24px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
            <h4 style={{ color: '#38BDF8', fontSize: '18px', marginBottom: '16px' }}>⏱️ Time Savings</h4>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', textAlign: 'left', color: '#94A3B8' }}>
                  <th style={{ padding: '8px 0' }}>Team</th>
                  <th style={{ padding: '8px 0' }}>Saving</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}><td style={{ padding: '8px 0' }}>Finance</td><td style={{ padding: '8px 0', color: '#10B981', fontWeight: 'bold' }}>98%</td></tr>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}><td style={{ padding: '8px 0' }}>Sales</td><td style={{ padding: '8px 0', color: '#10B981', fontWeight: 'bold' }}>95%</td></tr>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}><td style={{ padding: '8px 0' }}>HR</td><td style={{ padding: '8px 0', color: '#10B981', fontWeight: 'bold' }}>97%</td></tr>
              </tbody>
            </table>
          </div>
          <div style={{ background: '#1E293B', padding: '24px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
            <h4 style={{ color: '#34D399', fontSize: '18px', marginBottom: '16px' }}>💰 Cost Savings</h4>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', textAlign: 'left', color: '#94A3B8' }}>
                  <th style={{ padding: '8px 0' }}>Category</th>
                  <th style={{ padding: '8px 0' }}>Annual Savings</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}><td style={{ padding: '8px 0' }}>Manual work</td><td style={{ padding: '8px 0', color: '#10B981', fontWeight: 'bold' }}>₹2.5 Cr</td></tr>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}><td style={{ padding: '8px 0' }}>Data quality</td><td style={{ padding: '8px 0', color: '#10B981', fontWeight: 'bold' }}>₹3.2 Cr</td></tr>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}><td style={{ padding: '8px 0' }}>Audit</td><td style={{ padding: '8px 0', color: '#10B981', fontWeight: 'bold' }}>₹1.5 Cr</td></tr>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}><td style={{ padding: '8px 0', fontWeight: 'bold' }}>Total</td><td style={{ padding: '8px 0', color: '#10B981', fontWeight: 'bold', fontSize: '16px' }}>₹13.2 Cr</td></tr>
              </tbody>
            </table>
          </div>
        </div>

        <div style={{ background: 'rgba(245, 158, 11, 0.1)', borderLeft: '4px solid #F59E0B', padding: '16px 20px', marginBottom: '60px', borderRadius: '4px' }}>
          <strong style={{ color: '#F59E0B', fontSize: '18px' }}>Pipeline = ANY Data + ANY Rules + ANY Output → Automatically</strong>
        </div>

        <hr style={{ borderColor: 'rgba(255,255,255,0.1)', margin: '60px 0' }} />

        {/* ─── EXISTING: TECHNICAL ARCHITECTURE ───────────────────────── */}
        <h3 style={{ color: '#00BFA5', fontSize: '24px', marginBottom: '20px' }}>6. Technical Overview</h3>
        <div style={{ background: 'rgba(0,191,165,0.1)', borderLeft: '4px solid #00BFA5', padding: '16px 20px', marginBottom: '40px', borderRadius: '4px' }}>
          <strong style={{ color: '#00BFA5', fontSize: '18px' }}>Pipeline Engine = Automated Data Validation & Reporting System</strong>
          <p style={{ margin: '10px 0 0 0', lineHeight: '1.6' }}>
            Pipeline Engine ek orchestration layer hai jo data extraction, validation, monitoring, aur publishing ko automate karta hai. Ek baar configure karo, phir har baar auto-run.
          </p>
        </div>

        <h3 style={{ color: '#00BFA5', fontSize: '24px', marginBottom: '20px' }}>7. Problem Statement — Why Pipeline?</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', marginBottom: '60px' }}>
          {/* Before */}
          <div style={{ background: '#1E293B', padding: '24px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
            <h4 style={{ color: '#F87171', fontSize: '18px', marginBottom: '16px' }}>❌ Before Pipeline (Manual)</h4>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', textAlign: 'left', color: '#94A3B8' }}>
                  <th style={{ padding: '8px 0' }}>Step</th>
                  <th style={{ padding: '8px 0' }}>Time</th>
                  <th style={{ padding: '8px 0' }}>Pain</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}><td style={{ padding: '8px 0' }}>Export from BI</td><td style={{ padding: '8px 0' }}>30 min</td><td style={{ padding: '8px 0', color: '#FCA5A5' }}>Manual, error-prone</td></tr>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}><td style={{ padding: '8px 0' }}>Copy-paste to Excel</td><td style={{ padding: '8px 0' }}>30 min</td><td style={{ padding: '8px 0', color: '#FCA5A5' }}>Broken formulas</td></tr>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}><td style={{ padding: '8px 0' }}>Fix formulas</td><td style={{ padding: '8px 0' }}>1-2 hours</td><td style={{ padding: '8px 0', color: '#FCA5A5' }}>Always broken</td></tr>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}><td style={{ padding: '8px 0' }}>Data quality check</td><td style={{ padding: '8px 0' }}>2-3 hours</td><td style={{ padding: '8px 0', color: '#FCA5A5' }}>Issues found late</td></tr>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}><td style={{ padding: '8px 0' }}>Publish report</td><td style={{ padding: '8px 0' }}>30 min</td><td style={{ padding: '8px 0', color: '#FCA5A5' }}>Manual email</td></tr>
                <tr style={{ fontWeight: '700' }}><td style={{ padding: '8px 0' }}>Total</td><td style={{ padding: '8px 0' }}>8 hours</td><td style={{ padding: '8px 0', color: '#EF4444' }}>Stress, errors, trust issues</td></tr>
              </tbody>
            </table>
          </div>

          {/* After */}
          <div style={{ background: '#1E293B', padding: '24px', borderRadius: '12px', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
            <h4 style={{ color: '#10B981', fontSize: '18px', marginBottom: '16px' }}>✅ After Pipeline (Automated)</h4>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', textAlign: 'left', color: '#94A3B8' }}>
                  <th style={{ padding: '8px 0' }}>Step</th>
                  <th style={{ padding: '8px 0' }}>Time</th>
                  <th style={{ padding: '8px 0' }}>Benefit</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}><td style={{ padding: '8px 0' }}>Auto-extract</td><td style={{ padding: '8px 0' }}>2 sec</td><td style={{ padding: '8px 0', color: '#6EE7B7' }}>No manual work</td></tr>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}><td style={{ padding: '8px 0' }}>Auto-load</td><td style={{ padding: '8px 0' }}>2 sec</td><td style={{ padding: '8px 0', color: '#6EE7B7' }}>No copy-paste</td></tr>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}><td style={{ padding: '8px 0' }}>Auto-correct</td><td style={{ padding: '8px 0' }}>1 sec</td><td style={{ padding: '8px 0', color: '#6EE7B7' }}>No broken formulas</td></tr>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}><td style={{ padding: '8px 0' }}>Auto-validate</td><td style={{ padding: '8px 0' }}>3 sec</td><td style={{ padding: '8px 0', color: '#6EE7B7' }}>Issues caught instantly</td></tr>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}><td style={{ padding: '8px 0' }}>Auto-publish</td><td style={{ padding: '8px 0' }}>2 sec</td><td style={{ padding: '8px 0', color: '#6EE7B7' }}>One-click, audit trail</td></tr>
                <tr style={{ fontWeight: '700' }}><td style={{ padding: '8px 0' }}>Total</td><td style={{ padding: '8px 0' }}>10 minutes</td><td style={{ padding: '8px 0', color: '#10B981' }}>Zero manual, 100% trusted</td></tr>
              </tbody>
            </table>
          </div>
        </div>

        <h3 style={{ color: '#00BFA5', fontSize: '24px', marginBottom: '20px' }}>8. High-Level Design (HLD)</h3>
        
        {/* Architecture HLD */}
        <CodeBlock 
          title="8.1 Pipeline Engine — Architecture Overview"
          code={`┌─────────────────────────────────────────────────────────────────────────────┐
│                    PIPELINE ENGINE — ARCHITECTURE                          │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐  │
│  │  USER INTERFACE                                                      │  │
│  │  ┌──────────────┐  ┌──────────────┐  ┌────────────────────────────┐│  │
│  │  │  Pipeline    │  │  Pipeline    │  │  Pipeline Detail           ││  │
│  │  │  Dashboard   │  │  Wizard      │  │  (Runs, Logs, History)     ││  │
│  │  └──────────────┘  └──────────────┘  └────────────────────────────┘│  │
│  └─────────────────────────────────────────────────────────────────────┘  │
│                                    │                                        │
│                                    ▼                                        │
│  ┌─────────────────────────────────────────────────────────────────────┐  │
│  │  PIPELINE ENGINE (Core)                                             │  │
│  │  ┌──────────────────────────────────────────────────────────────────┐│  │
│  │  │  ┌────────────┐  ┌────────────┐  ┌────────────────────────────┐││  │
│  │  │  │ Orchestrator│  │  State     │  │  10-Stage Pipeline        │││  │
│  │  │  │ (Runner)   │  │  Machine   │  │  (Connect → Emit)          │││  │
│  │  │  └────────────┘  └────────────┘  └────────────────────────────┘││  │
│  │  └──────────────────────────────────────────────────────────────────┘│  │
│  │  ┌──────────────────────────────────────────────────────────────────┐│  │
│  │  │  ┌────────────┐  ┌────────────┐  ┌────────────────────────────┐││  │
│  │  │  │ Templates  │  │ Dependencies│  │ Versioning & Rollback     │││  │
│  │  │  └────────────┘  └────────────┘  └────────────────────────────┘││  │
│  │  │  ┌────────────┐  ┌────────────┐  ┌────────────────────────────┐││  │
│  │  │  │ Approvals  │  │ SLA        │  │ Impact Analysis           │││  │
│  │  │  └────────────┘  └────────────┘  └────────────────────────────┘││  │
│  │  └──────────────────────────────────────────────────────────────────┘│  │
│  └─────────────────────────────────────────────────────────────────────┘  │
│                                    │                                        │
│                                    ▼                                        │
│  ┌─────────────────────────────────────────────────────────────────────┐  │
│  │  INTEGRATIONS                                                       │  │
│  │  ┌──────────────┐  ┌──────────────┐  ┌────────────────────────────┐│  │
│  │  │  Semantic    │  │  Quality     │  │  Alert & Notification     ││  │
│  │  │  Engine      │  │  Engine      │  │  Engine                    ││  │
│  │  └──────────────┘  └──────────────┘  └────────────────────────────┘│  │
│  │  ┌──────────────┐  ┌──────────────┐  ┌────────────────────────────┐│  │
│  │  │  Audit       │  │  Connection  │  │  Data Sources             ││  │
│  │  │  Engine      │  │  Engine      │  │  (Snowflake, Databricks)  ││  │
│  │  └──────────────┘  └──────────────┘  └────────────────────────────┘│  │
│  └─────────────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────────────┘`}
        />

        {/* 5 Stages Lifecycle HLD */}
        <CodeBlock 
          title="8.2 Pipeline Lifecycle — 5 Stages"
          code={`┌─────────────────────────────────────────────────────────────────────────────┐
│                    PIPELINE LIFECYCLE — 5 STAGES                           │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐  │
│  │  STAGE 1: SELECT                                                     │  │
│  │  ─────────────────────────────────────────────────────────────────── │  │
│  │  "Kaunsi table chahiye?"                                             │  │
│  │  • Choose connection (Snowflake/Databricks)                         │  │
│  │  • Select database, schema, table                                   │  │
│  │  • Select columns                                                   │  │
│  └─────────────────────────────────────────────────────────────────────┘  │
│                                    │                                        │
│                                    ▼                                        │
│  ┌─────────────────────────────────────────────────────────────────────┐  │
│  │  STAGE 2: CONFIGURE                                                  │  │
│  │  ─────────────────────────────────────────────────────────────────── │  │
│  │  "Kya rules apply karna hai?"                                        │  │
│  │  • Define business rules (constraint, completeness, relationship)   │  │
│  │  • Configure alert recipients                                       │  │
│  │  • Set schedule (daily/weekly/monthly)                              │  │
│  └─────────────────────────────────────────────────────────────────────┘  │
│                                    │                                        │
│                                    ▼                                        │
│  ┌─────────────────────────────────────────────────────────────────────┐  │
│  │  STAGE 3: VALIDATE                                                   │  │
│  │  ─────────────────────────────────────────────────────────────────── │  │
│  │  "Data sahi hai?"                                                    │  │
│  │  • Execute rules against data                                       │  │
│  │  • Review violations row by row                                     │  │
│  │  • Auto-correction where appropriate                                │  │
│  └─────────────────────────────────────────────────────────────────────┘  │
│                                    │                                        │
│                                    ▼                                        │
│  ┌─────────────────────────────────────────────────────────────────────┐  │
│  │  STAGE 4: MONITOR                                                    │  │
│  │  ─────────────────────────────────────────────────────────────────── │  │
│  │  "Kya sab sahi chal raha hai?"                                       │  │
│  │  • Track anomalies in real-time                                     │  │
│  │  • Monitor SLA adherence                                            │  │
│  │  • View rule violations dashboard                                   │  │
│  └─────────────────────────────────────────────────────────────────────┘  │
│                                    │                                        │
│                                    ▼                                        │
│  ┌─────────────────────────────────────────────────────────────────────┐  │
│  │  STAGE 5: PUBLISH                                                    │  │
│  │  ─────────────────────────────────────────────────────────────────── │  │
│  │  "Final report kahan bhejna hai?"                                    │  │
│  │  • Push validated data to Excel                                     │  │
│  │  • Publish to SharePoint                                            │  │
│  │  • Attach full audit trail                                          │  │
│  │  • Notify recipients                                                │  │
│  └─────────────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────────────┘`}
        />

        {/* 10 Stages Internal Pipeline HLD */}
        <CodeBlock 
          title="8.3 Internal Pipeline — 10 Stages"
          code={`┌─────────────────────────────────────────────────────────────────────────────┐
│                    INTERNAL PIPELINE — 10 STAGES                           │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐  │
│  │  STAGE 1: CONNECT                                                    │  │
│  │  ─────────────────────────────────────────────────────────────────── │  │
│  │  • Authenticate to source (Fabric/Power BI via msal)                │  │
│  │  • Connect to target warehouse (Snowflake/Databricks)               │  │
│  └─────────────────────────────────────────────────────────────────────┘  │
│                                    │                                        │
│                                    ▼                                        │
│  ┌─────────────────────────────────────────────────────────────────────┐  │
│  │  STAGE 2: EXTRACT                                                    │  │
│  │  ─────────────────────────────────────────────────────────────────── │  │
│  │  • Pull tables, relationships                                       │  │
│  │  • Extract DAX measure text from semantic model                    │  │
│  └─────────────────────────────────────────────────────────────────────┘  │
│                                    │                                        │
│                                    ▼                                        │
│  ┌─────────────────────────────────────────────────────────────────────┐  │
│  │  STAGE 3: PARSE DAX                                                  │  │
│  │  ─────────────────────────────────────────────────────────────────── │  │
│  │  • Tokenize each measure into AST                                   │  │
│  │  • Pattern matching                                                 │  │
│  └─────────────────────────────────────────────────────────────────────┘  │
│                                    │                                        │
│                                    ▼                                        │
│  ┌─────────────────────────────────────────────────────────────────────┐  │
│  │  STAGE 4: CLASSIFY                                                   │  │
│  │  ─────────────────────────────────────────────────────────────────── │  │
│  │  • Decide rule-based vs LLM conversion                              │  │
│  │  • Based on pattern confidence                                      │  │
│  └─────────────────────────────────────────────────────────────────────┘  │
│                                    │                                        │
│                                    ▼                                        │
│  ┌─────────────────────────────────────────────────────────────────────┐  │
│  │  STAGE 5: RULE CONVERT                                               │  │
│  │  ─────────────────────────────────────────────────────────────────── │  │
│  │  • Map recognized DAX patterns to SQL templates                    │  │
│  │  • SUM, CALCULATE, FILTER, DIVIDE                                  │  │
│  └─────────────────────────────────────────────────────────────────────┘  │
│                                    │                                        │
│                                    ▼                                        │
│  ┌─────────────────────────────────────────────────────────────────────┐  │
│  │  STAGE 6: LLM CONVERT                                                │  │
│  │  ─────────────────────────────────────────────────────────────────── │  │
│  │  • Send unmatched measures to LLM fallback                         │  │
│  │  • LangChain + Groq/OpenAI/Gemini                                  │  │
│  └─────────────────────────────────────────────────────────────────────┘  │
│                                    │                                        │
│                                    ▼                                        │
│  ┌─────────────────────────────────────────────────────────────────────┐  │
│  │  STAGE 7: DIALECT TRANSLATE                                          │  │
│  │  ─────────────────────────────────────────────────────────────────── │  │
│  │  • Transpile generic SQL to target dialect                         │  │
│  │  • sqlglot → Snowflake/Databricks SQL                              │  │
│  └─────────────────────────────────────────────────────────────────────┘  │
│                                    │                                        │
│                                    ▼                                        │
│  ┌─────────────────────────────────────────────────────────────────────┐  │
│  │  STAGE 8: VALIDATE                                                   │  │
│  │  ─────────────────────────────────────────────────────────────────── │  │
│  │  • Dry-run SQL in DuckDB                                            │  │
│  │  • Catch syntax/logic errors before deployment                     │  │
│  └─────────────────────────────────────────────────────────────────────┘  │
│                                    │                                        │
│                                    ▼                                        │
│  ┌─────────────────────────────────────────────────────────────────────┐  │
│  │  STAGE 9: REVIEW                                                     │  │
│  │  ─────────────────────────────────────────────────────────────────── │  │
│  │  • Human approval gate                                              │  │
│  │  • Analyst compares DAX vs generated SQL                           │  │
│  └─────────────────────────────────────────────────────────────────────┘  │
│                                    │                                        │
│                                    ▼                                        │
│  ┌─────────────────────────────────────────────────────────────────────┐  │
│  │  STAGE 10: EMIT                                                      │  │
│  │  ─────────────────────────────────────────────────────────────────── │  │
│  │  • Deploy approved SQL as view in Snowflake/Databricks             │  │
│  │  • Write audit entry                                                │  │
│  └─────────────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────────────┘`}
        />

        <h3 style={{ color: '#00BFA5', fontSize: '24px', margin: '60px 0 20px' }}>9. Low-Level Design (LLD)</h3>
        
        {/* LLDs */}
        <CodeBlock title="9.1 Database Schema" language="sql" code={`-- ──────────────────────────────────────────────────────────────────────────
-- PIPELINES TABLE
-- ──────────────────────────────────────────────────────────────────────────

CREATE TABLE pipelines (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    
    -- Connection & Data
    connection_id UUID REFERENCES connections(id) ON DELETE CASCADE,
    dataset_id UUID REFERENCES datasets(id) ON DELETE CASCADE,
    table_name VARCHAR(255),
    columns JSONB,
    
    -- Configuration
    metrics JSONB,
    dimensions JSONB,
    rules JSONB,
    filters JSONB,
    
    -- Schedule
    schedule VARCHAR(100),  -- Cron expression
    timezone VARCHAR(50) DEFAULT 'UTC',
    
    -- Alerts
    alert_recipients JSONB,
    alert_channels JSONB,  -- ['slack', 'email', 'teams']
    
    -- Versioning
    version VARCHAR(20) DEFAULT '1.0.0',
    status VARCHAR(50) DEFAULT 'draft',  -- draft, active, paused, archived
    
    -- Metadata
    tags JSONB,
    category VARCHAR(100),
    owner_id UUID REFERENCES users(id) ON DELETE CASCADE,
    
    -- Timestamps
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    last_run_at TIMESTAMP,
    next_run_at TIMESTAMP
);

-- ──────────────────────────────────────────────────────────────────────────
-- PIPELINE RUNS TABLE
-- ──────────────────────────────────────────────────────────────────────────

CREATE TABLE pipeline_runs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    pipeline_id UUID REFERENCES pipelines(id) ON DELETE CASCADE,
    version VARCHAR(20) NOT NULL,
    
    -- Status
    status VARCHAR(50) DEFAULT 'pending',  -- pending, running, success, failed, cancelled
    
    -- Stages
    current_stage INTEGER DEFAULT 0,
    progress_pct DECIMAL(5,2) DEFAULT 0.0,
    stage_details JSONB,
    
    -- Results
    rows_processed INTEGER,
    rows_validated INTEGER,
    rows_failed INTEGER,
    
    -- Timing
    started_at TIMESTAMP,
    completed_at TIMESTAMP,
    duration_ms INTEGER,
    
    -- Error
    error_message TEXT,
    error_details JSONB,
    
    -- Context
    triggered_by VARCHAR(255),
    triggered_by_type VARCHAR(50) DEFAULT 'manual',  -- manual, scheduled, dependency
    
    -- Audit
    before_snapshot_id UUID,
    after_snapshot_id UUID,
    
    created_at TIMESTAMP DEFAULT NOW()
);

-- ──────────────────────────────────────────────────────────────────────────
-- PIPELINE DEPENDENCIES TABLE
-- ──────────────────────────────────────────────────────────────────────────

CREATE TABLE pipeline_dependencies (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    pipeline_id UUID REFERENCES pipelines(id) ON DELETE CASCADE,
    depends_on UUID REFERENCES pipelines(id) ON DELETE CASCADE,
    
    -- Condition
    condition_type VARCHAR(50) DEFAULT 'success',  -- success, any, all
    timeout_minutes INTEGER DEFAULT 60,
    
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT NOW()
);

-- ──────────────────────────────────────────────────────────────────────────
-- PIPELINE APPROVALS TABLE
-- ──────────────────────────────────────────────────────────────────────────

CREATE TABLE pipeline_approvals (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    pipeline_id UUID REFERENCES pipelines(id) ON DELETE CASCADE,
    version VARCHAR(20) NOT NULL,
    
    -- Request
    requested_by UUID REFERENCES users(id),
    requested_at TIMESTAMP DEFAULT NOW(),
    change_summary TEXT,
    
    -- Approvers
    approver_chain JSONB,  -- [{user_id, role, status, comment, approved_at}]
    current_step INTEGER DEFAULT 0,
    
    -- Status
    status VARCHAR(50) DEFAULT 'pending',  -- pending, approved, rejected, cancelled
    timeout_days INTEGER DEFAULT 5,
    
    -- Resolution
    resolved_by UUID REFERENCES users(id),
    resolved_at TIMESTAMP,
    resolution_comment TEXT,
    
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- ──────────────────────────────────────────────────────────────────────────
-- PIPELINE SLA TABLE
-- ──────────────────────────────────────────────────────────────────────────

CREATE TABLE pipeline_sla (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    pipeline_id UUID REFERENCES pipelines(id) ON DELETE CASCADE,
    
    -- Targets
    target_duration_ms INTEGER,  -- Max allowed runtime
    target_completion_time VARCHAR(50),  -- e.g., '09:00:00'
    target_data_freshness VARCHAR(50),  -- e.g., '24h', '1h'
    
    -- Error thresholds
    max_error_rate DECIMAL(5,2),  -- 0.01 = 1%
    max_rows_failed INTEGER,
    
    -- Breach actions
    breach_action VARCHAR(50) DEFAULT 'alert',  -- alert, escalate, pause
    
    -- Tracking
    current_sla_breach_count INTEGER DEFAULT 0,
    last_breach_at TIMESTAMP,
    
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- ──────────────────────────────────────────────────────────────────────────
-- INDEXES
-- ──────────────────────────────────────────────────────────────────────────

CREATE INDEX idx_pipelines_status ON pipelines(status);
CREATE INDEX idx_pipelines_connection ON pipelines(connection_id);
CREATE INDEX idx_pipelines_dataset ON pipelines(dataset_id);
CREATE INDEX idx_pipelines_owner ON pipelines(owner_id);
CREATE INDEX idx_pipelines_category ON pipelines(category);
CREATE INDEX idx_pipelines_schedule ON pipelines(schedule);

CREATE INDEX idx_pipeline_runs_pipeline ON pipeline_runs(pipeline_id);
CREATE INDEX idx_pipeline_runs_status ON pipeline_runs(status);
CREATE INDEX idx_pipeline_runs_created ON pipeline_runs(created_at DESC);

CREATE INDEX idx_pipeline_deps_pipeline ON pipeline_dependencies(pipeline_id);
CREATE INDEX idx_pipeline_deps_depends ON pipeline_dependencies(depends_on);

CREATE INDEX idx_pipeline_approvals_pipeline ON pipeline_approvals(pipeline_id);
CREATE INDEX idx_pipeline_approvals_status ON pipeline_approvals(status);

CREATE INDEX idx_pipeline_sla_pipeline ON pipeline_sla(pipeline_id);`} />

        <CodeBlock title="9.2 Pydantic Models" language="python" code={`# src/datatrust/pipeline/models.py

from pydantic import BaseModel, Field, validator
from typing import Optional, List, Dict, Any
from enum import Enum
from datetime import datetime


class PipelineStatus(str, Enum):
    DRAFT = "draft"
    ACTIVE = "active"
    PAUSED = "paused"
    ARCHIVED = "archived"


class RunStatus(str, Enum):
    PENDING = "pending"
    RUNNING = "running"
    SUCCESS = "success"
    FAILED = "failed"
    CANCELLED = "cancelled"


class TriggerType(str, Enum):
    MANUAL = "manual"
    SCHEDULED = "scheduled"
    DEPENDENCY = "dependency"
    API = "api"


class PipelineCreate(BaseModel):
    name: str = Field(..., min_length=1, max_length=255)
    description: Optional[str] = None
    connection_id: str
    dataset_id: str
    table_name: str
    
    metrics: List[str]
    dimensions: Optional[List[str]] = []
    rules: Optional[List[str]] = []
    filters: Optional[List[Dict]] = []
    
    schedule: Optional[str] = None  # Cron expression
    timezone: str = "UTC"
    
    alert_recipients: Optional[List[str]] = []
    alert_channels: Optional[List[str]] = ["dashboard"]
    
    tags: Optional[List[str]] = []
    category: Optional[str] = None
    
    @validator('schedule')
    def validate_cron(cls, v):
        if v:
            # Validate cron expression
            import croniter
            try:
                croniter.croniter(v)
            except:
                raise ValueError(f"Invalid cron expression: {v}")
        return v


class PipelineResponse(BaseModel):
    id: str
    name: str
    description: Optional[str]
    connection_id: str
    dataset_id: str
    table_name: str
    metrics: List[str]
    dimensions: Optional[List[str]]
    rules: Optional[List[str]]
    schedule: Optional[str]
    status: PipelineStatus
    version: str
    tags: Optional[List[str]]
    category: Optional[str]
    owner_id: str
    created_at: datetime
    updated_at: datetime
    last_run_at: Optional[datetime]
    next_run_at: Optional[datetime]


class RunCreate(BaseModel):
    pipeline_id: str
    triggered_by: Optional[str] = None
    triggered_by_type: TriggerType = TriggerType.MANUAL


class RunResponse(BaseModel):
    id: str
    pipeline_id: str
    version: str
    status: RunStatus
    current_stage: int
    progress_pct: float
    rows_processed: Optional[int]
    started_at: Optional[datetime]
    completed_at: Optional[datetime]
    duration_ms: Optional[int]
    error_message: Optional[str]


class DependencyCreate(BaseModel):
    depends_on: str
    condition_type: str = "success"
    timeout_minutes: int = 60


class ApprovalCreate(BaseModel):
    approver_chain: List[Dict]  # [{user_id, role}]
    change_summary: str
    timeout_days: int = 5


class SLACreate(BaseModel):
    target_duration_ms: Optional[int] = None
    target_completion_time: Optional[str] = None
    target_data_freshness: Optional[str] = None
    max_error_rate: Optional[float] = None
    max_rows_failed: Optional[int] = None
    breach_action: str = "alert"`} />

        <CodeBlock title="9.3 API Endpoints" language="python" code={`# src/datatrust/api/routers/pipelines.py

from fastapi import APIRouter, Depends, HTTPException, BackgroundTasks
from sqlalchemy.orm import Session
from typing import List, Optional

from datatrust.db.session import get_db
from datatrust.db.models import User
from datatrust.security.auth import get_current_user
from datatrust.pipeline.engine import PipelineEngine
from datatrust.pipeline.models import *

router = APIRouter(prefix="/api/v1/pipelines", tags=["pipelines"])


@router.get("/", response_model=List[PipelineResponse])
async def list_pipelines(
    status: Optional[str] = None,
    category: Optional[str] = None,
    tag: Optional[str] = None,
    limit: int = 50,
    offset: int = 0,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """List all pipelines with filters."""
    query = db.query(Pipeline)
    
    if status:
        query = query.filter(Pipeline.status == status)
    if category:
        query = query.filter(Pipeline.category == category)
    if tag:
        query = query.filter(Pipeline.tags.contains([tag]))
    
    # Only show pipelines user has access to
    query = query.filter(Pipeline.owner_id == current_user.id)
    
    return query.order_by(Pipeline.created_at.desc()).limit(limit).offset(offset).all()


@router.post("/", response_model=PipelineResponse, status_code=201)
async def create_pipeline(
    payload: PipelineCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Create a new pipeline."""
    engine = PipelineEngine(db)
    return engine.create_pipeline(payload, current_user)


@router.get("/{pipeline_id}", response_model=PipelineResponse)
async def get_pipeline(
    pipeline_id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get pipeline details."""
    pipeline = db.query(Pipeline).filter(Pipeline.id == pipeline_id).first()
    if not pipeline:
        raise HTTPException(404, "Pipeline not found")
    
    # Check access
    if pipeline.owner_id != current_user.id:
        raise HTTPException(403, "Access denied")
    
    return pipeline


@router.put("/{pipeline_id}", response_model=PipelineResponse)
async def update_pipeline(
    pipeline_id: str,
    payload: PipelineCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Update pipeline configuration."""
    engine = PipelineEngine(db)
    return engine.update_pipeline(pipeline_id, payload, current_user)


@router.delete("/{pipeline_id}", status_code=204)
async def delete_pipeline(
    pipeline_id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Delete a pipeline."""
    pipeline = db.query(Pipeline).filter(Pipeline.id == pipeline_id).first()
    if not pipeline:
        raise HTTPException(404, "Pipeline not found")
    
    if pipeline.owner_id != current_user.id:
        raise HTTPException(403, "Access denied")
    
    db.delete(pipeline)
    db.commit()


@router.post("/{pipeline_id}/run", response_model=RunResponse)
async def trigger_run(
    pipeline_id: str,
    background_tasks: BackgroundTasks,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Trigger a pipeline run."""
    engine = PipelineEngine(db)
    run = await engine.trigger_run(
        pipeline_id=pipeline_id,
        triggered_by=current_user.email,
        background_tasks=background_tasks
    )
    return run


@router.get("/{pipeline_id}/runs", response_model=List[RunResponse])
async def get_runs(
    pipeline_id: str,
    limit: int = 50,
    offset: int = 0,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get pipeline run history."""
    runs = db.query(PipelineRun).filter(
        PipelineRun.pipeline_id == pipeline_id
    ).order_by(
        PipelineRun.created_at.desc()
    ).limit(limit).offset(offset).all()
    
    return runs


@router.post("/{pipeline_id}/dependencies", response_model=Dependency)
async def add_dependency(
    pipeline_id: str,
    payload: DependencyCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Add a dependency to a pipeline."""
    engine = PipelineEngine(db)
    return engine.add_dependency(pipeline_id, payload, current_user)


@router.post("/{pipeline_id}/approvals", response_model=Approval)
async def request_approval(
    pipeline_id: str,
    payload: ApprovalCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Request approval for pipeline changes."""
    engine = PipelineEngine(db)
    return engine.request_approval(pipeline_id, payload, current_user)


@router.post("/{pipeline_id}/approvals/{approval_id}/approve")
async def approve_pipeline(
    pipeline_id: str,
    approval_id: str,
    comment: Optional[str] = None,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Approve a pipeline change."""
    engine = PipelineEngine(db)
    return engine.approve_pipeline(approval_id, current_user, comment)


@router.get("/{pipeline_id}/impact")
async def get_impact_analysis(
    pipeline_id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get impact analysis for a pipeline."""
    engine = PipelineEngine(db)
    return engine.analyze_impact(pipeline_id, current_user)


@router.get("/{pipeline_id}/sla", response_model=SLADetails)
async def get_sla_details(
    pipeline_id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get SLA details for a pipeline."""
    sla = db.query(PipelineSLA).filter(
        PipelineSLA.pipeline_id == pipeline_id
    ).first()
    
    if not sla:
        raise HTTPException(404, "SLA not found")
    
    return sla`} />

        <CodeBlock title="4.4 Pipeline Engine Core" language="python" code={`# src/datatrust/pipeline/engine.py

import uuid
import time
import logging
from datetime import datetime, timedelta
from typing import Dict, Any, Optional, List
from sqlalchemy.orm import Session
from fastapi import BackgroundTasks

from datatrust.db.models import Pipeline, PipelineRun, PipelineSLA
from datatrust.pipeline.models import *
from datatrust.core.orchestrator import run_pipeline as orchestrator
from datatrust.audit.logger import AuditLogger
from datatrust.alerts.engine import AlertEngine

logger = logging.getLogger(__name__)


class PipelineEngine:
    """Core Pipeline Engine — Orchestrates everything."""

    def __init__(self, db: Session):
        self.db = db
        self.audit_logger = AuditLogger(db)
        self.alert_engine = AlertEngine(db)

    def create_pipeline(self, payload: PipelineCreate, user: User) -> Pipeline:
        """Create a new pipeline."""
        pipeline = Pipeline(
            id=str(uuid.uuid4()),
            name=payload.name,
            description=payload.description,
            connection_id=payload.connection_id,
            dataset_id=payload.dataset_id,
            table_name=payload.table_name,
            metrics=payload.metrics,
            dimensions=payload.dimensions or [],
            rules=payload.rules or [],
            filters=payload.filters or [],
            schedule=payload.schedule,
            timezone=payload.timezone,
            alert_recipients=payload.alert_recipients or [],
            alert_channels=payload.alert_channels or ["dashboard"],
            version="1.0.0",
            status="draft",
            tags=payload.tags or [],
            category=payload.category,
            owner_id=user.id,
            created_at=datetime.utcnow(),
            updated_at=datetime.utcnow()
        )
        
        self.db.add(pipeline)
        self.db.commit()
        self.db.refresh(pipeline)
        
        # Log to audit
        self.audit_logger.log_change(
            entity_type="pipeline",
            entity_id=str(pipeline.id),
            action="CREATE",
            changed_by=user.email,
            new_value={"name": pipeline.name, "status": pipeline.status}
        )
        
        logger.info(f"✅ Pipeline created: {pipeline.name} (ID: {pipeline.id[:8]})")
        return pipeline

    async def trigger_run(
        self,
        pipeline_id: str,
        triggered_by: str,
        background_tasks: BackgroundTasks
    ) -> PipelineRun:
        """Trigger a pipeline run."""
        pipeline = self.db.query(Pipeline).filter(
            Pipeline.id == pipeline_id
        ).first()
        
        if not pipeline:
            raise ValueError(f"Pipeline {pipeline_id} not found")
        
        # Create run record
        run = PipelineRun(
            id=str(uuid.uuid4()),
            pipeline_id=pipeline_id,
            version=pipeline.version,
            status="pending",
            current_stage=0,
            progress_pct=0.0,
            triggered_by=triggered_by,
            triggered_by_type="manual",
            started_at=datetime.utcnow(),
            created_at=datetime.utcnow()
        )
        
        self.db.add(run)
        self.db.commit()
        self.db.refresh(run)
        
        # Update pipeline
        pipeline.last_run_at = datetime.utcnow()
        self.db.commit()
        
        # Run in background
        background_tasks.add_task(
            self._execute_pipeline,
            run_id=str(run.id),
            pipeline_id=pipeline_id
        )
        
        logger.info(f"🚀 Pipeline run triggered: {run.id[:8]} for {pipeline.name}")
        return run

    async def _execute_pipeline(self, run_id: str, pipeline_id: str):
        """Execute pipeline in background."""
        start_time = time.time()
        
        try:
            # Update status to running
            run = self.db.query(PipelineRun).filter(
                PipelineRun.id == run_id
            ).first()
            run.status = "running"
            self.db.commit()
            
            # Get pipeline config
            pipeline = self.db.query(Pipeline).filter(
                Pipeline.id == pipeline_id
            ).first()
            
            # Create pipeline state
            from datatrust.core.pipeline_state import PipelineState
            state = PipelineState(
                run_id=run_id,
                connection_id=pipeline.connection_id,
                context={
                    "pipeline_id": pipeline_id,
                    "pipeline_name": pipeline.name,
                }
            )
            # ... (truncated)
`} />
      </div>
    </div>
  );
};

export default PipelineEngineDocs;
