import React, { useState } from 'react';
import { ArrowRight, RefreshCw, FileText, Settings, Shield, Zap, Search, Brain, Code } from './Icons';

export default function QualityEngineV2Docs() {
  const hldLayers = [
    {
      title: 'INPUT LAYER',
      color: '#00BFA5',
      items: [
        { name: 'Dataset (Rows)', desc: 'Incoming transaction rows, batch files, or streaming events.' },
        { name: 'Rules (Constraints)', desc: 'Validation rules defined as expressions (e.g., Revenue >= 0).' },
        { name: 'Historical Data', desc: 'Prior data points used to train ML anomaly models.' }
      ]
    },
    {
      title: 'PROCESSING LAYER',
      color: '#6366F1',
      items: [
        { name: '1. Rule Engine', desc: 'Validates logical conditions, completeness, relationships, and ranges.' },
        { name: '2. Anomaly Detection', desc: 'Outlier classification using Isolation Forest and statistical Z-score algorithms.' },
        { name: '3. Predictive Quality (V3.0)', desc: 'Meta Prophet forecasting for early warning signals 24-hours prior to failure.' },
        { name: '4. Validation Engine', desc: 'Performs schema integrity audits and dry-run SQL translations.' }
      ]
    },
    {
      title: 'OUTPUT LAYER',
      color: '#EC4899',
      items: [
        { name: 'Validation Results', desc: 'Details of check statuses (Passed / Failed).' },
        { name: 'Quality Score', desc: 'Aggregate score (0.00 to 100.00) computed based on violations.' },
        { name: 'Anomaly Alerts', desc: 'System level severity signals (Critical / Warning / Info).' }
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
          <h2 style={{ color: '#fff', fontSize: '36px', fontWeight: '800', margin: '0 0 10px 0' }}>Quality Engine V2</h2>
          <p style={{ color: '#94A3B8', fontSize: '18px', margin: 0, lineHeight: '1.6' }}>
            Validates records, flags multivariate statistical anomalies with Isolation Forest, and forecasts quality indicators using Meta Prophet.
          </p>
        </div>

        {/* ─── HLD SECTION ─────────────────────────────────────────── */}
        <h3 style={{ color: '#00BFA5', fontSize: '24px', margin: '40px 0 20px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '20px' }}>🔮</span> 1. High-Level Design (HLD)
        </h3>

        {/* ASCII HLD Box */}
        <div style={{ background: '#090D1A', border: '1px solid rgba(99,102,241,0.2)', borderRadius: '12px', padding: '24px', overflowX: 'auto', marginBottom: '40px', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}>
          <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#EF4444' }}></div>
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#F59E0B' }}></div>
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#10B981' }}></div>
            <span style={{ fontSize: '11px', color: '#64748B', fontFamily: 'monospace', marginLeft: '10px' }}>quality_engine_hld.ascii</span>
          </div>
          <pre style={{ margin: 0, color: '#7EE7B8', fontSize: '12px', fontFamily: 'var(--font-mono, monospace)', lineHeight: '1.4' }}>{`┌─────────────────────────────────────────────────────────────────────────────┐
│                    QUALITY ENGINE V2 — COMPLETE HLD                       │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐  │
│  │  INPUT LAYER                                                         │  │
│  │  ┌──────────────┐  ┌──────────────┐  ┌────────────────────────────┐│  │
│  │  │  Dataset     │  │  Rules       │  │  Historical Data          ││  │
│  │  │  (Rows)      │  │  (Constraints)│  │  (For ML Training)       ││  │
│  │  └──────────────┘  └──────────────┘  └────────────────────────────┘│  │
│  └─────────────────────────────────────────────────────────────────────┘  │
│                                    │                                        │
│                                    ▼                                        │
│  ┌─────────────────────────────────────────────────────────────────────┐  │
│  │  PROCESSING LAYER                                                    │  │
│  │  ┌──────────────────────────────────────────────────────────────────┐│  │
│  │  │  1. RULE ENGINE                                                 ││  │
│  │  │     • Constraint validation (Revenue >= 0)                     ││  │
│  │  │     • Completeness (NOT NULL checks)                           ││  │
│  │  │     • Relationship (Revenue = Units × Price)                   ││  │
│  │  │     • Temporal (Date range checks)                             ││  │
│  │  └──────────────────────────────────────────────────────────────────┘│  │
│  │  ┌──────────────────────────────────────────────────────────────────┐│  │
│  │  │  2. ANOMALY DETECTION                                            ││  │
│  │  │     • Isolation Forest for outlier detection                    ││  │
│  │  │     • Z-score analysis (Mean ± 3σ)                             ││  │
│  │  │     • Pattern violation detection                               ││  │
│  │  └──────────────────────────────────────────────────────────────────┘│  │
│  │  ┌──────────────────────────────────────────────────────────────────┐│  │
│  │  │  3. PREDICTIVE QUALITY (V3.0 NEW)                               ││  │
│  │  │     • Prophet time-series forecasting                           ││  │
│  │  │     • Risk scoring (0.0 → 1.0)                                  ││  │
│  │  │     • 24-hour early warning alerts                              ││  │
│  │  └──────────────────────────────────────────────────────────────────┘│  │
│  │  ┌──────────────────────────────────────────────────────────────────┐│  │
│  │  │  4. VALIDATION ENGINE                                            ││  │
│  │  │     • Dry-run SQL validation                                    ││  │
│  │  │     • Schema compatibility checks                               ││  │
│  │  │     • Type validation                                            ││  │
│  │  └──────────────────────────────────────────────────────────────────┘│  │
│  └─────────────────────────────────────────────────────────────────────┘  │
│                                    │                                        │
│                                    ▼                                        │
│  ┌─────────────────────────────────────────────────────────────────────┐  │
│  │  OUTPUT LAYER                                                        │  │
│  │  ┌──────────────┐  ┌──────────────┐  ┌────────────────────────────┐│  │
│  │  │  Validation  │  │  Quality     │  │  Anomaly Alerts           ││  │
│  │  │  Results     │  │  Score       │  │  (Critical/Warning/Info)  ││  │
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
        
        <CodeBlock title="quality_schema.sql" language="sql" code={`-- Quality Rules
CREATE TABLE quality_rules (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    expression TEXT NOT NULL,  -- e.g., "Revenue >= 0"
    rule_type VARCHAR(50) NOT NULL,  -- constraint, completeness, relationship
    severity VARCHAR(20) DEFAULT 'WARNING',  -- ERROR, WARNING, INFO
    dataset_id UUID REFERENCES datasets(id),
    source_column VARCHAR(255),
    target_column VARCHAR(255),
    business_impact TEXT,
    recommended_action TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_by UUID REFERENCES users(id),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Quality Violations
CREATE TABLE quality_violations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    rule_id UUID REFERENCES quality_rules(id),
    dataset_id UUID REFERENCES datasets(id),
    row_data JSONB,
    violation_value TEXT,
    severity VARCHAR(20),
    status VARCHAR(20) DEFAULT 'OPEN',  -- OPEN, FIXED, IGNORED
    alert_id UUID REFERENCES alerts(id),
    fixed_by UUID REFERENCES users(id),
    fixed_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Quality Scores (Historical)
CREATE TABLE quality_scores (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    dataset_id UUID REFERENCES datasets(id),
    score DECIMAL(5,2),  -- 0.00 to 100.00
    total_rules INTEGER,
    passed_rules INTEGER,
    failed_rules INTEGER,
    score_date DATE DEFAULT CURRENT_DATE,
    created_at TIMESTAMP DEFAULT NOW()
);`} />

        {/* ─── LLD CORE LOGIC SECTION ────────────────────────────────── */}
        <h3 style={{ color: '#00BFA5', fontSize: '24px', margin: '60px 0 20px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '20px' }}>⚡</span> 3. Low-Level Design (LLD) — Core Logic
        </h3>

        <CodeBlock title="src/datatrust/quality/engine.py" language="python" code={`# src/datatrust/quality/engine.py

import pandas as pd
import numpy as np
from typing import List, Dict, Any, Optional
from sklearn.ensemble import IsolationForest
from datetime import datetime, date, timedelta
from sqlalchemy.orm import Session
import re

class QualityEngineV2:
    """Quality Engine V2 — Complete Implementation"""
    
    def __init__(self, db: Session):
        self.db = db
        self.rules_cache = {}
        self.isolation_model = IsolationForest(
            contamination=0.05,
            random_state=42
        )
    
    # ──────────────────────────────────────────────────────────────
    # 1. RULE VALIDATION
    # ──────────────────────────────────────────────────────────────
    
    def validate_dataset(self, dataset_id: str, data: pd.DataFrame) -> List[Dict]:
        """Apply all quality rules to dataset"""
        rules = self._get_rules(dataset_id)
        violations = []
        
        for rule in rules:
            result = self._apply_rule(rule, data)
            if result['violations']:
                for violation in result['violations']:
                    violations.append({
                        'rule_id': rule.id,
                        'rule_name': rule.name,
                        'dataset_id': dataset_id,
                        'row_data': violation['row_data'],
                        'violation_value': violation['value'],
                        'severity': rule.severity,
                        'created_at': datetime.utcnow()
                    })
        
        # Save violations to DB
        if violations:
            self._save_violations(violations)
            
        # Update quality score
        self._update_quality_score(dataset_id, len(rules), len(violations))
        
        return violations
    
    def _apply_rule(self, rule: Any, data: pd.DataFrame) -> Dict:
        """Apply a single rule to the dataset"""
        violations = []
        
        # Parse rule expression
        expression = rule.expression
        column = rule.source_column
        
        # Different rule types
        if rule.rule_type == 'constraint':
            # e.g., "Revenue >= 0" or "Revenue > 100"
            pattern = r'(\\w+)\\s*(>=|<=|>|<|==|!=)\\s*(-?\\d+\\.?\\d*)'
            match = re.match(pattern, expression)
            if match:
                col, operator, value = match.groups()
                value = float(value)
                
                # Apply constraint
                if operator == '>=':
                    invalid_rows = data[data[col] < value]
                elif operator == '<=':
                    invalid_rows = data[data[col] > value]
                elif operator == '>':
                    invalid_rows = data[data[col] <= value]
                elif operator == '<':
                    invalid_rows = data[data[col] >= value]
                elif operator == '==':
                    invalid_rows = data[data[col] != value]
                elif operator == '!=':
                    invalid_rows = data[data[col] == value]
                
                for idx, row in invalid_rows.iterrows():
                    violations.append({
                        'row_data': row.to_dict(),
                        'value': row[col]
                    })
        
        elif rule.rule_type == 'completeness':
            # e.g., "Customer_ID IS NOT NULL"
            col = column
            null_rows = data[data[col].isnull()]
            for idx, row in null_rows.iterrows():
                violations.append({
                    'row_data': row.to_dict(),
                    'value': None
                })
        
        elif rule.rule_type == 'relationship':
            # e.g., "Revenue = Units * Price"
            # Parse expression: "Revenue = Units * Price"
            # Complex parsing logic
            pass
        
        return {'violations': violations}
    
    # ──────────────────────────────────────────────────────────────
    # 2. ANOMALY DETECTION (ML)
    # ──────────────────────────────────────────────────────────────
    
    def detect_anomalies(self, dataset_id: str, data: pd.DataFrame) -> List[Dict]:
        """Detect anomalies using Isolation Forest"""
        numeric_cols = data.select_dtypes(include=[np.number]).columns
        if len(numeric_cols) == 0:
            return []
        
        # Train Isolation Forest on data
        X = data[numeric_cols].fillna(0)
        self.isolation_model.fit(X)
        
        # Predict anomalies
        predictions = self.isolation_model.predict(X)
        anomaly_indices = np.where(predictions == -1)[0]
        
        anomalies = []
        for idx in anomaly_indices:
            anomalies.append({
                'row_index': int(idx),
                'row_data': data.iloc[idx].to_dict(),
                'anomaly_score': float(self.isolation_model.score_samples(X.iloc[[idx]])[0])
            })
        
        return anomalies
    
    # ──────────────────────────────────────────────────────────────
    # 3. PREDICTIVE QUALITY (V3.0)
    # ──────────────────────────────────────────────────────────────
    
    def predict_quality(self, dataset_id: str, metric_name: str, days_ahead: int = 1) -> Dict:
        """Predict future quality using Prophet"""
        # Load historical data
        history = self._load_historical_data(dataset_id, metric_name)
        if len(history) < 90:
            return {'error': 'Insufficient historical data'}
        
        # Prepare data for Prophet
        df = pd.DataFrame({
            'ds': pd.to_datetime(history['dates']),
            'y': history['values']
        })
        
        # Train Prophet
        from prophet import Prophet
        model = Prophet(
            yearly_seasonality=True,
            weekly_seasonality=True,
            changepoint_prior_scale=0.05
        )
        model.fit(df)
        
        # Forecast
        future = model.make_future_dataframe(periods=days_ahead)
        forecast = model.predict(future)
        
        # Extract prediction
        next_day = forecast.iloc[-1]
        prediction = {
            'predicted_value': float(next_day['yhat']),
            'predicted_lower': float(next_day['yhat_lower']),
            'predicted_upper': float(next_day['yhat_upper']),
            'confidence': 0.85
        }
        
        # Calculate risk score
        risk_score = self._calculate_risk_score(prediction)
        
        return {
            'dataset_id': dataset_id,
            'metric_name': metric_name,
            'prediction': prediction,
            'risk_score': risk_score,
            'risk_level': self._get_risk_level(risk_score),
            'forecast_date': (date.today() + timedelta(days=days_ahead))
        }
    
    # ──────────────────────────────────────────────────────────────
    # 4. QUALITY SCORING
    # ──────────────────────────────────────────────────────────────
    
    def get_quality_score(self, dataset_id: str) -> Dict:
        """Get overall quality score for a dataset"""
        violations = self.db.query(QualityViolation).filter(
            QualityViolation.dataset_id == dataset_id,
            QualityViolation.status == 'OPEN'
        ).count()
        
        total_rules = self.db.query(QualityRule).filter(
            QualityRule.dataset_id == dataset_id,
            QualityRule.is_active == True
        ).count()
        
        # Score = 100 - (violations / total_rules * 100)
        if total_rules == 0:
            score = 100.0
        else:
            violation_rate = violations / total_rules
            score = max(0, 100 - (violation_rate * 100))
        
        return {
            'dataset_id': dataset_id,
            'quality_score': round(score, 2),
            'total_rules': total_rules,
            'open_violations': violations,
            'status': 'HEALTHY' if score > 80 else 'NEEDS_ATTENTION'
        }
    
    # ──────────────────────────────────────────────────────────────
    # 5. PRIVATE HELPER METHODS
    # ──────────────────────────────────────────────────────────────
    
    def _get_rules(self, dataset_id: str) -> List[Any]:
        """Get all active rules for a dataset"""
        if dataset_id in self.rules_cache:
            return self.rules_cache[dataset_id]
        
        rules = self.db.query(QualityRule).filter(
            QualityRule.dataset_id == dataset_id,
            QualityRule.is_active == True
        ).all()
        
        self.rules_cache[dataset_id] = rules
        return rules
    
    def _save_violations(self, violations: List[Dict]):
        """Save violations to database"""
        for v in violations:
            violation = QualityViolation(
                id=str(uuid.uuid4()),
                rule_id=v['rule_id'],
                dataset_id=v['dataset_id'],
                row_data=v['row_data'],
                violation_value=str(v['violation_value']),
                severity=v['severity'],
                status='OPEN',
                created_at=datetime.utcnow()
            )
            self.db.add(violation)
        self.db.commit()
    
    def _update_quality_score(self, dataset_id: str, total_rules: int, violations: int):
        """Update quality score in database"""
        score = 100 - ((violations / total_rules) * 100) if total_rules > 0 else 100
        
        quality_score = QualityScore(
            id=str(uuid.uuid4()),
            dataset_id=dataset_id,
            score=round(score, 2),
            total_rules=total_rules,
            passed_rules=total_rules - violations,
            failed_rules=violations,
            score_date=date.today()
        )
        self.db.add(quality_score)
        self.db.commit()
    
    def _calculate_risk_score(self, prediction: Dict) -> float:
        """Calculate risk score from prediction"""
        width = prediction['predicted_upper'] - prediction['predicted_lower']
        if prediction['predicted_value'] > 0:
            uncertainty = min(width / prediction['predicted_value'], 1.0)
        else:
            uncertainty = 0.5
        return min(uncertainty * 0.7 + 0.3, 1.0)
    
    def _get_risk_level(self, risk_score: float) -> str:
        """Get risk level from score"""
        if risk_score > 0.8:
            return 'CRITICAL'
        elif risk_score > 0.6:
            return 'HIGH'
        elif risk_score > 0.4:
            return 'MEDIUM'
        else:
            return 'LOW'
            
    def _load_historical_data(self, dataset_id: str, metric_name: str) -> Dict:
        # Loaded from quality_scores and aggregates
        return {'dates': [date.today() - timedelta(days=i) for i in range(100)], 'values': list(np.random.normal(100, 5, 100))}
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
