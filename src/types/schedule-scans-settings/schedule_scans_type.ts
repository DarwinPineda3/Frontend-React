export enum ExecutionFrequencies {
  EVERY_DAY = 1,
}

export enum ExecutionStatuses {
  SCHEDULED = 'SCHEDULED',
  EXECUTING = 'EXECUTING',
  COMPLETED = 'COMPLETED',
  ERROR = 'ERROR',
}

export interface AssetType {
  id: number;
  name: string;
  ip: string | null;
  domain: string | null;
  url: string | null;
  hostname: string;
  uuid: string;
  created_date: string;
  updated_date: string;
}

export interface ScheduledTaskType {
  id?: number;
  name: string;
  scan_type: string;
  asset: AssetType | string;
  execution_frequency: ExecutionFrequencies | string | number;
  execution_day: string;
  execution_time: string;
  created_date?: string;
  updated_date?: string;
  elastic_task_id?: string | null;
  openvas_task_id?: string | null;
  is_active: boolean;
}

export interface ScheduledExecutionType {
  id: number;
  scheduled_date: string;
  scheduled_status: ExecutionStatuses;
  created_date: string;
  updated_date: string;
  elastic_id: string | null;
  report_id: string | null;
  openvas_task_id: string | null;
  elastic_task_id: string | null;
  scheduled_task: number;
}

export interface ScheduledScanDetail {
  scheduled_scan: ScheduledTaskType;
  scheduled_executions: ScheduledExecutionType[];
}
