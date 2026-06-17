import React from 'react';
import { Plus, X, FileText } from './Icons';

export default function Templates({
  templateCategory, setTemplateCategory,
  templatesList,
  showCreateTemplate, setShowCreateTemplate,
  newTemplateName, setNewTemplateName,
  newTemplateDesc, setNewTemplateDesc,
  newTemplateCategory, setNewTemplateCategory,
  newTemplateRulesCount, setNewTemplateRulesCount,
  handleCreateTemplateSubmit,
  setValidationRules,
  addToast
}) {
  return (
    <div className="w-card animate-fadeUp">
      <div className="w-card-header">
        <div>
          <h3 className="w-card-title"><FileText size={18} className="text-teal" /> Validation Templates Library</h3>
          <div className="w-card-subtitle">Deploy pre-packaged governance rules instantly across generic accounting, customer support, and sales schemas.</div>
        </div>
        <button className="w-btn w-btn-success" onClick={() => setShowCreateTemplate(true)}>
          <Plus size={14} /> New Template
        </button>
      </div>

      {/* Filter categories */}
      <div className="cases-tabs" style={{ marginBottom: '1.5rem' }}>
        {['All', 'Financial', 'Sales', 'Customer'].map(cat => (
          <button 
            key={cat} 
            className={`case-tab ${templateCategory === cat ? 'active' : ''}`}
            onClick={() => setTemplateCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Create template form modal */}
      {showCreateTemplate && (
        <div className="w-card" style={{ background: '#0B1926', borderColor: 'var(--teal)', borderStyle: 'dashed', marginBottom: '2rem' }}>
          <div className="w-card-header">
            <h4 style={{ color: '#FFFFFF' }}>Add Custom Reusable Template</h4>
            <button style={{ background: 'transparent', border: 'none', color: '#94A3B8', cursor: 'pointer' }} onClick={() => setShowCreateTemplate(false)}>
              <X size={16} />
            </button>
          </div>
          <form onSubmit={handleCreateTemplateSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="form-group">
                <label className="form-label">Template Title</label>
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="e.g. HR Payroll Checks" 
                  value={newTemplateName} 
                  onChange={(e) => setNewTemplateName(e.target.value)} 
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">Category</label>
                <select className="form-select" value={newTemplateCategory} onChange={(e) => setNewTemplateCategory(e.target.value)}>
                  <option value="Financial">Financial</option>
                  <option value="Sales">Sales</option>
                  <option value="Customer">Customer</option>
                </select>
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Description</label>
              <input 
                type="text" 
                className="form-input" 
                placeholder="Describe constraints check and intended data usage." 
                value={newTemplateDesc} 
                onChange={(e) => setNewTemplateDesc(e.target.value)} 
              />
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
              <button type="button" className="w-btn w-btn-secondary" onClick={() => setShowCreateTemplate(false)}>
                Cancel
              </button>
              <button type="submit" className="w-btn w-btn-success">
                Save Template
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="templates-grid">
        {templatesList
          .filter(t => templateCategory === 'All' || t.category === templateCategory)
          .map(t => (
            <div key={t.id} className="template-card">
              <span className="template-category">{t.category}</span>
              <h4>{t.name}</h4>
              <p className="template-desc">{t.desc}</p>
              <div className="template-meta">
                <span>📅 Rules: <strong>{t.rules}</strong></span>
                <span>🔄 Schedule: <strong>{t.schedule}</strong></span>
              </div>
              <button 
                className="w-btn w-btn-secondary" 
                style={{ marginTop: 'auto', width: '100%' }}
                onClick={() => {
                  setValidationRules([
                    { id: 101, column: 'net_revenue', condition: 'is_positive', value: '', status: 'active' },
                    { id: 102, column: 'operating_costs', condition: 'greater_than', value: '0', status: 'active' }
                  ]);
                  addToast('success', 'Template Applied', `Set governance layer with "${t.name}" metrics.`);
                }}
              >
                Instantiate Template
              </button>
            </div>
          ))}
      </div>
    </div>
  );
}
