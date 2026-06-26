import React from 'react';

const hldFlows = [
  {
    title: '1.1 System Architecture',
    color: '#00BFA5',
    steps: [
      { title: 'EVENT SOURCES: Triggers', items: ['Quality Engine', 'Pipeline Engine', 'Approval Engine', 'Audit Engine', 'User Actions'] },
      { title: 'ALERT PROCESSOR: Logic Engine', items: ['1. Severity Classification (Critical/Warning/Info)', '2. Recipient Resolution', '3. Message Translation', '4. Channel Selection'] },
      { title: 'CHANNEL DELIVERY: Notification Routing', items: ['Slack Webhook', 'Teams Webhook', 'Email (SMTP/SendGrid)', 'SMS (Twilio)', 'In-App Dashboard'] },
      { title: 'AUDIT & ESCALATION: Governance', items: ['Log every alert to audit_logs', 'Track user acknowledgment', 'Escalate if SLA is breached'] }
    ]
  },
  {
    title: '1.2 Severity → Channel Mapping',
    color: '#F59E0B',
    steps: [
      { title: 'CRITICAL: Immediate Action Required', items: ['Channels: Slack, Teams, Email, SMS, Dashboard', 'Delivery: Immediate', 'SLA: Acknowledge within 15 mins', 'Escalation: Every 15 mins'] },
      { title: 'WARNING: Attention Needed', items: ['Channels: Slack, Email, Dashboard', 'Delivery: Immediate', 'SLA: Acknowledge within 60 mins', 'Escalation: Every 60 mins'] },
      { title: 'INFO: For Record Keeping', items: ['Channels: Dashboard Only', 'Delivery: Passive', 'SLA: No Urgency', 'Escalation: None'] }
    ]
  },
  {
    title: '1.3 Alert Flow — Sequence',
    color: '#6366F1',
    steps: [
      { title: '1. ANOMALY DETECTED', items: ['Quality Engine detects an issue', 'Sends payload to Alert Engine'] },
      { title: '2. ROUTING & SEVERITY', items: ['Alert Engine determines Severity', 'Channel Router selects appropriate channels'] },
      { title: '3. NOTIFICATION DISPATCH', items: ['Dispatched to Slack, Teams, Email, SMS', 'Simultaneously logged to Audit Engine'] },
      { title: '4. USER ACTION & RESOLUTION', items: ['User Acknowledges or Resolves the issue', 'Actions are logged to Audit Engine for compliance'] }
    ]
  }
];

