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
      .replace(/(INPUT:|PROCESS:|OUTPUT:|STEP \d+:)/g, '<span style="color: #10B981; font-weight: 700;">$1</span>')
      .replace(/(Snowflake|SAP Workflows|Fabric|Redshift|BigQuery|Databricks|PostgreSQL|Upstash Redis|Kafka)/g, '<span style="color: #F59E0B; font-weight: 700;">$1</span>')
      .replace(/(↓|➔|─►)/g, '<span style="color: #EC4899; font-weight: 700;">$1</span>');
  }

  return (
    <div style={{ marginBottom: '32px', background: 'linear-gradient(145deg, #0F172A 0%, #1E293B 100%)', borderRadius: '16px', border: '1px solid rgba(99,102,241,0.2)', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.4)' }}>
      <div style={{ display: 'flex', justifycontent: 'space-between', alignItems: 'center', padding: '12px 20px', background: 'rgba(0,0,0,0.4)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
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
            fontSize: '13.5px', 
            lineHeight: '1.6', 
            color: '#E2E8F0', 
            whiteSpace: 'pre',
            maxHeight: expanded ? 'none' : '300px',
            overflowY: expanded ? 'visible' : 'hidden'
          }}
          dangerouslySetInnerHTML={{ __html: colorizedCode }}
          />
        ) : (
          <div style={{ 
            padding: '24px 32px', 
            overflowX: 'auto', 
            fontFamily: '"Fira Code", "Consolas", monospace', 
            fontSize: '13.5px', 
            lineHeight: '1.6', 
            color: '#E2E8F0', 
            whiteSpace: 'pre',
            maxHeight: expanded ? 'none' : '300px',
            overflowY: expanded ? 'visible' : 'hidden'
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
            height: '100px',
            background: 'linear-gradient(to bottom, transparent, #1E293B)',
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'center',
            paddingBottom: '16px'
          }}>
            <button 
              onClick={() => setExpanded(true)}
              style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', padding: '6px 20px', borderRadius: '20px', color: '#fff', cursor: 'pointer', fontSize: '13px', fontWeight: '500' }}
            >
              Show Full Content ↓
            </button>
          </div>
        )}
      </div>

      {expanded && (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '12px', borderTop: '1px solid rgba(255,255,255,0.05)', background: 'rgba(0,0,0,0.2)' }}>
           <button 
              onClick={() => setExpanded(false)}
              style={{ background: 'transparent', border: 'none', color: '#94A3B8', cursor: 'pointer', fontWeight: '500', fontSize: '13px' }}
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

