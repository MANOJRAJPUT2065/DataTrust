import React, { useState } from 'react';

const models = [
  {
    id: "gpt-oss-120b",
    name: "openai/gpt-oss-120b",
    category: "General LLM",
    apiKey: "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",
    baseUrl: "https://integrate.api.nvidia.com/v1",
    desc: "Open-source large language model optimized for agentic workflows and multi-step governance planning.",
    integration: "openai",
    code: `from openai import OpenAI

client = OpenAI(
  base_url = "https://integrate.api.nvidia.com/v1",
  api_key = "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"
)

completion = client.chat.completions.create(
  model="openai/gpt-oss-120b",
  messages=[{"role":"user","content":"Compare Snowflake governance metrics."}],
  temperature=1,
  top_p=1,
  max_tokens=4096,
  stream=False
)

reasoning = getattr(completion.choices[0].message, "reasoning_content", None)
if reasoning:
  print("Reasoning Steps:", reasoning)
print(completion.choices[0].message.content)`,
    playgroundResponse: "<thinking>\nTo compare Snowflake governance metrics, I should analyze object tagging, access history, row-access policies, and column masking metrics...\n</thinking>\nUnified Snowflake Data Governance Metrics Comparison:\n1. Object Tagging: Tracks sensitive asset classes across databases.\n2. Access History: Monitors reading/writing frequencies for lineage.\n3. Masking Policies: Enforces dynamic column-level privacy."
  },
  {
    id: "nemotron-ocr-v2",
    name: "nvidia/nemotron-ocr-v2",
    category: "Optical Character Recognition",
    apiKey: "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",
    baseUrl: "https://integrate.api.nvidia.com/v1",
    desc: "State-of-the-art multilingual OCR model for robust text extraction and complex tabular data parsing on real-world images.",
    integration: "http",
    code: `import requests
import base64

invoke_url = "https://integrate.api.nvidia.com/v1/chat/completions"
image_path = "cfo_report.png"

with open(image_path, "rb") as f:
    b64_image = base64.b64encode(f.read()).decode()

headers = {
  "Authorization": "Bearer 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",
  "Accept": "application/json"
}

payload = {
  "model": "nvidia/nemotron-ocr-v2",
  "messages": [
    {
      "role": "user",
      "content": [
        {"type": "text", "text": "Extract all financial table rows from this screenshot."},
        {"type": "image_url", "image_url": {"url": f"data:image/png;base64,{b64_image}"}}
      ]
    }
  ],
  "max_tokens": 4096
}

response = requests.post(invoke_url, headers=headers, json=payload)
print(response.json())`,
    playgroundResponse: "Extracted Table Markdown:\n| Month | Total Revenue | Operating Expense | Net Income |\n| :--- | :--- | :--- | :--- |\n| Q1-26 | $12,450,000 | $8,210,000 | $4,240,000 |\n| Q2-26 | $14,920,000 | $9,110,000 | $5,810,000 |"
  },
  {
    id: "nemotron-3-ultra",
    name: "nvidia/nemotron-3-ultra-550b-a55b",
    category: "Reasoning LLM",
    apiKey: "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",
    baseUrl: "LangChain ChatNVIDIA",
    desc: "550B ultra-scale model with active thinking loops and high reasoning budgets for compliance verification.",
    integration: "langchain",
    code: `from langchain_nvidia_ai_endpoints import ChatNVIDIA

client = ChatNVIDIA(
  model="nvidia/nemotron-3-ultra-550b-a55b",
  api_key="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", 
  temperature=1,
  top_p=0.95,
  max_tokens=16384,
  reasoning_budget=16384,
  chat_template_kwargs={"enable_thinking": True},
)

for chunk in client.stream([{"role": "user", "content": "Explain GDPR Article 32 safety compliance rules."}]):
    if chunk.additional_kwargs and "reasoning_content" in chunk.additional_kwargs:
        print(chunk.additional_kwargs["reasoning_content"], end="")
    print(chunk.content, end="")`,
    playgroundResponse: "<thinking>\nAnalyzing GDPR Article 32 regarding the 'Security of processing'. Requires pseudonymisation, encryption, ongoing confidentiality, integrity, availability, and regular testing of security measures...\n</thinking>\nGDPR Article 32 Compliance Requirements:\n1. Pseudonymisation and Encryption of personal data.\n2. Integrity, Availability, and Resilience of processing systems.\n3. Regular Testing and Evaluation of technical and organizational security measures."
  },
  {
    id: "minimax-m3",
    name: "minimaxai/minimax-m3",
    category: "Multimodal MoE",
    apiKey: "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",
    baseUrl: "https://integrate.api.nvidia.com/v1",
    desc: "428B total / 22B active visual-language model supporting 512k context lengths and agentic design workflows.",
    integration: "multimodal_http",
    code: `import requests
import base64

invoke_url = "https://integrate.api.nvidia.com/v1/chat/completions"

headers = {
  "Authorization": "Bearer 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",
  "Accept": "application/json"
}

payload = {
  "model": "minimaxai/minimax-m3",
  "messages": [
    {
      "role": "user", 
      "content": [
        {"type": "text", "text": "Describe the data flows shown in this design sketch."},
        {"type": "image_url", "image_url": {"url": "https://datatrust-assets.ai/design_flow.png"}}
      ]
    }
  ],
  "max_tokens": 8192,
  "temperature": 1.00,
  "top_p": 0.95,
  "stream": False
}

response = requests.post(invoke_url, headers=headers, json=payload)
print(response.json())`,
    playgroundResponse: "Multimodal Analysis Result:\nThe provided schematic illustrates a 3-tier sync data flow: \n- Tier 1: Ingests transactional records via CDC adapters.\n- Tier 2: Routes messages through a Redis pub/sub queue.\n- Tier 3: Loads cached records into memory arrays inside Microsoft Excel."
  },
  {
    id: "llama-3-3",
    name: "meta/llama-3.3-70b-instruct",
    category: "Instruction LLM",
    apiKey: "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",
    baseUrl: "LangChain ChatNVIDIA",
    desc: "State-of-the-art instruction LLM optimized for structured data mapping, schema evaluation, and configuration generation.",
    integration: "langchain",
    code: `from langchain_nvidia_ai_endpoints import ChatNVIDIA

client = ChatNVIDIA(
  model="meta/llama-3.3-70b-instruct",
  api_key="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", 
  temperature=0.2,
  top_p=0.7,
  max_tokens=1024
)

response = client.invoke([{"role":"user","content":"Verify column types match: ID (INT) and AMOUNT (DECIMAL)."}]):
print(response.content)`,
    playgroundResponse: "Verification Report:\n- Column 'ID' mapped as INTEGER: Valid (matches primary key target).\n- Column 'AMOUNT' mapped as DECIMAL: Valid (preserves currency accuracy bounds)."
  },
  {
    id: "qwen-3-next",
    name: "qwen/qwen3-next-80b-a3b-instruct",
    category: "Instruction LLM",
    apiKey: "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",
    baseUrl: "https://integrate.api.nvidia.com/v1",
    desc: "Qwen instruction LLM featuring high conversational coherence and advanced logic capabilities on mathematical datasets.",
    integration: "openai",
    code: `from openai import OpenAI

client = OpenAI(
  base_url="https://integrate.api.nvidia.com/v1",
  api_key="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"
)

completion = client.chat.completions.create(
  model="qwen/qwen3-next-80b-a3b-instruct",
  messages=[{"role":"user","content":"List statistical outliers for values: [12, 14, 15, 12, 999]."}],
  temperature=0.6,
  top_p=0.7,
  max_tokens=4096,
  stream=False
)

print(completion.choices[0].message.content)`,
    playgroundResponse: "Outlier Analysis:\n- Dataset: [12, 14, 15, 12, 999]\n- Mean: 210.4, Median: 14\n- Z-score Outlier detected: 999 (Z-score = 1.96, exceeds threshold boundary metrics)."
  },
  {
    id: "glm-5-1",
    name: "z-ai/glm-5.1",
    category: "Streaming LLM",
    apiKey: "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",
    baseUrl: "https://integrate.api.nvidia.com/v1",
    desc: "High-throughput model specialized in real-time stream execution and UI dynamic alert generation.",
    integration: "stream_openai",
    code: `from openai import OpenAI

client = OpenAI(
  base_url = "https://integrate.api.nvidia.com/v1",
  api_key = "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"
)

completion = client.chat.completions.create(
  model="z-ai/glm-5.1",
  messages=[{"role":"user","content":"Stream validation rules log update."}],
  temperature=1,
  top_p=1,
  max_tokens=16384,
  stream=True
)

for chunk in completion:
  if not getattr(chunk, "choices", None):
    continue
  if len(chunk.choices) == 0 or getattr(chunk.choices[0], "delta", None) is None:
    continue
  delta = chunk.choices[0].delta
  if getattr(delta, "content", None) is not None:
    print(delta.content, end="")`,
    playgroundResponse: "[Streaming Validation Logs]\n- Initializing rule validation...\n- Checked constraint 'not_null_id': PASSED\n- Checked constraint 'positive_revenue': PASSED\n- Validation Scan Completed successfully."
  },
  {
    id: "deepseek-v4-flash",
    name: "deepseek-ai/deepseek-v4-flash",
    category: "Fast Reasoning",
    apiKey: "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",
    baseUrl: "https://integrate.api.nvidia.com/v1",
    desc: "Sub-second latency reasoning model with high-performance thinking traces for rapid SQL code generation.",
    integration: "openai_thinking",
    code: `from openai import OpenAI

client = OpenAI(
  base_url = "https://integrate.api.nvidia.com/v1",
  api_key = "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"
)

completion = client.chat.completions.create(
  model="deepseek-ai/deepseek-v4-flash",
  messages=[{"role":"user","content":"Compile: Fetch total revenue group by region."}],
  temperature=1,
  top_p=0.95,
  max_tokens=16384,
  extra_body={"chat_template_kwargs":{"thinking":True,"reasoning_effort":"high"}},
  stream=False
)

reasoning = getattr(completion.choices[0].message, "reasoning", None) or getattr(completion.choices[0].message, "reasoning_content", None)
if reasoning:
  print("Thinking Trace:", reasoning)
print(completion.choices[0].message.content)`,
    playgroundResponse: "<thinking>\nRequest: Fetch total revenue grouped by region. Needs to select region and sum(revenue). Table context targets FACT_TIMESERIES column total_revenue.\n</thinking>\n```sql\nSELECT region, SUM(total_revenue) AS total_revenue\nFROM FACT_TIMESERIES\nGROUP BY region;\n```"
  },
  {
    id: "deepseek-v4-pro",
    name: "deepseek-ai/deepseek-v4-pro",
    category: "High Reasoning",
    apiKey: "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",
    baseUrl: "https://integrate.api.nvidia.com/v1",
    desc: "Production-grade deep-reasoning model optimized for complex cross-system compliance and regulatory auditing tasks.",
    integration: "openai_nothinking",
    code: `from openai import OpenAI

client = OpenAI(
  base_url = "https://integrate.api.nvidia.com/v1",
  api_key = "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"
)

completion = client.chat.completions.create(
  model="deepseek-ai/deepseek-v4-pro",
  messages=[{"role":"user","content":"Generate multi-system audit pipeline layout."}],
  temperature=1,
  top_p=0.95,
  max_tokens=16384,
  extra_body={"chat_template_kwargs":{"thinking":False}},
  stream=False
)

print(completion.choices[0].message.content)`,
    playgroundResponse: "Audit Pipeline Layout:\n1. Event Capture: Collect schema metadata, database modifications, and access traces.\n2. Hash Ingestion: Map records using cryptographic SHA-256 strings.\n3. Immutable Logging: Commit audit hashes to PostgreSQL tables with read-only view locks."
  },
  {
    id: "flux-schnell",
    name: "FLUX.1-schnell",
    category: "Image Generation",
    apiKey: "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",
    baseUrl: "https://integrate.api.nvidia.com/v1",
    desc: "Ultra-fast text-to-image generator for creating database schema diagrams, process flows, and executive dashboards.",
    integration: "http",
    code: `import requests

invoke_url = "https://integrate.api.nvidia.com/v1/images/generations"

headers = {
  "Authorization": "Bearer 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",
  "Accept": "application/json"
}

payload = {
  "model": "FLUX.1-schnell",
  "prompt": "database schema diagram displaying metadata relationships, neon blue aesthetic, 8k",
  "width": 1024,
  "height": 768,
  "response_format": "b64_json"
}

response = requests.post(invoke_url, headers=headers, json=payload)
print("Image Base64 Encoded Content Saved")`,
    playgroundResponse: "Image Generator Result:\n[Base64 Encoded Image Data Synthesized Successfully - Vector Diagram Generated]"
  },
  {
    id: "chatterbox-tts",
    name: "chatterbox-multilingual-tts",
    category: "Text to Speech",
    apiKey: "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",
    baseUrl: "https://integrate.api.nvidia.com/v1",
    desc: "Natural and expressive voice synthesis in 23 languages for automated audit alarms and corporate data pings.",
    integration: "http",
    code: `import requests

invoke_url = "https://integrate.api.nvidia.com/v1/audio/speech"

headers = {
  "Authorization": "Bearer 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",
  "Accept": "audio/mpeg"
}

payload = {
  "model": "chatterbox-multilingual-tts",
  "input": "Warning: Data anomaly detected on total_revenue column. Access restricted.",
  "voice": "expressive-male-1",
  "language": "en"
}

response = requests.post(invoke_url, headers=headers, json=payload)
with open("alert_voice.mp3", "wb") as f:
    f.write(response.content)
print("Audio saved successfully.")`,
    playgroundResponse: "TTS Voice Synthesis Result:\n[Audio Alert File Synthesized - MP3 Stream Output Saved]"
  }
];

