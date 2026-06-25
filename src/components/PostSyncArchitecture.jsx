import React, { useState, useEffect, useRef } from 'react';

const CodeBlock = ({ title, code, language = 'text' }) => {
  const [expanded, setExpanded] = useState(false);
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    alert('Code copied to clipboard!');
  };

  let colorizedCode = code;
  if (language === 'text') {
    colorizedCode = code
      .replace(/([┌┬┐├┼┤└┴┘─│]+)/g, '<span style="color: #6366F1; opacity: 0.7;">$1</span>')
      .replace(/(INPUT:|PROCESS:|OUTPUT:|USER:|STEP \d+:)/g, '<span style="color: #10B981; font-weight: 700;">$1</span>')
      .replace(/(Snowflake_Prod|SEMABRIDGE_DB|PUBLIC|sales_transactions|hr_employees|finance_revenue|sales_deals|customer_data)/g, '<span style="color: #F59E0B; font-weight: 700;">$1</span>')
      .replace(/(SELECT|FROM|WHERE|AND|ORDER BY|SHOW TABLES IN|SHOW VIEWS|SHOW COLUMNS)/g, '<span style="color: #EC4899; font-weight: 700;">$1</span>');
  }

  return (
    <div style={{ marginBottom: '40px', background: 'linear-gradient(145deg, #0F172A 0%, #1E293B 100%)', borderRadius: '16px', border: '1px solid rgba(99,102,241,0.2)', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.4)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 20px', background: 'rgba(0,0,0,0.4)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#EF4444' }}></div>
          <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#F59E0B' }}></div>
          <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#10B981' }}></div>
          <div style={{ color: '#94A3B8', fontSize: '13px', fontFamily: '"Fira Code", monospace', marginLeft: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ color: '#6366F1' }}>⚡</span> {title}
          </div>
        </div>
        <button 
          onClick={copyToClipboard}
          style={{ background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.3)', color: '#818CF8', padding: '6px 14px', borderRadius: '6px', fontSize: '12px', cursor: 'pointer', transition: 'all 0.2s ease', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '6px' }}
        >
          Copy Code
        </button>
      </div>
      
      <div style={{ position: 'relative' }}>
        {language === 'text' ? (
          <div style={{ 
            padding: '24px 32px', 
            overflowX: 'auto', 
            fontFamily: '"Fira Code", "Consolas", monospace', 
            fontSize: '14px', 
            lineHeight: '1.6', 
            color: '#E2E8F0', 
            whiteSpace: 'pre',
            maxHeight: expanded ? 'none' : '400px',
            overflowY: expanded ? 'visible' : 'hidden',
            transition: 'max-height 0.3s ease'
          }}
          dangerouslySetInnerHTML={{ __html: colorizedCode }}
          />
        ) : (
          <div style={{ 
            padding: '24px 32px', 
            overflowX: 'auto', 
            fontFamily: '"Fira Code", "Consolas", monospace', 
            fontSize: '14px', 
            lineHeight: '1.6', 
            color: '#E2E8F0', 
            whiteSpace: 'pre',
            maxHeight: expanded ? 'none' : '400px',
            overflowY: expanded ? 'visible' : 'hidden',
            transition: 'max-height 0.3s ease'
          }}>
            {code}
          </div>
        )}
        
        {!expanded && (
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '120px',
            background: 'linear-gradient(to bottom, transparent, #1E293B)',
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'center',
            paddingBottom: '20px'
          }}>
            <button 
              onClick={() => setExpanded(true)}
              style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', padding: '8px 24px', borderRadius: '20px', color: '#fff', cursor: 'pointer', backdropFilter: 'blur(4px)', fontWeight: '500' }}
            >
              Show Full Content ↓
            </button>
          </div>
        )}
      </div>

      {expanded && (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '16px', borderTop: '1px solid rgba(255,255,255,0.05)', background: 'rgba(0,0,0,0.2)' }}>
           <button 
              onClick={() => setExpanded(false)}
              style={{ background: 'transparent', border: 'none', color: '#94A3B8', cursor: 'pointer', fontWeight: '500' }}
            >
              Collapse Content ↑
            </button>
        </div>
      )}
    </div>
  );
};

