import React, { useState } from 'react';
import { ArrowRight, RefreshCw, FileText, Settings, Shield, Zap, Search, Brain, Code } from './Icons';

export default function ModelTrainingDocs() {
  const [activeTab, setActiveTab] = useState('matrix'); // 'matrix' | 'strategies' | 'pipeline'
  const [pipelineStep, setPipelineStep] = useState(1);

  const matrixData = [
    {
      feature: "NLQ → SQL Translation",
      model: "DeepSeek-Coder-6.7B / CodeLlama",
      tuning: "QLoRA / PEFT (LoRA)",
      freq: "Quarterly or on major schema changes",
      reqs: "100–500 domain question-SQL pairs",
      status: "Fine-Tuning",
      color: "#00BFA5"
    },
    {
      feature: "Predictive Quality Engine",
      model: "Meta Prophet + OLS Fallback",
      tuning: "Statistical Parameter Fitting",
      freq: "Weekly / Monthly",
      reqs: "90+ days of metric sequences",
      status: "Fitting",
      color: "#6366F1"
    },
    {
      feature: "AI Rule Inference V2",
      model: "Isolation Forest + XGBoost",
      tuning: "Pattern Learning",
      freq: "On-demand / Schema changes",
      reqs: "12+ months of profiling history",
      status: "Fitting",
      color: "#F59E0B"
    },
    {
      feature: "Auto-Correction V2",
      model: "LangChain + Groq LLM",
      tuning: "Supervised LoRA Tuning",
      freq: "Quarterly",
      reqs: "Pre/post override logs & overrides",
      status: "Fine-Tuning",
      color: "#EC4899"
    },
    {
      feature: "Semantic Search RAG",
      model: "pgvector + OpenAI Embeddings",
      tuning: "Pre-trained (No tuning required)",
      freq: "Never (Real-time Indexing)",
      reqs: "Schema metadata descriptions",
      status: "Pre-trained",
      color: "#10B981"
    },
    {
      feature: "Anomaly Detection",
      model: "Isolation Forest (scikit-learn)",
      tuning: "ML Parameter Fitting",
      freq: "Monthly",
      reqs: "Batch dataset rows",
      status: "Fitting",
      color: "#3B82F6"
    }
  ];

  const pipelineSteps = [
    {
      step: 1,
      title: "Data Prep & Ingestion",
      desc: "Ingests raw database logs, schema metadata, and historical query sequences from Snowflake/Databricks.",
      details: "Cleans null records, flags corrupt training pairs, and maps semantic targets."
    },
    {
      step: 2,
      title: "Feature Extraction",
      desc: "Tokenizes schema strings and extracts statistical variables like mean, variance, and anomaly flags.",
      details: "Formats target question-SQL pairs into QLoRA chat prompt structures."
    },
    {
      step: 3,
      title: "Model Fitting & LoRA",
      desc: "Executes QLoRA gradient descent (for LLMs) or fits statistical parameters (Prophet/Isolation Forest).",
      details: "LLM LoRA adapter weights are isolated to keep memory footprints low (< 100MB)."
    },
    {
      step: 4,
      title: "Validation Thresholds",
      desc: "Runs automated checks comparing predicted metrics (RMSE / BLEU score) against target benchmarks.",
      details: "Must pass > 90% accuracy threshold to proceed to deployment; else triggers fallback."
    },
    {
      step: 5,
      title: "Inference Deployment",
      desc: "Publishes target model adapters or parameter weights to the live DataTrust inference engine.",
      details: "Updates configuration values on the server without restarting the application."
    }
  ];

  return (
    <div style={{ padding: '60px 0', background: '#0F172A', color: '#CBD5E1', fontFamily: '"Inter", sans-serif' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 20px' }}>
        
        {/* Header Section */}
        <div style={{ marginBottom: '50px' }}>
          <div style={{ display: 'inline-block', padding: '4px 12px', background: 'rgba(0, 191, 165, 0.1)', border: '1px solid rgba(0, 191, 165, 0.2)', borderRadius: '20px', color: '#00BFA5', fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '16px' }}>
            Model Training & MLOps
          </div>
          <h2 style={{ color: '#fff', fontSize: '36px', fontWeight: '800', margin: '0 0 10px 0' }}>AI Model Training & Fine-Tuning</h2>
          <p style={{ color: '#94A3B8', fontSize: '18px', margin: 0, lineHeight: '1.6' }}>
            Targeted retraining strategies, parameter-efficient LoRA fine-tuning schedules, and automated verification loops.
          </p>
        </div>

        {/* Navigation Tabs */}
        <div style={{ display: 'flex', gap: '12px', marginBottom: '32px', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '12px' }}>
          <button
            onClick={() => setActiveTab('matrix')}
            style={{
              background: 'transparent',
              border: 'none',
              borderBottom: activeTab === 'matrix' ? '2px solid #00BFA5' : '2px solid transparent',
              color: activeTab === 'matrix' ? '#FFFFFF' : '#64748B',
              padding: '8px 16px',
              cursor: 'pointer',
              fontWeight: '700',
              fontSize: '14px',
              transition: 'all 0.2s'
            }}
          >
            📋 Training Matrix
          </button>
          <button
            onClick={() => setActiveTab('strategies')}
            style={{
              background: 'transparent',
              border: 'none',
              borderBottom: activeTab === 'strategies' ? '2px solid #00BFA5' : '2px solid transparent',
              color: activeTab === 'strategies' ? '#FFFFFF' : '#64748B',
              padding: '8px 16px',
              cursor: 'pointer',
              fontWeight: '700',
              fontSize: '14px',
              transition: 'all 0.2s'
            }}
          >
            🔍 Tuning Strategies
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
            ⚙️ MLOps Pipeline
          </button>
        </div>

        {/* Content Box */}
        <div style={{ background: '#070C16', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '20px', padding: '40px', minHeight: '400px', boxShadow: '0 20px 40px rgba(0,0,0,0.3)', marginBottom: '40px' }}>
          
          {/* TAB 1: REQUIREMENTS MATRIX */}
          {activeTab === 'matrix' && (
            <div className="animate-fade">
              <h3 style={{ color: '#fff', fontSize: '22px', fontWeight: '700', marginTop: 0, marginBottom: '20px' }}>
                📋 AI Training Requirements Matrix
              </h3>
              <p style={{ lineHeight: '1.6', color: '#94A3B8', fontSize: '14px', marginBottom: '24px' }}>
                DataTrust avoids full model pre-training. Instead, it utilizes parameter-efficient fine-tuning (PEFT/LoRA) and localized statistical fitting to rapidly align generic AI architectures with client schemas.
              </p>

              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '700px' }}>
                  <thead>
                    <tr style={{ borderBottom: '2px solid rgba(255,255,255,0.08)' }}>
                      <th style={{ padding: '12px', fontSize: '13px', fontWeight: '700', color: '#94A3B8', textTransform: 'uppercase' }}>AI Feature</th>
                      <th style={{ padding: '12px', fontSize: '13px', fontWeight: '700', color: '#94A3B8', textTransform: 'uppercase' }}>Model / Backend</th>
                      <th style={{ padding: '12px', fontSize: '13px', fontWeight: '700', color: '#94A3B8', textTransform: 'uppercase' }}>Fitting Method</th>
                      <th style={{ padding: '12px', fontSize: '13px', fontWeight: '700', color: '#94A3B8', textTransform: 'uppercase' }}>Target Frequency</th>
                      <th style={{ padding: '12px', fontSize: '13px', fontWeight: '700', color: '#94A3B8', textTransform: 'uppercase' }}>Data Requirements</th>
                    </tr>
                  </thead>
                  <tbody>
                    {matrixData.map((row, i) => (
                      <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)', transition: 'background 0.2s' }} className="hover-row">
                        <td style={{ padding: '16px 12px', fontWeight: '700', color: '#FFF', display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: row.color }} />
                          {row.feature}
                        </td>
                        <td style={{ padding: '16px 12px', fontSize: '13px', color: '#CBD5E1', fontFamily: 'monospace' }}>{row.model}</td>
                        <td style={{ padding: '16px 12px' }}>
                          <span style={{
                            fontSize: '11px',
                            fontWeight: '700',
                            padding: '3px 8px',
                            borderRadius: '6px',
                            background: row.status === 'Fine-Tuning' ? 'rgba(99,102,241,0.15)' : row.status === 'Fitting' ? 'rgba(245,158,11,0.15)' : 'rgba(16,185,129,0.15)',
                            color: row.status === 'Fine-Tuning' ? '#818CF8' : row.status === 'Fitting' ? '#F59E0B' : '#10B981',
                            border: `1px solid ${row.status === 'Fine-Tuning' ? 'rgba(99,102,241,0.3)' : row.status === 'Fitting' ? 'rgba(245,158,11,0.3)' : 'rgba(16,185,129,0.3)'}`
                          }}>
                            {row.tuning}
                          </span>
                        </td>
                        <td style={{ padding: '16px 12px', fontSize: '13px', color: '#94A3B8' }}>{row.freq}</td>
                        <td style={{ padding: '16px 12px', fontSize: '13px', color: '#94A3B8' }}>{row.reqs}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 2: TUNING STRATEGIES */}
          {activeTab === 'strategies' && (
            <div className="animate-fade">
              <h3 style={{ color: '#fff', fontSize: '22px', fontWeight: '700', marginTop: 0, marginBottom: '20px' }}>
                🔍 Feature-Specific Tuning Strategies
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                
                <div style={{ background: '#0A0F1D', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '16px', padding: '24px' }}>
                  <h4 style={{ color: '#FFF', fontSize: '17px', fontWeight: '700', marginTop: 0, marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ color: '#00BFA5' }}>🧠</span> 1. NLQ → SQL Translation Engine
                  </h4>
                  <p style={{ fontSize: '14px', color: '#94A3B8', lineHeight: '1.6', margin: '0 0 16px 0' }}>
                    Bridging user queries to complex custom schemas requires fine-tuning. Pre-trained coding models fail on custom table abbreviations, column contexts, and enterprise metric logic.
                  </p>
                  <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px', color: '#CBD5E1', margin: 0 }}>
                    <li><strong>Base model:</strong> DeepSeek-Coder-6.7B or CodeLlama configurations.</li>
                    <li><strong>Tuning approach:</strong> Parameter-efficient QLoRA. Keeps training weights small (isolated adapter files &lt; 100MB).</li>
                    <li><strong>Domain dataset:</strong> 100 to 500 hand-crafted query-to-SQL pairs mapping semantic database columns.</li>
                    <li><strong>Execution:</strong> RETRAIN pipeline runs locally within client infrastructure to prevent data leakage.</li>
                  </ul>
                </div>

                <div style={{ background: '#0A0F1D', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '16px', padding: '24px' }}>
                  <h4 style={{ color: '#FFF', fontSize: '17px', fontWeight: '700', marginTop: 0, marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ color: '#6366F1' }}>🔮</span> 2. Predictive Quality Engine
                  </h4>
                  <p style={{ fontSize: '14px', color: '#94A3B8', lineHeight: '1.6', margin: '0 0 16px 0' }}>
                    Calculates metric trajectories and quality health trends to flag anomalies 24 hours before they manifest in reports.
                  </p>
                  <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px', color: '#CBD5E1', margin: 0 }}>
                    <li><strong>Algorithm backend:</strong> Meta Prophet combined with OLS (Ordinary Least Squares) linear trend fallbacks.</li>
                    <li><strong>Dataset constraints:</strong> 90+ days of metric sequences (minimum 7 points for basic trend fitting).</li>
                    <li><strong>Optimization fit:</strong> Extremely fast parameter extraction loop (`Prophet.fit()`) completing in under 30 seconds.</li>
                  </ul>
                </div>

                <div style={{ background: '#0A0F1D', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '16px', padding: '24px' }}>
                  <h4 style={{ color: '#FFF', fontSize: '17px', fontWeight: '700', marginTop: 0, marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ color: '#F59E0B' }}>🪄</span> 3. Auto-Correction V2
                  </h4>
                  <p style={{ fontSize: '14px', color: '#94A3B8', lineHeight: '1.6', margin: '0 0 16px 0' }}>
                    Learns regular correction workflows from system overrides, resolving duplicate entries, format drift, and schema mismatch issues automatically.
                  </p>
                  <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px', color: '#CBD5E1', margin: 0 }}>
                    <li><strong>Method:</strong> Supervised adapter fine-tuning on transaction repair logs.</li>
                    <li><strong>Data sources:</strong> Snapshot archives mapping historical anomalies to manual repair updates and CFO overrides.</li>
                    <li><strong>Frequency:</strong> Re-trained quarterly to assimilate new business exception guidelines.</li>
                  </ul>
                </div>

              </div>
            </div>
          )}

          {/* TAB 3: MLOPS PIPELINE */}
          {activeTab === 'pipeline' && (
            <div className="animate-fade">
              <h3 style={{ color: '#fff', fontSize: '22px', fontWeight: '700', marginTop: 0, marginBottom: '20px' }}>
                ⚙️ DataTrust MLOps Training Pipeline
              </h3>
              <p style={{ lineHeight: '1.6', color: '#94A3B8', fontSize: '14px', marginBottom: '32px' }}>
                Click through the pipeline stages below to view how model parameters are updated, validated, and hot-deployed.
              </p>

              {/* Pipeline Interactive SVG Flowchart */}
              <div style={{ background: '#090E17', padding: '30px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)', marginBottom: '32px', display: 'flex', justifyContent: 'center' }}>
                <svg width="780" height="120" viewBox="0 0 780 120" style={{ maxWidth: '100%' }}>
                  {/* Step 1: Raw Data */}
                  <g style={{ cursor: 'pointer' }} onClick={() => setPipelineStep(1)}>
                    <rect x="10" y="20" width="120" height="60" rx="8" fill={pipelineStep === 1 ? '#00BFA5' : '#1E293B'} stroke={pipelineStep === 1 ? '#fff' : 'rgba(255,255,255,0.1)'} strokeWidth="1.5" />
                    <text x="70" y="55" fill={pipelineStep === 1 ? '#090F16' : '#E2E8F0'} fontSize="11" fontWeight="bold" textAnchor="middle">1. Raw Data</text>
                  </g>
                  
                  {/* Link 1-2 */}
                  <line x1="130" y1="50" x2="170" y2="50" stroke={pipelineStep > 1 ? '#00BFA5' : 'rgba(255,255,255,0.1)'} strokeWidth="2" strokeDasharray={pipelineStep === 1 ? "4,4" : "0"} />
                  <polygon points="170,50 162,45 162,55" fill={pipelineStep > 1 ? '#00BFA5' : 'rgba(255,255,255,0.1)'} />

                  {/* Step 2: Prep & Extract */}
                  <g style={{ cursor: 'pointer' }} onClick={() => setPipelineStep(2)}>
                    <rect x="170" y="20" width="120" height="60" rx="8" fill={pipelineStep === 2 ? '#6366F1' : '#1E293B'} stroke={pipelineStep === 2 ? '#fff' : 'rgba(255,255,255,0.1)'} strokeWidth="1.5" />
                    <text x="230" y="55" fill={pipelineStep === 2 ? '#fff' : '#E2E8F0'} fontSize="11" fontWeight="bold" textAnchor="middle">2. Extraction</text>
                  </g>

                  {/* Link 2-3 */}
                  <line x1="290" y1="50" x2="330" y2="50" stroke={pipelineStep > 2 ? '#6366F1' : 'rgba(255,255,255,0.1)'} strokeWidth="2" strokeDasharray={pipelineStep === 2 ? "4,4" : "0"} />
                  <polygon points="330,50 322,45 322,55" fill={pipelineStep > 2 ? '#6366F1' : 'rgba(255,255,255,0.1)'} />

                  {/* Step 3: Model Fitting */}
                  <g style={{ cursor: 'pointer' }} onClick={() => setPipelineStep(3)}>
                    <rect x="330" y="20" width="120" height="60" rx="8" fill={pipelineStep === 3 ? '#F59E0B' : '#1E293B'} stroke={pipelineStep === 3 ? '#fff' : 'rgba(255,255,255,0.1)'} strokeWidth="1.5" />
                    <text x="390" y="55" fill={pipelineStep === 3 ? '#090F16' : '#E2E8F0'} fontSize="11" fontWeight="bold" textAnchor="middle">3. Model Fitting</text>
                  </g>

                  {/* Link 3-4 */}
                  <line x1="450" y1="50" x2="490" y2="50" stroke={pipelineStep > 3 ? '#F59E0B' : 'rgba(255,255,255,0.1)'} strokeWidth="2" strokeDasharray={pipelineStep === 3 ? "4,4" : "0"} />
                  <polygon points="490,50 482,45 482,55" fill={pipelineStep > 3 ? '#F59E0B' : 'rgba(255,255,255,0.1)'} />

                  {/* Step 4: Verification */}
                  <g style={{ cursor: 'pointer' }} onClick={() => setPipelineStep(4)}>
                    <rect x="490" y="20" width="120" height="60" rx="8" fill={pipelineStep === 4 ? '#EC4899' : '#1E293B'} stroke={pipelineStep === 4 ? '#fff' : 'rgba(255,255,255,0.1)'} strokeWidth="1.5" />
                    <text x="550" y="55" fill={pipelineStep === 4 ? '#fff' : '#E2E8F0'} fontSize="11" fontWeight="bold" textAnchor="middle">4. Validation</text>
                  </g>

                  {/* Link 4-5 */}
                  <line x1="610" y1="50" x2="650" y2="50" stroke={pipelineStep > 4 ? '#EC4899' : 'rgba(255,255,255,0.1)'} strokeWidth="2" strokeDasharray={pipelineStep === 4 ? "4,4" : "0"} />
                  <polygon points="650,50 642,45 642,55" fill={pipelineStep > 4 ? '#EC4899' : 'rgba(255,255,255,0.1)'} />

                  {/* Step 5: Hot Deployment */}
                  <g style={{ cursor: 'pointer' }} onClick={() => setPipelineStep(5)}>
                    <rect x="650" y="20" width="120" height="60" rx="8" fill={pipelineStep === 5 ? '#10B981' : '#1E293B'} stroke={pipelineStep === 5 ? '#fff' : 'rgba(255,255,255,0.1)'} strokeWidth="1.5" />
                    <text x="710" y="55" fill={pipelineStep === 5 ? '#fff' : '#E2E8F0'} fontSize="11" fontWeight="bold" textAnchor="middle">5. Deployment</text>
                  </g>
                </svg>
              </div>

              {/* Step Details Box */}
              <div style={{ background: '#0A0F1D', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '12px', padding: '24px', transition: 'all 0.3s' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <span style={{ fontSize: '12px', textTransform: 'uppercase', fontWeight: '800', color: '#00BFA5', letterSpacing: '0.08em' }}>Stage Description</span>
                  <span style={{ fontSize: '12px', color: '#64748B', fontWeight: '600' }}>Step {pipelineStep} of 5</span>
                </div>
                <h4 style={{ fontSize: '18px', fontWeight: '700', color: '#FFFFFF', margin: '0 0 8px 0' }}>
                  {pipelineSteps[pipelineStep - 1].title}
                </h4>
                <p style={{ fontSize: '14px', color: '#CBD5E1', lineHeight: '1.6', margin: '0 0 16px 0' }}>
                  {pipelineSteps[pipelineStep - 1].desc}
                </p>
                <div style={{ background: '#080C14', padding: '12px 16px', borderRadius: '8px', borderLeft: '3px solid #00BFA5', fontSize: '13px', color: '#94A3B8', fontFamily: 'monospace' }}>
                  ⚙️ <strong>Mechanism:</strong> {pipelineSteps[pipelineStep - 1].details}
                </div>

                <div style={{ display: 'flex', gap: '8px', marginTop: '24px' }}>
                  <button
                    disabled={pipelineStep === 1}
                    onClick={() => setPipelineStep(prev => prev - 1)}
                    style={{
                      background: 'rgba(255,255,255,0.05)', color: pipelineStep === 1 ? '#475569' : '#FFF',
                      border: '1px solid rgba(255,255,255,0.1)', borderRadius: '6px',
                      padding: '8px 16px', fontSize: '12px', fontWeight: '700', cursor: pipelineStep === 1 ? 'default' : 'pointer'
                    }}
                  >
                    Previous Step
                  </button>
                  <button
                    disabled={pipelineStep === 5}
                    onClick={() => setPipelineStep(prev => prev + 1)}
                    style={{
                      background: 'rgba(0, 191, 165, 0.1)', color: pipelineStep === 5 ? '#475569' : '#00BFA5',
                      border: '1px solid rgba(0, 191, 165, 0.3)', borderRadius: '6px',
                      padding: '8px 16px', fontSize: '12px', fontWeight: '700', cursor: pipelineStep === 5 ? 'default' : 'pointer'
                    }}
                  >
                    Next Step
                  </button>
                </div>
              </div>

            </div>
          )}

        </div>

        {/* ─── TECHNICAL INSIGHTS / FAQ ─────────────────────────────── */}
        <div>
          <h3 style={{ color: '#fff', fontSize: '20px', fontWeight: '700', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ color: '#00BFA5' }}>💡</span> Key Operations Rationale
          </h3>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
            
            <div style={{ background: '#0A0F1D', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '12px', padding: '20px' }}>
              <strong style={{ color: '#fff', fontSize: '14px', display: 'block', marginBottom: '6px' }}>
                Why Targeted Retraining?
              </strong>
              <span style={{ fontSize: '13px', color: '#94A3B8', lineHeight: '1.6' }}>
                Training full base LLM weights requires supercomputing capacity (GPUs) and days of execution. DataTrust avoids this by keeping base models frozen and adjusting behavior using compact LoRA adapters, taking only minutes.
              </span>
            </div>

            <div style={{ background: '#0A0F1D', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '12px', padding: '20px' }}>
              <strong style={{ color: '#fff', fontSize: '14px', display: 'block', marginBottom: '6px' }}>
                How does offline fallback function?
              </strong>
              <span style={{ fontSize: '13px', color: '#94A3B8', lineHeight: '1.6' }}>
                If Python modules like `prophet` or `scikit-learn` fail or are missing during offline container deployments, calculations dynamically fall back to classical Ordinary Least Squares (OLS) trends to safeguard pipeline execution.
              </span>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
