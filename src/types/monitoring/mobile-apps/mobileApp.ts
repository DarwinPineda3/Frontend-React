export interface MobileAppType {
  id: string | undefined;
  name: string;
  createdOn: Date;
  results?: ResultAppType[]
}
export interface Detail {
    language: string;
    downloads: string;
    permissions: string[];
}

export interface ResultAppType {
  id: string | undefined;
  idApp: string;
  appName: string;
  downloadLink: string;
  releaseDate: string;
  version: string;
  source: string;
  digitalSignature: string;
  apkHash: string;
  details?: any;
  score: number;
}