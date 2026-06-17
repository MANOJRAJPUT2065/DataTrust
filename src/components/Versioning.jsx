import React from 'react';
import { GitBranch } from './Icons';

export default function Versioning({
  selectedVersionCompare, setSelectedVersionCompare,
  currentVersion,
  versionLogs,
  handleRollback
}) {
  return (
    <div className="w-card animate-fadeUp">
      <div className="w-card-header">
        <div>
          <h3 className="w-card-title"><GitBranch size={18} className="text-teal" /> Git-like Rule Versioning</h3>
          <div className="w-card-subtitle">Every semantic metric rule edit is tracked automatically in audit records. Review revisions and revert pipeline configurations.</div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: '2rem', marginTop: '1rem' }}>
        
        {/* Version logs */}
        <div>
          <h4 style={{ color: '#FFFFFF', fontSize: '0.9rem', marginBottom: '1rem' }}>Version Commit Log</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {versionLogs.map(log => (
              <div 
                key={log.id} 
                onClick={() => setSelectedVersionCompare(log.version)}
                style={{ 
                  background: selectedVersionCompare === log.version ? '#0B1926' : '#0D1E2D',
                  border: '1px solid',
                  borderColor: selectedVersionCompare === log.version ? 'var(--teal)' : 'rgba(255, 255, 255, 0.05)',
                  borderRadius: '8px', 
                  padding: '1rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                  <span style={{ fontWeight: 700, color: '#FFFFFF', fontSize: '0.85rem' }}>{log.version}</span>
                  {currentVersion === log.version && <span style={{ fontSize: '0.65rem', background: 'rgba(0, 191, 165, 0.12)', color: 'var(--teal)', padding: '0.15rem 0.4rem', borderRadius: '4px', border: '1px solid rgba(0, 191, 165, 0.2)' }}>ACTIVE</span>}
                </div>
                <div style={{ fontSize: '0.75rem', color: '#94A3B8', marginBottom: '0.5rem' }}>{log.date} · {log.author}</div>
                <div style={{ fontSize: '0.78rem', color: '#CBD5E1' }}>{log.comment}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Diff Viewer panel */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h4 style={{ color: '#FFFFFF', fontSize: '0.9rem' }}>Configuration Diff comparison: <span className="text-teal">{selectedVersionCompare}</span> vs Original</h4>
            <button 
              className="w-btn w-btn-danger" 
              disabled={currentVersion === selectedVersionCompare}
              onClick={handleRollback}
            >
              Revert rules to {selectedVersionCompare}
            </button>
          </div>

          <div className="diff-viewer">
            <div className="diff-header">
              <span>YAML Schema Configuration</span>
              <span>Rules Matrix Diff</span>
            </div>
            
            <div className="diff-row">
              <span className="diff-num">1</span>
              <span className="diff-code">metrics_validation_definition:</span>
            </div>
            <div className="diff-row">
              <span className="diff-num">2</span>
              <span className="diff-code">  pipeline_metadata:</span>
            </div>
            <div className="diff-row">
              <span className="diff-num">3</span>
              <span className="diff-code">    table_ref: sales_transactions</span>
            </div>
            <div className="diff-row">
              <span className="diff-num">4</span>
              <span className="diff-code">    governance_owner: CFO_Office</span>
            </div>
            
            {selectedVersionCompare === 'v1.2.0' && (
              <>
                <div className="diff-row addition">
                  <span className="diff-num">5</span>
                  <span className="diff-code">+   rules:</span>
                </div>
                <div className="diff-row addition">
                  <span className="diff-num">6</span>
                  <span className="diff-code">+     - target_column: sales_amount</span>
                </div>
                <div className="diff-row addition">
                  <span className="diff-num">7</span>
                  <span className="diff-code">+       constraint: is_positive</span>
                </div>
              </>
            )}

            {selectedVersionCompare === 'v1.1.1' && (
              <>
                <div className="diff-row deletion">
                  <span className="diff-num">5</span>
                  <span className="diff-code">-     - target_column: sales_amount</span>
                </div>
                <div className="diff-row deletion">
                  <span className="diff-num">6</span>
                  <span className="diff-code">-       constraint: upper_bound_limit_10Cr</span>
                </div>
              </>
            )}
            
            <div className="diff-row">
              <span className="diff-num">8</span>
              <span className="diff-code">      - target_column: units</span>
            </div>
            <div className="diff-row">
              <span className="diff-num">9</span>
              <span className="diff-code">        constraint: greater_than_zero</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
