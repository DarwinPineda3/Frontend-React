export interface AssetType {
  id: string | undefined;
  name: string;
  ip: string | null;
  domain: string | null;
  url: string | null;
  hostname: string;
  uuid: string;
}