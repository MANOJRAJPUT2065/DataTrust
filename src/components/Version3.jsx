import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, RefreshCw, FileText, Settings, Shield, Zap, Search, Brain, Code } from './Icons';
import Footer from './Footer';
import logoImg from '../assets/DataTrust-Logo.png';
import NotificationSystemDocs from './NotificationSystemDocs';
import IntelligenceLayerDocs from './IntelligenceLayerDocs';
import PipelineEngineDocs from './PipelineEngineDocs';
import SemanticEngineV2Docs from './SemanticEngineV2Docs';
import QualityEngineV2Docs from './QualityEngineV2Docs';
import AuditEngineV2Docs from './AuditEngineV2Docs';
import DataFlowDocs from './DataFlowDocs';
import ExcelAddinDocs from './ExcelAddinDocs';
import TestingGuideDocs from './TestingGuideDocs';
import ModelTrainingDocs from './ModelTrainingDocs';
import NvidiaModelsDocs from './NvidiaModelsDocs';
import AutoDocDocs from './AutoDocDocs';
import SemanticSearchDocs from './SemanticSearchDocs';

const architectureLayers = [
  {
    num: '01 — USER LAYER', color: '#00BFA5',
    items: [
      { text: 'Excel Add-in V3', icon: '🗂️' },
      { text: 'Power BI', icon: '📊' },
      { text: 'Tableau', icon: '📈' },
      { text: 'Slack Alerts', icon: '💬' },
      { text: 'Teams Alerts', icon: '🤝' },
      { text: 'Web Console', icon: '🌐' },
      { text: 'REST API', icon: '🔌' }
    ]
  },
  {
    num: '02 — APPLICATION LAYER', color: '#6366F1',
    items: [
      { text: 'NLQ Interface', icon: '💬' },
      { text: 'Quality Dashboard', icon: '📊' },
      { text: 'Alert Center', icon: '🔔' },
      { text: 'Admin Console', icon: '⚙️' },
      { text: 'Pipeline Manager', icon: '🔧' },
      { text: 'Team Workspace', icon: '👥' },
      { text: 'Audit Viewer', icon: '📋' }
    ]
  },
  {
    num: '03 — AI & INTELLIGENCE LAYER (V3.0 NEW)', color: '#F59E0B',
    items: [
      { text: 'NLQ → SQL Engine', subtext: '(LangChain + Groq)', icon: '🧠' },
      { text: 'Predictive Quality', subtext: '(ML Time-Series)', icon: '🔮' },
      { text: 'Rule Inference V2', subtext: '(Self-Learning AI)', icon: '🤖' },
      { text: 'Auto-Correction V2', subtext: '(Zero-Touch Fix)', icon: '🪄' },
      { text: 'Auto-Documentation', subtext: '(LLM Generated)', icon: '📄' },
      { text: 'Semantic Search', subtext: '(pgvector RAG)', icon: '🔍' }
    ]
  },
  {
    num: '04 — CORE ENGINE LAYER', color: '#EC4899',
    items: [
      { text: 'Semantic Engine V2', icon: '⚡' },
      { text: 'Quality Engine V2', icon: '✅' },
      { text: 'Audit Engine V2', icon: '📋' },
      { text: 'Pipeline Engine V2', icon: '⚙️' },
      { text: 'Alert Engine V2', icon: '🔔' },
      { text: 'Rule Engine V2', icon: '📐' },
      { text: 'Workspace Engine', icon: '👥' },
      { text: 'Approval Engine', icon: '✔️' }
    ]
  },
  {
    num: '05 — DATA LAYER', color: '#3B82F6',
    items: [
      { text: 'Snowflake', icon: '❄️' },
      { text: 'Databricks', icon: '⚡' },
      { text: 'Microsoft Fabric', icon: '📊' },
      { text: 'Amazon Redshift', icon: '🔴' },
      { text: 'Google BigQuery', icon: '🔵' },
      { text: 'Azure SQL', icon: '🔷' },
      { text: 'dbt', icon: '📦' },
      { text: 'PostgreSQL (meta)', icon: '🗄️' },
      { text: 'Redis (cache)', icon: '⚡' },
      { text: 'Kafka (events)', icon: '📨' },
      { text: 'pgvector (embeddings)', icon: '🧠' }
    ]
  }
];

