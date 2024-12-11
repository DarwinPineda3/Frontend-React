import { configureStore } from '@reduxjs/toolkit';
import UserProfileReducer from './apps/userProfile/UserProfileSlice';
import CustomizerReducer from './customizer/CustomizerSlice';
import AssetsReducer from './sections/AssetsSlice';

//dashboard reducers
import AlertDistribution from './sections/dashboard/AlertDistributionSlice';
import AssetsStatus from './sections/dashboard/AssetStatusSlice';
import HostsUpdatesReducer from './sections/dashboard/HostResourceSlice';
import OrgBreachesSlice from './sections/dashboard/OrgBreachesSlice';
import RecentEvents from './sections/dashboard/RecentEventsSlice';
import RevenueUpdatesReducer from './sections/dashboard/RevenueUpdatesSlice';
import SentimentsSumaryReducer from './sections/dashboard/SentimentHistorySlice';
import TopCardsReducer from './sections/dashboard/TopCardsSlice';
import TopVulneravilitesReducer from './sections/dashboard/TopVulnerabilitiesSlice';
import WeeklyStatsReducer from './sections/dashboard/WeeklyStatsSlice';
// cyber guard reducers
import ParametersReducer from './sections/cyber-guard/ParametersSlice';
// brand monitoring reducers
import BrandMonitoringReducer from './sections/cyber-guard/BrandMonitoringSlice';
//monitoring reducers
import TechInventoryReducer from './sections/cti/techInventorySlice';
import MalwareAnalysesReducer from './sections/malware-analysis/MalwareAnalysisSlice';
import AppScansReducer from './sections/mobile-app/AppScanSlice';
import MobileAppsReducer from './sections/mobile-app/MobileAppSlice';
import ResultAppsReducer from './sections/mobile-app/ResultAppSlice';
import NewsLettersReducer from './sections/newsletter/NewslettersSlice';
//vulnerabilities
import ChangePasswordUserReducer from './apps/userProfile/ChangePassWordSlice';
import TicketReducer from './support/FreshTicketsSlice';
import ManagementVulnReducer from './vulnerabilities/ManagementVulnSlice';
import SummaryVulnReducer from './vulnerabilities/SummaryVulnSlice';
import NetworkScanReducer from './vulnerabilities/network/NetworkScansSlice';
import EHReportsReducer from './vulnerabilities/redteam/EthicalHackingReportSlice';
import WebApplicationsReducer from './vulnerabilities/web/WebAplicationsSlice';

import {
  TypedUseSelectorHook,
  useDispatch as useAppDispatch,
  useSelector as useAppSelector,
} from 'react-redux';
import { combineReducers } from 'redux';

const dashboardReducer = combineReducers({
  topCards: TopCardsReducer,
  vulnerabilities: TopVulneravilitesReducer,
  revenueUpdates: RevenueUpdatesReducer,
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
    networkScanReducer: NetworkScanReducer,
    ChangePasswordUser: ChangePasswordUserReducer,
    WebApplicationsReducer: WebApplicationsReducer,
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
  networkScanReducer: NetworkScanReducer,
  ChangePasswordUser: ChangePasswordUserReducer,
  WebApplicationsReducer: WebApplicationsReducer,
});

export type AppState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export const { } = store;
export const useDispatch = () => useAppDispatch<AppDispatch>();
export const useSelector: TypedUseSelectorHook<AppState> = useAppSelector;
