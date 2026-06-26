import React, { useState, useEffect, useRef } from 'react';

const CodeBlock = ({ title, code, language = 'text' }) => {
  const [expanded, setExpanded] = useState(false);
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    alert('Code copied to clipboard!');
  };

  let colorizedCode = code;
  if (language === 'text') {
    colorizedCode = code
      .replace(/([┌┬┐├┼┤└┴┘─│]+)/g, '<span style="color: #6366F1; opacity: 0.7;">$1</span>')
      .replace(/(INPUT:|PROCESS:|OUTPUT:|USER:|STEP \d+:)/g, '<span style="color: #10B981; font-weight: 700;">$1</span>')
      .replace(/(User metric save kare|FastAPI|PostgreSQL|Upstash Redis|sync\.py|React Query)/g, '<span style="color: #F59E0B; font-weight: 700;">$1</span>')
      .replace(/(↓)/g, '<span style="color: #EC4899; font-weight: 700;">$1</span>');
  }

  return (
    <div style={{ marginBottom: '40px', background: 'linear-gradient(145deg, #0F172A 0%, #1E293B 100%)', borderRadius: '16px', border: '1px solid rgba(99,102,241,0.2)', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.4)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 20px', background: 'rgba(0,0,0,0.4)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#EF4444' }}></div>
          <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#F59E0B' }}></div>
          <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#10B981' }}></div>
          <div style={{ color: '#94A3B8', fontSize: '13px', fontFamily: '"Fira Code", monospace', marginLeft: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ color: '#6366F1' }}>⚡</span> {title}
          </div>
        </div>
        <button 
          onClick={copyToClipboard}
          style={{ background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.3)', color: '#818CF8', padding: '6px 14px', borderRadius: '6px', fontSize: '12px', cursor: 'pointer', transition: 'all 0.2s ease', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '6px' }}
        >
          Copy Code
        </button>
      </div>
      
      <div style={{ position: 'relative' }}>
        {language === 'text' ? (
          <div style={{ 
            padding: '24px 32px', 
            overflowX: 'auto', 
            fontFamily: '"Fira Code", "Consolas", monospace', 
            fontSize: '14px', 
            lineHeight: '1.6', 
            color: '#E2E8F0', 
            whiteSpace: 'pre',
            maxHeight: expanded ? 'none' : '400px',
            overflowY: expanded ? 'visible' : 'hidden',
            transition: 'max-height 0.3s ease'
          }}
          dangerouslySetInnerHTML={{ __html: colorizedCode }}
          />
        ) : (
          <div style={{ 
            padding: '24px 32px', 
            overflowX: 'auto', 
            fontFamily: '"Fira Code", "Consolas", monospace', 
            fontSize: '14px', 
            lineHeight: '1.6', 
            color: '#E2E8F0', 
            whiteSpace: 'pre',
            maxHeight: expanded ? 'none' : '400px',
            overflowY: expanded ? 'visible' : 'hidden',
            transition: 'max-height 0.3s ease'
          }}>
            {code}
          </div>
        )}
        
        {!expanded && (
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '120px',
            background: 'linear-gradient(to bottom, transparent, #1E293B)',
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'center',
            paddingBottom: '20px'
          }}>
            <button 
              onClick={() => setExpanded(true)}
              style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', padding: '8px 24px', borderRadius: '20px', color: '#fff', cursor: 'pointer', backdropFilter: 'blur(4px)', fontWeight: '500' }}
            >
              Show Full Content ↓
            </button>
          </div>
        )}
      </div>

      {expanded && (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '16px', borderTop: '1px solid rgba(255,255,255,0.05)', background: 'rgba(0,0,0,0.2)' }}>
           <button 
              onClick={() => setExpanded(false)}
              style={{ background: 'transparent', border: 'none', color: '#94A3B8', cursor: 'pointer', fontWeight: '500' }}
            >
              Collapse Content ↑
            </button>
        </div>
      )}
    </div>
  );
};

