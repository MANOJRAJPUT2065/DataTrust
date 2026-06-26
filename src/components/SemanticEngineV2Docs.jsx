import React, { useState } from 'react';
import { ArrowRight, RefreshCw, FileText, Settings, Shield, Zap, Search, Brain, Code } from './Icons';

export default function SemanticEngineV2Docs() {
  const hldLayers = [
    {
      title: 'INPUT LAYER',
      color: '#00BFA5',
      items: [
        { name: 'Metric Definition', desc: 'Canonical YAML or JSON parameters defining metrics and equations.' },
        { name: 'Data Lineage', desc: 'Source-to-target dependency schemas tracking columns.' },
        { name: 'User Query (NLQ)', desc: 'Natural Language query inputted by business users in Excel.' }
      ]
    },
    {
      title: 'PROCESSING LAYER',
      color: '#6366F1',
      items: [
        { name: 'Metric Registry', desc: 'Main repository hosting definitions, owners, synonyms and semantic versions.' },
        { name: 'Vector Embedding Engine', desc: 'Converts names & descriptions into 1536-dimensional vectors using OpenAI text-embedding-3-small.' },
        { name: 'Lineage Engine', desc: 'Maps data flow graphs at the column level: Source → Transformation → Metric → Report.' },
        { name: 'Semantic Search Router', desc: 'Vector cosine similarity search over pgvector to match queries to metrics.' }
      ]
    },
    {
      title: 'OUTPUT LAYER',
      color: '#EC4899',
      items: [
        { name: 'SQL Generation', desc: 'Synthesized SQL dialect ready to query the warehouse.' },
        { name: 'Lineage Graph JSON', desc: 'Visual dependencies maps returned to client web consoles.' },
        { name: 'Semantic Search Results', desc: 'List of matching canonical metrics with similarity scoring.' }
      ]
    }
  ];

  return (
    <div style={{ padding: '60px 0', background: '#0F172A', color: '#CBD5E1' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 20px' }}>
        
        {/* Header */}
        <div style={{ marginBottom: '50px' }}>
          <div style={{ display: 'inline-block', padding: '4px 12px', background: 'rgba(0, 191, 165, 0.1)', border: '1px solid rgba(0, 191, 165, 0.2)', borderRadius: '20px', color: '#00BFA5', fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '16px' }}>
            Core Engine V3.0
          </div>
          <h2 style={{ color: '#fff', fontSize: '36px', fontWeight: '800', margin: '0 0 10px 0' }}>Semantic Engine V2</h2>
          <p style={{ color: '#94A3B8', fontSize: '18px', margin: 0, lineHeight: '1.6' }}>
            Single source of truth for metrics definitions, vector-based similarity search, and automated column-level data lineage tracking.
          </p>
        </div>

        {/* ─── HLD SECTION ─────────────────────────────────────────── */}
        <h3 style={{ color: '#00BFA5', fontSize: '24px', margin: '40px 0 20px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '20px' }}>🧠</span> 1. High-Level Design (HLD)
        </h3>

        {/* ASCII HLD Box */}
        <div style={{ background: '#090D1A', border: '1px solid rgba(99,102,241,0.2)', borderRadius: '12px', padding: '24px', overflowX: 'auto', marginBottom: '40px', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}>
          <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#EF4444' }}></div>
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#F59E0B' }}></div>
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#10B981' }}></div>
            <span style={{ fontSize: '11px', color: '#64748B', fontFamily: 'monospace', marginLeft: '10px' }}>semantic_engine_hld.ascii</span>
          </div>
          <pre style={{ margin: 0, color: '#7EE7B8', fontSize: '12px', fontFamily: 'var(--font-mono, monospace)', lineHeight: '1.4' }}>{`┌─────────────────────────────────────────────────────────────────────────────┐
│                    SEMANTIC ENGINE V2 — COMPLETE HLD                      │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐  │
│  │  INPUT LAYER                                                         │  │
│  │  ┌──────────────┐  ┌──────────────┐  ┌────────────────────────────┐│  │
│  │  │  Metric      │  │  Data        │  │  User Query               ││  │
│  │  │  Definition  │  │  Lineage     │  │  (NLQ)                    ││  │
│  │  └──────────────┘  └──────────────┘  └────────────────────────────┘│  │
│  └─────────────────────────────────────────────────────────────────────┘  │
│                                    │                                        │
│                                    ▼                                        │
│  ┌─────────────────────────────────────────────────────────────────────┐  │
│  │  PROCESSING LAYER                                                    │  │
│  │  ┌──────────────────────────────────────────────────────────────────┐│  │
│  │  │  1. METRIC REGISTRY                                             ││  │
│  │  │     • Store canonical definitions                               ││  │
│  │  │     • Version history (v1.0.0 → v2.3.1)                       ││  │
│  │  │     • Ownership & synonyms                                      ││  │
│  │  └──────────────────────────────────────────────────────────────────┘│  │
│  │  ┌──────────────────────────────────────────────────────────────────┐│  │
│  │  │  2. VECTOR EMBEDDING ENGINE                                     ││  │
│  │  │     • OpenAI text-embedding-3-small → 1536 dimensions          ││  │
│  │  │     • Stored in pgvector                                        ││  │
│  │  │     • Enables semantic search                                   ││  │
│  │  └──────────────────────────────────────────────────────────────────┘│  │
│  │  ┌──────────────────────────────────────────────────────────────────┐│  │
│  │  │  3. LINEAGE ENGINE                                              ││  │
│  │  │     • Column-level lineage tracking                            ││  │
│  │  │     • Source → Transformation → Metric → Report                ││  │
│  │  │     • Impact analysis                                           ││  │
│  │  └──────────────────────────────────────────────────────────────────┘│  │
│  │  ┌──────────────────────────────────────────────────────────────────┐│  │
│  │  │  4. SEMANTIC SEARCH                                             ││  │
│  │  │     • Vector similarity search (pgvector)                      ││  │
│  │  │     • Hybrid search (BM25 + Vector)                            ││  │
│  │  │     • Result: Churn Rate (95%), Retention (88%)                ││  │
│  │  └──────────────────────────────────────────────────────────────────┘│  │
│  └─────────────────────────────────────────────────────────────────────┘  │
│                                    │                                        │
│                                    ▼                                        │
│  ┌─────────────────────────────────────────────────────────────────────┐  │
│  │  OUTPUT LAYER                                                        │  │
│  │  ┌──────────────┐  ┌──────────────┐  ┌────────────────────────────┐│  │
│  │  │  SQL         │  │  Lineage     │  │  Semantic Search          ││  │
│  │  │  Generation  │  │  Graph       │  │  Results                  ││  │
│  │  └──────────────┘  └──────────────┘  └────────────────────────────┘│  │
│  └─────────────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────────────┘`}</pre>
        </div>

        {/* Visual Flow Representation */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '60px' }}>
          {hldLayers.map((layer, idx) => (
            <div key={idx} style={{ background: '#1E293B', border: `1px solid rgba(255, 255, 255, 0.05)`, borderRadius: '16px', padding: '24px', boxShadow: '0 4px 15px rgba(0,0,0,0.2)', position: 'relative' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                <span style={{ fontSize: '11px', fontWeight: '800', color: layer.color, background: `${layer.color}15`, padding: '4px 10px', borderRadius: '4px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{layer.title}</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px' }}>
                {layer.items.map((item, j) => (
                  <div key={j} style={{ background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.03)', padding: '16px', borderRadius: '10px' }}>
                    <div style={{ fontWeight: '700', color: '#fff', fontSize: '14px', marginBottom: '6px' }}>{item.name}</div>
                    <div style={{ fontSize: '12px', color: '#94A3B8', lineHeight: '1.5' }}>{item.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* ─── LLD SCHEMA SECTION ───────────────────────────────────── */}
        <h3 style={{ color: '#00BFA5', fontSize: '24px', margin: '60px 0 20px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '20px' }}>🗄️</span> 2. Low-Level Design (LLD) — Schema
        </h3>
        
        <CodeBlock title="database_schema.sql" language="sql" code={`-- Metrics Registry
CREATE TABLE metrics (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    display_name VARCHAR(255),
    description TEXT,
    definition TEXT NOT NULL,
    sql_expression TEXT,
    dataset_id UUID REFERENCES datasets(id),
    source_column VARCHAR(255),
    aggregation VARCHAR(50),
    owner_id UUID REFERENCES users(id),
    version VARCHAR(20) DEFAULT '1.0.0',
    synonyms JSONB,  -- ['Sales', 'Turnover', 'Gross Revenue']
    tags JSONB,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Version History
CREATE TABLE metric_versions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    metric_id UUID REFERENCES metrics(id),
    version VARCHAR(20) NOT NULL,
    definition TEXT,
    sql_expression TEXT,
    changed_by UUID REFERENCES users(id),
    change_reason TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Vector Embeddings (pgvector)
CREATE TABLE metric_embeddings (
    metric_id UUID REFERENCES metrics(id) ON DELETE CASCADE,
    embedding vector(1536),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Lineage Tracking
CREATE TABLE lineage (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    source_type VARCHAR(50),  -- snowflake, postgres, databricks
    source_name VARCHAR(255),
    source_column VARCHAR(255),
    target_type VARCHAR(50),  -- metric, report, dashboard
    target_name VARCHAR(255),
    target_column VARCHAR(255),
    transformation TEXT,
    lineage_graph JSONB,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_metrics_name ON metrics(name);
CREATE INDEX idx_metrics_dataset ON metrics(dataset_id);
CREATE INDEX idx_metrics_owner ON metrics(owner_id);
CREATE INDEX idx_metric_versions_metric ON metric_versions(metric_id);
CREATE INDEX idx_lineage_source ON lineage(source_type, source_name);
CREATE INDEX idx_lineage_target ON lineage(target_type, target_name);

-- pgvector index for fast similarity search
CREATE INDEX idx_metric_embeddings_vector ON metric_embeddings 
USING ivfflat (embedding vector_cosine_ops) WITH (lists = 100);`} />

        {/* ─── LLD CORE LOGIC SECTION ────────────────────────────────── */}
        <h3 style={{ color: '#00BFA5', fontSize: '24px', margin: '60px 0 20px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '20px' }}>⚡</span> 3. Low-Level Design (LLD) — Core Logic
        </h3>

        <CodeBlock title="src/datatrust/semantic/engine.py" language="python" code={`# src/datatrust/semantic/engine.py

import uuid
import os
from typing import List, Dict, Optional, Any
from datetime import datetime
from sqlalchemy.orm import Session
from langchain_openai import OpenAIEmbeddings
from pgvector.sqlalchemy import Vector

class SemanticEngineV2:
    """Semantic Engine V2 — Complete Implementation"""
    
    def __init__(self, db: Session):
        self.db = db
        self.embeddings = OpenAIEmbeddings(
            model="text-embedding-3-small",
            api_key=os.getenv("OPENAI_API_KEY")
        )
    
    # ──────────────────────────────────────────────────────────────
    # 1. METRIC CRUD OPERATIONS
    # ──────────────────────────────────────────────────────────────
    
    def create_metric(self, data: Dict) -> Metric:
        """Create a new metric with version history"""
        metric = Metric(
            id=str(uuid.uuid4()),
            name=data['name'],
            display_name=data.get('display_name'),
            description=data.get('description'),
            definition=data['definition'],
            sql_expression=data.get('sql_expression'),
            dataset_id=data['dataset_id'],
            source_column=data.get('source_column'),
            aggregation=data.get('aggregation'),
            owner_id=data['owner_id'],
            version="1.0.0",
            synonyms=data.get('synonyms', []),
            tags=data.get('tags', [])
        )
        self.db.add(metric)
        self.db.commit()
        self.db.refresh(metric)
        
        # Generate embedding
        self._generate_embedding(metric.id)
        
        # Create version record
        self._create_version(metric.id, "1.0.0", data['definition'], data['owner_id'])
        
        return metric
    
    def update_metric(self, metric_id: str, data: Dict, user_id: str) -> Metric:
        """Update metric with versioning"""
        metric = self.db.query(Metric).filter(Metric.id == metric_id).first()
        if not metric:
            raise ValueError(f"Metric {metric_id} not found")
        
        # Bump version
        old_version = metric.version
        new_version = self._bump_version(old_version)
        
        # Store old version in history
        self._create_version(metric_id, old_version, metric.definition, user_id)
        
        # Update metric
        for key, value in data.items():
            setattr(metric, key, value)
        metric.version = new_version
        metric.updated_at = datetime.utcnow()
        
        self.db.commit()
        self.db.refresh(metric)
        
        # Regenerate embedding
        self._generate_embedding(metric_id)
        
        return metric
    
    # ──────────────────────────────────────────────────────────────
    # 2. SEMANTIC SEARCH (VECTOR)
    # ──────────────────────────────────────────────────────────────
    
    def semantic_search(self, query: str, limit: int = 10) -> List[Dict]:
        """Search metrics by semantic meaning"""
        # Generate query embedding
        query_embedding = self.embeddings.embed_query(query)
        
        # Convert to pgvector format
        vector = Vector(query_embedding)
        
        # Perform vector similarity search
        results = self.db.query(
            Metric,
            MetricEmbedding.embedding.cosine_distance(vector).label('distance')
        ).join(
            MetricEmbedding,
            MetricEmbedding.metric_id == Metric.id
        ).order_by(
            'distance'
        ).limit(limit).all()
        
        return [
            {
                'metric_id': r.Metric.id,
                'name': r.Metric.name,
                'definition': r.Metric.definition,
                'similarity_score': 1 - r.distance,
                'dataset_id': r.Metric.dataset_id
            }
            for r in results
        ]
    
    # ──────────────────────────────────────────────────────────────
    # 3. LINEAGE TRACKING
    # ──────────────────────────────────────────────────────────────
    
    def track_lineage(self, source: Dict, target: Dict, transformation: str):
        """Track column-level lineage"""
        lineage = Lineage(
            id=str(uuid.uuid4()),
            source_type=source.get('type'),
            source_name=source.get('name'),
            source_column=source.get('column'),
            target_type=target.get('type'),
            target_name=target.get('name'),
            target_column=target.get('column'),
            transformation=transformation,
            lineage_graph=self._build_lineage_graph(source, target)
        )
        self.db.add(lineage)
        self.db.commit()
        return lineage
    
    def get_lineage(self, metric_id: str) -> Dict:
        """Get full lineage for a metric"""
        metric = self.db.query(Metric).filter(Metric.id == metric_id).first()
        if not metric:
            return {}
        
        lineage = self.db.query(Lineage).filter(
            Lineage.target_name == metric.name
        ).all()
        
        return {
            'metric': metric.name,
            'definition': metric.definition,
            'source': [
                {
                    'type': l.source_type,
                    'name': l.source_name,
                    'column': l.source_column,
                    'transformation': l.transformation
                }
                for l in lineage
            ]
        }
    
    # ──────────────────────────────────────────────────────────────
    # 4. PRIVATE HELPER METHODS
    # ──────────────────────────────────────────────────────────────
    
    def _generate_embedding(self, metric_id: str):
        """Generate and store vector embedding for a metric"""
        metric = self.db.query(Metric).filter(Metric.id == metric_id).first()
        if not metric:
            return
        
        # Combine name + definition for embedding
        text = f"{metric.name}: {metric.definition}"
        embedding = self.embeddings.embed_query(text)
        
        # Upsert embedding
        existing = self.db.query(MetricEmbedding).filter(
            MetricEmbedding.metric_id == metric_id
        ).first()
        
        if existing:
            existing.embedding = Vector(embedding)
            existing.updated_at = datetime.utcnow()
        else:
            metric_embedding = MetricEmbedding(
                metric_id=metric_id,
                embedding=Vector(embedding)
            )
            self.db.add(metric_embedding)
        
        self.db.commit()
    
    def _create_version(self, metric_id: str, version: str, definition: str, user_id: str):
        """Create version history record"""
        version_record = MetricVersion(
            id=str(uuid.uuid4()),
            metric_id=metric_id,
            version=version,
            definition=definition,
            changed_by=user_id,
            created_at=datetime.utcnow()
        )
        self.db.add(version_record)
        self.db.commit()
    
    def _bump_version(self, current_version: str) -> str:
        """Bump semantic version (v2.3.0 → v2.3.1)"""
        parts = current_version.split('.')
        if len(parts) == 3:
            parts[2] = str(int(parts[2]) + 1)
        return '.'.join(parts)
    
    def _build_lineage_graph(self, source: Dict, target: Dict) -> Dict:
        """Build lineage graph structure"""
        return {
            'nodes': [
                {'id': f"{source['type']}_{source['name']}", 'label': source['name'], 'type': source['type']},
                {'id': f"{target['type']}_{target['name']}", 'label': target['name'], 'type': target['type']}
            ],
            'edges': [
                {'from': f"{source['type']}_{source['name']}", 'to': f"{target['type']}_{target['name']}"}
            ]
        }
`} />
      </div>
    </div>
  );
}

const CodeBlock = ({ title, code, language }) => {
  const [copied, setCopied] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isLong = code.split('\n').length > 15;

  return (
    <div style={{ marginBottom: '40px', background: '#1E293B', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', overflow: 'hidden' }}>
      <div style={{ padding: '16px 20px', background: 'rgba(0,0,0,0.2)', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ color: '#F8FAFC', fontWeight: '600', fontSize: '16px' }}>{title}</span>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          {language && <span style={{ color: '#94A3B8', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.05em', background: 'rgba(255,255,255,0.05)', padding: '4px 8px', borderRadius: '4px' }}>{language}</span>}
          <button onClick={handleCopy} style={{ background: 'rgba(255,255,255,0.1)', border: 'none', color: '#CBD5E1', fontSize: '12px', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', transition: 'all 0.2s' }}>
            {copied ? (
              <>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#00BFA5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                <span style={{ color: '#00BFA5' }}>Copied!</span>
              </>
            ) : (
              <>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                Copy Code
              </>
            )}
          </button>
        </div>
      </div>
      <div style={{ position: 'relative' }}>
        <div style={{ padding: '20px', overflowX: 'auto', background: '#0D1117', maxHeight: expanded ? 'none' : '300px', overflowY: 'hidden', transition: 'max-height 0.3s ease' }}>
          <pre style={{ margin: 0, color: '#7EE7B8', fontSize: '13px', fontFamily: 'var(--font-mono, monospace)', lineHeight: '1.5' }}>
            {code}
          </pre>
        </div>
        {isLong && !expanded && (
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '100px', background: 'linear-gradient(to bottom, transparent, #0D1117)', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', paddingBottom: '20px' }}>
            <button onClick={() => setExpanded(true)} style={{ background: '#1E293B', border: '1px solid rgba(255,255,255,0.1)', color: '#00BFA5', padding: '8px 24px', borderRadius: '20px', fontSize: '13px', fontWeight: '600', cursor: 'pointer', boxShadow: '0 4px 12px rgba(0,0,0,0.5)', transition: 'all 0.2s', zIndex: 10 }}>
              Read More
            </button>
          </div>
        )}
        {isLong && expanded && (
          <div style={{ display: 'flex', justifyContent: 'center', background: '#0D1117', padding: '10px 0 20px' }}>
            <button onClick={() => setExpanded(false)} style={{ background: 'transparent', border: 'none', color: '#94A3B8', fontSize: '13px', fontWeight: '500', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="18 15 12 9 6 15"></polyline></svg>
              Show Less
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
