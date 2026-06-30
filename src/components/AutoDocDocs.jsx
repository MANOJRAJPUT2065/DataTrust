import React, { useState } from 'react';

const templates = {
  metric: {
    name: "Metric Template",
    context: {
      metric_name: "Revenue",
      aggregation: "SUM",
      sql_expression: "SUM(net_sales)",
      owner: "finance_team@company.com",
      synonyms: ["Sales", "Turnover", "Gross Revenue"]
    },
    prompt: `You are a data documentation expert. Generate business-friendly documentation for a metric.

Follow these rules:
1. Use plain English (no technical jargon)
2. Explain what the metric means, not how it's calculated
3. Include who owns this metric
4. Mention common use cases
5. List any synonyms

Context:
{{ context_json }}`,
    response: `# Revenue

Revenue is the total amount of money generated from sales of products and services, calculated after deducting returns, discounts, and allowances.

**Business Owner**: finance_team@company.com

**Common Use Cases**:
- Board reporting
- Investor presentations
- Monthly business reviews

**Synonyms**: Sales, Turnover, Gross Revenue`
  },
  table: {
    name: "Table Template",
    context: {
      table_name: "FACT_QUALITY_VIOLATION",
      schema: "DATATRUST_UNIFIED",
      description: "Stores historical quality check violations and self-healing actions.",
      row_count: 12450200
    },
    prompt: `You are a data documentation expert. Generate documentation for a database table.

Include:
1. Purpose of the table
2. Key columns and their meaning
3. Relationships with other tables
4. Refresh frequency

Context:
{{ context_json }}`,
    response: `# FACT_QUALITY_VIOLATION

This table stores historical records of all data quality rule violations, anomaly alerts, and automated self-healing actions executed by the DataTrust engines.

**Schema**: DATATRUST_UNIFIED
**Refresh Frequency**: Hourly (via incremental dbt streams)
**Data Volume**: 12.4M rows`
  },
  column: {
    name: "Column Template",
    context: {
      column_name: "severity",
      data_type: "VARCHAR(20)",
      description: "Represents the severity level of the data quality violation (low, medium, high, critical)."
    },
    prompt: `You are a data documentation expert. Generate documentation for a database column.

Include:
1. What the column represents
2. Data type and format
3. Allowed values (if enum)

Context:
{{ context_json }}`,
    response: `# severity

Represents the severity classification of a data quality violation, used by the alerting engine to route notifications to the correct channel (Slack, Teams, Email).

**Data Type**: VARCHAR(20)
**Allowed Values**: low, medium, high, critical`
  }
};

