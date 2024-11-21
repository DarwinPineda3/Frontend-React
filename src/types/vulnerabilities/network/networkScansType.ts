export interface NetworkScanType {
  id_elastic: string;
  id: string;
  name: string;
  comment: string | null;
  status: 'Requested' | 'Running' | 'Completed';
  progress: string;
  last_report: string;
  current_report: string;
  report_count: string;
  hosts: string;
  asset_id: number;
}