const MermaidBlock = ({ chart }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (window.mermaid) {
      window.mermaid.initialize({ startOnLoad: true, theme: 'dark' });
      window.mermaid.init(undefined, containerRef.current);
    } else {
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/mermaid/dist/mermaid.min.js';
      script.async = true;
      script.onload = () => {
        window.mermaid.initialize({ startOnLoad: true, theme: 'dark' });
        window.mermaid.init(undefined, containerRef.current);
      };
      document.body.appendChild(script);
    }
  }, [chart]);

  return (
    <div style={{ marginBottom: '40px', background: 'rgba(15, 23, 42, 0.4)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)', padding: '24px', overflowX: 'auto' }}>
      <div className="mermaid" ref={containerRef}>
        {chart}
      </div>
    </div>
  );
};

const PostSyncArchitecture = () => {
  const [activeSection, setActiveSection] = useState('data-flow');

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
    }
  };

  const navItems = [
    { id: 'data-flow', label: '1. Data Flow (HLD)' },
    { id: 'extraction-sync', label: '2. Sync Flow (HLD)' },
    { id: 'query-translation', label: '3. Query Translation' },
    { id: 'post-sync-exec', label: '4. Post-Sync Execution' },
    { id: 'hld-overview', label: '5. Architecture Overview' },
    { id: 'lld-schema', label: '6. LLD & Database Schema' },
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#020617', color: '#F8FAFC', fontFamily: '"Inter", sans-serif', paddingTop: '80px', paddingBottom: '100px' }}>
      
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '60px', padding: '0 20px' }}>
        <div style={{ display: 'inline-block', padding: '6px 16px', background: 'rgba(236, 72, 153, 0.1)', border: '1px solid rgba(236, 72, 153, 0.2)', borderRadius: '20px', color: '#EC4899', fontSize: '13px', fontWeight: '600', letterSpacing: '1px', marginBottom: '24px' }}>
          POST-SYNC & DATA FLOW
        </div>
        <h1 style={{ fontSize: '48px', fontWeight: '800', marginBottom: '20px', letterSpacing: '-1px' }}>
          Complete Architecture <br />
          <span style={{ background: 'linear-gradient(135deg, #EC4899 0%, #8B5CF6 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>HLD & LLD Perspective</span>
        </h1>
        <p style={{ fontSize: '20px', color: '#94A3B8', maxWidth: '800px', margin: '0 auto', lineHeight: '1.6' }}>
          Explore the entire Data Flow, Component Interactions, and Post-Sync Operational phase turning raw metadata into a governed data delivery system.
        </p>
      </div>

      <div style={{ display: 'flex', maxWidth: '1400px', margin: '0 auto', padding: '0 40px', gap: '60px' }}>
        
        {/* Sidebar Navigation */}
        <div style={{ width: '280px', flexShrink: 0, position: 'relative' }}>
          <div style={{ position: 'sticky', top: '100px', background: 'rgba(255,255,255,0.02)', padding: '24px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
            <h3 style={{ fontSize: '14px', textTransform: 'uppercase', letterSpacing: '1px', color: '#94A3B8', marginBottom: '20px', fontWeight: '700' }}>Sections</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {navItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => scrollToSection(item.id)}
                    style={{
                      width: '100%',
                      textAlign: 'left',
                      padding: '10px 16px',
                      background: activeSection === item.id ? 'rgba(236,72,153,0.1)' : 'transparent',
                      color: activeSection === item.id ? '#EC4899' : '#CBD5E1',
                      border: 'none',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontSize: '14px',
                      fontWeight: activeSection === item.id ? '600' : '400',
                      transition: 'all 0.2s ease',
                      borderLeft: activeSection === item.id ? '3px solid #EC4899' : '3px solid transparent'
                    }}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Content Area */}
        <div style={{ flexGrow: 1, minWidth: 0 }}>
          
          {/* Section 1 */}
          <section id="data-flow" style={{ marginBottom: '80px', scrollMarginTop: '100px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
              <div style={{ width: '48px', height: '48px', background: 'rgba(59,130,246,0.1)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#3B82F6', fontSize: '24px' }}>🏗️</div>
              <h2 style={{ fontSize: '32px', fontWeight: '700' }}>1. HLD System Architecture</h2>
            </div>
            <p style={{ color: '#E2E8F0', fontSize: '16px', marginBottom: '24px' }}>
              System ke main components aur unke aapas ke communication links:
            </p>
            <MermaidBlock chart={`graph TD
    %% Clients
    subgraph Client Layer
        FE[React Web Console]
        EX[Excel Add-in / Simulator]
    end

    %% Backend Services
    subgraph FastAPI Backend Layer [FastAPI Application Port: 8000]
        API[API Gateway / Routers]
        SEM[Semantic Engine]
        ORCH[Dynamic Orchestrator]
    end

    %% Storage & AI
    subgraph Storage & AI Layer
        DB[(PostgreSQL CSM Store)]
        LLM[LLM Gateway - Groq/OpenAI/Gemini]
    end

    %% Cloud Data Warehouse
    subgraph Data Source Layer
        SF[(Snowflake Warehouse)]
    end

    %% Connections
    FE & EX -->|HTTP Requests| API
    API -->|Metadata Queries| SEM
    API -->|Execute Pipelines| ORCH
    ORCH -->|10-Stage Pipeline| SEM
    SEM & ORCH -->|Read/Write Metadata| DB
    SEM -->|Call Fallback Translation| LLM
    SEM & ORCH -->|Introspect & Run SQL| SF`} />
          </section>

          {/* Section 2 */}
          <section id="extraction-sync" style={{ marginBottom: '80px', scrollMarginTop: '100px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
              <div style={{ width: '48px', height: '48px', background: 'rgba(16,185,129,0.1)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10B981', fontSize: '24px' }}>🔄</div>
              <h2 style={{ fontSize: '32px', fontWeight: '700' }}>2. Metadata Extraction & Sync Flow</h2>
            </div>
            <p style={{ color: '#E2E8F0', fontSize: '16px', marginBottom: '24px' }}>
              Jab database se metadata sync hota hai (Stage 2 ya <code>/sync</code> router call pe), tab system niche diye gaye tarike se kaam karta hai:
            </p>
            <MermaidBlock chart={`sequenceDiagram
    participant User as Web Console / Scheduler
    participant API as FastAPI Router (semantic.py)
    participant Conn as Snowflake Connector
    participant DB as PostgreSQL (CSM Tables)

    User->>API: POST /api/v1/semantic/sync (Connection ID)
    API->>Conn: Connect & Fetch (SHOW TABLES & COLUMNS)
    Conn-->>API: Returns Catalog List (Tables & Column Types)
    
    Note over API,DB: Dynamic Schema Sync Algorithm
    
    API->>DB: Check & Insert Datasets (CSMDatasetDB)
    API->>DB: Check & Insert Columns (CSMColumnDB)
    
    Note over API: Auto-infer default aggregate metrics for numeric fields
    
    API->>DB: Seed Default Metrics (e.g., Total Sales Amount, Average Salary)
    API-->>User: Return 200 OK (Sync Successful)`} />
            <div style={{ background: 'rgba(30, 41, 59, 0.4)', padding: '24px', borderRadius: '16px', borderLeft: '4px solid #10B981', marginTop: '24px' }}>
              <h3 style={{ fontSize: '18px', color: '#F8FAFC', marginBottom: '12px' }}>🔑 Key Ingestion Rules (Seeding):</h3>
              <ul style={{ color: '#94A3B8', fontSize: '15px', lineHeight: '1.8', margin: 0, paddingLeft: '24px', listStyleType: 'disc' }}>
                <li><strong>Fact vs. Dimension Mapping</strong>: Agar table name me pattern matching se identify ho (jaise <code>sales_deals</code> has numeric fields, toh is_fact = <code>True</code>).</li>
                <li><strong>Automated Metrics</strong>: Numeric columns ke liye, database me default aggregate formulas populate kiye jaate hain. E.g., <code>amount</code> column ke liye:
                  <ul style={{ paddingLeft: '24px', marginTop: '8px' }}>
                    <li><strong>DAX expression</strong>: <code>SUM(sales_deals[amount])</code></li>
                    <li><strong>SQL expression</strong>: <code>SELECT SUM(amount) FROM sales_deals</code></li>
                  </ul>
                </li>
              </ul>
            </div>
          </section>

          {/* Section 3 */}
          <section id="query-translation" style={{ marginBottom: '80px', scrollMarginTop: '100px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
              <div style={{ width: '48px', height: '48px', background: 'rgba(245,158,11,0.1)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#F59E0B', fontSize: '24px' }}>🔀</div>
              <h2 style={{ fontSize: '32px', fontWeight: '700' }}>3. Query Execution & Translation Architecture</h2>
            </div>
            <p style={{ color: '#E2E8F0', fontSize: '16px', marginBottom: '24px' }}>
              Jab user dynamic query run karta hai (jaise "deal stage ke according total sales amount show karo"):
            </p>
            <MermaidBlock chart={`graph TD
    A[Client Query Request] -->|metrics: Total Sales, dimensions: deal_stage| B(FastAPI Router: /query)
    B --> C[Build Semantic Engine]
    C -->|Fetch dataset & metric definitions| D[(PostgreSQL)]
    
    D -->|Return Metric SQL: SELECT SUM_amount FROM sales_deals| E[Semantic Engine Logic]
    
    E --> F{Is stored SQL a full Query?}
    F -->|Yes: SELECT SUM... FROM...| G[Regex Extraction: Extract aggregate & target table]
    F -->|No: raw expression| H[Use expression as-is]
    
    G & H --> I[Apply User Filters / WHERE clauses]
    I --> J[Apply Dimensions / GROUP BY clauses]
    
    J -->|Generate final SQL| K[Snowflake Extractor]
    K -->|Execute query| L[(Snowflake Data Warehouse)]
    L -->|Return Pandas DataFrame| M[FastAPI JSON Formatter]
    M -->|Format floats, handle NaN/Inf| N[Return response to client]`} />
            <div style={{ background: 'rgba(30, 41, 59, 0.4)', padding: '24px', borderRadius: '16px', borderLeft: '4px solid #F59E0B', marginTop: '24px' }}>
              <h3 style={{ fontSize: '18px', color: '#F8FAFC', marginBottom: '12px' }}>🧠 Semantic Engine ke Algos ke Highlights:</h3>
              <ul style={{ color: '#94A3B8', fontSize: '15px', lineHeight: '1.8', margin: 0, paddingLeft: '24px', listStyleType: 'decimal' }}>
                <li><strong>Unwrapping Regex (SQL Parser)</strong>:
                  <ul style={{ paddingLeft: '24px', marginTop: '8px', listStyleType: 'disc' }}>
                    <li>Agar database me saved metric SQL <code>SELECT SUM(amount) FROM sales_deals</code> hai, aur user dimensions <code>[deal_stage]</code> maangta hai:</li>
                    <li>Engine is query se SELECT part (<code>SUM(amount)</code>) aur FROM part (<code>sales_deals</code>) nikal leta hai.</li>
                    <li>Uske baad custom dimension select and group clauses attach karta hai:<br/><code style={{ background: 'rgba(0,0,0,0.3)', padding: '2px 4px', borderRadius: '4px', fontSize: '13px', color: '#A7F3D0' }}>SELECT deal_stage, SUM(amount) FROM sales_deals GROUP BY deal_stage</code></li>
                    <li>Is tarike se nested SQL query errors (compilation errors) prevent hote hain.</li>
                  </ul>
                </li>
                <li style={{ marginTop: '12px' }}><strong>Error Isolation & Validation Gates</strong>:
                  <ul style={{ paddingLeft: '24px', marginTop: '8px', listStyleType: 'disc' }}>
                    <li>Execution se pehle query syntax ko DuckDB engine par dry-run (<code>EXPLAIN &lt;query&gt;</code>) kiya jata hai taaki invalid query Snowflake tak na jaaye aur extra warehouse cost save ho sake.</li>
                  </ul>
                </li>
                <li style={{ marginTop: '12px' }}><strong>Casing & Naming Normalization</strong>:
                  <ul style={{ paddingLeft: '24px', marginTop: '8px', listStyleType: 'disc' }}>
                    <li>Auto-corrector column casing (jaise <code>revenue</code> → <code>Revenue</code>) ko source schema metadata se tally karke automatic runtime replacement karta hai.</li>
                  </ul>
                </li>
              </ul>
            </div>
          </section>

          <hr style={{ borderColor: 'rgba(255,255,255,0.05)', margin: '60px 0' }} />

          {/* Section 4 */}
          <section id="post-sync-exec" style={{ marginBottom: '80px', scrollMarginTop: '100px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
              <div style={{ width: '48px', height: '48px', background: 'rgba(139,92,246,0.1)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#8B5CF6', fontSize: '24px' }}>📌</div>
              <h2 style={{ fontSize: '32px', fontWeight: '700' }}>4. The Six Pillars of Post-Sync</h2>
            </div>
            <p style={{ color: '#E2E8F0', fontSize: '16px', marginBottom: '24px' }}>
              After metadata synchronization from warehouses (Snowflake, Databricks, Fabric), DataTrust enters its operational phase. This phase transforms raw metadata into a governed, validated, and trusted data delivery system.
            </p>
            <CodeBlock 
              title="six_pillars.txt"
              code={`┌─────────────────────────────────────────────────────────────────────────────────────┐
│                    POST-SYNC ARCHITECTURE — SIX PILLARS                            │
├─────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                     │
│  ┌─────────────────────────────────────────────────────────────────────────────┐   │
│  │  1. SEMANTIC LAYER    →  One definition for every metric                     │   │
│  │  2. BUSINESS RULES    →  Data validation rules                              │   │
│  │  3. PIPELINES         →  Automated data workflows                           │   │
│  │  4. EXCEL DELIVERY    →  Live data to Excel                                 │   │
│  │  5. QUALITY MONITOR   →  Continuous anomaly detection                       │   │
│  │  6. AUDIT TRAIL       →  Complete change history                            │   │
│  └─────────────────────────────────────────────────────────────────────────────┘   │
│                                                                                     │
└─────────────────────────────────────────────────────────────────────────────────────┘`}
            />
          </section>

          {/* Section 5 */}
          <section id="hld-overview" style={{ marginBottom: '80px', scrollMarginTop: '100px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
              <div style={{ width: '48px', height: '48px', background: 'rgba(236,72,153,0.1)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#EC4899', fontSize: '24px' }}>🌐</div>
              <h2 style={{ fontSize: '32px', fontWeight: '700' }}>5. Architecture Overview</h2>
            </div>
            
            <h3 style={{ fontSize: '20px', color: '#E2E8F0', marginBottom: '16px' }}>5.1 System Architecture Overview</h3>
            <CodeBlock 
              title="architecture_layers.txt"
              code={`┌─────────────────────────────────────────────────────────────────────────────────────┐
│                    DATATRUST POST-SYNC ARCHITECTURE                                 │
├─────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                     │
│  ┌─────────────────────────────────────────────────────────────────────────────┐   │
│  │                         USER LAYER                                          │   │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌──────────────────┐ │   │
│  │  │  Finance     │  │  Data        │  │  Business    │  │  Compliance      │ │   │
│  │  │  Analyst     │  │  Engineer    │  │  Leader      │  │  Team            │ │   │
│  │  └──────────────┘  └──────────────┘  └──────────────┘  └──────────────────┘ │   │
│  └─────────────────────────────────────────────────────────────────────────────┘   │
│                                      │                                              │
│                                      ▼                                              │
│  ┌─────────────────────────────────────────────────────────────────────────────┐   │
│  │                       APPLICATION LAYER                                     │   │
│  │  ┌─────────────────────────────────────────────────────────────────────────┐ │   │
│  │  │  Semantic UI  │  Quality Dash  │  Pipeline Mgr  │  Excel Add-in        │ │   │
│  │  │  Audit Viewer  │  Alert Center  │  Admin Console │  NLQ Interface       │ │   │
│  │  └─────────────────────────────────────────────────────────────────────────┘ │   │
│  └─────────────────────────────────────────────────────────────────────────────┘   │
│                                      │                                              │
│                                      ▼                                              │
│  ┌─────────────────────────────────────────────────────────────────────────────┐   │
│  │                       CORE ENGINE LAYER                                     │   │
│  │  ┌─────────────────────────────────────────────────────────────────────────┐ │   │
│  │  │  Semantic    │  Quality      │  Pipeline     │  Audit                   │ │   │
│  │  │  Engine      │  Engine       │  Engine       │  Engine                  │ │   │
│  │  └─────────────────────────────────────────────────────────────────────────┘ │   │
│  │  ┌─────────────────────────────────────────────────────────────────────────┐ │   │
│  │  │  Alert       │  Rule         │  Lineage      │  NLQ                     │ │   │
│  │  │  Engine      │  Engine       │  Engine       │  Engine                  │ │   │
│  │  └─────────────────────────────────────────────────────────────────────────┘ │   │
│  └─────────────────────────────────────────────────────────────────────────────┘   │
│                                      │                                              │
│                                      ▼                                              │
│  ┌─────────────────────────────────────────────────────────────────────────────┐   │
│  │                       DATA ACCESS LAYER                                     │   │
│  │  ┌─────────────────────────────────────────────────────────────────────────┐ │   │
│  │  │  Connection   │  Query        │  Cache        │  Credential             │ │   │
│  │  │  Manager      │  Builder      │  (Redis)      │  Manager                │ │   │
│  │  └─────────────────────────────────────────────────────────────────────────┘ │   │
│  └─────────────────────────────────────────────────────────────────────────────┘   │
│                                      │                                              │
│                                      ▼                                              │
│  ┌─────────────────────────────────────────────────────────────────────────────┐   │
│  │                       DATA LAYER                                             │   │
│  │  ┌─────────────────────────────────────────────────────────────────────────┐ │   │
│  │  │  PostgreSQL     │  Snowflake     │  Databricks   │  Redis               │ │   │
│  │  │  (CSM + Audit)  │  (Warehouse)   │  (Lakehouse)  │  (Cache)             │ │   │
│  │  └─────────────────────────────────────────────────────────────────────────┘ │   │
│  └─────────────────────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────────────────────┘`}
            />

            <h3 style={{ fontSize: '20px', color: '#E2E8F0', marginBottom: '16px', marginTop: '40px' }}>5.2 Component Interaction Diagram</h3>
            <CodeBlock 
              title="interaction_flow.txt"
              code={`┌─────────────────────────────────────────────────────────────────────────────────────┐
│                    COMPONENT INTERACTION FLOW                                       │
├─────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                     │
│  1. User creates metric (Semantic Engine)                                          │
│     → Stores in PostgreSQL (metrics table)                                          │
│                                                                                     │
│  2. User creates rules (Quality Engine)                                             │
│     → Stores in PostgreSQL (rules table)                                            │
│                                                                                     │
│  3. User creates pipeline (Pipeline Engine)                                         │
│     → Combines metrics + rules + schedule                                           │
│     → Stores in PostgreSQL (pipelines table)                                        │
│                                                                                     │
│  4. Pipeline executes (Orchestrator)                                                │
│     → Stage 1: Connect to Snowflake                                                │
│     → Stage 2: Extract data                                                        │
│     → Stage 3: Validate against rules                                              │
│     → Stage 4: Monitor anomalies                                                   │
│     → Stage 5: Publish to Excel                                                    │
│                                                                                     │
│  5. Excel Refresh (Excel Add-in)                                                    │
│     → Calls API → Semantic Engine generates SQL                                     │
│     → Quality Engine validates data                                                │
│     → Audit Engine logs refresh                                                    │
│     → Data returned to Excel                                                       │
│                                                                                     │
│  6. Quality Monitoring (Quality Dashboard)                                          │
│     → Displays health score                                                         │
│     → Shows open violations                                                         │
│     → Sends alerts                                                                 │
│                                                                                     │
│  7. Audit Trail (Audit Viewer)                                                      │
│     → Searchable history                                                            │
│     → Export reports                                                               │
│                                                                                     │
└─────────────────────────────────────────────────────────────────────────────────────┘`}
            />

            <h3 style={{ fontSize: '20px', color: '#E2E8F0', marginBottom: '16px', marginTop: '40px' }}>5.3 Data Flow — End-to-End</h3>
            <CodeBlock 
              title="e2e_data_flow.txt"
              code={`┌─────────────────────────────────────────────────────────────────────────────────────┐
│                    END-TO-END DATA FLOW                                             │
├─────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                     │
│  ┌─────────────────────────────────────────────────────────────────────────────┐   │
│  │  USER ACTION: Morgan opens Excel and clicks Refresh                         │   │
│  └─────────────────────────────────────────────────────────────────────────────┘   │
│                                      │                                              │
│                                      ▼                                              │
│  ┌─────────────────────────────────────────────────────────────────────────────┐   │
│  │  STEP 1: EXCEL ADD-IN                                                       │   │
│  │  • Sends POST /api/v1/excel/refresh                                         │   │
│  │  • Payload: { dataset: "sales_transactions", metrics: ["Revenue"] }         │   │
│  └─────────────────────────────────────────────────────────────────────────────┘   │
│                                      │                                              │
│                                      ▼                                              │
│  ┌─────────────────────────────────────────────────────────────────────────────┐   │
│  │  STEP 2: SEMANTIC ENGINE                                                    │   │
│  │  • Fetches metric definition from PostgreSQL                                 │   │
│  │  • Metric: Revenue = SUM(net_sales) WHERE status='completed'                │   │
│  │  • Generates SQL                                                             │   │
│  └─────────────────────────────────────────────────────────────────────────────┘   │
│                                      │                                              │
│                                      ▼                                              │
│  ┌─────────────────────────────────────────────────────────────────────────────┐   │
│  │  STEP 3: CONNECTION MANAGER                                                 │   │
│  │  • Executes SQL on Snowflake                                                │   │
│  │  • Returns result set                                                       │   │
│  │  • Caches result in Redis                                                   │   │
│  └─────────────────────────────────────────────────────────────────────────────┘   │
│                                      │                                              │
│                                      ▼                                              │
│  ┌─────────────────────────────────────────────────────────────────────────────┐   │
│  │  STEP 4: QUALITY ENGINE                                                    │   │
│  │  • Validates data against rules                                             │   │
│  │  • Rule 1: Revenue >= 0 → PASS                                              │   │
│  │  • Rule 2: Revenue = Units × Price → PASS                                  │   │
│  │  • Rule 3: Customer_ID NOT NULL → PASS                                     │   │
│  └─────────────────────────────────────────────────────────────────────────────┘   │
│                                      │                                              │
│                                      ▼                                              │
│  ┌─────────────────────────────────────────────────────────────────────────────┐   │
│  │  STEP 5: AUDIT ENGINE                                                       │   │
│  │  • Logs refresh event                                                        │   │
│  │  • Entry: [Morgan | REFRESH | Revenue | 4,234 rows | 09:01 AM]             │   │
│  └─────────────────────────────────────────────────────────────────────────────┘   │
│                                      │                                              │
│                                      ▼                                              │
│  ┌─────────────────────────────────────────────────────────────────────────────┐   │
│  │  STEP 6: RESPONSE                                                           │   │
│  │  • Returns data + validation status + lineage to Excel                     │   │
│  │  • Excel shows: Revenue ₹85.4 Cr (Validated ✅)                             │   │
│  └─────────────────────────────────────────────────────────────────────────────┘   │
│                                                                                     │
└─────────────────────────────────────────────────────────────────────────────────────┘`}
            />
          </section>

          {/* Section 6 */}
          <section id="lld-schema" style={{ marginBottom: '80px', scrollMarginTop: '100px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
              <div style={{ width: '48px', height: '48px', background: 'rgba(16,185,129,0.1)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10B981', fontSize: '24px' }}>⚙️</div>
              <h2 style={{ fontSize: '32px', fontWeight: '700' }}>6. LLD & Database Schema</h2>
            </div>
            
            <h3 style={{ fontSize: '20px', color: '#E2E8F0', marginBottom: '16px' }}>6.1 Database Schema (Semantic & Quality)</h3>
            <CodeBlock 
              title="schema.sql"
              language="sql"
              code={`-- ──────────────────────────────────────────────────────────────────────────────
-- METRICS TABLE (Semantic Layer)
-- ──────────────────────────────────────────────────────────────────────────────
CREATE TABLE metrics (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    dataset_id UUID REFERENCES datasets(id) ON DELETE CASCADE,
    source_column VARCHAR(255),
    aggregation VARCHAR(50),
    sql_expression TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

-- ──────────────────────────────────────────────────────────────────────────────
-- RULES TABLE
-- ──────────────────────────────────────────────────────────────────────────────
CREATE TABLE rules (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    expression TEXT NOT NULL,
    dataset_id UUID REFERENCES datasets(id) ON DELETE CASCADE,
    severity VARCHAR(20) DEFAULT 'WARNING',
    created_at TIMESTAMP DEFAULT NOW()
);`}
            />

            <h3 style={{ fontSize: '20px', color: '#E2E8F0', marginBottom: '16px', marginTop: '40px' }}>6.2 Pipeline Orchestrator LLD</h3>
            <CodeBlock 
              title="orchestrator.py"
              language="python"
              code={`class PipelineOrchestrator:
    """Executes pipelines with 5-stage flow."""
    
    async def execute(self, pipeline_id: str, triggered_by: str) -> PipelineRun:
        try:
            # 3. Stage 1: Connect
            connector = self._connect(pipeline)
            
            # 4. Stage 2: Extract
            data = self._extract(connector, pipeline)
            
            # 5. Stage 3: Validate
            violations = self._validate(data, pipeline)
            
            # 6. Stage 4: Monitor
            anomalies = self._monitor(data, pipeline)
            
            # 7. Stage 5: Publish
            result = self._publish(data, pipeline)
            
            run.status = "SUCCESS"
            return run
            
        except Exception as e:
            run.status = "FAILED"
            self._send_alert(pipeline, run, str(e))
            return run`}
            />
          </section>

        </div>
      </div>
    </div>
  );
};

export default PostSyncArchitecture;