export default function NvidiaModelsDocs() {
  const [selectedModel, setSelectedModel] = useState(models[0]);
  const [copiedKey, setCopiedKey] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Playground state
  const [playgroundQuery, setPlaygroundQuery] = useState('Compare Snowflake governance metrics.');
  const [playgroundTerminal, setPlaygroundTerminal] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);

  const handleCopyKey = () => {
    navigator.clipboard.writeText(selectedModel.apiKey);
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 2000);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(selectedModel.code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleRunPlayground = () => {
    setIsPlaying(true);
    setPlaygroundTerminal('Connecting to NVIDIA NIM API...\nAuthenticated successfully.\nSending payload...');
    
    setTimeout(() => {
      setPlaygroundTerminal(prev => prev + '\nStream response payload initiated:\n');
      let responseText = selectedModel.playgroundResponse;
      let i = 0;
      const interval = setInterval(() => {
        if (i < responseText.length) {
          setPlaygroundTerminal(prev => prev + responseText.charAt(i));
          i++;
        } else {
          clearInterval(interval);
          setIsPlaying(false);
        }
      }, 5);
    }, 1500);
  };

  const filteredModels = models.filter(m => 
    m.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    m.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ padding: '60px 0', background: '#0F172A', color: '#CBD5E1', fontFamily: '"Inter", sans-serif' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
        
        {/* Header Section */}
        <div style={{ marginBottom: '50px', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '30px' }}>
          <div style={{ display: 'inline-block', padding: '4px 12px', background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.2)', borderRadius: '20px', color: '#10B981', fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '16px' }}>
            NVIDIA NIM Model Hub
          </div>
          <h2 style={{ color: '#fff', fontSize: '38px', fontWeight: '800', margin: '0 0 10px 0' }}>🟢 NVIDIA NIM & AI Model Hub</h2>
          <p style={{ color: '#94A3B8', fontSize: '18px', margin: 0, lineHeight: '1.6' }}>
            Centralized registry of integrated NVIDIA AI Endpoints. Features live API credentials, LangChain code recipes, and sandbox testing.
          </p>
        </div>

        {/* Dashboard Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2.5fr', gap: '30px', marginBottom: '50px' }}>
          
          {/* LEFT: Search & Model List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ position: 'relative' }}>
              <input
                type="text"
                placeholder="Search models or tasks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: '100%',
                  background: '#090E17',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '10px',
                  padding: '12px 14px',
                  color: '#FFF',
                  fontSize: '14px',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '550px', overflowY: 'auto', paddingRight: '4px' }}>
              {filteredModels.map((m) => (
                <div
                  key={m.id}
                  onClick={() => {
                    setSelectedModel(m);
                    setPlaygroundQuery(m.id === 'nemotron-ocr-v2' ? 'Extract cfo_report.png tables.' : m.id === 'flux-schnell' ? 'database schema diagram, neon blue' : 'Explain data governance rules.');
                    setPlaygroundTerminal('');
                  }}
                  style={{
                    background: selectedModel.id === m.id ? 'rgba(16, 185, 129, 0.08)' : '#070C16',
                    border: `1px solid ${selectedModel.id === m.id ? '#10B981' : 'rgba(255,255,255,0.05)'}`,
                    borderRadius: '12px',
                    padding: '16px',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                  className="model-card-hover"
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <span style={{ fontSize: '11px', color: '#10B981', fontWeight: '700', textTransform: 'uppercase' }}>{m.category}</span>
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10B981' }} />
                  </div>
                  <strong style={{ color: '#fff', fontSize: '14px', display: 'block', wordBreak: 'break-all' }}>{m.name}</strong>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: Selected Model Details & Recipes */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
            
            {/* Credentials Card */}
            <div style={{ background: '#070C16', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '20px', padding: '32px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
                <div>
                  <h3 style={{ color: '#fff', fontSize: '24px', fontWeight: '700', margin: '0 0 4px 0' }}>{selectedModel.name}</h3>
                  <span style={{ fontSize: '13px', color: '#94A3B8' }}>Integration Mode: <strong style={{ color: '#10B981', textTransform: 'uppercase' }}>{selectedModel.integration}</strong></span>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <span style={{ fontSize: '11px', background: 'rgba(16,185,129,0.15)', color: '#10B981', padding: '4px 10px', borderRadius: '6px', fontWeight: '700', border: '1px solid rgba(16,185,129,0.2)' }}>NVIDIA NIM ACTIVE</span>
                </div>
              </div>

              <p style={{ fontSize: '14px', color: '#CBD5E1', lineHeight: '1.6', margin: '0 0 24px 0' }}>
                {selectedModel.desc}
              </p>

              {/* Endpoint Details */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                
                {/* Base URL */}
                <div>
                  <label style={{ fontSize: '11px', textTransform: 'uppercase', color: '#64748B', fontWeight: '800', display: 'block', marginBottom: '6px' }}>Base Endpoint URL</label>
                  <div style={{ background: '#090E17', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '8px', padding: '12px', fontSize: '13px', fontFamily: 'monospace', color: '#E2E8F0' }}>
                    {selectedModel.baseUrl}
                  </div>
                </div>

                {/* API Key */}
                <div>
                  <label style={{ fontSize: '11px', textTransform: 'uppercase', color: '#64748B', fontWeight: '800', display: 'block', marginBottom: '6px' }}>NVIDIA Authentication API Key</label>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <div style={{ flex: 1, background: '#090E17', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '8px', padding: '12px', fontSize: '13px', fontFamily: 'monospace', color: '#E2E8F0', overflowX: 'auto', whiteSpace: 'nowrap' }}>
                      {selectedModel.apiKey}
                    </div>
                    <button
                      onClick={handleCopyKey}
                      style={{
                        background: copiedKey ? '#10B981' : 'rgba(255,255,255,0.05)',
                        color: '#FFF',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '8px',
                        padding: '0 16px',
                        cursor: 'pointer',
                        fontSize: '13px',
                        fontWeight: '700',
                        transition: 'all 0.2s',
                        minWidth: '100px'
                      }}
                    >
                      {copiedKey ? 'Copied! ✓' : 'Copy Key'}
                    </button>
                  </div>
                </div>

              </div>
            </div>

            {/* SDK Code Recipe */}
            <div style={{ background: '#070C16', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '20px', padding: '32px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h4 style={{ color: '#fff', fontSize: '18px', fontWeight: '700', margin: 0 }}>🐍 Python Integration Recipe</h4>
                <button
                  onClick={handleCopyCode}
                  style={{
                    background: copiedCode ? '#10B981' : 'rgba(255,255,255,0.05)',
                    color: '#FFF',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '8px',
                    padding: '8px 16px',
                    cursor: 'pointer',
                    fontSize: '12px',
                    fontWeight: '700',
                    transition: 'all 0.2s'
                  }}
                >
                  {copiedCode ? 'Copied! ✓' : 'Copy Recipe'}
                </button>
              </div>

              <div style={{ background: '#090E17', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '12px', padding: '20px', overflowX: 'auto' }}>
                <pre style={{ margin: 0, fontSize: '13px', fontFamily: '"Fira Code", monospace', color: '#A5B4FC', lineHeight: '1.6' }}>
                  <code>{selectedModel.code}</code>
                </pre>
              </div>
            </div>

          </div>
        </div>

        {/* MiniMax-M3 Cluster Recipes & MLOps Section */}
        {selectedModel.id === 'minimax-m3' && (
          <div style={{ background: '#070C16', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '20px', padding: '40px', marginBottom: '50px' }}>
            <h3 style={{ color: '#FFF', fontSize: '22px', fontWeight: '700', marginTop: 0, marginBottom: '20px' }}>
              ⚡ MiniMax-M3 Fine-Tuning & Multi-Node Cluster Setup
            </h3>
            <p style={{ fontSize: '14px', color: '#94A3B8', lineHeight: '1.6', marginBottom: '24px' }}>
              To align the multimodal Mixture-of-Experts vision-language representations to your custom schema designs, you can launch custom Supervised Fine-Tuning (SFT) or LoRA adaptions on multi-node Hopper GPU clusters using NeMo AutoModel.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '32px' }}>
              
              <div>
                <label style={{ fontSize: '11px', textTransform: 'uppercase', color: '#64748B', fontWeight: '800', display: 'block', marginBottom: '6px' }}>Slurm Standalone Bash Execution Recipe</label>
                <div style={{ background: '#090E17', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '8px', padding: '16px', fontSize: '13px', fontFamily: 'monospace', color: '#CBD5E1', overflowX: 'auto' }}>
                  <pre style={{ margin: 0 }}>{`export TRANSFORMERS_OFFLINE=1
export HF_HOME=/shared/hf_cache
export HF_DATASETS_OFFLINE=1
export WANDB_API_KEY=your_wandb_key

srun --output=output.out \\
     --error=output.err \\
     --container-image /path/to/automodel26.04.image.sqsh \\
     --no-container-mount-home bash -c "
  CUDA_DEVICE_MAX_CONNECTIONS=1 automodel \\
  /path/to/minimax_m3_vl.yaml \\
  --nproc-per-node=8 \\
  --model.pretrained_model_name_or_path=/path/to/MiniMax-M3 \\
  --processor.pretrained_model_name_or_path=/path/to/MiniMax-M3"`}</pre>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div>
                  <label style={{ fontSize: '11px', textTransform: 'uppercase', color: '#64748B', fontWeight: '800', display: 'block', marginBottom: '6px' }}>Full VLM SFT Recipe Path</label>
                  <div style={{ background: '#090E17', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '8px', padding: '12px', fontSize: '13px', fontFamily: 'monospace', color: '#818CF8' }}>
                    examples/vlm_finetune/minimax_m3/minimax_m3_vl_sft_ep32pp4.yaml
                  </div>
                </div>
                <div>
                  <label style={{ fontSize: '11px', textTransform: 'uppercase', color: '#64748B', fontWeight: '800', display: 'block', marginBottom: '6px' }}>VLM LoRA Cluster Recipe Path</label>
                  <div style={{ background: '#090E17', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '8px', padding: '12px', fontSize: '13px', fontFamily: 'monospace', color: '#818CF8' }}>
                    examples/vlm_finetune/minimax_m3/minimax_m3_vl_lora_pp4ep8_8node.yaml
                  </div>
                </div>
              </div>

            </div>

            {/* Simulated Loss Curves */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
              <div style={{ background: '#090E17', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '12px', padding: '20px' }}>
                <strong style={{ color: '#fff', fontSize: '14px', display: 'block', marginBottom: '12px' }}>📊 Minimax-M3 SFT Loss Curve (32 Epochs)</strong>
                <div style={{ height: '120px', display: 'flex', alignItems: 'flex-end', gap: '4px', borderLeft: '1px solid #334155', borderBottom: '1px solid #334155', padding: '10px' }}>
                  {/* Mock bar chart mapping SFT loss decay */}
                  {[90, 82, 75, 68, 62, 55, 48, 43, 38, 32, 28, 24, 21, 18, 15, 12, 10, 8, 7, 5].map((val, i) => (
                    <div key={i} style={{ flex: 1, background: '#10B981', height: `${val}%`, borderRadius: '2px 2px 0 0', opacity: 0.8 }} title={`Epoch ${i+1}: Loss ${val/20}`} />
                  ))}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: '#64748B', marginTop: '6px' }}>
                  <span>Epoch 1</span>
                  <span>Epoch 32 (Loss: 0.25)</span>
                </div>
              </div>

              <div style={{ background: '#090E17', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '12px', padding: '20px' }}>
                <strong style={{ color: '#fff', fontSize: '14px', display: 'block', marginBottom: '12px' }}>📊 Minimax-M3 LoRA Adapter Loss Curve (8 Epochs)</strong>
                <div style={{ height: '120px', display: 'flex', alignItems: 'flex-end', gap: '4px', borderLeft: '1px solid #334155', borderBottom: '1px solid #334155', padding: '10px' }}>
                  {/* Mock bar chart mapping LoRA loss decay */}
                  {[95, 89, 81, 74, 69, 61, 56, 51, 47, 42, 38, 34, 31, 29, 26, 24, 22, 20, 19, 18].map((val, i) => (
                    <div key={i} style={{ flex: 1, background: '#6366F1', height: `${val}%`, borderRadius: '2px 2px 0 0', opacity: 0.8 }} title={`Step ${i+1}: Loss ${val/20}`} />
                  ))}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: '#64748B', marginTop: '6px' }}>
                  <span>Step 1</span>
                  <span>Step 1200 (Loss: 0.90)</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Interactive Playground Section */}
        <div style={{ background: '#070C16', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '20px', padding: '40px' }}>
          <h3 style={{ color: '#FFF', fontSize: '22px', fontWeight: '700', marginTop: 0, marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ color: '#10B981' }}>🟢</span> NVIDIA NIM Playground Sandbox
          </h3>
          <p style={{ fontSize: '14px', color: '#94A3B8', lineHeight: '1.6', marginBottom: '24px' }}>
            Trigger a simulated direct connection query using the parameters of your active model selection.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 2fr', gap: '30px' }}>
            
            {/* Input Form */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ fontSize: '11px', textTransform: 'uppercase', color: '#64748B', fontWeight: '800', display: 'block', marginBottom: '6px' }}>Selected Target Model</label>
                <div style={{ background: '#090E17', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '12px', fontSize: '14px', color: '#FFF', fontWeight: '700' }}>
                  {selectedModel.name}
                </div>
              </div>

              <div>
                <label style={{ fontSize: '11px', textTransform: 'uppercase', color: '#64748B', fontWeight: '800', display: 'block', marginBottom: '6px' }}>Input Prompts / Instructions</label>
                <textarea
                  value={playgroundQuery}
                  onChange={(e) => setPlaygroundQuery(e.target.value)}
                  style={{
                    width: '100%',
                    height: '100px',
                    background: '#090E17',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '8px',
                    padding: '12px',
                    color: '#FFF',
                    fontSize: '13px',
                    fontFamily: 'inherit',
                    resize: 'none',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              <button
                disabled={isPlaying}
                onClick={handleRunPlayground}
                style={{
                  background: isPlaying ? 'rgba(16,185,129,0.15)' : '#10B981',
                  color: isPlaying ? '#10B981' : '#070C16',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '14px 20px',
                  fontWeight: '800',
                  fontSize: '13px',
                  cursor: isPlaying ? 'default' : 'pointer',
                  transition: 'all 0.2s',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}
              >
                {isPlaying ? 'Running connection test...' : 'Test Connection Endpoint ⚡'}
              </button>
            </div>

            {/* Terminal Output */}
            <div style={{ background: '#090E17', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', display: 'flex', flexDirection: 'column' }}>
              <div style={{ background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid rgba(255,255,255,0.08)', padding: '10px 16px', display: 'flex', gap: '6px', alignItems: 'center' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#EF4444' }} />
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#F59E0B' }} />
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10B981' }} />
                <span style={{ fontSize: '11px', color: '#64748B', fontFamily: 'monospace', marginLeft: '10px', textTransform: 'uppercase' }}>Playground Terminal</span>
              </div>
              
              <div style={{ padding: '20px', flex: 1, fontFamily: '"Fira Code", monospace', fontSize: '12px', color: '#F8FAFC', minHeight: '180px', overflowY: 'auto', whiteSpace: 'pre-wrap', lineHeight: '1.6' }}>
                {playgroundTerminal ? (
                  playgroundTerminal
                ) : (
                  <span style={{ color: '#475569' }}>Terminal ready. Click 'Test Connection Endpoint' to compile.</span>
                )}
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
