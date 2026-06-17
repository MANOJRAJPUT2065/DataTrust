import React from 'react';
import { Database, Wrench, CheckCircle, AlertTriangle, FileSpreadsheet, Play, ArrowRight, Plus, Trash2, RefreshCw } from './Icons';

export default function PipelineBuilder({
  dbSource, setDbSource,
  dbTable, setDbTable,
  validationRules,
  newRuleCol, setNewRuleCol,
  newRuleCond, setNewRuleCond,
  newRuleVal, setNewRuleVal,
  builderStep, setBuilderStep,
  isValidating, validationRunLog, validationRunComplete,
  simulateAnomaly, setSimulateAnomaly,
  excelData, excelStatus, lastRefreshedExcel,
  handleAddBuilderRule, handleDeleteBuilderRule, handleRunValidation, handleExcelRefresh
}) {
  return (
    <div>
      {/* STEPPER HEADER */}
      <div className="pipeline-stepper">
        <div className={`stepper-item ${builderStep >= 1 ? 'completed' : ''} ${builderStep === 1 ? 'active' : ''}`} onClick={() => setBuilderStep(1)}>
          <div className="step-icon-circle">1</div>
          <span>Select Source</span>
        </div>
        <div className={`stepper-item ${builderStep >= 2 ? 'completed' : ''} ${builderStep === 2 ? 'active' : ''}`} onClick={() => setBuilderStep(2)}>
          <div className="step-icon-circle">2</div>
          <span>Configure Metrics</span>
        </div>
        <div className={`stepper-item ${builderStep >= 3 ? 'completed' : ''} ${builderStep === 3 ? 'active' : ''}`} onClick={() => setBuilderStep(3)}>
          <div className="step-icon-circle">3</div>
          <span>Validate</span>
        </div>
        <div className={`stepper-item ${builderStep >= 4 ? 'completed' : ''} ${builderStep === 4 ? 'active' : ''}`} onClick={() => setBuilderStep(4)}>
          <div className="step-icon-circle">4</div>
          <span>Monitor & Anomaly</span>
        </div>
        <div className={`stepper-item ${builderStep >= 5 ? 'completed' : ''} ${builderStep === 5 ? 'active' : ''}`} onClick={() => setBuilderStep(5)}>
          <div className="step-icon-circle">5</div>
          <span>Excel Live Sync</span>
        </div>
      </div>

      {/* STEP 1: SELECT SOURCE */}
      {builderStep === 1 && (
        <div className="w-card animate-fadeUp">
          <div className="w-card-header">
            <div>
              <h3 className="w-card-title"><Database size={18} className="text-teal" /> Connect Data Warehouse</h3>
              <div className="w-card-subtitle">Choose source environment and transactional tables for audit checks.</div>
            </div>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginTop: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Data Warehouse Platform</label>
              <select className="form-select" value={dbSource} onChange={(e) => setDbSource(e.target.value)}>
                <option value="Snowflake">Snowflake Enterprise DW</option>
                <option value="Databricks">Databricks Lakehouse</option>
                <option value="Google BigQuery">Google BigQuery</option>
                <option value="Amazon Redshift">Amazon Redshift</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Target Dataset Table</label>
              <select className="form-select" value={dbTable} onChange={(e) => setDbTable(e.target.value)}>
                <option value="sales_transactions">sales_transactions (Q4 Live)</option>
                <option value="customer_master">customer_master_records</option>
                <option value="finance_ledger">finance_ledger_balances</option>
              </select>
            </div>
          </div>
          
          <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'flex-end' }}>
            <button className="w-btn w-btn-primary" onClick={() => setBuilderStep(2)}>
              Next: Configure Semantic Rules <ArrowRight size={14} />
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: CONFIGURE METRICS */}
      {builderStep === 2 && (
        <div className="w-card animate-fadeUp">
          <div className="w-card-header">
            <div>
              <h3 className="w-card-title"><Wrench size={18} className="text-teal" /> Define Semantic Constraints</h3>
              <div className="w-card-subtitle">Establish rule bounds in plain English to enforce consistency across team metrics.</div>
            </div>
          </div>

          <div className="code-box" style={{ marginBottom: '1.5rem' }}>
            <span className="code-comment">-- Active Schema Connection Definitions</span><br />
            <span className="code-keyword">SELECT</span> * <span className="code-keyword">FROM</span> analytics_sales.{dbTable} <span className="code-keyword">WHERE</span> verification_status = <span className="code-string">'governed'</span>;
          </div>

          <form onSubmit={handleAddBuilderRule} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-end', marginBottom: '2rem' }}>
            <div className="form-group" style={{ flex: 1, margin: 0 }}>
              <label className="form-label">Column</label>
              <select className="form-select" value={newRuleCol} onChange={(e) => setNewRuleCol(e.target.value)}>
                <option value="sales_amount">sales_amount (Revenue)</option>
                <option value="units">units (Quantity)</option>
                <option value="region">region (Text Segment)</option>
                <option value="store_id">store_id (Key identifier)</option>
              </select>
            </div>
            <div className="form-group" style={{ flex: 1, margin: 0 }}>
              <label className="form-label">Constraint Type</label>
              <select className="form-select" value={newRuleCond} onChange={(e) => setNewRuleCond(e.target.value)}>
                <option value="is_positive">Must be Positive (&gt; 0)</option>
                <option value="greater_than">Greater than (&gt;)</option>
                <option value="not_null">Not Null / Complete</option>
                <option value="regex_format">Regex Match Format</option>
              </select>
            </div>
            <div className="form-group" style={{ flex: 1, margin: 0 }}>
              <label className="form-label">Value Bound (Optional)</label>
              <input 
                type="text" 
                className="form-input" 
                placeholder="e.g. 100" 
                value={newRuleVal} 
                onChange={(e) => setNewRuleVal(e.target.value)} 
              />
            </div>
            <button type="submit" className="w-btn w-btn-success" style={{ height: '42px' }}>
              <Plus size={16} /> Add Rule
            </button>
          </form>

          <h4 style={{ marginBottom: '0.75rem', fontSize: '0.9rem', color: '#94A3B8' }}>Configured Constraints ({validationRules.length})</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {validationRules.map(rule => (
              <div key={rule.id} className="rule-config-row">
                <span className="rule-pill">semantic check</span>
                <div style={{ flexGrow: 1 }}>
                  <strong>{rule.column}</strong> constraint: <code>{rule.condition} {rule.value}</code>
                </div>
                <button className="w-btn w-btn-danger" style={{ padding: '0.35rem' }} onClick={() => handleDeleteBuilderRule(rule.id)}>
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'space-between' }}>
            <button className="w-btn w-btn-secondary" onClick={() => setBuilderStep(1)}>
              Back
            </button>
            <button className="w-btn w-btn-primary" onClick={() => setBuilderStep(3)}>
              Next: Run Validation Testing <ArrowRight size={14} />
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: VALIDATE */}
      {builderStep === 3 && (
        <div className="w-card animate-fadeUp">
          <div className="w-card-header">
            <div>
              <h3 className="w-card-title"><CheckCircle size={18} className="text-teal" /> Schema Compliance Checks</h3>
              <div className="w-card-subtitle">Run automated rules against Snowflake data to intercept discrepancies.</div>
            </div>
          </div>

          <div style={{ background: '#060E16', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '8px', padding: '1.25rem', marginBottom: '1.5rem', minHeight: '180px' }}>
            <h5 style={{ color: '#94A3B8', fontSize: '0.78rem', textTransform: 'uppercase', marginBottom: '0.75rem' }}>Validation Logs Console</h5>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', fontFamily: 'monospace', fontSize: '0.8rem' }}>
              {validationRunLog.length === 0 && <span className="text-gray-muted">No validations executed yet. Click "Start Test Exec" below to run.</span>}
              {validationRunLog.map((log, i) => (
                <div key={i} style={{ color: log.type === 'error' ? '#EF4444' : log.type === 'success' ? '#10B981' : '#CBD5E1' }}>
                  {log.type === 'error' ? '[ERR] ' : log.type === 'success' ? '[OK] ' : '[SYS] '} {log.text}
                </div>
              ))}
              {isValidating && <span className="text-teal" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>⌛ Checking table constraints... <RefreshCw size={12} className="animate-spin" /></span>}
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1rem' }}>
            <button className="w-btn w-btn-primary" onClick={handleRunValidation} disabled={isValidating}>
              <Play size={14} /> {isValidating ? 'Validating...' : 'Start Test Exec'}
            </button>
            
            {validationRunComplete && (
              <button className="w-btn w-btn-secondary" onClick={() => setBuilderStep(4)}>
                Proceed to Real-time Monitoring <ArrowRight size={14} />
              </button>
            )}
          </div>
        </div>
      )}

      {/* STEP 4: MONITOR & ANOMALY */}
      {builderStep === 4 && (
        <div className="w-card animate-fadeUp">
          <div className="w-card-header">
            <div>
              <h3 className="w-card-title"><AlertTriangle size={18} className="text-teal" /> Proactive Anomaly Sandbox</h3>
              <div className="w-card-subtitle">Enable simulated bad entries to inspect how our Governance Alert Engine traps quality drift.</div>
            </div>
          </div>

          <div className="rule-config-row" style={{ background: 'rgba(245, 158, 11, 0.05)', borderColor: 'rgba(245, 158, 11, 0.2)', padding: '1.25rem', marginBottom: '2rem' }}>
            <div style={{ flexGrow: 1 }}>
              <h5 style={{ color: '#F59E0B', fontWeight: 700, marginBottom: '0.25rem' }}>Simulation Control Pane</h5>
              <p style={{ fontSize: '0.82rem', color: '#94A3B8' }}>Toggle Anomaly to true and return to "Step 3: Validate" or run "Trigger Validation" from the top header to mock data breaches.</p>
            </div>
            <div className="form-checkbox-row">
              <input 
                type="checkbox" 
                id="chk-anomaly" 
                checked={simulateAnomaly} 
                onChange={(e) => setSimulateAnomaly(e.target.checked)} 
              />
              <label htmlFor="chk-anomaly" style={{ fontWeight: 600, color: '#FFFFFF', fontSize: '0.85rem' }}>Inject Broken Rows</label>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <button className="w-btn w-btn-secondary" onClick={() => setBuilderStep(3)}>
              Back to Execution
            </button>
            <button className="w-btn w-btn-primary" onClick={() => setBuilderStep(5)}>
              Next: Sync Validated Data to Excel <ArrowRight size={14} />
            </button>
          </div>
        </div>
      )}

      {/* STEP 5: EXCEL LIVE SYNC */}
      {builderStep === 5 && (
        <div className="w-card animate-fadeUp">
          <div className="w-card-header">
            <div>
              <h3 className="w-card-title"><FileSpreadsheet size={18} className="text-teal" /> Excel Report Validation Sync</h3>
              <div className="w-card-subtitle">The governed data from Snowflake is piped into the client template, showing verification status live inside the Excel ribbon.</div>
            </div>
          </div>

          <div className="mock-excel" style={{ marginInline: 'auto', maxWidth: '680px' }}>
            <div className="mock-topbar">
              <div className="mock-dots">
                <div className="mock-dot" style={{ background: '#FF5F57' }}></div>
                <div className="mock-dot" style={{ background: '#FFBD2E' }}></div>
                <div className="mock-dot" style={{ background: '#28C840' }}></div>
              </div>
              <div className="mock-title">Sales_Verification_Audit.xlsx — DataTrust Powered</div>
            </div>
            <div className="mock-body">
              <div className="mock-ribbon" style={{ 
                background: excelStatus === 'alert' ? 'rgba(239, 68, 68, 0.15)' : excelStatus === 'loading' ? 'rgba(245, 158, 11, 0.15)' : 'rgba(16, 185, 129, 0.12)', 
                borderColor: excelStatus === 'alert' ? 'rgba(239, 68, 68, 0.3)' : excelStatus === 'loading' ? 'rgba(245, 158, 11, 0.3)' : 'rgba(16, 185, 129, 0.25)' 
              }}>
                <span>🔗 Connection:</span>
                <strong>Snowflake → {dbTable}</strong>
                <span style={{ marginLeft: 'auto', color: excelStatus === 'alert' ? '#F87171' : excelStatus === 'loading' ? '#FBBF24' : '#34D399' }}>
                  {excelStatus === 'alert' ? '⚠ Quality Alerts Active' : excelStatus === 'loading' ? '↻ Refreshing...' : '✅ Rules Verified'}
                </span>
              </div>
              
              <div className="mock-table-container">
                <table className="mock-table">
                  <thead>
                    <tr>
                      <th>Region</th>
                      <th>Revenue Amount</th>
                      <th>Units Sold</th>
                      <th>Governance Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {excelData.map(row => (
                      <tr key={row.id} className={row.rowClass}>
                        <td>{row.region}</td>
                        <td>{row.revenue}</td>
                        <td>{row.units}</td>
                        <td>
                          <span className={`mock-badge ${row.rowClass === 'warn' ? 'badge-warn' : 'badge-ok'}`}>
                            {row.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="mock-footer">
                <span>Synced at {lastRefreshedExcel} · Live Snowflake connection</span>
                <button className="refresh-btn" onClick={handleExcelRefresh} disabled={excelStatus === 'loading'}>
                  <RefreshCw size={12} className={excelStatus === 'loading' ? 'animate-spin' : ''} /> 
                  {excelStatus === 'loading' ? 'Syncing...' : 'Refresh Excel'}
                </button>
              </div>
            </div>
          </div>

          <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'flex-start' }}>
            <button className="w-btn w-btn-secondary" onClick={() => setBuilderStep(4)}>
              Back
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
