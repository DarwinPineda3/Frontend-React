export interface LatestDataType {
   query: string;
   query_type: string;
   scan_date: string;
   total_results: number;
   id: string;
}
  
export interface SummaryDataType {
   query: string;
   total_results: number;
}
  
export interface BrandMonitoringDataType {
    latest_data: LatestDataType[];
    summary_data: SummaryDataType[];
}