import React, { useState } from 'react';
import { ArrowRight, RefreshCw, FileText, Settings, Shield, Zap, Search, Brain, Code } from './Icons';

export default function ExcelAddinDocs() {
  const [activeStep, setActiveStep] = useState(1);

  const steps = [
    {
      num: 1,
      title: "Share Manifest Directory (Network Sharing)",
      desc: "Prepare a local shared folder on Windows to host the manifest.xml file.",
      badge: "Windows Setup"
    },
    {
      num: 2,
      title: "Register Catalog in Excel Trust Center",
      desc: "Configure Microsoft Excel to trust your local network shared folder catalog.",
      badge: "Excel Settings"
    },
    {
      num: 3,
      title: "Trust Dev SSL Certificate (HTTPS Bypass)",
      desc: "Accept the self-signed SSL cert in the browser to prevent blank panel screens in Excel.",
      badge: "Browser Security"
    },
    {
      num: 4,
      title: "Sideload & Launch Add-in",
      desc: "Insert the add-in from My Add-ins and click the Ribbon button to open the live sidebar.",
      badge: "Run Add-in"
    },
    {
      num: 5,
      title: "Load Dataset & Test NLQ",
      desc: "Select tables in DataTrust Admin Console and query them using natural language inside Excel.",
      badge: "Demo Setup"
    }
  ];

  return (
    <div style={{ padding: '60px 0', background: '#0F172A', color: '#CBD5E1', fontFamily: '"Inter", sans-serif' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 20px' }}>
        
        {/* Header Section */}
        <div style={{ marginBottom: '50px' }}>
          <div style={{ display: 'inline-block', padding: '4px 12px', background: 'rgba(0, 191, 165, 0.1)', border: '1px solid rgba(0, 191, 165, 0.2)', borderRadius: '20px', color: '#00BFA5', fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '16px' }}>
            Integration Guide
          </div>
          <h2 style={{ color: '#fff', fontSize: '36px', fontWeight: '800', margin: '0 0 10px 0' }}>Excel Add-in Sideloading & Connection</h2>
          <p style={{ color: '#94A3B8', fontSize: '18px', margin: 0, lineHeight: '1.6' }}>
            Detailed, step-by-step instructions to configure and connect the live DataTrust Excel Add-in on your Windows desktop.
          </p>
        </div>

        {/* ─── OVERVIEW SUMMARY ─────────────────────────────────────── */}
        <div style={{ background: '#0A0F1D', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '16px', padding: '24px', marginBottom: '40px' }}>
          <h3 style={{ color: '#FFFFFF', fontSize: '18px', marginTop: 0, marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ color: '#00BFA5' }}>ℹ️</span> Configuration Prerequisites
          </h3>
          <p style={{ fontSize: '14px', color: '#94A3B8', margin: 0, lineHeight: '1.6' }}>
            The DataTrust Excel Add-in is built using Microsoft Office Add-in JS APIs. In desktop Excel, custom development add-ins are loaded via a <strong>Shared Folder Catalog</strong> (local network share) which references the add-in metadata manifest. The developer server serves the actual web UI panel on <code>https://localhost:3000</code>.
          </p>
        </div>

        {/* ─── INTERACTIVE STEPS NAVIGATION ─────────────────────────── */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '12px', marginBottom: '40px' }} className="steps-nav-grid">
          {steps.map((s) => (
            <button
              key={s.num}
              onClick={() => setActiveStep(s.num)}
              style={{
                background: activeStep === s.num ? 'linear-gradient(135deg, rgba(99,102,241,0.2) 0%, rgba(0,191,165,0.1) 100%)' : '#070C16',
                border: activeStep === s.num ? '1px solid #00BFA5' : '1px solid rgba(255,255,255,0.05)',
                borderRadius: '12px',
                padding: '16px',
                textAlign: 'left',
                cursor: 'pointer',
                transition: 'all 0.25s ease',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                <span style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  background: activeStep === s.num ? '#00BFA5' : 'rgba(255,255,255,0.08)',
                  color: activeStep === s.num ? '#090F16' : '#94A3B8',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '12px',
                  fontWeight: '700'
                }}>
                  {s.num}
                </span>
                <span style={{
                  fontSize: '9px',
                  fontWeight: '700',
                  textTransform: 'uppercase',
                  padding: '2px 8px',
                  borderRadius: '999px',
                  background: activeStep === s.num ? 'rgba(0,191,165,0.12)' : 'rgba(255,255,255,0.03)',
                  color: activeStep === s.num ? '#00BFA5' : '#64748B',
                  border: activeStep === s.num ? '1px solid rgba(0,191,165,0.3)' : '1px solid transparent'
                }}>
                  {s.badge}
                </span>
              </div>
              <span style={{ fontSize: '13px', fontWeight: '700', color: activeStep === s.num ? '#FFFFFF' : '#CBD5E1' }}>{s.title}</span>
            </button>
          ))}
        </div>

        {/* ─── ACTIVE STEP CONTENT RENDERER ─────────────────────────── */}
        <div style={{ background: '#070C16', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '20px', padding: '40px', minHeight: '350px', boxShadow: '0 20px 40px rgba(0,0,0,0.3)' }}>
          
          {/* STEP 1 */}
          {activeStep === 1 && (
            <div className="animate-fade">
              <h3 style={{ color: '#fff', fontSize: '22px', fontWeight: '700', marginTop: 0, marginBottom: '20px' }}>
                Step 1: Set Up & Share the Manifest Directory
              </h3>
              <p style={{ lineHeight: '1.6', color: '#94A3B8', fontSize: '14px' }}>
                Excel loads your add-in by reading a shared folder network directory where the metadata manifest XML resides. Follow these steps:
              </p>
              
              <ol style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '14px', lineHeight: '1.6', color: '#CBD5E1' }}>
                <li>
                  Create a new folder on your computer's local storage (e.g. <code>C:\OfficeAddins</code>).
                </li>
                <li>
                  Copy the add-in manifest file from your development project directory:
                  <div style={{ background: '#0D1117', padding: '10px 14px', borderRadius: '8px', fontFamily: 'monospace', fontSize: '12px', color: '#7EE7B8', border: '1px solid rgba(255,255,255,0.05)', margin: '8px 0' }}>
                    Source: C:\Users\MANOJ\dev-test\DataTrust\Frontend\public\manifest.xml
                  </div>
                  Paste the <code>manifest.xml</code> into your newly created folder <code>C:\OfficeAddins</code>.
                </li>
                <li>
                  Right-click the <code>C:\OfficeAddins</code> folder in Windows Explorer and choose <strong>Properties</strong>.
                </li>
                <li>
                  Navigate to the <strong>Sharing</strong> tab and click the <strong>Share...</strong> button.
                </li>
                <li>
                  In the share window dropdown, select <strong>Everyone</strong>, click <strong>Add</strong>, set Permission Level to <strong>Read/Write</strong>, and click <strong>Share</strong>.
                </li>
                <li>
                  Once shared, Windows will display the Network Path. Copy the full <strong>UNC Network Path</strong>. It will look like this:
                  <div style={{ background: '#0D1117', padding: '10px 14px', borderRadius: '8px', fontFamily: 'monospace', fontSize: '12px', color: '#00BFA5', border: '1px solid rgba(255,255,255,0.05)', margin: '8px 0', fontWeight: '700' }}>
                    \\YOUR-COMPUTER-NAME\OfficeAddins
                  </div>
                </li>
              </ol>

              <div style={{ marginTop: '24px', background: 'rgba(99,102,241,0.08)', borderLeft: '3px solid #6366F1', padding: '16px', borderRadius: '0 8px 8px 0' }}>
                <strong style={{ color: '#818CF8', fontSize: '13px', display: 'block', marginBottom: '4px' }}>💡 Quick Check</strong>
                <span style={{ fontSize: '13px', color: '#94A3B8', lineHeight: '1.5' }}>
                  Make sure you can access the path by copying <code>\\YOUR-COMPUTER-NAME\OfficeAddins</code>, pasting it into the Windows File Explorer address bar, and pressing Enter. You should see your <code>manifest.xml</code> file inside.
                </span>
              </div>
            </div>
          )}

          {/* STEP 2 */}
          {activeStep === 2 && (
            <div className="animate-fade">
              <h3 style={{ color: '#fff', fontSize: '22px', fontWeight: '700', marginTop: 0, marginBottom: '20px' }}>
                Step 2: Register Catalog in Excel Trust Center
              </h3>
              <p style={{ lineHeight: '1.6', color: '#94A3B8', fontSize: '14px' }}>
                Now, you must configure Microsoft Excel to trust the shared network directory as a valid source for custom developer add-ins:
              </p>

              <ol style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '14px', lineHeight: '1.6', color: '#CBD5E1' }}>
                <li>Open a blank workbook in desktop <strong>Microsoft Excel</strong>.</li>
                <li>Navigate to the top ribbon menu and select <strong>File</strong> &gt; <strong>Options</strong>.</li>
                <li>In the Excel Options dialog, choose <strong>Trust Center</strong> on the left pane, and click <strong>Trust Center Settings...</strong>.</li>
                <li>Select <strong>Trusted Add-in Catalogs</strong> on the left panel.</li>
                <li>
                  Under **Catalog URL**, paste the network share URL you copied in Step 1 (e.g. <code>\\YOUR-COMPUTER-NAME\OfficeAddins</code>).
                </li>
                <li>
                  Click the <strong>Add Catalog</strong> button.
                </li>
                <li>
                  Select the newly added catalog row in the list, check the checkbox for <strong>Show in Menu</strong>, and click <strong>OK</strong>.
                </li>
                <li>
                  Click <strong>OK</strong> to close the Trust Center and Excel Options.
                </li>
                <li>
                  <strong>Restart Excel</strong> completely to apply the catalog registrations.
                </li>
              </ol>

              <div style={{ marginTop: '24px', background: 'rgba(245,158,11,0.08)', borderLeft: '3px solid #F59E0B', padding: '16px', borderRadius: '0 8px 8px 0' }}>
                <strong style={{ color: '#F59E0B', fontSize: '13px', display: 'block', marginBottom: '4px' }}>⚠️ Crucial Requirement</strong>
                <span style={{ fontSize: '13px', color: '#94A3B8', lineHeight: '1.5' }}>
                  If you skip checking <strong>Show in Menu</strong>, the catalog folder will not appear inside Excel's Add-in dialog pane, preventing you from choosing and sideloading the DataTrust connector.
                </span>
              </div>
            </div>
          )}

          {/* STEP 3 */}
          {activeStep === 3 && (
            <div className="animate-fade">
              <h3 style={{ color: '#fff', fontSize: '22px', fontWeight: '700', marginTop: 0, marginBottom: '20px' }}>
                Step 3: Bypass Dev SSL Certificate (HTTPS Security Exception)
              </h3>
              
              <div style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', padding: '16px', borderRadius: '8px', marginBottom: '24px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ color: '#F87171', fontWeight: '700', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  🚫 Blank Screen / Security SSL Error inside Excel Sidebar?
                </div>
                <span style={{ fontSize: '13px', color: '#FCA5A5', lineHeight: '1.5' }}>
                  This is the most common issue. The Excel Add-in UI loads from <code>https://localhost:3000/addin</code>. Because the local server uses a self-signed dev SSL certificate, the internal Windows WebView2 engine will block loading the page and render a blank white sidebar screen unless the system explicitly trusts it.
                </span>
              </div>

              <h4 style={{ color: '#FFFFFF', fontSize: '15px', fontWeight: '700', marginBottom: '12px' }}>How to resolve and trust local SSL certificate:</h4>
              <ol style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '14px', lineHeight: '1.6', color: '#CBD5E1' }}>
                <li>
                  Open your web browser (Google Chrome or Microsoft Edge) on your machine.
                </li>
                <li>
                  In the address bar, go to the active developer URL:
                  <div style={{ background: '#0D1117', padding: '10px 14px', borderRadius: '8px', fontFamily: 'monospace', fontSize: '12px', color: '#6366F1', border: '1px solid rgba(255,255,255,0.05)', margin: '8px 0' }}>
                    https://localhost:3000/addin
                  </div>
                </li>
                <li>
                  You will likely see a warning screen saying: <em>"Your connection is not private"</em> or <em>"Certificate authority invalid"</em>.
                </li>
                <li>
                  Click the <strong>Advanced</strong> button on the warning page.
                </li>
                <li>
                  Click the link that says <strong>Proceed to localhost (unsafe)</strong> or <strong>Continue to site</strong>.
                </li>
                <li>
                  Once you see the DataTrust Add-in UI render in your browser window, your browser has accepted the SSL certificate exception.
                </li>
                <li>
                  Restart Microsoft Excel to ensure the internal Edge WebView2 runtime picks up this SSL trust exception from the system.
                </li>
              </ol>
            </div>
          )}

          {/* STEP 4 */}
          {activeStep === 4 && (
            <div className="animate-fade">
              <h3 style={{ color: '#fff', fontSize: '22px', fontWeight: '700', marginTop: 0, marginBottom: '20px' }}>
                Step 4: Sideload & Launch the Add-in in Excel
              </h3>
              <p style={{ lineHeight: '1.6', color: '#94A3B8', fontSize: '14px' }}>
                Everything is configured! Now sideload the add-in and load the live connection ribbon:
              </p>

              <ol style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '14px', lineHeight: '1.6', color: '#CBD5E1' }}>
                <li>Open a workbook in Excel. Make sure the local developer servers are running in the terminal.</li>
                <li>
                  Go to the <strong>Insert</strong> tab on the Excel main menu and select <strong>My Add-ins</strong> or <strong>Add-ins</strong>.
                </li>
                <li>
                  In the Office Add-ins dialog, select the <strong>SHARED FOLDER</strong> tab at the top.
                </li>
                <li>
                  Select the card titled <strong>DataTrust Connector</strong> and click the <strong>Add</strong> button.
                </li>
                <li>
                  You should see a new tab titled <strong>DataTrust</strong> load in the Excel Ribbon menu on the top right!
                </li>
                <li>
                  Click the <strong>DataTrust</strong> tab and click the <strong>Open DataTrust</strong> button.
                </li>
                <li>
                  The DataTrust sidebar taskpane will slide open on the right, connecting to the live governance dashboard!
                </li>
              </ol>

              <div style={{ marginTop: '24px', background: 'rgba(16,185,129,0.08)', borderLeft: '3px solid #10B981', padding: '16px', borderRadius: '0 8px 8px 0', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <strong style={{ color: '#10B981', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span>✓</span> Verification Successful
                </strong>
                <span style={{ fontSize: '13px', color: '#94A3B8', lineHeight: '1.5' }}>
                  You are now connected to the semantic layer model and can run one-click data updates, trigger quality validations, and search metrics using plain-English queries.
                </span>
              </div>
            </div>
          )}

          {/* STEP 5 */}
          {activeStep === 5 && (
            <div className="animate-fade">
              <h3 style={{ color: '#fff', fontSize: '22px', fontWeight: '700', marginTop: 0, marginBottom: '20px' }}>
                Step 5: Load Demo Dataset & Test NLQ (No-Code UI Flow)
              </h3>
              <p style={{ lineHeight: '1.6', color: '#94A3B8', fontSize: '14px' }}>
                Follow this step-by-step guide to load the DataTrust Demo training pack and test the entire ecosystem without writing a single line of SQL:
              </p>

              <h4 style={{ color: '#FFFFFF', fontSize: '15px', fontWeight: '700', marginTop: '20px', marginBottom: '12px' }}>1. Configure Connection & Select Datasets</h4>
              <ol style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '14px', lineHeight: '1.6', color: '#CBD5E1', marginBottom: '20px' }}>
                <li>Open the <strong>DataTrust Admin Console</strong>.</li>
                <li>Navigate to the <strong>Connections</strong> tab.</li>
                <li>Select your Snowflake connection and click on <strong>Select Ingestion Tables</strong>.</li>
                <li>
                  Check all 10 unified datasets:
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px', margin: '8px 0', fontSize: '12px', color: '#00BFA5', fontFamily: 'monospace' }}>
                    <div>☑ DIM_METRIC</div>
                    <div>☑ DIM_RULE</div>
                    <div>☑ DIM_PIPELINE</div>
                    <div>☑ DIM_TEMPLATE</div>
                    <div>☑ DIM_PATTERN</div>
                    <div>☑ FACT_QUALITY_VIOLATION</div>
                    <div>☑ FACT_USER_ACTION</div>
                    <div>☑ FACT_TIMESERIES</div>
                    <div>☑ FACT_NLQ_QUERY</div>
                    <div>☑ META_SCHEMA</div>
                  </div>
                </li>
                <li>Click <strong>Save Selection</strong>.</li>
                <li>Go to the <strong>Semantic Layer</strong> tab and click the 🔄 <strong>Sync</strong> button to auto-cache the metadata and column catalog.</li>
              </ol>

              <h4 style={{ color: '#FFFFFF', fontSize: '15px', fontWeight: '700', marginBottom: '12px' }}>2. Configure Semantic Layers & Metrics</h4>
              <ol style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '14px', lineHeight: '1.6', color: '#CBD5E1', marginBottom: '20px' }}>
                <li>Go to <strong>Semantic Layer</strong> &gt; <strong>New Metric</strong>.</li>
                <li>
                  Fill out the form:
                  <ul style={{ listStyleType: 'circle', paddingLeft: '20px', margin: '6px 0', color: '#94A3B8' }}>
                    <li><strong>Metric Name:</strong> Revenue</li>
                    <li><strong>Source Table:</strong> <code>FACT_TIMESERIES</code></li>
                    <li><strong>Column:</strong> <code>total_revenue</code></li>
                    <li><strong>Aggregation:</strong> SUM</li>
                  </ul>
                </li>
                <li>Click <strong>Save Metric</strong>.</li>
                <li>Go to the <strong>Relationships</strong> tab &gt; click <strong>Add Relationship</strong>:</li>
                <div style={{ background: '#0D1117', padding: '10px', borderRadius: '8px', fontSize: '12px', fontFamily: 'monospace', color: '#818CF8', margin: '6px 0' }}>
                  From: FACT_QUALITY_VIOLATION.rule_name &rarr; To: DIM_RULE.rule_name (Type: Foreign Key)
                </div>
              </ol>

              <h4 style={{ color: '#FFFFFF', fontSize: '15px', fontWeight: '700', marginBottom: '12px' }}>3. Test Quality Rules & NLQ in Excel</h4>
              <ol style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '14px', lineHeight: '1.6', color: '#CBD5E1' }}>
                <li>Go to <strong>Quality Engine</strong> &gt; <strong>Run Validation</strong> to trigger a schema-wide scan.</li>
                <li>Open the <strong>Excel Add-in</strong> sidebar on your desktop workbook.</li>
                <li>
                  In the NLQ search ribbon, ask a plain-English question:
                  <div style={{ background: '#0D1117', padding: '10px 14px', borderRadius: '8px', fontFamily: 'monospace', fontSize: '13px', color: '#FCD34D', border: '1px solid rgba(255,255,255,0.05)', margin: '8px 0', fontStyle: 'italic' }}>
                    "What was total revenue in January?"
                  </div>
                </li>
                <li>
                  The system will automatically parse the question, map it to the semantic layer, execute the SQL query on Snowflake, and load the correct numbers directly into your spreadsheet cell!
                </li>
              </ol>
            </div>
          )}

        </div>

        {/* ─── TROUBLESHOOTING DETAILS ──────────────────────────────── */}
        <div style={{ marginTop: '50px' }}>
          <h3 style={{ color: '#fff', fontSize: '20px', fontWeight: '700', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ color: '#EF4444' }}>🛠️</span> Troubleshooting Tips
          </h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ background: '#0A0F1D', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '12px', padding: '20px' }}>
              <strong style={{ color: '#fff', fontSize: '14px', display: 'block', marginBottom: '6px' }}>
                Add-ins button disabled / My Add-ins missing?
              </strong>
              <span style={{ fontSize: '13px', color: '#94A3B8', lineHeight: '1.6' }}>
                Ensure you are logged in to Microsoft Office with your account. If you are using a work computer with strict security rules (group policies), custom add-ins sideloading might be restricted by your IT administrator.
              </span>
            </div>

            <div style={{ background: '#0A0F1D', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '12px', padding: '20px' }}>
              <strong style={{ color: '#fff', fontSize: '14px', display: 'block', marginBottom: '6px' }}>
                Error Code: 1001 or "The address is invalid"?
              </strong>
              <span style={{ fontSize: '13px', color: '#94A3B8', lineHeight: '1.6' }}>
                Check if your local frontend server is running. In your workspace folder, run <code>npm run dev</code> inside the Frontend directory and verify it is running on port 3000 (<code>http://localhost:3000</code> or <code>https://localhost:3000</code>).
              </span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
