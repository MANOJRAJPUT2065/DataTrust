import React, { useState } from 'react';

const mockMetrics = [
  {
    name: "Total Revenue",
    label: "Total Sales Revenue",
    description: "Calculates the total sales revenue generated across all completed orders.",
    owner: "finance_team@company.com",
    sql_expression: "SUM(net_sales)",
    synonyms: ["Sales", "Turnover", "Gross Revenue"],
    lineage: "Snowflake -> gold.fact_orders -> Total Revenue",
    queries: 421,
    avg_time: "145ms"
  },
  {
    name: "Customer Churn Rate",
    label: "Churn Rate",
    description: "Percentage of subscription customers who cancelled their active subscription in the billing month.",
    owner: "csm_team@company.com",
    sql_expression: "COUNT(cancelled_users) / COUNT(total_active_users)",
    synonyms: ["Churn", "Cancellation Rate", "Attrition"],
    lineage: "Snowflake -> gold.dim_users -> Churn Rate",
    queries: 184,
    avg_time: "210ms"
  },
  {
    name: "Average Order Value (AOV)",
    label: "AOV",
    description: "Average amount spent by customers per completed purchase order.",
    owner: "sales_team@company.com",
    sql_expression: "SUM(net_sales) / COUNT(order_id)",
    synonyms: ["Average Basket", "Order Average"],
    lineage: "Snowflake -> gold.fact_orders -> AOV",
    queries: 98,
    avg_time: "112ms"
  },
  {
    name: "Monthly Active Users (MAU)",
    label: "MAU",
    description: "Distinct count of users who logged in or performed an action within the past 30 days.",
    owner: "product_team@company.com",
    sql_expression: "COUNT(DISTINCT user_id) WHERE last_active_date >= CURRENT_DATE - 30",
    synonyms: ["Active Users", "Monthly Active"],
    lineage: "Snowflake -> gold.fact_user_sessions -> MAU",
    queries: 312,
    avg_time: "185ms"
  }
];

