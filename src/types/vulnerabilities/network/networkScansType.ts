export interface NetworkScanType {
  id_elastic: string;
  id: string;
  name: string;
  comment: string | null;
  status: string;
  progress: string;
  last_report: string;
  current_report: string;
  report_count: string;
  hosts: string;
  asset_id: number;
}

export interface Asset {
  id: number;
  name: string;
  ip: string | null;
  domain: string | null;
  url: string | null;
  hostname: string;
  created_date: string; // ISO timestamp
  updated_date: string; // ISO timestamp
}

export interface PortList {
  id: string;
  name: string;
}

export interface SshCredential {
  id: string;
  name: string | null;
  port: number | null;
}

export interface Target {
  id: string;
  name: string;
  comment: string | null;
  creation_time: string; // ISO timestamp
  modification_time: string; // ISO timestamp
  in_use: string;
  permission: string;
  hosts: string;
  max_hosts: string;
  port_list: PortList;
  ssh_credential: SshCredential;
  alive_tests: string;
  is_active: boolean;
  asset_id: number;
  id_elastic: string;
}

export interface ScanConfig {
  id: string;
  name: string;
  comment?: string;
  creation_time?: string; // ISO timestamp
  modification_time?: string; // ISO timestamp
}

export interface ResponseData {
  assets: Asset[];
  targets: Target[];
  scan_configs: ScanConfig[];
  error: string | null;
}

export interface NetworkScanCreate {
  name: string;
  comment: string;
  hosts: string;
  scan_config_id: string;
}

export interface NetworkScanReport {
  id: string;
  name: string;
  severity: string;
  scan_run_status: string;
}

export interface ScanTarget {
  id: string;
  name: string;
  hosts: string;
  asset_id: number;
}

export interface Scanner {
  id: string;
  name: string;
  type: string;
}

export interface ReportCount {
  total: string;
  finished: string;
}

export interface Schedule {
  id: string | null;
  name: string | null;
}

export interface Scan {
  id: string;
  name: string;
  comment: string;
  creation_time: string;
  modification_time: string;
  permission: string;
  usage_type: string;
  config: ScanConfig;
  target: ScanTarget;
  hosts_ordering: string | null;
  scanner: Scanner;
  status: string;
  progress: string;
  report_count: ReportCount;
  schedule: Schedule;
  schedule_periods: string;
  observers: string | null;
  is_active: boolean;
  id_elastic: string;
}

export interface GraphicsChartsData {
  labels: string[];
  values: number[];
}

interface Nvt {
  oid: string;
  type: string;
  name: string;
  family: string;
  cvss_base: string;
  severities: Severity[];
  tags: Tags;
  solution: Solution;
  refs: any[];
}

interface Severity {
  severity: CvssBaseSeverity;
}

interface CvssBaseSeverity {
  type: string;
  origin: string | null;
  date: string;
  score: string;
  value: string;
}

interface Tags {
  cvss_base_vector: string;
  summary: string;
  insight: string;
  affected: string;
  impact: string;
  solution: string;
  vuldetect: string;
  solution_type: string;
}

interface Solution {
  type: string;
  id: string;
}

interface Qod {
  value: string;
  type: string | null;
}

interface Host {
  host: string;
  asset: AssetN;
  hostname: string | null;
  details: Detail[];
}

interface Detail {
  name: string;
  value: string;
  source: {
    type: string;
    name: string;
    description: string | null;
  };
  extra: string | null;
}

interface Result {
  id: string;
  name: string;
  modification_time: string;
  comment: string | null;
  creation_time: string;
  host: Host;
  port: string;
  nvt: Nvt;
  scan_nvt_version: string;
  severity: number;
  threat: string;
  qod: Qod;
  description: string;
  original_threat: string;
  original_severity: string;
  report_date: string;
  creation_time_format?: string;
}

interface ResultN {
  result: Result;
}

interface ListOS {
  result: Result;
}

interface Task {
  id: string;
  name: string;
}

interface TaskN {
  id: string;
  name: string;
  comment: string | null;
  target: {
    id: string;
    name: string;
    comment: string | null;
  };
  id_elastic: string;
  hosts: string;
}

interface PortDetails {
  ports: Port[];
}

interface Port {
  port: PortInfo;
}

interface PortInfo {
  port: string;
  host: string;
  severity: number;
  threat: string;
}

interface ResultCount {
  full: string;
  filtered: string;
  hole: CountDetails;
  info: CountDetails;
  warning: CountDetails;
  false_positive: CountDetails;
}

interface CountDetails {
  full: string;
  filtered: string;
}

interface ErrorCount {
  count: string;
}

interface HostList {
  ip: string;
  asset: AssetN;
  start: string;
  end: string;
  result_count: ResultCountPage;
}

interface AssetN {
  asset_id: string;
}

interface ResultCountPage {
  page: string;
  hole: CountDetailsPage;
  warning: CountDetailsPage;
  info: CountDetailsPage;
  log: CountDetailsPage;
  false_positive: CountDetailsPage;
}

interface CountDetailsPage {
  page: string;
}

interface ReportS {
  scan_run_status: string;
  hosts: {
    count: string;
  };
  closed_cves: string;
  vulns: {
    count: string;
  };
  os: {
    count: number;
  };
  apps: {
    count: number;
  };
  ssl_certs: string;
  task: TaskN;
  timestamp: string;
  scan_start: string;
  timezone: string;
  timezone_abbrev: string;
  ports: PortDetails[];
  result_count: ResultCount;
  severity: ResultCount;
  scan_end: string;
  errors: ErrorCount;
  host_list: HostList[];
  results: ResultN[];
  vulnerabilities: ResultN[];
  scan_end_format: string;
}

interface Statistics {
  critical: number;
  high: number;
  medium: number;
  low: number;
  count_vulnerabilities: number;
}

interface Report {
  id: string;
  name: string;
  comment: string | null;
  creation_time: string;
  modification_time: string;
  task: Task;
  report: ReportS;
  statistics: Statistics;
  is_last_report: boolean;
  elastic_id: string;
}

export interface ReportDetail {
  task_id: string;
  report: Report;
  report_detail_chart_data: GraphicsChartsData;
  list_os: ListOS[];
  id_elastic: string;
}
