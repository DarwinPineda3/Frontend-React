import { configureStore } from '@reduxjs/toolkit';
import NetworkObservabilityReducer from 'src/store/observability/ObservabilityNetworkSlice.tsx';
import ChangePasswordUserReducer from './apps/userProfile/ChangePassWordSlice';
import UserProfileReducer from './apps/userProfile/UserProfileSlice';
import CustomizerReducer from './customizer/CustomizerSlice';
import ObservedAssetsReducer from './observability/ObservedAssetsSlice';
import ThresholdSlice from './observability/ThresholdSettingsSlice';
import CloudInventoryReducer from './observability/cloud/CloudInventorySlice';
import AssetsReducer from './sections/AssetsSlice';
import TechInventoryReducer from './sections/cti/techInventorySlice';
import BrandMonitoringReducer from './sections/cyber-guard/BrandMonitoringSlice';
import ParametersReducer from './sections/cyber-guard/ParametersSlice';
import AlertDistribution from './sections/dashboard/AlertDistributionSlice';
import AssetsStatus from './sections/dashboard/AssetStatusSlice';
import HostsUpdatesReducer from './sections/dashboard/HostResourceSlice';
import OrgBreachesSlice from './sections/dashboard/OrgBreachesSlice';
import RecentEvents from './sections/dashboard/RecentEventsSlice';
import RedTeamUpdatesReducer from './sections/dashboard/RedTeamUpdatesSlice';
import SentimentsSumaryReducer from './sections/dashboard/SentimentHistorySlice';
import TopCardsReducer from './sections/dashboard/TopCardsSlice';
import TopVulneravilitesReducer from './sections/dashboard/TopVulnerabilitiesSlice';
import WeeklyStatsReducer from './sections/dashboard/WeeklyStatsSlice';
import MalwareAnalysesReducer from './sections/malware-analysis/MalwareAnalysisSlice';
import AppScansReducer from './sections/mobile-app/AppScanSlice';
import MobileAppsReducer from './sections/mobile-app/MobileAppSlice';
import ResultAppsReducer from './sections/mobile-app/ResultAppSlice';
import NewsLettersReducer from './sections/newsletter/NewslettersSlice';
import VulnerabilitySolutionReducer from './sections/vulnerabilities-solutions/SolutionVulnerabilitySlice';
import TranslationVulnerabilityReducer from './sections/vulnerabilities-solutions/TranslationVulnerabilitySlice';
import TicketReducer from './support/FreshTicketsSlice';
import ManagementVulnReducer from './vulnerabilities/ManagementVulnSlice';
import SummaryVulnReducer from './vulnerabilities/SummaryVulnSlice';
import CloudScanReducer from './vulnerabilities/cloud/CloudSlice';
import NetworkScanReducer from './vulnerabilities/network/NetworkScansSlice';
import EHReportsReducer from './vulnerabilities/redteam/EHReportSlice';
import WPScanReducer from "./vulnerabilities/web/WPScanSlice";
import WebApplicationsReducer from './vulnerabilities/web/WebAplicationsSlice';
import GiottoGroupReducer from './sections/compliance/giottoGroupsSlice'
import NetworkConfigurationReducer from './vulnerabilities/network/NetworkConfigSlice';

import {
  TypedUseSelectorHook,
  useDispatch as useAppDispatch,
  useSelector as useAppSelector,
} from 'react-redux';
import { combineReducers } from 'redux';

const dashboardReducer = combineReducers({
  topCards: TopCardsReducer,
  vulnerabilities: TopVulneravilitesReducer,
  redTeamUpdates: RedTeamUpdatesReducer,
  hosts: HostsUpdatesReducer,
  assetStatus: AssetsStatus,
  alertDistribution: AlertDistribution,
  recentEvents: RecentEvents,
  weeklyStats: WeeklyStatsReducer,
  orgBreaches: OrgBreachesSlice,
  sentimentsSumaryReducer: SentimentsSumaryReducer
});

export const store = configureStore({
  reducer: {
    customizer: CustomizerReducer,
    userprofileReducer: UserProfileReducer,
    assetsReducer: AssetsReducer,
    dashboard: dashboardReducer,
    techInventoryReducer: TechInventoryReducer,
    malwareAnalysesReducer: MalwareAnalysesReducer,
    mobileAppsReducer: MobileAppsReducer,
    parametersReducer: ParametersReducer,
    brandMonitoringReducer: BrandMonitoringReducer,
    appScansReducer: AppScansReducer,
    summaryVulnReducer: SummaryVulnReducer,
    newsLettersReducer: NewsLettersReducer,
    ehReportsReducer: EHReportsReducer,
    managementVulnReducer: ManagementVulnReducer,
    resultAppsReducer: ResultAppsReducer,
    ticketReducer: TicketReducer,
    wpscanReducer: WPScanReducer,
    networkScanReducer: NetworkScanReducer,
    ChangePasswordUser: ChangePasswordUserReducer,
    cloudScanReducer: CloudScanReducer,
    WebApplicationsReducer: WebApplicationsReducer,
    NetworkObservabilityReducer: NetworkObservabilityReducer,
    cloudInventoryReducer: CloudInventoryReducer,
    vulnerabitySolutionReducer: VulnerabilitySolutionReducer,
    translationVulnerabilityReducer: TranslationVulnerabilityReducer,
    ThresholdSlice: ThresholdSlice,
    ObservedAssetsReducer: ObservedAssetsReducer,
    giottoGroupReducer: GiottoGroupReducer,
    networkConfigurationReducer: NetworkConfigurationReducer,
  },
});

const rootReducer = combineReducers({
  customizer: CustomizerReducer,
  userprofileReducer: UserProfileReducer,
  assetsReducer: AssetsReducer,
  dashboard: dashboardReducer,
  techInventoryReducer: TechInventoryReducer,
  malwareAnalysesReducer: MalwareAnalysesReducer,
  mobileAppsReducer: MobileAppsReducer,
  parametersReducer: ParametersReducer,
  brandMonitoringReducer: BrandMonitoringReducer,
  appScansReducer: AppScansReducer,
  summaryVulnReducer: SummaryVulnReducer,
  newsLettersReducer: NewsLettersReducer,
  ehReportsReducer: EHReportsReducer,
  managementVulnReducer: ManagementVulnReducer,
  resultAppsReducer: ResultAppsReducer,
  ticketReducer: TicketReducer,
  wpscanReducer: WPScanReducer,
  networkScanReducer: NetworkScanReducer,
  ChangePasswordUser: ChangePasswordUserReducer,
  cloudScanReducer: CloudScanReducer,
  WebApplicationsReducer: WebApplicationsReducer,
  NetworkObservabilityReducer: NetworkObservabilityReducer,
  cloudInventoryReducer: CloudInventoryReducer,
  vulnerabitySolutionReducer: VulnerabilitySolutionReducer,
  translationVulnerabilityReducer: TranslationVulnerabilityReducer,
  ThresholdSlice: ThresholdSlice,
  ObservedAssetsReducer: ObservedAssetsReducer,
  giottoGroupReducer: GiottoGroupReducer,
  networkConfigurationReducer: NetworkConfigurationReducer,
});

export type AppState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export const { } = store;
export const useDispatch = () => useAppDispatch<AppDispatch>();
export const useSelector: TypedUseSelectorHook<AppState> = useAppSelector;
