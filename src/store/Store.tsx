import { configureStore } from '@reduxjs/toolkit';
import CustomizerReducer from './customizer/CustomizerSlice';
import UserProfileReducer from './apps/userProfile/UserProfileSlice';
import AssetsReducer from './sections/AssetsSlice';
import MalwareAnalysesReducer from "./sections/MalwareAnalysisSlice";

//dashboard reducers
import TopCardsReducer from './sections/dashboard/TopCardsSlice';
import TopVulneravilitesReducer from './sections/dashboard/TopVulnerabilitiesSlice';
import RevenueUpdatesReducer from './sections/dashboard/RevenueUpdatesSlice';
import HostsUpdatesReducer from './sections/dashboard/HostResourceSlice';
import AssetsStatus from './sections/dashboard/AssetStatusSlice';
import AlertDistribution from './sections/dashboard/AlertDistributionSlice';
import RecentEvents from './sections/dashboard/RecentEventsSlice';
import WeeklyStatsReducer from './sections/dashboard/WeeklyStatsSlice';
import OrgBreachesSlice from './sections/dashboard/OrgBreachesSlice';
// cyber guard reducers
import ParametersReducer from './sections/cyber-guard/ParametersSlice';
// brand monitoring reducers
import BrandMonitoringReducer from './sections/cyber-guard/BrandMonitoringSlice'
//monitoring reducers
import TechInventoryReducer from './sections/cti/techInventorySlice';
import NewsLettersReducer from './sections/newsletter/NewslettersSlice';


import { combineReducers } from 'redux';
import {
  useDispatch as useAppDispatch,
  useSelector as useAppSelector,
  TypedUseSelectorHook,
} from 'react-redux';

const dashboardReducer = combineReducers({
  topCards: TopCardsReducer,
  vulnerabilities: TopVulneravilitesReducer,
  revenueUpdates: RevenueUpdatesReducer,
  hosts: HostsUpdatesReducer,
  assetStatus: AssetsStatus,
  alertDistribution: AlertDistribution,
  recentEvents: RecentEvents,
  weeklyStats: WeeklyStatsReducer,
  orgBreaches: OrgBreachesSlice
})

export const store = configureStore({
  reducer: {
    customizer: CustomizerReducer,
    userpostsReducer: UserProfileReducer,
    assetsReducer: AssetsReducer,
    dashboard: dashboardReducer,
    techInventoryReducer: TechInventoryReducer,
    malwareAnalysesReducer: MalwareAnalysesReducer,
    parametersReducer: ParametersReducer,
    brandMonitoringReducer: BrandMonitoringReducer,
    newsLettersReducer: NewsLettersReducer,
  },
});

const rootReducer = combineReducers({
  customizer: CustomizerReducer,
  userpostsReducer: UserProfileReducer,
  assetsReducer: AssetsReducer,
  dashboard: dashboardReducer,
  techInventoryReducer: TechInventoryReducer,
  malwareAnalysesReducer: MalwareAnalysesReducer,
  parametersReducer: ParametersReducer,
  brandMonitoringReducer: BrandMonitoringReducer,
  newsLettersReducer: NewsLettersReducer,
});

export type AppState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export const {  } = store;
export const useDispatch = () => useAppDispatch<AppDispatch>();
export const useSelector: TypedUseSelectorHook<AppState> = useAppSelector;


