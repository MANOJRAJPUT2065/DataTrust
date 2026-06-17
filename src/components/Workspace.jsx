import React from 'react';
import { 
  Database, 
  FileText, 
  Sliders, 
  Layers, 
  GitBranch, 
  UserCheck, 
  Bell, 
  BookOpen, 
  Play, 
  ArrowLeft,
  X 
} from './Icons';

import PipelineBuilder from './PipelineBuilder';
import Templates from './Templates';
import Dependencies from './Dependencies';
import Lineage from './Lineage';
import Versioning from './Versioning';
import Approvals from './Approvals';
import Slas from './Slas';
import Wiki from './Wiki';
import Footer from './Footer';
import logoImg from '../assets/DataTrust-Logo.png';

export default function Workspace({
  setView,
  activeTab, setActiveTab,
  toasts, setToasts, removeToast, addToast,
  systemAlertLevel, setSystemAlertLevel,
  
  // Pipeline builder states
  builderStep, setBuilderStep,
  dbSource, setDbSource,
  dbTable, setDbTable,
  validationRules, setValidationRules,
  newRuleCol, setNewRuleCol,
  newRuleCond, setNewRuleCond,
  newRuleVal, setNewRuleVal,
  isValidating, validationRunLog, validationRunComplete,
  simulateAnomaly, setSimulateAnomaly,
  excelData, excelStatus, lastRefreshedExcel,
  handleAddBuilderRule, handleDeleteBuilderRule, handleRunValidation, handleExcelRefresh,

  // Templates states
  templateCategory, setTemplateCategory,
  templatesList,
  showCreateTemplate, setShowCreateTemplate,
  newTemplateName, setNewTemplateName,
  newTemplateDesc, setNewTemplateDesc,
  newTemplateCategory, setNewTemplateCategory,
  newTemplateRulesCount, setNewTemplateRulesCount,
  handleCreateTemplateSubmit,

  // Dependencies states
  dependencyRunStatus,
  blockDownstreamOnFail, setBlockDownstreamOnFail,
  allowRunOnUpstreamFail, setAllowRunOnUpstreamFail,
  handleRunDependencies,

  // Lineage states
  selectedLineageCol, setSelectedLineageCol,
  whatIfTriggered, setWhatIfTriggered,

  // Versioning states
  selectedVersionCompare, setSelectedVersionCompare,
  currentVersion,
  versionLogs,
  handleRollback,

  // Approvals states
  approvalRequests,
  newRuleRequestMetric, setNewRuleRequestMetric,
  newRuleRequestValue, setNewRuleRequestValue,
  newRuleRequestReviewer, setNewRuleRequestReviewer,
  handleCreateApprovalRequest,
  handleApproveRequest,
  handleRejectRequest,

  // SLAs states
  slaDeadline, setSlaDeadline,
  slaLatency, setSlaLatency,
  slackWebhookActive, setSlackWebhookActive,
  emailAlertsActive, setEmailAlertsActive,
  teamsWebhookActive, setTeamsWebhookActive,
  handleTestSlackWebhook,

  // Wiki states
  wikiContent, setWikiContent,
  wikiEditMode, setWikiEditMode
}) {
  return (
    <div className="workspace-layout" style={{ position: 'relative' }}>
      
      {/* CONFIDENTIAL OVERLAY TO PROTECT IP */}
      <div style={{
          position: 'fixed', inset: 0,
          backgroundColor: 'rgba(10, 10, 10, 0.85)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          zIndex: 9999,
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          color: '#fff', textAlign: 'center', padding: '20px'
      }}>
         <div style={{ fontSize: '64px', marginBottom: '20px' }}>🔒</div>
         <h2 style={{ fontSize: '32px', marginBottom: '10px', color: '#ffffff' }}>Confidential Workspace</h2>
         <p style={{ fontSize: '18px', color: '#94A3B8', maxWidth: '600px', marginBottom: '30px', lineHeight: '1.6' }}>
           To protect our intellectual property, direct access to the interactive platform is restricted. 
           Please request a private, guided walkthrough to see DataTrust in action.
         </p>
         <a href="mailto:datatrust.ai@zohomail.in" className="btn-primary" style={{ textDecoration: 'none', display: 'inline-block', padding: '12px 30px', fontSize: '16px' }}>
           Request Private Demo
         </a>
         <p style={{ marginTop: '20px', fontSize: '15px', color: '#64748B' }}>
           Or email us directly at: <strong style={{ color: '#00BFA5' }}>datatrust.ai@zohomail.in</strong>
         </p>
         
         <button onClick={() => setView('landing')} style={{ marginTop: '40px', background: 'transparent', border: '1px solid #333', color: '#fff', padding: '10px 20px', borderRadius: '4px', cursor: 'pointer', fontSize: '14px' }}>
           ← Return to Home
         </button>
      </div>

      {/* SIDEBAR NAVIGATION */}
      <aside className="workspace-sidebar">
        <div className="sidebar-brand">
          <div className="sidebar-logo" style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
            <img src={logoImg} alt="DataTrust Logo" style={{ height: '52px' }} />
          </div>
          <span className="sidebar-badge">Workspace</span>
        </div>
        
        <div className="sidebar-menu">
          <div className="menu-section-header">Core Pipeline</div>
          <div 
            className={`sidebar-item ${activeTab === 'builder' ? 'active' : ''}`}
            onClick={() => setActiveTab('builder')}
          >
            <Database size={18} />
            <span>1. Pipeline Builder</span>
          </div>

          <div className="menu-section-header">Advanced Capabilities</div>
          <div 
            className={`sidebar-item ${activeTab === 'templates' ? 'active' : ''}`}
            onClick={() => setActiveTab('templates')}
          >
            <FileText size={18} />
            <span>2. Templates</span>
          </div>
          <div 
            className={`sidebar-item ${activeTab === 'dependencies' ? 'active' : ''}`}
            onClick={() => setActiveTab('dependencies')}
          >
            <Sliders size={18} />
            <span>3. Dependencies</span>
          </div>
          <div 
            className={`sidebar-item ${activeTab === 'lineage' ? 'active' : ''}`}
            onClick={() => setActiveTab('lineage')}
          >
            <Layers size={18} />
            <span>4. Lineage & Impact</span>
          </div>
          <div 
            className={`sidebar-item ${activeTab === 'versioning' ? 'active' : ''}`}
            onClick={() => setActiveTab('versioning')}
          >
            <GitBranch size={18} />
            <span>5. Versioning & Rollback</span>
          </div>
          <div 
            className={`sidebar-item ${activeTab === 'approvals' ? 'active' : ''}`}
            onClick={() => setActiveTab('approvals')}
          >
            <UserCheck size={18} />
            <span>6. Approvals & Audit</span>
          </div>
          <div 
            className={`sidebar-item ${activeTab === 'slas' ? 'active' : ''}`}
            onClick={() => setActiveTab('slas')}
          >
            <Bell size={18} />
            <span>7. SLAs & Webhooks</span>
          </div>
          <div 
            className={`sidebar-item ${activeTab === 'wiki' ? 'active' : ''}`}
            onClick={() => setActiveTab('wiki')}
          >
            <BookOpen size={18} />
            <span>8. Documentation Wiki</span>
          </div>
        </div>
        
        <div className="sidebar-footer">
          <button className="exit-btn" onClick={() => setView('landing')}>
            <ArrowLeft size={16} /> Exit Workspace
          </button>
        </div>
      </aside>

      {/* MAIN CONTAINER */}
      <main className="workspace-container">
        {/* HEADER */}
        <header className="workspace-header">
          <div className="header-status">
            <div className="status-indicator">
              <Database size={16} className="text-gray" />
              <span>Connected: <strong className="text-white">{dbSource}</strong></span>
            </div>
            <div className="status-indicator">
              <span className={`dot-pulse ${systemAlertLevel === 'error' ? 'error' : systemAlertLevel === 'warning' ? 'warning' : ''}`}></span>
              <span>Governance Status: <strong className="text-white">{systemAlertLevel === 'error' ? 'Quality Breach' : 'Healthy'}</strong></span>
            </div>
          </div>
          
          <div className="header-actions-hub">
            <button 
              onClick={handleRunValidation} 
              disabled={isValidating}
              className="w-btn w-btn-primary"
            >
              <Play size={14} /> {isValidating ? 'Validating...' : 'Trigger Validation'}
            </button>
            
            <div className="alert-bell-container" onClick={() => addToast('info', 'Active Alert Hub', 'No unread system alerts.')}>
              <Bell size={18} className="text-gray" />
              {toasts.length > 0 && <span className="alert-badge-count">{toasts.length}</span>}
            </div>
          </div>
        </header>

        {/* BODY CONTENT */}
        <div className="workspace-body animate-fadeUp">
          {activeTab === 'builder' && (
            <PipelineBuilder 
              dbSource={dbSource} setDbSource={setDbSource}
              dbTable={dbTable} setDbTable={setDbTable}
              validationRules={validationRules}
              newRuleCol={newRuleCol} setNewRuleCol={setNewRuleCol}
              newRuleCond={newRuleCond} setNewRuleCond={setNewRuleCond}
              newRuleVal={newRuleVal} setNewRuleVal={setNewRuleVal}
              builderStep={builderStep} setBuilderStep={setBuilderStep}
              isValidating={isValidating} validationRunLog={validationRunLog} validationRunComplete={validationRunComplete}
              simulateAnomaly={simulateAnomaly} setSimulateAnomaly={setSimulateAnomaly}
              excelData={excelData} excelStatus={excelStatus} lastRefreshedExcel={lastRefreshedExcel}
              handleAddBuilderRule={handleAddBuilderRule} handleDeleteBuilderRule={handleDeleteBuilderRule}
              handleRunValidation={handleRunValidation} handleExcelRefresh={handleExcelRefresh}
            />
          )}

          {activeTab === 'templates' && (
            <Templates 
              templateCategory={templateCategory} setTemplateCategory={setTemplateCategory}
              templatesList={templatesList}
              showCreateTemplate={showCreateTemplate} setShowCreateTemplate={setShowCreateTemplate}
              newTemplateName={newTemplateName} setNewTemplateName={setNewTemplateName}
              newTemplateDesc={newTemplateDesc} setNewTemplateDesc={setNewTemplateDesc}
              newTemplateCategory={newTemplateCategory} setNewTemplateCategory={setNewTemplateCategory}
              newTemplateRulesCount={newTemplateRulesCount} setNewTemplateRulesCount={setNewTemplateRulesCount}
              handleCreateTemplateSubmit={handleCreateTemplateSubmit}
              setValidationRules={setValidationRules}
              addToast={addToast}
            />
          )}

          {activeTab === 'dependencies' && (
            <Dependencies 
              dependencyRunStatus={dependencyRunStatus}
              blockDownstreamOnFail={blockDownstreamOnFail} setBlockDownstreamOnFail={setBlockDownstreamOnFail}
              allowRunOnUpstreamFail={allowRunOnUpstreamFail} setAllowRunOnUpstreamFail={setAllowRunOnUpstreamFail}
              handleRunDependencies={handleRunDependencies}
            />
          )}

          {activeTab === 'lineage' && (
            <Lineage 
              selectedLineageCol={selectedLineageCol} setSelectedLineageCol={setSelectedLineageCol}
              whatIfTriggered={whatIfTriggered} setWhatIfTriggered={setWhatIfTriggered}
              addToast={addToast}
            />
          )}

          {activeTab === 'versioning' && (
            <Versioning 
              selectedVersionCompare={selectedVersionCompare} setSelectedVersionCompare={setSelectedVersionCompare}
              currentVersion={currentVersion}
              versionLogs={versionLogs}
              handleRollback={handleRollback}
            />
          )}

          {activeTab === 'approvals' && (
            <Approvals 
              approvalRequests={approvalRequests}
              newRuleRequestMetric={newRuleRequestMetric} setNewRuleRequestMetric={setNewRuleRequestMetric}
              newRuleRequestValue={newRuleRequestValue} setNewRuleRequestValue={setNewRuleRequestValue}
              newRuleRequestReviewer={newRuleRequestReviewer} setNewRuleRequestReviewer={setNewRuleRequestReviewer}
              handleCreateApprovalRequest={handleCreateApprovalRequest}
              handleApproveRequest={handleApproveRequest}
              handleRejectRequest={handleRejectRequest}
            />
          )}

          {activeTab === 'slas' && (
            <Slas 
              slaDeadline={slaDeadline} setSlaDeadline={setSlaDeadline}
              slaLatency={slaLatency} setSlaLatency={setSlaLatency}
              slackWebhookActive={slackWebhookActive} setSlackWebhookActive={setSlackWebhookActive}
              emailAlertsActive={emailAlertsActive} setEmailAlertsActive={setEmailAlertsActive}
              teamsWebhookActive={teamsWebhookActive} setTeamsWebhookActive={setTeamsWebhookActive}
              handleTestSlackWebhook={handleTestSlackWebhook}
            />
          )}

          {activeTab === 'wiki' && (
            <Wiki 
              wikiContent={wikiContent} setWikiContent={setWikiContent}
              wikiEditMode={wikiEditMode} setWikiEditMode={setWikiEditMode}
              addToast={addToast}
            />
          )}
        </div>
        <Footer setView={setView} />
      </main>
      
      {/* TOAST NOTIFICATIONS */}
      <div className="alert-toast-container">
        {toasts.map(t => (
          <div key={t.id} className={`alert-toast ${t.type}`}>
            <div style={{ fontSize: '1.2rem' }}>
              {t.type === 'error' ? '❌' : t.type === 'warning' ? '⚠' : 'ℹ'}
            </div>
            <div className="alert-toast-content">
              <h5>{t.title}</h5>
              <p>{t.message}</p>
            </div>
            <div className="alert-toast-close" onClick={() => removeToast(t.id)}>
              <X size={14} />
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
