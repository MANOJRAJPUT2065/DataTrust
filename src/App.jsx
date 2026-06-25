import React, { useState, useEffect } from 'react';
import LandingPage from './components/LandingPage';
import Version3 from './components/Version3';
import Workspace from './components/Workspace';
import PrivacyPolicy from './components/LegalPrivacy';
import TermsOfService from './components/LegalTerms';
import HowItWorks from './components/HowItWorks';
import UserJourney from './components/UserJourney';
import ArchitectureHLD from './components/ArchitectureHLD';
import MetadataSyncHLD from './components/MetadataSyncHLD';
import SemanticEngineHLD from './components/SemanticEngineHLD';
import PostSyncArchitecture from './components/PostSyncArchitecture';
import RedisSyncHLD from './components/RedisSyncHLD';

export default function App() {
  const [view, setView] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get('view') || 'landing';
  });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (view === 'landing') {
      params.delete('view');
    } else {
      params.set('view', view);
    }
    const newUrl = params.toString() ? `${window.location.pathname}?${params.toString()}` : window.location.pathname;
    window.history.replaceState({}, '', newUrl);
  }, [view]);

  
  const [activeTab, setActiveTab] = useState('builder');
  
  // Toast Notifications State
  const [toasts, setToasts] = useState([
    { id: 1, type: 'warning', title: 'Latency Warning', message: 'Sales reporting pipeline approaching 5 min SLA threshold.' }
  ]);

  // Global Alert State
  const [systemAlertLevel, setSystemAlertLevel] = useState('ok'); // 'ok' | 'warning' | 'error'

  // --- Phase 1 Pipeline Builder State ---
  const [builderStep, setBuilderStep] = useState(1);
  const [dbSource, setDbSource] = useState('Snowflake');
  const [dbTable, setDbTable] = useState('sales_transactions');
  const [validationRules, setValidationRules] = useState([
    { id: 1, column: 'sales_amount', condition: 'is_positive', value: '', status: 'active' },
    { id: 2, column: 'units', condition: 'greater_than', value: '0', status: 'active' },
    { id: 3, column: 'region', condition: 'not_null', value: '', status: 'active' }
  ]);
  const [newRuleCol, setNewRuleCol] = useState('sales_amount');
  const [newRuleCond, setNewRuleCond] = useState('is_positive');
  const [newRuleVal, setNewRuleVal] = useState('');
  
  const [isValidating, setIsValidating] = useState(false);
  const [validationRunLog, setValidationRunLog] = useState([]);
  const [validationRunComplete, setValidationRunComplete] = useState(false);
  
  const [simulateAnomaly, setSimulateAnomaly] = useState(false);
  
  // Mock spreadsheet data
  const [excelData, setExcelData] = useState([
    { id: 1, region: 'North', revenue: '₹4.2 Cr', units: '8,400', status: '✓ OK', rowClass: 'ok' },
    { id: 2, region: 'South', revenue: '₹3.8 Cr', units: '7,600', status: '✓ OK', rowClass: 'ok' },
    { id: 3, region: 'West', revenue: '₹1.1 Cr', units: '6,200', status: '✓ OK', rowClass: 'ok' },
    { id: 4, region: 'East', revenue: '₹2.9 Cr', units: '5,800', status: '✓ OK', rowClass: 'ok' }
  ]);
  const [excelStatus, setExcelStatus] = useState('validated'); // 'loading' | 'validated' | 'alert'
  const [lastRefreshedExcel, setLastRefreshedExcel] = useState('09:02 AM');

  // --- Phase 2: 1. Templates State ---
  const [templateCategory, setTemplateCategory] = useState('All');
  const [templatesList, setTemplatesList] = useState([
    { id: 1, name: '📊 Monthly Financial Reporting', desc: 'Complete monthly financial validation rules covering revenue totals, compliance tags, and growth thresholds.', rules: 5, schedule: 'Monthly', category: 'Financial', usage: 12 },
    { id: 2, name: '📈 Sales Dashboard Validation', desc: 'Validate daily transaction feeds from Snowflake ensuring no duplicates and correct formatting before syncing dashboard.', rules: 4, schedule: 'Daily', category: 'Sales', usage: 8 },
    { id: 3, name: '👤 Customer Master Quality', desc: 'Ensures completeness, referential integrity, and correct contact format standards for enterprise customer logs.', rules: 6, schedule: 'Weekly', category: 'Customer', usage: 6 },
    { id: 4, name: '💰 Budget & Ledger Verification', desc: 'Verifies journal balance sheet constraints and flags anomalies in operational expenses vs allocations.', rules: 8, schedule: 'Quarterly', category: 'Financial', usage: 3 }
  ]);
  const [showCreateTemplate, setShowCreateTemplate] = useState(false);
  const [newTemplateName, setNewTemplateName] = useState('');
  const [newTemplateDesc, setNewTemplateDesc] = useState('');
  const [newTemplateCategory, setNewTemplateCategory] = useState('Financial');
  const [newTemplateRulesCount, setNewTemplateRulesCount] = useState(5);

  // --- Phase 2: 2. Dependencies State ---
  const [dependencyRunStatus, setDependencyRunStatus] = useState('idle'); // idle | running | success | blocked
  const [blockDownstreamOnFail, setBlockDownstreamOnFail] = useState(true);
  const [allowRunOnUpstreamFail, setAllowRunOnUpstreamFail] = useState(false);

  // --- Phase 2: 3. Lineage State ---
  const [selectedLineageCol, setSelectedLineageCol] = useState('sales_amount');
  const [whatIfTriggered, setWhatIfTriggered] = useState(false);

  // --- Phase 2: 4. Versioning & Rollback State ---
  const [selectedVersionCompare, setSelectedVersionCompare] = useState('v1.2.0');
  const [currentVersion, setCurrentVersion] = useState('v1.2.0');
  const [versionLogs, setVersionLogs] = useState([
    { id: 1, version: 'v1.2.0', date: '2026-06-15 11:20 AM', author: 'Rahul Sharma (Data Eng)', comment: 'Added positive validation check for transaction sales_amount' },
    { id: 2, version: 'v1.1.1', date: '2026-06-10 03:45 PM', author: 'Neha Patel (Fin Analyst)', comment: 'Updated max sales upper bound checks' },
    { id: 3, version: 'v1.1.0', date: '2026-05-28 09:10 AM', author: 'Amit Goel (Data Eng)', comment: 'Initial pipeline schema rules deployment' }
  ]);

  // --- Phase 2: 5. Approval Workflows State ---
  const [approvalRequests, setApprovalRequests] = useState([
    { id: 1, metric: 'Store ID Format', ruleType: 'regex_match', value: '^ST-\\d{3}$', status: 'pending', requestedBy: 'Amit Goel', date: '2026-06-16 09:30 AM', reviews: [] }
  ]);
  const [newRuleRequestMetric, setNewRuleRequestMetric] = useState('');
  const [newRuleRequestValue, setNewRuleRequestValue] = useState('');
  const [newRuleRequestReviewer, setNewRuleRequestReviewer] = useState('CFO Office');

  // --- Phase 2: 6. SLAs & Monitoring State ---
  const [slaDeadline, setSlaDeadline] = useState('08:00 AM');
  const [slaLatency, setSlaLatency] = useState(5); // in minutes
  const [slackWebhookActive, setSlackWebhookActive] = useState(true);
  const [emailAlertsActive, setEmailAlertsActive] = useState(true);
  const [teamsWebhookActive, setTeamsWebhookActive] = useState(false);

  // --- Phase 2: 7. Documentation Wiki State ---
  const [wikiContent, setWikiContent] = useState(
    `# Semantic Metric: Revenue (sales_amount)\n\n## Business Definition\n"Revenue" represents the gross monetary transaction sum generated from regional sales operations, before processing tax deductions and customer store returns.\n\n## Validation Constraints\n* **Positive Value**: \`sales_amount\` must be strictly positive (> ₹0).\n* **Reasonability Boundary**: Any individual transaction exceeding \`₹10,00,000\` requires senior CFO sign-off.\n\n## Governance & Compliance\n* **Compliance Class**: SOX Section 404 Financial Disclosure Audit Control\n* **Lineage Source**: Snowflake Database \`prod_dw\` -> Schema \`analytics_sales\` -> Table \`sales_transactions\`\n* **Data Owner**: Chief Financial Officer (CFO) Office (Rahul Sharma)`
  );
  const [wikiEditMode, setWikiEditMode] = useState(false);

  // Auto-remove toasts helper
  const addToast = (type, title, message) => {
    const newToast = { id: Date.now(), type, title, message };
    setToasts(prev => [...prev, newToast]);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Run validation process simulator
  const handleRunValidation = () => {
    setIsValidating(true);
    setValidationRunComplete(false);
    setValidationRunLog([]);

    let logEntries = [
      { text: 'Initializing Snowflake secure handshake...', type: 'info' },
      { text: `Connecting to database schema analytics_sales...`, type: 'info' },
      { text: `Fetching schemas for target table: ${dbTable}`, type: 'info' },
      { text: `Running anomaly-inference matrix rules...`, type: 'info' }
    ];

    let index = 0;
    const interval = setInterval(() => {
      if (index < logEntries.length) {
        setValidationRunLog(prev => [...prev, logEntries[index]]);
        index++;
      } else {
        clearInterval(interval);
        
        // Finalize validation run result
        if (simulateAnomaly) {
          setValidationRunLog(prev => [
            ...prev,
            { text: '⚠️ [ANOMALY DETECTED] West Region revenue anomaly flagged: units vs sales ratio violates rule units > 0.', type: 'error' },
            { text: '❌ Pipeline validation finished with critical alerts. Slack/Email webhooks triggered.', type: 'error' }
          ]);
          setSystemAlertLevel('error');
          addToast('error', 'Critical Quality Breach', 'West Region units ratio failed validation constraints.');
        } else {
          setValidationRunLog(prev => [
            ...prev,
            { text: '✓ Rule check: sales_amount is positive [PASSED]', type: 'success' },
            { text: '✓ Rule check: units > 0 [PASSED]', type: 'success' },
            { text: '✓ Rule check: region not null [PASSED]', type: 'success' },
            { text: '✓ Handshake completed. 0 anomalies detected. Publishing status state.', type: 'success' }
          ]);
          setSystemAlertLevel('ok');
          addToast('success', 'Pipeline OK', 'All semantic layer checks completed successfully.');
        }
        
        setIsValidating(false);
        setValidationRunComplete(true);
      }
    }, 1000);
  };

  // Handle excel refresh button click
  const handleExcelRefresh = () => {
    setExcelStatus('loading');
    setTimeout(() => {
      const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      setLastRefreshedExcel(time);
      
      if (systemAlertLevel === 'error') {
        setExcelData([
          { id: 1, region: 'North', revenue: '₹4.2 Cr', units: '8,400', status: '✓ OK', rowClass: 'ok' },
          { id: 2, region: 'South', revenue: '₹3.8 Cr', units: '7,600', status: '✓ OK', rowClass: 'ok' },
          { id: 3, region: 'West', revenue: '₹1.1 Cr', units: '6,200', status: '⚠ Review', rowClass: 'warn' },
          { id: 4, region: 'East', revenue: '₹2.9 Cr', units: '5,800', status: '✓ OK', rowClass: 'ok' }
        ]);
        setExcelStatus('alert');
        addToast('warning', 'Review Triggered in Excel', 'Spreadsheet imported 1 flagged warning row.');
      } else {
        setExcelData([
          { id: 1, region: 'North', revenue: '₹4.2 Cr', units: '8,400', status: '✓ OK', rowClass: 'ok' },
          { id: 2, region: 'South', revenue: '₹3.8 Cr', units: '7,600', status: '✓ OK', rowClass: 'ok' },
          { id: 3, region: 'West', revenue: '₹1.1 Cr', units: '6,200', status: '✓ OK', rowClass: 'ok' },
          { id: 4, region: 'East', revenue: '₹2.9 Cr', units: '5,800', status: '✓ OK', rowClass: 'ok' }
        ]);
        setExcelStatus('validated');
      }
    }, 1200);
  };

  // Add pipeline rule in step 2
  const handleAddBuilderRule = (e) => {
    e.preventDefault();
    const newRuleObj = {
      id: Date.now(),
      column: newRuleCol,
      condition: newRuleCond,
      value: newRuleVal,
      status: 'active'
    };
    setValidationRules([...validationRules, newRuleObj]);
    setNewRuleVal('');
    addToast('success', 'Rule Configured', `Added constraint check for ${newRuleCol}.`);
  };

  // Delete builder rule
  const handleDeleteBuilderRule = (id) => {
    setValidationRules(validationRules.filter(r => r.id !== id));
  };

  // Create Template form handler
  const handleCreateTemplateSubmit = (e) => {
    e.preventDefault();
    if (!newTemplateName) return;
    const newT = {
      id: Date.now(),
      name: newTemplateName,
      desc: newTemplateDesc || 'Custom validation pipeline template.',
      category: newTemplateCategory,
      rules: Number(newTemplateRulesCount),
      schedule: 'Daily',
      usage: 0
    };
    setTemplatesList([newT, ...templatesList]);
    setNewTemplateName('');
    setNewTemplateDesc('');
    setShowCreateTemplate(false);
    addToast('success', 'Template Created', `New template "${newT.name}" registered successfully.`);
  };

  // Run Dependency simulation
  const handleRunDependencies = () => {
    setDependencyRunStatus('running');
    addToast('info', 'Executing Dependency DAG', 'Triggering Sales Ingestion Pipeline...');
    
    setTimeout(() => {
      if (allowRunOnUpstreamFail) {
        setDependencyRunStatus('success');
        addToast('success', 'Execution Complete', 'Downstream published successfully.');
      } else {
        setDependencyRunStatus('blocked');
        addToast('error', 'Dependency Blocked', 'Data Validation failed. Upstream pipeline blocked downstream publishing.');
      }
    }, 2000);
  };

  // Approval actions
  const handleCreateApprovalRequest = (e) => {
    e.preventDefault();
    if (!newRuleRequestMetric) return;
    const reqObj = {
      id: Date.now(),
      metric: newRuleRequestMetric,
      ruleType: 'CFO Constraint',
      value: newRuleRequestValue || 'Validate',
      status: 'pending',
      requestedBy: 'You',
      date: new Date().toISOString().split('T')[0] + ' 10:00 AM',
      reviews: [{ reviewer: newRuleRequestReviewer, status: 'pending' }]
    };
    setApprovalRequests([reqObj, ...approvalRequests]);
    setNewRuleRequestMetric('');
    setNewRuleRequestValue('');
    addToast('success', 'Review Requested', 'Review proposal forwarded to stakeholders.');
  };

  const handleApproveRequest = (id) => {
    setApprovalRequests(prev => prev.map(req => {
      if (req.id === id) {
        addToast('success', 'Rule Proposal Approved', 'Metric definition updated in semantic layer.');
        return { ...req, status: 'approved' };
      }
      return req;
    }));
  };

  const handleRejectRequest = (id) => {
    setApprovalRequests(prev => prev.map(req => {
      if (req.id === id) {
        addToast('error', 'Rule Proposal Rejected', 'Rule change rejected.');
        return { ...req, status: 'rejected' };
      }
      return req;
    }));
  };

  // SLA test Slack notification simulation
  const handleTestSlackWebhook = () => {
    addToast('success', 'Slack Integration Triggered', 'Simulated alert dispatched to #data-quality-alerts.');
  };

  // Rollback trigger
  const handleRollback = () => {
    setCurrentVersion(selectedVersionCompare);
    addToast('warning', 'Configuration Rollback Complete', `Governance rules reverted to ${selectedVersionCompare}.`);
  };

  return (
    <div className="app-root">
      {view === 'landing' ? (
        <LandingPage onEnterWorkspace={() => window.open(window.location.pathname + '?view=workspace', '_blank')} setView={setView} />
      ) : view === 'v3' ? (
        <Version3 onEnterWorkspace={() => window.open(window.location.pathname + '?view=workspace', '_blank')} setView={setView} />
      ) : view === 'how-it-works' ? (
        <HowItWorks />
      ) : view === 'user-journey' ? (
        <UserJourney />
      ) : view === 'architecture-hld' ? (
        <ArchitectureHLD />
      ) : view === 'metadata-sync' ? (
        <MetadataSyncHLD />
      ) : view === 'semantic-engine' ? (
        <SemanticEngineHLD />
      ) : view === 'post-sync-arch' ? (
        <PostSyncArchitecture />
      ) : view === 'redis-sync' ? (
        <RedisSyncHLD />
      ) : view === 'version3' ? (
        <Version3 />
      ) : view === 'privacy' ? (
        <PrivacyPolicy setView={setView} />
      ) : view === 'terms' ? (
        <TermsOfService setView={setView} />
      ) : (
        <Workspace 
          setView={setView}
          activeTab={activeTab} setActiveTab={setActiveTab}
          toasts={toasts} setToasts={setToasts} removeToast={removeToast} addToast={addToast}
          systemAlertLevel={systemAlertLevel} setSystemAlertLevel={setSystemAlertLevel}
          
          builderStep={builderStep} setBuilderStep={setBuilderStep}
          dbSource={dbSource} setDbSource={setDbSource}
          dbTable={dbTable} setDbTable={setDbTable}
          validationRules={validationRules} setValidationRules={setValidationRules}
          newRuleCol={newRuleCol} setNewRuleCol={setNewRuleCol}
          newRuleCond={newRuleCond} setNewRuleCond={setNewRuleCond}
          newRuleVal={newRuleVal} setNewRuleVal={setNewRuleVal}
          isValidating={isValidating} validationRunLog={validationRunLog} validationRunComplete={validationRunComplete}
          simulateAnomaly={simulateAnomaly} setSimulateAnomaly={setSimulateAnomaly}
          excelData={excelData} excelStatus={excelStatus} lastRefreshedExcel={lastRefreshedExcel}
          handleAddBuilderRule={handleAddBuilderRule} handleDeleteBuilderRule={handleDeleteBuilderRule}
          handleRunValidation={handleRunValidation} handleExcelRefresh={handleExcelRefresh}

          templateCategory={templateCategory} setTemplateCategory={setTemplateCategory}
          templatesList={templatesList}
          showCreateTemplate={showCreateTemplate} setShowCreateTemplate={setShowCreateTemplate}
          newTemplateName={newTemplateName} setNewTemplateName={setNewTemplateName}
          newTemplateDesc={newTemplateDesc} setNewTemplateDesc={setNewTemplateDesc}
          newTemplateCategory={newTemplateCategory} setNewTemplateCategory={setNewTemplateCategory}
          newTemplateRulesCount={newTemplateRulesCount} setNewTemplateRulesCount={setNewTemplateRulesCount}
          handleCreateTemplateSubmit={handleCreateTemplateSubmit}

          dependencyRunStatus={dependencyRunStatus}
          blockDownstreamOnFail={blockDownstreamOnFail} setBlockDownstreamOnFail={setBlockDownstreamOnFail}
          allowRunOnUpstreamFail={allowRunOnUpstreamFail} setAllowRunOnUpstreamFail={setAllowRunOnUpstreamFail}
          handleRunDependencies={handleRunDependencies}

          selectedLineageCol={selectedLineageCol} setSelectedLineageCol={setSelectedLineageCol}
          whatIfTriggered={whatIfTriggered} setWhatIfTriggered={setWhatIfTriggered}

          selectedVersionCompare={selectedVersionCompare} setSelectedVersionCompare={setSelectedVersionCompare}
          currentVersion={currentVersion}
          versionLogs={versionLogs}
          handleRollback={handleRollback}

          approvalRequests={approvalRequests}
          newRuleRequestMetric={newRuleRequestMetric} setNewRuleRequestMetric={setNewRuleRequestMetric}
          newRuleRequestValue={newRuleRequestValue} setNewRuleRequestValue={setNewRuleRequestValue}
          newRuleRequestReviewer={newRuleRequestReviewer} setNewRuleRequestReviewer={setNewRuleRequestReviewer}
          handleCreateApprovalRequest={handleCreateApprovalRequest}
          handleApproveRequest={handleApproveRequest}
          handleRejectRequest={handleRejectRequest}

          slaDeadline={slaDeadline} setSlaDeadline={setSlaDeadline}
          slaLatency={slaLatency} setSlaLatency={setSlaLatency}
          slackWebhookActive={slackWebhookActive} setSlackWebhookActive={setSlackWebhookActive}
          emailAlertsActive={emailAlertsActive} setEmailAlertsActive={setEmailAlertsActive}
          teamsWebhookActive={teamsWebhookActive} setTeamsWebhookActive={setTeamsWebhookActive}
          handleTestSlackWebhook={handleTestSlackWebhook}

          wikiContent={wikiContent} setWikiContent={setWikiContent}
          wikiEditMode={wikiEditMode} setWikiEditMode={setWikiEditMode}
        />
      )}
    </div>
  );
}
