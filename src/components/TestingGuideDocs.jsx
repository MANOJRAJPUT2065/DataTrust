import React, { useState } from 'react';
import { ArrowRight, RefreshCw, FileText, Settings, Shield, Zap, Search, Brain, Code } from './Icons';

export default function TestingGuideDocs() {
  const [activeTab, setActiveTab] = useState('semantic');

  const comparison = [
    { area: "Metrics Validation", semantic: "Check defined formulas & lineage", pipeline: "Track execution timeline status" },
    { area: "NLQ Parsing", semantic: "Test DAX-to-SQL compile accuracy", pipeline: "N/A (triggered via client Add-in)" },
    { area: "Ingestion & Sync", semantic: "View dataset column cache index", pipeline: "Run 10-stage execution logs" },
    { area: "Data Quality checks", semantic: "Verify metric constraints (SUM >= 0)", pipeline: "Flag rule violations in pipeline runs" },
    { area: "Audit Trail", semantic: "Track metric version updates", pipeline: "Log pipeline start, stop & duration details" },
  ];

  return (
    <div style={{ padding: '60px 0', background: '#0F172A', color: '#CBD5E1', fontFamily: '"Inter", sans-serif' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 20px' }}>
        
        {/* Header Section */}
        <div style={{ marginBottom: '50px' }}>
          <div style={{ display: 'inline-block', padding: '4px 12px', background: 'rgba(0, 191, 165, 0.1)', border: '1px solid rgba(0, 191, 165, 0.2)', borderRadius: '20px', color: '#00BFA5', fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '16px' }}>
            QA & Verification
          </div>
          <h2 style={{ color: '#fff', fontSize: '36px', fontWeight: '800', margin: '0 0 10px 0' }}>DataTrust Verification & Testing Guide</h2>
          <p style={{ color: '#94A3B8', fontSize: '18px', margin: 0, lineHeight: '1.6' }}>
            Comprehensive verification guide to validate the Semantic Layer compiler, Pipeline engine run-stages, and Data Quality rule violations.
          </p>
        </div>

        {/* Navigation Tabs */}
        <div style={{ display: 'flex', gap: '12px', marginBottom: '32px', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '12px' }}>
          <button
            onClick={() => setActiveTab('semantic')}
            style={{
              background: 'transparent',
              border: 'none',
              borderBottom: activeTab === 'semantic' ? '2px solid #00BFA5' : '2px solid transparent',
              color: activeTab === 'semantic' ? '#FFFFFF' : '#64748B',
              padding: '8px 16px',
              cursor: 'pointer',
              fontWeight: '700',
              fontSize: '14px',
              transition: 'all 0.2s'
            }}
          >
            🧠 1. Semantic & NLQ
          </button>
          <button
            onClick={() => setActiveTab('pipeline')}
            style={{
              background: 'transparent',
              border: 'none',
              borderBottom: activeTab === 'pipeline' ? '2px solid #00BFA5' : '2px solid transparent',
              color: activeTab === 'pipeline' ? '#FFFFFF' : '#64748B',
              padding: '8px 16px',
              cursor: 'pointer',
              fontWeight: '700',
              fontSize: '14px',
              transition: 'all 0.2s'
            }}
          >
            ⚙️ 2. Pipeline Runs
          </button>
          <button
            onClick={() => setActiveTab('quality')}
            style={{
              background: 'transparent',
              border: 'none',
              borderBottom: activeTab === 'quality' ? '2px solid #00BFA5' : '2px solid transparent',
              color: activeTab === 'quality' ? '#FFFFFF' : '#64748B',
              padding: '8px 16px',
              cursor: 'pointer',
              fontWeight: '700',
              fontSize: '14px',
              transition: 'all 0.2s'
            }}
          >
            🧪 3. Quality Engine
          </button>
        </div>

        {/* Tab Contents */}
        <div style={{ background: '#070C16', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '20px', padding: '40px', minHeight: '350px', boxShadow: '0 20px 40px rgba(0,0,0,0.3)', marginBottom: '40px' }}>
          
          {/* SEMANTIC TAB */}
          {activeTab === 'semantic' && (
            <div className="animate-fade">
              <h3 style={{ color: '#fff', fontSize: '22px', fontWeight: '700', marginTop: 0, marginBottom: '20px' }}>
                🧠 Semantic Layer & NLQ Testing Steps
              </h3>
              
              <h4 style={{ color: '#FFFFFF', fontSize: '15px', fontWeight: '700', marginTop: '20px', marginBottom: '12px' }}>1.1 Metrics Validation</h4>
              <p style={{ fontSize: '14px', color: '#94A3B8', lineHeight: '1.6' }}>
                Validate metric calculations and lineages directly from the Admin Console:
              </p>
              <ol style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '14px', lineHeight: '1.6', color: '#CBD5E1' }}>
                <li>Navigate to <strong>Semantic Layer &gt; Metrics</strong> in the console.</li>
                <li>Select any metric (e.g. <code>Revenue</code>) and click the <strong>Test</strong> button.</li>
                <li>Verify the output matches target aggregations.</li>
              </ol>
              <div style={{ background: '#0D1117', padding: '12px 16px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)', fontSize: '13px', fontFamily: 'monospace', color: '#00BFA5', margin: '12px 0' }}>
                Metric: Revenue | Value: ₹85.4 Cr | Lineage: FACT_TIMESERIES.total_revenue &rarr; SUM | Status: Validated
              </div>

              <h4 style={{ color: '#FFFFFF', fontSize: '15px', fontWeight: '700', marginTop: '24px', marginBottom: '12px' }}>1.2 Excel Add-in NLQ Query Verification</h4>
              <ol style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '14px', lineHeight: '1.6', color: '#CBD5E1' }}>
                <li>Open Excel and launch the DataTrust Taskpane Add-in.</li>
                <li>In the Natural Language Query input box, type: <code>"What was total revenue in January?"</code></li>
                <li>Check the parsed SQL translation and value returned.</li>
              </ol>
              <div style={{ background: '#0D1117', padding: '12px 16px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)', fontSize: '13px', fontFamily: 'monospace', color: '#6366F1', margin: '12px 0' }}>
                Question: "What was total revenue in January?"<br />
                Answer: ₹2,58,477.94 | SQL: SELECT SUM(total_revenue) FROM FACT_TIMESERIES WHERE MONTH(date)=1
              </div>
            </div>
          )}

          {/* PIPELINE TAB */}
          {activeTab === 'pipeline' && (
            <div className="animate-fade">
              <h3 style={{ color: '#fff', fontSize: '22px', fontWeight: '700', marginTop: 0, marginBottom: '20px' }}>
                ⚙️ Pipeline Engine Verification Steps
              </h3>
              
              <h4 style={{ color: '#FFFFFF', fontSize: '15px', fontWeight: '700', marginTop: '20px', marginBottom: '12px' }}>2.1 Pipeline Orchestration Run</h4>
              <p style={{ fontSize: '14px', color: '#94A3B8', lineHeight: '1.6' }}>
                Trigger and verify the 10-stage execution pipeline from the Admin Dashboard:
              </p>
              <ol style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '14px', lineHeight: '1.6', color: '#CBD5E1' }}>
                <li>Go to <strong>Pipelines</strong> &gt; select any active pipeline (e.g. <code>"Daily Sales Refresh"</code>).</li>
                <li>Click <strong>Run Pipeline</strong> to start the systematic execution.</li>
                <li>Verify all 10 stages successfully execute:</li>
              </ol>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px', background: '#0D1117', padding: '16px', borderRadius: '8px', margin: '12px 0', fontSize: '12px', fontFamily: 'monospace', color: '#10B981' }}>
                <div>Stage 1: Connect &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;✅ Success</div>
                <div>Stage 2: Extract &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;✅ Success</div>
                <div>Stage 3: Parse DAX &nbsp;&nbsp;&nbsp;&nbsp;✅ Success</div>
                <div>Stage 4: Classify &nbsp;&nbsp;&nbsp;&nbsp;✅ Success</div>
                <div>Stage 5: Rule Convert &nbsp;✅ Success</div>
                <div>Stage 6: LLM Convert &nbsp;&nbsp;✅ Success</div>
                <div>Stage 7: Dialect &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;✅ Success</div>
                <div>Stage 8: Validate &nbsp;&nbsp;&nbsp;&nbsp;✅ Success</div>
                <div>Stage 9: Review &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;✅ Success</div>
                <div>Stage 10: Emit &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;✅ Success</div>
              </div>
            </div>
          )}

          {/* QUALITY TAB */}
          {activeTab === 'quality' && (
            <div className="animate-fade">
              <h3 style={{ color: '#fff', fontSize: '22px', fontWeight: '700', marginTop: 0, marginBottom: '20px' }}>
                🧪 Quality Engine & Dashboard Testing
              </h3>
              
              <h4 style={{ color: '#FFFFFF', fontSize: '15px', fontWeight: '700', marginTop: '20px', marginBottom: '12px' }}>3.1 Quality Scores and Health Metrics</h4>
              <ol style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '14px', lineHeight: '1.6', color: '#CBD5E1' }}>
                <li>Navigate to <strong>Quality Engine &gt; Dashboard</strong>.</li>
                <li>Verify the computed Quality Score for ingestion datasets is above SLA constraints.</li>
              </ol>
              <div style={{ background: '#0D1117', padding: '12px 16px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)', fontSize: '13px', fontFamily: 'monospace', color: '#10B981', margin: '12px 0' }}>
                Dataset: FACT_TIMESERIES | Quality Score: 98.5% | Rules: 31 | Violations: 151 | Status: Healthy
              </div>

              <h4 style={{ color: '#FFFFFF', fontSize: '15px', fontWeight: '700', marginTop: '24px', marginBottom: '12px' }}>3.2 Rule Violation Audit</h4>
              <ol style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '14px', lineHeight: '1.6', color: '#CBD5E1' }}>
                <li>Go to <strong>Quality Engine &gt; Violations</strong>.</li>
                <li>Inspect active violation records (e.g. <code>VIO00001</code>) and ensure they log details properly.</li>
              </ol>
              <div style={{ background: '#0D1117', padding: '12px 16px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)', fontSize: '13px', fontFamily: 'monospace', color: '#EF4444', margin: '12px 0' }}>
                Violation ID: VIO00001 | Rule: Invalid Order Status | Column: orderStatus | Value: Shipped | Status: Open
              </div>
            </div>
          )}

        </div>

        {/* Comparison Table */}
        <h3 style={{ color: '#fff', fontSize: '20px', fontWeight: '700', marginBottom: '20px' }}>
          📊 Semantic Layer vs Pipeline Run testing scope
        </h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', background: '#070C16', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '12px', overflow: 'hidden' }}>
          <thead>
            <tr style={{ background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              <th style={{ padding: '14px 18px', textAlign: 'left', fontSize: '13px', color: '#FFFFFF', fontWeight: '700' }}>Feature Area</th>
              <th style={{ padding: '14px 18px', textAlign: 'left', fontSize: '13px', color: '#00BFA5', fontWeight: '700' }}>Semantic Layer Testing</th>
              <th style={{ padding: '14px 18px', textAlign: 'left', fontSize: '13px', color: '#6366F1', fontWeight: '700' }}>Pipeline Run Testing</th>
            </tr>
          </thead>
          <tbody>
            {comparison.map((c, idx) => (
              <tr key={idx} style={{ borderBottom: idx === comparison.length - 1 ? 'none' : '1px solid rgba(255,255,255,0.05)' }}>
                <td style={{ padding: '14px 18px', fontSize: '13px', color: '#FFFFFF', fontWeight: '600' }}>{c.area}</td>
                <td style={{ padding: '14px 18px', fontSize: '13px', color: '#94A3B8' }}>{c.semantic}</td>
                <td style={{ padding: '14px 18px', fontSize: '13px', color: '#94A3B8' }}>{c.pipeline}</td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>
    </div>
  );
}