export default function CaseStudiesHLD() {
  const [activeSection, setActiveSection] = useState('sap-writeback');

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
    }
  };

  const navItems = [
    { id: 'sap-writeback', label: '1. SAP Writeback Agent' },
    { id: 'query-router', label: '2. Multi-Cloud Query Router' },
    { id: 'itar-masking', label: '3. ITAR Security Masking' },
    { id: 'rule-compiler', label: '4. FAA Safety Rule Compiler' },
    { id: 'fda-auditing', label: '5. FDA Compliance Ledger' }
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#020617', color: '#F8FAFC', fontFamily: '"Inter", sans-serif', paddingTop: '80px', paddingBottom: '100px' }}>
      
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '60px', padding: '0 20px' }}>
        <div style={{ display: 'inline-block', padding: '6px 16px', background: 'rgba(99, 102, 241, 0.1)', border: '1px solid rgba(99, 102, 241, 0.2)', borderRadius: '20px', color: '#818CF8', fontSize: '13px', fontWeight: '600', letterSpacing: '1px', marginBottom: '24px' }}>
          HIGH-LEVEL DESIGN (HLD)
        </div>
        <h1 style={{ fontSize: '44px', fontWeight: '800', marginBottom: '20px', letterSpacing: '-1px', fontFamily: '"Space Grotesk", sans-serif' }}>
          Enterprise Integration Engine <br />
          <span style={{ background: 'linear-gradient(135deg, #00BFA5 0%, #6366F1 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Architecture & Core Flows</span>
        </h1>
        <p style={{ fontSize: '18px', color: '#94A3B8', maxWidth: '800px', margin: '0 auto', lineHeight: '1.6' }}>
          Technical blueprints of the core integration nodes that connect Excel worksheets with Snowflake, Databricks, SAP ERP, BigQuery, Redshift, and compliance ledgers.
        </p>
      </div>

      {/* Main Grid */}
      <div style={{ display: 'flex', maxWidth: '1400px', margin: '0 auto', padding: '0 40px', gap: '60px' }}>
        
        {/* Sidebar Navigation */}
        <div style={{ width: '280px', flexShrink: 0, position: 'relative' }}>
          <div style={{ position: 'sticky', top: '100px', background: 'rgba(255,255,255,0.02)', padding: '24px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
            <h3 style={{ fontSize: '13px', textTransform: 'uppercase', letterSpacing: '1px', color: '#94A3B8', marginBottom: '20px', fontWeight: '700' }}>Modules</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {navItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => scrollToSection(item.id)}
                    style={{
                      width: '100%',
                      textAlign: 'left',
                      padding: '10px 16px',
                      background: activeSection === item.id ? 'rgba(0, 191, 165, 0.1)' : 'transparent',
                      color: activeSection === item.id ? '#00BFA5' : '#CBD5E1',
                      border: 'none',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontSize: '13.5px',
                      fontWeight: '600',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Content Pane */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '80px' }}>
          
          {/* 1. SAP WRITEBACK AGENT */}
          <section id="sap-writeback">
            <h2 style={{ fontSize: '28px', fontWeight: '800', marginBottom: '16px', color: '#FFF', fontFamily: '"Space Grotesk", sans-serif' }}>
              1. SAP Automated Writeback Agent (ExxonMobil)
            </h2>
            <p style={{ color: '#CBD5E1', fontSize: '15px', lineHeight: '1.6', marginBottom: '24px' }}>
              Bridges inventory mutations edited in Excel worksheets with corporate SAP asset registries. DataTrust acts as a secure buffer queue, validating bounds in Snowflake before sending RFC function executions to SAP servers.
            </p>

            <MermaidBlock chart={`
              graph TD
                Excel[Excel Live Workbooks] -->|1. Submit Inventories| Gateway[DataTrust API Gateway]
                Gateway -->|2. Validate Bounds| QE[Quality Engine]
                QE -->|Rules Check PASS| SF[(Snowflake DWH)]
                SF -->|3. Log Mutation Event| EventQueue[Writeback Event Queue]
                EventQueue -->|4. Poll Event| SAPAgent[SAP Writeback Agent]
                SAPAgent -->|5. Connect via RFC| SAP[SAP ERP Systems]
                style Excel fill:#10B981,stroke:#fff,color:#fff
                style Gateway fill:#6366F1,stroke:#fff,color:#fff
                style QE fill:#F59E0B,stroke:#fff,color:#fff
                style SF fill:#00BFA5,stroke:#fff,color:#fff
                style SAPAgent fill:#EC4899,stroke:#fff,color:#fff
                style SAP fill:#EF4444,stroke:#fff,color:#fff
            `} />

            <CodeBlock 
              title="sap_writeback_agent.py"
              code={`INPUT: Snowflake Inventory Update Event (CSV format)
PROCESS:
  STEP 1: Decrypt SAP RFC credentials using CryptoManager.
  STEP 2: Connect to SAP NetWeaver gateway using PyRFC client.
  STEP 3: Format transaction line items into SAP-compatible structures (BAPI_GOODSMVT_CREATE).
  STEP 4: Call remote function 'BAPI_GOODSMVT_CREATE' inside SAP.
  STEP 5: Validate return code (BAPI_RETURN). If return code indicates error, rollback.
OUTPUT: SAP receipt number ➔ push transaction log back to DataTrust postgres store.`}
            />
          </section>

          {/* 2. MULTI-CLOUD QUERY ROUTER */}
          <section id="query-router">
            <h2 style={{ fontSize: '28px', fontWeight: '800', marginBottom: '16px', color: '#FFF', fontFamily: '"Space Grotesk", sans-serif' }}>
              2. Federated Multi-Cloud Query Router (John Deere)
            </h2>
            <p style={{ color: '#CBD5E1', fontSize: '15px', lineHeight: '1.6', marginBottom: '24px' }}>
              Allows planners to run calculations across varying databases (e.g. Redshift dealer stock records and BigQuery telemetry parameters) using unified business metrics.
            </p>

            <MermaidBlock chart={`
              graph TD
                Excel[Planner Excel Ribbon] -->|1. Submit Unified Metric Query| CSM[Semantic Engine CSM]
                CSM -->|2. Translate to SQL| Trans[SQL Translation Layer]
                Trans -->|3. Route Query| Router[Federated Query Router]
                Router -->|Redshift Query Dialect| RS[(Amazon Redshift)]
                Router -->|BigQuery Query Dialect| BQ[(Google BigQuery)]
                RS & BQ -->|4. Return Result Sets| Aggregator[Result Set Aggregator]
                Aggregator -->|5. Format Table| Excel
                style Excel fill:#10B981,stroke:#fff,color:#fff
                style CSM fill:#6366F1,stroke:#fff,color:#fff
                style Router fill:#EC4899,stroke:#fff,color:#fff
                style RS fill:#EF4444,stroke:#fff,color:#fff
                style BQ fill:#3B82F6,stroke:#fff,color:#fff
                style Aggregator fill:#F59E0B,stroke:#fff,color:#fff
            `} />

            <CodeBlock 
              title="multi_cloud_router.py"
              code={`INPUT: "Show total dealer inventory across Redshift and BigQuery"
PROCESS:
  STEP 1: Parse natural language query to semantic components (Entity: dealer_stock).
  STEP 2: Identify database routing: BigQuery holds telemetry; Redshift holds sales.
  STEP 3: Compile SQL dialects:
          BigQuery: "SELECT SKU, COUNT(*) FROM \`prod.bigquery_inventory\` GROUP BY SKU"
          Redshift: "SELECT SKU, SUM(stock) FROM prod.redshift_sales GROUP BY SKU"
  STEP 4: Execute query futures concurrently using ThreadPoolExecutor.
  STEP 5: Aggregate result sets, matching SKU codes, and applying safety tolerances.
OUTPUT: Unified JSON table returned to Excel connector.`}
            />
          </section>

          {/* 3. ITAR SECURITY MASKING */}
          <section id="itar-masking">
            <h2 style={{ fontSize: '28px', fontWeight: '800', marginBottom: '16px', color: '#FFF', fontFamily: '"Space Grotesk", sans-serif' }}>
              3. ITAR Security Masking Interceptor (Lockheed Martin)
            </h2>
            <p style={{ color: '#CBD5E1', fontSize: '15px', lineHeight: '1.6', marginBottom: '24px' }}>
              Enforces column-level data security filters in air-gapped enclaves. Requests originating from subcontractor workbooks run through security filters that mask classified parameters based on active clearance permissions.
            </p>

            <MermaidBlock chart={`
              graph LR
                Excel[Contractor Excel Sheet] -->|1. Submit Data Query| Proxy[DataTrust Security Proxy]
                Proxy -->|2. Check Clearance| ActiveDir[Enclave Active Directory]
                Proxy -->|3. Intercept Query| Masking[Dynamic Masking Engine]
                Masking -->|Apply Hash Rules| DWH[(Databricks cleanroom)]
                DWH -->|4. Hashed Specs| Excel
                style Excel fill:#10B981,stroke:#fff,color:#fff
                style Proxy fill:#6366F1,stroke:#fff,color:#fff
                style ActiveDir fill:#F59E0B,stroke:#fff,color:#fff
                style Masking fill:#EF4444,stroke:#fff,color:#fff
                style DWH fill:#00BFA5,stroke:#fff,color:#fff
            `} />

            <CodeBlock 
              title="itar_masking_interceptor.py"
              code={`INPUT: Subcontractor read query for 'Booster Spec parameters'
PROCESS:
  STEP 1: Authenticate contractor SSO token. Retrieve AD project security group tags.
  STEP 2: Intercept SQL request. Parse schema columns.
  STEP 3: Check columns against ITAR security limits (e.g. payload_capacity, max_thrust).
  STEP 4: If security clearances don't match, modify SQL select query:
          Change: SELECT payload_capacity FROM rocket_spec
          To:     SELECT SHA256(payload_capacity) || '-ITAR-MASKED' FROM rocket_spec
  STEP 5: Submit modified query to secure Databricks node.
OUTPUT: Masked fields returned to workbook.`}
            />
          </section>

          {/* 4. FAA SAFETY RULE COMPILER */}
          <section id="rule-compiler">
            <h2 style={{ fontSize: '28px', fontWeight: '800', marginBottom: '16px', color: '#FFF', fontFamily: '"Space Grotesk", sans-serif' }}>
              4. Safety Constraint Validation & FAA Compiler (Boeing)
            </h2>
            <p style={{ color: '#CBD5E1', fontSize: '15px', lineHeight: '1.6', marginBottom: '24px' }}>
              Parses structural and weight calculations inside Excel formulas. Transpiles DAX equations into optimized Spark SQL, running quality validations on values automatically before committing them to databases.
            </p>

            <MermaidBlock chart={`
              graph TD
                Excel[Dave's Deflection Sheet] -->|1. Submit Formulas| Compiler[DAX-to-SQL Compiler]
                Compiler -->|2. Compile Spark SQL| Spark[Spark Engine DWH]
                Spark -->|3. Evaluate Values| Validation[Quality Rules Engine]
                Validation -->|Compare bounds| CSM[Semantic Layer CSM]
                Validation -->|Rule Exception| Alert[Slack Alerts & Block Ingestion]
                style Excel fill:#10B981,stroke:#fff,color:#fff
                style Compiler fill:#6366F1,stroke:#fff,color:#fff
                style Spark fill:#00BFA5,stroke:#fff,color:#fff
                style Validation fill:#F59E0B,stroke:#fff,color:#fff
                style CSM fill:#3B82F6,stroke:#fff,color:#fff
                style Alert fill:#EF4444,stroke:#fff,color:#fff
            `} />

            <CodeBlock 
              title="dax_compiler.py"
              code={`INPUT: Dave's wing stress calculation Excel formula (DAX style)
PROCESS:
  STEP 1: Tokenize formula keys. Identify referenced variables (Load, Yield).
  STEP 2: Map variables to column identifiers in Databricks schemas.
  STEP 3: Transpile formula: "Deflection = Load * Constant / Safety_Margin"
          To: "SELECT load * 0.82 / safety_margin AS deflection FROM wing_spec"
  STEP 4: Run validation query. Check if outputs breach FAA boundaries (deflection <= max).
  STEP 5: If validation fails, block DWH writeback and trigger alert engine.
OUTPUT: Compiled SQL query + validation pass/fail reports.`}
            />
          </section>

          {/* 5. FDA COMPLIANCE LEDGER */}
          <section id="fda-auditing">
            <h2 style={{ fontSize: '28px', fontWeight: '800', marginBottom: '16px', color: '#FFF', fontFamily: '"Space Grotesk", sans-serif' }}>
              5. HIPAA Dynamic Hashing & FDA Compliance Ledger (Pfizer)
            </h2>
            <p style={{ color: '#CBD5E1', fontSize: '15px', lineHeight: '1.6', marginBottom: '24px' }}>
              Tracks trial audit logs to verify compliance with FDA Title 21 CFR Part 11 and HIPAA regulations. All changes made to parameters (author, timestamp, old value, new value) are logged in an append-only postgres schema.
            </p>

            <MermaidBlock chart={`
              graph LR
                Doc[Efficacy Worksheet] -->|1. Modify variables| Proxy[DataTrust Proxy]
                Proxy -->|2. Write audit event| Postgres[(PostgreSQL Audit Ledger)]
                Postgres -->|3. Encrypt event log| Hash[AES-256 Hashing Engine]
                Proxy -->|4. Push sync| SF[(Snowflake Secure)]
                style Doc fill:#10B981,stroke:#fff,color:#fff
                style Proxy fill:#6366F1,stroke:#fff,color:#fff
                style Postgres fill:#EF4444,stroke:#fff,color:#fff
                style Hash fill:#F59E0B,stroke:#fff,color:#fff
                style SF fill:#00BFA5,stroke:#fff,color:#fff
            `} />

            <CodeBlock 
              title="fda_audit_ledger.py"
              code={`INPUT: Trial coordinator adjusts dosage variables inside Excel sheet
PROCESS:
  STEP 1: Log coordinator details (SSO name, role, IP address, timestamp).
  STEP 2: Capture cell values before adjustment and new parameters submitted.
  STEP 3: Compile audit event string.
  STEP 4: Connect to postgres append-only metadata schema. Write event log.
  STEP 5: Encrypt transaction records using SHA-256 signatures, ensuring immutable history.
OUTPUT: 1-second audit report query readiness.`}
            />
          </section>

        </div>

      </div>

    </div>
  );
}
