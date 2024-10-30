// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React, { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import Loadable from '../layouts/full/shared/loadable/Loadable';
import ScheduledScans from 'src/views/configuration/ScheduledScans';
import ScheduleScanForm from 'src/components/configuration/ScheduleScanForm';
import InstallationGuide from 'src/views/observability/InstallationGuide';
import ObservedAssets from 'src/views/observability/ObservedAssets';
import Solutions from 'src/views/support/Solutions';
import SolutionDetail from 'src/components/solutions/SolutionsDetail'; 
import Assets from 'src/views/home/assets';
import Dashboard from 'src/views/home/dashboard';
import CloudVulnerabilities from 'src/views/vulnerabilities/Cloud';
import ManagementVulnerabilities from 'src/views/vulnerabilities/Management';
import NetworkVulnerabilities from 'src/views/vulnerabilities/Network';
import SummaryVulnerabilities from 'src/views/vulnerabilities/Summary';
import WebVulnerabilities from 'src/views/vulnerabilities/Web';
import SIEMMonitoring from 'src/views/monitoring/SIEM';
import SOCMonitoring from 'src/views/monitoring/SOC';
import ParametersMonitoringCyberGuard from 'src/views/monitoring/cyber-guard/Parameters';
import BrandMonitoringCyberGuard from 'src/views/monitoring/cyber-guard/BrandMonitoring'
import CloudObservability from 'src/views/observability/Cloud';
import NetworkObservability from 'src/views/observability/Network';
import Tickets from 'src/views/support/Tickets';
import AuthGuard from 'src/guards/authGuard/AuthGuard';
import WebApplications from 'src/views/vulnerabilities/Web/Aplications';
import AiSolution from 'src/views/home/aisolution';
import WordpressAplications from 'src/views/vulnerabilities/Web/WordPress';
import TicketFormComp from 'src/views/support/TicketForm';
import TicketsView from 'src/views/support/Ticketsview';
import TicketDetail from 'src/components/ticketform/TicketDetail';
import AuditLogView from 'src/views/audit/AuditView';
import MittrView from 'src/views/monitoring/mittreview/MittrView';
import ServiceStatus from 'src/views/monitoring/SOC/serviceStatistics';
import SourceMonitoring from 'src/views/monitoring/SOC/sourceMonitoring';
import CTI from 'src/views/monitoring/SOC/cti';
import BrandMonitoring from 'src/views/monitoring/SOC/brandMonitoring';
import SocNews from 'src/views/monitoring/SOC/Newsletter';
import Takedown from 'src/views/monitoring/SOC/takedown';
import FilesSoc from 'src/views/monitoring/SOC/cti/files';
import UrlsSoc from 'src/views/monitoring/SOC/cti/urls';
import AbuseCH from 'src/views/monitoring/SOC/cti/abusesh';
import TechInventory from 'src/views/monitoring/SOC/cti/TechnologiesInventory';
import DescriptionThreat from 'src/views/monitoring/SOC/cti/description';
import DemoBrand from 'src/views/monitoring/SOC/brand/demo';
import DarkNet from 'src/views/monitoring/SOC/brand/darknet';
import MalwareAnalysis from "src/views/monitoring/malware/MalwareAnalysis";
import UserProfile from 'src/views/apps/user-profile/UserProfile';
import AccountSettings from 'src/components/account-settings/AccountSettings';
import DarkWeb from 'src/views/observability/DarkWeb';
import MobileApp from "src/views/monitoring/mobile-app/MobileApp";
import AppScan from 'src/views/monitoring/mobile-app/AppScan';

const FullLayout = Loadable(lazy(() => import('../layouts/full/FullLayout')));
const BlankLayout = Loadable(lazy(() => import('../layouts/blank/BlankLayout')));
const Login = Loadable(lazy(() => import('../views/authentication/auth/Login')));

