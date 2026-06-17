import React from 'react';
import { UserCheck } from './Icons';

export default function Approvals({
  approvalRequests,
  newRuleRequestMetric, setNewRuleRequestMetric,
  newRuleRequestValue, setNewRuleRequestValue,
  newRuleRequestReviewer, setNewRuleRequestReviewer,
  handleCreateApprovalRequest,
  handleApproveRequest,
  handleRejectRequest
}) {
  return (
    <div className="w-card animate-fadeUp">
      <div className="w-card-header">
        <div>
          <h3 className="w-card-title"><UserCheck size={18} className="text-teal" /> Governance Approvals Workflow</h3>
          <div className="w-card-subtitle">Require administrative peer-review and sign-off verification logs before modifying critical reporting metric schemas.</div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.1fr', gap: '2.5rem', marginTop: '1rem' }}>
        
        {/* Submit request form */}
        <div>
          <h4 style={{ color: '#FFFFFF', fontSize: '0.9rem', marginBottom: '1.25rem' }}>Propose Rule Modification</h4>
          <form onSubmit={handleCreateApprovalRequest} className="w-card" style={{ background: '#0B1926', margin: 0 }}>
            <div className="form-group">
              <label className="form-label">Metric Column Identifier</label>
              <input 
                type="text" 
                className="form-input" 
                placeholder="e.g. operational_expense_limit" 
                value={newRuleRequestMetric} 
                onChange={(e) => setNewRuleRequestMetric(e.target.value)} 
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Constraint Value Formula</label>
              <input 
                type="text" 
                className="form-input" 
                placeholder="e.g. limit_amount < 50000" 
                value={newRuleRequestValue} 
                onChange={(e) => setNewRuleRequestValue(e.target.value)} 
              />
            </div>

            <div className="form-group">
              <label className="form-label">Designated Review Board</label>
              <select className="form-select" value={newRuleRequestReviewer} onChange={(e) => setNewRuleRequestReviewer(e.target.value)}>
                <option value="CFO Office">CFO Office (Auditing Control)</option>
                <option value="Data Engineering Lead">Data Engineering Team</option>
                <option value="Risk & compliance">Global Risk and Compliance Dept</option>
              </select>
            </div>

            <button type="submit" className="w-btn w-btn-primary" style={{ width: '100%', marginTop: '0.5rem' }}>
              Submit Request for Review
            </button>
          </form>
        </div>

        {/* Approval requests table list */}
        <div>
          <h4 style={{ color: '#FFFFFF', fontSize: '0.9rem', marginBottom: '1.25rem' }}>Pending Approval Ledger</h4>
          <div className="approval-timeline">
            {approvalRequests.map(req => (
              <div key={req.id} className="approval-item animate-fadeUp">
                <div className="approval-avatar">
                  {req.requestedBy.substring(0, 2).toUpperCase()}
                </div>
                <div className="approval-body">
                  <div className="approval-header-row">
                    <span className="approval-user">{req.requestedBy}</span>
                    <span className={`approval-action ${req.status}`}>
                      {req.status.toUpperCase()}
                    </span>
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#94A3B8', marginBottom: '0.5rem' }}>
                    Proposed constraint: <code>{req.metric} = {req.value}</code>
                  </div>
                  {req.status === 'pending' && (
                    <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.75rem' }}>
                      <button 
                        className="w-btn w-btn-success" 
                        style={{ padding: '0.35rem 0.75rem', fontSize: '0.78rem' }}
                        onClick={() => handleApproveRequest(req.id)}
                      >
                        Approve & Deploy
                      </button>
                      <button 
                        className="w-btn w-btn-danger" 
                        style={{ padding: '0.35rem 0.75rem', fontSize: '0.78rem' }}
                        onClick={() => handleRejectRequest(req.id)}
                      >
                        Reject
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
