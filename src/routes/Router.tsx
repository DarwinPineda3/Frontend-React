// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import AccountSettings from 'src/components/account-settings/AccountSettings';
import ScheduleScanForm from 'src/components/configuration/ScheduleScanForm';
import SolutionDetail from 'src/components/solutions/SolutionsDetail';
import TicketDetail from 'src/components/ticketform/TicketDetail';
import AuthGuard from 'src/guards/authGuard/AuthGuard';
import AuditLogView from 'src/views/audit/AuditView';
import ScheduledScans from 'src/views/configuration/ScheduledScans';
import AiSolution from 'src/views/home/aisolution';
import Assets from 'src/views/home/assets';
import Dashboard from 'src/views/home/dashboard';
import BrandMonitoringCyberGuard from 'src/views/monitoring/cyber-guard/BrandMonitoring';
import ParametersMonitoringCyberGuard from 'src/views/monitoring/cyber-guard/Parameters';
import MalwareAnalysis from "src/views/monitoring/malware/MalwareAnalysis";
import MitreView from 'src/views/monitoring/mitreview/MitreView';
import AppScan from 'src/views/monitoring/mobile-app/AppScan';
import MobileApp from "src/views/monitoring/mobile-app/MobileApp";
import SIEMMonitoring from 'src/views/monitoring/SIEM';
import SOCMonitoring from 'src/views/monitoring/SOC';
import DarkNet from 'src/views/monitoring/SOC/brand/darknet';
import DemoBrand from 'src/views/monitoring/SOC/brand/demo';
import BrandMonitoring from 'src/views/monitoring/SOC/brandMonitoring';
import CTI from 'src/views/monitoring/SOC/cti';
import AbuseCH from 'src/views/monitoring/SOC/cti/abusesh';
import EmergingRisks from 'src/views/monitoring/SOC/cti/emerging-risks';
import FilesSoc from 'src/views/monitoring/SOC/cti/files';
import TechInventory from 'src/views/monitoring/SOC/cti/TechnologiesInventory';
import ThreatIntelligence from 'src/views/monitoring/SOC/cti/threat-intelligence';
import UrlsSoc from 'src/views/monitoring/SOC/cti/urls';
import SocNews from 'src/views/monitoring/SOC/Newsletter';
import ServiceStatus from 'src/views/monitoring/SOC/serviceStatistics';
import SourceMonitoring from 'src/views/monitoring/SOC/sourceMonitoring';
import Takedown from 'src/views/monitoring/SOC/takedown';
import CloudObservability from 'src/views/observability/Cloud';
import DarkWeb from 'src/views/observability/DarkWeb';
import InstallationGuide from 'src/views/observability/InstallationGuide';
import NetworkObservability from 'src/views/observability/Network';
import ObservedAssets from 'src/views/observability/ObservedAssets';
import Solutions from 'src/views/support/Solutions';
import TicketFormComp from 'src/views/support/TicketForm';
import Tickets from 'src/views/support/Tickets';
import CloudVulnerabilities from 'src/views/vulnerabilities/Cloud';
import ManagementVulnerabilities from 'src/views/vulnerabilities/Management';
import NetworkVulnerabilities from 'src/views/vulnerabilities/Network';
import SummaryVulnerabilities from 'src/views/vulnerabilities/Summary';
import WebVulnerabilities from 'src/views/vulnerabilities/Web';
import WebApplications from 'src/views/vulnerabilities/Web/Aplications';
import WordpressAplications from 'src/views/vulnerabilities/Web/WordPress';
import Loadable from '../layouts/full/shared/loadable/Loadable';

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
      { path: '/monitoring/threats-overview', element: <DarkWeb /> },

      { path: '/monitoring/cyber-guard/parameters', element: <ParametersMonitoringCyberGuard /> },
      { path: '/monitoring/cyber-guard/monitoring', element: <BrandMonitoringCyberGuard /> },
      { path: '/monitoring/cyber-guard/monitoring/:id', element: <BrandMonitoringCyberGuard /> },
      { path: '/monitoring/cyber-guard/malware-analysis', element: <MalwareAnalysis /> },
      { path: '/monitoring/cyber-guard/malware-analysis/:malwareAnalysisId', element: <MalwareAnalysis /> },
      { path: '/monitoring/cyber-guard/mobile-apps', element: <AppScan /> },
      { path: '/monitoring/cyber-guard/mobile-apps/:appScanId', element: <MobileApp /> },
      { path: '/monitoring/cyber-guard/mobile-apps/:appScanId/results/:mobileAppId', element: <MobileApp /> },

      { path: '/monitoring/soc', element: <SOCMonitoring /> },
      { path: '/monitoring/soc/service-statistics', element: <ServiceStatus /> },
      { path: '/monitoring/soc/source-monitoring', element: <SourceMonitoring /> },
      { path: '/monitoring/soc/cti', element: <CTI /> },
      { path: '/monitoring/soc/cti/abusech', element: <AbuseCH /> },
      { path: '/monitoring/soc/cti/files', element: <FilesSoc /> },
      { path: '/monitoring/soc/cti/urls', element: <UrlsSoc /> },
      { path: '/monitoring/soc/cti/threat-intelligence', element: <ThreatIntelligence /> },
      { path: '/monitoring/soc/cti/emerging-risks', element: <EmergingRisks /> },
      { path: '/monitoring/soc/cti/technologies-inventory', element: <TechInventory /> },
      { path: '/monitoring/soc/cti/mitre', element: <MitreView /> },
      { path: '/monitoring/soc/brand-monitoring', element: <BrandMonitoring /> },
      { path: '/monitoring/soc/brand-monitoring/demo', element: <DemoBrand /> },
      { path: '/monitoring/soc/brand-monitoring/darknet', element: <DarkNet /> },
      { path: '/monitoring/soc/newsletters', element: <SocNews /> },
      { path: '/monitoring/soc/newsletters/:newsletterId', element: <SocNews /> },
      { path: '/monitoring/soc/takedown', element: <Takedown /> },

      { path: '/monitoring/siem', element: <SIEMMonitoring /> },

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

      // Support
      { path: '/support/tickets', element: <Tickets /> },
      { path: '/support/solutions', element: <Solutions /> },
      { path: '/support/solutions/:id', element: <SolutionDetail /> },
      { path: '/support/ticketform', element: <TicketFormComp /> },
      { path: '/support/ticket/:id', element: <TicketDetail /> },

      // Configuration
      { path: '/configuration/scheduled-scans', element: <ScheduledScans /> },
      { path: '/configuration/schedule-scan', element: <ScheduleScanForm /> },

      // Audit
      { path: '/audit/logs', element: <AuditLogView /> },

      // User Profile
      { path: '/user-profile', element: <AccountSettings /> },

      // Default Route
      { path: '/', element: <Navigate to="/home/dashboard" /> },
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
