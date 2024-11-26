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
  comment: string;
  creation_time: string; // ISO timestamp
  modification_time: string; // ISO timestamp
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