export default function NotificationSystemDocs() {
  return (
    <div style={{ padding: '60px 0', background: '#0F172A', color: '#CBD5E1' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 20px' }}>
        <h2 style={{ color: '#fff', fontSize: '32px', marginBottom: '40px' }}>Notification System — Complete HLD + LLD</h2>
        
        <h3 style={{ color: '#00BFA5', fontSize: '24px', marginBottom: '20px' }}>1. HIGH-LEVEL DESIGN (HLD)</h3>

        {/* ASCII HLD Box */}
        <div style={{ background: '#090D1A', border: '1px solid rgba(0,191,165,0.2)', borderRadius: '12px', padding: '24px', overflowX: 'auto', marginBottom: '40px', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}>
          <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#EF4444' }}></div>
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#F59E0B' }}></div>
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#10B981' }}></div>
            <span style={{ fontSize: '11px', color: '#64748B', fontFamily: 'monospace', marginLeft: '10px' }}>alert_system_hld.ascii</span>
          </div>
          <pre style={{ margin: 0, color: '#00BFA5', fontSize: '12px', fontFamily: 'var(--font-mono, monospace)', lineHeight: '1.4' }}>{`┌─────────────────────────────────────────────────────────────────────────────┐
│                 NOTIFICATION SYSTEM & ALERT ROUTER — HLD                   │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌───────────────────────────────────────────────────────────────────────┐  │
│  │  EVENT SOURCES (Triggers)                                             │  │
│  │  • Quality Engine   • Pipeline Engine   • Approvals   • Audit Engine  │  │
│  └───────────────────────────────────────────────────────────────────────┘  │
│                                      │                                      │
│                                      ▼                                      │
│  ┌───────────────────────────────────────────────────────────────────────┐  │
│  │  ALERT PROCESSOR & ROUTING ENGINE                                     │  │
│  │  ┌──────────────────────────────────────────────────────────────────┐ │  │
│  │  │  1. Severity Classifier (Critical / Warning / Info)              │ │  │
│  │  ├──────────────────────────────────────────────────────────────────┤ │  │
│  │  │  2. Dynamic Recipient Resolution (Ownership-based lookup)        │ │  │
│  │  ├──────────────────────────────────────────────────────────────────┤ │  │
│  │  │  3. Template Translation Engine (Markdown formatting)            │ │  │
│  │  ├──────────────────────────────────────────────────────────────────┤ │  │
│  │  │  4. Delivery Channel Selection (Multi-channel dispatch)          │ │  │
│  │  └──────────────────────────────────────────────────────────────────┘ │  │
│  └───────────────────────────────────────────────────────────────────────┘  │
│                                      │                                      │
│                                      ▼                                      │
│  ┌───────────────────────────────────────────────────────────────────────┐  │
│  │  CHANNEL DELIVERY LAYER                                               │  │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐│  │
│  │  │ Slack        │  │ Teams        │  │ Email        │  │ SMS          ││  │
│  │  │ (Webhooks)   │  │ (Webhooks)   │  │ (SMTP/Grid)  │  │ (Twilio)     ││  │
│  │  └──────────────┘  └──────────────┘  └──────────────┘  └──────────────┘│  │
│  │  • In-App Live Dashboard Sync (WebSockets)                           │  │
│  └───────────────────────────────────────────────────────────────────────┘  │
│                                      │                                      │
│                                      ▼                                      │
│  ┌───────────────────────────────────────────────────────────────────────┐  │
│  │  AUDITING & ESCALATION CONTROL                                         │  │
│  │  • Audit log insertion  • User acknowledgment tracking  • Escalations │  │
│  └───────────────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────────────┘`}</pre>
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '80px', marginBottom: '60px' }}>
          {hldFlows.map((flow, idx) => (
            <div key={idx} className="scroll-reveal fade-up">
              <div style={{ marginBottom: '32px' }}>
                <h3 style={{ color: flow.color, fontSize: '24px', marginBottom: '12px' }}>{flow.title}</h3>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
                {flow.steps.map((step, i) => (
                  <React.Fragment key={i}>
                    <div style={{ width: '100%', background: '#1E293B', border: `1px solid ${flow.color}40`, borderRadius: '16px', padding: '24px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', position: 'relative', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.2)' }}>
                      <div style={{ position: 'absolute', top: 0, left: 0, width: '4px', height: '100%', background: flow.color }}></div>
                      
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                        <span style={{ fontSize: '13px', fontWeight: '800', color: flow.color, background: `${flow.color}15`, padding: '6px 10px', borderRadius: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{step.title.split(':')[0]}</span>
                        {step.title.includes(':') && (
                          <h4 style={{ fontSize: '16px', fontWeight: '700', color: '#F8FAFC', margin: 0 }}>{step.title.split(':')[1].trim()}</h4>
                        )}
                      </div>

                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                        {step.items.map((item, j) => (
                          <div key={j} style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.05)', padding: '10px 18px', borderRadius: '8px', fontSize: '14px', color: '#CBD5E1', fontWeight: '500' }}>
                            <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: flow.color }}></div>
                            {item}
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {i < flow.steps.length - 1 && (
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', height: '30px' }}>
                        <div style={{ width: '2px', height: '10px', background: `linear-gradient(to bottom, ${flow.color}80, ${flow.color}20)` }}></div>
                        <div style={{ width: '12px', height: '12px', borderRadius: '50%', border: `2px solid ${flow.color}`, background: '#0F172A', boxShadow: `0 0 10px ${flow.color}40` }}></div>
                        <div style={{ width: '2px', height: '10px', background: `linear-gradient(to bottom, ${flow.color}20, ${flow.color}80)` }}></div>
                      </div>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          ))}
        </div>
        

        <h3 style={{ color: '#00BFA5', fontSize: '24px', margin: '60px 0 20px' }}>2. LOW-LEVEL DESIGN (LLD)</h3>
        
        <CodeBlock title="2.1 Database Schema" language="sql" code={`-- ──────────────────────────────────────────────────────────────────────────
-- ALERTS TABLE
-- ──────────────────────────────────────────────────────────────────────────

CREATE TABLE alerts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    -- Alert Details
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    severity VARCHAR(20) NOT NULL,  -- CRITICAL, WARNING, INFO
    
    -- Status Tracking
    status VARCHAR(20) DEFAULT 'OPEN',  -- OPEN, ACKNOWLEDGED, RESOLVED, ESCALATED
    
    -- Source Information
    source_type VARCHAR(50) NOT NULL,  -- anomaly, violation, pipeline_failure, approval
    source_id UUID NOT NULL,
    
    -- Affected Entities
    affected_dataset VARCHAR(255),
    affected_metric VARCHAR(255),
    affected_rows INTEGER,
    
    -- Business Context
    business_impact TEXT,
    recommended_action TEXT,
    business_owner VARCHAR(255),
    
    -- Delivery
    channels JSONB DEFAULT '[]',  -- ['slack', 'email', 'teams']
    
    -- Timestamps
    sent_at TIMESTAMP,
    acknowledged_at TIMESTAMP,
    acknowledged_by VARCHAR(255),
    resolved_at TIMESTAMP,
    resolved_by VARCHAR(255),
    resolution_notes TEXT,
    
    -- Escalation
    escalation_level INTEGER DEFAULT 0,
    escalated_at TIMESTAMP,
    escalated_to VARCHAR(255),
    
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- ──────────────────────────────────────────────────────────────────────────
-- ALERT HISTORY TABLE
-- ──────────────────────────────────────────────────────────────────────────

CREATE TABLE alert_history (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    alert_id UUID REFERENCES alerts(id) ON DELETE CASCADE,
    event VARCHAR(50) NOT NULL,  -- sent, acknowledged, resolved, escalated
    description TEXT,
    actor VARCHAR(255),
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMP DEFAULT NOW()
);

-- ──────────────────────────────────────────────────────────────────────────
-- ALERT SUBSCRIPTIONS TABLE
-- ──────────────────────────────────────────────────────────────────────────

CREATE TABLE alert_subscriptions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    severity VARCHAR(20),  -- NULL means all
    source_type VARCHAR(50),  -- NULL means all
    channel VARCHAR(50) NOT NULL,  -- slack, email, teams, sms
    webhook_url TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- ──────────────────────────────────────────────────────────────────────────
-- ESCALATION POLICIES TABLE
-- ──────────────────────────────────────────────────────────────────────────

CREATE TABLE escalation_policies (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    severity VARCHAR(20) NOT NULL,
    acknowledgment_timeout INTEGER DEFAULT 15,  -- minutes
    resolution_timeout INTEGER DEFAULT 60,  -- minutes
    escalation_levels JSONB DEFAULT '[]',  -- [{"level": 1, "role": "Data Engineer", "timeout": 15}]
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- ──────────────────────────────────────────────────────────────────────────
-- INDEXES
-- ──────────────────────────────────────────────────────────────────────────

CREATE INDEX idx_alerts_status ON alerts(status);
CREATE INDEX idx_alerts_severity ON alerts(severity);
CREATE INDEX idx_alerts_dataset ON alerts(affected_dataset);
CREATE INDEX idx_alerts_created ON alerts(created_at DESC);
CREATE INDEX idx_alerts_owner ON alerts(business_owner);

CREATE INDEX idx_alert_history_alert ON alert_history(alert_id);
CREATE INDEX idx_alert_history_created ON alert_history(created_at DESC);

CREATE INDEX idx_alert_subscriptions_user ON alert_subscriptions(user_id);
CREATE INDEX idx_alert_subscriptions_channel ON alert_subscriptions(channel);`} />

        <CodeBlock title="2.2 Pydantic Models" language="python" code={`# src/datatrust/models/alerts.py

from pydantic import BaseModel, Field
from typing import Optional, List, Dict, Any
from enum import Enum
from datetime import datetime


class AlertSeverity(str, Enum):
    CRITICAL = "CRITICAL"
    WARNING = "WARNING"
    INFO = "INFO"
    SUCCESS = "SUCCESS"


class AlertStatus(str, Enum):
    OPEN = "OPEN"
    ACKNOWLEDGED = "ACKNOWLEDGED"
    RESOLVED = "RESOLVED"
    ESCALATED = "ESCALATED"
    IGNORED = "IGNORED"


class AlertChannel(str, Enum):
    SLACK = "slack"
    TEAMS = "teams"
    EMAIL = "email"
    SMS = "sms"
    DASHBOARD = "dashboard"
    WEBHOOK = "webhook"


class AlertCreate(BaseModel):
    title: str
    description: str
    severity: AlertSeverity
    source_type: str
    source_id: str
    affected_dataset: Optional[str] = None
    affected_metric: Optional[str] = None
    affected_rows: Optional[int] = None
    business_impact: Optional[str] = None
    recommended_action: Optional[str] = None
    business_owner: Optional[str] = None
    channels: Optional[List[AlertChannel]] = None


class AlertResponse(BaseModel):
    id: str
    title: str
    description: str
    severity: AlertSeverity
    status: AlertStatus
    source_type: str
    source_id: str
    affected_dataset: Optional[str]
    affected_metric: Optional[str]
    affected_rows: Optional[int]
    business_impact: Optional[str]
    recommended_action: Optional[str]
    business_owner: Optional[str]
    channels: List[str]
    sent_at: Optional[datetime]
    acknowledged_at: Optional[datetime]
    acknowledged_by: Optional[str]
    resolved_at: Optional[datetime]
    resolved_by: Optional[str]
    resolution_notes: Optional[str]
    escalation_level: int
    created_at: datetime
    updated_at: datetime


class AlertAcknowledge(BaseModel):
    acknowledged_by: str


class AlertResolve(BaseModel):
    resolved_by: str
    resolution_notes: Optional[str] = None`} />

        <CodeBlock title="2.3 Alert Engine" language="python" code={`# src/datatrust/alerts/engine.py

import os
import json
import requests
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from typing import List, Dict, Any, Optional
from datetime import datetime
from sqlalchemy.orm import Session
from twilio.rest import Client as TwilioClient

from datatrust.models.alerts import AlertCreate, AlertResponse, AlertSeverity, AlertChannel
from datatrust.db.models import Alert, AlertHistory
from datatrust.audit.logger import AuditLogger


class AlertEngine:
    """Core alert engine for DataTrust notification system."""

    def __init__(self, db: Session, audit_logger: Optional[AuditLogger] = None):
        self.db = db
        self.audit_logger = audit_logger
        
        # Load configurations
        self.slack_webhook = os.getenv("SLACK_WEBHOOK_URL")
        self.teams_webhook = os.getenv("TEAMS_WEBHOOK_URL")
        self.smtp_host = os.getenv("SMTP_HOST", "smtp.gmail.com")
        self.smtp_port = int(os.getenv("SMTP_PORT", 587))
        self.smtp_user = os.getenv("SMTP_USER")
        self.smtp_password = os.getenv("SMTP_PASSWORD")
        self.from_email = os.getenv("FROM_EMAIL", "alerts@datatrust.ai")
        self.twilio_sid = os.getenv("TWILIO_ACCOUNT_SID")
        self.twilio_token = os.getenv("TWILIO_AUTH_TOKEN")
        self.twilio_from = os.getenv("TWILIO_FROM_NUMBER")
        self.app_url = os.getenv("APP_URL", "https://app.datatrust.ai")

    def send(self, alert_data: AlertCreate) -> AlertResponse:
        """Send alert through configured channels."""
        
        # 1. Determine channels based on severity
        channels = self._get_channels(alert_data.severity)
        if alert_data.channels:
            channels = alert_data.channels
        
        # 2. Create alert record
        alert = self._create_alert_record(alert_data, channels)
        
        # 3. Send through each channel
        results = {}
        for channel in channels:
            if channel == AlertChannel.SLACK:
                results["slack"] = self._send_slack(alert)
            elif channel == AlertChannel.TEAMS:
                results["teams"] = self._send_teams(alert)
            elif channel == AlertChannel.EMAIL:
                results["email"] = self._send_email(alert)
            elif channel == AlertChannel.SMS:
                results["sms"] = self._send_sms(alert)
            elif channel == AlertChannel.DASHBOARD:
                results["dashboard"] = True
            elif channel == AlertChannel.WEBHOOK:
                results["webhook"] = self._send_webhook(alert)
        
        # 4. Update alert with sent status
        alert.sent_at = datetime.utcnow()
        self.db.commit()
        
        # 5. Log to audit
        if self.audit_logger:
            self.audit_logger.log_change(
                entity_type="alert",
                entity_id=str(alert.id),
                action="SEND",
                new_value={
                    "severity": alert.severity,
                    "channels": [c.value for c in channels if results.get(c.value, False)]
                },
                changed_by="system"
            )
        
        return self._to_response(alert)

    def acknowledge(self, alert_id: str, user: str) -> AlertResponse:
        """Acknowledge an alert."""
        alert = self.db.query(Alert).filter(Alert.id == alert_id).first()
        if not alert:
            raise ValueError(f"Alert {alert_id} not found")
        
        alert.status = "ACKNOWLEDGED"
        alert.acknowledged_at = datetime.utcnow()
        alert.acknowledged_by = user
        self.db.commit()
        
        # Log to audit
        if self.audit_logger:
            self.audit_logger.log_change(
                entity_type="alert",
                entity_id=str(alert.id),
                action="ACKNOWLEDGE",
                changed_by=user
            )
        
        return self._to_response(alert)

    def resolve(self, alert_id: str, user: str, notes: Optional[str] = None) -> AlertResponse:
        """Resolve an alert."""
        alert = self.db.query(Alert).filter(Alert.id == alert_id).first()
        if not alert:
            raise ValueError(f"Alert {alert_id} not found")
        
        alert.status = "RESOLVED"
        alert.resolved_at = datetime.utcnow()
        alert.resolved_by = user
        alert.resolution_notes = notes
        self.db.commit()
        
        # Log to audit
        if self.audit_logger:
            self.audit_logger.log_change(
                entity_type="alert",
                entity_id=str(alert.id),
                action="RESOLVE",
                changed_by=user,
                reason=notes
            )
        
        return self._to_response(alert)

    def _get_channels(self, severity: AlertSeverity) -> List[AlertChannel]:
        """Determine channels based on severity."""
        if severity == AlertSeverity.CRITICAL:
            return [AlertChannel.SLACK, AlertChannel.TEAMS, AlertChannel.EMAIL, AlertChannel.SMS, AlertChannel.DASHBOARD]
        elif severity == AlertSeverity.WARNING:
            return [AlertChannel.SLACK, AlertChannel.EMAIL, AlertChannel.DASHBOARD]
        else:
            return [AlertChannel.DASHBOARD]

    def _create_alert_record(self, alert_data: AlertCreate, channels: List[AlertChannel]) -> Alert:
        """Create alert record in database."""
        alert = Alert(
            id=uuid.uuid4(),
            title=alert_data.title,
            description=alert_data.description,
            severity=alert_data.severity.value,
            status="OPEN",
            source_type=alert_data.source_type,
            source_id=alert_data.source_id,
            affected_dataset=alert_data.affected_dataset,
            affected_metric=alert_data.affected_metric,
            affected_rows=alert_data.affected_rows,
            business_impact=alert_data.business_impact,
            recommended_action=alert_data.recommended_action,
            business_owner=alert_data.business_owner,
            channels=[c.value for c in channels],
            created_at=datetime.utcnow(),
            updated_at=datetime.utcnow()
        )
        self.db.add(alert)
        self.db.commit()
        self.db.refresh(alert)
        return alert

    def _send_slack(self, alert: Alert) -> bool:
        """Send alert to Slack."""
        if not self.slack_webhook:
            return False
        
        try:
            emoji = {"CRITICAL": "🚨", "WARNING": "⚠️", "INFO": "ℹ️", "SUCCESS": "✅"}
            
            payload = {
                "blocks": [
                    {
                        "type": "header",
                        "text": {
                            "type": "plain_text",
                            "text": f"{emoji.get(alert.severity, '📢')} {alert.title}"
                        }
                    },
                    {
                        "type": "section",
                        "fields": [
                            {"type": "mrkdwn", "text": f"*Description:*\n{alert.description}"},
                            {"type": "mrkdwn", "text": f"*Impact:*\n{alert.business_impact or 'Unknown'}"},
                            {"type": "mrkdwn", "text": f"*Action:*\n{alert.recommended_action or 'Investigate'}"},
                            {"type": "mrkdwn", "text": f"*Owner:*\n{alert.business_owner or 'Data Team'}"}
                        ]
                    },
                    {
                        "type": "actions",
                        "elements": [
                            {
                                "type": "button",
                                "text": {"type": "plain_text", "text": "View Details"},
                                "url": f"{self.app_url}/alerts/{alert.id}"
                            },
                            {
                                "type": "button",
                                "text": {"type": "plain_text", "text": "Acknowledge"},
                                "action_id": "acknowledge",
                                "value": str(alert.id)
                            }
                        ]
                    }
                ]
            }
            
            response = requests.post(self.slack_webhook, json=payload, timeout=10)
            return response.status_code == 200
            
        except Exception as e:
            print(f"Slack alert failed: {e}")
            return False

    def _send_teams(self, alert: Alert) -> bool:
        """Send alert to Microsoft Teams."""
        if not self.teams_webhook:
            return False
        
        try:
            colors = {"CRITICAL": "FF0000", "WARNING": "FFA500", "INFO": "008000"}
            
            payload = {
                "@type": "MessageCard",
                "@context": "http://schema.org/extensions",
                "themeColor": colors.get(alert.severity, "0072C6"),
                "summary": alert.title,
                "sections": [
                    {
                        "activityTitle": alert.title,
                        "activitySubtitle": f"Severity: {alert.severity}",
                        "facts": [
                            {"name": "Description", "value": alert.description},
                            {"name": "Impact", "value": alert.business_impact or "Unknown"},
                            {"name": "Action", "value": alert.recommended_action or "Investigate"},
                            {"name": "Owner", "value": alert.business_owner or "Data Team"}
                        ],
                        "markdown": True
                    }
                ],
                "potentialAction": [
                    {
                        "@type": "OpenUri",
                        "name": "View Details",
                        "targets": [{"os": "default", "uri": f"{self.app_url}/alerts/{alert.id}"}]
                    }
                ]
            }
            
            response = requests.post(self.teams_webhook, json=payload, timeout=10)
            return response.status_code == 200
            
        except Exception as e:
            print(f"Teams alert failed: {e}")
            return False

    def _send_email(self, alert: Alert) -> bool:
        """Send alert via email."""
        if not all([self.smtp_host, self.smtp_user, self.smtp_password]):
            return False
        
        try:
            recipients = [alert.business_owner] if alert.business_owner else ["admin@company.com"]
            
            msg = MIMEMultipart()
            msg['From'] = self.from_email
            msg['To'] = ", ".join(recipients)
            msg['Subject'] = f"[{alert.severity}] {alert.title}"
            
            body = f"""
            🚨 {alert.severity} ALERT
            
            {alert.title}
            
            Description:
            {alert.description}
            
            Business Impact:
            {alert.business_impact or 'Unknown'}
            
            Recommended Action:
            {alert.recommended_action or 'Investigate immediately'}
            
            Affected Dataset: {alert.affected_dataset or 'Unknown'}
            Affected Metric: {alert.affected_metric or 'Unknown'}
            Business Owner: {alert.business_owner or 'Data Team'}
            
            ---
            View Details: {self.app_url}/alerts/{alert.id}
            DataTrust — Trust in Every Number
            """
            
            msg.attach(MIMEText(body, 'plain'))
            
            with smtplib.SMTP(self.smtp_host, self.smtp_port) as server:
                server.starttls()
                server.login(self.smtp_user, self.smtp_password)
                server.send_message(msg)
            
            return True
            
        except Exception as e:
            print(f"Email alert failed: {e}")
            return False

    def _send_sms(self, alert: Alert) -> bool:
        """Send alert via SMS (Twilio)."""
        if not all([self.twilio_sid, self.twilio_token, self.twilio_from]):
            return False
        
        try:
            to_number = os.getenv("ALERT_SMS_NUMBER")
            if not to_number:
                return False
            
            client = TwilioClient(self.twilio_sid, self.twilio_token)
            
            message = f"[{alert.severity}] {alert.title[:60]}. Action: {alert.recommended_action or 'Check dashboard'}"
            
            client.messages.create(
                body=message[:160],
                from_=self.twilio_from,
                to=to_number
            )
            return True
            
        except Exception as e:
            print(f"SMS alert failed: {e}")
            return False

    def _send_webhook(self, alert: Alert) -> bool:
        """Send alert via webhook."""
        webhook_url = os.getenv("WEBHOOK_URL")
        if not webhook_url:
            return False
        
        try:
            payload = self._to_response(alert).model_dump()
            response = requests.post(webhook_url, json=payload, timeout=10)
            return response.status_code == 200
            
        except Exception as e:
            print(f"Webhook alert failed: {e}")
            return False

    def _to_response(self, alert: Alert) -> AlertResponse:
        """Convert Alert model to AlertResponse."""
        return AlertResponse(
            id=str(alert.id),
            title=alert.title,
            description=alert.description,
            severity=AlertSeverity(alert.severity),
            status=AlertStatus(alert.status),
            source_type=alert.source_type,
            source_id=str(alert.source_id),
            affected_dataset=alert.affected_dataset,
            affected_metric=alert.affected_metric,
            affected_rows=alert.affected_rows,
            business_impact=alert.business_impact,
            recommended_action=alert.recommended_action,
            business_owner=alert.business_owner,
            channels=alert.channels or [],
            sent_at=alert.sent_at,
            acknowledged_at=alert.acknowledged_at,
            acknowledged_by=alert.acknowledged_by,
            resolved_at=alert.resolved_at,
            resolved_by=alert.resolved_by,
            resolution_notes=alert.resolution_notes,
            escalation_level=alert.escalation_level or 0,
            created_at=alert.created_at,
            updated_at=alert.updated_at
        )
`} />

        <CodeBlock title="2.4 Escalation Manager" language="python" code={`# src/datatrust/alerts/escalation.py

from typing import Optional, Dict, Any
from datetime import datetime, timedelta
from sqlalchemy.orm import Session

from datatrust.db.models import Alert
from datatrust.models.alerts import AlertStatus, AlertSeverity


class EscalationManager:
    """Manages alert escalation based on SLA policies."""

    def __init__(self, db: Session):
        self.db = db
        
        # Default escalation policies
        self.policies = {
            AlertSeverity.CRITICAL.value: {
                "acknowledgment_timeout": 15,  # minutes
                "resolution_timeout": 60,
                "escalation_levels": [
                    {"level": 1, "role": "Data Engineer", "timeout": 15},
                    {"level": 2, "role": "Data Lead", "timeout": 30},
                    {"level": 3, "role": "Head of Data", "timeout": 45}
                ]
            },
            AlertSeverity.WARNING.value: {
                "acknowledgment_timeout": 60,
                "resolution_timeout": 240,
                "escalation_levels": [
                    {"level": 1, "role": "Data Engineer", "timeout": 60},
                    {"level": 2, "role": "Data Lead", "timeout": 120}
                ]
            },
            AlertSeverity.INFO.value: {
                "acknowledgment_timeout": 1440,  # 24 hours
                "resolution_timeout": 2880,  # 48 hours
                "escalation_levels": []
            }
        }

    def check_escalation(self, alert: Alert) -> bool:
        """Check if alert needs escalation."""
        if alert.status not in [AlertStatus.OPEN.value, AlertStatus.ACKNOWLEDGED.value]:
            return False
        
        policy = self.policies.get(alert.severity)
        if not policy:
            return False
        
        # Check acknowledgment timeout
        if alert.status == AlertStatus.OPEN.value:
            if alert.created_at:
                elapsed = (datetime.utcnow() - alert.created_at).total_seconds() / 60
                if elapsed > policy["acknowledgment_timeout"]:
                    return True
        
        # Check resolution timeout
        if alert.status == AlertStatus.ACKNOWLEDGED.value:
            if alert.acknowledged_at:
                elapsed = (datetime.utcnow() - alert.acknowledged_at).total_seconds() / 60
                if elapsed > policy["resolution_timeout"]:
                    return True
        
        return False

    def escalate(self, alert: Alert) -> Alert:
        """Escalate alert to next level."""
        policy = self.policies.get(alert.severity)
        if not policy:
            return alert
        
        current_level = alert.escalation_level or 0
        levels = policy["escalation_levels"]
        
        if current_level >= len(levels):
            return alert
        
        next_level = current_level + 1
        level_info = levels[next_level - 1]
        
        alert.escalation_level = next_level
        alert.status = AlertStatus.ESCALATED.value
        alert.escalated_at = datetime.utcnow()
        alert.escalated_to = level_info["role"]
        
        self.db.commit()
        
        return alert
`} />

        <CodeBlock title="2.5 API Endpoints" language="python" code={`# src/datatrust/api/routers/alerts.py

from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import List, Optional

from datatrust.db.session import get_db
from datatrust.db.models import User
from datatrust.security.auth import get_current_user
from datatrust.models.alerts import AlertCreate, AlertResponse, AlertAcknowledge, AlertResolve
from datatrust.alerts.engine import AlertEngine
from datatrust.alerts.escalation import EscalationManager

router = APIRouter(prefix="/api/v1/alerts", tags=["alerts"])


@router.get("/", response_model=List[AlertResponse])
async def list_alerts(
    status: Optional[str] = Query(None),
    severity: Optional[str] = Query(None),
    dataset: Optional[str] = Query(None),
    limit: int = Query(50, ge=1, le=500),
    offset: int = Query(0, ge=0),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """List alerts with filters."""
    query = db.query(Alert)
    
    if status:
        query = query.filter(Alert.status == status)
    if severity:
        query = query.filter(Alert.severity == severity)
    if dataset:
        query = query.filter(Alert.affected_dataset == dataset)
    
    alerts = query.order_by(Alert.created_at.desc()).limit(limit).offset(offset).all()
    return [AlertEngine(db)._to_response(a) for a in alerts]


@router.post("/", response_model=AlertResponse)
async def create_alert(
    alert_data: AlertCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Create and send a new alert."""
    engine = AlertEngine(db)
    return engine.send(alert_data)


@router.get("/{alert_id}", response_model=AlertResponse)
async def get_alert(
    alert_id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get alert details."""
    alert = db.query(Alert).filter(Alert.id == alert_id).first()
    if not alert:
        raise HTTPException(404, "Alert not found")
    return AlertEngine(db)._to_response(alert)


@router.post("/{alert_id}/acknowledge", response_model=AlertResponse)
async def acknowledge_alert(
    alert_id: str,
    payload: AlertAcknowledge,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Acknowledge an alert."""
    engine = AlertEngine(db)
    return engine.acknowledge(alert_id, payload.acknowledged_by)


@router.post("/{alert_id}/resolve", response_model=AlertResponse)
async def resolve_alert(
    alert_id: str,
    payload: AlertResolve,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Resolve an alert."""
    engine = AlertEngine(db)
    return engine.resolve(alert_id, payload.resolved_by, payload.resolution_notes)


@router.post("/{alert_id}/escalate", response_model=AlertResponse)
async def escalate_alert(
    alert_id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Manually escalate an alert."""
    alert = db.query(Alert).filter(Alert.id == alert_id).first()
    if not alert:
        raise HTTPException(404, "Alert not found")
    
    manager = EscalationManager(db)
    alert = manager.escalate(alert)
    
    return AlertEngine(db)._to_response(alert)


@router.get("/stats", response_model=Dict)
async def get_alert_stats(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get alert statistics."""
    total = db.query(Alert).count()
    open_alerts = db.query(Alert).filter(Alert.status == "OPEN").count()
    critical = db.query(Alert).filter(Alert.severity == "CRITICAL").count()
    warning = db.query(Alert).filter(Alert.severity == "WARNING").count()
    
    return {
        "total": total,
        "open": open_alerts,
        "critical": critical,
        "warning": warning,
        "acknowledged": db.query(Alert).filter(Alert.status == "ACKNOWLEDGED").count(),
        "resolved": db.query(Alert).filter(Alert.status == "RESOLVED").count()
    }
`} />

        <h3 style={{ color: '#00BFA5', fontSize: '24px', margin: '60px 0 20px' }}>3. Configuration — .env</h3>
        <CodeBlock title=".env" language="env" code={`# ──────────────────────────────────────────────────────────────────────────
# NOTIFICATION SYSTEM CONFIGURATION
# ──────────────────────────────────────────────────────────────────────────

# Slack
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/T00000000/B00000000/xxxxxxxxxxxxxxxx

# Microsoft Teams
TEAMS_WEBHOOK_URL=https://your-domain.webhook.office.com/webhookb2/...

# Email (SMTP)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=alerts@datatrust.ai
SMTP_PASSWORD=your_app_password
FROM_EMAIL=alerts@datatrust.ai

# SMS (Twilio)
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_FROM_NUMBER=+1234567890
ALERT_SMS_NUMBER=+1987654321

# Webhook
WEBHOOK_URL=https://your-webhook.com/endpoint

# App URL
APP_URL=https://app.datatrust.ai

# Escalation
ESCALATION_CRITICAL_ACK_TIMEOUT=15
ESCALATION_CRITICAL_RESOLVE_TIMEOUT=60
ESCALATION_WARNING_ACK_TIMEOUT=60
ESCALATION_WARNING_RESOLVE_TIMEOUT=240`} />
      </div>
    </div>
  );
}

const CodeBlock = ({ title, code, language }) => {
  const [copied, setCopied] = React.useState(false);
  const [expanded, setExpanded] = React.useState(false);

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
