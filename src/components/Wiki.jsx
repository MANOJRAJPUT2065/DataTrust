import React from 'react';
import { BookOpen } from './Icons';

export default function Wiki({
  wikiContent, setWikiContent,
  wikiEditMode, setWikiEditMode,
  addToast
}) {
  return (
    <div className="w-card animate-fadeUp">
      <div className="w-card-header">
        <div>
          <h3 className="w-card-title"><BookOpen size={18} className="text-teal" /> Metric Catalog Documentation Wiki</h3>
          <div className="w-card-subtitle">Maintain high compliance inline markdown descriptions defining operational scopes, lineage, and team ownership for auditing.</div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginTop: '1.25rem' }}>
        
        {/* Editor */}
        <div>
          <div style={{ display: 'flex', justifycontent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
            <h4 style={{ color: '#FFFFFF', fontSize: '0.9rem' }}>Markdown Documentation Editor</h4>
            <button 
              className="w-btn w-btn-success" 
              style={{ fontSize: '0.78rem', padding: '0.35rem 0.75rem' }}
              onClick={() => {
                addToast('success', 'Catalog Published', 'Metric documentation catalog updated.');
                setWikiEditMode(false);
              }}
            >
              Save Wiki edits
            </button>
          </div>
          <textarea 
            className="form-textarea" 
            style={{ minHeight: '320px', fontFamily: 'monospace', fontSize: '0.85rem', background: '#060E16', border: '1px solid rgba(255,255,255,0.06)' }}
            value={wikiContent}
            onChange={(e) => setWikiContent(e.target.value)}
          />
        </div>

        {/* Rendered HTML preview */}
        <div>
          <h4 style={{ color: '#FFFFFF', fontSize: '0.9rem', marginBottom: '0.75rem' }}>Preview Metric Wiki Catalog page</h4>
          <div className="wiki-preview">
            <h1 style={{ fontSize: '1.35rem', color: '#FFFFFF', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: '0.35rem', marginBottom: '0.75rem' }}>
              Semantic Metric: Revenue (sales_amount)
            </h1>
            <h3 style={{ color: '#FFFFFF', marginTop: '0.75rem', fontSize: '1rem' }}>Business Definition</h3>
            <p style={{ fontSize: '0.85rem', color: '#94A3B8', marginBlock: '0.5rem' }}>
              "Revenue" represents the gross monetary transaction sum generated from regional sales operations, before processing tax deductions and customer store returns.
            </p>
            <h3 style={{ color: '#FFFFFF', marginTop: '0.75rem', fontSize: '1rem' }}>Validation Constraints</h3>
            <ul style={{ margin: '0.5rem 1.25rem', fontSize: '0.85rem', color: '#94A3B8' }}>
              <li style={{ marginBottom: '0.25rem' }}><strong>Positive Value</strong>: <code>sales_amount</code> must be strictly positive (&gt; ₹0).</li>
              <li><strong>Reasonability Boundary</strong>: Any transaction exceeding <code>₹10,00,000</code> triggers senior CFO review.</li>
            </ul>
            <h3 style={{ color: '#FFFFFF', marginTop: '0.75rem', fontSize: '1rem' }}>Governance & Compliance</h3>
            <ul style={{ margin: '0.5rem 1.25rem', fontSize: '0.85rem', color: '#94A3B8' }}>
              <li style={{ marginBottom: '0.25rem' }}><strong>Compliance Class</strong>: SOX Section 404 control</li>
              <li style={{ marginBottom: '0.25rem' }}><strong>Lineage Source</strong>: Snowflake Database <code>prod_dw</code></li>
              <li><strong>Owner</strong>: CFO Office (Rahul Sharma)</li>
            </ul>
          </div>
        </div>

      </div>
    </div>
  );
}
