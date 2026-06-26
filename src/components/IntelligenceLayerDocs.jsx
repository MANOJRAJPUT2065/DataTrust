import React from 'react';
import CodeBlock from './CodeBlock';
import { lldData } from './IntelligenceLLDData';

const hldFlows = [
  {
    title: '1. AI Rule Inference V2 — Flow Architecture',
    tech: 'pandas, numpy, scikit-learn, xgboost, scipy, custom_rule_engine',
    color: '#00BFA5',
    steps: [
      { title: 'INPUT: Historical Data', items: ['Sales transactions (12 months)', 'Customer data', 'Financial data'] },
      { title: 'PROCESS: Pattern Detection', items: ['Statistical analysis', 'Correlation analysis', 'Temporal patterns', 'ML models (Isolation Forest, XGBoost)'] },
      { title: 'OUTPUT: Inferred Rules', items: ['Revenue >= 0 (99% Conf)', 'Revenue BETWEEN 100 AND 500 (85% Conf)', 'Revenue = Units × Price (92% Conf)'] },
      { title: 'USER ACTION: Review & Accept', items: ['User sees proposed rules', 'Accept / Reject / Modify', 'Rules go live instantly'] }
    ]
  },
  {
    title: '2. Predictive Quality Engine — Flow Architecture',
    tech: 'prophet, statsmodels, tensorflow/pytorch, scikit-learn, pandas',
    color: '#6366F1',
    steps: [
      { title: 'INPUT: Historical Data + Real-time Stream', items: ['Daily revenue (2 years)', 'Weekly sales', 'Monthly trends'] },
      { title: 'PROCESS: Time-Series Forecasting', items: ['Prophet (Trend + Seasonality)', 'ARIMA (Statistical)', 'LSTM (Deep learning)', 'Ensemble Modeling'] },
      { title: 'OUTPUT: Prediction + Risk Score', items: ['Predicted Revenue: ₹9.5 Cr', 'Risk Score: 87% (High)', 'Confidence: 92%', 'Expected deviation: 40% drop'] },
      { title: 'ALERT: 24 Hours Before Issue', items: ['"Revenue may drop 40% tomorrow"', 'Sent to: CFO, Finance Head', 'Recommended Action attached'] }
    ]
  },
  {
    title: '3. Auto-Correction Engine V2 — Flow Architecture',
    tech: 'pandas, langchain, sqlalchemy, custom_fix_engine, audit_logger',
    color: '#F59E0B',
    steps: [
      { title: 'INPUT: Data Quality Issue', items: ['42 duplicate rows in Store 42', 'Revenue 40% higher than expected'] },
      { title: 'PROCESS: Root Cause Analysis', items: ['Identify duplicates → 42 rows', 'Determine pattern → ETL job ran twice', 'Calculate impact → ₹2.5 Cr overstated'] },
      { title: 'PROCESS: Fix Strategy', items: ['Rule-based: Remove duplicates', 'LLM-based: Complex fixes (LangChain)', 'Validation: Re-run quality checks'] },
      { title: 'OUTPUT: Corrected Data', items: ['42 rows removed', 'Revenue corrected: ₹87.5 Cr → ₹85.0 Cr', 'All rules pass ✅'] },
      { title: 'AUDIT: Log Everything', items: ['What was fixed? → 42 duplicates', 'Who fixed it? → System (Auto)', 'Can rollback? → Yes'] }
    ]
  },
  {
    title: '4. Natural Language Query (NLQ) → SQL Engine — Flow Architecture',
    tech: 'langchain, langchain-groq, pgvector, openai, snowflake-connector, quality_engine',
    color: '#EC4899',
    steps: [
      { title: 'INPUT: User Question', items: ['"What was Q4 Revenue for West region?"'] },
      { title: 'STEP 1: Embedding', items: ['Convert question to vector', 'OpenAI text-embedding-3-small', 'Dimension: 1536'] },
      { title: 'STEP 2: Semantic Search (pgvector)', items: ['Find relevant metrics via vector similarity', 'Revenue → 95% match', 'Region dimension → 92% match'] },
      { title: 'STEP 3: LLM Translation', items: ['LangChain + Groq', 'Convert to SQL: SELECT SUM(revenue)...'] },
      { title: 'STEP 4: SQL Validation', items: ['Quality Engine validates SQL', 'Checks against governance rules', 'Passes ✅'] },
      { title: 'STEP 5: Execute & Return', items: ['Run SQL on Snowflake', 'Result: ₹85.4 Cr', 'Time: < 2 seconds'] }
    ]
  }
];

