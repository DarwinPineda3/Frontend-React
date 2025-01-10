export interface ComplianceProjectType {
  name: string;
  companyName: string | null;
  startDate: string;
  endDate: string;
  isDisabled: boolean;
  disabledBy: boolean | null;
  groupTechnicians: string[];
  groups: string[];
  managers: string[];
}


export interface ComplianceGroupListType {
  id?: number;
  name: string;
  assetsQty?: string | null;
}

