export interface EHReportType {
  id: string;
  name?: string;
  start_date_report?: string;
  end_date_report?: string;
  objectives?: string;
  created_date?: Date;
  // charts
  risk_exposure_level?: number;
  matriz_low_low?: number;
  matriz_low_medium?: number;
  matriz_low_high?: number;
  matriz_medium_low?: number;
  matriz_medium_medium?: number;
  matriz_medium_high?: number;
  matriz_high_low?: number;
  matriz_high_medium?: number;
  matriz_high_high?: number;
  // Baseline info
  comments?: string;
  description_tests?: string;
  first_conclusion?: string;
  second_conclusion?: string;
  third_conclusion?: string;
  fourth_conclusion?: string;
  fifth_conclusion?: string;
}

export interface EHVulnerabilityType {
  vulnerability?: string;
  description?: string;
  affected_components?: string;
  solution?: string;
  identifier?: string;
  host?: string;
  port_protocol?: string;
  cvss_score?: number;
  risk?: string;
  impact?: string;
  probability_occurrence?: string;
  exploitable?: boolean;
  created_date?: Date;
}