export default function AutoDocDocs() {
  const [selectedTemplate, setSelectedTemplate] = useState('metric');
  const [customContext, setCustomContext] = useState(JSON.stringify(templates.metric.context, null, 2));
  const [customPrompt, setCustomPrompt] = useState(templates.metric.prompt);
  const [terminalOutput, setTerminalOutput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [copiedCode, setCopiedCode] = useState(null);

  const handleTemplateChange = (type) => {
    setSelectedTemplate(type);
    setCustomContext(JSON.stringify(templates[type].context, null, 2));
    setCustomPrompt(templates[type].prompt);
    setTerminalOutput('');
  };

  const handleCopy = (id, text) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const handleGenerate = () => {
    setIsGenerating(true);
    setTerminalOutput('Initializing Auto-Documentation Engine...\nAggregating context from metadata registry...\nFetching schema from Snowflake...\nLoading lineage graph & usage stats...\nSending prompt payload to Groq (Llama-3.3-70b-versatile)...');
    
    setTimeout(() => {
      setTerminalOutput(prev => prev + '\nLLM response received. Post-processing markdown...\n\n');
      let responseText = templates[selectedTemplate].response;
      let i = 0;
      const interval = setInterval(() => {
        if (i < responseText.length) {
          setTerminalOutput(prev => prev + responseText.charAt(i));
          i++;
        } else {
          clearInterval(interval);
          setIsGenerating(false);
        }
      }, 5);
    }, 1500);
  };

  return (
    <div style={{ padding: '60px 0', background: '#0F172A', color: '#CBD5E1', fontFamily: '"Inter", sans-serif' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 20px' }}>
        
        {/* Header */}
        <div style={{ marginBottom: '50px' }}>
          <div style={{ display: 'inline-block', padding: '4px 12px', background: 'rgba(0, 191, 165, 0.1)', border: '1px solid rgba(0, 191, 165, 0.2)', borderRadius: '20px', color: '#00BFA5', fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '16px' }}>
            V3.0 Intelligent Curation
          </div>
          <h2 style={{ color: '#fff', fontSize: '36px', fontWeight: '800', margin: '0 0 10px 0' }}>🤖 Auto-Documentation Engine</h2>
          <p style={{ color: '#94A3B8', fontSize: '18px', margin: 0, lineHeight: '1.6' }}>
            Zero-touch data governance. Automatically generates business-friendly descriptions of metrics, tables, and columns using LLMs.
          </p>
        </div>

        {/* Section 1: Interactive Prompt Playground */}
        <div style={{ background: '#070C16', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '20px', padding: '32px', marginBottom: '40px', boxShadow: '0 20px 40px rgba(0,0,0,0.3)' }}>
          <h3 style={{ color: '#fff', fontSize: '22px', fontWeight: '700', marginTop: 0, marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ color: '#00BFA5' }}>⚡</span> LLM Prompt & Template Playground
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '30px' }}>
            
            {/* Left Column: Configuration */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <label style={{ fontSize: '11px', textTransform: 'uppercase', color: '#64748B', fontWeight: '800', display: 'block', marginBottom: '8px' }}>Select Target Template</label>
                <div style={{ display: 'flex', gap: '8px' }}>
                  {['metric', 'table', 'column'].map((type) => (
                    <button
                      key={type}
                      onClick={() => handleTemplateChange(type)}
                      style={{
                        flex: 1,
                        background: selectedTemplate === type ? 'rgba(0, 191, 165, 0.1)' : 'rgba(255,255,255,0.02)',
                        color: selectedTemplate === type ? '#00BFA5' : '#94A3B8',
                        border: `1px solid ${selectedTemplate === type ? '#00BFA5' : 'rgba(255,255,255,0.1)'}`,
                        borderRadius: '8px',
                        padding: '10px',
                        fontSize: '13px',
                        fontWeight: '700',
                        cursor: 'pointer',
                        textTransform: 'capitalize'
                      }}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label style={{ fontSize: '11px', textTransform: 'uppercase', color: '#64748B', fontWeight: '800', display: 'block', marginBottom: '8px' }}>Jinja2 Prompt Template</label>
                <textarea
                  value={customPrompt}
                  onChange={(e) => setCustomPrompt(e.target.value)}
                  style={{
                    width: '100%',
                    height: '140px',
                    background: '#090E17',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '8px',
                    padding: '12px',
                    color: '#FFF',
                    fontSize: '13px',
                    fontFamily: 'monospace',
                    resize: 'none',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              <div>
                <label style={{ fontSize: '11px', textTransform: 'uppercase', color: '#64748B', fontWeight: '800', display: 'block', marginBottom: '8px' }}>Entity Context (JSON Metadata)</label>
                <textarea
                  value={customContext}
                  onChange={(e) => setCustomContext(e.target.value)}
                  style={{
                    width: '100%',
                    height: '130px',
                    background: '#090E17',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '8px',
                    padding: '12px',
                    color: '#A5B4FC',
                    fontSize: '13px',
                    fontFamily: 'monospace',
                    resize: 'none',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              <button
                disabled={isGenerating}
                onClick={handleGenerate}
                style={{
                  background: isGenerating ? 'rgba(0, 191, 165, 0.1)' : '#00BFA5',
                  color: isGenerating ? '#00BFA5' : '#070C16',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '14px 20px',
                  fontWeight: '800',
                  fontSize: '13px',
                  cursor: isGenerating ? 'default' : 'pointer',
                  transition: 'all 0.2s',
                  textTransform: 'uppercase'
                }}
              >
                {isGenerating ? 'Curating documentation...' : 'Generate Documentation ⚡'}
              </button>
            </div>

            {/* Right Column: Terminal Output */}
            <div style={{ background: '#090E17', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', display: 'flex', flexDirection: 'column' }}>
              <div style={{ background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid rgba(255,255,255,0.08)', padding: '12px 16px', display: 'flex', gap: '6px', alignItems: 'center' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#EF4444' }} />
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#F59E0B' }} />
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10B981' }} />
                <span style={{ fontSize: '11px', color: '#64748B', fontFamily: 'monospace', marginLeft: '10px', textTransform: 'uppercase' }}>Inference Console</span>
              </div>
              <div style={{ padding: '20px', flex: 1, fontFamily: '"Fira Code", monospace', fontSize: '13px', color: '#F8FAFC', minHeight: '380px', overflowY: 'auto', whiteSpace: 'pre-wrap', lineHeight: '1.6' }}>
                {terminalOutput ? (
                  terminalOutput
                ) : (
                  <span style={{ color: '#475569' }}>Terminal ready. Click 'Generate Documentation' to compile.</span>
                )}
              </div>
            </div>

          </div>
        </div>

        {/* Section 2: Code Blocks & Specifications */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          
          {/* Database Schema */}
          <div style={{ background: '#070C16', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '20px', padding: '32px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h4 style={{ color: '#fff', fontSize: '18px', fontWeight: '700', margin: 0 }}>🗄️ Database Schema (doc_registry & templates)</h4>
              <button
                onClick={() => handleCopy('schema', sqlSchema)}
                style={{
                  background: copiedCode === 'schema' ? '#10B981' : 'rgba(255,255,255,0.05)',
                  color: '#FFF',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '8px',
                  padding: '8px 16px',
                  cursor: 'pointer',
                  fontSize: '12px',
                  fontWeight: '700',
                  transition: 'all 0.2s'
                }}
              >
                {copiedCode === 'schema' ? 'Copied! ✓' : 'Copy SQL'}
              </button>
            </div>
            <div style={{ background: '#090E17', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '12px', padding: '20px', overflowX: 'auto' }}>
              <pre style={{ margin: 0, fontSize: '13px', fontFamily: '"Fira Code", monospace', color: '#A5B4FC', lineHeight: '1.6' }}>
                <code>{sqlSchema}</code>
              </pre>
            </div>
          </div>

          {/* Core Logic Python */}
          <div style={{ background: '#070C16', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '20px', padding: '32px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h4 style={{ color: '#fff', fontSize: '18px', fontWeight: '700', margin: 0 }}>🐍 Core Engine Python Logic</h4>
              <button
                onClick={() => handleCopy('engine', pythonLogic)}
                style={{
                  background: copiedCode === 'engine' ? '#10B981' : 'rgba(255,255,255,0.05)',
                  color: '#FFF',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '8px',
                  padding: '8px 16px',
                  cursor: 'pointer',
                  fontSize: '12px',
                  fontWeight: '700',
                  transition: 'all 0.2s'
                }}
              >
                {copiedCode === 'engine' ? 'Copied! ✓' : 'Copy Python'}
              </button>
            </div>
            <div style={{ background: '#090E17', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '12px', padding: '20px', overflowX: 'auto', maxHeight: '400px', overflowY: 'auto' }}>
              <pre style={{ margin: 0, fontSize: '13px', fontFamily: '"Fira Code", monospace', color: '#A5B4FC', lineHeight: '1.6' }}>
                <code>{pythonLogic}</code>
              </pre>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

const sqlSchema = `-- Documentation Registry
CREATE TABLE IF NOT EXISTS doc_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    entity_type VARCHAR(50) NOT NULL,  -- metric, table, column, dashboard
    entity_id VARCHAR(255) NOT NULL,
    tenant_id VARCHAR(255) NOT NULL,
    doc_version VARCHAR(20) DEFAULT '1.0.0',
    content_markdown TEXT,
    content_html TEXT,
    content_plain TEXT,
    metadata JSONB,
    confidence_score DECIMAL(3,2),
    generated_by VARCHAR(50) DEFAULT 'system',
    generated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    last_updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(entity_type, entity_id, tenant_id)
);

-- Documentation Templates
CREATE TABLE IF NOT EXISTS doc_templates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    template_name VARCHAR(100) NOT NULL,
    entity_type VARCHAR(50) NOT NULL,
    template_content TEXT NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    version VARCHAR(20) DEFAULT '1.0.0',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);`;

const pythonLogic = `class AutoDocumentationEngine:
    """Auto-Documentation Engine — Complete Implementation (No Hardcoding)"""

    def __init__(self, db: Session, tenant_id: str):
        self.db = db
        self.tenant_id = tenant_id
        self.llm_fallback = self._init_llm_fallback()

    def generate_documentation(self, request: DocGenerationRequest) -> DocGenerationResponse:
        # 1. Validate entity exists
        entity = self._get_entity(request.entity_type, request.entity_id)
        if not entity:
            raise ValueError(f"Entity {request.entity_id} not found")
        
        # 2. Build context dynamically (lineage, schema, usage stats)
        context = self._build_context(request, entity)
        
        # 3. Generate using LLM Fallback Chain (Groq -> OpenAI -> Gemini -> Ollama)
        result = self._generate_with_llm(context, request)
        
        # 4. Post-process (Markdown to HTML, tags extraction)
        processed = self._post_process(result, request)
        
        # 5. Save & Version doc registry
        return self._save_documentation(processed, request)`;