export default function IntelligenceLayerDocs() {
  return (
    <div style={{ padding: '60px 0', background: '#0F172A', color: '#CBD5E1' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 20px' }}>
        
        {/* Header */}
        <div style={{ marginBottom: '50px' }}>
          <div style={{ display: 'inline-block', padding: '4px 12px', background: 'rgba(99, 102, 241, 0.1)', border: '1px solid rgba(99, 102, 241, 0.2)', borderRadius: '20px', color: '#818CF8', fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '16px' }}>
            Intelligence Layer V3.0
          </div>
          <h2 style={{ color: '#fff', fontSize: '36px', fontWeight: '800', margin: '0 0 10px 0' }}>AI & Intelligence Layer</h2>
          <p style={{ color: '#94A3B8', fontSize: '18px', margin: 0, lineHeight: '1.6' }}>
            AI-first intelligence layer featuring predictive data quality, natural language querying, self-learning rule inference, auto-correction engines, and auto-documentation.
          </p>
        </div>

        {/* ─── HLD SECTION ─────────────────────────────────────────── */}
        <h3 style={{ color: '#818CF8', fontSize: '24px', margin: '40px 0 20px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '20px' }}>🔮</span> 1. High-Level Design (HLD)
        </h3>

        {/* ASCII HLD Box */}
        <div style={{ background: '#090D1A', border: '1px solid rgba(99,102,241,0.2)', borderRadius: '12px', padding: '24px', overflowX: 'auto', marginBottom: '40px', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}>
          <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#EF4444' }}></div>
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#F59E0B' }}></div>
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#10B981' }}></div>
            <span style={{ fontSize: '11px', color: '#64748B', fontFamily: 'monospace', marginLeft: '10px' }}>intelligence_layer_hld.ascii</span>
          </div>
          <pre style={{ margin: 0, color: '#818CF8', fontSize: '12px', fontFamily: 'var(--font-mono, monospace)', lineHeight: '1.4' }}>{`┌─────────────────────────────────────────────────────────────────────────────┐
│                    AI & AUTOMATION LAYER — COMPLETE HLD                     │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌───────────────────────────────────────────────────────────────────────┐  │
│  │  INPUT LAYER                                                          │  │
│  │  • Historical Data (12+ Months)  • Real-Time Streams  • Metadata      │  │
│  └───────────────────────────────────────────────────────────────────────┘  │
│                                      │                                      │
│                                      ▼                                      │
│  ┌───────────────────────────────────────────────────────────────────────┐  │
│  │  AI PROCESSING ENGINE                                                 │  │
│  │  ┌──────────────────────────────────────────────────────────────────┐ │  │
│  │  │  1. AI RULE INFERENCE V2 (Self-Learning)                         │ │  │
│  │  │     • Statistical Analysis (Mean, Std, Percentiles)              │ │  │
│  │  │     • Correlation (Revenue = Units × Price), Temporal Patterns   │ │  │
│  │  └──────────────────────────────────────────────────────────────────┘ │  │
│  │  ┌──────────────────────────────────────────────────────────────────┐ │  │
│  │  │  2. PREDICTIVE QUALITY ENGINE (Prophet + XGBoost + Isolation For)│ │  │
│  │  │     • Time-Series Forecasting, Anomaly Risk Scoring (0.0 → 1.0)  │ │  │
│  │  └──────────────────────────────────────────────────────────────────┘ │  │
│  │  ┌──────────────────────────────────────────────────────────────────┐ │  │
│  │  │  3. AUTO-CORRECTION V2 (Zero-Touch Fix)                          │ │  │
│  │  │     • Root Cause Analysis, LangChain Strategy, Rollback Auditing │ │  │
│  │  └──────────────────────────────────────────────────────────────────┘ │  │
│  │  ┌──────────────────────────────────────────────────────────────────┐ │  │
│  │  │  4. AUTO-DOCUMENTATION (LLM-Generated)                            │ │  │
│  │  │     • LangChain + Groq context-aware schema summaries            │ │  │
│  │  └──────────────────────────────────────────────────────────────────┘ │  │
│  │  ┌──────────────────────────────────────────────────────────────────┐ │  │
│  │  │  5. AI RECOMMENDATIONS (Pattern Matching)                         │ │  │
│  │  │     • Collaborative Filtering & user suggestion guidance         │ │  │
│  │  └──────────────────────────────────────────────────────────────────┘ │  │
│  └───────────────────────────────────────────────────────────────────────┘  │
│                                      │                                      │
│                                      ▼                                      │
│  ┌───────────────────────────────────────────────────────────────────────┐  │
│  │  OUTPUT LAYER                                                         │  │
│  │  • Inferred Rules  • Predictive Alerts  • Auto-Fixes  • Generated Docs│  │
│  └───────────────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────────────┘`}</pre>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '80px' }}>
          {/* HLD Section */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '80px' }}>
            {hldFlows.map((flow, idx) => (
              <div key={idx} className="scroll-reveal fade-up">
                <div style={{ marginBottom: '32px' }}>
                  <h3 style={{ color: flow.color, fontSize: '24px', marginBottom: '12px' }}>{flow.title}</h3>
                  <p style={{ color: '#94A3B8', fontSize: '13px', margin: 0, background: 'rgba(255,255,255,0.03)', padding: '10px 16px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)', display: 'inline-block' }}>
                    <span style={{ color: '#F8FAFC', fontWeight: '700' }}>TECH STACK:</span> {flow.tech}
                  </p>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
                  {flow.steps.map((step, i) => (
                    <React.Fragment key={i}>
                      <div style={{ width: '100%', background: '#1E293B', border: `1px solid ${flow.color}40`, borderRadius: '16px', padding: '24px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', position: 'relative', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.2)' }}>
                        <div style={{ position: 'absolute', top: 0, left: 0, width: '4px', height: '100%', background: flow.color }}></div>
                        
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                          <span style={{ fontSize: '13px', fontWeight: '800', color: flow.color, background: `${flow.color}15`, padding: '6px 10px', borderRadius: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{step.title.split(':')[0]}</span>
                          {step.title.includes(':') && (
                            <h4 style={{ fontSize: '16px', fontWeight: '700', color: '#F8FAFC', margin: 0 }}>{step.title.split(':')[1].trim()}</h4>
                          )}
                        </div>

                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                          {step.items.map((item, j) => (
                            <div key={j} style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.05)', padding: '10px 18px', borderRadius: '8px', fontSize: '14px', color: '#CBD5E1', fontWeight: '500' }}>
                              <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: flow.color }}></div>
                              {item}
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      {i < flow.steps.length - 1 && (
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', height: '30px' }}>
                          <div style={{ width: '2px', height: '10px', background: `linear-gradient(to bottom, ${flow.color}80, ${flow.color}20)` }}></div>
                          <div style={{ width: '12px', height: '12px', borderRadius: '50%', border: `2px solid ${flow.color}`, background: '#0F172A', boxShadow: `0 0 10px ${flow.color}40` }}></div>
                          <div style={{ width: '2px', height: '10px', background: `linear-gradient(to bottom, ${flow.color}20, ${flow.color}80)` }}></div>
                        </div>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <hr style={{ border: 'none', borderTop: '1px solid rgba(255,255,255,0.1)', margin: '40px 0' }} />

          {/* LLD Section */}
          <div className="scroll-reveal fade-up visible">
            <h3 style={{ color: '#fff', fontSize: '28px', marginBottom: '40px' }}>Low-Level Design (LLD) Specifications</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '60px' }}>
              {lldData.map((section, idx) => (
                <div key={idx} style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '16px', padding: '32px' }}>
                  <h4 style={{ color: '#F8FAFC', fontSize: '22px', marginBottom: '32px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '16px' }}>{section.title}</h4>
                  
                  {section.blocks.map((block, bIdx) => (
                    <CodeBlock 
                      key={bIdx}
                      title={block.title}
                      language={block.language}
                      code={block.code}
                    />
                  ))}
                </div>
              ))}
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}
