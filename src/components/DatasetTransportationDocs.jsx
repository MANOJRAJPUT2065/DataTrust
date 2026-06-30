import React, { useState } from 'react';
import CodeBlock from './CodeBlock';

export default function DatasetTransportationDocs() {
  const [checklist, setChecklist] = useState({
    filesReady: false,
    credsConfigured: false,
    tablesCreated: false,
    stageCreated: false,
    runScript: false,
    verifyCounts: false,
    checkQuality: false,
    generateReport: false,
  });

  const toggleChecklist = (key) => {
    setChecklist(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const ingestionCode = `import pandas as pd
import pyarrow as pa
import pyarrow.parquet as pq
import json
import os
from typing import List, Dict, Any
from datetime import datetime
import hashlib

class DataIngestionEngine:
    """Handles data ingestion, validation, and preprocessing."""
    
    def __init__(self, config: Dict):
        self.config = config
        self.supported_formats = ['csv', 'parquet', 'json']
        self.max_file_size = 5 * 1024 * 1024 * 1024  # 5 GB
        
    def discover_files(self, source_path: str, pattern: str = "*.*") -> List[str]:
        """Discover files matching pattern in source path."""
        import glob
        files = glob.glob(os.path.join(source_path, pattern))
        
        # Filter by size and format
        valid_files = []
        for f in files:
            if os.path.getsize(f) > self.max_file_size:
                print(f"⚠️ File {f} exceeds max size {self.max_file_size}")
                continue
            ext = f.split('.')[-1].lower()
            if ext in self.supported_formats:
                valid_files.append(f)
        
        return valid_files
    
    def validate_schema(self, file_path: str, expected_columns: List[str]) -> Dict:
        """Validate file schema against expected columns."""
        ext = file_path.split('.')[-1].lower()
        
        try:
            if ext == 'csv':
                df = pd.read_csv(file_path, nrows=10)
            elif ext == 'parquet':
                df = pd.read_parquet(file_path)
            elif ext == 'json':
                df = pd.read_json(file_path, lines=True, nrows=10)
            else:
                return {"valid": False, "error": f"Unsupported format: {ext}"}
            
            actual_columns = df.columns.tolist()
            
            # Check if expected columns are present
            missing = set(expected_columns) - set(actual_columns)
            extra = set(actual_columns) - set(expected_columns)
            
            return {
                "valid": len(missing) == 0,
                "actual_columns": actual_columns,
                "missing_columns": list(missing),
                "extra_columns": list(extra),
                "row_count_sample": len(df)
            }
            
        except Exception as e:
            return {"valid": False, "error": str(e)}
    
    def validate_data_quality(self, file_path: str, rules: List[Dict]) -> Dict:
        """Validate data quality based on rules."""
        ext = file_path.split('.')[-1].lower()
        
        if ext == 'csv':
            df = pd.read_csv(file_path)
        elif ext == 'parquet':
            df = pd.read_parquet(file_path)
        elif ext == 'json':
            df = pd.read_json(file_path, lines=True)
        else:
            return {"valid": False, "error": f"Unsupported format: {ext}"}
        
        violations = []
        
        for rule in rules:
            rule_type = rule.get('type')
            column = rule.get('column')
            
            if rule_type == 'not_null':
                null_count = df[column].isnull().sum()
                if null_count > 0:
                    violations.append({
                        "rule": f"{column} NOT NULL",
                        "violations": null_count,
                        "sample": df[df[column].isnull()].head(5).to_dict('records')
                    })
            
            elif rule_type == 'range':
                min_val = rule.get('min')
                max_val = rule.get('max')
                violations_mask = (df[column] < min_val) | (df[column] > max_val)
                violation_count = violations_mask.sum()
                if violation_count > 0:
                    violations.append({
                        "rule": f"{column} BETWEEN {min_val} AND {max_val}",
                        "violations": violation_count,
                        "sample": df[violations_mask].head(5).to_dict('records')
                    })
            
            elif rule_type == 'allowed_values':
                allowed = rule.get('values', [])
                violations_mask = ~df[column].isin(allowed)
                violation_count = violations_mask.sum()
                if violation_count > 0:
                    violations.append({
                        "rule": f"{column} IN {allowed}",
                        "violations": violation_count,
                        "sample": df[violations_mask].head(5).to_dict('records')
                    })
        
        return {
            "valid": len(violations) == 0,
            "violations": violations,
            "total_rows": len(df)
        }`;

  const transporterCode = `import subprocess
import snowflake.connector
from google.cloud import bigquery
import boto3
from databricks import sql
import concurrent.futures
import time
import logging

logger = logging.getLogger(__name__)

class WarehouseTransporter:
    """Handles transportation of data to various warehouses."""
    
    def __init__(self, config: Dict):
        self.config = config
        self.warehouse_type = config.get('warehouse_type', 'snowflake')
        self.stage_name = config.get('stage_name', 'datatrust_stage')
        self.batch_size = config.get('batch_size', 10000)
        self.max_retries = config.get('max_retries', 3)
        self.parallel_threads = config.get('parallel_threads', 4)
        
    def get_connection(self):
        """Get warehouse connection based on type."""
        if self.warehouse_type == 'snowflake':
            return self._get_snowflake_connection()
        elif self.warehouse_type == 'databricks':
            return self._get_databricks_connection()
        elif self.warehouse_type == 'bigquery':
            return self._get_bigquery_connection()
        elif self.warehouse_type == 'redshift':
            return self._get_redshift_connection()
        else:
            raise ValueError(f"Unsupported warehouse: {self.warehouse_type}")
    
    def _get_snowflake_connection(self):
        return snowflake.connector.connect(
            account=self.config.get('account'),
            user=self.config.get('user'),
            password=self.config.get('password'),
            warehouse=self.config.get('warehouse'),
            database=self.config.get('database'),
            schema=self.config.get('schema')
        )
    
    def _get_databricks_connection(self):
        return sql.connect(
            server_hostname=self.config.get('server_hostname'),
            http_path=self.config.get('http_path'),
            access_token=self.config.get('access_token')
        )
    
    def _get_bigquery_connection(self):
        from google.oauth2 import service_account
        credentials = service_account.Credentials.from_service_account_file(
            self.config.get('credentials_file')
        )
        return bigquery.Client(
            project=self.config.get('project'),
            credentials=credentials
        )
    
    def _get_redshift_connection(self):
        import psycopg2
        return psycopg2.connect(
            host=self.config.get('host'),
            port=self.config.get('port', 5439),
            database=self.config.get('database'),
            user=self.config.get('user'),
            password=self.config.get('password')
        )
    
    def create_stage(self, connection):
        if self.warehouse_type == 'snowflake':
            cursor = connection.cursor()
            cursor.execute(f"CREATE OR REPLACE STAGE {self.stage_name}")
            cursor.close()
    
    def upload_file(self, connection, file_path: str, table_name: str) -> Dict:
        result = {"success": False, "file": file_path, "error": None}
        for attempt in range(self.max_retries):
            try:
                if self.warehouse_type == 'snowflake':
                    result = self._upload_to_snowflake(connection, file_path, table_name)
                elif self.warehouse_type == 'bigquery':
                    result = self._upload_to_bigquery(connection, file_path, table_name)
                elif self.warehouse_type == 'databricks':
                    result = self._upload_to_databricks(connection, file_path, table_name)
                elif self.warehouse_type == 'redshift':
                    result = self._upload_to_redshift(connection, file_path, table_name)
                
                if result['success']:
                    logger.info(f"✅ Uploaded {file_path} to {self.warehouse_type}")
                    return result
            except Exception as e:
                logger.error(f"Attempt {attempt + 1} failed: {e}")
                time.sleep(5 * (attempt + 1))
                continue
        result['error'] = "Max retries exceeded"
        return result
    
    def _upload_to_snowflake(self, conn, file_path: str, table_name: str) -> Dict:
        import subprocess
        import os
        file_name = os.path.basename(file_path)
        put_cmd = f"snowsql -a {self.config['account']} -u {self.config['user']} -p {self.config['password']} -q \\"PUT file://{file_path} @{self.stage_name};\\""
        res = subprocess.run(put_cmd, shell=True, capture_output=True, text=True)
        if res.returncode != 0:
            return {"success": False, "error": res.stderr}
        cursor = conn.cursor()
        file_format = self._detect_file_format(file_path)
        copy_query = f"""
        COPY INTO {table_name}
        FROM @{self.stage_name}/{file_name}
        FILE_FORMAT = (TYPE = {file_format} SKIP_HEADER = 1)
        ON_ERROR = 'CONTINUE'
        """
        cursor.execute(copy_query)
        cursor.close()
        return {"success": True, "rows_loaded": cursor.rowcount}`;

  const batchUploaderCode = `import concurrent.futures
import os
import time
from typing import List, Dict
import logging

logger = logging.getLogger(__name__)

class BatchUploader:
    """Handles batch upload of multiple files to warehouse."""
    
    def __init__(self, config: Dict):
        self.config = config
        self.transporter = WarehouseTransporter(config)
        self.max_workers = config.get('max_workers', 4)
        self.file_mapping = self._load_file_mapping()
    
    def _load_file_mapping(self) -> Dict:
        return {
            'dim_region': 'DIM_REGION',
            'dim_currency': 'DIM_CURRENCY',
            'dim_channel': 'DIM_CHANNEL',
            'dim_shipping_method': 'DIM_SHIPPING_METHOD',
            'dim_payment_method': 'DIM_PAYMENT_METHOD',
            'dim_brand': 'DIM_BRAND',
            'dim_supplier': 'DIM_SUPPLIER',
            'dim_warehouse': 'DIM_WAREHOUSE',
            'dim_product_category': 'DIM_PRODUCT_CATEGORY',
            'dim_product': 'DIM_PRODUCT',
            'dim_date': 'DIM_DATE',
            'dim_employee': 'DIM_EMPLOYEE',
            'dim_sales_team': 'DIM_SALES_TEAM',
            'dim_sales_rep': 'DIM_SALES_REP',
            'dim_promotion': 'DIM_PROMOTION',
            'dim_customer': 'DIM_CUSTOMER',
            'fact_orders': 'FACT_ORDERS',
            'fact_sales': 'FACT_SALES',
            'fact_inventory': 'FACT_INVENTORY',
            'customer_interaction': 'DIM_CUSTOMER_INTERACTION',
            'bridge_product_supplier': 'BRIDGE_PRODUCT_SUPPLIER',
            'bridge_order_product': 'BRIDGE_ORDER_PRODUCT'
        }
    
    def get_missing_files(self, directory: str) -> List[str]:
        available_files = set(os.listdir(directory))
        expected_files = set(self.file_mapping.keys())
        expected_with_ext = {f"{f}.csv" for f in expected_files}
        return list(expected_with_ext - available_files)
        
    def upload_with_progress(self, directory: str) -> Dict:
        files = [f for f in os.listdir(directory) if f.endswith('.csv')]
        total = len(files)
        uploaded = 0
        failed = 0
        
        with concurrent.futures.ThreadPoolExecutor(max_workers=self.max_workers) as executor:
            future_to_file = {}
            for file_name in files:
                table_name = self.file_mapping.get(file_name.replace('.csv', ''))
                if table_name:
                    future = executor.submit(
                        self.transporter.upload_file,
                        os.path.join(directory, file_name),
                        table_name
                    )
                    future_to_file[future] = file_name
            
            for future in concurrent.futures.as_completed(future_to_file):
                file_name = future_to_file[future]
                result = future.result()
                if result['success']:
                    uploaded += 1
                else:
                    failed += 1
        return {
            'total': total,
            'uploaded': uploaded,
            'failed': failed,
            'success_rate': f"{(uploaded / total * 100):.1f}%" if total > 0 else "0%"
        }`;

  return (
    <div style={{ background: '#0F172A', color: '#CBD5E1', fontFamily: '"Inter", sans-serif', padding: '20px 0' }}>
      
      {/* ─── TITLE & OVERVIEW ────────────────────────────────────────── */}
      <div style={{ marginBottom: '48px' }}>
        <div style={{ display: 'inline-block', padding: '4px 12px', background: 'rgba(99, 102, 241, 0.1)', border: '1px solid rgba(99, 102, 241, 0.2)', borderRadius: '20px', color: '#818CF8', fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '16px' }}>
          Platform Core Data Engineering
        </div>
        <h2 style={{ color: '#fff', fontSize: '36px', fontWeight: '800', margin: '0 0 16px 0' }}>Dataset Transportation</h2>
        <p style={{ color: '#94A3B8', fontSize: '17px', margin: 0, lineHeight: '1.6', maxWidth: '800px' }}>
          System blueprint for bulk-loading and uploading structured CSV/Parquet pipelines into Snowflake, Databricks, and other SQL warehouses under validation gates.
        </p>
      </div>

      {/* ─── SYSTEM BLOCK DIAGRAM ────────────────────────────────────── */}
      <h3 style={{ color: '#fff', fontSize: '20px', fontWeight: '700', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span style={{ color: '#818CF8' }}>📐</span> High-Level Architecture Flowchart
      </h3>
      <div style={{ background: '#070C16', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '12px', padding: '24px', marginBottom: '40px', overflowX: 'auto' }}>
        <pre style={{ margin: 0, fontSize: '13px', lineHeight: '1.5', color: '#38BDF8', fontFamily: 'monospace' }}>
{`┌─────────────────────────────────────────────────────────────────────────────────────┐
│                    DATASET TRANSPORTATION — COMPLETE SYSTEM DESIGN                │
├─────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                     │
│  ┌─────────────────────────────────────────────────────────────────────────────┐  │
│  │                          DATA SOURCES                                        │  │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌──────────────────┐ │  │
│  │  │  Local       │  │  Cloud       │  │  External    │  │  Streaming       │ │  │
│  │  │  Directory   │  │  Storage     │  │  APIs        │  │  (Kafka)         │ │  │
│  │  │  (CSV/Parquet)│  │  (S3/GCS)   │  │  (REST)      │  │                  │ │  │
│  │  └──────────────┘  └──────────────┘  └──────────────┘  └──────────────────┘ │  │
│  └─────────────────────────────────────────────────────────────────────────────┘  │
│                                    │                                                │
│                                    ▼                                                │
│  ┌─────────────────────────────────────────────────────────────────────────────┐  │
│  │                      INGESTION & VALIDATION LAYER                           │  │
│  │  ┌─────────────────────────────────────────────────────────────────────────┐│  │
│  │  │  1. FILE DISCOVERY   2. SCHEMA VALIDATION  3. DATA QUALITY CHECKS      ││  │
│  │  │  4. FORMAT CONVERSION 5. COMPRESSION        6. ENCRYPTION               ││  │
│  │  └─────────────────────────────────────────────────────────────────────────┘│  │
│  └─────────────────────────────────────────────────────────────────────────────┘  │
│                                    │                                                │
│                                    ▼                                                │
│  ┌─────────────────────────────────────────────────────────────────────────────┐  │
│  │                      TRANSPORT & ORCHESTRATION LAYER                        │  │
│  │  ┌─────────────────────────────────────────────────────────────────────────┐│  │
│  │  │  1. STAGE CREATION   2. PARALLEL UPLOAD  3. RETRY LOGIC               ││  │
│  │  │  4. BATCH MANAGEMENT 5. DEPENDENCY TRACKING  6. LOGGING               ││  │
│  │  └─────────────────────────────────────────────────────────────────────────┘│  │
│  └─────────────────────────────────────────────────────────────────────────────┘  │
│                                    │                                                │
│                                    ▼                                                │
│  ┌─────────────────────────────────────────────────────────────────────────────┐  │
│  │                           DATA WAREHOUSE LAYER                              │  │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌──────────────────┐ │  │
│  │  │  Snowflake   │  │  Databricks  │  │  Redshift    │  │  BigQuery        │ │  │
│  │  │  (COPY INTO) │  │  (Spark SQL) │  │  (COPY)      │  │  (bq load)       │ │  │
│  │  └──────────────┘  └──────────────┘  └──────────────┘  └──────────────────┘ │  │
│  └─────────────────────────────────────────────────────────────────────────────┘  │
│                                    │                                                │
│                                    ▼                                                │
│  ┌─────────────────────────────────────────────────────────────────────────────┐  │
│  │                      VALIDATION & MONITORING LAYER                          │  │
│  │  ┌─────────────────────────────────────────────────────────────────────────┐│  │
│  │  │  1. ROW COUNT VALIDATION  2. SCHEMA COMPARISON  3. DATA PROFILING      ││  │
│  │  │  4. ALERTING & NOTIFICATIONS  5. METRICS DASHBOARD                     ││  │
│  │  └─────────────────────────────────────────────────────────────────────────┘│  │
│  └─────────────────────────────────────────────────────────────────────────────┘  │
│                                                                                     │
└─────────────────────────────────────────────────────────────────────────────────────┘`}
        </pre>
      </div>

      {/* ─── DETAILED LAYERS DESCRIPTION ──────────────────────────────── */}
      <h3 style={{ color: '#fff', fontSize: '20px', fontWeight: '700', marginBottom: '20px' }}>2. Core Design Components</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginBottom: '40px' }}>
        <div style={{ background: '#1E293B', padding: '24px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.06)' }}>
          <h4 style={{ color: '#818CF8', margin: '0 0 10px 0', fontSize: '16px', fontWeight: '700' }}>Local / Cloud File Sources</h4>
          <p style={{ color: '#94A3B8', fontSize: '14px', lineHeight: '1.6', margin: 0 }}>
            Supports comma/pipe delimited CSVs, highly optimized PyArrow Parquet formats, and JSON inputs. Connects securely with AWS S3, GCS, and Azure Blob storage paths.
          </p>
        </div>
        <div style={{ background: '#1E293B', padding: '24px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.06)' }}>
          <h4 style={{ color: '#00BFA5', margin: '0 0 10px 0', fontSize: '16px', fontWeight: '700' }}>Ingestion & Validation</h4>
          <p style={{ color: '#94A3B8', fontSize: '14px', lineHeight: '1.6', margin: 0 }}>
            Validates column schemas dynamically prior to transit. Flags schema drift, performs not-null checks, filters allowed ranges, and clamps outlier numerical bounds.
          </p>
        </div>
        <div style={{ background: '#1E293B', padding: '24px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.06)' }}>
          <h4 style={{ color: '#F59E0B', margin: '0 0 10px 0', fontSize: '16px', fontWeight: '700' }}>Parallelized Transportation</h4>
          <p style={{ color: '#94A3B8', fontSize: '14px', lineHeight: '1.6', margin: 0 }}>
            Bridges data packets to destinations concurrently via `ThreadPoolExecutor` workers. Employs exponential backoff retry parameters to handle transient drops.
          </p>
        </div>
      </div>

      {/* ─── CODE RECIPES SECTION ───────────────────────────────────── */}
      <h3 style={{ color: '#fff', fontSize: '20px', fontWeight: '700', marginBottom: '20px' }}>3. Orchestration & Transport Code Recipes</h3>
      
      <CodeBlock 
        title="1. Data Ingestion & Quality Validation Engine (Python)" 
        code={ingestionCode} 
        language="python" 
      />

      <CodeBlock 
        title="2. Warehouse Multicast Transporter Interface" 
        code={transporterCode} 
        language="python" 
      />

      <CodeBlock 
        title="3. Multi-Threaded Batch Uploader & File Mapping" 
        code={batchUploaderCode} 
        language="python" 
      />

      {/* ─── WAREHOUSE GUIDES ────────────────────────────────────────── */}
      <h3 style={{ color: '#fff', fontSize: '20px', fontWeight: '700', marginBottom: '20px' }}>4. Warehouse Loading Commands</h3>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginBottom: '40px' }}>
        <div style={{ background: '#1E293B', padding: '24px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.06)' }}>
          <span style={{ fontSize: '12px', background: 'rgba(0,191,165,0.1)', color: '#00BFA5', padding: '2px 8px', borderRadius: '4px', fontWeight: '700', textTransform: 'uppercase' }}>Snowflake COPY</span>
          <pre style={{ margin: '16px 0 0 0', color: '#A7F3D0', fontSize: '12px', fontFamily: 'monospace', overflowX: 'auto' }}>
{`-- Create Stage
CREATE OR REPLACE STAGE datatrust_stage
FILE_FORMAT = (TYPE = CSV SKIP_HEADER = 1);

-- COPY INTO
COPY INTO FACT_SALES
FROM @datatrust_stage/fact_sales.csv
ON_ERROR = 'CONTINUE';`}
          </pre>
        </div>
        <div style={{ background: '#1E293B', padding: '24px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.06)' }}>
          <span style={{ fontSize: '12px', background: 'rgba(56,189,248,0.1)', color: '#38BDF8', padding: '2px 8px', borderRadius: '4px', fontWeight: '700', textTransform: 'uppercase' }}>Databricks Spark</span>
          <pre style={{ margin: '16px 0 0 0', color: '#BAE6FD', fontSize: '12px', fontFamily: 'monospace', overflowX: 'auto' }}>
{`# Read CSV DBFS source
df = spark.read.option("header", "true") \\
  .csv("/FileStore/dim_customer.csv")

# Append to live metastore table
df.write.mode("append") \\
  .saveAsTable("DIM_CUSTOMER")`}
          </pre>
        </div>
        <div style={{ background: '#1E293B', padding: '24px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.06)' }}>
          <span style={{ fontSize: '12px', background: 'rgba(245,158,11,0.1)', color: '#F59E0B', padding: '2px 8px', borderRadius: '4px', fontWeight: '700', textTransform: 'uppercase' }}>BigQuery Load</span>
          <pre style={{ margin: '16px 0 0 0', color: '#FEF3C7', fontSize: '12px', fontFamily: 'monospace', overflowX: 'auto' }}>
{`# bq CLI autodetect batch command
bq load --source_format=CSV \\
  --autodetect \\
  --skip_leading_rows=1 \\
  datatrust_prod.DIM_CUSTOMER \\
  ./dim_customer.csv`}
          </pre>
        </div>
      </div>

      {/* ─── INTERACTIVE DEPLOYMENT CHECKLIST ───────────────────────── */}
      <h3 style={{ color: '#fff', fontSize: '20px', fontWeight: '700', marginBottom: '20px' }}>5. Production Deployment Checklist</h3>
      <div style={{ background: '#070C16', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '12px', padding: '24px', marginBottom: '40px' }}>
        <p style={{ color: '#94A3B8', fontSize: '14px', margin: '0 0 20px 0' }}>Click the steps below to track your dataset transportation deployment workflow:</p>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {[
            { id: 'filesReady', label: 'CSV/Parquet target datasets compiled in directory' },
            { id: 'credsConfigured', label: 'Warehouse credentials configured in settings / env' },
            { id: 'tablesCreated', label: 'Snowflake / Databricks DDL tables initialized' },
            { id: 'stageCreated', label: 'Snowflake stage / S3 bucket paths created' },
            { id: 'runScript', label: 'Batch uploader run script executed' },
            { id: 'verifyCounts', label: 'Rows counts verified in target schema catalog' },
            { id: 'checkQuality', label: 'Data quality constraint scan performed' },
            { id: 'generateReport', label: 'Ingestion validation JSON report exported' },
          ].map(item => (
            <div 
              key={item.id} 
              onClick={() => toggleChecklist(item.id)}
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '12px', 
                padding: '12px 16px', 
                background: checklist[item.id] ? 'rgba(0,191,165,0.08)' : 'rgba(255,255,255,0.02)', 
                border: checklist[item.id] ? '1px solid rgba(0,191,165,0.3)' : '1px solid rgba(255,255,255,0.05)',
                borderRadius: '8px', 
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              <div style={{ 
                width: '18px', 
                height: '18px', 
                borderRadius: '4px', 
                border: checklist[item.id] ? '2px solid #00BFA5' : '2px solid #64748B', 
                background: checklist[item.id] ? '#00BFA5' : 'transparent',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s'
              }}>
                {checklist[item.id] && <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#0F172A" strokeWidth="4"><polyline points="20 6 9 17 4 12"></polyline></svg>}
              </div>
              <span style={{ fontSize: '14px', color: checklist[item.id] ? '#F8FAFC' : '#CBD5E1', textDecoration: checklist[item.id] ? 'line-through' : 'none' }}>{item.label}</span>
            </div>
          ))}
        </div>
      </div>
      
      {/* ─── QUICK START COMMAND ────────────────────────────────────── */}
      <h3 style={{ color: '#fff', fontSize: '20px', fontWeight: '700', marginBottom: '16px' }}>6. Quick Start Run Command</h3>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px', background: '#0D1117', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px' }}>
        <code style={{ color: '#F43F5E', fontSize: '13px', fontFamily: 'monospace' }}>
          python upload_to_warehouse.py --dir /path/to/csv --warehouse snowflake
        </code>
        <span style={{ fontSize: '11px', color: '#64748B', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: '700' }}>CLI COMMAND</span>
      </div>

    </div>
  );
}
