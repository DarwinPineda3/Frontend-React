import { configureStore } from '@reduxjs/toolkit';
import CustomizerReducer from './customizer/CustomizerSlice';
import UserProfileReducer from './apps/userProfile/UserProfileSlice';
import AssetsReducer from './sections/AssetsSlice';

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
    parametersReducer: ParametersReducer
  },
});

const rootReducer = combineReducers({
  customizer: CustomizerReducer,
  userpostsReducer: UserProfileReducer,
  assetsReducer: AssetsReducer,
  dashboard: dashboardReducer,
  parametersReducer: ParametersReducer
});

export type AppState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export const {  } = store;
export const useDispatch = () => useAppDispatch<AppDispatch>();
export const useSelector: TypedUseSelectorHook<AppState> = useAppSelector;


