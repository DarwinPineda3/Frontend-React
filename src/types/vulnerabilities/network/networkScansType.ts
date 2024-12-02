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
