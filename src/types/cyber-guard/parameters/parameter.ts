export type ParameterTypeChoice = 
  "DOMAIN" | 
  "IPV4" | 
  "IPV6" | 
  "SUBDOMAIN" | 
  "SUBNET" | 
  "EMAIL" | 
  "PHONE" | 
  "NAME" | 
  "USERNAME" | 
  "VIN" | 
  "WORD" | 
  null;

export interface ParameterCyberGuardType {
    id: string | undefined;
    parameter: string;
    is_active: boolean;
    created_date: string;
    updated_date: string;
    parameter_type: ParameterTypeChoice;
}