const MermaidBlock = ({ chart }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (window.mermaid) {
      window.mermaid.initialize({ startOnLoad: true, theme: 'dark' });
      window.mermaid.init(undefined, containerRef.current);
    } else {
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/mermaid/dist/mermaid.min.js';
      script.async = true;
      script.onload = () => {
        window.mermaid.initialize({ startOnLoad: true, theme: 'dark' });
        window.mermaid.init(undefined, containerRef.current);
      };
      document.body.appendChild(script);
    }
  }, [chart]);

  return (
    <div style={{ marginBottom: '40px', background: 'rgba(15, 23, 42, 0.4)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)', padding: '24px', overflowX: 'auto' }}>
      <div className="mermaid" ref={containerRef}>
        {chart}
      </div>
    </div>
  );
};

const RedisSyncHLD = () => {
  const [activeSection, setActiveSection] = useState('how-it-works');
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const toggleMobileNav = () => setIsMobileNavOpen(!isMobileNavOpen);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const y = element.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: y, behavior: 'smooth' });
      setActiveSection(id);
    }
  };

  const navItems = [
    { id: 'how-it-works', label: '1. Short: Kaise Kaam Karta Hai' },
    { id: 'design-decisions', label: '2. Design Decisions & Limits' },
    { id: 'system-overview', label: '3. System Overview' },
    { id: 'request-lifecycle', label: '4. Full Request Lifecycle' },
    { id: 'backend-architecture', label: '5. Backend Component Arch' },
    { id: 'frontend-architecture', label: '6. Frontend Architecture' },
    { id: 'redis-event-map', label: '7. Redis Channel Event Map' },
    { id: 'failure-scenarios', label: '8. Failure Scenarios' },
    { id: 'startup-lifecycle', label: '9. Startup Lifecycle' },
    { id: 'performance-scale', label: '10. Performance & Scale' },
    { id: 'comparison', label: '11. Comparison vs Traditional' },
    { id: 'summary', label: '12. Summary (One Diagram)' },
  ];

  return (<>
    <div style={{ minHeight: '100vh', background: '#020617', color: '#F8FAFC', fontFamily: '"Inter", sans-serif', paddingTop: '80px', paddingBottom: '100px' }}>
      
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '60px', padding: '0 20px' }}>
        <div style={{ display: 'inline-block', padding: '6px 16px', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)', borderRadius: '20px', color: '#EF4444', fontSize: '13px', fontWeight: '600', letterSpacing: '1px', marginBottom: '24px' }}>
          UPSTASH REDIS & WEBSOCKETS
        </div>
        <h1 style={{ fontSize: '48px', fontWeight: '800', marginBottom: '20px', letterSpacing: '-1px' }}>
          Real-Time Sync <br />
          <span style={{ background: 'linear-gradient(135deg, #EF4444 0%, #F59E0B 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Architecture & Implementation</span>
        </h1>
        <p style={{ fontSize: '20px', color: '#94A3B8', maxWidth: '800px', margin: '0 auto', lineHeight: '1.6' }}>
          A deep dive into the Redis Pub/Sub event-driven real-time synchronization that enables zero-delay live updates across DataTrust web, Excel, and backend systems.
        </p>
      </div>

      <div style={{ display: 'flex', maxWidth: '1400px', margin: '0 auto', padding: '0 40px', gap: '60px' }}>
        
        {/* Sidebar Navigation */}
        {/* Mobile Nav Toggle */}
        <button onClick={toggleMobileNav} className="mobile-toggle">☰</button>
        <div className={isMobileNavOpen ? 'sidebar mobile-open' : 'sidebar'}>
          <h3 style={{ fontSize: '14px', textTransform: 'uppercase', letterSpacing: '1px', color: '#94A3B8', marginBottom: '20px', fontWeight: '700' }}>Sections</h3>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => { scrollToSection(item.id); setIsMobileNavOpen(false); }}
                  style={{
                    width: '100%',
                    textAlign: 'left',
                    padding: '10px 16px',
                    background: activeSection === item.id ? 'rgba(239,68,68,0.1)' : 'transparent',
                    color: activeSection === item.id ? '#EF4444' : '#CBD5E1',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: activeSection === item.id ? '600' : '400',
                    transition: 'all 0.2s ease',
                    borderLeft: activeSection === item.id ? '3px solid #EF4444' : '3px solid transparent'
                  }}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Content Area */}
        <div style={{ flexGrow: 1, minWidth: 0 }}>
          
          <section id="how-it-works" style={{ marginBottom: '60px', scrollMarginTop: '100px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
              <div style={{ width: '48px', height: '48px', background: 'rgba(16,185,129,0.1)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10B981', fontSize: '24px' }}>🎯</div>
              <h2 style={{ fontSize: '32px', fontWeight: '700' }}>1. Short mein — Kaise Kaam Karta Hai</h2>
            </div>
            <CodeBlock 
              title="quick_flow.txt"
              code={`User metric save kare
    ↓
FastAPI → PostgreSQL (DB write)
    ↓
_fire_metric_event() → redis_client.publish()
    ↓
Upstash Redis (Cloud) — channel: "metric.changed"
    ↓
sync.py ka background task → Redis se message receive kare
    ↓
manager.broadcast() → sabhi connected WebSocket clients ko bheje
    ↓
Browser: useDynamicSync() → qc.invalidateQueries(['metrics'])
    ↓
React Query auto-refetch → UI re-renders ✅`} />
          </section>

          <section id="design-decisions" style={{ marginBottom: '60px', scrollMarginTop: '100px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
              <div style={{ width: '48px', height: '48px', background: 'rgba(245,158,11,0.1)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#F59E0B', fontSize: '24px' }}>🔑</div>
              <h2 style={{ fontSize: '32px', fontWeight: '700' }}>2. Important Design Decisions & Limits</h2>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '32px' }}>
              <div style={{ background: 'rgba(30, 41, 59, 0.6)', padding: '24px', borderRadius: '12px', borderLeft: '4px solid #F59E0B' }}>
                <h4 style={{ color: '#F8FAFC', marginBottom: '8px', fontSize: '18px' }}>Non-fatal publish</h4>
                <p style={{ color: '#94A3B8', fontSize: '14px', margin: 0 }}>Redis fail hone pe bhi app kaam kare. DB writes priority pe hote hain.</p>
              </div>
              <div style={{ background: 'rgba(30, 41, 59, 0.6)', padding: '24px', borderRadius: '12px', borderLeft: '4px solid #F59E0B' }}>
                <h4 style={{ color: '#F8FAFC', marginBottom: '8px', fontSize: '18px' }}>Background subscriber</h4>
                <p style={{ color: '#94A3B8', fontSize: '14px', margin: 0 }}>Redis se ek hi connection, jo poore app ke websockets ke liye kaam aata hai.</p>
              </div>
              <div style={{ background: 'rgba(30, 41, 59, 0.6)', padding: '24px', borderRadius: '12px', borderLeft: '4px solid #F59E0B' }}>
                <h4 style={{ color: '#F8FAFC', marginBottom: '8px', fontSize: '18px' }}>Query invalidation</h4>
                <p style={{ color: '#94A3B8', fontSize: '14px', margin: 0 }}>Data websocket pe bhejne ke bajaye, invalidation hook fresh data fetch karta hai.</p>
              </div>
            </div>

            <h3 style={{ fontSize: '20px', color: '#E2E8F0', marginBottom: '16px' }}>📊 Free Tier Usage</h3>
            <CodeBlock 
              title="usage_limits.txt"
              code={`Upstash free: 10,000 commands/day
Tumhara usage: ~3,000/day (1 active user)
Buffer: 7,000 commands → Months tak free ✅`} />
          </section>

          <section id="system-overview" style={{ marginBottom: '60px', scrollMarginTop: '100px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
              <div style={{ width: '48px', height: '48px', background: 'rgba(59,130,246,0.1)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#3B82F6', fontSize: '24px' }}>📌</div>
              <h2 style={{ fontSize: '32px', fontWeight: '700' }}>3. System Overview</h2>
            </div>
            <MermaidBlock chart={`graph TB
    subgraph CLIENT["🖥️ Client Layer"]
        B1["Dashboard\\n(Browser Tab)"]
        B2["Excel Add-in"]
        B3["CFO Screen"]
        B4["Analytics Team"]
    end

    subgraph WS["🔌 WebSocket Layer"]
        WSS["WebSocket Server\\n/ws/sync\\n(Always Open)"]
        CM["Connection\\nManager\\n(Tracks all clients)"]
    end

    subgraph REDIS["📡 Redis Layer (Upstash Cloud)"]
        CH1["Channel:\\nmetric.changed"]
        CH2["Channel:\\npipeline.updated"]
        CH3["Channel:\\nalert.triggered"]
        CH4["Channel:\\nrule.updated"]
        CH5["Channel:\\nexcel.refresh"]
    end

    subgraph API["⚙️ Backend Layer (FastAPI)"]
        EP1["Metric API"]
        EP2["Pipeline API"]
        EP3["Alert API"]
        EP4["Rule API"]
        PUB["Redis Publisher\\n(redis_client.py)"]
    end

    subgraph DB["🗄️ Database Layer"]
        PG["PostgreSQL\\n(Source of Truth)"]
        AUDIT["Audit Log\\n(Every change tracked)"]
    end

    EP1 --> PG
    EP2 --> PG
    EP3 --> PG
    EP4 --> PG

    PG --> AUDIT

    EP1 --> PUB
    EP2 --> PUB
    EP3 --> PUB
    EP4 --> PUB

    PUB --> CH1
    PUB --> CH2
    PUB --> CH3
    PUB --> CH4
    PUB --> CH5

    CH1 --> WSS
    CH2 --> WSS
    CH3 --> WSS
    CH4 --> WSS
    CH5 --> WSS

    WSS --> CM
    CM --> B1
    CM --> B2
    CM --> B3
    CM --> B4

    style CLIENT fill:#1e3a5f,color:#fff
    style WS fill:#1a3a2a,color:#fff
    style REDIS fill:#4a1a1a,color:#fff
    style API fill:#2a2a4a,color:#fff
    style DB fill:#2a3a2a,color:#fff`} />
          </section>

          <section id="request-lifecycle" style={{ marginBottom: '60px', scrollMarginTop: '100px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
              <div style={{ width: '48px', height: '48px', background: 'rgba(16,185,129,0.1)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10B981', fontSize: '24px' }}>🔄</div>
              <h2 style={{ fontSize: '32px', fontWeight: '700' }}>4. Full Request Lifecycle</h2>
            </div>
            <MermaidBlock chart={`sequenceDiagram
    participant U as 👤 User
    participant FE as 🖥️ Frontend
    participant API as ⚙️ FastAPI
    participant DB as 🗄️ PostgreSQL
    participant RC as 📡 Redis Client
    participant UP as ☁️ Upstash Redis
    participant SUB as 🔄 Subscriber Task
    participant CM as 📢 Connection Manager
    participant B1 as 💻 Browser A
    participant B2 as 📊 Excel Add-in

    U->>FE: Click "Save Metric"
    FE->>API: PATCH /api/v1/semantic/metrics/{id}
    API->>DB: UPDATE metric SET formula=...
    DB-->>API: ✅ Saved
    API->>DB: INSERT INTO audit_logs
    API->>RC: publish("metric.changed", payload)
    RC->>UP: PUBLISH metric.changed {json}
    UP-->>RC: OK (1 subscriber)

    Note over SUB: Background task always listening
    UP->>SUB: Message received on metric.changed
    SUB->>CM: broadcast(message)

    par Broadcast to all clients
        CM->>B1: ws.send_text(message)
        CM->>B2: ws.send_text(message)
    end

    Note over B1: useDynamicSync() hook
    B1->>B1: qc.invalidateQueries(['metrics'])
    B1->>API: GET /api/v1/semantic/metrics (auto-refetch)
    API-->>B1: Fresh data ✅
    B1->>B1: UI re-renders

    Note over B2: DynamicSyncManager
    B2->>B2: Excel cells auto-refresh ✅

    API-->>FE: 200 OK (response to user)
    FE-->>U: ✅ Saved! (UI updates instantly)`} />
          </section>

          <section id="backend-architecture" style={{ marginBottom: '60px', scrollMarginTop: '100px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
              <div style={{ width: '48px', height: '48px', background: 'rgba(139,92,246,0.1)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#8B5CF6', fontSize: '24px' }}>🏗️</div>
              <h2 style={{ fontSize: '32px', fontWeight: '700' }}>5. Backend Component Architecture</h2>
            </div>
            <MermaidBlock chart={`graph LR
    subgraph STARTUP["🚀 App Startup"]
        S1["Create DB Tables"]
        S2["Start Event Bus"]
        S3["Start Redis Subscriber"]
        S1 --> S2 --> S3
    end

    subgraph REDIS_CLIENT["📦 Redis Client Module"]
        RC1["get_redis()\\nSingleton Connection"]
        RC2["publish(channel, data)\\nJSON serialize + send"]
        RC3["close_redis()\\nClean shutdown"]
        RC1 --> RC2
    end

    subgraph WEBSOCKET["🔌 WebSocket Module"]
        WS1["ConnectionManager\\nSet of active sockets"]
        WS2["_redis_subscriber()\\nBackground coroutine"]
        WS3["/ws/sync endpoint\\nAccept + keepalive"]
        WS4["broadcast()\\nSend to all clients"]
        WS2 -->|"Redis message"| WS4
        WS4 --> WS1
        WS3 --> WS1
    end

    subgraph TRIGGERS["⚡ Event Triggers"]
        T1["Metric Create/Update"]
        T2["Pipeline Run"]
        T3["Alert Fire"]
        T4["Sync Complete"]
    end

    T1 --> RC2
    T2 --> RC2
    T3 --> RC2
    T4 --> RC2

    RC2 -->|"Publish to Redis"| UP["☁️ Upstash\\nRedis Cloud"]
    UP -->|"Subscribe"| WS2

    style STARTUP fill:#1a2a4a,color:#fff
    style REDIS_CLIENT fill:#4a1a1a,color:#fff
    style WEBSOCKET fill:#1a3a2a,color:#fff
    style TRIGGERS fill:#2a2a4a,color:#fff`} />
          </section>

          <section id="frontend-architecture" style={{ marginBottom: '60px', scrollMarginTop: '100px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
              <div style={{ width: '48px', height: '48px', background: 'rgba(236,72,153,0.1)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#EC4899', fontSize: '24px' }}>🌐</div>
              <h2 style={{ fontSize: '32px', fontWeight: '700' }}>6. Frontend Architecture</h2>
            </div>
            <MermaidBlock chart={`graph TB
    subgraph LAYOUT["📐 Console Layout (Root)"]
        DP["useDynamicSync Hook\\n(Runs ONCE, covers all pages)"]
        DOT["SyncStatusDot\\n🟢 Connected / ⚫ Disconnected"]
    end

    subgraph HOOK["🪝 useDynamicSync Internals"]
        WC["WebSocket Client\\nws://host:8000/ws/sync"]
        MSG["onmessage handler\\nParse JSON event"]
        MAP["EVENT_QUERY_MAP\\nEvent → Query Keys"]
        INV["queryClient.invalidateQueries()\\nTrigger refetch"]
        RC["Auto Reconnect\\n3s delay, max 10 attempts"]

        WC -->|"message"| MSG
        MSG --> MAP
        MAP --> INV
        WC -->|"onclose"| RC
        RC --> WC
    end

    subgraph PAGES["📄 Console Pages"]
        P1["MetricsRegistry\\nuseMetrics() hook"]
        P2["PipelinesDashboard\\nusePipelines() hook"]
        P3["QualityCenter\\nuseAlerts() hook"]
        P4["AuditTrail\\nuseAuditLogs() hook"]
    end

    subgraph RQ["⚡ React Query Cache"]
        Q1["['metrics'] cache"]
        Q2["['pipelines'] cache"]
        Q3["['alerts'] cache"]
        Q4["['rules'] cache"]
    end

    DP --> HOOK
    INV -->|"invalidate"| Q1
    INV -->|"invalidate"| Q2
    INV -->|"invalidate"| Q3
    INV -->|"invalidate"| Q4

    Q1 -->|"auto refetch"| P1
    Q2 -->|"auto refetch"| P2
    Q3 -->|"auto refetch"| P3
    Q4 -->|"auto refetch"| P4

    style LAYOUT fill:#1e3a5f,color:#fff
    style HOOK fill:#1a2a3a,color:#fff
    style PAGES fill:#2a3a2a,color:#fff
    style RQ fill:#3a2a1a,color:#fff`} />
          </section>

          <section id="redis-event-map" style={{ marginBottom: '60px', scrollMarginTop: '100px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
              <div style={{ width: '48px', height: '48px', background: 'rgba(239,68,68,0.1)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#EF4444', fontSize: '24px' }}>📡</div>
              <h2 style={{ fontSize: '32px', fontWeight: '700' }}>7. Redis Channel — Event Map</h2>
            </div>
            <MermaidBlock chart={`graph LR
    subgraph EVENTS["📨 Redis Channels"]
        E1["metric.changed"]
        E2["pipeline.updated"]
        E3["pipeline.run"]
        E4["alert.triggered"]
        E5["rule.updated"]
        E6["excel.refresh"]
    end

    subgraph QUERIES["🔄 React Query Keys Invalidated"]
        Q1["metrics\\nsemantic-metrics\\nlineage"]
        Q2["pipelines\\npipeline-detail"]
        Q3["pipelines\\nruns"]
        Q4["alerts\\nquality-metrics"]
        Q5["rules"]
        Q6["excel-data"]
    end

    subgraph UI["🖥️ UI Re-renders"]
        U1["Metrics Registry\\nVersion number updates"]
        U2["Pipeline List\\nStatus badge updates"]
        U3["Run Logs\\nProgress updates"]
        U4["Alert Bell\\nNew notification"]
        U5["Rules Manager\\nRule list updates"]
        U6["Excel Cells\\nData refreshes"]
    end

    E1 --> Q1 --> U1
    E2 --> Q2 --> U2
    E3 --> Q3 --> U3
    E4 --> Q4 --> U4
    E5 --> Q5 --> U5
    E6 --> Q6 --> U6

    style EVENTS fill:#4a1a1a,color:#fff
    style QUERIES fill:#1a2a4a,color:#fff
    style UI fill:#1a3a2a,color:#fff`} />
          </section>

          <section id="failure-scenarios" style={{ marginBottom: '60px', scrollMarginTop: '100px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
              <div style={{ width: '48px', height: '48px', background: 'rgba(245,158,11,0.1)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#F59E0B', fontSize: '24px' }}>🛡️</div>
              <h2 style={{ fontSize: '32px', fontWeight: '700' }}>8. Failure Scenarios — Resilience Diagram</h2>
            </div>
            <MermaidBlock chart={`graph TD
    subgraph NORMAL["✅ Normal Flow"]
        N1["Change → Redis → WS → UI\\n⚡ 0.3 seconds"]
    end

    subgraph F1["❌ Scenario 1: Redis Down"]
        R1["publish() called"]
        R2["Redis connection fails"]
        R3["Exception caught\\n(non-fatal)"]
        R4["App continues normally\\nDB write still happens"]
        R5["Redis subscriber retries\\nevery 5 seconds"]
        R6["Redis comes back\\nSubscriber auto-reconnects"]
        R1 --> R2 --> R3 --> R4
        R5 --> R6
    end

    subgraph F2["❌ Scenario 2: Browser Disconnects"]
        B1["User closes tab"]
        B2["WebSocket disconnect event"]
        B3["manager.discard(socket)"]
        B4["No memory leak\\nNo error"]
        B1 --> B2 --> B3 --> B4
    end

    subgraph F3["❌ Scenario 3: Network Hiccup"]
        N2["ws.onclose fires"]
        N3["setTimeout 3000ms"]
        N4["Reconnect attempt\\n(max 10)"]
        N5["Grey dot → Green dot\\n✅ Reconnected"]
        N2 --> N3 --> N4 --> N5
    end

    subgraph F4["❌ Scenario 4: Backend Restart"]
        S1["All WS connections drop"]
        S2["Frontend detects disconnect"]
        S3["Auto-reconnect starts"]
        S4["Backend starts up\\nSubscriber re-initializes"]
        S5["All clients reconnect\\n✅ No user action needed"]
        S1 --> S2 --> S3
        S4 --> S5
    end

    style NORMAL fill:#1a3a1a,color:#fff
    style F1 fill:#3a1a1a,color:#fff
    style F2 fill:#3a1a1a,color:#fff
    style F3 fill:#3a1a1a,color:#fff
    style F4 fill:#3a1a1a,color:#fff`} />
          </section>

          <section id="startup-lifecycle" style={{ marginBottom: '60px', scrollMarginTop: '100px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
              <div style={{ width: '48px', height: '48px', background: 'rgba(59,130,246,0.1)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#3B82F6', fontSize: '24px' }}>🚀</div>
              <h2 style={{ fontSize: '32px', fontWeight: '700' }}>9. Startup & Shutdown Lifecycle</h2>
            </div>
            <MermaidBlock chart={`sequenceDiagram
    participant UV as uvicorn
    participant APP as FastAPI App
    participant DB as PostgreSQL
    participant EB as Event Bus
    participant RS as Redis Subscriber
    participant UP as Upstash Redis

    UV->>APP: Start application
    APP->>DB: Create all tables (if not exist)
    DB-->>APP: ✅ Tables ready

    APP->>EB: Start DynamicEventBus
    EB-->>APP: ✅ Event Bus running

    APP->>RS: start_subscriber(app.state)
    RS->>UP: SUBSCRIBE metric.changed pipeline.updated alert.triggered rule.updated excel.refresh
    UP-->>RS: ✅ Subscribed to 6 channels

    Note over RS: Background task now running
    Note over APP: ✅ "Redis real-time sync subscriber started"

    APP-->>UV: ✅ Ready on :8000

    Note over APP: === App running === 

    UV->>APP: Shutdown signal
    APP->>RS: stop_subscriber()
    RS->>UP: UNSUBSCRIBE + close
    APP->>EB: DynamicEventBus.stop()
    APP->>UP: close_redis()
    UP-->>APP: ✅ Connection closed
    APP-->>UV: ✅ Clean shutdown`} />
          </section>

          <section id="performance-scale" style={{ marginBottom: '60px', scrollMarginTop: '100px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
              <div style={{ width: '48px', height: '48px', background: 'rgba(16,185,129,0.1)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10B981', fontSize: '24px' }}>⚡</div>
              <h2 style={{ fontSize: '32px', fontWeight: '700' }}>10. Performance & Scale</h2>
            </div>
            <MermaidBlock chart={`graph LR
    subgraph NOW["🟢 Now (Free Tier)"]
        direction TB
        A1["Users: 1-10"]
        A2["Commands: ~3,000/day"]
        A3["Limit: 10,000/day"]
        A4["Cost: $0/month"]
        A1 --> A2 --> A3 --> A4
    end

    subgraph STARTUP["🟡 Startup Scale"]
        direction TB
        B1["Users: 10-100"]
        B2["Commands: ~30,000/day"]
        B3["Plan: Pay-as-go"]
        B4["Cost: ~$5/month"]
        B1 --> B2 --> B3 --> B4
    end

    subgraph ENTERPRISE["🔴 Enterprise"]
        direction TB
        C1["Users: 1,000+"]
        C2["Commands: 1M+/day"]
        C3["Plan: Fixed/Dedicated"]
        C4["Cost: $20-200/month"]
        C1 --> C2 --> C3 --> C4
    end

    NOW -->|"Grow"| STARTUP -->|"Scale"| ENTERPRISE

    style NOW fill:#1a3a1a,color:#fff
    style STARTUP fill:#3a3a1a,color:#fff
    style ENTERPRISE fill:#3a1a1a,color:#fff`} />
          </section>

          <section id="comparison" style={{ marginBottom: '60px', scrollMarginTop: '100px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
              <div style={{ width: '48px', height: '48px', background: 'rgba(245,158,11,0.1)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#F59E0B', fontSize: '24px' }}>🏆</div>
              <h2 style={{ fontSize: '32px', fontWeight: '700' }}>11. Comparison — DataTrust vs Traditional</h2>
            </div>
            <MermaidBlock chart={`graph TD
    subgraph TRAD["❌ Traditional Approach"]
        T1["Manual Export\\nHours delay"]
        T2["Scheduled Jobs\\n15-60 min delay"]
        T3["Polling\\n30 sec delay\\nServer overload"]
        T4["Email/Slack\\nManual process"]
    end

    subgraph DT["✅ DataTrust Real-Time"]
        D1["Redis Pub/Sub\\n0.3 sec delay"]
        D2["WebSocket Push\\nServer → Browser (not reverse)"]
        D3["React Query\\nAuto UI update"]
        D4["Single Source of Truth\\nAll teams see same data"]
        D1 --> D2 --> D3 --> D4
    end

    TRAD -->|"DataTrust replaces"| DT

    style TRAD fill:#3a1a1a,color:#fff
    style DT fill:#1a3a1a,color:#fff`} />
          </section>

          <section id="summary" style={{ marginBottom: '60px', scrollMarginTop: '100px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
              <div style={{ width: '48px', height: '48px', background: 'rgba(139,92,246,0.1)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#8B5CF6', fontSize: '24px' }}>📋</div>
              <h2 style={{ fontSize: '32px', fontWeight: '700' }}>12. Summary — One Diagram</h2>
            </div>
            <MermaidBlock chart={`flowchart TB
    A["👤 Any User\\nMakes any change"] 
    --> B["⚙️ FastAPI\\nSaves to PostgreSQL\\n+ Creates Audit Log"]
    --> C["📡 Redis Client\\nPublishes event\\nto Upstash Cloud"]
    --> D["☁️ Upstash Redis\\nCloud Message Bus\\n6 channels"]
    --> E["🔄 WebSocket Subscriber\\nAlways listening\\nBackground task"]
    --> F["📢 Connection Manager\\nBroadcasts to ALL\\nconnected clients"]
    --> G{"Which clients?"}

    G --> H["🖥️ Dashboard Browser\\nAuto-refresh"]
    G --> I["📊 Excel Add-in\\nCells update"]
    G --> J["📱 Any other\\nConnected screen"]

    H --> K["✅ All teams see\\nsame real-time data\\nin 0.3 seconds"]
    I --> K
    J --> K

    style A fill:#2a2a5a,color:#fff
    style B fill:#2a4a2a,color:#fff
    style C fill:#4a2a2a,color:#fff
    style D fill:#4a1a1a,color:#fff
    style E fill:#1a4a4a,color:#fff
    style F fill:#3a3a1a,color:#fff
    style K fill:#1a4a1a,color:#fff`} />
          </section>

        </div>
      </div>
    </div>
    <style dangerouslySetInnerHTML={{__html: `
      .mobile-toggle {
        display: none;
      }
      .sidebar {
        width: 280px;
        flex-shrink: 0;
        position: sticky;
        top: 100px;
        height: fit-content;
        background: rgba(255,255,255,0.02);
        padding: 24px;
        border-radius: 16px;
        border: 1px solid rgba(255,255,255,0.05);
      }
      @media (max-width: 1024px) {
        .mobile-toggle {
          display: block;
          position: fixed;
          top: 20px;
          right: 20px;
          background: rgba(239, 68, 68, 0.8);
          border: none;
          border-radius: 8px;
          color: #fff;
          padding: 8px 16px;
          font-size: 18px;
          cursor: pointer;
          z-index: 1001;
        }
        .sidebar {
          position: fixed;
          top: 0;
          left: -300px;
          height: 100vh;
          width: 280px;
          background: rgba(15, 23, 42, 0.98);
          backdrop-filter: blur(16px);
          z-index: 1000;
          transition: left 0.3s ease;
          border-radius: 0;
          border: none;
          border-right: 1px solid rgba(255,255,255,0.08);
          overflow-y: auto;
        }
        .sidebar.mobile-open {
          left: 0;
        }
      }
    `}} />
  </>);
};

export default RedisSyncHLD;
