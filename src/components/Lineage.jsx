import React from 'react';
import { Info, Layers } from './Icons';

export default function Lineage({
  selectedLineageCol, setSelectedLineageCol,
  whatIfTriggered, setWhatIfTriggered,
  addToast
}) {
  return (
    <div className="w-card animate-fadeUp">
      <div className="w-card-header">
        <div>
          <h3 className="w-card-title"><Layers size={18} className="text-teal" /> Column-level Data Lineage & Impact Checks</h3>
          <div className="w-card-subtitle">Select database columns to visualize how they propagate from source schemas into Excel models and downstream dashboards.</div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: '2rem' }}>
        <div className="lineage-container">
          <div className="lineage-canvas">
            
            {/* Column 1: Source */}
            <div className="lineage-column">
              <div className="lineage-column-header">Snowflake Source DB</div>
              {['store_id', 'units', 'sales_amount', 'region'].map(col => (
                <div 
                  key={col} 
                  className={`lineage-card ${selectedLineageCol === col ? 'active' : ''}`}
                  onClick={() => {
                    setSelectedLineageCol(col);
                    setWhatIfTriggered(false);
                  }}
                >
                  <div className="lineage-card-title">{col}</div>
                  <div className="lineage-card-meta">Type: float / varchar</div>
                </div>
              ))}
            </div>

            {/* Column 2: Validation Rule Layer */}
            <div className="lineage-column">
              <div className="lineage-column-header">Validation Constraints</div>
              
              <div className={`lineage-card ${selectedLineageCol === 'sales_amount' ? 'active' : ''} ${whatIfTriggered && selectedLineageCol === 'sales_amount' ? 'impacted' : ''}`}>
                <div className="lineage-card-title">check_positive</div>
                <div className="lineage-card-meta">Constraint: value &gt; 0</div>
              </div>

              <div className={`lineage-card ${selectedLineageCol === 'units' ? 'active' : ''} ${whatIfTriggered && selectedLineageCol === 'units' ? 'impacted' : ''}`}>
                <div className="lineage-card-title">check_units_sold</div>
                <div className="lineage-card-meta">Constraint: quantity &gt; 0</div>
              </div>

              {selectedLineageCol !== 'sales_amount' && selectedLineageCol !== 'units' && (
                <div className="lineage-card text-muted" style={{ borderStyle: 'dashed' }}>
                  <div className="lineage-card-title">No Active Check</div>
                  <div className="lineage-card-meta">Raw column sync</div>
                </div>
              )}
            </div>

            {/* Column 3: Destination spreadsheet */}
            <div className="lineage-column">
              <div className="lineage-column-header">Excel Spreadsheets</div>
              <div className={`lineage-card ${selectedLineageCol === 'sales_amount' || selectedLineageCol === 'units' ? 'active' : ''} ${whatIfTriggered && (selectedLineageCol === 'sales_amount' || selectedLineageCol === 'units') ? 'impacted' : ''}`}>
                <div className="lineage-card-title">Monthly_Revenue_Q4.xlsx</div>
                <div className="lineage-card-meta">Used in Board Deck Summary</div>
              </div>
            </div>

          </div>
        </div>

        {/* Lineage Info panel */}
        <div>
          <div className="w-card" style={{ background: '#0B1926', padding: '1.25rem', margin: 0 }}>
            <h4 style={{ color: '#FFFFFF', fontSize: '0.9rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <Info size={16} className="text-teal" /> Column Info
            </h4>
            <p style={{ fontSize: '0.85rem', color: '#94A3B8', marginBottom: '1rem' }}>
              Selected Column: <strong className="text-white">{selectedLineageCol}</strong>
            </p>

            <div className="rule-config-row" style={{ padding: '0.75rem', marginBottom: '1.5rem', background: '#0D1E2D' }}>
              <div style={{ fontSize: '0.78rem', color: '#CBD5E1' }}>
                This attribute propagates into <strong>Monthly_Revenue_Q4.xlsx</strong>, affecting downstream profit calculations and finance report summaries.
              </div>
            </div>

            <h5 style={{ color: '#FFFFFF', fontSize: '0.85rem', marginBottom: '0.5rem' }}>What-if Impact Analysis</h5>
            <p style={{ fontSize: '0.78rem', color: '#94A3B8', marginBottom: '1rem' }}>Simulate deleting or changing type schema of the active column to identify asset breakage.</p>
            
            <button 
              className="w-btn w-btn-danger" 
              style={{ width: '100%' }}
              onClick={() => {
                setWhatIfTriggered(true);
                addToast('error', 'Schema Impact Warning', `Modifying "${selectedLineageCol}" violates 1 downstream active spreadsheet model definition.`);
              }}
            >
              Analyze Drop Impact
            </button>

            {whatIfTriggered && (
              <div style={{ marginTop: '1rem', background: 'rgba(239, 68, 68, 0.08)', border: '1px solid rgba(239, 68, 68, 0.15)', borderRadius: '6px', padding: '0.75rem', fontSize: '0.78rem', color: '#FCA5A5' }}>
                ⚠️ <strong>Critical Downstream Impact:</strong> Change breaks formula references in <strong>Monthly_Revenue_Q4.xlsx</strong> sheet cell range B4:B12.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
