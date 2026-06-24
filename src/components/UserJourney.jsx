import React, { useEffect } from 'react';

export default function UserJourney() {
  
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.scroll-reveal').forEach(el => observer.observe(el));
    
    return () => observer.disconnect();
  }, []);

  return (
    <div style={{ minHeight: '100vh', background: '#0F172A', color: '#F8FAFC', paddingBottom: '100px', fontFamily: '"Inter", sans-serif' }}>
      
      {/* Header */}
      <div style={{ background: 'linear-gradient(to right, #1E293B, #0F172A)', borderBottom: '1px solid rgba(255,255,255,0.05)', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }} onClick={() => window.location.href = '/'}>
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'linear-gradient(135deg, #00BFA5 0%, #00897B 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ color: '#fff', fontWeight: 'bold', fontSize: '18px' }}>D</span>
            </div>
            <span style={{ fontSize: '20px', fontWeight: '700', letterSpacing: '-0.02em', color: '#fff' }}>DataTrust V3.0</span>
          </div>
          <button onClick={() => window.close()} style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', color: '#CBD5E1', padding: '8px 16px', borderRadius: '6px', fontSize: '14px', cursor: 'pointer', transition: 'all 0.2s' }}>
            Close Tab
          </button>
        </div>
      </div>

      {/* Hero Section */}
      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '80px 40px 40px', textAlign: 'center' }} className="scroll-reveal fade-up">
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.2)', padding: '6px 16px', borderRadius: '20px', marginBottom: '24px' }}>
          <span style={{ color: '#6366F1', fontSize: '12px', fontWeight: '600', letterSpacing: '0.05em', textTransform: 'uppercase' }}>End-to-End User Journey</span>
        </div>
        <h1 style={{ fontSize: '48px', fontWeight: '800', marginBottom: '24px', letterSpacing: '-0.03em', background: 'linear-gradient(to right, #FFFFFF, #94A3B8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Morgan's Journey: <br />From Chaos to Confidence
        </h1>
        <p style={{ fontSize: '18px', color: '#94A3B8', lineHeight: '1.6', maxWidth: '800px', margin: '0 auto' }}>
          How a Senior Finance Analyst uses the DataTrust platform end-to-end to prepare monthly board reports in 10 minutes instead of 8 hours.
        </p>
      </div>

      {/* Meet Morgan Persona Card */}
      <div style={{ maxWidth: '900px', margin: '40px auto', padding: '0 40px' }} className="scroll-reveal fade-up">
        <div style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '24px', padding: '40px', display: 'flex', gap: '40px', alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ width: '120px', height: '120px', borderRadius: '50%', background: 'linear-gradient(135deg, #6366F1, #8B5CF6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '48px', boxShadow: '0 0 40px rgba(99,102,241,0.3)' }}>
            👩‍💼
          </div>
          <div style={{ flex: 1, minWidth: '300px' }}>
            <h2 style={{ fontSize: '28px', fontWeight: '700', marginBottom: '8px', color: '#fff' }}>Morgan</h2>
            <div style={{ color: '#00BFA5', fontWeight: '600', fontSize: '16px', marginBottom: '24px' }}>Senior Finance Analyst @ XYZ Manufacturing Co.</div>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', fontSize: '14px' }}>
              <div><span style={{ color: '#94A3B8' }}>Reports to:</span> <span style={{ color: '#F8FAFC' }}>CFO (Diana Chen)</span></div>
              <div><span style={{ color: '#94A3B8' }}>Primary Tool:</span> <span style={{ color: '#F8FAFC' }}>Excel (DataTrust Add-in)</span></div>
              <div><span style={{ color: '#94A3B8' }}>Goal:</span> <span style={{ color: '#F8FAFC' }}>Trusted monthly board reports</span></div>
              <div><span style={{ color: '#94A3B8' }}>Pain:</span> <span style={{ color: '#F8FAFC' }}>8 hrs/month fixing exports & formulas</span></div>
            </div>
          </div>
        </div>
      </div>

      {/* Before vs After */}
      <div style={{ maxWidth: '900px', margin: '80px auto', padding: '0 40px' }} className="scroll-reveal fade-up">
        <h3 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '32px', textAlign: 'center' }}>Morgan's Monday: Before vs After</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
          {/* Before */}
          <div style={{ background: 'rgba(239, 68, 68, 0.05)', border: '1px solid rgba(239, 68, 68, 0.2)', borderRadius: '16px', padding: '32px' }}>
            <h4 style={{ color: '#EF4444', fontSize: '18px', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>❌</span> Before DataTrust (8 Hours)
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', fontSize: '14px', color: '#94A3B8' }}>
              <div style={{ display: 'flex', gap: '12px' }}><div style={{ color: '#F8FAFC', width: '50px' }}>09:00</div><div>Export Revenue from Power BI → CSV</div></div>
              <div style={{ display: 'flex', gap: '12px' }}><div style={{ color: '#F8FAFC', width: '50px' }}>10:00</div><div>Open Excel, copy-paste all 3 files</div></div>
              <div style={{ display: 'flex', gap: '12px' }}><div style={{ color: '#F8FAFC', width: '50px' }}>12:00</div><div>Fix broken SUMIFS formula (column shifted)</div></div>
              <div style={{ display: 'flex', gap: '12px' }}><div style={{ color: '#F8FAFC', width: '50px' }}>15:00</div><div>Revenue looks wrong — start investigating</div></div>
              <div style={{ display: 'flex', gap: '12px' }}><div style={{ color: '#F8FAFC', width: '50px' }}>18:00</div><div>Final formatting and email to CFO</div></div>
            </div>
          </div>
          {/* After */}
          <div style={{ background: 'rgba(16, 185, 129, 0.05)', border: '1px solid rgba(16, 185, 129, 0.2)', borderRadius: '16px', padding: '32px' }}>
            <h4 style={{ color: '#10B981', fontSize: '18px', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>✅</span> After DataTrust (10 Mins)
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', fontSize: '14px', color: '#94A3B8' }}>
              <div style={{ display: 'flex', gap: '12px' }}><div style={{ color: '#10B981', width: '50px' }}>09:00</div><div>Open Excel (DataTrust Add-in loaded)</div></div>
              <div style={{ display: 'flex', gap: '12px' }}><div style={{ color: '#10B981', width: '50px' }}>09:02</div><div>Click 'Refresh All' — live Snowflake data loads</div></div>
              <div style={{ display: 'flex', gap: '12px' }}><div style={{ color: '#10B981', width: '50px' }}>09:04</div><div>Auto-validation runs — all rules pass [OK]</div></div>
              <div style={{ display: 'flex', gap: '12px' }}><div style={{ color: '#10B981', width: '50px' }}>09:08</div><div>Review figures — green status on all metrics</div></div>
              <div style={{ display: 'flex', gap: '12px' }}><div style={{ color: '#10B981', width: '50px' }}>09:10</div><div>Click 'Publish Report' — audit trail attached. Done.</div></div>
            </div>
          </div>
        </div>
      </div>

      {/* Step by Step Journey */}
      <div style={{ maxWidth: '900px', margin: '80px auto', padding: '0 40px' }}>
        <h3 style={{ fontSize: '28px', fontWeight: '700', marginBottom: '40px', textAlign: 'center' }}>Step-by-Step Platform Journey</h3>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
          {/* Step 1 */}
          <div className="scroll-reveal fade-up" style={{ background: '#1E293B', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '16px', padding: '32px' }}>
            <div style={{ color: '#3B82F6', fontSize: '14px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>Step 1</div>
            <h4 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '24px' }}>Morgan Opens Excel & Loads DataTrust</h4>
            <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
              <div style={{ flex: 1, minWidth: '300px', background: 'rgba(0,0,0,0.2)', padding: '20px', borderRadius: '8px' }}>
                <div style={{ fontSize: '13px', color: '#94A3B8', marginBottom: '8px' }}>Morgan's View:</div>
                <div style={{ color: '#CBD5E1', fontSize: '14px', lineHeight: '1.6' }}>DataTrust ribbon appears automatically. Tabs visible: [Refresh] [Validate] [Publish] [Audit] [Settings].</div>
              </div>
              <div style={{ flex: 1, minWidth: '300px', background: 'rgba(59,130,246,0.05)', borderLeft: '2px solid #3B82F6', padding: '20px', borderRadius: '0 8px 8px 0' }}>
                <div style={{ fontSize: '13px', color: '#3B82F6', marginBottom: '8px' }}>Platform Action (Invisible):</div>
                <div style={{ color: '#CBD5E1', fontSize: '14px', lineHeight: '1.6' }}>Authenticates Morgan via SSO. Loads workbook metadata from Semantic Engine. Pulls metric definitions without manual login.</div>
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="scroll-reveal fade-up" style={{ background: '#1E293B', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '16px', padding: '32px' }}>
            <div style={{ color: '#00BFA5', fontSize: '14px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>Step 2</div>
            <h4 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '24px' }}>Clicks "Refresh All"</h4>
            <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
              <div style={{ flex: 1, minWidth: '300px', background: 'rgba(0,0,0,0.2)', padding: '20px', borderRadius: '8px' }}>
                <div style={{ fontSize: '13px', color: '#94A3B8', marginBottom: '8px' }}>Morgan's View:</div>
                <div style={{ color: '#CBD5E1', fontSize: '14px', lineHeight: '1.6' }}>Data is live, governed, no CSV involved. Time taken: &lt; 2 seconds.</div>
              </div>
              <div style={{ flex: 1, minWidth: '300px', background: 'rgba(0,191,165,0.05)', borderLeft: '2px solid #00BFA5', padding: '20px', borderRadius: '0 8px 8px 0' }}>
                <div style={{ fontSize: '13px', color: '#00BFA5', marginBottom: '8px' }}>Platform Action (Invisible):</div>
                <div style={{ color: '#CBD5E1', fontSize: '14px', lineHeight: '1.6' }}>Calls Semantic Engine → gets SQL. Connects to Snowflake via stored connection. Executes queries, writes data. Logs refresh event to Audit Engine.</div>
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="scroll-reveal fade-up" style={{ background: '#1E293B', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '16px', padding: '32px' }}>
            <div style={{ color: '#8B5CF6', fontSize: '14px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>Step 3</div>
            <h4 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '24px' }}>Auto-Validation & Lineage Check</h4>
            <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
              <div style={{ flex: 1, minWidth: '300px', background: 'rgba(0,0,0,0.2)', padding: '20px', borderRadius: '8px' }}>
                <div style={{ fontSize: '13px', color: '#94A3B8', marginBottom: '8px' }}>Morgan's View:</div>
                <div style={{ color: '#CBD5E1', fontSize: '14px', lineHeight: '1.6' }}>Task pane shows all rules passed. Clicks Revenue cell → [View Lineage]. Sees 8% growth is due to new West region store openings. 2-minute check, not 2-hour investigation.</div>
              </div>
              <div style={{ flex: 1, minWidth: '300px', background: 'rgba(139,92,246,0.05)', borderLeft: '2px solid #8B5CF6', padding: '20px', borderRadius: '0 8px 8px 0' }}>
                <div style={{ fontSize: '13px', color: '#8B5CF6', marginBottom: '8px' }}>Platform Action (Invisible):</div>
                <div style={{ color: '#CBD5E1', fontSize: '14px', lineHeight: '1.6' }}>Quality Engine runs 4 rules. Formula Auto-Corrector scans and fixes 1 shifted column ref silently. DataTrust fetches lineage chain from semantic engine.</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Incident Management Flow */}
      <div style={{ background: 'rgba(255,255,255,0.02)', borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)', padding: '80px 40px' }} className="scroll-reveal fade-up">
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <h3 style={{ fontSize: '28px', fontWeight: '700', marginBottom: '16px', textAlign: 'center' }}>When Anomaly Strikes: The Notification Chain</h3>
          <p style={{ textAlign: 'center', color: '#94A3B8', marginBottom: '40px' }}>What happens when the pipeline breaks? 10-minute automated team resolution.</p>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ background: '#1E293B', padding: '20px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '20px' }}>
              <div style={{ color: '#EF4444', fontWeight: '700', width: '80px' }}>08:00 AM</div>
              <div style={{ color: '#CBD5E1', fontSize: '14px' }}>Nightly pipeline runs. <b>Quality Engine</b> detects anomaly: Revenue 40% high. Root cause: Store 42 duplicates.</div>
            </div>
            <div style={{ background: '#1E293B', padding: '20px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '20px' }}>
              <div style={{ color: '#F59E0B', fontWeight: '700', width: '80px' }}>08:05 AM</div>
              <div style={{ color: '#CBD5E1', fontSize: '14px' }}><b>Alert Engine</b> sends CRITICAL Email to Morgan and Slack to Raj. Dashboard updates for Priya.</div>
            </div>
            <div style={{ background: '#1E293B', padding: '20px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '20px' }}>
              <div style={{ color: '#3B82F6', fontWeight: '700', width: '80px' }}>08:07 AM</div>
              <div style={{ color: '#CBD5E1', fontSize: '14px' }}>Raj clicks Acknowledge in DataTrust. Morgan sees acknowledgment in her email thread. No investigation needed by Morgan.</div>
            </div>
            <div style={{ background: '#1E293B', padding: '20px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '20px' }}>
              <div style={{ color: '#10B981', fontWeight: '700', width: '80px' }}>08:11 AM</div>
              <div style={{ color: '#CBD5E1', fontSize: '14px' }}>Raj applies fix in Excel via DataTrust (removes 42 rows). Clicks Resolve. DataTrust auto-reruns all rules (All Pass).</div>
            </div>
            <div style={{ background: '#1E293B', padding: '20px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '20px' }}>
              <div style={{ color: '#00BFA5', fontWeight: '700', width: '80px' }}>08:15 AM</div>
              <div style={{ color: '#CBD5E1', fontSize: '14px' }}>Morgan receives 'Alert resolved' notification. Clicks Refresh All in Excel. Publishes corrected report to Diana.</div>
            </div>
          </div>
        </div>
      </div>

      {/* The Team & Platform Surfaces */}
      <div style={{ maxWidth: '1000px', margin: '80px auto', padding: '0 40px' }} className="scroll-reveal fade-up">
        <h3 style={{ fontSize: '28px', fontWeight: '700', marginBottom: '16px', textAlign: 'center' }}>The Team & DataTrust Surfaces</h3>
        <p style={{ textAlign: 'center', color: '#94A3B8', marginBottom: '40px' }}>Who uses what across the organisation.</p>
        
        <div style={{ overflowX: 'auto', background: '#1E293B', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
            <thead>
              <tr style={{ background: 'rgba(255,255,255,0.03)', color: '#94A3B8' }}>
                <th style={{ padding: '16px 24px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>Team Member</th>
                <th style={{ padding: '16px 24px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>Role</th>
                <th style={{ padding: '16px 24px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>Primary Responsibility</th>
                <th style={{ padding: '16px 24px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>DataTrust Surfaces</th>
              </tr>
            </thead>
            <tbody style={{ color: '#CBD5E1' }}>
              <tr>
                <td style={{ padding: '16px 24px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}><b>Morgan</b></td>
                <td style={{ padding: '16px 24px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>Finance Analyst</td>
                <td style={{ padding: '16px 24px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>Report prep, data validation</td>
                <td style={{ padding: '16px 24px', borderBottom: '1px solid rgba(255,255,255,0.05)', color: '#00BFA5' }}>Excel Add-in, Audit Viewer</td>
              </tr>
              <tr>
                <td style={{ padding: '16px 24px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}><b>Raj</b></td>
                <td style={{ padding: '16px 24px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>Data Engineer</td>
                <td style={{ padding: '16px 24px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>Semantic model, anomaly monitoring</td>
                <td style={{ padding: '16px 24px', borderBottom: '1px solid rgba(255,255,255,0.05)', color: '#3B82F6' }}>Admin Console, Quality Dashboard</td>
              </tr>
              <tr>
                <td style={{ padding: '16px 24px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}><b>Priya</b></td>
                <td style={{ padding: '16px 24px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>Data Lead</td>
                <td style={{ padding: '16px 24px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>Approves rules, SLA governance</td>
                <td style={{ padding: '16px 24px', borderBottom: '1px solid rgba(255,255,255,0.05)', color: '#8B5CF6' }}>Approval Workflow, Alert Center</td>
              </tr>
              <tr>
                <td style={{ padding: '16px 24px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}><b>Diana</b></td>
                <td style={{ padding: '16px 24px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>CFO</td>
                <td style={{ padding: '16px 24px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>Reviews board reports, signs off</td>
                <td style={{ padding: '16px 24px', borderBottom: '1px solid rgba(255,255,255,0.05)', color: '#F59E0B' }}>Excel Dashboard, Approval Inbox</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Metric Definition Change - Approval Flow */}
      <div style={{ maxWidth: '900px', margin: '80px auto', padding: '0 40px' }} className="scroll-reveal fade-up">
        <h3 style={{ fontSize: '28px', fontWeight: '700', marginBottom: '16px', textAlign: 'center' }}>Approval Flow: Changing the Revenue Metric</h3>
        <p style={{ textAlign: 'center', color: '#94A3B8', marginBottom: '40px' }}>How DataTrust orchestrates changes without breaking Morgan's workflow.</p>
        
        <div style={{ position: 'relative', paddingLeft: '40px', borderLeft: '2px solid rgba(99,102,241,0.3)', display: 'flex', flexDirection: 'column', gap: '32px' }}>
          <div style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', left: '-51px', top: '0', width: '20px', height: '20px', borderRadius: '50%', background: '#3B82F6', border: '4px solid #0F172A' }}></div>
            <h4 style={{ color: '#fff', fontSize: '16px', marginBottom: '8px' }}>1. Raj Edits Semantic Model</h4>
            <div style={{ color: '#94A3B8', fontSize: '14px', background: 'rgba(255,255,255,0.02)', padding: '16px', borderRadius: '8px' }}>Raj updates Revenue definition from <code style={{color: '#EF4444'}}>SUM(gross)</code> to <code style={{color: '#10B981'}}>SUM(net) - SUM(returns)</code> and clicks Submit for Approval.</div>
          </div>
          <div style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', left: '-51px', top: '0', width: '20px', height: '20px', borderRadius: '50%', background: '#8B5CF6', border: '4px solid #0F172A' }}></div>
            <h4 style={{ color: '#fff', fontSize: '16px', marginBottom: '8px' }}>2. Priya Approves (L1)</h4>
            <div style={{ color: '#94A3B8', fontSize: '14px', background: 'rgba(255,255,255,0.02)', padding: '16px', borderRadius: '8px' }}>Approval Engine routes request to Priya. She reviews impact analysis (3 pipelines, 12 reports) and approves.</div>
          </div>
          <div style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', left: '-51px', top: '0', width: '20px', height: '20px', borderRadius: '50%', background: '#F59E0B', border: '4px solid #0F172A' }}></div>
            <h4 style={{ color: '#fff', fontSize: '16px', marginBottom: '8px' }}>3. Diana Approves (L2 - Critical Metric)</h4>
            <div style={{ color: '#94A3B8', fontSize: '14px', background: 'rgba(255,255,255,0.02)', padding: '16px', borderRadius: '8px' }}>Because Revenue is a critical metric, CFO approval is required. Diana signs off via Approval Inbox.</div>
          </div>
          <div style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', left: '-51px', top: '0', width: '20px', height: '20px', borderRadius: '50%', background: '#10B981', border: '4px solid #0F172A' }}></div>
            <h4 style={{ color: '#fff', fontSize: '16px', marginBottom: '8px' }}>4. Change Goes Live (v2.3.0)</h4>
            <div style={{ color: '#94A3B8', fontSize: '14px', background: 'rgba(255,255,255,0.02)', padding: '16px', borderRadius: '8px' }}>Morgan receives an email notification. Her next Refresh in Excel auto-applies the new logic. No broken formulas!</div>
          </div>
        </div>
      </div>

      {/* Auditor Scenario */}
      <div style={{ maxWidth: '900px', margin: '80px auto', padding: '0 40px' }} className="scroll-reveal fade-up">
        <h3 style={{ fontSize: '28px', fontWeight: '700', marginBottom: '16px', textAlign: 'center' }}>The Auditor Flow: 7 Days to 1 Hour</h3>
        <p style={{ textAlign: 'center', color: '#94A3B8', marginBottom: '40px' }}>What happens when compliance asks for historical definitions?</p>
        <div style={{ background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.05) 0%, rgba(245, 158, 11, 0.01) 100%)', border: '1px solid rgba(245, 158, 11, 0.2)', padding: '32px', borderRadius: '16px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ color: '#CBD5E1', fontSize: '14px', borderLeft: '2px solid #F59E0B', paddingLeft: '16px' }}>
              <span style={{ color: '#F59E0B', fontWeight: '700' }}>External Auditor:</span> "Provide evidence of the Revenue definition used in the June 2026 board report."
            </div>
            <div style={{ color: '#CBD5E1', fontSize: '14px', borderLeft: '2px solid #00BFA5', paddingLeft: '16px' }}>
              <span style={{ color: '#00BFA5', fontWeight: '700' }}>Diana (CFO):</span> Opens DataTrust Audit Trail Viewer. Searches 'Revenue'. Sees that v2.2.0 was used in the report, and v2.3.0 was approved 8 days later. Clicks <b>[Export Audit Report]</b>.
            </div>
            <div style={{ background: 'rgba(0,0,0,0.2)', padding: '12px', borderRadius: '8px', fontSize: '13px', color: '#94A3B8', fontStyle: 'italic' }}>
              Morgan is never disturbed. Without DataTrust, this would take 7 days of emailing and Slack searches. With DataTrust, it's resolved in 1 hour.
            </div>
          </div>
        </div>
      </div>

      {/* Complete Workflow Map */}
      <div style={{ maxWidth: '900px', margin: '80px auto', padding: '0 40px' }} className="scroll-reveal fade-up">
        <h3 style={{ fontSize: '28px', fontWeight: '700', marginBottom: '16px', textAlign: 'center' }}>Morgan's Complete End-to-End Workflow Map</h3>
        <p style={{ textAlign: 'center', color: '#94A3B8', marginBottom: '40px' }}>The full journey from opening Excel to publishing the Board Report.</p>
        
        <div style={{ background: '#0F172A', border: '1px solid rgba(255,255,255,0.1)', padding: '32px', borderRadius: '16px', fontFamily: '"Fira Code", monospace', fontSize: '13px', color: '#CBD5E1', overflowX: 'auto', whiteSpace: 'pre' }}>
{`START: Monday 09:00 AM
Morgan opens Excel (DataTrust Add-in auto-loads)
       │
       ▼
[SSO Authentication] ── DataTrust validates Morgan's identity
       │
       ▼
[Semantic Engine] ── Loads metric definitions for this template
Revenue v2.3.0, Profit v1.5.0, Units Sold v1.0.0
       │
       ▼
Morgan clicks [Refresh All]
       │
       ▼
[Live Data Connector] ── Queries Snowflake via Raj's connection
Revenue SQL → Results in < 2 seconds
       │
       ▼
[Formula Auto-Corrector] ── Scans all formulas, repairs silently
       │
       ▼
[Quality Engine] ── Runs all 4 rules automatically
       │
  ┌────┴────┐
  │ PASS? │
  └────┬────┘
  YES  │          NO
       │          └──► [Alert Engine] sends alert to Morgan + Raj
       │               Raj investigates + fixes
       │               Morgan receives: '[OK] Resolved — please refresh'
       │               Morgan clicks Refresh ──────────────────────┐
       │               ◄─────────────────────────────────────────── ┘
       ▼
[Audit Engine] ── Logs refresh, corrections, validation result
       │
       ▼
Morgan clicks [Publish Report] ── Pushes to SharePoint
       │
       ▼
[Notification Engine] ── Alerts CFO (Diana) that report is ready
       │
END: Monday 09:10 AM`}
        </div>
      </div>

      {/* ROI Section */}
      <div style={{ maxWidth: '900px', margin: '80px auto 40px', padding: '0 40px', textAlign: 'center' }} className="scroll-reveal fade-up">
        <h3 style={{ fontSize: '28px', fontWeight: '700', marginBottom: '24px' }}>Morgan's ROI & Business Impact</h3>
        <p style={{ color: '#94A3B8', fontSize: '16px', lineHeight: '1.6', marginBottom: '40px' }}>
          DataTrust doesn't just save time; it changes the quality of life for analysts, reducing stress and eliminating the "chasing numbers" culture.
        </p>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px' }}>
          <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', padding: '24px', borderRadius: '16px' }}>
            <div style={{ fontSize: '36px', fontWeight: '800', color: '#00BFA5', marginBottom: '8px' }}>14.5 hrs</div>
            <div style={{ fontSize: '14px', color: '#94A3B8' }}>Time saved per month for Morgan alone</div>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', padding: '24px', borderRadius: '16px' }}>
            <div style={{ fontSize: '36px', fontWeight: '800', color: '#8B5CF6', marginBottom: '8px' }}>₹7.4L</div>
            <div style={{ fontSize: '14px', color: '#94A3B8' }}>Annual financial savings (Morgan only)</div>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', padding: '24px', borderRadius: '16px' }}>
            <div style={{ fontSize: '36px', fontWeight: '800', color: '#3B82F6', marginBottom: '8px' }}>3x</div>
            <div style={{ fontSize: '14px', color: '#94A3B8' }}>ROI on Starter Plan for a 10-user team</div>
          </div>
        </div>
      </div>

    </div>
  );
}
