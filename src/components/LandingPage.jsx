import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, RefreshCw } from './Icons';
import Footer from './Footer';
import logoImg from '../assets/DataTrust-Logo.png';

export default function LandingPage({ onEnterWorkspace, setView }) {
  const [activeCase, setActiveCase] = useState('reporting');
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

    document.querySelectorAll('.flow-animate, .scroll-reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const v2Features = [
    { name: 'Semantic Engine (CSM)', desc: 'One definition per metric, full version history, lineage' },
    { name: 'Excel Add-in (Live Connector)', desc: 'One-click refresh, formula auto-correction, validation' },
    { name: 'Quality Engine', desc: 'Rule inference, anomaly detection, business-language alerts' },
    { name: 'Audit Engine', desc: 'Full immutable change log, 1-second audit query' },
    { name: 'DAX → SQL Translator', desc: 'Rule-based + LLM fallback, 10-stage pipeline' },
    { name: 'Pipeline Engine', desc: '5 stages: Select, Configure, Validate, Monitor, Publish' },
    { name: 'Connection Management', desc: 'Snowflake, Databricks, Fabric — JDBC + Non-JDBC' },
    { name: 'Role-Based Dashboards', desc: '8 roles, each with a purpose-built surface' },
    { name: 'Business Alerts System', desc: 'Plain-language, actionable alerts with owner routing' },
    { name: 'Data Lineage', desc: 'Column-to-Excel traceability, full transformation log' },
    { name: 'Admin Console', desc: 'Users, connections, security, system preferences' },
    { name: 'PostgreSQL Metadata Store', desc: 'Persistent metadata, runs, audit log' },
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

  const v3Features = [
    {
      icon: '🧠', category: 'AI & Automation', badge: 'V3.0 NEW',
      title: 'AI Intelligence Layer',
      desc: 'Self-learning rule inference, predictive quality degradation forecasting, auto-correction with rollback, and AI-generated documentation — all autonomous.',
      items: ['AI Rule Inference V2', 'Predictive Quality Engine', 'Auto-Correction V2', 'Auto-Documentation', 'AI Recommendations'],
    },
    {
      icon: '💬', category: 'Natural Language Query', badge: 'V3.0 NEW',
      title: 'Ask in Plain English',
      desc: 'Type "What was Q4 Revenue for West region?" and get a live, validated, lineage-attached result in Excel in under 2 seconds. No SQL, no DAX.',
      items: ['NLQ → SQL in < 2 sec', 'pgvector semantic search', 'RAG-powered accuracy', '90%+ translation accuracy', 'NLQ in Excel ribbon'],
    },
    {
      icon: '🌐', category: 'Multi-Cloud Connectivity', badge: 'V3.0 NEW',
      title: 'Every Cloud, Every Stack',
      desc: 'V3.0 adds Redshift, BigQuery, Azure SQL, dbt, Looker, and Tableau on top of the existing Snowflake + Databricks + Fabric support.',
      items: ['Amazon Redshift', 'Google BigQuery', 'Azure SQL', 'dbt integration', 'Looker + Tableau sync'],
    },
    {
      icon: '🧩', category: 'Semantic Layer', badge: 'Core',
      title: 'One Source of Truth',
      desc: 'One definition for every metric. Revenue is Revenue — for Finance, Sales, and the CFO — always the same number, everywhere.',
      items: ['Canonical metric definitions', 'Full version history', 'Column-level lineage', 'V3: vector embeddings', 'Semantic search'],
    },
    {
      icon: '⚡', category: 'Excel Add-in V3', badge: 'V3.0 NEW',
      title: 'Excel Transformed',
      desc: 'Dashboard builder, real-time collaboration, template marketplace, NLQ in the ribbon, and Power BI push — all inside Excel.',
      items: ['Excel dashboard builder', 'Real-time collaboration', 'Template marketplace', 'NLQ in Excel ribbon', 'Power BI integration'],
    },
    {
      icon: '👥', category: 'Team Collaboration', badge: 'V3.0 NEW',
      title: 'Workspaces & Governance',
      desc: 'Department workspaces, column-level security, approval workflow V2 with multi-approver chains, and pre-change impact analysis.',
      items: ['Team workspaces', 'Fine-grained permissions', 'Approval workflows V2', 'Impact analysis V2', 'Data Catalog V2'],
    },
    {
      icon: '📜', category: 'Audit & Compliance V3', badge: 'V3.0 NEW',
      title: 'Zero-Effort Compliance',
      desc: 'Pre-built GDPR, SOC2, SOX, HIPAA audit packs. Data masking, retention policies, and real-time compliance dashboard.',
      items: ['Pre-built compliance reports', 'Data masking (PII)', 'Data retention policies', 'Column-level lineage V3', 'Audit trail V3 + export'],
    },
    {
      icon: '🚀', category: 'Performance & Scale', badge: 'V3.0 NEW',
      title: 'Enterprise-Grade Scale',
      desc: 'Redis semantic caching, Kafka-driven pipeline parallelism, Kubernetes-native deployment with HPA, auto-scaling to zero at idle.',
      items: ['Redis semantic cache', 'Kafka event bus', 'Kubernetes + Helm', 'Auto-scaling HPA', 'Data partitioning (1B+ rows)'],
    },
    {
      icon: '🔌', category: 'Ecosystem & APIs', badge: 'V3.0 NEW',
      title: 'Open & Extensible',
      desc: 'Full public REST API, webhooks, plugin system, Python/JS/Java SDKs, CI/CD connectors, and Slack/Teams with action buttons.',
      items: ['Open REST API V3', 'Webhooks', 'Plugin system', 'Python / JS / Java SDKs', 'GitHub Actions / GitLab CI'],
    },
  ];

  const nlqDemos = [
    { q: 'What was Q4 Revenue for West region?', sql: 'SELECT SUM(revenue) FROM sales WHERE quarter=4 AND region=\'West\'', result: '₹1.1 Cr', conf: 97, time: '1.8s' },
    { q: 'Show top 5 products by units sold this month', sql: 'SELECT product, SUM(units) as total FROM sales WHERE month=CURRENT_MONTH GROUP BY product ORDER BY total DESC LIMIT 5', result: '5 rows returned', conf: 94, time: '2.1s' },
    { q: 'Which regions had data quality anomalies last week?', sql: 'SELECT region, COUNT(*) as anomalies FROM quality_log WHERE severity=\'HIGH\' AND created_at >= NOW()-INTERVAL 7 DAY GROUP BY region', result: 'West, North (2 regions)', conf: 96, time: '1.5s' },
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

  return (
    <div className="landing-layout">
      {/* ─── GLOBAL STYLES ──────────────────────────────────────────── */}
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
        .flow-animate.visible { opacity: 1; transform: translateY(0); }
        .flow-animate.visible::before { background: currentColor; box-shadow: 0 0 10px currentColor; }
        .flow-delay-1 { transition-delay: 0.1s; color: #EF4444; }
        .flow-delay-2 { transition-delay: 0.3s; color: #10B981; }
        .flow-delay-3 { transition-delay: 0.5s; color: #3B82F6; }

        .scroll-reveal {
          opacity: 0;
          transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
          will-change: transform, opacity;
        }
        .scroll-reveal.fade-up    { transform: translateY(30px); }
        .scroll-reveal.fade-down  { transform: translateY(-30px); }
        .scroll-reveal.fade-left  { transform: translateX(30px); }
        .scroll-reveal.fade-right { transform: translateX(-30px); }
        .scroll-reveal.scale-in   { transform: scale(0.95); }
        .scroll-reveal.visible    { opacity: 1; transform: translate(0) scale(1); }

        .delay-100 { transition-delay: 0.1s; }
        .delay-200 { transition-delay: 0.2s; }
        .delay-300 { transition-delay: 0.3s; }
        .delay-400 { transition-delay: 0.4s; }
        .delay-500 { transition-delay: 0.5s; }
        .delay-600 { transition-delay: 0.6s; }
        .delay-700 { transition-delay: 0.7s; }
        .delay-800 { transition-delay: 0.8s; }

        .case-content.active {
          animation: caseFadeIn 0.4s ease forwards;
        }
        @keyframes caseFadeIn {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* V3 Feature Cards */
        .v3-feature-card {
          background: #fff;
          border: 1px solid #E2E8F0;
          border-radius: 20px;
          padding: 32px 28px;
          transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
          position: relative;
          overflow: hidden;
        }
        .v3-feature-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 50px rgba(0,0,0,0.1);
          border-color: #00BFA5;
        }
        .v3-badge-new {
          display: inline-block;
          font-size: 10px;
          font-weight: 700;
          padding: 3px 10px;
          border-radius: 999px;
          background: linear-gradient(135deg, #00BFA5, #6366F1);
          color: #fff;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          margin-bottom: 12px;
        }
        .v3-badge-core {
          display: inline-block;
          font-size: 10px;
          font-weight: 700;
          padding: 3px 10px;
          border-radius: 999px;
          background: rgba(0,191,165,0.12);
          color: #00875A;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          border: 1px solid rgba(0,191,165,0.3);
          margin-bottom: 12px;
        }

        /* Roadmap */
        .roadmap-phase-btn {
          padding: 10px 20px;
          border-radius: 999px;
          border: 1px solid #E2E8F0;
          background: #fff;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
          color: #475569;
        }
        .roadmap-phase-btn.active {
          background: var(--navy);
          color: #fff;
          border-color: var(--navy);
        }
        .roadmap-phase-card {
          background: #fff;
          border: 1px solid #E2E8F0;
          border-radius: 20px;
          padding: 40px;
          animation: caseFadeIn 0.35s ease;
        }

        /* V2 foundation table */
        .v2-table { width: 100%; border-collapse: collapse; }
        .v2-table th {
          background: var(--navy);
          color: #fff;
          padding: 12px 20px;
          text-align: left;
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 0.04em;
        }
        .v2-table th:first-child { border-radius: 8px 0 0 0; }
        .v2-table th:last-child  { border-radius: 0 8px 0 0; }
        .v2-table td {
          padding: 13px 20px;
          border-bottom: 1px solid #F1F5F9;
          font-size: 14px;
          color: #334155;
          vertical-align: top;
        }
        .v2-table tr:last-child td { border-bottom: none; }
        .v2-table tr:hover td { background: #F8FAFC; }
        .status-dot-green {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          color: #059669;
          font-weight: 700;
          font-size: 13px;
        }
        .status-dot-green::before {
          content: '';
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #10B981;
          display: inline-block;
          box-shadow: 0 0 6px #10B981;
        }

        /* Metrics Cards */
        .metric-card {
          background: #fff;
          border: 1px solid #E2E8F0;
          border-radius: 16px;
          padding: 28px 24px;
          text-align: center;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .metric-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 32px rgba(0,0,0,0.08);
        }
        .metric-card .metric-val {
          font-size: 36px;
          font-weight: 800;
          color: var(--teal);
          line-height: 1;
          margin-bottom: 8px;
        }
        .metric-card .metric-label {
          font-size: 14px;
          color: #64748B;
          line-height: 1.5;
          font-weight: 500;
        }

        /* Enterprise case */
        .enterprise-row {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 0;
          border: 1px solid #E2E8F0;
          border-radius: 16px;
          overflow: hidden;
        }
        .enterprise-col {
          padding: 20px 24px;
          border-right: 1px solid #E2E8F0;
        }
        .enterprise-col:last-child { border-right: none; }
        @media (max-width: 768px) {
          .enterprise-row { grid-template-columns: 1fr; }
          .enterprise-col { border-right: none; border-bottom: 1px solid #E2E8F0; }
          .enterprise-col:last-child { border-bottom: none; }
        }

        /* Ultimate plan card glow */
        .plan-card.ultimate {
          background: linear-gradient(135deg, var(--navy) 0%, #1a2744 100%);
          border: 1.5px solid rgba(0,191,165,0.5);
          box-shadow: 0 0 40px rgba(0,191,165,0.15);
          color: #fff;
        }
        .plan-card.ultimate .plan-name { color: var(--teal); }
        .plan-card.ultimate .plan-price { color: #fff; }
        .plan-card.ultimate .plan-users { color: rgba(255,255,255,0.6); }
        .plan-card.ultimate .plan-features li { color: rgba(255,255,255,0.8); }
        .plan-card.ultimate .plan-features li::before { color: var(--teal); }
        .plan-card.ultimate .plan-roi { color: var(--teal); border-color: rgba(0,191,165,0.3); }

        /* Architecture Section */
        .arch-layer {
          border-radius: 16px;
          padding: 20px 24px;
          margin-bottom: 12px;
          border: 1px solid rgba(255,255,255,0.08);
          transition: transform 0.25s ease, box-shadow 0.25s ease;
          position: relative;
          overflow: hidden;
        }
        .arch-layer:hover { transform: translateY(-3px); box-shadow: 0 16px 40px rgba(0,0,0,0.35); }
        .arch-layer::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.03) 0%, transparent 60%);
          pointer-events: none;
        }
        .arch-component {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 14px;
          border-radius: 8px;
          font-size: 12px;
          font-weight: 600;
          border: 1px solid rgba(255,255,255,0.1);
          background: rgba(255,255,255,0.05);
          color: rgba(255,255,255,0.85);
          margin: 4px;
          white-space: nowrap;
          transition: all 0.2s ease;
          cursor: default;
        }
        .arch-component:hover {
          background: rgba(255,255,255,0.12);
          border-color: rgba(255,255,255,0.25);
          transform: scale(1.04);
        }
        .arch-connector {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 28px;
          position: relative;
        }
        .arch-connector::before {
          content: '';
          position: absolute;
          width: 2px;
          height: 100%;
          background: linear-gradient(to bottom, rgba(0,191,165,0.6), rgba(99,102,241,0.4));
        }
        .arch-arrow {
          position: relative;
          z-index: 1;
          background: rgba(0,191,165,0.15);
          border: 1px solid rgba(0,191,165,0.3);
          border-radius: 50%;
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          color: #00BFA5;
          animation: pulse-down 2s infinite;
        }
        @keyframes pulse-down {
          0%, 100% { transform: translateY(0); opacity: 1; }
          50% { transform: translateY(4px); opacity: 0.6; }
        }
        @keyframes typing-cursor {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }

        /* NLQ Showcase */
        .nlq-terminal {
          background: #0D1117;
          border-radius: 16px;
          border: 1px solid rgba(255,255,255,0.08);
          overflow: hidden;
          box-shadow: 0 30px 80px rgba(0,0,0,0.5);
        }
        .nlq-topbar {
          background: #161B22;
          padding: 12px 16px;
          display: flex;
          align-items: center;
          gap: 8px;
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }
        .nlq-dot { width: 10px; height: 10px; border-radius: 50%; }
        .nlq-input-row {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 16px 20px;
          background: #0D1117;
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }
        .nlq-input-display {
          flex: 1;
          background: rgba(99,102,241,0.08);
          border: 1px solid rgba(99,102,241,0.25);
          border-radius: 8px;
          padding: 10px 14px;
          font-size: 14px;
          color: rgba(255,255,255,0.9);
          font-family: var(--font-mono, monospace);
          min-height: 42px;
          display: flex;
          align-items: center;
        }
        .nlq-cursor { display: inline-block; width: 2px; height: 16px; background: #6366F1; margin-left: 2px; animation: typing-cursor 1s infinite; vertical-align: middle; }
        .nlq-sql-block {
          padding: 14px 20px;
          background: #161B22;
          border-bottom: 1px solid rgba(255,255,255,0.06);
          font-family: var(--font-mono, 'Courier New', monospace);
          font-size: 12px;
          color: #7EE7B8;
          line-height: 1.6;
        }
        .nlq-result-block {
          padding: 16px 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 12px;
        }
        .nlq-spinner {
          width: 20px; height: 20px;
          border: 2px solid rgba(99,102,241,0.2);
          border-top-color: #6366F1;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
          flex-shrink: 0;
        }
        @keyframes spin { to { transform: rotate(360deg); } }

        /* Business Impact */
        .impact-row {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1.2fr;
          align-items: center;
          padding: 16px 20px;
          border-bottom: 1px solid #F1F5F9;
          transition: background 0.2s;
        }
        .impact-row:hover { background: #F8FAFC; }
        .impact-row:last-child { border-bottom: none; }
        .impact-bar-wrap { display: flex; align-items: center; gap: 8px; }
        .impact-bar {
          height: 8px;
          border-radius: 999px;
          flex: 1;
          background: #F1F5F9;
          overflow: hidden;
        }
        .impact-bar-fill {
          height: 100%;
          border-radius: 999px;
          transition: width 1s ease;
        }
        .impact-delta {
          font-size: 12px;
          font-weight: 700;
          padding: 3px 10px;
          border-radius: 999px;
        }
        .delta-pos { background: rgba(16,185,129,0.12); color: #059669; }
        .delta-neg { background: rgba(239,68,68,0.1); color: #DC2626; }

        /* Connector Grid */
        .connector-card {
          background: #fff;
          border: 1px solid #E2E8F0;
          border-radius: 14px;
          padding: 20px 18px;
          text-align: center;
          transition: transform 0.2s, box-shadow 0.2s, border-color 0.2s;
          position: relative;
          cursor: default;
        }
        .connector-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 32px rgba(0,0,0,0.08);
          border-color: #00BFA5;
        }
        .connector-badge {
          position: absolute;
          top: 10px;
          right: 10px;
          font-size: 9px;
          font-weight: 700;
          padding: 2px 8px;
          border-radius: 999px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .badge-live { background: rgba(16,185,129,0.12); color: #059669; border: 1px solid rgba(16,185,129,0.25); }
        .badge-v3 { background: rgba(99,102,241,0.1); color: #6366F1; border: 1px solid rgba(99,102,241,0.25); }

        /* Quarterly Timeline */
        .qtl-track {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 0;
          border-radius: 16px;
          overflow: hidden;
          border: 1px solid #E2E8F0;
          box-shadow: 0 4px 20px rgba(0,0,0,0.05);
        }
        .qtl-col {
          padding: 28px 24px;
          border-right: 1px solid #E2E8F0;
          position: relative;
        }
        .qtl-col:last-child { border-right: none; }
        .qtl-col::after {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 4px;
        }
        .qtl-q1::after { background: #00BFA5; }
        .qtl-q2::after { background: #6366F1; }
        .qtl-q3::after { background: #F59E0B; }
        .qtl-q4::after { background: #10B981; }
        .qtl-feature-chip {
          font-size: 11px;
          font-weight: 600;
          padding: 4px 10px;
          border-radius: 6px;
          display: inline-flex;
          align-items: center;
          gap: 4px;
          margin: 3px 0;
          width: 100%;
          box-sizing: border-box;
        }
        @media (max-width: 768px) {
          .qtl-track { grid-template-columns: 1fr 1fr; }
          .qtl-col { border-right: none; border-bottom: 1px solid #E2E8F0; }
          .qtl-col:nth-child(odd) { border-right: 1px solid #E2E8F0; }
          .qtl-col:last-child, .qtl-col:nth-last-child(2):nth-child(odd) { border-bottom: none; }
          .arch-layer { padding: 14px 16px; }
        }
        @media (max-width: 480px) {
          .qtl-track { grid-template-columns: 1fr; }
          .qtl-col { border-right: none !important; }
        }

        /* Early Adopter CTA */
        .early-cta-card {
          background: linear-gradient(135deg, #0F172A 0%, #1E2D5A 50%, #0F172A 100%);
          border-radius: 24px;
          padding: 60px 48px;
          position: relative;
          overflow: hidden;
          border: 1px solid rgba(0,191,165,0.2);
          box-shadow: 0 0 80px rgba(0,191,165,0.08), 0 30px 80px rgba(0,0,0,0.3);
        }
        .early-cta-card::before {
          content: '';
          position: absolute;
          top: -80px; right: -80px;
          width: 300px; height: 300px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(0,191,165,0.15) 0%, transparent 70%);
          pointer-events: none;
        }
        .early-cta-card::after {
          content: '';
          position: absolute;
          bottom: -60px; left: -60px;
          width: 240px; height: 240px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(99,102,241,0.1) 0%, transparent 70%);
          pointer-events: none;
        }
        .spots-counter {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(239,68,68,0.15);
          border: 1px solid rgba(239,68,68,0.3);
          border-radius: 999px;
          padding: 6px 16px;
          font-size: 13px;
          font-weight: 700;
          color: #FCA5A5;
        }
        .spots-dot {
          width: 8px; height: 8px;
          border-radius: 50%;
          background: #EF4444;
          box-shadow: 0 0 6px #EF4444;
          animation: blink 1.4s infinite;
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
        @media (max-width: 640px) {
          .early-cta-card { padding: 36px 24px; }
        }
      `}</style>

      {/* ─── NAVIGATION ─────────────────────────────────────────────── */}
      <nav className="marketing-nav">
        <div className="logo" onClick={() => window.scrollTo(0, 0)} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
          <img src={logoImg} alt="DataTrust Logo" style={{ height: '64px' }} />
        </div>
        <ul>
          <li><a href="#problems">Problems</a></li>
          <li><a href="/?view=how-it-works" target="_blank" rel="noopener noreferrer">How It Works</a></li>
          <li><a href="/?view=user-journey" target="_blank" rel="noopener noreferrer">User Journey</a></li>
          <li><a href="/?view=architecture-hld" target="_blank" rel="noopener noreferrer">Architecture HLD</a></li>
          <li><a href="/?view=metadata-sync" target="_blank" rel="noopener noreferrer">Table Selection Fix</a></li>
          <li><a href="/?view=semantic-engine" target="_blank" rel="noopener noreferrer">DAX-to-SQL Flow</a></li>
          <li><a href="/?view=post-sync-arch" target="_blank" rel="noopener noreferrer">Post-Sync Arch</a></li>
          <li><a href="/?view=redis-sync" target="_blank" rel="noopener noreferrer">Real-Time Sync</a></li>
          <li><a href="#" onClick={(e) => { e.preventDefault(); setView('v3'); }} style={{ color: '#00BFA5', fontWeight: 'bold' }}>V3.0 Launch Hub ✨</a></li>
          <li><a href="#usecases">Use Cases</a></li>
          <li><a href="#roi">ROI</a></li>
          <li><a href="#pricing">Pricing</a></li>
          <li>
            <button onClick={onEnterWorkspace} className="nav-cta border-none cursor-pointer">
              Launch Demo
            </button>
          </li>
        </ul>
      </nav>

      {/* ─── HERO ───────────────────────────────────────────────────── */}
      <section className="hero">
        <div className="hero-badge scroll-reveal fade-up">
          <span className="dot-pulse"></span>
          🚀 Enterprise Data Governance Platform
        </div>
        <h1 className="scroll-reveal fade-up delay-100">
          Governance becomes<br /><span>frictionless.</span> Automation takes over.
        </h1>
        <p className="scroll-reveal fade-up delay-200">
          DataTrust connects every cloud warehouse to Excel with live, validated data.
          It catches issues before they happen and ensures data integrity at scale.
          Zero manual data extraction. Zero manual reconciliation.
        </p>
        <div className="hero-actions scroll-reveal fade-up delay-300">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <button onClick={onEnterWorkspace} className="btn-primary" style={{ alignSelf: 'flex-start' }}>
              Launch Limited UI Demo <ArrowRight size={18} />
            </button>
            <p style={{ fontSize: '13px', color: '#64748B', maxWidth: '420px' }}>
              This is a limited UI demo to protect our IP. For a full product demo, email us at{' '}
              <a href="mailto:datatrust.ai@zohomail.in" style={{ color: '#00BFA5' }}>datatrust.ai@zohomail.in</a>.
            </p>
          </div>
          {false && <a href="#features" className="btn-outline" style={{ alignSelf: 'flex-start' }}>
            Explore V3.0 Features
          </a>}
        </div>
        <div className="hero-stats scroll-reveal fade-up delay-400">
          <div className="stat-item">
            <div className="stat-num">90%</div>
            <div className="stat-label">reduction in manual Excel work</div>
          </div>
          <div className="stat-item">
            <div className="stat-num">2 sec</div>
            <div className="stat-label">NLQ to live Excel result</div>
          </div>
          <div className="stat-item">
            <div className="stat-num">₹250 Cr</div>
            <div className="stat-label">annual savings (enterprise)</div>
          </div>
          <div className="stat-item">
            <div className="stat-num">50x</div>
            <div className="stat-label">maximum ROI</div>
          </div>
        </div>
      </section>

      {/* ─── INTEGRATIONS STRIP ─────────────────────────────────────── */}
      <div className="scroll-reveal fade-up" style={{ backgroundColor: 'var(--navy-mid)', borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)', padding: '20px 5%' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <span style={{ color: 'var(--gray)', fontSize: '13px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.08em', whiteSpace: 'nowrap' }}>🔗 Works with your entire stack:</span>
          {['Snowflake', 'Databricks', 'Microsoft Fabric', 'Amazon Redshift', 'Google BigQuery', 'Azure SQL', 'dbt', 'Looker', 'Tableau', 'Power BI', 'Excel', 'AWS S3'].map((tool, idx) => (
            <span key={tool} className={`scroll-reveal scale-in delay-${Math.min((idx + 1) * 100, 800)}`} style={{ fontSize: '12px', fontWeight: '600', color: 'var(--white)', background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)', padding: '5px 14px', borderRadius: '999px' }}>{tool}</span>
          ))}
        </div>
      </div>

      {/* ─── EXECUTIVE OVERVIEW ─────────────────────────────────────── */}
      <section className="executive-summary" style={{ padding: '80px 20px', backgroundColor: 'transparent', overflow: 'hidden' }}>
        <div className="section-label" style={{ textAlign: 'center', marginBottom: '40px' }}>Overview</div>
        <div className="pipeline-wrapper" style={{ maxWidth: '900px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '40px' }}>

          <div className="summary-block flow-animate flow-delay-1" style={{ backgroundColor: 'transparent', padding: '20px 0' }}>
            <h3 style={{ fontSize: '24px', color: '#1e293b', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '10px' }}>🔴 The Problem</h3>
            <p className="flow-content" style={{ color: '#475569', fontSize: '16px', lineHeight: '1.8', margin: 0 }}>
              Enterprises running multiple BI tools and cloud data platforms suffer from <strong>semantic drift</strong> — the same metric returns different values depending on which tool a stakeholder opens. Finance teams waste 40+ hours weekly on manual Excel exports. Data quality issues are caught reactively, often after wrong decisions are made. And when AI agents query raw tables with no business context, they hallucinate metrics. The cost: ₹15+ Crores annually in manual effort, data errors, delayed decisions, and eroded trust.
            </p>
          </div>

          <div className="summary-block flow-animate flow-delay-2" style={{ backgroundColor: 'transparent', padding: '20px 0' }}>
            <h3 style={{ fontSize: '24px', color: '#1e293b', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '10px' }}>🟢 V3.0 Solution — Intelligence at Scale</h3>
            <p className="flow-content" style={{ color: '#475569', fontSize: '16px', lineHeight: '1.8', margin: 0 }}>
              DataTrust V3.0 is not an incremental update — it is a fundamental shift. Version 2.0 was a data governance platform. V3.0 turns that foundation into an <strong>AI-powered data intelligence engine</strong> that learns, predicts, and automates governance without requiring manual rule creation, manual validation, or manual correction. Predictive quality catches issues before they happen. NLQ lets any business user get live Excel answers in 2 seconds. Auto-correction fixes most issues without human intervention. <em>Data governance becomes invisible.</em>
            </p>
          </div>

          <div className="summary-block flow-animate flow-delay-3" style={{ backgroundColor: 'transparent', padding: '20px 0' }}>
            <h3 style={{ fontSize: '24px', color: '#1e293b', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '10px' }}>📊 V3.0 Strategic Pillars</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px', marginTop: '8px' }}>
              {[
                { icon: '🤖', title: 'AI-First', desc: 'AI sits at the core of every feature, not as an add-on' },
                { icon: '☁️', title: 'Multi-Cloud', desc: 'Works with every major cloud platform and BI tool' },
                { icon: '👤', title: 'Self-Service', desc: 'Business users answer questions without data engineers' },
                { icon: '⚡', title: 'Zero-Touch', desc: 'The platform governs itself — most issues never need a human' },
                { icon: '👥', title: 'Collaboration', desc: 'Teams work on shared semantic models with access controls' },
              ].map((p, i) => (
                <div key={i} style={{ background: '#F8FAFC', borderRadius: '12px', padding: '20px', border: '1px solid #E2E8F0' }}>
                  <div style={{ fontSize: '24px', marginBottom: '8px' }}>{p.icon}</div>
                  <div style={{ fontWeight: '700', color: '#0F172A', marginBottom: '4px', fontSize: '15px' }}>{p.title}</div>
                  <div style={{ color: '#64748B', fontSize: '13px', lineHeight: '1.6' }}>{p.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── PROBLEMS ───────────────────────────────────────────────── */}
      <section className="problems" id="problems">
        <div className="section-label scroll-reveal fade-up">The Root Cause</div>
        <h2 className="section-title scroll-reveal fade-up delay-100">5 problems costing you ₹15 Cr a year</h2>
        <p className="section-subtitle scroll-reveal fade-up delay-200">Every enterprise with cloud warehouses and Excel faces the same challenges. DataTrust V3.0 solves all of them — and prevents the ones you haven't seen yet.</p>
        <div className="problems-grid">
          <div className="problem-card scroll-reveal fade-up delay-300">
            <div className="problem-icon" style={{ background: 'rgba(239,68,68,0.1)' }}>📊</div>
            <h3>Semantic Chaos</h3>
            <p>Marketing, Finance, and Sales each define "Revenue" differently. Board meetings become definition debates, not strategy discussions.</p>
            <div className="problem-cost">₹1.5 Cr / year</div>
          </div>
          <div className="problem-card scroll-reveal fade-up delay-400">
            <div className="problem-icon" style={{ background: 'rgba(245,158,11,0.1)' }}>📁</div>
            <h3>Excel Export Hell</h3>
            <p>Every Monday: export from Power BI → open Excel → copy-paste → fix formulas → find errors. 20 analysts × 2 hours = 40 hours wasted weekly.</p>
            <div className="problem-cost">₹2 Cr / year</div>
          </div>
          <div className="problem-card scroll-reveal fade-up delay-500">
            <div className="problem-icon" style={{ background: 'rgba(99,102,241,0.1)' }}>❓</div>
            <h3>Trust Deficit</h3>
            <p>CFO gets two different Revenue figures on two different days. Investigation takes 3 days. Confidence in data disappears.</p>
            <div className="problem-cost">₹5 Cr / year</div>
          </div>
          <div className="problem-card scroll-reveal fade-up delay-600">
            <div className="problem-icon" style={{ background: 'rgba(239,68,68,0.1)' }}>🔥</div>
            <h3>Reactive Quality</h3>
            <p>Issue happens → someone notices 4 hours later → investigation → fix → republish. 21 hours of delay on average. Wrong decisions made.</p>
            <div className="problem-cost">₹3 Cr / year</div>
          </div>
          <div className="problem-card scroll-reveal fade-up delay-700">
            <div className="problem-icon" style={{ background: 'rgba(0,191,165,0.1)' }}>📋</div>
            <h3>Audit Nightmare</h3>
            <p>"Who changed the Revenue definition?" Search emails, Slack, Jira, interview the team. 7 hours per audit question.</p>
            <div className="problem-cost">₹2 Cr / year</div>
          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS ───────────────────────────────────────────── */}
      <section id="how">
        <div className="section-label scroll-reveal fade-up">How It Works</div>
        <h2 className="section-title scroll-reveal fade-up delay-100">Governed, AI-monitored data in Excel. In seconds.</h2>
        <p className="section-subtitle scroll-reveal fade-up delay-200">One platform bridging every data warehouse and your Excel users — with predictive AI quality baked in at every layer.</p>
        <div className="how-grid">
          <div className="how-steps">
            <div className="step scroll-reveal fade-right delay-300">
              <div className="step-num">1</div>
              <div className="step-content">
                <h4>Connect your data warehouse</h4>
                <p>Link Snowflake, Databricks, Redshift, BigQuery, or Azure SQL. Define your metrics once in the Semantic Layer.</p>
              </div>
            </div>
            <div className="step scroll-reveal fade-right delay-400">
              <div className="step-num">2</div>
              <div className="step-content">
                <h4>AI learns your data patterns</h4>
                <p>Rule Inference V2 auto-learns quality rules from history. Predictive engine flags degradation before it happens.</p>
              </div>
            </div>
            <div className="step scroll-reveal fade-right delay-500">
              <div className="step-num">3</div>
              <div className="step-content">
                <h4>Ask in plain English</h4>
                <p>Type "What was Q4 Revenue for West region?" in the Excel ribbon. NLQ returns a live, validated result in 2 seconds.</p>
              </div>
            </div>
            <div className="step scroll-reveal fade-right delay-600">
              <div className="step-num">4</div>
              <div className="step-content">
                <h4>Auto-corrected. Zero touch.</h4>
                <p>Auto-Correction V2 fixes most issues automatically with rollback. Humans only review true edge cases.</p>
              </div>
            </div>
          </div>

          {/* MOCK EXCEL UI */}
          <div className="mock-excel scroll-reveal scale-in delay-300">
            <div className="mock-topbar">
              <div className="mock-dots">
                <div className="mock-dot" style={{ background: '#FF5F57' }}></div>
                <div className="mock-dot" style={{ background: '#FFBD2E' }}></div>
                <div className="mock-dot" style={{ background: '#28C840' }}></div>
              </div>
              <div className="mock-title">Monthly_Revenue_Q4.xlsx — DataTrust V3.0</div>
            </div>
            <div className="mock-body">
              <div className="mock-ribbon" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: '6px' }}>
                <div style={{ display: 'flex', width: '100%', alignItems: 'center', gap: '8px' }}>
                  <span>🔗 Connected:</span>
                  <strong>Snowflake → sales_transactions</strong>
                  <span style={{ marginLeft: 'auto', color: '#10B981' }}>✅ Validated</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(99,102,241,0.08)', borderRadius: '6px', padding: '5px 10px', border: '1px solid rgba(99,102,241,0.2)', width: '100%' }}>
                  <span style={{ fontSize: '11px', color: '#6366F1', fontWeight: '700' }}>💬 NLQ:</span>
                  <span style={{ fontSize: '11px', color: '#475569', fontStyle: 'italic' }}>"What was Q4 Revenue for West region?"</span>
                  <span style={{ marginLeft: 'auto', fontSize: '11px', color: '#10B981', fontWeight: '700' }}>→ ₹1.1 Cr ✓</span>
                </div>
              </div>
              <div className="mock-table-container">
                <table className="mock-table">
                  <thead>
                    <tr><th>Region</th><th>Revenue</th><th>Units</th><th>Status</th></tr>
                  </thead>
                  <tbody>
                    <tr className="ok"><td>North</td><td>₹4.2 Cr</td><td>8,400</td><td><span className="mock-badge badge-ok">✓ OK</span></td></tr>
                    <tr className="ok"><td>South</td><td>₹3.8 Cr</td><td>7,600</td><td><span className="mock-badge badge-ok">✓ OK</span></td></tr>
                    <tr className="warn"><td>West</td><td>₹1.1 Cr</td><td>6,200</td><td><span className="mock-badge badge-warn">⚠ Review</span></td></tr>
                    <tr className="ok"><td>East</td><td>₹2.9 Cr</td><td>5,800</td><td><span className="mock-badge badge-ok">✓ OK</span></td></tr>
                  </tbody>
                </table>
              </div>
              <div className="mock-footer">
                <span>Last refreshed: 09:02 AM · AI Quality: 🟢 Healthy · 0 anomalies predicted</span>
                <button className="refresh-btn" onClick={onEnterWorkspace}>
                  <RefreshCw size={12} /> Test Live Sync
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {false && ( <>
      {/* ─── ARCHITECTURE HLD ─────────────────────────────────────── */}
      <section id="architecture" style={{ padding: '100px 5%', background: 'linear-gradient(180deg, #0A0F1E 0%, #0F172A 100%)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div className="section-label scroll-reveal fade-up" style={{ color: 'rgba(0,191,165,0.8)', marginBottom: '1rem' }}>System Architecture</div>
          <h2 className="section-title scroll-reveal fade-up delay-100" style={{ color: '#fff', margin: '0 0 1rem' }}>5-Layer Intelligence Architecture</h2>
          <p className="section-subtitle scroll-reveal fade-up delay-200" style={{ color: 'rgba(255,255,255,0.55)', margin: '0 0 3rem', maxWidth: '700px' }}>
            DataTrust V3.0 is a fully layered, cloud-native platform. Each layer is independently scalable and communicates via a high-performance event bus.
          </p>

          <div className="scroll-reveal scale-in delay-300">
            {/* Layer 1 - User */}
            <div className="arch-layer" style={{ background: 'rgba(0,191,165,0.08)', borderColor: 'rgba(0,191,165,0.2)' }}>
              <div style={{ fontSize: '11px', fontWeight: '700', color: '#00BFA5', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '12px' }}>01 — User Layer</div>
              <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {['🗂️ Excel Add-in V3', '📊 Power BI', '📈 Tableau', '💬 Slack Alerts', '🤝 Teams Alerts', '🌐 Web Console', '🔌 REST API'].map(c => (
                  <span key={c} className="arch-component" style={{ borderColor: 'rgba(0,191,165,0.2)', color: 'rgba(255,255,255,0.9)' }}>{c}</span>
                ))}
              </div>
            </div>
            <div className="arch-connector"><div className="arch-arrow">↓</div></div>

            {/* Layer 2 - Application */}
            <div className="arch-layer" style={{ background: 'rgba(99,102,241,0.08)', borderColor: 'rgba(99,102,241,0.2)' }}>
              <div style={{ fontSize: '11px', fontWeight: '700', color: '#818CF8', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '12px' }}>02 — Application Layer</div>
              <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {['💬 NLQ Interface', '📊 Quality Dashboard', '🔔 Alert Center', '⚙️ Admin Console', '🔧 Pipeline Manager', '👥 Team Workspace', '📋 Audit Viewer'].map(c => (
                  <span key={c} className="arch-component" style={{ borderColor: 'rgba(99,102,241,0.2)', color: 'rgba(255,255,255,0.85)' }}>{c}</span>
                ))}
              </div>
            </div>
            <div className="arch-connector"><div className="arch-arrow">↓</div></div>

            {/* Layer 3 - AI */}
            <div className="arch-layer" style={{ background: 'rgba(245,158,11,0.07)', borderColor: 'rgba(245,158,11,0.2)' }}>
              <div style={{ fontSize: '11px', fontWeight: '700', color: '#FCD34D', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '12px' }}>03 — AI & Intelligence Layer (V3.0 NEW)</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', marginBottom: '8px' }}>
                {[
                  { label: '🧠 NLQ → SQL Engine', sub: 'LangChain + Groq' },
                  { label: '🔮 Predictive Quality', sub: 'ML Time-Series' },
                  { label: '🤖 Rule Inference V2', sub: 'Self-Learning AI' },
                  { label: '🔧 Auto-Correction V2', sub: 'Zero-Touch Fix' },
                  { label: '📝 Auto-Documentation', sub: 'LLM Generated' },
                  { label: '🔍 Semantic Search', sub: 'pgvector RAG' },
                ].map(c => (
                  <span key={c.label} className="arch-component" title={c.sub} style={{ borderColor: 'rgba(245,158,11,0.25)', color: '#FDE68A', background: 'rgba(245,158,11,0.08)' }}>
                    {c.label} <span style={{ fontSize: '10px', color: 'rgba(253,230,138,0.5)', fontWeight: '500' }}>({c.sub})</span>
                  </span>
                ))}
              </div>
            </div>
            <div className="arch-connector"><div className="arch-arrow">↓</div></div>

            {/* Layer 4 - Core Engines */}
            <div className="arch-layer" style={{ background: 'rgba(239,68,68,0.07)', borderColor: 'rgba(239,68,68,0.18)' }}>
              <div style={{ fontSize: '11px', fontWeight: '700', color: '#FCA5A5', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '12px' }}>04 — Core Engine Layer</div>
              <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {['⚡ Semantic Engine V2', '✅ Quality Engine V2', '📋 Audit Engine V2', '🔄 Pipeline Engine V2', '🔔 Alert Engine V2', '📏 Rule Engine V2', '👥 Workspace Engine', '✔️ Approval Engine'].map(c => (
                  <span key={c} className="arch-component" style={{ borderColor: 'rgba(239,68,68,0.18)', color: 'rgba(255,255,255,0.8)' }}>{c}</span>
                ))}
              </div>
            </div>
            <div className="arch-connector"><div className="arch-arrow">↓</div></div>

            {/* Layer 5 - Data */}
            <div className="arch-layer" style={{ background: 'rgba(16,185,129,0.07)', borderColor: 'rgba(16,185,129,0.18)' }}>
              <div style={{ fontSize: '11px', fontWeight: '700', color: '#6EE7B7', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '12px' }}>05 — Data Layer</div>
              <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {['❄️ Snowflake', '⚡ Databricks', '🏭 Microsoft Fabric', '🔴 Amazon Redshift', '🔵 Google BigQuery', '🔷 Azure SQL', '🔄 dbt', '🗄️ PostgreSQL (meta)', '⚡ Redis (cache)', '📨 Kafka (events)', '📦 pgvector (embeddings)'].map(c => (
                  <span key={c} className="arch-component" style={{ borderColor: 'rgba(16,185,129,0.18)', color: 'rgba(255,255,255,0.8)' }}>{c}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Architecture stats strip */}
          <div className="scroll-reveal fade-up delay-500" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px', marginTop: '40px' }}>
            {[
              { val: '5', label: 'Architecture Layers', icon: '🏗️' },
              { val: '9+', label: 'Data Connectors', icon: '🔌' },
              { val: '<500ms', label: 'API p95 Latency', icon: '⚡' },
              { val: '1B+', label: 'Rows Scalable', icon: '📊' },
              { val: 'K8s', label: 'Cloud-Native Deploy', icon: '☁️' },
            ].map((s, i) => (
              <div key={i} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '14px', padding: '20px', textAlign: 'center' }}>
                <div style={{ fontSize: '22px', marginBottom: '6px' }}>{s.icon}</div>
                <div style={{ fontSize: '24px', fontWeight: '800', color: '#00BFA5', marginBottom: '4px' }}>{s.val}</div>
                <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', fontWeight: '500' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── NLQ SHOWCASE ─────────────────────────────────────────── */}
      <section style={{ padding: '100px 5%', background: '#F8FAFC' }} id="nlq">
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', alignItems: 'center' }}>
            {/* Left — text */}
            <div>
              <div className="section-label scroll-reveal fade-up" style={{ marginBottom: '1rem' }}>V3.0 — Natural Language Query</div>
              <h2 className="section-title scroll-reveal fade-up delay-100" style={{ textAlign: 'left', margin: '0 0 1.2rem', fontSize: '36px' }}>
                Ask in plain English.<br />Get live data in Excel.
              </h2>
              <p className="section-subtitle scroll-reveal fade-up delay-200" style={{ textAlign: 'left', margin: '0 0 2rem', maxWidth: '480px' }}>
                No SQL. No DAX. No data engineer. Just type your question — DataTrust NLQ translates it to validated SQL using pgvector semantic search + LLM, runs it on your warehouse, and puts the result in Excel in under 2 seconds.
              </p>
              <div className="scroll-reveal fade-up delay-300" style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '28px' }}>
                {[
                  { icon: '🔍', text: 'pgvector semantic search finds your metric context' },
                  { icon: '🧠', text: 'LLM generates validated, safe SQL (Groq + OpenAI)' },
                  { icon: '✅', text: 'Quality Engine validates result before it hits Excel' },
                  { icon: '📎', text: 'Full lineage attached — source, column, filters' },
                  { icon: '⚡', text: 'Under 2 seconds end-to-end, 90%+ accuracy' },
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                    <span style={{ fontSize: '18px', flexShrink: 0, marginTop: '2px' }}>{item.icon}</span>
                    <span style={{ color: '#475569', fontSize: '15px', lineHeight: '1.6' }}>{item.text}</span>
                  </div>
                ))}
              </div>
              <div className="scroll-reveal fade-up delay-400" style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                <span style={{ background: 'rgba(99,102,241,0.1)', color: '#6366F1', border: '1px solid rgba(99,102,241,0.2)', padding: '5px 14px', borderRadius: '999px', fontSize: '12px', fontWeight: '700' }}>LangChain Orchestration</span>
                <span style={{ background: 'rgba(0,191,165,0.1)', color: '#00875A', border: '1px solid rgba(0,191,165,0.2)', padding: '5px 14px', borderRadius: '999px', fontSize: '12px', fontWeight: '700' }}>pgvector RAG</span>
                <span style={{ background: 'rgba(245,158,11,0.1)', color: '#B45309', border: '1px solid rgba(245,158,11,0.2)', padding: '5px 14px', borderRadius: '999px', fontSize: '12px', fontWeight: '700' }}>Groq / OpenAI / Gemini</span>
              </div>
            </div>

            {/* Right — NLQ Terminal Demo */}
            <div className="scroll-reveal fade-left delay-200">
              {/* Query selector chips */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
                <div style={{ fontSize: '11px', fontWeight: '700', color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '4px' }}>Try a question:</div>
                {nlqDemos.map((d, i) => (
                  <button key={i}
                    onClick={() => handleNlqDemo(i)}
                    style={{
                      textAlign: 'left',
                      padding: '10px 14px',
                      borderRadius: '10px',
                      border: `1px solid ${nlqActiveDemo === i ? '#6366F1' : '#E2E8F0'}`,
                      background: nlqActiveDemo === i ? 'rgba(99,102,241,0.08)' : '#fff',
                      cursor: 'pointer',
                      fontSize: '13px',
                      color: nlqActiveDemo === i ? '#6366F1' : '#475569',
                      fontWeight: nlqActiveDemo === i ? '600' : '400',
                      transition: 'all 0.2s',
                    }}
                  >
                    💬 {d.q}
                  </button>
                ))}
              </div>

              {/* Terminal */}
              <div className="nlq-terminal">
                <div className="nlq-topbar">
                  <div className="nlq-dot" style={{ background: '#FF5F57' }} />
                  <div className="nlq-dot" style={{ background: '#FFBD2E' }} />
                  <div className="nlq-dot" style={{ background: '#28C840' }} />
                  <span style={{ marginLeft: '8px', fontSize: '12px', color: 'rgba(255,255,255,0.4)', fontWeight: '600' }}>DataTrust NLQ — Excel Ribbon</span>
                  <span style={{ marginLeft: 'auto', fontSize: '11px', color: '#10B981', fontWeight: '600' }}>● Connected</span>
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

                {!nlqQuery && !nlqLoading && (
                  <div style={{ padding: '32px 20px', textAlign: 'center', color: 'rgba(255,255,255,0.2)', fontSize: '13px' }}>
                    👆 Click a question above to see the NLQ engine in action
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── V3.0 FEATURES ──────────────────────────────────────────── */}
      <section className="features" id="features" style={{ background: '#F8FAFC' }}>
        <div className="section-label scroll-reveal fade-up">V3.0 Feature Categories</div>
        <h2 className="section-title scroll-reveal fade-up delay-100">9 categories. 50+ new features. One platform.</h2>
        <p className="section-subtitle scroll-reveal fade-up delay-200">
          V3.0 adds an entire AI &amp; Intelligence layer on top of the complete V2.0 foundation — expanding from 3 connectors to 9, from reactive to predictive, from manual to autonomous.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px', maxWidth: '1200px', margin: '0 auto', padding: '0 5%' }}>
          {v3Features.map((f, i) => (
            <div key={i} className={`v3-feature-card scroll-reveal fade-up delay-${Math.min((i % 4 + 1) * 100, 500)}`}>
              <div style={{ fontSize: '32px', marginBottom: '12px' }}>{f.icon}</div>
              <span className={f.badge === 'Core' ? 'v3-badge-core' : 'v3-badge-new'}>{f.badge}</span>
              <div style={{ fontSize: '11px', fontWeight: '600', color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '6px' }}>{f.category}</div>
              <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#0F172A', marginBottom: '10px' }}>{f.title}</h3>
              <p style={{ color: '#475569', fontSize: '14px', lineHeight: '1.7', marginBottom: '16px' }}>{f.desc}</p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {f.items.map((item, j) => (
                  <li key={j} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#334155' }}>
                    <span style={{ color: '#00BFA5', fontWeight: '700' }}>✓</span> {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* ─── V2.0 FOUNDATION ────────────────────────────────────────── */}
      <section style={{ padding: '100px 5%', backgroundColor: '#FFFFFF' }} id="foundation">
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div className="section-label scroll-reveal fade-up" style={{ marginBottom: '1rem' }}>Production-Ready Foundation</div>
          <h2 className="section-title scroll-reveal fade-up delay-100" style={{ textAlign: 'left', margin: '0 0 1rem' }}>V2.0 — What's Already Built</h2>
          <p className="section-subtitle scroll-reveal fade-up delay-200" style={{ textAlign: 'left', margin: '0 0 2.5rem', maxWidth: '700px' }}>
            V3.0 builds on top of a <strong>complete, production-ready V2.0 platform</strong>. Every capability below is live today and forms the proven foundation that V3.0 extends.
          </p>
          <div className="scroll-reveal scale-in delay-300" style={{ borderRadius: '16px', overflow: 'hidden', border: '1px solid #E2E8F0', boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}>
            <table className="v2-table">
              <thead>
                <tr>
                  <th style={{ width: '35%' }}>Feature / Component</th>
                  <th style={{ width: '15%' }}>Status</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {v2Features.map((f, i) => (
                  <tr key={i}>
                    <td style={{ fontWeight: '600', color: '#0F172A' }}>{f.name}</td>
                    <td><span className="status-dot-green">Complete</span></td>
                    <td style={{ color: '#64748B' }}>{f.desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ─── V3.0 ROADMAP ───────────────────────────────────────────── */}
      <section style={{ padding: '100px 5%', backgroundColor: '#F8FAFC' }} id="roadmap">
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div className="section-label scroll-reveal fade-up" style={{ marginBottom: '1rem' }}>Implementation Roadmap</div>
          <h2 className="section-title scroll-reveal fade-up delay-100" style={{ margin: '0 0 1rem' }}>V3.0 — 5-Phase Development Plan</h2>
          <p className="section-subtitle scroll-reveal fade-up delay-200" style={{ margin: '0 0 2.5rem' }}>
            From AI foundation in Q1 2027 to GA launch in Q4 2027 — 10 months, 5 phases, 50+ new capabilities.
          </p>

          {/* Phase selector */}
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

          {/* Active phase card */}
          {roadmapPhases.filter(rp => rp.phase === activeRoadmapPhase).map(rp => (
            <div key={rp.phase} className="roadmap-phase-card scroll-reveal scale-in">
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px', flexWrap: 'wrap' }}>
                <div style={{ background: rp.color, color: '#fff', borderRadius: '12px', padding: '6px 18px', fontWeight: '700', fontSize: '14px' }}>{rp.quarter}</div>
                <h3 style={{ fontSize: '24px', fontWeight: '800', color: '#0F172A', margin: 0 }}>{rp.title}</h3>
              </div>
              <p style={{ color: '#475569', fontSize: '15px', lineHeight: '1.8', marginBottom: '24px', maxWidth: '700px' }}>{rp.desc}</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                {rp.features.map((feat, fi) => (
                  <span key={fi} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '7px 16px', borderRadius: '999px', background: `${rp.color}15`, border: `1px solid ${rp.color}40`, color: rp.color, fontWeight: '600', fontSize: '13px' }}>
                    ✓ {feat}
                  </span>
                ))}
              </div>
            </div>
          ))}

          {/* Timeline strip */}
          <div className="scroll-reveal fade-up delay-400" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0', marginTop: '40px', borderRadius: '12px', overflow: 'hidden', border: '1px solid #E2E8F0' }}>
            {roadmapPhases.map((rp, i) => (
              <div key={i} onClick={() => setActiveRoadmapPhase(rp.phase)} style={{ padding: '16px', borderRight: i < 3 ? '1px solid #E2E8F0' : 'none', background: activeRoadmapPhase === rp.phase ? rp.color : '#fff', cursor: 'pointer', transition: 'background 0.2s', textAlign: 'center' }}>
                <div style={{ fontSize: '11px', fontWeight: '700', color: activeRoadmapPhase === rp.phase ? 'rgba(255,255,255,0.7)' : '#94A3B8', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '4px' }}>{rp.quarter}</div>
                <div style={{ fontSize: '13px', fontWeight: '700', color: activeRoadmapPhase === rp.phase ? '#fff' : '#0F172A' }}>{rp.title}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── V3.0 QUARTERLY TIMELINE ───────────────────────────── */}
      <section style={{ padding: '80px 5%', background: '#FFFFFF' }} id="timeline">
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div className="section-label scroll-reveal fade-up" style={{ textAlign: 'center', marginBottom: '1rem' }}>V3.0 Quarterly Roadmap</div>
          <h2 className="section-title scroll-reveal fade-up delay-100">Q1 → Q4 2027 — Feature by Feature</h2>
          <p className="section-subtitle scroll-reveal fade-up delay-200" style={{ marginBottom: '2.5rem' }}>
            10 months. 4 quarters. 50+ new capabilities. Here's exactly what lands when.
          </p>
          <div className="qtl-track scroll-reveal scale-in delay-300">
            {/* Q1 */}
            <div className="qtl-col qtl-q1" style={{ background: '#fff' }}>
              <div style={{ fontSize: '11px', fontWeight: '800', color: '#00BFA5', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '6px' }}>Q1 2027</div>
              <div style={{ fontSize: '16px', fontWeight: '700', color: '#0F172A', marginBottom: '16px' }}>AI Foundation</div>
              {[
                { icon: '🧠', label: 'AI Rule Inference V2' },
                { icon: '💬', label: 'NLQ → SQL (90% accuracy)' },
                { icon: '🔍', label: 'pgvector + Embeddings' },
                { icon: '🔔', label: 'Slack / Teams Alerts' },
                { icon: '🔍', label: 'Semantic Search API' },
              ].map((f, i) => (
                <div key={i} className="qtl-feature-chip" style={{ background: 'rgba(0,191,165,0.08)', color: '#00775A' }}>
                  {f.icon} {f.label}
                </div>
              ))}
              <div style={{ marginTop: '16px', fontSize: '12px', color: '#94A3B8', fontWeight: '600' }}>5 features</div>
            </div>

            {/* Q2 */}
            <div className="qtl-col qtl-q2" style={{ background: '#FAFBFF' }}>
              <div style={{ fontSize: '11px', fontWeight: '800', color: '#6366F1', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '6px' }}>Q2 2027</div>
              <div style={{ fontSize: '16px', fontWeight: '700', color: '#0F172A', marginBottom: '16px' }}>Multi-Cloud + dbt</div>
              {[
                { icon: '🔴', label: 'Amazon Redshift' },
                { icon: '🔵', label: 'Google BigQuery' },
                { icon: '🔷', label: 'Azure SQL' },
                { icon: '🔄', label: 'dbt Integration' },
                { icon: '🔮', label: 'Predictive Quality Engine' },
              ].map((f, i) => (
                <div key={i} className="qtl-feature-chip" style={{ background: 'rgba(99,102,241,0.07)', color: '#4338CA' }}>
                  {f.icon} {f.label}
                </div>
              ))}
              <div style={{ marginTop: '16px', fontSize: '12px', color: '#94A3B8', fontWeight: '600' }}>5 features</div>
            </div>

            {/* Q3 */}
            <div className="qtl-col qtl-q3" style={{ background: '#fff' }}>
              <div style={{ fontSize: '11px', fontWeight: '800', color: '#D97706', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '6px' }}>Q3 2027</div>
              <div style={{ fontSize: '16px', fontWeight: '700', color: '#0F172A', marginBottom: '16px' }}>Collaboration</div>
              {[
                { icon: '👥', label: 'Team Workspaces' },
                { icon: '🔐', label: 'Column-Level Security' },
                { icon: '✔️', label: 'Approval Workflows V2' },
                { icon: '📈', label: 'Impact Analysis V2' },
                { icon: '🔧', label: 'Auto-Correction V2' },
              ].map((f, i) => (
                <div key={i} className="qtl-feature-chip" style={{ background: 'rgba(245,158,11,0.08)', color: '#92400E' }}>
                  {f.icon} {f.label}
                </div>
              ))}
              <div style={{ marginTop: '16px', fontSize: '12px', color: '#94A3B8', fontWeight: '600' }}>5 features</div>
            </div>

            {/* Q4 */}
            <div className="qtl-col qtl-q4" style={{ background: '#FAFFFE' }}>
              <div style={{ fontSize: '11px', fontWeight: '800', color: '#10B981', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '6px' }}>Q4 2027</div>
              <div style={{ fontSize: '16px', fontWeight: '700', color: '#0F172A', marginBottom: '16px' }}>Excel V3 + GA</div>
              {[
                { icon: '📊', label: 'Excel Dashboard Builder' },
                { icon: '📋', label: 'Template Marketplace' },
                { icon: '⚡', label: 'Redis Query Cache' },
                { icon: '📝', label: 'Auto-Documentation' },
                { icon: '🚀', label: 'V3.0 GA Launch' },
              ].map((f, i) => (
                <div key={i} className="qtl-feature-chip" style={{ background: 'rgba(16,185,129,0.08)', color: '#065F46' }}>
                  {f.icon} {f.label}
                </div>
              ))}
              <div style={{ marginTop: '16px', fontSize: '12px', color: '#94A3B8', fontWeight: '600' }}>5 features</div>
            </div>
          </div>

          {/* Total count strip */}
          <div className="scroll-reveal fade-up delay-400" style={{ display: 'flex', justifyContent: 'center', gap: '32px', flexWrap: 'wrap', marginTop: '32px' }}>
            {[
              { num: '50+', label: 'New V3.0 Features', color: '#00BFA5' },
              { num: '4', label: 'Quarters / Phases', color: '#6366F1' },
              { num: '10', label: 'Months to GA', color: '#F59E0B' },
              { num: '5', label: 'Enterprise Early Adopters', color: '#EF4444' },
            ].map((s, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '28px', fontWeight: '800', color: s.color }}>{s.num}</div>
                <div style={{ fontSize: '12px', color: '#64748B', fontWeight: '600', marginTop: '2px' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      </> )}
      {/* ─── USE CASES ───────────────────────────────────────────── */}
      <section className="use-cases" id="usecases">
        <div className="section-label scroll-reveal fade-up">Real Impact</div>
        <h2 className="section-title scroll-reveal fade-up delay-100">Before &amp; After DataTrust V3.0</h2>
        <p className="section-subtitle scroll-reveal fade-up delay-200">Real workflows from real teams — and how DataTrust transforms them.</p>

        <div className="cases-tabs scroll-reveal scale-in delay-300">
          {['reporting', 'quality', 'audit', 'enterprise'].map(tab => (
            <button
              key={tab}
              className={`case-tab ${activeCase === tab ? 'active' : ''}`}
              onClick={() => setActiveCase(tab)}
            >
              {tab === 'reporting' && 'Monthly Reporting'}
              {tab === 'quality' && 'Data Quality'}
              {tab === 'audit' && 'Audit & Compliance'}
              {tab === 'enterprise' && '🏦 Investment Bank'}
            </button>
          ))}
        </div>

        {activeCase === 'reporting' && (
          <div className="case-content active">
            <div className="case-box before">
              <h4>Before DataTrust — 8 Hours</h4>
              <div className="case-step"><span className="cs-time">09:00 AM</span> Export Revenue from Power BI to CSV</div>
              <div className="case-step"><span className="cs-time">09:30 AM</span> Export Customer &amp; Sales reports</div>
              <div className="case-step"><span className="cs-time">10:00 AM</span> Open Excel, copy-paste all data</div>
              <div className="case-step"><span className="cs-time">12:00 PM</span> Fix broken SUMIFS formula</div>
              <div className="case-step"><span className="cs-time">02:00 PM</span> Fix VLOOKUP references</div>
              <div className="case-step"><span className="cs-time">03:00 PM</span> Suspicious revenue numbers — investigate</div>
              <div className="case-step"><span className="cs-time">05:00 PM</span> Regenerate with corrected data</div>
              <div className="case-total red">Total: 8 hours · Monthly cost: ₹39,000</div>
            </div>
            <div className="case-box after">
              <h4>After DataTrust V3.0 — 10 Minutes</h4>
              <div className="case-step"><span className="cs-time">09:00 AM</span> Open Excel template — DataTrust ribbon loads</div>
              <div className="case-step"><span className="cs-time">09:01 AM</span> Click "Refresh All" — all sheets load live from warehouse</div>
              <div className="case-step"><span className="cs-time">09:02 AM</span> AI auto-validation complete — 0 issues</div>
              <div className="case-step"><span className="cs-time">09:05 AM</span> Review numbers</div>
              <div className="case-step"><span className="cs-time">09:10 AM</span> Click "Publish Report" — done</div>
              <div className="case-total green">Total: 10 minutes · Annual savings: ₹4.7 Lakhs · 90% reduction</div>
            </div>
          </div>
        )}

        {activeCase === 'quality' && (
          <div className="case-content active">
            <div className="case-box before">
              <h4>Before DataTrust — 10 Hours</h4>
              <div className="case-step"><span className="cs-time">08:00 AM</span> Sales report shows ₹5 Cr (expected ₹4.5 Cr)</div>
              <div className="case-step"><span className="cs-time">10:00 AM</span> VP Sales flags: "Revenue seems wrong"</div>
              <div className="case-step"><span className="cs-time">12:00 PM</span> Data Engineer starts investigation</div>
              <div className="case-step"><span className="cs-time">02:00 PM</span> Duplicate entries found from 10 stores</div>
              <div className="case-step"><span className="cs-time">04:00 PM</span> Data corrected, report regenerated</div>
              <div className="case-total red">Total: 10 hours · 1 full day of wrong decisions made</div>
            </div>
            <div className="case-box after">
              <h4>After DataTrust V3.0 — 5 Minutes (Predictive)</h4>
              <div className="case-step"><span className="cs-time">07:55 AM</span> 🔮 Predictive engine flags risk: "Revenue anomaly predicted"</div>
              <div className="case-step"><span className="cs-time">07:57 AM</span> Alert: "Duplicates predicted from Store 42, 53, 89"</div>
              <div className="case-step"><span className="cs-time">08:00 AM</span> Auto-Correction V2 applies fix automatically</div>
              <div className="case-step"><span className="cs-time">08:05 AM</span> Report shows correct numbers — issue caught before anyone sees it</div>
              <div className="case-total green">Total: 5 minutes · Zero human intervention · 99% prevention rate</div>
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
              <div className="case-step"><span className="cs-time">Day 5</span> Document findings &amp; verify with stakeholders</div>
              <div className="case-step"><span className="cs-time">Day 7</span> Submit to auditor</div>
              <div className="case-total red">Total: 56 hours · Cost: ₹2.8 Lakhs</div>
            </div>
            <div className="case-box after">
              <h4>After DataTrust V3.0 — 15 Minutes</h4>
              <div className="case-step"><span className="cs-time">Step 1</span> Open DataTrust, search "Revenue" in NLQ</div>
              <div className="case-step"><span className="cs-time">Step 2</span> Full definition history loads in 1 second</div>
              <div className="case-step"><span className="cs-time">Step 3</span> See all change approvals, column lineage, and AI documentation</div>
              <div className="case-step"><span className="cs-time">Step 4</span> Click "Export GDPR / SOX Audit Pack" — one-click report</div>
              <div className="case-step"><span className="cs-time">Step 5</span> Send to auditor</div>
              <div className="case-total green">Total: 15 minutes · Cost: ₹5,000 · 98% time saved</div>
            </div>
          </div>
        )}

        {activeCase === 'enterprise' && (
          <div className="case-content active">
            <div style={{ background: '#F8FAFC', borderRadius: '16px', padding: '28px', border: '1px solid #E2E8F0', marginBottom: '24px' }}>
              <h4 style={{ fontSize: '18px', fontWeight: '700', color: '#0F172A', marginBottom: '16px' }}>🏦 Global Investment Bank — Company Profile</h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
                {[
                  { label: 'Industry', val: 'Investment Banking, Wealth Mgmt' },
                  { label: 'Employees', val: '80,000+ globally' },
                  { label: 'Data Stack', val: 'Snowflake + Databricks + Power BI + Excel' },
                  { label: 'Regulatory', val: 'SEC, FCA, GDPR, SOX, BCBS 239, Basel III' },
                  { label: 'Annual Revenue', val: '$50B+' },
                  { label: 'Data Team', val: '1,000+ engineers &amp; analysts' },
                ].map((r, i) => (
                  <div key={i} style={{ background: '#fff', borderRadius: '10px', padding: '14px 16px', border: '1px solid #E2E8F0' }}>
                    <div style={{ fontSize: '11px', fontWeight: '700', color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '4px' }}>{r.label}</div>
                    <div style={{ fontSize: '14px', fontWeight: '600', color: '#0F172A' }} dangerouslySetInnerHTML={{ __html: r.val }} />
                  </div>
                ))}
              </div>
            </div>
            <div className="case-box before" style={{ flex: 1 }}>
              <h4>Before DataTrust — Annual Cost: $38M / year</h4>
              <div className="case-step"><span className="cs-time">SEC 10-Q</span> 500+ Excel files, 200+ data sources — 16 days per quarter, 20 FTEs</div>
              <div className="case-step"><span className="cs-time">BCBS 239</span> Inconsistent risk definitions across 50+ systems</div>
              <div className="case-step"><span className="cs-time">Basel III</span> 1,000+ DAX measures requiring manual SQL rewrite — $2M/year</div>
              <div className="case-step"><span className="cs-time">GDPR</span> No lineage — "Where does customer data come from?" took days</div>
              <div className="case-step"><span className="cs-time">SOX</span> No immutable audit trail — "Who changed this number?" had no answer</div>
              <div className="case-total red">Total: $38M / year in manual effort, fines &amp; penalties</div>
            </div>
            <div className="case-box after" style={{ flex: 1 }}>
              <h4>After DataTrust V3.0 — 5 Hours (was 16 days)</h4>
              <div className="case-step"><span className="cs-time">Step 1</span> Open Excel template — DataTrust ribbon loads automatically</div>
              <div className="case-step"><span className="cs-time">Step 2</span> Click "Refresh All" — all 500+ sheets load live from Snowflake</div>
              <div className="case-step"><span className="cs-time">Step 3</span> Quality Engine validates all cells against 1,000+ rules in 5 minutes</div>
              <div className="case-step"><span className="cs-time">Step 4</span> Auto-Correction V2 fixes 3 anomalies — zero human intervention</div>
              <div className="case-step"><span className="cs-time">Step 5</span> One-click SOX / SEC Audit Pack export — CFO approves, submits</div>
              <div className="case-total green">Annual savings: $31.3M / year · 2 FTEs (was 20) · 50x ROI</div>
            </div>
          </div>
        )}
      </section>

      {false && ( <>
      {/* ─── BUSINESS IMPACT V2.0 vs V3.0 ─────────────────────── */}
      <section style={{ padding: '100px 5%', background: '#F8FAFC' }} id="impact">
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div className="section-label scroll-reveal fade-up" style={{ marginBottom: '1rem' }}>V2.0 → V3.0 Impact</div>
          <h2 className="section-title scroll-reveal fade-up delay-100">Measurable improvements. Every metric.</h2>
          <p className="section-subtitle scroll-reveal fade-up delay-200" style={{ marginBottom: '2.5rem' }}>
            V3.0 doesn’t just add features — it moves every performance metric significantly. Here’s the before/after comparison.
          </p>

          <div className="scroll-reveal scale-in delay-300" style={{ borderRadius: '16px', overflow: 'hidden', border: '1px solid #E2E8F0', boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}>
            {/* Header row */}
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1.2fr', background: '#0F172A', padding: '14px 20px' }}>
              <div style={{ fontSize: '12px', fontWeight: '700', color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Metric</div>
              <div style={{ fontSize: '12px', fontWeight: '700', color: '#EF4444', textTransform: 'uppercase', letterSpacing: '0.06em' }}>V2.0</div>
              <div style={{ fontSize: '12px', fontWeight: '700', color: '#00BFA5', textTransform: 'uppercase', letterSpacing: '0.06em' }}>V3.0</div>
              <div style={{ fontSize: '12px', fontWeight: '700', color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Improvement</div>
            </div>

            {/* Data rows */}
            <div style={{ background: '#fff' }}>
              {[
                { metric: 'Manual Excel work reduction', v2: '70%', v3: '90%', delta: '+20%', v2bar: 70, v3bar: 90, pos: true },
                { metric: 'Data quality issues caught', v2: '80%', v3: '95%', delta: '+15%', v2bar: 80, v3bar: 95, pos: true },
                { metric: 'Audit preparation time', v2: '1 hour', v3: '15 min', delta: '-75%', v2bar: 100, v3bar: 25, pos: false },
                { metric: 'DAX migration time', v2: '2 days', v3: '1 hour', delta: '-95%', v2bar: 100, v3bar: 5, pos: false },
                { metric: 'Rule creation time', v2: '1 hour', v3: '5 min', delta: '-92%', v2bar: 100, v3bar: 8, pos: false },
                { metric: 'User adoption rate', v2: '80%', v3: '95%', delta: '+15%', v2bar: 80, v3bar: 95, pos: true },
                { metric: 'NLQ response time', v2: 'N/A', v3: '< 2 sec', delta: 'NEW', v2bar: 0, v3bar: 100, pos: true },
                { metric: 'Auto-correction rate', v2: 'Manual', v3: '80%+', delta: 'NEW', v2bar: 0, v3bar: 80, pos: true },
              ].map((row, i) => (
                <div key={i} className="impact-row">
                  <div style={{ fontWeight: '600', fontSize: '14px', color: '#0F172A' }}>{row.metric}</div>
                  <div style={{ fontSize: '14px', color: '#EF4444', fontWeight: '700' }}>{row.v2}</div>
                  <div style={{ fontSize: '14px', color: '#10B981', fontWeight: '700' }}>{row.v3}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span className={`impact-delta ${row.pos ? 'delta-pos' : 'delta-neg'}`}>{row.delta}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom summary chips */}
          <div className="scroll-reveal fade-up delay-400" style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center', marginTop: '32px' }}>
            {[
              { icon: '⬆️', text: 'Every quality metric improves by 15%+' },
              { icon: '⏱️', text: 'Time-based metrics drop by 75–95%' },
              { icon: '🤖', text: '2 new AI-only capabilities added' },
              { icon: '🎯', text: 'Target: 95% user adoption by Q4 2027' },
            ].map((chip, i) => (
              <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 18px', background: '#fff', border: '1px solid #E2E8F0', borderRadius: '999px', fontSize: '13px', color: '#334155', fontWeight: '600', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                {chip.icon} {chip.text}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PRICING ────────────────────────────────────────────── */}
      <section className="pricing" id="pricing" style={{ backgroundColor: '#F8FAFC' }}>
        <div className="section-label scroll-reveal fade-up">V3.0 Pricing</div>
        <h2 className="section-title scroll-reveal fade-up delay-100">Transparent plans. Measurable ROI.</h2>
        <p className="section-subtitle scroll-reveal fade-up delay-200">Every plan comes with a 30-day pilot on your actual data. See the value before you commit.</p>
        <div className="pricing-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
          <div className="plan-card scroll-reveal fade-up delay-200">
            <div className="plan-name">Starter</div>
            <div className="plan-price">₹15L</div>
            <div className="plan-users">Up to 10 users · Annual</div>
            <ul className="plan-features">
              <li>Excel Add-in V3</li>
              <li>Semantic Layer (basic)</li>
              <li>AI Rule Inference V2</li>
              <li>Audit Trail</li>
              <li>Email support</li>
            </ul>
            <div className="plan-roi">ROI: up to 5x</div>
          </div>
          <div className="plan-card scroll-reveal fade-up delay-300">
            <div className="plan-name">Professional</div>
            <div className="plan-price">₹30L</div>
            <div className="plan-users">Up to 25 users · Annual</div>
            <ul className="plan-features">
              <li>Everything in Starter</li>
              <li>NLQ (Natural Language Query)</li>
              <li>dbt / Looker integration</li>
              <li>Slack &amp; Teams alerts</li>
              <li>Priority support</li>
            </ul>
            <div className="plan-roi">ROI: up to 10x</div>
          </div>
          <div className="plan-card popular scroll-reveal fade-up delay-400">
            <div className="popular-badge">Most Popular</div>
            <div className="plan-name">Enterprise</div>
            <div className="plan-price">₹50L</div>
            <div className="plan-users">Up to 50 users · Annual</div>
            <ul className="plan-features">
              <li>Predictive Quality Engine</li>
              <li>Auto-Correction V2</li>
              <li>RBAC &amp; SSO</li>
              <li>Team Workspaces</li>
              <li>Dedicated CSM</li>
            </ul>
            <div className="plan-roi">ROI: up to 20x</div>
          </div>
          <div className="plan-card scroll-reveal fade-up delay-500">
            <div className="plan-name">Platinum</div>
            <div className="plan-price">₹75L</div>
            <div className="plan-users">100+ users · Annual</div>
            <ul className="plan-features">
              <li>Everything in Enterprise</li>
              <li>Redshift / BigQuery connectors</li>
              <li>On-prem deployment</li>
              <li>SLA guarantee</li>
              <li>24/7 support</li>
            </ul>
            <div className="plan-roi">ROI: up to 31x</div>
          </div>
          <div className="plan-card ultimate scroll-reveal fade-up delay-600">
            <div className="plan-name">Ultimate</div>
            <div className="plan-price">₹1 Cr</div>
            <div className="plan-users">Unlimited users · Annual</div>
            <ul className="plan-features">
              <li>Custom LLM fine-tuning</li>
              <li>Enterprise support 24/7</li>
              <li>Dedicated success manager</li>
              <li>Custom integrations</li>
              <li>SOC2 Type II audit pack</li>
            </ul>
            <div className="plan-roi">ROI: up to 50x</div>
          </div>
        </div>
      </section>

      {/* ─── EARLY ADOPTER CTA ────────────────────────────────── */}
      <section style={{ padding: '80px 5%', background: '#fff' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div className="early-cta-card scroll-reveal scale-in">
            <div style={{ position: 'relative', zIndex: 1 }}>
              {/* Top badges */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '28px', flexWrap: 'wrap' }}>
                <div className="spots-counter">
                  <div className="spots-dot" />
                  3 spots remaining
                </div>
                <span style={{ fontSize: '13px', fontWeight: '600', color: 'rgba(255,255,255,0.4)' }}>of 5 early-adopter slots for V3.0</span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '40px', alignItems: 'center', flexWrap: 'wrap' }}>
                <div>
                  <h2 style={{ fontSize: '36px', fontWeight: '800', color: '#fff', margin: '0 0 16px', lineHeight: '1.2' }}>
                    Be 1 of 5 Enterprise Early Adopters for V3.0
                  </h2>
                  <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '16px', lineHeight: '1.7', margin: '0 0 28px', maxWidth: '540px' }}>
                    Co-design V3.0 features with our team, get priority support, and lock in founding-tier pricing before the public launch in Q4 2027.
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '32px' }}>
                    {[
                      '🏆 Co-design V3.0 features with the core team',
                      '🔒 Lock in founding pricing — never increases',
                      '⚡ Priority integration support & dedicated CSM',
                      '🧠 Early access to AI Rule Inference V2 + NLQ',
                      '🎤 Case study & co-marketing opportunity',
                    ].map((benefit, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span style={{ color: '#00BFA5', fontSize: '15px' }}>✓</span>
                        <span style={{ color: 'rgba(255,255,255,0.75)', fontSize: '14px' }}>{benefit}</span>
                      </div>
                    ))}
                  </div>
                  <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
                    <a href="mailto:datatrust.ai@zohomail.in?subject=V3.0 Early Adopter Interest"
                      style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#00BFA5', color: '#0F172A', padding: '14px 32px', borderRadius: '12px', textDecoration: 'none', fontWeight: '800', fontSize: '15px', boxShadow: '0 0 30px rgba(0,191,165,0.3)', transition: 'opacity 0.2s' }}
                      onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
                      onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                    >
                      Apply as Early Adopter →
                    </a>
                    <a href="mailto:datatrust.ai@zohomail.in"
                      style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.08)', color: '#fff', padding: '14px 28px', borderRadius: '12px', textDecoration: 'none', fontWeight: '700', fontSize: '15px', border: '1px solid rgba(255,255,255,0.15)', transition: 'background 0.2s' }}
                      onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.14)'}
                      onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.08)'}
                    >
                      📧 datatrust.ai@zohomail.in
                    </a>
                  </div>
                </div>

                {/* Stats column */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', minWidth: '160px' }}>
                  {[
                    { val: '50x', label: 'Max ROI (Ultimate)', color: '#00BFA5' },
                    { val: 'Q1', label: '2027 Start Date', color: '#818CF8' },
                    { val: '30d', label: 'Free Pilot Period', color: '#FCD34D' },
                  ].map((s, i) => (
                    <div key={i} style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '14px', padding: '20px', textAlign: 'center' }}>
                      <div style={{ fontSize: '28px', fontWeight: '800', color: s.color, marginBottom: '4px' }}>{s.val}</div>
                      <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)', fontWeight: '600' }}>{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      </> )}
      {/* ─── MEET THE TEAM ───────────────────────────────────────── */}
      <section style={{ padding: '100px 5%', backgroundColor: 'var(--navy)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', textAlign: 'center' }}>
          <div className="section-label scroll-reveal fade-up" style={{ marginBottom: '1rem' }}>The People Behind DataTrust</div>
          <h2 className="section-title scroll-reveal fade-up delay-100" style={{ color: '#fff', margin: '0 auto 1rem', maxWidth: '600px' }}>Built by someone who lived the problem</h2>
          <p className="section-subtitle scroll-reveal fade-up delay-200" style={{ color: 'var(--gray)', margin: '0 auto 3.5rem', maxWidth: '580px' }}>
            Not a random SaaS idea — DataTrust was born from real enterprise pain.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '32px', flexWrap: 'wrap' }}>
            {/* Card 1 — Manoj */}
            <div className="scroll-reveal fade-up delay-300" style={{ maxWidth: '360px', width: '100%' }}>
              <div style={{ background: 'var(--navy-mid)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '20px', padding: '40px', textAlign: 'center', transition: 'transform 0.3s, box-shadow 0.3s', boxShadow: '0 10px 40px rgba(0,0,0,0.3)' }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.boxShadow = '0 20px 50px rgba(0,0,0,0.4)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 10px 40px rgba(0,0,0,0.3)'; }}
              >
                <div style={{ position: 'relative', display: 'inline-block', marginBottom: '24px' }}>
                  <img
                    src="https://media.licdn.com/dms/image/v2/D5603AQFhJDtaHrHn2A/profile-displayphoto-scale_400_400/B56Z5vZEShIoAk-/0/1779985304253?e=1783555200&v=beta&t=F0gCCbUwZ7j1vERCtOraIUSxZoox3OGDeyOn2pDbP04"
                    alt="Manoj Rajput"
                    style={{ width: '120px', height: '120px', borderRadius: '50%', objectFit: 'cover', border: '3px solid var(--teal)', boxShadow: '0 0 0 6px rgba(0,191,165,0.12)' }}
                  />
                  <div style={{ position: 'absolute', bottom: '4px', right: '4px', background: 'var(--teal)', borderRadius: '50%', width: '22px', height: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', border: '2px solid var(--navy-mid)' }}>✓</div>
                </div>
                <h3 style={{ fontSize: '22px', fontWeight: '700', color: '#fff', marginBottom: '4px' }}>Manoj Singh Rajput</h3>
                <p style={{ color: 'var(--teal)', fontWeight: '600', fontSize: '14px', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Founder &amp; Creator</p>
                <p style={{ color: 'var(--gray)', fontSize: '14px', lineHeight: '1.7', marginBottom: '24px' }}>
                  "I watched finance teams spend entire Mondays manually exporting data and reconciling numbers that still didn't match. DataTrust is the platform I wished existed."
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center', marginBottom: '28px' }}>
                  {['Data Engineering', 'Enterprise SaaS', 'AI/ML', 'Governance'].map(tag => (
                    <span key={tag} style={{ fontSize: '12px', padding: '4px 12px', borderRadius: '999px', background: 'rgba(0,191,165,0.1)', color: 'var(--teal)', border: '1px solid rgba(0,191,165,0.2)', fontWeight: '600' }}>{tag}</span>
                  ))}
                </div>
                <a href="https://www.linkedin.com/in/manojrajput2065/" target="_blank" rel="noreferrer"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: '#0A66C2', color: '#ffffff', padding: '11px 26px', borderRadius: '30px', textDecoration: 'none', fontWeight: '600', fontSize: '14px', boxShadow: '0 4px 12px rgba(10,102,194,0.35)' }}
                  onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
                  onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" /><circle cx="4" cy="4" r="2" /></svg>
                  Connect on LinkedIn
                </a>
              </div>
            </div>

            {/* Card 2 — Sushil */}
            <div className="scroll-reveal fade-up delay-400" style={{ maxWidth: '360px', width: '100%' }}>
              <div style={{ background: 'var(--navy-mid)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '20px', padding: '40px', textAlign: 'center', transition: 'transform 0.3s, box-shadow 0.3s', boxShadow: '0 10px 40px rgba(0,0,0,0.3)' }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.boxShadow = '0 20px 50px rgba(0,0,0,0.4)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 10px 40px rgba(0,0,0,0.3)'; }}
              >
                <div style={{ position: 'relative', display: 'inline-block', marginBottom: '24px' }}>
                  <img
                    src="https://media.licdn.com/dms/image/v2/D5603AQFm-xoz0HDvkQ/profile-displayphoto-crop_800_800/B56ZypFfKyIIAI-/0/1772363315544?e=1783555200&v=beta&t=48nCotodmY4GQZ-0Bt0edbSjDoqmBt0RXLGjLjjInoo"
                    alt="Sushil Lalhal"
                    style={{ width: '120px', height: '120px', borderRadius: '50%', objectFit: 'cover', border: '3px solid var(--blue-light)', boxShadow: '0 0 0 6px rgba(30,136,229,0.12)' }}
                  />
                  <div style={{ position: 'absolute', bottom: '4px', right: '4px', background: 'var(--blue-light)', borderRadius: '50%', width: '22px', height: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', border: '2px solid var(--navy-mid)' }}>✓</div>
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
                <a href="https://www.linkedin.com/in/sushil-lalhal-24396b300/" target="_blank" rel="noreferrer"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: '#0A66C2', color: '#ffffff', padding: '11px 26px', borderRadius: '30px', textDecoration: 'none', fontWeight: '600', fontSize: '14px', boxShadow: '0 4px 12px rgba(10,102,194,0.35)' }}
                  onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
                  onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" /><circle cx="4" cy="4" r="2" /></svg>
                  Connect on LinkedIn
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ───────────────────────────────────────────── */}
      <section style={{ padding: '100px 5%', backgroundColor: 'transparent' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', textAlign: 'center' }}>
          <div className="section-label scroll-reveal fade-up" style={{ marginBottom: '1rem' }}>Social Proof</div>
          <h2 className="section-title scroll-reveal fade-up delay-100" style={{ margin: '0 auto 1rem', maxWidth: '600px' }}>What decision-makers say</h2>
          <p className="section-subtitle scroll-reveal fade-up delay-200" style={{ margin: '0 auto 3.5rem' }}>Early feedback from enterprise stakeholders who tested DataTrust.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
            {[
              { quote: '"DataTrust ne hamara monthly reporting time 8 hours se 10 minutes kar diya. Board meetings ab numbers pe nahi, strategy pe hoti hain."', author: 'CFO', company: 'Leading Indian Retail Chain' },
              { quote: '"V3.0 ka NLQ feature game-changer hai. Ab koi bhi analyst SQL jaane bina live data Excel mein dekh sakta hai — 2 seconds mein."', author: 'Head of Analytics', company: 'Enterprise Finance Firm' },
              { quote: '"Revenue figures ab sabke liye same hain — Finance, Sales, Marketing. Semantic drift khatam. Trust wapas aaya."', author: 'VP of Data', company: 'Multi-BU Conglomerate' },
            ].map((t, i) => (
              <div key={i} className={`scroll-reveal fade-up delay-${(i + 3) * 100}`} style={{ background: '#FFFFFF', borderRadius: '16px', padding: '32px', border: '1px solid var(--gray-light)', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', textAlign: 'left' }}>
                <div style={{ fontSize: '28px', color: 'var(--teal)', lineHeight: 1, marginBottom: '16px' }}>&ldquo;</div>
                <p style={{ color: 'var(--text)', fontSize: '15px', lineHeight: '1.75', marginBottom: '20px', fontStyle: 'italic' }}>{t.quote}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', borderTop: '1px solid var(--gray-light)', paddingTop: '16px' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--navy)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--teal)', fontWeight: '700', fontSize: '16px' }}>{t.author[0]}</div>
                  <div>
                    <div style={{ fontWeight: '700', fontSize: '14px', color: 'var(--text)' }}>{t.author}</div>
                    <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{t.company}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FAQ ────────────────────────────────────────────────────── */}
      <section style={{ padding: '100px 5%', backgroundColor: '#FFFFFF' }} id="faq">
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div className="section-label scroll-reveal fade-up" style={{ marginBottom: '1rem', textAlign: 'center', display: 'block' }}>FAQ</div>
          <h2 className="section-title scroll-reveal fade-up delay-100" style={{ textAlign: 'center', margin: '0 auto 1rem', maxWidth: '600px' }}>Frequently Asked Questions</h2>
          <p className="section-subtitle scroll-reveal fade-up delay-200" style={{ textAlign: 'center', margin: '0 auto 3.5rem' }}>Everything you need to know before getting started with V3.0.</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {[
              { q: 'What is new in V3.0 vs V2.0?', a: 'V3.0 adds an entire AI & Intelligence layer: Natural Language Query (NLQ) that answers questions in plain English in 2 seconds, Predictive Quality Engine (catches issues before they happen), Auto-Correction V2 (fixes issues automatically with rollback), 6 new connectors (Redshift, BigQuery, Azure SQL, dbt, Looker, Tableau), Team Workspaces, and Approval Workflows V2. V2.0 features remain intact as the proven foundation.' },
              { q: 'How does Natural Language Query (NLQ) work?', a: 'You type a plain English question like "What was Q4 Revenue for West region?" in the DataTrust Excel ribbon or web console. The NLQ engine embeds your question, does semantic search over your metric definitions using pgvector, builds a RAG prompt, and uses the LLM to generate validated SQL — all in under 2 seconds. No SQL, no DAX, no data engineer needed.' },
              { q: 'What is Predictive Quality, and how is it different from Anomaly Detection?', a: 'Anomaly Detection (V2.0) catches issues after they appear — in under 5 minutes. Predictive Quality (V3.0) uses ML time-series forecasting to flag degradation before it happens — often hours or days early. The goal is to go from "reactive" to "predictive" so issues never reach business users at all.' },
              { q: 'Does DataTrust store my data?', a: 'No. DataTrust runs entirely within your own environment. Your data never leaves your perimeter — all processing happens locally in your infrastructure.' },
              { q: 'Can I try before buying?', a: 'Yes. Every plan includes a 30-day pilot on your actual data. You see the value on your own numbers before committing.' },
              { q: 'How long does implementation take?', a: 'Typically 2–4 weeks from contract signing to go-live, depending on your data warehouse setup and team size. V3.0 AI features are additive and do not require rebuilding existing pipelines.' },
              { q: 'Is DataTrust SOC2 / GDPR / SOX / BCBS 239 compliant?', a: 'Yes. DataTrust V3.0 includes pre-built compliance report packs for SOC2 Type II, GDPR, SOX, HIPAA, and BCBS 239. Data masking, retention policies, and an immutable audit trail are all built in.' },
              { q: 'Which data warehouses and tools does V3.0 support?', a: 'Warehouses: Snowflake, Databricks, Microsoft Fabric, Amazon Redshift, Google BigQuery, Azure SQL. BI/transformation tools: Power BI, Tableau, Looker, dbt. Data lakes: AWS S3, Azure Blob. Output: Excel (primary), Power BI (push), REST API, Webhooks.' },
            ].map((item, i) => (
              <details key={i} className={`scroll-reveal fade-up delay-${Math.min((i + 1) * 100, 600)}`} style={{ background: 'var(--off-white)', borderRadius: '12px', border: '1px solid var(--gray-light)', padding: '0' }}>
                <summary style={{ padding: '20px 24px', fontWeight: '600', fontSize: '16px', color: 'var(--text)', cursor: 'pointer', listStyle: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  {item.q} <span style={{ fontSize: '20px', color: 'var(--teal)', marginLeft: '12px', flexShrink: 0 }}>+</span>
                </summary>
                <div style={{ padding: '0 24px 20px', color: 'var(--text-muted)', fontSize: '15px', lineHeight: '1.7' }}>{item.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SECURITY BADGES ────────────────────────────────────────── */}
      <div className="scroll-reveal fade-up" style={{ backgroundColor: 'var(--navy)', padding: '28px 5%', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
          <span style={{ color: 'var(--gray)', fontSize: '13px', fontWeight: '600', marginRight: '8px' }}>Enterprise Security:</span>
          {[
            { icon: '🔐', label: 'SOC2 Type II' },
            { icon: '🇪🇺', label: 'GDPR Ready' },
            { icon: '🏥', label: 'HIPAA Compliant' },
            { icon: '📋', label: 'SOX &amp; BCBS 239' },
            { icon: '🔒', label: 'AES-256 + TLS 1.3' },
            { icon: '🛡️', label: 'Zero-Trust' },
          ].map((b, idx) => (
            <span key={b.label} className={`scroll-reveal scale-in delay-${(idx + 2) * 100}`} style={{ fontSize: '13px', fontWeight: '600', color: 'var(--white)', background: 'rgba(0,191,165,0.1)', border: '1px solid rgba(0,191,165,0.2)', padding: '7px 16px', borderRadius: '999px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
              dangerouslySetInnerHTML={{ __html: `${b.icon} ${b.label}` }}
            />
          ))}
        </div>
      </div>

      {/* ─── CTA SECTION ────────────────────────────────────────────── */}
      <section className="cta-section" id="contact">
        <h2 className="scroll-reveal fade-up">Ready to trust your numbers?</h2>
        <p className="scroll-reveal fade-up delay-100">
          V3.0 is in development. Be one of 5 early-adopter enterprise customers and help shape the platform.
        </p>
        <div className="cta-buttons scroll-reveal fade-up delay-200" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
          <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'center' }}>
            <button onClick={onEnterWorkspace} className="btn-primary">
              Launch Limited UI Demo
            </button>
            <a href="mailto:datatrust.ai@zohomail.in" className="btn-outline">
              Email: datatrust.ai@zohomail.in
            </a>
          </div>
          <p style={{ fontSize: '13px', color: '#64748B', marginTop: '10px', textAlign: 'center' }}>
            To view the full product demo, request a private walkthrough at datatrust.ai@zohomail.in
          </p>
        </div>
      </section>

      {/* ─── NEWSLETTER ─────────────────────────────────────────────── */}
      <section style={{ padding: '80px 5%', backgroundColor: '#FFFFFF' }}>
        <div style={{ maxWidth: '560px', margin: '0 auto', textAlign: 'center' }}>
          <div className="scroll-reveal fade-up" style={{ fontSize: '32px', marginBottom: '16px' }}>🔔</div>
          <h3 className="scroll-reveal fade-up delay-100" style={{ fontSize: '28px', fontWeight: '700', color: 'var(--text)', marginBottom: '12px', fontFamily: 'var(--font-display)' }}>Stay in the loop</h3>
          <p className="scroll-reveal fade-up delay-200" style={{ color: 'var(--text-muted)', fontSize: '16px', marginBottom: '32px', lineHeight: '1.7' }}>
            Get V3.0 release updates, early-access announcements, and enterprise case studies. No spam. Unsubscribe anytime.
          </p>
          <form onSubmit={e => { e.preventDefault(); alert('Thanks! We will be in touch at datatrust.ai@zohomail.in'); }}
            className="scroll-reveal fade-up delay-300"
            style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}
          >
            <input type="email" placeholder="Enter your work email" required
              style={{ flex: '1', minWidth: '240px', padding: '14px 20px', borderRadius: '8px', border: '1px solid var(--gray-light)', fontSize: '15px', color: 'var(--text)', outline: 'none', fontFamily: 'var(--font-sans)' }}
            />
            <button type="submit"
              style={{ padding: '14px 28px', background: 'var(--teal)', color: 'var(--navy)', fontWeight: '700', fontSize: '15px', border: 'none', borderRadius: '8px', cursor: 'pointer', whiteSpace: 'nowrap' }}
              onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
              onMouseLeave={e => e.currentTarget.style.opacity = '1'}
            >
              Subscribe
            </button>
          </form>
          <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '16px' }}>📧 datatrust.ai@zohomail.in</p>
        </div>
      </section>

      {/* ─── FOOTER ─────────────────────────────────────────────────── */}
      <Footer setView={setView} />
    </div>
  );
}