const Router = [
  {
    path: '/',
    element: (
      <AuthGuard>
        <FullLayout />
      </AuthGuard>
    ),
    children: [
      // Home
      { path: '/home/dashboard', element: <Dashboard /> },
      { path: '/home/assets', element: <Assets /> },
      { path: '/aisolution', element: <AiSolution /> },

      // Vulnerabilities
      { path: '/vulnerabilities/network', element: <NetworkVulnerabilities /> },
      { path: '/vulnerabilities/network/scans', element: <NetworkVulnerabilities /> },
      { path: '/vulnerabilities/network/scans/:scanId', element: <NetworkVulnerabilities /> },
      { path: '/vulnerabilities/network/scans/:scanId/reports/:alertId', element: <NetworkVulnerabilities /> },
      { path: '/vulnerabilities/network/scans/:scanId/reports/:alertId/vulnerabilities/:vulnerabilityId', element: <NetworkVulnerabilities /> },

      { path: '/vulnerabilities/web', element: <WebVulnerabilities /> },
      { path: '/vulnerabilities/web/applications', element: <WebApplications /> },
      { path: '/vulnerabilities/web/applications/:scanId', element: <WebApplications /> },
      { path: '/vulnerabilities/web/applications/:scanId/alerts/:alertId', element: <WebApplications /> },

      { path: '/vulnerabilities/web/wordpress', element: <WordpressAplications /> },
      { path: '/vulnerabilities/web/wordpress/:scanId', element: <WordpressAplications /> },
      { path: '/vulnerabilities/web/wordpress/:scanId/vulnerabilities/:vulnerabilityId', element: <WordpressAplications /> },

      { path: '/vulnerabilities/cloud', element: <CloudVulnerabilities /> },
      { path: '/vulnerabilities/cloud/vulnerabilities', element: <CloudVulnerabilities /> },
      { path: '/vulnerabilities/cloud/vulnerabilities/:cloudId', element: <CloudVulnerabilities /> },

      { path: '/vulnerabilities/summary', element: <SummaryVulnerabilities /> },
      { path: '/vulnerabilities/management', element: <ManagementVulnerabilities /> },

      // Monitoring
      { path: '/monitoring/soc', element: <SOCMonitoring /> },
      { path: '/monitoring/siem', element: <SIEMMonitoring /> },
      { path: '/monitoring/mittre', element: <MittrView /> },
      { path: '/monitoring/soc/service-statistics', element: <ServiceStatus /> },
      { path: '/monitoring/soc/source-monitoring', element: <SourceMonitoring /> },
      { path: '/monitoring/soc/cti', element: <CTI /> },
      { path: '/monitoring/soc/cti/description', element: <DescriptionThreat /> },
      { path: '/monitoring/soc/cti/abusech', element: <AbuseCH /> },
      { path: '/monitoring/soc/cti/files', element: <FilesSoc /> },
      { path: '/monitoring/soc/cti/urls', element: <UrlsSoc /> },
      { path: '/monitoring/soc/cti/technologies-inventory', element: <TechInventory /> },
      { path: '/monitoring/soc/brand-monitoring', element: <BrandMonitoring /> },
      { path: '/monitoring/soc/brand-monitoring/demo', element: <DemoBrand /> },
      { path: '/monitoring/soc/brand-monitoring/darknet', element: <DarkNet /> },
      { path: '/monitoring/soc/newsletters', element: <SocNews /> },
      { path: '/monitoring/soc/newsletters/:newsletterId', element: <SocNews /> },
      { path: '/monitoring/soc/takedown', element: <Takedown /> },
      { path: '/monitoring/cyber-guard/malware-analysis', element: <MalwareAnalysis /> },
      { path: '/monitoring/cyber-guard/malware-analysis/:malwareAnalysisId', element: <MalwareAnalysis /> },
      { path: '/monitoring/siem', element: <SIEMMonitoring /> },
      { path: '/monitoring/cyber-guard/parameters', element: <ParametersMonitoringCyberGuard /> },
      { path: '/monitoring/cyber-guard/brand-monitoring', element: <BrandMonitoringCyberGuard /> },
      { path: '/monitoring/cyber-guard/brand-monitoring/:id', element: <BrandMonitoringCyberGuard /> },
      { path: '/monitoring/cyber-guard/mobile-app', element: <AppScan /> },
      { path: '/monitoring/cyber-guard/mobile-app/scan-app/:appScanId', element: <MobileApp /> },
      { path: '/monitoring/cyber-guard/mobile-app/scan-app/:appScanId/result-app/:mobileAppId', element: <MobileApp /> },
      
      { path: '/monitoring/cyber-guard/monitoring', element: <BrandMonitoringCyberGuard /> },
      { path: '/monitoring/cyber-guard/monitoring/:id', element: <BrandMonitoringCyberGuard /> },

      // Observability
      { path: '/observability/network', element: <NetworkObservability /> },
      { path: '/observability/network/scans', element: <NetworkObservability /> },
      { path: '/observability/network/scans/:scanId', element: <NetworkObservability /> },
      { path: '/observability/cloud', element: <CloudObservability /> },
      { path: '/observability/cloud/scans/:scanId', element: <CloudObservability /> },
      { path: '/observability/cloud/scans', element: <CloudObservability /> },
      { path: '/observability/observed-assets', element: <ObservedAssets /> },
      { path: '/observability/observed-assets/assets', element: <ObservedAssets /> },
      { path: '/observability/observed-assets/assets/:id', element: <ObservedAssets /> },
      { path: '/observability/installation-guide', element: <InstallationGuide /> },
      { path: '/monitoring/threats-overview', element: <DarkWeb /> },

      // Support
      { path: '/support/tickets', element: <Tickets /> },
      { path: '/support/solutions', element: <Solutions /> },
      { path: '/support/solutions/:id', element: <SolutionDetail /> }, 
      { path: '/support/ticketform', element: <TicketFormComp /> },
      { path: '/support/ticketsview', element: <TicketsView /> },
      { path: '/support/ticket/:id', element: <TicketDetail /> },

      // Configuration
      { path: '/configuration/scheduled-scans', element: <ScheduledScans /> },
      { path: '/configuration/schedule-scan', element: <ScheduleScanForm /> },

      // Audit
      { path: '/audit/log', element: <AuditLogView /> },
      { path: '/audit/logs', element: <AuditLogView /> },

      // Default Route
      { path: '/', element: <Navigate to="/home/dashboard" /> },

      // User Profile
      { path: '/user-profile', element: <UserProfile /> },
      { path: '/account-settings', element: <AccountSettings /> },
    ],
  },
  {
    path: '/',
    element: <BlankLayout />,
    children: [
      { path: '/auth/login', element: <Login /> },
      { path: '/auth/404', element: <Navigate to="/auth/404" /> },
    ],
  },
  // Catch-all 404 Route (for any undefined route)
  { path: '*', element: <Navigate to="/auth/404" /> },
];


export default Router;
