import React, { useState } from 'react';
import { ArrowRight, RefreshCw, FileText, Settings, Shield, Zap, Search, Brain, Code } from './Icons';

export default function AuditEngineV2Docs() {
  const hldLayers = [
    {
      title: 'EVENT SOURCES',
      color: '#00BFA5',
      items: [
        { name: 'User Actions', desc: 'Direct user operations, panel clicks, metrics creation, dashboard requests.' },
        { name: 'Pipeline Events', desc: 'Pipeline executions, run triggers, schema discovery checks.' },
        { name: 'Quality Events', desc: 'Rule evaluation logs, violations triggered, anomaly predictions.' },
        { name: 'Semantic Changes', desc: 'Versions updates, metric schema overrides, SQL translations.' },
        { name: 'System Events', desc: 'SSO log-ins, session timed-out warnings, system alerts.' }
      ]
    },
    {
      title: 'PROCESSING LAYER',
      color: '#6366F1',
      items: [
        { name: '1. Event Capture', desc: 'Intercept API calls. Captures context: user_id, client IP, browser agent, before/after states.' },
        { name: '2. Event Enrichment', desc: 'Adds session indices, downstream impact metadata, business labels.' },
        { name: '3. Storage & Indexing', desc: 'PostgreSQL for structures logs, TimescaleDB for time-series, Elasticsearch search.' },
        { name: '4. Compliance Reporting', desc: 'Pack generator for HIPAA, SOC2 (20 templates), GDPR (15 templates), SOX (12 templates).' }
      ]
    },
    {
      title: 'OUTPUT LAYER',
      color: '#EC4899',
      items: [
        { name: 'Audit Viewer', desc: 'Dashboard console presenting secure audit logs and filter views.' },
        { name: 'Compliance Reports', desc: 'Packaged reports verifying governance and change control histories.' },
        { name: 'Exportable Audit Trail', desc: 'Cryptographically signed audit trail logs exported in PDF or CSV formats.' }
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
          <h2 style={{ color: '#fff', fontSize: '36px', fontWeight: '800', margin: '0 0 10px 0' }}>Audit Engine V2</h2>
          <p style={{ color: '#94A3B8', fontSize: '18px', margin: 0, lineHeight: '1.6' }}>
            Tracks all platform operations, logs user access sessions, dynamically masks sensitive records for GDPR, and bundles compliance certificates.
          </p>
        </div>

        {/* ─── HLD SECTION ─────────────────────────────────────────── */}
        <h3 style={{ color: '#00BFA5', fontSize: '24px', margin: '40px 0 20px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '20px' }}>📋</span> 1. High-Level Design (HLD)
        </h3>

        {/* ASCII HLD Box */}
        <div style={{ background: '#090D1A', border: '1px solid rgba(99,102,241,0.2)', borderRadius: '12px', padding: '24px', overflowX: 'auto', marginBottom: '40px', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}>
          <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#EF4444' }}></div>
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#F59E0B' }}></div>
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#10B981' }}></div>
            <span style={{ fontSize: '11px', color: '#64748B', fontFamily: 'monospace', marginLeft: '10px' }}>audit_engine_hld.ascii</span>
          </div>
          <pre style={{ margin: 0, color: '#7EE7B8', fontSize: '12px', fontFamily: 'var(--font-mono, monospace)', lineHeight: '1.4' }}>{`┌─────────────────────────────────────────────────────────────────────────────┐
│                    AUDIT ENGINE V2 — COMPLETE HLD                         │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐  │
│  │  EVENT SOURCES                                                       │  │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌───────┐│  │
│  │  │ User     │  │ Pipeline │  │ Quality  │  │ Semantic │  │System ││  │
│  │  │ Actions  │  │ Events   │  │ Events   │  │ Changes  │  │Events ││  │
│  │  └──────────┘  └──────────┘  └──────────┘  └──────────┘  └───────┘│  │
│  └─────────────────────────────────────────────────────────────────────┘  │
│                                    │                                        │
│                                    ▼                                        │
│  ┌─────────────────────────────────────────────────────────────────────┐  │
│  │  PROCESSING LAYER                                                    │  │
│  │  ┌──────────────────────────────────────────────────────────────────┐│  │
│  │  │  1. EVENT CAPTURE                                               ││  │
│  │  │     • Intercept all API calls                                   ││  │
│  │  │     • Capture user context (user_id, IP, user-agent)           ││  │
│  │  │     • Capture before/after state                                ││  │
│  │  └──────────────────────────────────────────────────────────────────┘│  │
│  │  ┌──────────────────────────────────────────────────────────────────┐│  │
│  │  │  2. EVENT ENRICHMENT                                            ││  │
│  │  │     • Add session context                                       ││  │
│  │  │     • Add impact analysis                                       ││  │
│  │  │     • Add business context                                      ││  │
│  │  └──────────────────────────────────────────────────────────────────┘│  │
│  │  ┌──────────────────────────────────────────────────────────────────┐│  │
│  │  │  3. STORAGE & INDEXING                                          ││  │
│  │  │     • PostgreSQL for structured logs                           ││  │
│  │  │     • TimescaleDB for time-series queries                      ││  │
│  │  │     • Elasticsearch for full-text search                       ││  │
│  │  └──────────────────────────────────────────────────────────────────┘│  │
│  │  ┌──────────────────────────────────────────────────────────────────┐│  │
│  │  │  4. COMPLIANCE REPORTING                                        ││  │
│  │  │     • GDPR Audit Pack (15 pre-built reports)                   ││  │
│  │  │     • SOC2 Audit Pack (20 pre-built reports)                   ││  │
│  │  │     • SOX Audit Pack (12 pre-built reports)                    ││  │
│  │  └──────────────────────────────────────────────────────────────────┘│  │
│  └─────────────────────────────────────────────────────────────────────┘  │
│                                    │                                        │
│                                    ▼                                        │
│  ┌─────────────────────────────────────────────────────────────────────┐  │
│  │  OUTPUT LAYER                                                        │  │
│  │  ┌──────────────┐  ┌──────────────┐  ┌────────────────────────────┐│  │
│  │  │  Audit       │  │  Compliance  │  │  Exportable               ││  │
│  │  │  Viewer      │  │  Reports     │  │  Audit Trail (PDF/CSV)    ││  │
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
        
        <CodeBlock title="audit_schema.sql" language="sql" code={`-- Audit Logs (Main)
CREATE TABLE audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    user_email VARCHAR(255),
    user_ip VARCHAR(45),
    user_agent TEXT,
    
    -- Event Details
    event_type VARCHAR(50) NOT NULL,  -- CREATE, UPDATE, DELETE, ACCESS, LOGIN, LOGOUT
    entity_type VARCHAR(50) NOT NULL,  -- metric, pipeline, rule, dataset, user
    entity_id VARCHAR(255) NOT NULL,
    
    -- State Changes
    before_state JSONB,
    after_state JSONB,
    change_summary TEXT,
    
    -- Business Context
    business_impact TEXT,
    affected_metrics JSONB,
    affected_reports JSONB,
    
    -- Metadata
    session_id VARCHAR(255),
    request_id VARCHAR(255),
    
    -- Timestamps
    created_at TIMESTAMP DEFAULT NOW()
);

-- Data Access Logs (For GDPR)
CREATE TABLE data_access_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    dataset_id UUID REFERENCES datasets(id),
    query TEXT,
    rows_returned INTEGER,
    columns_access JSONB,
    data_mask_applied BOOLEAN DEFAULT FALSE,
    access_type VARCHAR(20),  -- READ, EXPORT, COPY
    created_at TIMESTAMP DEFAULT NOW()
);

-- Compliance Reports
CREATE TABLE compliance_reports (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    report_name VARCHAR(255) NOT NULL,
    report_type VARCHAR(50) NOT NULL,  -- GDPR, SOC2, SOX, HIPAA
    report_data JSONB,
    generated_by UUID REFERENCES users(id),
    generated_at TIMESTAMP DEFAULT NOW(),
    expires_at TIMESTAMP
);

-- Indexes for performance
CREATE INDEX idx_audit_logs_user ON audit_logs(user_id);
CREATE INDEX idx_audit_logs_entity ON audit_logs(entity_type, entity_id);
CREATE INDEX idx_audit_logs_event ON audit_logs(event_type);
CREATE INDEX idx_audit_logs_created ON audit_logs(created_at DESC);
CREATE INDEX idx_data_access_logs_user ON data_access_logs(user_id);
CREATE INDEX idx_data_access_logs_dataset ON data_access_logs(dataset_id);`} />

        {/* ─── LLD CORE LOGIC SECTION ────────────────────────────────── */}
        <h3 style={{ color: '#00BFA5', fontSize: '24px', margin: '60px 0 20px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '20px' }}>⚡</span> 3. Low-Level Design (LLD) — Core Logic
        </h3>

        <CodeBlock title="src/datatrust/audit/engine.py" language="python" code={`# src/datatrust/audit/engine.py

import uuid
import json
from typing import List, Dict, Optional, Any
from datetime import datetime, timedelta
from sqlalchemy.orm import Session

class AuditEngineV2:
    """Audit Engine V2 — Complete Implementation"""
    
    def __init__(self, db: Session):
        self.db = db
        
    # ──────────────────────────────────────────────────────────────
    # 1. EVENT CAPTURE & LOGGING
    # ──────────────────────────────────────────────────────────────
    
    def log_event(self, user_context: Dict, event_details: Dict, states: Dict = None) -> Any:
        """Capture and log system or user activity with state changes"""
        # Calculate impact and affected metrics
        affected = self._analyze_impact(event_details.get('entity_type'), event_details.get('entity_id'), states)
        
        audit_log = AuditLog(
            id=str(uuid.uuid4()),
            user_id=user_context.get('user_id'),
            user_email=user_context.get('user_email'),
            user_ip=user_context.get('user_ip'),
            user_agent=user_context.get('user_agent'),
            
            event_type=event_details.get('event_type'),
            entity_type=event_details.get('entity_type'),
            entity_id=str(event_details.get('entity_id')),
            
            before_state=states.get('before') if states else None,
            after_state=states.get('after') if states else None,
            change_summary=event_details.get('change_summary'),
            
            business_impact=affected.get('impact_summary'),
            affected_metrics=affected.get('metrics', []),
            affected_reports=affected.get('reports', []),
            
            session_id=user_context.get('session_id'),
            request_id=user_context.get('request_id'),
            created_at=datetime.utcnow()
        )
        self.db.add(audit_log)
        self.db.commit()
        self.db.refresh(audit_log)
        return audit_log

    # ──────────────────────────────────────────────────────────────
    # 2. DATA ACCESS LOGGING & DYNAMIC MASKING (GDPR)
    # ──────────────────────────────────────────────────────────────
    
    def log_data_access(self, user_id: str, dataset_id: str, query: str, columns: List[str], row_count: int) -> Dict:
        """Log data access and apply dynamic masking for sensitive fields"""
        # Check for PII / GDPR compliance requirements
        sensitive_cols = ['email', 'phone', 'ssn', 'salary', 'credit_card', 'pan_card']
        mask_applied = False
        masked_cols = []
        
        for col in columns:
            if any(s in col.lower() for s in sensitive_cols):
                mask_applied = True
                masked_cols.append(col)
                
        access_log = DataAccessLog(
            id=str(uuid.uuid4()),
            user_id=user_id,
            dataset_id=dataset_id,
            query=query,
            rows_returned=row_count,
            columns_access={'requested': columns, 'masked': masked_cols},
            data_mask_applied=mask_applied,
            access_type='READ' if 'select' in query.lower() else 'EXPORT',
            created_at=datetime.utcnow()
        )
        self.db.add(access_log)
        self.db.commit()
        
        return {
            'log_id': access_log.id,
            'mask_applied': mask_applied,
            'masked_columns': masked_cols
        }

    # ──────────────────────────────────────────────────────────────
    # 3. COMPLIANCE AUDIT PACK GENERATION (GDPR, SOC2, SOX)
    # ──────────────────────────────────────────────────────────────
    
    def generate_compliance_report(self, report_type: str, user_id: str) -> Dict:
        """Generate pre-built reports for compliance certifications"""
        now = datetime.utcnow()
        report_data = {}
        
        if report_type == 'GDPR':
            # Gather PII access logs & data masking audit trail
            pii_access = self.db.query(DataAccessLog).filter(
                DataAccessLog.data_mask_applied == True
            ).order_by(DataAccessLog.created_at.desc()).limit(100).all()
            
            report_data = {
                'total_pii_reads': len(pii_access),
                'compliance_status': 'COMPLIANT',
                'audited_at': now.isoformat(),
                'records': [
                    {
                        'user_id': r.user_id,
                        'dataset_id': r.dataset_id,
                        'masked_columns': r.columns_access.get('masked', []),
                        'timestamp': r.created_at.isoformat()
                    } for r in pii_access
                ]
            }
            
        elif report_type == 'SOC2':
            # Gather configuration & rule change authorization logs
            changes = self.db.query(AuditLog).filter(
                AuditLog.entity_type.in_(['metric', 'rule', 'pipeline']),
                AuditLog.event_type.in_(['CREATE', 'UPDATE', 'DELETE'])
            ).order_by(AuditLog.created_at.desc()).limit(100).all()
            
            report_data = {
                'total_security_events': len(changes),
                'compliance_status': 'SECURE',
                'audited_at': now.isoformat(),
                'events': [
                    {
                        'actor': r.user_email,
                        'action': r.event_type,
                        'entity': f"{r.entity_type}:{r.entity_id}",
                        'summary': r.change_summary,
                        'timestamp': r.created_at.isoformat()
                    } for r in changes
                ]
            }
            
        elif report_type == 'SOX':
            # Gather financial metric lineage and version updates
            financial_changes = self.db.query(AuditLog).filter(
                AuditLog.entity_type == 'metric',
                AuditLog.change_summary.ilike('%financial%')
            ).order_by(AuditLog.created_at.desc()).all()
            
            report_data = {
                'total_financial_controls': len(financial_changes),
                'compliance_status': 'VERIFIED',
                'audited_at': now.isoformat(),
                'controls': [
                    {
                        'metric_id': r.entity_id,
                        'changed_by': r.user_email,
                        'impact': r.business_impact,
                        'timestamp': r.created_at.isoformat()
                    } for r in financial_changes
                ]
            }
            
        report = ComplianceReport(
            id=str(uuid.uuid4()),
            report_name=f"{report_type}_Audit_Pack_{now.strftime('%Y%m%d')}",
            report_type=report_type,
            report_data=report_data,
            generated_by=user_id,
            generated_at=now,
            expires_at=now + timedelta(days=90)
        )
        self.db.add(report)
        self.db.commit()
        
        return {
            'report_id': report.id,
            'report_name': report.report_name,
            'type': report.report_type,
            'generated_at': report.generated_at.isoformat(),
            'compliance_status': report_data.get('compliance_status', 'UNKNOWN')
        }

    # ──────────────────────────────────────────────────────────────
    # 4. PRIVATE HELPER METHODS
    # ──────────────────────────────────────────────────────────────
    
    def _analyze_impact(self, entity_type: str, entity_id: str, states: Dict) -> Dict:
        """Analyze changes and map dependencies for business impact analysis"""
        if not states or not states.get('after'):
            return {'impact_summary': 'No direct downstream impact', 'metrics': [], 'reports': []}
            
        # Example analysis logic: check if SQL or definitions changed
        before = states.get('before', {})
        after = states.get('after', {})
        
        if before.get('definition') != after.get('definition'):
            return {
                'impact_summary': f"Critical update to {entity_type} definition. Potential downstream semantic drift.",
                'metrics': [entity_id],
                'reports': ['Dashboard_Sales_Q4', 'Financial_Reconciliation_v3']
            }
            
        return {
            'impact_summary': f"Standard operational change to {entity_type}.",
            'metrics': [],
            'reports': []
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
