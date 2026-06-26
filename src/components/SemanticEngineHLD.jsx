import React, { useState } from 'react';

const CodeBlock = ({ title, code, dataFlow }) => {
  const [expanded, setExpanded] = useState(false);
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    alert('Code copied to clipboard!');
  };

  const colorizedCode = code
    .replace(/([┌┬┐├┼┤└┴┘─│]+)/g, '<span style="color: #6366F1; opacity: 0.7;">$1</span>')
    .replace(/(INPUT:|PROCESS:|OUTPUT:|USER:|STEP \d+:)/g, '<span style="color: #10B981; font-weight: 700;">$1</span>')
    .replace(/(snowflake_connection\.py|stage_02_extract\.py|dax_parser\.py|stage_04_classify\.py|rule_based\.py|llm_based\.py|chains\.py|stage_07_dialect_translate\.py|engine\.py|semantic\.py)/g, '<span style="color: #F59E0B; font-weight: 700;">$1</span>')
    .replace(/(SELECT|FROM|WHERE|AND|ORDER BY|SHOW TABLES IN|SHOW VIEWS|SHOW COLUMNS)/g, '<span style="color: #EC4899; font-weight: 700;">$1</span>');

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

const SemanticEngineHLD = () => {
  const [activeSection, setActiveSection] = useState('catalog-extraction');
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const toggleMobileNav = () => setIsMobileNavOpen(!isMobileNavOpen);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const y = element.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: y, behavior: 'smooth' });
      setActiveSection(id);
    }
  };

  const navItems = [
    { id: 'catalog-extraction', label: '1. Catalog Extraction' },
    { id: 'dax-conversion', label: '2. DAX-to-SQL Conversion' },
    { id: 'dynamic-assembly', label: '3. Dynamic Query Assembly' },
  ];

  return (<>
    <div style={{ minHeight: '100vh', background: '#020617', color: '#F8FAFC', fontFamily: '"Inter", sans-serif', paddingTop: '80px', paddingBottom: '100px' }}>
      
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '60px', padding: '0 20px' }}>
        <div style={{ display: 'inline-block', padding: '6px 16px', background: 'rgba(139, 92, 246, 0.1)', border: '1px solid rgba(139, 92, 246, 0.2)', borderRadius: '20px', color: '#A78BFA', fontSize: '13px', fontWeight: '600', letterSpacing: '1px', marginBottom: '24px' }}>
          SEMANTIC ENGINE & METADATA
        </div>
        <h1 style={{ fontSize: '48px', fontWeight: '800', marginBottom: '20px', letterSpacing: '-1px' }}>
          File-by-File Flow <br />
          <span style={{ background: 'linear-gradient(135deg, #A78BFA 0%, #EC4899 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Architecture & Algorithms</span>
        </h1>
        <p style={{ fontSize: '20px', color: '#94A3B8', maxWidth: '800px', margin: '0 auto', lineHeight: '1.6' }}>
          Explore the file-by-file flow and the mathematical algorithms utilized during metadata extraction, DAX-to-SQL conversion, and dynamic query assembly inside DataTrust.
        </p>
      </div>

      <div style={{ display: 'flex', maxWidth: '1400px', margin: '0 auto', padding: '0 40px', gap: '60px' }}>
        
        {/* Sidebar Navigation */}
        {/* Mobile Nav Toggle */}
        <button onClick={toggleMobileNav} className="mobile-toggle">☰</button>
        <div className={isMobileNavOpen ? 'sidebar mobile-open' : 'sidebar'}>
          <h3 style={{ fontSize: '14px', textTransform: 'uppercase', letterSpacing: '1px', color: '#94A3B8', marginBottom: '20px', fontWeight: '700' }}>Process Flows</h3>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => { scrollToSection(item.id); setIsMobileNavOpen(false); }}
                  style={{
                    width: '100%',
                    textAlign: 'left',
                    padding: '10px 16px',
                    background: activeSection === item.id ? 'rgba(139,92,246,0.1)' : 'transparent',
                    color: activeSection === item.id ? '#A78BFA' : '#CBD5E1',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: activeSection === item.id ? '600' : '400',
                    transition: 'all 0.2s ease',
                    borderLeft: activeSection === item.id ? '3px solid #8B5CF6' : '3px solid transparent'
                  }}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Content Area */}
        <div style={{ flexGrow: 1, minWidth: 0 }}>
          
          {/* Section 1 */}
          <section id="catalog-extraction" style={{ marginBottom: '80px', scrollMarginTop: '100px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
              <div style={{ width: '48px', height: '48px', background: 'rgba(59,130,246,0.1)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#3B82F6', fontSize: '24px' }}>📂</div>
              <h2 style={{ fontSize: '32px', fontWeight: '700' }}>1. Catalog & Metadata Extraction Flow</h2>
            </div>
            
            <p style={{ color: '#E2E8F0', fontSize: '16px', marginBottom: '24px' }}>
              This flow starts when catalog schemas are synced from a target database (such as Snowflake) or compiled by pipeline runs.
            </p>
            
            <CodeBlock 
              title="extraction_flow.txt"
              code={`[Snowflake / Source] ──> snowflake_connection.py ──> stage_02_extract.py ──> Database (metrics/columns tables)`}
            />

            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', marginTop: '32px' }}>
              <div style={{ background: 'rgba(30, 41, 59, 0.4)', padding: '24px', borderRadius: '16px', borderLeft: '4px solid #3B82F6' }}>
                <h3 style={{ fontSize: '18px', color: '#F8FAFC', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '16px' }}>📄</span> File: <code style={{ color: '#60A5FA', background: 'rgba(0,0,0,0.3)', padding: '2px 6px', borderRadius: '4px' }}>snowflake_connection.py</code> (or snowflake_extractor.py)
                </h3>
                <ul style={{ color: '#94A3B8', fontSize: '15px', lineHeight: '1.8', margin: 0, paddingLeft: '24px', listStyleType: 'disc' }}>
                  <li><strong>Algorithm:</strong> Direct catalog schema metadata scanning.</li>
                  <li><strong>Flow:</strong>
                    <ul style={{ paddingLeft: '24px', marginTop: '8px' }}>
                      <li>Connects using connection parameters decrypted by <code>CryptoManager</code>.</li>
                      <li>Runs query introspection: <code>SHOW TABLES</code> and <code>SHOW VIEWS</code> in the configured schema.</li>
                      <li>Traces column names, types, and primary key constraints by calling <code>SHOW COLUMNS</code> or querying <code>INFORMATION_SCHEMA.COLUMNS</code>.</li>
                    </ul>
                  </li>
                </ul>
              </div>

              <div style={{ background: 'rgba(30, 41, 59, 0.4)', padding: '24px', borderRadius: '16px', borderLeft: '4px solid #3B82F6' }}>
                <h3 style={{ fontSize: '18px', color: '#F8FAFC', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '16px' }}>📄</span> File: <code style={{ color: '#60A5FA', background: 'rgba(0,0,0,0.3)', padding: '2px 6px', borderRadius: '4px' }}>stage_02_extract.py</code>
                </h3>
                <ul style={{ color: '#94A3B8', fontSize: '15px', lineHeight: '1.8', margin: 0, paddingLeft: '24px', listStyleType: 'disc' }}>
                  <li><strong>Algorithm:</strong> Dynamic Catalog Seeding and Aggregation Metric Generation.</li>
                  <li><strong>Flow:</strong>
                    <ul style={{ paddingLeft: '24px', marginTop: '8px' }}>
                      <li>Retrieves the tables and columns returned by the connection driver.</li>
                      <li><strong>Self-Healing Fallback:</strong> If the query fails or returned tables are empty, it loads fallback dictionary mappings (<code>sales_deals</code>, <code>finance_revenue</code>, <code>marketing_campaigns</code>, <code>hr_employees</code>).</li>
                      <li>Upserts the tables into the <code>datasets</code> table (<code>CSMDatasetDB</code>) and column listings into the <code>columns</code> table (<code>CSMColumnDB</code>).</li>
                      <li><strong>Metric Generator:</strong> Scans column listings for metrics (columns flagged as measures/numeric types) and automatically registers default aggregations (e.g. <code>SUM</code>, <code>AVG</code>) into the <code>metrics</code> table (<code>CSMMetricDB</code>) with both raw DAX expressions (<code>SUM(dataset[column])</code>) and ANSI SQL expressions (<code>SELECT SUM(column) FROM table</code>).</li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 2 */}
          <section id="dax-conversion" style={{ marginBottom: '80px', scrollMarginTop: '100px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
              <div style={{ width: '48px', height: '48px', background: 'rgba(16,185,129,0.1)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10B981', fontSize: '24px' }}>🔄</div>
              <h2 style={{ fontSize: '32px', fontWeight: '700' }}>2. DAX-to-SQL Metric Conversion Flow</h2>
            </div>
            
            <p style={{ color: '#E2E8F0', fontSize: '16px', marginBottom: '24px' }}>
              This flow parses, classifies, and translates custom calculated measures (DAX) into ANSI SQL.
            </p>

            <CodeBlock 
              title="conversion_flow.txt"
              code={`[DAX Measure] ──> dax_parser.py ──> stage_04_classify.py ──> rule_based.py OR llm_based.py ──> sqlglot (transpilation)`}
            />

            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', marginTop: '32px' }}>
              <div style={{ background: 'rgba(30, 41, 59, 0.4)', padding: '24px', borderRadius: '16px', borderLeft: '4px solid #10B981' }}>
                <h3 style={{ fontSize: '18px', color: '#F8FAFC', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '16px' }}>📄</span> File: <code style={{ color: '#34D399', background: 'rgba(0,0,0,0.3)', padding: '2px 6px', borderRadius: '4px' }}>dax_parser.py</code> (Stage 03)
                </h3>
                <ul style={{ color: '#94A3B8', fontSize: '15px', lineHeight: '1.8', margin: 0, paddingLeft: '24px', listStyleType: 'disc' }}>
                  <li><strong>Algorithm:</strong> Regex-based AST Tokenization and Complexity Estimator.</li>
                  <li><strong>Flow:</strong>
                    <ul style={{ paddingLeft: '24px', marginTop: '8px' }}>
                      <li>Tokenizes mathematical expression strings using precompiled regex patterns (like <code>_AGGREGATION_PATTERN</code>, <code>_COLUMN_REF</code>).</li>
                      <li>Extracts used functions and maps bracketed strings to column expressions (e.g. <code>[amount]</code> or <code>'sales_deals'[amount]</code>).</li>
                      <li>Estimates complexity by counting matching parenthesis depths (<code>max_depth</code>) plus the number of unique functions:
                        <div style={{ background: 'rgba(0,0,0,0.3)', padding: '12px', borderRadius: '8px', marginTop: '8px', marginBottom: '8px', fontFamily: '"Fira Code", monospace', fontSize: '13px' }}>
                          Complexity Score = max_depth + func_count<br/>
                          • Score ≤ 2 → "simple"<br/>
                          • Score ≤ 6 → "medium"<br/>
                          • Score &gt; 6 → "complex"
                        </div>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>

              <div style={{ background: 'rgba(30, 41, 59, 0.4)', padding: '24px', borderRadius: '16px', borderLeft: '4px solid #10B981' }}>
                <h3 style={{ fontSize: '18px', color: '#F8FAFC', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '16px' }}>📄</span> File: <code style={{ color: '#34D399', background: 'rgba(0,0,0,0.3)', padding: '2px 6px', borderRadius: '4px' }}>stage_04_classify.py</code> (Stage 04)
                </h3>
                <ul style={{ color: '#94A3B8', fontSize: '15px', lineHeight: '1.8', margin: 0, paddingLeft: '24px', listStyleType: 'disc' }}>
                  <li><strong>Algorithm:</strong> Expression Router.</li>
                  <li><strong>Flow:</strong>
                    <ul style={{ paddingLeft: '24px', marginTop: '8px' }}>
                      <li>Inspects the function tokens extracted by <code>DaxParser</code>.</li>
                      <li>If the expression contains only basic standard operators (<code>SUM</code>, <code>AVERAGE</code>, <code>COUNT</code>, <code>MIN</code>, <code>MAX</code>, <code>DIVIDE</code>), it routes the measure to <code>method = "rule_based"</code> with a high-confidence metric (<code>0.95</code>).</li>
                      <li>If it contains complex filters or time-intelligence functions (<code>CALCULATE</code>, <code>FILTER</code>, <code>SUMX</code>, <code>TOTALYTD</code>), it routes to <code>method = "llm"</code> (confidence: <code>0.70</code>).</li>
                    </ul>
                  </li>
                </ul>
              </div>

              <div style={{ background: 'rgba(30, 41, 59, 0.4)', padding: '24px', borderRadius: '16px', borderLeft: '4px solid #10B981' }}>
                <h3 style={{ fontSize: '18px', color: '#F8FAFC', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '16px' }}>📄</span> File: <code style={{ color: '#34D399', background: 'rgba(0,0,0,0.3)', padding: '2px 6px', borderRadius: '4px' }}>rule_based.py</code> (Stage 05)
                </h3>
                <ul style={{ color: '#94A3B8', fontSize: '15px', lineHeight: '1.8', margin: 0, paddingLeft: '24px', listStyleType: 'disc' }}>
                  <li><strong>Algorithm:</strong> Template Pattern Substitution.</li>
                  <li><strong>Flow:</strong>
                    <ul style={{ paddingLeft: '24px', marginTop: '8px' }}>
                      <li>Forwards simple expressions to matched entries in the <code>_RULES</code> list mapping regex patterns to templated lambda functions.</li>
                      <li>For example, the pattern:<br/>
                        <code style={{ background: 'rgba(0,0,0,0.3)', padding: '2px 4px', borderRadius: '4px', fontSize: '13px' }}>SUM\(\s*(?:'[^']+')?(?:\[([^\]]+)\])\s*\)</code><br/>
                        extracts the column name group <code>amount</code> and replaces it directly with <code>SUM(amount)</code>.
                      </li>
                      <li>For divisions, it wraps the denominator in <code>NULLIF</code> (e.g., <code>DIVIDE([A], [B])</code> → <code>CASE WHEN B = 0 THEN NULL ELSE A / B END</code>) to avoid divide-by-zero database crashes.</li>
                    </ul>
                  </li>
                </ul>
              </div>

              <div style={{ background: 'rgba(30, 41, 59, 0.4)', padding: '24px', borderRadius: '16px', borderLeft: '4px solid #10B981' }}>
                <h3 style={{ fontSize: '18px', color: '#F8FAFC', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '16px' }}>📄</span> File: <code style={{ color: '#34D399', background: 'rgba(0,0,0,0.3)', padding: '2px 6px', borderRadius: '4px' }}>llm_based.py</code> & <code style={{ color: '#34D399', background: 'rgba(0,0,0,0.3)', padding: '2px 6px', borderRadius: '4px' }}>chains.py</code> (Stage 06)
                </h3>
                <ul style={{ color: '#94A3B8', fontSize: '15px', lineHeight: '1.8', margin: 0, paddingLeft: '24px', listStyleType: 'disc' }}>
                  <li><strong>Algorithm:</strong> LangChain Fallback Pipeline and Context-Aware AI Generation.</li>
                  <li><strong>Flow:</strong>
                    <ul style={{ paddingLeft: '24px', marginTop: '8px' }}>
                      <li>Extracts active tables and column definitions to build a catalog context schema.</li>
                      <li>Invokes the conversion chain using an async fallback mechanism:
                        <div style={{ background: 'rgba(0,0,0,0.3)', padding: '12px', borderRadius: '8px', marginTop: '8px', marginBottom: '8px', fontFamily: '"Fira Code", monospace', fontSize: '13px', color: '#A7F3D0' }}>
                          Groq (Llama-3) → on fail → OpenAI (GPT-4o) → on fail → Google (Gemini Pro)
                        </div>
                      </li>
                      <li>Cleans output queries using regex patterns to strip away markdown code block fences (e.g., removing <code>```json</code> or <code>```sql</code> blocks) and parses the generated SQL payload.</li>
                    </ul>
                  </li>
                </ul>
              </div>

              <div style={{ background: 'rgba(30, 41, 59, 0.4)', padding: '24px', borderRadius: '16px', borderLeft: '4px solid #10B981' }}>
                <h3 style={{ fontSize: '18px', color: '#F8FAFC', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '16px' }}>📄</span> File: <code style={{ color: '#34D399', background: 'rgba(0,0,0,0.3)', padding: '2px 6px', borderRadius: '4px' }}>stage_07_dialect_translate.py</code> (Stage 07)
                </h3>
                <ul style={{ color: '#94A3B8', fontSize: '15px', lineHeight: '1.8', margin: 0, paddingLeft: '24px', listStyleType: 'disc' }}>
                  <li><strong>Algorithm:</strong> AST Transpilation using <code>sqlglot</code>.</li>
                  <li><strong>Flow:</strong>
                    <ul style={{ paddingLeft: '24px', marginTop: '8px' }}>
                      <li>Feeds the parsed ANSI SQL into the <code>sqlglot</code> library.</li>
                      <li>Converts the internal SQL AST representation into the target dialect (e.g., transpiling generic ANSI SQL into Snowflake syntax with uppercase identifiers and double-quoted column references).</li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 3 */}
          <section id="dynamic-assembly" style={{ marginBottom: '80px', scrollMarginTop: '100px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
              <div style={{ width: '48px', height: '48px', background: 'rgba(236,72,153,0.1)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#EC4899', fontSize: '24px' }}>⚡</div>
              <h2 style={{ fontSize: '32px', fontWeight: '700' }}>3. Dynamic Query Assembly Flow</h2>
            </div>
            
            <p style={{ color: '#E2E8F0', fontSize: '16px', marginBottom: '24px' }}>
              This flow processes live semantic query API requests (<code>/api/v1/semantic/query</code> or <code>/api/v1/semantic/nl_query</code>), resolving metric configurations, grouping dimensions, and applying user filters.
            </p>

            <CodeBlock 
              title="dynamic_assembly_flow.txt"
              code={`[API Post Request] ──> semantic.py ──> engine.py (generate_sql) ──> Snowflake Emitter`}
            />

            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', marginTop: '32px' }}>
              <div style={{ background: 'rgba(30, 41, 59, 0.4)', padding: '24px', borderRadius: '16px', borderLeft: '4px solid #EC4899' }}>
                <h3 style={{ fontSize: '18px', color: '#F8FAFC', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '16px' }}>📄</span> File: <code style={{ color: '#F472B6', background: 'rgba(0,0,0,0.3)', padding: '2px 6px', borderRadius: '4px' }}>engine.py</code> (SemanticEngine)
                </h3>
                <ul style={{ color: '#94A3B8', fontSize: '15px', lineHeight: '1.8', margin: 0, paddingLeft: '24px', listStyleType: 'decimal' }}>
                  <li><strong>Algorithm:</strong> SQL Query Unwrapping and Aggregate Compactor.</li>
                  <li><strong>Flow:</strong>
                    <ul style={{ paddingLeft: '24px', marginTop: '8px', listStyleType: 'disc' }}>
                      <li><strong>Query Parsing / Extraction:</strong>
                        <br/>If the metric holds a pre-seeded query statement (<code>SELECT SUM(amount) FROM sales_deals</code>), the engine parses it using:
                        <br/><code style={{ background: 'rgba(0,0,0,0.3)', padding: '2px 4px', borderRadius: '4px', fontSize: '13px' }}>re.match(r'^SELECT\s+(.*?)\s+FROM\s+([a-zA-Z0-9_\.]+)', sql_clean)</code>
                        <br/>This splits the statement, extracting the aggregate expression (<code>SUM(amount)</code>) and target table (<code>sales_deals</code>).
                      </li>
                      <li style={{ marginTop: '8px' }}><strong>Filter Application:</strong>
                        <br/>Appends any query-level filters (e.g., <code>region = 'US'</code>) by compiling them into conditional SQL clauses.
                      </li>
                      <li style={{ marginTop: '8px' }}><strong>Dimension &amp; Grouping:</strong>
                        <br/>If dimensions are requested (e.g., <code>["deal_stage"]</code>), it wraps the expression in <code>_add_dimensions</code>:
                        <br/><code style={{ background: 'rgba(0,0,0,0.3)', padding: '2px 4px', borderRadius: '4px', fontSize: '13px', color: '#A7F3D0' }}>SELECT deal_stage, SUM(amount) FROM sales_deals GROUP BY deal_stage</code>
                        <br/>If no dimensions are requested, it wraps the core aggregate directly:
                        <br/><code style={{ background: 'rgba(0,0,0,0.3)', padding: '2px 4px', borderRadius: '4px', fontSize: '13px', color: '#A7F3D0' }}>SELECT SUM(amount) AS "Total Sales Amount" FROM sales_deals</code>
                      </li>
                      <li style={{ marginTop: '8px' }}><strong>SQL Quoting Safety:</strong>
                        <br/>Checks if the metric alias contains spaces (e.g., <code>"Total Sales Amount"</code>) and wraps the alias in double quotes to prevent syntax errors during query compilation on the warehouse.
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          </section>

        </div>
      </div>
    </div>
    <style dangerouslySetInnerHTML={{__html: `
      .mobile-toggle {
        display: none;
      }
      .sidebar {
        width: 280px;
        flex-shrink: 0;
        position: sticky;
        top: 100px;
        height: fit-content;
        background: rgba(255,255,255,0.02);
        padding: 24px;
        border-radius: 16px;
        border: 1px solid rgba(255,255,255,0.05);
      }
      @media (max-width: 1024px) {
        .mobile-toggle {
          display: block;
          position: fixed;
          top: 20px;
          right: 20px;
          background: rgba(139, 92, 246, 0.8);
          border: none;
          border-radius: 8px;
          color: #fff;
          padding: 8px 16px;
          font-size: 18px;
          cursor: pointer;
          z-index: 1001;
        }
        .sidebar {
          position: fixed;
          top: 0;
          left: -300px;
          height: 100vh;
          width: 280px;
          background: rgba(15, 23, 42, 0.98);
          backdrop-filter: blur(16px);
          z-index: 1000;
          transition: left 0.3s ease;
          border-radius: 0;
          border: none;
          border-right: 1px solid rgba(255,255,255,0.08);
          overflow-y: auto;
        }
        .sidebar.mobile-open {
          left: 0;
        }
      }
    `}} />
  </>);
};

export default SemanticEngineHLD;
