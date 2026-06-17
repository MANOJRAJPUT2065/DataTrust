import React from 'react';
import { Database, FileSpreadsheet, Activity, Sliders } from './Icons';

export default function Dependencies({
  dependencyRunStatus,
  blockDownstreamOnFail, setBlockDownstreamOnFail,
  allowRunOnUpstreamFail, setAllowRunOnUpstreamFail,
  handleRunDependencies
}) {
  return (
    <div className="w-card animate-fadeUp">
      <div className="w-card-header">
        <div>
          <h3 className="w-card-title"><Sliders size={18} className="text-teal" /> Upstream/Downstream Dependencies</h3>
          <div className="w-card-subtitle">Establish pipeline triggers. Ensure validation passes completely before downstream sync operations proceed.</div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: '2rem', marginTop: '1rem' }}>
        <div className="dependency-graph">
          <div className="lineage-column-header">Pipeline DAG Execution Pipeline</div>
          
          <div className="dependency-node success">
            <div className="node-info">
              <Database size={16} className="text-green" style={{ color: '#10B981' }} />
              <div>
                <div className="node-name">1. sales_ingestion_pipeline</div>
                <div className="w-card-subtitle" style={{ margin: 0 }}>Extract rows from source sales POS</div>
              </div>
            </div>
            <span className="node-status-badge success" style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#86EFAC' }}>COMPLETED</span>
          </div>

          <div className="dependency-arrow"></div>

          <div className={`dependency-node ${dependencyRunStatus === 'running' ? 'running' : dependencyRunStatus === 'blocked' ? 'blocked' : 'success'}`}>
            <div className="node-info">
              <Activity size={16} className="text-teal" style={{ color: '#00BFA5' }} />
              <div>
                <div className="node-name">2. datatrust_validation_pipeline</div>
                <div className="w-card-subtitle" style={{ margin: 0 }}>Active evaluation checks on schema constraint rules</div>
              </div>
            </div>
            <span className={`node-status-badge ${dependencyRunStatus === 'running' ? 'running' : dependencyRunStatus === 'blocked' ? 'blocked' : 'success'}`}>
              {dependencyRunStatus === 'idle' ? 'STANDBY' : dependencyRunStatus === 'running' ? 'EVALUATING' : dependencyRunStatus === 'blocked' ? 'FAILED RULES' : 'PASSED'}
            </span>
          </div>

          <div className="dependency-arrow"></div>

          <div className={`dependency-node ${dependencyRunStatus === 'blocked' ? 'blocked' : 'success'}`}>
            <div className="node-info">
              <FileSpreadsheet size={16} />
              <div>
                <div className="node-name">3. excel_reports_publish_job</div>
                <div className="w-card-subtitle" style={{ margin: 0 }}>Publishes final checked workbook data for executives</div>
              </div>
            </div>
            <span className={`node-status-badge ${dependencyRunStatus === 'blocked' ? 'blocked' : 'success'}`}>
              {dependencyRunStatus === 'idle' ? 'PENDING' : dependencyRunStatus === 'blocked' ? 'BLOCKED' : 'PUBLISHED'}
            </span>
          </div>
        </div>

        <div>
          <div className="w-card" style={{ background: '#0B1926', padding: '1.25rem', margin: 0 }}>
            <h4 style={{ color: '#FFFFFF', fontSize: '0.9rem', marginBottom: '1rem' }}>DAG Configuration</h4>
            
            <div className="form-group">
              <div className="form-checkbox-row">
                <input 
                  type="checkbox" 
                  id="block-downstream" 
                  checked={blockDownstreamOnFail} 
                  onChange={(e) => setBlockDownstreamOnFail(e.target.checked)} 
                />
                <label htmlFor="block-downstream" style={{ fontSize: '0.82rem', color: '#94A3B8' }}>
                  Block downstream job if validation fails (Recommended)
                </label>
              </div>
            </div>

            <div className="form-group">
              <div className="form-checkbox-row">
                <input 
                  type="checkbox" 
                  id="allow-upstream-fail" 
                  checked={allowRunOnUpstreamFail} 
                  onChange={(e) => setAllowRunOnUpstreamFail(e.target.checked)} 
                />
                <label htmlFor="allow-upstream-fail" style={{ fontSize: '0.82rem', color: '#94A3B8' }}>
                  Force execute downstream if validation rules fail
                </label>
              </div>
            </div>

            <button className="w-btn w-btn-primary" style={{ width: '100%', marginTop: '1rem' }} onClick={handleRunDependencies}>
              Trigger DAG Execution Run
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