export default function SemanticSearchDocs() {
  const [searchQuery, setSearchQuery] = useState('revenue');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [copiedCode, setCopiedCode] = useState(null);

  const handleCopy = (id, text) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const handleSearch = () => {
    if (!searchQuery.trim()) return;
    setIsSearching(true);
    setSearchResults([]);
    
    setTimeout(() => {
      const queryTerms = searchQuery.toLowerCase().split(' ');
      const matched = mockMetrics.map(m => {
        let matches = 0;
        const textToMatch = `${m.name} ${m.label} ${m.description} ${m.synonyms.join(' ')}`.toLowerCase();
        
        queryTerms.forEach(term => {
          if (textToMatch.includes(term)) matches += 1;
        });
        
        // Base similarity calculation
        let similarity = 0.45;
        if (queryTerms.length > 0) {
          similarity += (matches / queryTerms.length) * 0.53;
        }
        
        // Add random variance for realism
        similarity += Math.random() * 0.02;
        similarity = Math.min(0.98, Math.max(0.45, similarity));
        
        return {
          ...m,
          similarity: similarity
        };
      })
      .filter(m => m.similarity > 0.5)
      .sort((a, b) => b.similarity - a.similarity);

      setSearchResults(matched);
      setIsSearching(false);
    }, 800);
  };

  return (
    <div style={{ padding: '60px 0', background: '#0F172A', color: '#CBD5E1', fontFamily: '"Inter", sans-serif' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 20px' }}>
        
        {/* Header */}
        <div style={{ marginBottom: '50px' }}>
          <div style={{ display: 'inline-block', padding: '4px 12px', background: 'rgba(99, 102, 241, 0.1)', border: '1px solid rgba(99, 102, 241, 0.2)', borderRadius: '20px', color: '#818CF8', fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '16px' }}>
            V3.0 Enterprise Search
          </div>
          <h2 style={{ color: '#fff', fontSize: '36px', fontWeight: '800', margin: '0 0 10px 0' }}>🔍 Semantic Search (pgvector)</h2>
          <p style={{ color: '#94A3B8', fontSize: '18px', margin: 0, lineHeight: '1.6' }}>
            Perform natural language queries over your corporate metrics registry using embedding similarity. Connects Excel users directly to data contexts.
          </p>
        </div>

        {/* Section 1: Semantic Search Simulator */}
        <div style={{ background: '#070C16', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '20px', padding: '32px', marginBottom: '40px', boxShadow: '0 20px 40px rgba(0,0,0,0.3)' }}>
          <h3 style={{ color: '#fff', fontSize: '22px', fontWeight: '700', marginTop: 0, marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ color: '#6366F1' }}>⚡</span> pgvector Cosine Search Simulator
          </h3>

          <div style={{ display: 'flex', gap: '12px', marginBottom: '30px' }}>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search metrics (e.g. 'sales volume', 'cancellation rate')"
              style={{
                flex: 1,
                background: '#090E17',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '8px',
                padding: '14px 20px',
                color: '#FFF',
                fontSize: '15px',
                fontFamily: 'inherit',
                outline: 'none'
              }}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
            <button
              onClick={handleSearch}
              disabled={isSearching}
              style={{
                background: '#6366F1',
                color: '#FFF',
                border: 'none',
                borderRadius: '8px',
                padding: '0 28px',
                fontSize: '14px',
                fontWeight: '800',
                cursor: 'pointer',
                transition: 'all 0.2s',
                textTransform: 'uppercase'
              }}
            >
              {isSearching ? 'Searching...' : 'Search 🔍'}
            </button>
          </div>

          {/* Results Area */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', minHeight: '150px' }}>
            {isSearching ? (
              <div style={{ textAlign: 'center', padding: '40px 0', color: '#94A3B8' }}>
                Generating embedding via text-embedding-3-small...<br/>
                Executing pgvector cosine distance query...
              </div>
            ) : searchResults.length > 0 ? (
              searchResults.map((res, index) => (
                <div
                  key={index}
                  style={{
                    background: '#090E17',
                    border: '1px solid rgba(255,255,255,0.05)',
                    borderRadius: '12px',
                    padding: '24px',
                    position: 'relative',
                    transition: 'all 0.3s',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.15)'
                  }}
                >
                  {/* Similarity Score Badge */}
                  <div
                    style={{
                      position: 'absolute',
                      top: '24px',
                      right: '24px',
                      padding: '6px 12px',
                      background: res.similarity >= 0.8 ? 'rgba(16, 185, 129, 0.1)' : 'rgba(245, 158, 11, 0.1)',
                      border: `1px solid ${res.similarity >= 0.8 ? '#10B981' : '#F59E0B'}`,
                      borderRadius: '20px',
                      color: res.similarity >= 0.8 ? '#10B981' : '#F59E0B',
                      fontSize: '13px',
                      fontWeight: '700'
                    }}
                  >
                    {(res.similarity * 100).toFixed(1)}% Similarity
                  </div>

                  <h4 style={{ color: '#FFF', fontSize: '18px', fontWeight: '700', margin: '0 0 8px 0' }}>
                    {res.name} <span style={{ color: '#64748B', fontSize: '14px', fontWeight: '500' }}>({res.label})</span>
                  </h4>
                  
                  <p style={{ color: '#94A3B8', fontSize: '14px', margin: '0 0 16px 0', lineHeight: '1.5', maxWidth: '80%' }}>
                    {res.description}
                  </p>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,0.05)', fontSize: '12px' }}>
                    <div>
                      <span style={{ color: '#64748B', display: 'block', marginBottom: '4px', textTransform: 'uppercase' }}>SQL Expression</span>
                      <code style={{ color: '#A5B4FC', fontFamily: 'monospace' }}>{res.sql_expression}</code>
                    </div>
                    <div>
                      <span style={{ color: '#64748B', display: 'block', marginBottom: '4px', textTransform: 'uppercase' }}>Business Owner</span>
                      <span style={{ color: '#E2E8F0' }}>{res.owner}</span>
                    </div>
                    <div>
                      <span style={{ color: '#64748B', display: 'block', marginBottom: '4px', textTransform: 'uppercase' }}>Data Lineage</span>
                      <span style={{ color: '#FCD34D' }}>{res.lineage}</span>
                    </div>
                    <div>
                      <span style={{ color: '#64748B', display: 'block', marginBottom: '4px', textTransform: 'uppercase' }}>Usage Stats</span>
                      <span style={{ color: '#93C5FD' }}>{res.queries} queries ({res.avg_time})</span>
                    </div>
                  </div>

                </div>
              ))
            ) : (
              <div style={{ textAlign: 'center', padding: '40px 0', color: '#475569', fontSize: '14px' }}>
                Enter a query and hit search to simulate pgvector cosine similarity ranking.
              </div>
            )}
          </div>
        </div>

        {/* Section 2: Code Blocks & Specifications */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          
          {/* pgvector Schema */}
          <div style={{ background: '#070C16', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '20px', padding: '32px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h4 style={{ color: '#fff', fontSize: '18px', fontWeight: '700', margin: 0 }}>🗄️ pgvector Embedding Table & Index (1536-dim)</h4>
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

          {/* Search Engine Python */}
          <div style={{ background: '#070C16', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '20px', padding: '32px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h4 style={{ color: '#fff', fontSize: '18px', fontWeight: '700', margin: 0 }}>🐍 Core Semantic Search Python Engine</h4>
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

const sqlSchema = `-- Enable pgvector Extension
CREATE EXTENSION IF NOT EXISTS vector;

-- Embedding Table
CREATE TABLE IF NOT EXISTS metric_embeddings (
    metric_id UUID REFERENCES metrics(id) ON DELETE CASCADE,
    tenant_id VARCHAR(255) NOT NULL,
    embedding vector(1536),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    PRIMARY KEY (metric_id, tenant_id)
);

-- IVFFlat Similarity Search Index
CREATE INDEX idx_metric_embeddings_vector ON metric_embeddings 
USING ivfflat (embedding vector_cosine_ops) WITH (lists = 100);`;

const pythonLogic = `class SemanticSearchEngine:
    """Semantic Search Engine using pgvector (No Hardcoding)"""

    def __init__(self, db: Session, tenant_id: str):
        self.db = db
        self.tenant_id = tenant_id
        self.openai_client = OpenAI()

    def search(self, query: str, limit: int = 5) -> List[Dict]:
        # 1. Generate query embedding via OpenAI
        response = self.openai_client.embeddings.create(
            model="text-embedding-3-small",
            input=query
        )
        embedding = response.data[0].embedding
        vector_str = "[" + ",".join(map(str, embedding)) + "]"

        # 2. Execute pgvector cosine similarity search using raw SQL cast
        search_query = """
            SELECT m.id, m.name, m.label, m.description, 
                   1 - (me.embedding <=> CAST(:embedding AS vector)) AS similarity
            FROM metrics m
            JOIN metric_embeddings me ON m.id = me.metric_id
            WHERE me.tenant_id = :tenant_id
            ORDER BY similarity DESC
            LIMIT :limit
        """
        result = self.db.execute(
            text(search_query),
            {"embedding": vector_str, "tenant_id": self.tenant_id, "limit": limit}
        ).fetchall()

        return [dict(row._mapping) for row in result]`;