export default function Version3({ onEnterWorkspace, setView }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const [activeTab, setActiveTab] = useState('overview');
  const [activeRoadmapPhase, setActiveRoadmapPhase] = useState(1);
  const [nlqQuery, setNlqQuery] = useState('');
  const [nlqResult, setNlqResult] = useState(null);
  const [nlqLoading, setNlqLoading] = useState(false);
  const [nlqActiveDemo, setNlqActiveDemo] = useState(0);
  const nlqTimerRef = useRef(null);

  // Scroll Animation Hook
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.12 });

    // Use a small timeout to allow React to mount the conditional tab elements before observing them
    const timeoutId = setTimeout(() => {
      document.querySelectorAll('.flow-animate, .scroll-reveal').forEach(el => observer.observe(el));
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      observer.disconnect();
    };
  }, [activeTab]);

  const mlConcepts = [
    {
      title: '1. Natural Language Query (NLQ) → SQL Engine',
      tech: 'LangChain + Groq/OpenAI/Gemini, pgvector (PostgreSQL)',
      desc: 'Plain English → SQL translation using RAG and Vector similarity search.',
      example: 'User: "What was Q4 Revenue for West region?"\n1. Vector search finds relevant metrics\n2. LLM Converts to SQL\n3. Quality Engine checks SQL\n4. Result: ₹85.4 Cr in Excel',
      stack: ['langchain', 'langchain-groq', 'pgvector', 'openai (text-embedding-3-small)'],
    },
    {
      title: '2. Predictive Quality Engine',
      tech: 'Prophet / ARIMA / LSTM, Isolation Forest',
      desc: 'Predict future values based on history and detect deviations from normal patterns.',
      example: 'Day 1-5: ₹10-12 Cr (normal)\nDay 6: ML predicts "Revenue may drop tomorrow"\nDay 7: Revenue drops to ₹8.5 Cr\nAlert sent 24 hours BEFORE the drop happens.',
      stack: ['prophet (Meta)', 'scikit-learn', 'xgboost', 'pandas + numpy'],
    },
    {
      title: '3. Self-Learning Rule Inference V2',
      tech: 'Pandas + NumPy, Custom Algorithms',
      desc: 'Analyze historical data for patterns, learn normal ranges, and discover relationships.',
      example: 'Data: [150, 160, 170, 180, 190, 1000]\nInferred Rules:\n1. Revenue >= 0 → Confidence: 99%\n2. Revenue BETWEEN 100 AND 500 → Conf: 85%\n3. Revenue = Units × Price → Conf: 92%',
      stack: ['pandas', 'numpy', 'scipy', 'sklearn'],
    },
    {
      title: '4. Auto-Correction Engine V2',
      tech: 'LangChain + Groq, Custom Logic',
      desc: 'AI suggests fixes for complex issues and automatically applies them with rollback support.',
      example: '🔴 Issue: 42 duplicate rows in Store 42\nAuto-Correction:\n1. Identify duplicates\n2. Remove duplicates\n3. Re-validate → ✅ PASS\nNotification: "42 duplicate rows removed."',
      stack: ['langchain', 'pandas', 'sqlalchemy', 'custom_rule_engine'],
    },
    {
      title: '5. Auto-Documentation Engine',
      tech: 'LangChain + Groq, Jinja2',
      desc: 'Generate plain English descriptions using RAG + Semantic Search context.',
      example: "Metric: Revenue\nDefinition: SUM(net_sales) WHERE status = 'Completed'\n\nAI Generated Docs:\n\"Revenue is the total net sales after deducting returns and discounts. It is calculated by summing net_sales from the sales_transactions table...\"",
      stack: ['langchain', 'langchain-groq', 'jinja2', 'pydantic'],
    },
    {
      title: '6. Semantic Search (pgvector RAG)',
      tech: 'OpenAI text-embedding-3-small, pgvector (IVFFlat)',
      desc: 'Convert text to vectors to find semantically similar items using Hybrid Search (BM25 + Vector).',
      example: 'Search: "customer churn"\n1. Convert query to vector\n2. Semantic search\n3. Results:\n   - "Churn Rate" — 95% match\n   - "Customer Retention" — 88% match',
      stack: ['pgvector', 'openai', 'langchain', 'sqlalchemy'],
    },
    {
      title: '7. LLM Fallback Chain',
      tech: 'Groq → OpenAI → Gemini → Ollama',
      desc: 'Primary fast inference fallback chain for reliability. From 70B cloud models down to local 3B models.',
      example: 'FALLBACK_ORDER = [\n    "groq",      # Fastest, free tier\n    "openai",    # High accuracy\n    "gemini",    # Good fallback\n    "ollama",    # Local, 100% free\n]',
      stack: ['Groq (Llama 3.3 70B)', 'OpenAI (GPT-4o)', 'Gemini (1.5 Flash)', 'Ollama (Llama 3.2 3B)'],
    },
  ];

  const hldDiagrams = [
    {
      title: '1.1 AI Rule Inference V2',
      tech: 'pandas, numpy, scikit-learn, xgboost, scipy, custom_rule_engine',
      diagram: `┌─────────────────────────────────────────────────────────────────────────────┐
│                    AI RULE INFERENCE ENGINE V2                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐  │
│  │  INPUT: Historical Data                                              │  │
│  │  • Sales transactions (12 months)                                   │  │
│  │  • Customer data                                                    │  │
│  │  • Financial data                                                   │  │
│  └─────────────────────────────────────────────────────────────────────┘  │
│                                    │                                        │
│                                    ▼                                        │
│  ┌─────────────────────────────────────────────────────────────────────┐  │
│  │  PROCESS: Pattern Detection                                         │  │
│  │  • Statistical analysis (mean, std, percentiles)                    │  │
│  │  • Correlation analysis (Revenue = Units × Price)                   │  │
│  │  • Temporal patterns (Monday drops)                                 │  │
│  │  • ML models (Isolation Forest, XGBoost)                            │  │
│  └─────────────────────────────────────────────────────────────────────┘  │
│                                    │                                        │
│                                    ▼                                        │
│  ┌─────────────────────────────────────────────────────────────────────┐  │
│  │  OUTPUT: Inferred Rules                                             │  │
│  │  • Revenue >= 0 → Confidence: 99%                                   │  │
│  │  • Revenue BETWEEN 100 AND 500 → Confidence: 85%                    │  │
│  │  • Revenue = Units × Price → Confidence: 92%                        │  │
│  └─────────────────────────────────────────────────────────────────────┘  │
│                                    │                                        │
│                                    ▼                                        │
│  ┌─────────────────────────────────────────────────────────────────────┐  │
│  │  USER ACTION: Review & Accept                                       │  │
│  │  • User sees proposed rules                                         │  │
│  │  • Accept / Reject / Modify                                         │  │
│  │  • Rules go live instantly                                          │  │
│  └─────────────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────────────┘`
    },
    {
      title: '1.2 Predictive Quality Engine',
      tech: 'prophet, statsmodels, tensorflow/pytorch, scikit-learn, pandas',
      diagram: `┌─────────────────────────────────────────────────────────────────────────────┐
│                    PREDICTIVE QUALITY ENGINE                               │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐  │
│  │  INPUT: Historical Data + Real-time Stream                          │  │
│  │  • Daily revenue (2 years)                                          │  │
│  │  • Weekly sales                                                    │  │
│  │  • Monthly trends                                                  │  │
│  └─────────────────────────────────────────────────────────────────────┘  │
│                                    │                                        │
│                                    ▼                                        │
│  ┌─────────────────────────────────────────────────────────────────────┐  │
│  │  PROCESS: Time-Series Forecasting                                   │  │
│  │  • Prophet (Meta) → Trend + Seasonality + Holiday effects           │  │
│  │  • ARIMA → Statistical forecasting                                  │  │
│  │  • LSTM (optional) → Deep learning for complex patterns            │  │
│  │  • Ensemble → Combine multiple models for better accuracy          │  │
│  └─────────────────────────────────────────────────────────────────────┘  │
│                                    │                                        │
│                                    ▼                                        │
│  ┌─────────────────────────────────────────────────────────────────────┐  │
│  │  OUTPUT: Prediction + Risk Score                                    │  │
│  │  • Predicted Revenue: ₹9.5 Cr (tomorrow)                            │  │
│  │  • Risk Score: 87% (High)                                           │  │
│  │  • Confidence: 92%                                                  │  │
│  │  • Expected deviation: 40% drop                                     │  │
│  └─────────────────────────────────────────────────────────────────────┘  │
│                                    │                                        │
│                                    ▼                                        │
│  ┌─────────────────────────────────────────────────────────────────────┐  │
│  │  ALERT: 24 Hours Before Issue                                       │  │
│  │  • "Revenue may drop 40% tomorrow"                                  │  │
│  │  • Sent to: CFO, Finance Head, VP Sales                             │  │
│  │  • Recommended Action: Check West region pipeline                   │  │
│  └─────────────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────────────┘`
    },
    {
      title: '1.3 Auto-Correction Engine V2',
      tech: 'pandas, langchain, sqlalchemy, custom_fix_engine, audit_logger',
      diagram: `┌─────────────────────────────────────────────────────────────────────────────┐
│                    AUTO-CORRECTION ENGINE V2                               │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐  │
│  │  INPUT: Data Quality Issue                                           │  │
│  │  • 42 duplicate rows in Store 42                                    │  │
│  │  • Revenue 40% higher than expected                                 │  │
│  └─────────────────────────────────────────────────────────────────────┘  │
│                                    │                                        │
│                                    ▼                                        │
│  ┌─────────────────────────────────────────────────────────────────────┐  │
│  │  PROCESS: Root Cause Analysis                                       │  │
│  │  • Identify duplicates → 42 rows                                    │  │
│  │  • Determine pattern → ETL job ran twice                            │  │
│  │  • Calculate impact → ₹2.5 Cr overstated                            │  │
│  └─────────────────────────────────────────────────────────────────────┘  │
│                                    │                                        │
│                                    ▼                                        │
│  ┌─────────────────────────────────────────────────────────────────────┐  │
│  │  PROCESS: Fix Strategy                                              │  │
│  │  • Rule-based: Remove duplicates                                     │  │
│  │  • LLM-based: Complex fixes (LangChain)                              │  │
│  │  • Validation: Re-run quality checks                                 │  │
│  └─────────────────────────────────────────────────────────────────────┘  │
│                                    │                                        │
│                                    ▼                                        │
│  ┌─────────────────────────────────────────────────────────────────────┐  │
│  │  OUTPUT: Corrected Data                                             │  │
│  │  • 42 rows removed                                                  │  │
│  │  • Revenue corrected: ₹87.5 Cr → ₹85.0 Cr                           │  │
│  │  • All rules pass ✅                                                 │  │
│  └─────────────────────────────────────────────────────────────────────┘  │
│                                    │                                        │
│                                    ▼                                        │
│  ┌─────────────────────────────────────────────────────────────────────┐  │
│  │  AUDIT: Log Everything                                              │  │
│  │  • What was fixed? → 42 duplicates removed                          │  │
│  │  • Who fixed it? → System (auto-correction)                         │  │
│  │  • When? → 2026-06-24 08:11 AM                                      │  │
│  │  • Why? → ETL duplicate load                                        │  │
│  │  • Can rollback? → Yes                                              │  │
│  └─────────────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────────────┘`
    },
    {
      title: '1.4 Auto-Documentation Engine',
      tech: 'langchain, langchain-groq, jinja2, pydantic',
      diagram: `┌─────────────────────────────────────────────────────────────────────────────┐
│                    AUTO-DOCUMENTATION ENGINE                               │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐  │
│  │  INPUT: Metric Metadata                                              │  │
│  │  • Name: Revenue                                                    │  │
│  │  • Definition: SUM(net_sales) WHERE status='Completed'              │  │
│  │  • Owner: finance@company.com                                       │  │
│  │  • Version: v2.3.0                                                  │  │
│  │  • Last Updated: 10 Jun 2026                                        │  │
│  └─────────────────────────────────────────────────────────────────────┘  │
│                                    │                                        │
│                                    ▼                                        │
│  ┌─────────────────────────────────────────────────────────────────────┐  │
│  │  PROCESS: LLM Summarization                                         │  │
│  │  • LangChain + Groq (Fast)                                          │  │
│  │  • System Prompt: "Generate business-friendly description"          │  │
│  │  • Context: Schema, lineage, usage                                  │  │
│  └─────────────────────────────────────────────────────────────────────┘  │
│                                    │                                        │
│                                    ▼                                        │
│  ┌─────────────────────────────────────────────────────────────────────┐  │
│  │  OUTPUT: Generated Documentation                                    │  │
│  │  "Revenue is the total net sales after deducting returns and        │  │
│  │  discounts. It is calculated by summing net_sales from the          │  │
│  │  sales_transactions table where status is 'Completed'. This         │  │
│  │  metric is owned by the finance team and was last updated on        │  │
│  │  10 Jun 2026 (v2.3.0)."                                             │  │
│  └─────────────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────────────┘`
    },
    {
      title: '2. NLQ → SQL Engine',
      tech: 'langchain, langchain-groq, pgvector, openai, snowflake-connector, quality_engine',
      diagram: `┌─────────────────────────────────────────────────────────────────────────────┐
│                    NLQ → SQL ENGINE                                        │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐  │
│  │  INPUT: User Question                                                │  │
│  │  "What was Q4 Revenue for West region?"                              │  │
│  └─────────────────────────────────────────────────────────────────────┘  │
│                                    │                                        │
│                                    ▼                                        │
│  ┌─────────────────────────────────────────────────────────────────────┐  │
│  │  STEP 1: Embedding                                                  │  │
│  │  • Convert question to vector using OpenAI embeddings               │  │
│  │  • embedding = text-embedding-3-small                              │  │
│  │  • Dimension: 1536                                                  │  │
│  └─────────────────────────────────────────────────────────────────────┘  │
│                                    │                                        │
│                                    ▼                                        │
│  ┌─────────────────────────────────────────────────────────────────────┐  │
│  │  STEP 2: Semantic Search (pgvector)                                 │  │
│  │  • Find relevant metrics using vector similarity                    │  │
│  │  • Revenue → 95% match                                              │  │
│  │  • Region dimension → 92% match                                     │  │
│  │  • Quarter filter → 88% match                                       │  │
│  └─────────────────────────────────────────────────────────────────────┘  │
│                                    │                                        │
│                                    ▼                                        │
│  ┌─────────────────────────────────────────────────────────────────────┐  │
│  │  STEP 3: LLM Translation (LangChain + Groq)                         │  │
│  │  • Convert to SQL:                                                  │  │
│  │  SELECT SUM(revenue) FROM sales                                     │  │
│  │  WHERE quarter=4 AND region='West'                                  │  │
│  └─────────────────────────────────────────────────────────────────────┘  │
│                                    │                                        │
│                                    ▼                                        │
│  ┌─────────────────────────────────────────────────────────────────────┐  │
│  │  STEP 4: SQL Validation                                             │  │
│  │  • Quality Engine validates the generated SQL                       │  │
│  │  • Checks against rules                                             │  │
│  │  • Passes ✅                                                         │  │
│  └─────────────────────────────────────────────────────────────────────┘  │
│                                    │                                        │
│                                    ▼                                        │
│  ┌─────────────────────────────────────────────────────────────────────┐  │
│  │  STEP 5: Execute & Return                                           │  │
│  │  • Run SQL on Snowflake                                             │  │
│  │  • Result: ₹85.4 Cr                                                 │  │
│  │  • Lineage attached                                                 │  │
│  │  • Time: < 2 seconds                                                │  │
│  └─────────────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────────────┘`
    },
    {
      title: '3. Multi-Cloud Connectivity',
      tech: 'snowflake-connector-python, databricks-sql-connector, msal, boto3, google-cloud-bigquery, pyodbc, sqlalchemy',
      diagram: `┌─────────────────────────────────────────────────────────────────────────────┐
│                    MULTI-CLOUD CONNECTIVITY                                │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐  │
│  │  CONNECTOR LAYER                                                     │  │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐              │  │
│  │  │  Snowflake   │  │  Databricks  │  │  Fabric      │              │  │
│  │  │  Connector   │  │  Connector   │  │  Connector   │              │  │
│  │  └──────────────┘  └──────────────┘  └──────────────┘              │  │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐              │  │
│  │  │  Redshift    │  │  BigQuery    │  │  Azure SQL   │              │  │
│  │  │  Connector   │  │  Connector   │  │  Connector   │              │  │
│  │  └──────────────┘  └──────────────┘  └──────────────┘              │  │
│  └─────────────────────────────────────────────────────────────────────┘  │
│                                    │                                        │
│                                    ▼                                        │
│  ┌─────────────────────────────────────────────────────────────────────┐  │
│  │  UNIFIED SEMANTIC LAYER                                              │  │
│  │  • One definition for every metric across ALL clouds                 │  │
│  │  • Revenue = SUM(net_sales) WHERE status='Completed'                │  │
│  │  • Same number, regardless of source                                 │  │
│  └─────────────────────────────────────────────────────────────────────┘  │
│                                    │                                        │
│                                    ▼                                        │
│  ┌─────────────────────────────────────────────────────────────────────┐  │
│  │  QUERY ROUTER                                                       │  │
│  │  • Determines which cloud to query                                   │  │
│  │  • Optimizes for performance                                         │  │
│  │  • Handles cross-cloud joins                                         │  │
│  └─────────────────────────────────────────────────────────────────────┘  │
│                                    │                                        │
│                                    ▼                                        │
│  ┌─────────────────────────────────────────────────────────────────────┐  │
│  │  UNIFIED VIEW                                                       │  │
│  │  • User sees ONE dashboard                                          │  │
│  │  • Source doesn't matter                                            │  │
│  │  • Data from ALL clouds combined                                    │  │
│  └─────────────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────────────┘`
    },
    {
      title: '4. Semantic Layer',
      tech: 'sqlalchemy, pgvector, openai, pydantic, audit_logger',
      diagram: `┌─────────────────────────────────────────────────────────────────────────────┐
│                    SEMANTIC LAYER V2                                        │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐  │
│  │  METRIC REGISTRY                                                     │  │
│  │  • Name: Revenue                                                    │  │
│  │  • Definition: SUM(net_sales) WHERE status='Completed'              │  │
│  │  • Owner: finance@company.com                                       │  │
│  │  • Version: v2.3.0 → v2.3.1 (history tracked)                       │  │
│  │  • Synonyms: Sales, Turnover, Gross Revenue                         │  │
│  └─────────────────────────────────────────────────────────────────────┘  │
│                                    │                                        │
│                                    ▼                                        │
│  ┌─────────────────────────────────────────────────────────────────────┐  │
│  │  VECTOR EMBEDDINGS (V3.0 NEW)                                       │  │
│  │  • Each metric converted to vector (1536 dimensions)                │  │
│  │  • Stored in pgvector                                               │  │
│  │  • Enables semantic search                                          │  │
│  └─────────────────────────────────────────────────────────────────────┘  │
│                                    │                                        │
│                                    ▼                                        │
│  ┌─────────────────────────────────────────────────────────────────────┐  │
│  │  DATA LINEAGE                                                       │  │
│  │  • Column-level lineage                                             │  │
│  │  • Full transformation history                                      │  │
│  │  • Source → Transformation → Metric → Report                        │  │
│  └─────────────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────────────┘`
    }
  ];

  const v3Features = [
    {
      icon: '🧠', category: 'Category 1: AI & Automation', badge: 'Intelligence',
      title: 'AI Intelligence Layer',
      desc: 'Self-learning rules, predictive quality, and auto-correction. Making governance invisible.',
      items: [
        { name: 'AI Rule Inference V2', status: 'In Progress' },
        { name: 'Predictive Quality Engine', status: 'In Progress' },
        { name: 'Auto-Correction V2', status: 'In Progress' },
        { name: 'Auto-Documentation', status: 'In Progress' },
        { name: 'AI Recommendations', status: 'Planned' },
      ],
    },
    {
      icon: '💬', category: 'Category 2: Natural Language Query', badge: 'NLQ',
      title: 'Ask in Plain English',
      desc: 'Get answers in Excel under 2 seconds. No SQL, no DAX required.',
      items: [
        { name: 'NLQ → SQL Engine', status: 'In Progress' },
        { name: 'pgvector Semantic Search', status: 'In Progress' },
        { name: 'RAG-Powered Accuracy', status: 'In Progress' },
        { name: '90%+ Translation Accuracy', status: 'In Progress' },
        { name: 'NLQ in Excel Ribbon', status: 'Planned' },
      ],
    },
    {
      icon: '🌐', category: 'Category 3: Multi-Cloud Connectivity', badge: 'Scale',
      title: 'Every Cloud, Every Stack',
      desc: 'Expanding beyond Snowflake and Databricks to every major data platform.',
      items: [
        { name: 'Amazon Redshift', status: 'Planned' },
        { name: 'Google BigQuery', status: 'Planned' },
        { name: 'Azure SQL', status: 'Planned' },
        { name: 'dbt Integration', status: 'Planned' },
        { name: 'Looker + Tableau Sync', status: 'Planned' },
      ],
    },
    {
      icon: '🧩', category: 'Category 4: Semantic Layer', badge: 'Core',
      title: 'One Source of Truth',
      desc: 'The foundational layer that ensures every metric means exactly one thing.',
      items: [
        { name: 'Canonical Metric Definitions', status: 'Complete' },
        { name: 'Full Version History', status: 'Complete' },
        { name: 'Column-Level Lineage', status: 'Complete' },
        { name: 'Vector Embeddings', status: 'In Progress' },
        { name: 'Semantic Search', status: 'In Progress' },
      ],
    },
    {
      icon: '⚡', category: 'Category 5: Excel Add-in V3', badge: 'UX',
      title: 'Excel Transformed',
      desc: 'Bring governed data directly into the tool your business users already know.',
      items: [
        { name: 'Excel Dashboard Builder', status: 'Planned' },
        { name: 'Real-Time Collaboration', status: 'Planned' },
        { name: 'Template Marketplace', status: 'Planned' },
        { name: 'NLQ in Excel Ribbon', status: 'Planned' },
        { name: 'Power BI Integration', status: 'Planned' },
      ],
    },
    {
      icon: '👥', category: 'Category 6: Team Collaboration', badge: 'Governance',
      title: 'Workspaces & Governance',
      desc: 'Secure environments for departments to manage their own semantic models safely.',
      items: [
        { name: 'Team Workspaces', status: 'In Progress' },
        { name: 'Fine-Grained Permissions', status: 'In Progress' },
        { name: 'Approval Workflows V2', status: 'In Progress' },
        { name: 'Impact Analysis V2', status: 'Planned' },
        { name: 'Data Catalog V2', status: 'Planned' },
      ],
    },
    {
      icon: '📜', category: 'Category 7: Audit & Compliance V3', badge: 'Trust',
      title: 'Zero-Effort Compliance',
      desc: 'Automated audit trails, data masking, and pre-built compliance reports.',
      items: [
        { name: 'Pre-Built Compliance Reports', status: 'Planned' },
        { name: 'Data Masking (PII)', status: 'Planned' },
        { name: 'Data Retention Policies', status: 'Planned' },
        { name: 'Column-Level Lineage V3', status: 'Complete' },
        { name: 'Audit Trail V3 + Export', status: 'Complete' },
      ],
    },
    {
      icon: '🚀', category: 'Category 8: Performance & Scale', badge: 'Infra',
      title: 'Enterprise-Grade Scale',
      desc: 'Built to handle massive data volumes with sub-second latency.',
      items: [
        { name: 'Redis Semantic Cache', status: 'In Progress' },
        { name: 'Kafka Event Bus', status: 'Planned' },
        { name: 'Kubernetes + Helm', status: 'Planned' },
        { name: 'Auto-Scaling HPA', status: 'Planned' },
        { name: 'Data Partitioning (1B+ rows)', status: 'Planned' },
      ],
    },
    {
      icon: '🔌', category: 'Category 9: Ecosystem & APIs', badge: 'Open',
      title: 'Open & Extensible',
      desc: 'Integrate DataTrust into your existing CI/CD and developer workflows.',
      items: [
        { name: 'Open REST API V3', status: 'In Progress' },
        { name: 'Webhooks', status: 'Planned' },
        { name: 'Plugin System', status: 'Planned' },
        { name: 'Python / JS / Java SDKs', status: 'Planned' },
        { name: 'GitHub Actions / GitLab CI', status: 'Planned' },
      ],
    },
  ];

  const roadmapPhases = [
    {
      phase: 1, label: 'Phase 1', quarter: 'Q1 2027', title: 'AI & Automation',
      desc: 'AI-powered rule inference V2, predictive quality forecasting, and natural language query translation.',
      features: ['AI Rule Inference V2', 'Predictive Quality', 'Natural Language Query (NLQ)', 'Slack/Teams Alerts'],
      color: '#00BFA5',
    },
    {
      phase: 2, label: 'Phase 2', quarter: 'Q2 2027', title: 'Multi-Platform',
      desc: 'Expanding multi-cloud capabilities with native Redshift, BigQuery, Azure SQL, and dbt integrations.',
      features: ['Amazon Redshift', 'Google BigQuery', 'Azure SQL', 'dbt Integration'],
      color: '#6366F1',
    },
    {
      phase: 3, label: 'Phase 3', quarter: 'Q3 2027', title: 'Collaboration & Governance',
      desc: 'Team workspaces, fine-grained access permissions, and a next-generation Data Catalog V2.',
      features: ['Team Workspaces', 'Fine-Grained Permissions', 'Data Catalog V2', 'Approval Workflows', 'Impact Analysis'],
      color: '#F59E0B',
    },
    {
      phase: 4, label: 'Phase 4', quarter: 'Q4 2027', title: 'Excel Add-in V3 & Performance',
      desc: 'Excel dashboard builder with real-time collaboration, query caching, and auto-scaling.',
      features: ['Excel Dashboard Builder', 'Query Caching', 'Auto-Scaling', 'Template Marketplace', 'Power BI Integration'],
      color: '#10B981',
    },
  ];

  const nlqDemos = [
    { q: 'What was Q4 Revenue for West region?', sql: "SELECT SUM(revenue) FROM sales WHERE quarter=4 AND region='West'", result: '₹1.1 Cr', conf: 97, time: '1.8s' },
    { q: 'Show top 5 products by units sold this month', sql: 'SELECT product, SUM(units) as total FROM sales WHERE month=CURRENT_MONTH GROUP BY product ORDER BY total DESC LIMIT 5', result: '5 rows returned', conf: 94, time: '2.1s' },
    { q: 'Which regions had data quality anomalies last week?', sql: "SELECT region, COUNT(*) as anomalies FROM quality_log WHERE severity='HIGH' AND created_at >= NOW()-INTERVAL 7 DAY GROUP BY region", result: 'West, North (2 regions)', conf: 96, time: '1.5s' },
    { q: 'Compare revenue growth Q3 vs Q4 2026', sql: 'SELECT quarter, SUM(revenue), LAG(SUM(revenue)) OVER (ORDER BY quarter) as prev FROM sales WHERE year=2026 GROUP BY quarter', result: '+18.4% QoQ growth', conf: 92, time: '2.3s' },
  ];

  const handleNlqDemo = (idx) => {
    const demo = nlqDemos[idx];
    setNlqLoading(true);
    setNlqResult(null);
    setNlqQuery(demo.q);
    setNlqActiveDemo(idx);
    if (nlqTimerRef.current) clearTimeout(nlqTimerRef.current);
    nlqTimerRef.current = setTimeout(() => {
      setNlqLoading(false);
      setNlqResult(demo);
    }, 1800);
  };

  const getStatusColor = (status) => {
    if (status === 'Complete') return { bg: 'rgba(16, 185, 129, 0.1)', text: '#059669', border: 'rgba(16, 185, 129, 0.2)' };
    if (status === 'In Progress') return { bg: 'rgba(59, 130, 246, 0.1)', text: '#2563EB', border: 'rgba(59, 130, 246, 0.2)' };
    return { bg: 'rgba(100, 116, 139, 0.1)', text: '#475569', border: 'rgba(100, 116, 139, 0.2)' };
  };

  return (
    <div className="landing-layout" style={{ background: '#0F172A' }}>
      <style>{`
        .scroll-reveal { opacity: 0; transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1); will-change: transform, opacity; }
        .scroll-reveal.fade-up    { transform: translateY(30px); }
        .scroll-reveal.fade-left  { transform: translateX(30px); }
        .scroll-reveal.scale-in   { transform: scale(0.95); }
        .scroll-reveal.visible    { opacity: 1; transform: translate(0) scale(1); }
        .delay-100 { transition-delay: 0.1s; } .delay-200 { transition-delay: 0.2s; } .delay-300 { transition-delay: 0.3s; }

        .v3-feature-card { background: #1E293B; border: 1px solid rgba(255,255,255,0.1); border-radius: 20px; padding: 32px 28px; transition: all 0.3s ease; position: relative; overflow: hidden; }
        .v3-feature-card:hover { transform: translateY(-6px); box-shadow: 0 20px 50px rgba(0,0,0,0.3); border-color: rgba(0,191,165,0.5); background: #233147; }
        
        .ml-concept-card { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 16px; overflow: hidden; transition: all 0.25s ease; }
        .ml-concept-card:hover { border-color: rgba(99,102,241,0.5); background: rgba(99,102,241,0.04); }
        .ml-concept-header { padding: 20px 24px; border-bottom: 1px solid rgba(255,255,255,0.05); }
        .ml-concept-body { padding: 20px 24px; }
        .ml-stack-badge { display: inline-block; padding: 4px 10px; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 6px; font-size: 11px; color: #94A3B8; margin-right: 6px; margin-bottom: 6px; font-family: var(--font-mono, monospace); }

        .roadmap-phase-btn { padding: 10px 20px; border-radius: 999px; border: 1px solid rgba(255,255,255,0.1); background: rgba(255,255,255,0.05); font-size: 13px; font-weight: 600; cursor: pointer; transition: all 0.2s; color: #94A3B8; }
        .roadmap-phase-btn.active { background: #00BFA5; color: #fff; border-color: #00BFA5; }
        .roadmap-phase-card { background: #1E293B; border: 1px solid rgba(255,255,255,0.1); border-radius: 20px; padding: 40px; }

        .plan-card { background: #1E293B; border: 1px solid rgba(255,255,255,0.1); border-radius: 16px; padding: 32px 24px; display: flex; flex-direction: column; transition: transform 0.2s; }
        .plan-card:hover { transform: translateY(-4px); }
        .plan-name { font-size: 18px; font-weight: 700; color: #F8FAFC; margin-bottom: 8px; }
        .plan-price { font-size: 36px; font-weight: 800; color: #00BFA5; margin-bottom: 4px; }
        .plan-users { font-size: 13px; color: #94A3B8; font-weight: 500; margin-bottom: 24px; }
        .plan-features { list-style: none; padding: 0; margin: 0 0 24px 0; flex: 1; }
        .plan-features li { font-size: 14px; color: #CBD5E1; margin-bottom: 12px; display: flex; align-items: flex-start; gap: 8px; }
        .plan-features li::before { content: '✓'; color: #00BFA5; font-weight: 700; }
        .plan-card.popular { border: 2px solid #00BFA5; box-shadow: 0 8px 32px rgba(0,191,165,0.15); transform: scale(1.02); z-index: 2; }
        
        /* NLQ Showcase */
        .nlq-terminal { background: #0D1117; border-radius: 16px; border: 1px solid rgba(255,255,255,0.08); overflow: hidden; box-shadow: 0 30px 80px rgba(0,0,0,0.5); }
        .nlq-topbar { background: #161B22; padding: 12px 16px; display: flex; align-items: center; gap: 8px; border-bottom: 1px solid rgba(255,255,255,0.06); }
        .nlq-dot { width: 10px; height: 10px; border-radius: 50%; }
        .nlq-input-row { display: flex; align-items: center; gap: 10px; padding: 16px 20px; background: #0D1117; border-bottom: 1px solid rgba(255,255,255,0.06); }
        .nlq-input-display { flex: 1; background: rgba(99,102,241,0.08); border: 1px solid rgba(99,102,241,0.25); border-radius: 8px; padding: 10px 14px; font-size: 14px; color: rgba(255,255,255,0.9); font-family: var(--font-mono, monospace); min-height: 42px; display: flex; align-items: center; }
        .nlq-cursor { display: inline-block; width: 2px; height: 16px; background: #6366F1; margin-left: 2px; animation: typing-cursor 1s infinite; vertical-align: middle; }
        .nlq-sql-block { padding: 14px 20px; background: #161B22; border-bottom: 1px solid rgba(255,255,255,0.06); font-family: var(--font-mono, 'Courier New', monospace); font-size: 12px; color: #7EE7B8; line-height: 1.6; }
        .nlq-result-block { padding: 16px 20px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px; }
        .nlq-spinner { width: 20px; height: 20px; border: 2px solid rgba(99,102,241,0.2); border-top-color: #6366F1; border-radius: 50%; animation: spin 0.8s linear infinite; flex-shrink: 0; }
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes typing-cursor { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
        
        /* V3 HLD Dropdown */
        .nav-dropdown {
          position: relative;
          display: inline-block;
        }
        .nav-dropdown-content {
          display: block;
          opacity: 0;
          visibility: hidden;
          position: absolute;
          background-color: #0F172A;
          min-width: 250px;
          box-shadow: 0px 8px 24px rgba(0,0,0,0.6);
          z-index: 1000;
          border-radius: 8px;
          border: 1px solid rgba(255,255,255,0.1);
          padding: 8px 0;
          top: 100%;
          left: 50%;
          transform: translateX(-50%);
          margin-top: 8px;
          transition: opacity 0.15s ease, visibility 0.15s ease;
          transition-delay: 0.1s;
        }
        .nav-dropdown-content::before {
          content: '';
          position: absolute;
          top: -12px;
          left: 0;
          width: 100%;
          height: 12px;
          background: transparent;
        }
        .nav-dropdown-content a {
          color: #94A3B8 !important;
          padding: 10px 16px;
          text-decoration: none;
          display: block;
          font-size: 13px !important;
          transition: all 0.2s ease;
          border-bottom: 1px solid rgba(255,255,255,0.05);
          text-align: left;
        }
        .nav-dropdown-content a:last-child {
          border-bottom: none;
        }
        .nav-dropdown-content a:hover {
          background-color: #1E293B;
          color: #00BFA5 !important;
        }
        .nav-dropdown:hover .nav-dropdown-content {
          opacity: 1;
          visibility: visible;
          transition-delay: 0s;
        }
      `}</style>

      {/* ─── NAVIGATION ─────────────────────────────────────────────── */}
      <nav className={`marketing-nav ${isMobileMenuOpen ? 'mobile-active' : ''}`} style={{ background: 'rgba(15, 23, 42, 0.9)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="logo" onClick={() => { setView('landing'); setIsMobileMenuOpen(false); }} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
          <img src={logoImg} alt="DataTrust Logo" style={{ height: '64px', filter: 'brightness(0) invert(1)' }} />
        </div>
        <button className="hamburger" onClick={toggleMobileMenu} aria-label="Toggle menu">
          <span></span>
          <span></span>
          <span></span>
        </button>
        <ul onClick={() => setIsMobileMenuOpen(false)}>
          <li><a href="#ml-concepts" style={{ color: '#E2E8F0' }}>ML & LLM Concepts</a></li>
          <li><a href="#features" style={{ color: '#E2E8F0' }}>All 45+ Features</a></li>
          <li><a href="#roadmap" style={{ color: '#E2E8F0' }}>Roadmap</a></li>

          {/* Group 1: Technical Deep-Dives & HLDs */}
          <li className="nav-dropdown" onClick={(e) => e.stopPropagation()}>
            <a href="#" onClick={(e) => e.preventDefault()} style={{ color: '#00BFA5', fontWeight: 'bold' }}>Technical HLDs 📐</a>
            <div className="nav-dropdown-content" onClick={() => setIsMobileMenuOpen(false)}>
              <a href="/?view=architecture-hld" onClick={(e) => { e.preventDefault(); setView('architecture-hld'); }}>📐 Core Architecture HLD</a>
              <a href="/?view=data-flow" onClick={(e) => { e.preventDefault(); setView('data-flow'); }}>📊 E2E Data Flow Lifecycle</a>
              <a href="/?view=post-sync-arch" onClick={(e) => { e.preventDefault(); setView('post-sync-arch'); }}>🔄 Post-Sync Lifecycle</a>
              <a href="/?view=metadata-sync" onClick={(e) => { e.preventDefault(); setView('metadata-sync'); }}>🗄️ Metadata Sync Cache</a>
              <a href="/?view=redis-sync" onClick={(e) => { e.preventDefault(); setView('redis-sync'); }}>⚡ Redis Pub/Sub Live Sync</a>
              <a href="/?view=semantic-engine" onClick={(e) => { e.preventDefault(); setView('semantic-engine'); }}>💡 V2 DAX-to-SQL Compiler</a>
              <a href="/?view=semantic-engine-v2" onClick={(e) => { e.preventDefault(); setView('semantic-engine-v2'); }}>🧠 V3 Semantic Search (pgvector)</a>
              <a href="/?view=quality-engine-v2" onClick={(e) => { e.preventDefault(); setView('quality-engine-v2'); }}>✅ V3 Quality Engine Anomaly</a>
              <a href="/?view=audit-engine-v2" onClick={(e) => { e.preventDefault(); setView('audit-engine-v2'); }}>📋 V3 Audit Engine Immutable</a>
              <a href="/?view=pipeline-engine-v2" onClick={(e) => { e.preventDefault(); setView('pipeline-engine-v2'); }}>⚙️ V3 Pipeline Stage Logs</a>
              <a href="/?view=intelligence-layer" onClick={(e) => { e.preventDefault(); setView('intelligence-layer'); }}>🔮 V3 AI Inference Layer</a>
              <a href="/?view=notification-system" onClick={(e) => { e.preventDefault(); setView('notification-system'); }}>🔔 V3 Alert Routing Engine</a>
              <a href="/?view=autodoc-hld" onClick={(e) => { e.preventDefault(); setView('autodoc-hld'); }}>🤖 V3 Auto-Documentation HLD</a>
              <a href="/?view=semantic-search-hld" onClick={(e) => { e.preventDefault(); setView('semantic-search-hld'); }}>🔍 V3 Semantic Search HLD</a>
              <a href="/?view=model-training" onClick={(e) => { e.preventDefault(); setView('model-training'); }}>⚙️ V3 AI Model Training HLD</a>
              <a href="/?view=nvidia-models" onClick={(e) => { e.preventDefault(); setView('nvidia-models'); }}>🟢 NVIDIA NIM Model Hub</a>
            </div>
          </li>

          {/* Group 2: Guides & Demos */}
          <li className="nav-dropdown" onClick={(e) => e.stopPropagation()}>
            <a href="#" onClick={(e) => e.preventDefault()} style={{ color: '#818CF8', fontWeight: 'bold' }}>Resources & Business 🏢</a>
            <div className="nav-dropdown-content" onClick={() => setIsMobileMenuOpen(false)}>
              <a href="/?view=case-studies" onClick={(e) => { e.preventDefault(); setView('case-studies'); }}>🏢 Enterprise Case Studies</a>
              <a href="/?view=case-studies-hld" onClick={(e) => { e.preventDefault(); setView('case-studies-hld'); }}>📐 Case Studies Integration HLD</a>
              <a href="/?view=investor-pitch" onClick={(e) => { e.preventDefault(); setView('investor-pitch'); }}>🚀 Investor Pitch Deck</a>
              <a href="/?view=how-it-works" onClick={(e) => { e.preventDefault(); setView('how-it-works'); }}>📖 How It Works Guide</a>
              <a href="/?view=user-journey" onClick={(e) => { e.preventDefault(); setView('user-journey'); }}>👤 User Journey Timeline</a>
              <a href="/?view=excel-addin-docs" onClick={(e) => { e.preventDefault(); setView('excel-addin-docs'); }}>🔌 Excel Add-in Connect Guide</a>
              <a href="/?view=testing-guide" onClick={(e) => { e.preventDefault(); setView('testing-guide'); }}>🧪 Platform Testing Guide</a>
            </div>
          </li>

          <li><a href="#" onClick={(e) => { e.preventDefault(); setView('excel-addin-docs'); }} style={{ color: '#818CF8', fontWeight: 'bold' }}>Excel Add-in Guide 🔌</a></li>
          <li><a href="#" onClick={(e) => { e.preventDefault(); setView('nvidia-models'); }} style={{ color: '#10B981', fontWeight: 'bold' }}>NVIDIA Model Hub 🟢</a></li>
          <li><a href="#pricing" style={{ color: '#E2E8F0' }}>Pricing</a></li>
          <li>
            <button onClick={() => setView('landing')} className="nav-cta border-none cursor-pointer" style={{ background: 'transparent', border: '1px solid #00BFA5', color: '#00BFA5' }}>
              Back to V2 Home
            </button>
          </li>
        </ul>
      </nav>

      {/* ─── HERO ───────────────────────────────────────────────────── */}
      <section className="hero" style={{ paddingTop: '160px', paddingBottom: '100px', background: 'radial-gradient(circle at top center, #1E293B 0%, #0F172A 100%)' }}>
        <div className="hero-badge scroll-reveal fade-up" style={{ background: 'rgba(0,191,165,0.1)', color: '#00BFA5', border: '1px solid rgba(0,191,165,0.2)' }}>
          <span className="dot-pulse" style={{ background: '#00BFA5' }}></span>
          🚀 V3.0 Enterprise Governance Platform
        </div>
        <h1 className="scroll-reveal fade-up delay-100" style={{ color: '#fff' }}>
          DataTrust <span style={{ color: '#00BFA5' }}>Version 3.0</span>
        </h1>
        <p className="scroll-reveal fade-up delay-200" style={{ color: '#94A3B8', fontSize: '20px' }}>
          DataTrust V3.0 is an AI-powered data intelligence engine that automatically learns, predicts, and fixes data quality issues — while delivering governed data directly to Excel in real-time.
        </p>
        <div className="scroll-reveal fade-up delay-300" style={{ display: 'flex', gap: '32px', justifyContent: 'center', marginTop: '40px' }}>
          {[
            { label: 'Total Features', val: '45+', color: '#00BFA5' },
            { label: 'Feature Categories', val: '9', color: '#6366F1' },
            { label: 'Launch Timeline', val: '4 Phases', color: '#F59E0B' },
          ].map((s, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '32px', fontWeight: '800', color: s.color }}>{s.val}</div>
              <div style={{ fontSize: '13px', color: '#94A3B8', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── SUB-NAVIGATION NAVBAR ──────────────────────────────────── */}
      <div className="v3-subnav" style={{ position: 'sticky', top: '70px', zIndex: 100, background: 'rgba(15, 23, 42, 0.95)', backdropFilter: 'blur(10px)', borderBottom: '1px solid rgba(255,255,255,0.1)', padding: '0 5%' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', gap: '32px', overflowX: 'auto' }}>
          <button onClick={() => setActiveTab('overview')} style={{ background: 'none', border: 'none', color: activeTab === 'overview' ? '#00BFA5' : '#94A3B8', borderBottom: activeTab === 'overview' ? '2px solid #00BFA5' : '2px solid transparent', padding: '20px 0', fontSize: '15px', fontWeight: '600', cursor: 'pointer', whiteSpace: 'nowrap', transition: 'all 0.2s' }}>Overview & Features</button>
          <button onClick={() => setActiveTab('data-flow')} style={{ background: 'none', border: 'none', color: activeTab === 'data-flow' ? '#00BFA5' : '#94A3B8', borderBottom: activeTab === 'data-flow' ? '2px solid #00BFA5' : '2px solid transparent', padding: '20px 0', fontSize: '15px', fontWeight: '600', cursor: 'pointer', whiteSpace: 'nowrap', transition: 'all 0.2s' }}>End-to-End Data Flow</button>
          <button onClick={() => setActiveTab('excel-addin')} style={{ background: 'none', border: 'none', color: activeTab === 'excel-addin' ? '#00BFA5' : '#94A3B8', borderBottom: activeTab === 'excel-addin' ? '2px solid #00BFA5' : '2px solid transparent', padding: '20px 0', fontSize: '15px', fontWeight: '600', cursor: 'pointer', whiteSpace: 'nowrap', transition: 'all 0.2s' }}>Excel Add-in Guide</button>
          <button onClick={() => setActiveTab('notification')} style={{ background: 'none', border: 'none', color: activeTab === 'notification' ? '#00BFA5' : '#94A3B8', borderBottom: activeTab === 'notification' ? '2px solid #00BFA5' : '2px solid transparent', padding: '20px 0', fontSize: '15px', fontWeight: '600', cursor: 'pointer', whiteSpace: 'nowrap', transition: 'all 0.2s' }}>Notification System HLD/LLD</button>
          <button onClick={() => setActiveTab('autodoc')} style={{ background: 'none', border: 'none', color: activeTab === 'autodoc' ? '#00BFA5' : '#94A3B8', borderBottom: activeTab === 'autodoc' ? '2px solid #00BFA5' : '2px solid transparent', padding: '20px 0', fontSize: '15px', fontWeight: '600', cursor: 'pointer', whiteSpace: 'nowrap', transition: 'all 0.2s' }}>Auto-Documentation HLD</button>
          <button onClick={() => setActiveTab('semantic-search')} style={{ background: 'none', border: 'none', color: activeTab === 'semantic-search' ? '#00BFA5' : '#94A3B8', borderBottom: activeTab === 'semantic-search' ? '2px solid #00BFA5' : '2px solid transparent', padding: '20px 0', fontSize: '15px', fontWeight: '600', cursor: 'pointer', whiteSpace: 'nowrap', transition: 'all 0.2s' }}>Semantic Search HLD</button>
          <button onClick={() => setActiveTab('intelligence')} style={{ background: 'none', border: 'none', color: activeTab === 'intelligence' ? '#00BFA5' : '#94A3B8', borderBottom: activeTab === 'intelligence' ? '2px solid #00BFA5' : '2px solid transparent', padding: '20px 0', fontSize: '15px', fontWeight: '600', cursor: 'pointer', whiteSpace: 'nowrap', transition: 'all 0.2s' }}>AI-First Intelligence Layer</button>
          <button onClick={() => setActiveTab('model-training')} style={{ background: 'none', border: 'none', color: activeTab === 'model-training' ? '#00BFA5' : '#94A3B8', borderBottom: activeTab === 'model-training' ? '2px solid #00BFA5' : '2px solid transparent', padding: '20px 0', fontSize: '15px', fontWeight: '600', cursor: 'pointer', whiteSpace: 'nowrap', transition: 'all 0.2s' }}>AI Model Retraining HLD</button>
          <button onClick={() => setActiveTab('nvidia-models')} style={{ background: 'none', border: 'none', color: activeTab === 'nvidia-models' ? '#00BFA5' : '#94A3B8', borderBottom: activeTab === 'nvidia-models' ? '2px solid #00BFA5' : '2px solid transparent', padding: '20px 0', fontSize: '15px', fontWeight: '600', cursor: 'pointer', whiteSpace: 'nowrap', transition: 'all 0.2s' }}>NVIDIA Model Hub 🟢</button>
          <button onClick={() => setActiveTab('pipeline')} style={{ background: 'none', border: 'none', color: activeTab === 'pipeline' ? '#00BFA5' : '#94A3B8', borderBottom: activeTab === 'pipeline' ? '2px solid #00BFA5' : '2px solid transparent', padding: '20px 0', fontSize: '15px', fontWeight: '600', cursor: 'pointer', whiteSpace: 'nowrap', transition: 'all 0.2s' }}>Pipeline Engine HLD/LLD</button>
          <button onClick={() => setActiveTab('semantic-v2')} style={{ background: 'none', border: 'none', color: activeTab === 'semantic-v2' ? '#00BFA5' : '#94A3B8', borderBottom: activeTab === 'semantic-v2' ? '2px solid #00BFA5' : '2px solid transparent', padding: '20px 0', fontSize: '15px', fontWeight: '600', cursor: 'pointer', whiteSpace: 'nowrap', transition: 'all 0.2s' }}>Semantic Engine V2</button>
          <button onClick={() => setActiveTab('quality-v2')} style={{ background: 'none', border: 'none', color: activeTab === 'quality-v2' ? '#00BFA5' : '#94A3B8', borderBottom: activeTab === 'quality-v2' ? '2px solid #00BFA5' : '2px solid transparent', padding: '20px 0', fontSize: '15px', fontWeight: '600', cursor: 'pointer', whiteSpace: 'nowrap', transition: 'all 0.2s' }}>Quality Engine V2</button>
          <button onClick={() => setActiveTab('audit-v2')} style={{ background: 'none', border: 'none', color: activeTab === 'audit-v2' ? '#00BFA5' : '#94A3B8', borderBottom: activeTab === 'audit-v2' ? '2px solid #00BFA5' : '2px solid transparent', padding: '20px 0', fontSize: '15px', fontWeight: '600', cursor: 'pointer', whiteSpace: 'nowrap', transition: 'all 0.2s' }}>Audit Engine V2</button>
        </div>
      </div>

      {activeTab === 'overview' && (
        <>
          {/* ─── 5-LAYER INTELLIGENCE ARCHITECTURE ──────────────────────── */}
          <section id="architecture" style={{ padding: '100px 5%', background: '#0F172A' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
              <div className="section-label scroll-reveal fade-up" style={{ color: 'rgba(0,191,165,0.8)' }}>SYSTEM ARCHITECTURE</div>
              <h2 className="section-title scroll-reveal fade-up delay-100" style={{ color: '#fff', margin: '0 0 1rem' }}>5-Layer Intelligence Architecture</h2>
              <p className="section-subtitle scroll-reveal fade-up delay-200" style={{ color: '#94A3B8', margin: '0 auto 4rem', maxWidth: '800px' }}>
                A modular, scalable, and secure architecture designed to seamlessly integrate with your existing tech stack while adding a powerful layer of AI-driven intelligence.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
                {architectureLayers.map((layer, i) => (
                  <React.Fragment key={i}>
                    <div className={`scroll-reveal fade-up delay-${Math.min((i + 1) * 100, 500)}`} style={{ width: '100%', maxWidth: '900px', background: '#1E293B', border: `1px solid ${layer.color}40`, borderRadius: '16px', padding: '24px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', position: 'relative', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.2)' }}>
                      <div style={{ position: 'absolute', top: 0, left: 0, width: '4px', height: '100%', background: layer.color }}></div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                        <span style={{ fontSize: '13px', fontWeight: '800', color: layer.color, letterSpacing: '0.1em', textTransform: 'uppercase' }}>{layer.num}</span>
                      </div>

                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                        {layer.items.map((item, j) => (
                          <div key={j} style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', padding: '10px 16px', borderRadius: '8px', fontSize: '14px', color: '#E2E8F0', fontWeight: '700' }}>
                            <span style={{ fontSize: '16px' }}>{item.icon}</span>
                            <span>{item.text}</span>
                            {item.subtext && <span style={{ color: '#94A3B8', fontSize: '12px', fontWeight: '500', marginLeft: '4px' }}>{item.subtext}</span>}
                          </div>
                        ))}
                      </div>
                    </div>

                    {i < architectureLayers.length - 1 && (
                      <div className="scroll-reveal fade-up delay-200" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '50px', justifyContent: 'center' }}>
                        <div style={{ width: '28px', height: '28px', borderRadius: '50%', border: '1px solid #00BFA5', background: 'rgba(0,191,165,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#00BFA5' }}>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="12" y1="5" x2="12" y2="19"></line>
                            <polyline points="19 12 12 19 5 12"></polyline>
                          </svg>
                        </div>
                      </div>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </section>

          {/* ─── ML & LLM CONCEPTS DOCUMENTATION ──────────────────────── */}
          <section id="ml-concepts" style={{ padding: '100px 5%', background: '#0B1121' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
              <div className="section-label scroll-reveal fade-up" style={{ color: 'rgba(99,102,241,0.8)' }}>Intelligence Layer Architecture</div>
              <h2 className="section-title scroll-reveal fade-up delay-100" style={{ color: '#fff', margin: '0 0 1rem' }}>ML & LLM Concepts Documentation</h2>
              <p className="section-subtitle scroll-reveal fade-up delay-200" style={{ color: '#94A3B8', margin: '0 0 3rem', maxWidth: '700px' }}>
                DataTrust V3.0 uses LangChain + Groq + OpenAI for LLM, pgvector for semantic search, Prophet + XGBoost for predictive quality, and a fallback chain for absolute reliability.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '24px' }}>
                {mlConcepts.map((concept, i) => (
                  <div key={i} className={`ml-concept-card scroll-reveal fade-up delay-${Math.min((i % 3 + 1) * 100, 500)}`}>
                    <div className="ml-concept-header">
                      <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#F8FAFC', marginBottom: '8px' }}>{concept.title}</h3>
                      <div style={{ fontSize: '13px', color: '#00BFA5', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <Code size={14} /> {concept.tech}
                      </div>
                    </div>
                    <div className="ml-concept-body">
                      <p style={{ color: '#CBD5E1', fontSize: '14px', lineHeight: '1.6', marginBottom: '20px' }}>{concept.desc}</p>

                      <div style={{ background: '#0D1117', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '8px', padding: '16px', marginBottom: '20px' }}>
                        <div style={{ fontSize: '11px', color: '#64748B', textTransform: 'uppercase', fontWeight: '700', letterSpacing: '0.06em', marginBottom: '8px' }}>Real Example</div>
                        <pre style={{ margin: 0, color: '#94A3B8', fontSize: '12px', fontFamily: 'var(--font-mono)', whiteSpace: 'pre-wrap', lineHeight: '1.5' }}>
                          {concept.example}
                        </pre>
                      </div>

                      <div>
                        {concept.stack.map(s => <span key={s} className="ml-stack-badge">{s}</span>)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="scroll-reveal scale-in delay-300" style={{ background: 'linear-gradient(135deg, rgba(99,102,241,0.1), rgba(0,191,165,0.1))', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px', padding: '32px', marginTop: '40px', display: 'flex', alignItems: 'center', gap: '20px' }}>
                <div style={{ background: 'rgba(255,255,255,0.05)', padding: '16px', borderRadius: '50%', color: '#00BFA5' }}><Brain size={32} /></div>
                <div>
                  <h4 style={{ color: '#fff', fontSize: '18px', marginBottom: '6px' }}>Complete ML/LLM Stack Summary</h4>
                  <p style={{ color: '#94A3B8', fontSize: '14px', lineHeight: '1.6', margin: 0 }}>
                    <strong>Orchestration:</strong> LangChain • <strong>Fast LLM:</strong> Groq (Llama 3.3 70B) • <strong>Accurate LLM:</strong> OpenAI (GPT-4o) • <strong>Local LLM:</strong> Ollama (Llama 3.2 3B) • <strong>Vector DB:</strong> pgvector • <strong>Time-Series:</strong> Prophet (Meta) • <strong>ML Models:</strong> XGBoost, Isolation Forest
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* ─── HLD DIAGRAMS ─────────────────────────────────────────── */}
          <section id="hld-diagrams" style={{ padding: '100px 5%', background: '#0F172A' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
              <div className="section-label scroll-reveal fade-up" style={{ color: 'rgba(0,191,165,0.8)' }}>High-Level Design</div>
              <h2 className="section-title scroll-reveal fade-up delay-100" style={{ color: '#fff', margin: '0 0 1rem' }}>Complete System Architecture</h2>
              <p className="section-subtitle scroll-reveal fade-up delay-200" style={{ color: '#94A3B8', margin: '0 0 3rem', maxWidth: '700px' }}>
                A detailed look at the internal pipelines, data flows, and tech stacks powering the DataTrust V3.0 Intelligence layer.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                {hldDiagrams.map((hld, i) => (
                  <div key={i} className={`hld-card scroll-reveal fade-up delay-${Math.min((i % 4 + 1) * 100, 500)}`} style={{ background: '#1E293B', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px', overflow: 'hidden' }}>
                    <div style={{ padding: '20px 24px', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
                      <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#F8FAFC', margin: 0 }}>{hld.title}</h3>
                      <div style={{ fontSize: '12px', color: '#00BFA5', fontFamily: 'var(--font-mono, monospace)', background: 'rgba(0,191,165,0.1)', padding: '6px 12px', borderRadius: '6px' }}>Stack: {hld.tech}</div>
                    </div>
                    <div style={{ padding: '24px', overflowX: 'auto', background: '#0D1117' }}>
                      <pre style={{ margin: 0, color: '#7EE7B8', fontSize: '12px', fontFamily: 'var(--font-mono, monospace)', lineHeight: '1.4', minWidth: '800px' }}>
                        {hld.diagram}
                      </pre>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ─── COMPLETE 45+ FEATURE LIST ────────────────────────────── */}
          <section className="features" id="features" style={{ background: '#0F172A', padding: '100px 5%' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
              <div className="section-label scroll-reveal fade-up" style={{ color: 'rgba(0,191,165,0.8)' }}>V3.0 Feature Breakdown</div>
              <h2 className="section-title scroll-reveal fade-up delay-100" style={{ color: '#fff' }}>9 Categories. 45+ New Features.</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '24px', marginTop: '40px' }}>
                {v3Features.map((f, i) => (
                  <div key={i} className={`v3-feature-card scroll-reveal fade-up delay-${Math.min((i % 4 + 1) * 100, 500)}`}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                      <div style={{ fontSize: '32px' }}>{f.icon}</div>
                      <span style={{ fontSize: '10px', fontWeight: '700', padding: '4px 10px', borderRadius: '999px', background: 'rgba(255,255,255,0.05)', color: '#CBD5E1', border: '1px solid rgba(255,255,255,0.1)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                        {f.badge}
                      </span>
                    </div>
                    <div style={{ fontSize: '11px', fontWeight: '700', color: '#00BFA5', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '6px' }}>{f.category}</div>
                    <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#F8FAFC', marginBottom: '10px' }}>{f.title}</h3>
                    <p style={{ color: '#94A3B8', fontSize: '14px', lineHeight: '1.6', marginBottom: '20px' }}>{f.desc}</p>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      {f.items.map((item, j) => {
                        const statusStyle = getStatusColor(item.status);
                        return (
                          <div key={j} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 12px', background: 'rgba(0,0,0,0.2)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.03)' }}>
                            <span style={{ color: '#CBD5E1', fontSize: '13px', fontWeight: '500' }}>{item.name}</span>
                            <span style={{ fontSize: '10px', fontWeight: '700', background: statusStyle.bg, color: statusStyle.text, border: `1px solid ${statusStyle.border}`, padding: '3px 8px', borderRadius: '999px' }}>
                              {item.status}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ─── NLQ SHOWCASE ─────────────────────────────────────────── */}
          <section style={{ padding: '100px 5%', background: '#0B1121' }} id="nlq">
            <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', alignItems: 'center' }}>
                <div>
                  <div className="section-label scroll-reveal fade-up" style={{ color: 'rgba(99,102,241,0.8)', marginBottom: '1rem' }}>Live Demo — Category 2</div>
                  <h2 className="section-title scroll-reveal fade-up delay-100" style={{ color: '#fff', textAlign: 'left', margin: '0 0 1.2rem', fontSize: '36px' }}>
                    Ask in plain English.<br />Get live data in Excel.
                  </h2>
                  <p className="section-subtitle scroll-reveal fade-up delay-200" style={{ color: '#94A3B8', textAlign: 'left', margin: '0 0 2rem', maxWidth: '480px' }}>
                    No SQL. No DAX. No data engineer. Just type your question — DataTrust NLQ translates it to validated SQL using pgvector semantic search + LLM, runs it on your warehouse, and puts the result in Excel in under 2 seconds.
                  </p>
                  <div className="scroll-reveal fade-up delay-300" style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '28px' }}>
                    {[
                      { icon: '🔍', text: 'pgvector semantic search finds your metric context' },
                      { icon: '🧠', text: 'LLM generates validated, safe SQL (Groq + OpenAI)' },
                      { icon: '✅', text: 'Quality Engine validates result before it hits Excel' },
                      { icon: '⚡', text: 'Under 2 seconds end-to-end, 90%+ accuracy' },
                    ].map((item, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                        <span style={{ fontSize: '18px', flexShrink: 0, marginTop: '2px' }}>{item.icon}</span>
                        <span style={{ color: '#CBD5E1', fontSize: '15px', lineHeight: '1.6' }}>{item.text}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="scroll-reveal fade-left delay-200">
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
                    <div style={{ fontSize: '11px', fontWeight: '700', color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '4px' }}>Try a question:</div>
                    {nlqDemos.map((d, i) => (
                      <button key={i}
                        onClick={() => handleNlqDemo(i)}
                        style={{
                          textAlign: 'left', padding: '10px 14px', borderRadius: '10px',
                          border: `1px solid ${nlqActiveDemo === i ? '#6366F1' : 'rgba(255,255,255,0.1)'}`,
                          background: nlqActiveDemo === i ? 'rgba(99,102,241,0.1)' : 'rgba(255,255,255,0.03)',
                          cursor: 'pointer', fontSize: '13px',
                          color: nlqActiveDemo === i ? '#818CF8' : '#94A3B8',
                          fontWeight: nlqActiveDemo === i ? '600' : '400',
                          transition: 'all 0.2s',
                        }}
                      >
                        💬 {d.q}
                      </button>
                    ))}
                  </div>

                  <div className="nlq-terminal">
                    <div className="nlq-topbar">
                      <div className="nlq-dot" style={{ background: '#FF5F57' }} />
                      <div className="nlq-dot" style={{ background: '#FFBD2E' }} />
                      <div className="nlq-dot" style={{ background: '#28C840' }} />
                      <span style={{ marginLeft: '8px', fontSize: '12px', color: 'rgba(255,255,255,0.4)', fontWeight: '600' }}>DataTrust NLQ — Excel Ribbon</span>
                    </div>

                    <div className="nlq-input-row">
                      <span style={{ fontSize: '12px', color: '#6366F1', fontWeight: '700', flexShrink: 0 }}>💬 NLQ</span>
                      <div className="nlq-input-display">
                        {nlqQuery || <span style={{ color: 'rgba(255,255,255,0.3)' }}>Select a question above to see NLQ in action...</span>}
                        {nlqLoading && <span className="nlq-cursor" />}
                      </div>
                    </div>

                    {nlqLoading && (
                      <div style={{ padding: '14px 20px', display: 'flex', alignItems: 'center', gap: '10px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                        <div className="nlq-spinner" />
                        <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)' }}>Embedding query → Semantic search → LLM generating SQL...</span>
                      </div>
                    )}

                    {nlqResult && !nlqLoading && (
                      <>
                        <div className="nlq-sql-block">
                          <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.3)', fontWeight: '700', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '6px' }}>↳ Generated SQL</div>
                          <code style={{ wordBreak: 'break-word' }}>{nlqResult.sql}</code>
                        </div>
                        <div className="nlq-result-block">
                          <div>
                            <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '4px' }}>Result</div>
                            <div style={{ fontSize: '22px', fontWeight: '800', color: '#00BFA5' }}>{nlqResult.result}</div>
                          </div>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', alignItems: 'flex-end' }}>
                            <span style={{ background: 'rgba(16,185,129,0.15)', border: '1px solid rgba(16,185,129,0.3)', color: '#34D399', padding: '4px 10px', borderRadius: '6px', fontSize: '11px', fontWeight: '700' }}>✓ Validated</span>
                            <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '11px' }}>Confidence: {nlqResult.conf}%</span>
                            <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '11px' }}>⚡ {nlqResult.time}</span>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ─── V3.0 ROADMAP ───────────────────────────────────────────── */}
          <section style={{ padding: '100px 5%', backgroundColor: '#0F172A' }} id="roadmap">
            <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
              <div className="section-label scroll-reveal fade-up" style={{ color: 'rgba(0,191,165,0.8)', marginBottom: '1rem' }}>Implementation Roadmap</div>
              <h2 className="section-title scroll-reveal fade-up delay-100" style={{ color: '#fff', margin: '0 0 1rem' }}>V3.0 — 4-Phase Development Plan</h2>

              <div className="scroll-reveal fade-up delay-300" style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center', marginBottom: '32px' }}>
                {roadmapPhases.map(rp => (
                  <button
                    key={rp.phase}
                    className={`roadmap-phase-btn${activeRoadmapPhase === rp.phase ? ' active' : ''}`}
                    onClick={() => setActiveRoadmapPhase(rp.phase)}
                  >
                    {rp.label}: {rp.quarter}
                  </button>
                ))}
              </div>

              {roadmapPhases.filter(rp => rp.phase === activeRoadmapPhase).map(rp => (
                <div key={rp.phase} className="roadmap-phase-card" style={{ animation: 'fadeIn 0.5s ease-out' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px', flexWrap: 'wrap' }}>
                    <div style={{ background: rp.color, color: '#fff', borderRadius: '12px', padding: '6px 18px', fontWeight: '700', fontSize: '14px' }}>{rp.quarter}</div>
                    <h3 style={{ fontSize: '24px', fontWeight: '800', color: '#F8FAFC', margin: 0 }}>{rp.title}</h3>
                  </div>
                  <p style={{ color: '#94A3B8', fontSize: '15px', lineHeight: '1.8', marginBottom: '24px', maxWidth: '700px' }}>{rp.desc}</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                    {rp.features.map((feat, fi) => (
                      <span key={fi} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '7px 16px', borderRadius: '999px', background: `${rp.color}15`, border: `1px solid ${rp.color}40`, color: rp.color, fontWeight: '600', fontSize: '13px' }}>
                        ✓ {feat}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ─── V2.0 vs V3.0 IMPACT ─────────────────────── */}
          <section style={{ padding: '100px 5%', background: '#0B1121' }} id="impact">
            <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
              <div className="section-label scroll-reveal fade-up" style={{ color: 'rgba(0,191,165,0.8)', marginBottom: '1rem' }}>V2.0 → V3.0 Impact</div>
              <h2 className="section-title scroll-reveal fade-up delay-100" style={{ color: '#fff' }}>Measurable improvements. Every metric.</h2>
              <div className="scroll-reveal scale-in delay-300" style={{ borderRadius: '16px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)', marginTop: '40px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1.2fr', background: '#1E293B', padding: '14px 20px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                  <div style={{ fontSize: '12px', fontWeight: '700', color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Metric</div>
                  <div style={{ fontSize: '12px', fontWeight: '700', color: '#EF4444', textTransform: 'uppercase', letterSpacing: '0.06em' }}>V2.0</div>
                  <div style={{ fontSize: '12px', fontWeight: '700', color: '#00BFA5', textTransform: 'uppercase', letterSpacing: '0.06em' }}>V3.0</div>
                  <div style={{ fontSize: '12px', fontWeight: '700', color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Improvement</div>
                </div>
                <div style={{ background: '#0F172A' }}>
                  {[
                    { metric: 'Manual Excel work reduction', v2: '70%', v3: '90%', delta: '+20%', pos: true },
                    { metric: 'Data quality issues caught', v2: '80%', v3: '95%', delta: '+15%', pos: true },
                    { metric: 'Audit preparation time', v2: '1 hour', v3: '15 min', delta: '-75%', pos: false },
                    { metric: 'DAX migration time', v2: '2 days', v3: '1 hour', delta: '-95%', pos: false },
                    { metric: 'Rule creation time', v2: '1 hour', v3: '5 min', delta: '-92%', pos: false },
                    { metric: 'NLQ response time', v2: 'N/A', v3: '< 2 sec', delta: 'NEW', pos: true },
                    { metric: 'User adoption', v2: '80%', v3: '95%', delta: '+15%', pos: true },
                  ].map((row, i) => (
                    <div key={i} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1.2fr', alignItems: 'center', padding: '16px 20px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                      <div style={{ fontWeight: '600', fontSize: '14px', color: '#E2E8F0' }}>{row.metric}</div>
                      <div style={{ fontSize: '14px', color: '#EF4444', fontWeight: '700' }}>{row.v2}</div>
                      <div style={{ fontSize: '14px', color: '#10B981', fontWeight: '700' }}>{row.v3}</div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontSize: '12px', fontWeight: '700', padding: '3px 10px', borderRadius: '999px', background: row.pos ? 'rgba(16,185,129,0.12)' : 'rgba(239,68,68,0.1)', color: row.pos ? '#059669' : '#DC2626' }}>{row.delta}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* ─── PRICING ────────────────────────────────────────────── */}
          <section className="pricing" id="pricing" style={{ backgroundColor: '#0F172A', padding: '100px 5%' }}>
            <div className="section-label scroll-reveal fade-up" style={{ color: 'rgba(0,191,165,0.8)' }}>V3.0 Pricing</div>
            <h2 className="section-title scroll-reveal fade-up delay-100" style={{ color: '#fff' }}>Transparent plans. Measurable ROI.</h2>
            <div className="pricing-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', marginTop: '40px' }}>
              <div className="plan-card scroll-reveal fade-up delay-200">
                <div className="plan-name">Starter</div>
                <div className="plan-price">₹15L</div>
                <div className="plan-users">Up to 10 users · Annual</div>
                <ul className="plan-features">
                  <li>Excel Add-in V3</li>
                  <li>Semantic Layer</li>
                  <li>AI Rule Inference</li>
                  <li>Audit Trail</li>
                </ul>
                <div className="plan-roi">ROI: 5x</div>
              </div>
              <div className="plan-card popular scroll-reveal fade-up delay-400">
                <div className="popular-badge">Most Popular</div>
                <div className="plan-name">Enterprise</div>
                <div className="plan-price">₹50L</div>
                <div className="plan-users">Up to 50 users · Annual</div>
                <ul className="plan-features">
                  <li>Predictive Quality</li>
                  <li>Auto-Correction V2</li>
                  <li>RBAC &amp; SSO</li>
                  <li>Workspaces</li>
                </ul>
                <div className="plan-roi">ROI: 20x</div>
              </div>
              <div className="plan-card scroll-reveal fade-up delay-600">
                <div className="plan-name">Ultimate</div>
                <div className="plan-price">₹1 Cr</div>
                <div className="plan-users">Unlimited users · Annual</div>
                <ul className="plan-features">
                  <li>Custom LLM</li>
                  <li>24/7 Support</li>
                  <li>Dedicated CSM</li>
                  <li>SOC2 Audit Pack</li>
                </ul>
                <div className="plan-roi">ROI: 50x</div>
              </div>
            </div>
          </section>
        </>
      )}

      {activeTab === 'notification' && <NotificationSystemDocs />}
      {activeTab === 'intelligence' && <IntelligenceLayerDocs />}
      {activeTab === 'pipeline' && <PipelineEngineDocs />}
      {activeTab === 'semantic-v2' && <SemanticEngineV2Docs />}
      {activeTab === 'quality-v2' && <QualityEngineV2Docs />}
      {activeTab === 'audit-v2' && <AuditEngineV2Docs />}
      {activeTab === 'data-flow' && <DataFlowDocs />}
      {activeTab === 'excel-addin' && <ExcelAddinDocs />}
      {activeTab === 'model-training' && <ModelTrainingDocs />}
      {activeTab === 'nvidia-models' && <NvidiaModelsDocs />}
      {activeTab === 'autodoc' && <AutoDocDocs />}
      {activeTab === 'semantic-search' && <SemanticSearchDocs />}

      {/* ─── FOOTER ─────────────────────────────────────────────────── */}
      <Footer setView={setView} />
    </div>
  );
}
