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

/////////////////////////////////DETAIL/////////////////////////////////

// Types for the security leaks data
export interface SecurityLeakData {
  email: string;
  ip_address: string;
  username: string;
  password: string;
  hashed_password: string;
  name: string;
  vin: string;
  address: string;
  phone: string;
  database_name: string;
  title: string;
  domain: string;
  breach_date: string;
  added_date: string;
  modified_date: string;
  pwn_count: string;
  logo_path: string;
  data_classes: string[];
  is_verified: string;
  is_fabricated: string;
  is_sensitive: string;
  is_retired: string;
  is_spam_list: string;
  is_malware: string;
  is_subscription_free: string;
}

export interface SocialNetworksData {
  id: string;
  url: string;
  engine: string;
  posted_date: string;
  text: string;
  username: string;
  user_fullname: string;
  user_followers: string;
  user_following: string;
  user_url: string;
  user_type: 'user' | 'page' | 'verified' | 'business' | string;
}

export interface SocialNetworksCounters {
  twitter: number;
  instagram: number;
  linkedin: number;
  facebook: number;
  social_network_total: number;
};

export interface SecurityLeak {
  date: string;
  data: SecurityLeakData;
  generated: null | any;
  source: string;
  type: string;
  risk_level: 'low' | 'medium' | 'high' | 'critical';
}

export interface SocialNetwork {
  date: string;
  data: SocialNetworksData;
  generated: null | any;
  source: string;
  type: string;
}

export interface Internet {
  date: string;
  data: SecurityLeakData;
  generated: null | any;
  source: string;
  type: string;
  risk_level: 'low' | 'medium' | 'high' | 'critical';
}

export interface SecurityLeaksCounters {
  sl_ips: number;
  sl_emails: number;
  sl_names_usernames: number;
  sl_phones: number;
  sl_vins: number;
  sl_domains: number;
  security_leaks_total: number;
}

// Types for consolidated data
export interface InternetCounter {
  ips: number;
  emails: number;
  names_usernames: number;
  phones: number;
  vins: number;
  domains: number;
  total: number;
}

export interface InternetData {
  [key: string]: {
    data: SecurityLeak[];
    total_results: number;
    type: string;
    description: string;
  };
}

export interface SecurityLeakCategories {
  [key: string]: {
    data: SecurityLeak[];
    total_results: number;
    type: string;
  };
}

export interface SocialNetworksCategories {
  [key: string]: {
    data: SocialNetwork[];
    total_results: number;
    type: string;
  };
}
export interface GraphicsCharts {
  labels: string[];
  values: number[];
}

export interface ConsolidatedData {
  //  internet_counters: InternetCounter;
  //  internet_data: InternetData[];
  //  graphics_charts_internet: GraphicsCharts;
  graphics_charts_social_networks:GraphicsCharts;
  social_networks_counters:SocialNetworksCounters
  social_networks_data: SocialNetworksCategories[];
  security_leaks_data: SecurityLeakCategories[];
  security_leaks_counters: SecurityLeaksCounters;
  graphics_charts_security_leaks: GraphicsCharts;
}

// Main data type
export interface Data {
  id: string;
  query: string;
  querytype: string;
  scandate: string;
  totalresults: number;
  status: string;
  consolidated_data: ConsolidatedData;
}

export interface Results {
  data: Data[];
}

// Redux state type
export interface AppState {
  data: Data | null;
  loading: boolean;
  error: string | null;
}
