import React from 'react';
import { Bell } from './Icons';

export default function Slas({
  slaDeadline, setSlaDeadline,
  slaLatency, setSlaLatency,
  slackWebhookActive, setSlackWebhookActive,
  emailAlertsActive, setEmailAlertsActive,
  teamsWebhookActive, setTeamsWebhookActive,
  handleTestSlackWebhook
}) {
  return (
    <div className="w-card animate-fadeUp">
      <div className="w-card-header">
        <div>
          <h3 className="w-card-title"><Bell size={18} className="text-teal" /> SLA Thresholds & Alert Integration</h3>
          <div className="w-card-subtitle">Specify processing latency boundaries and map automated warnings directly into active client communication spaces.</div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2.5rem', marginTop: '1rem' }}>
        
        {/* SLA configuration */}
        <div>
          <h4 style={{ color: '#FFFFFF', fontSize: '0.9rem', marginBottom: '1.25rem' }}>SLA Latency Bounds</h4>
          
          <div className="w-card" style={{ background: '#0B1926', marginBottom: '1.5rem', margin: 0 }}>
            <div className="form-group">
              <label className="form-label" style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Max Processing Latency Bound</span>
                <span className="text-teal" style={{ color: '#00BFA5' }}>{slaLatency} minutes</span>
              </label>
              <input 
                type="range" 
                min="1" 
                max="30" 
                value={slaLatency} 
                onChange={(e) => setSlaLatency(e.target.value)} 
                style={{ width: '100%', accentColor: 'var(--teal)' }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: '#94A3B8', marginTop: '0.25rem' }}>
                <span>1 min</span>
                <span>30 min</span>
              </div>
            </div>

            <div className="form-group" style={{ margin: 0 }}>
              <label className="form-label">Daily Reporting Arrival Deadline</label>
              <input 
                type="text" 
                className="form-input" 
                value={slaDeadline} 
                onChange={(e) => setSlaDeadline(e.target.value)} 
              />
            </div>
          </div>
        </div>

        {/* Webhook notification integrations */}
        <div>
          <h4 style={{ color: '#FFFFFF', fontSize: '0.9rem', marginBottom: '1.25rem' }}>Alert Notification Bridges</h4>
          
          <div className="integration-card">
            <div className="integration-info">
              <div className="integration-icon">💬</div>
              <div>
                <div className="integration-name">Slack Alerts Channel</div>
                <div className="integration-desc">Post quality reports to #data-quality-alerts</div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <button className="w-btn w-btn-secondary" style={{ fontSize: '0.75rem', padding: '0.3rem 0.6rem' }} onClick={handleTestSlackWebhook}>Test</button>
              <input 
                type="checkbox" 
                checked={slackWebhookActive} 
                onChange={(e) => setSlackWebhookActive(e.target.checked)} 
                style={{ width: '16px', height: '16px', accentColor: 'var(--teal)' }}
              />
            </div>
          </div>

          <div className="integration-card">
            <div className="integration-info">
              <div className="integration-icon">✉</div>
              <div>
                <div className="integration-name">Email Mailing List</div>
                <div className="integration-desc">Send audit alerts directly to dev@datatrust.ai</div>
              </div>
            </div>
            <input 
              type="checkbox" 
              checked={emailAlertsActive} 
              onChange={(e) => setEmailAlertsActive(e.target.checked)} 
              style={{ width: '16px', height: '16px', accentColor: 'var(--teal)' }}
            />
          </div>

          <div className="integration-card">
            <div className="integration-info">
              <div className="integration-icon">🖧</div>
              <div>
                <div className="integration-name">MS Teams Channel Webhook</div>
                <div className="integration-desc">Post status logs into general Teams feed</div>
              </div>
            </div>
            <input 
              type="checkbox" 
              checked={teamsWebhookActive} 
              onChange={(e) => setTeamsWebhookActive(e.target.checked)} 
              style={{ width: '16px', height: '16px', accentColor: 'var(--teal)' }}
            />
          </div>
        </div>

      </div>
    </div>
  );
}
