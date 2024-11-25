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
import AiSolution from 'src/views/general/aisolution';
import Assets from 'src/views/home/assets';
import Dashboard from 'src/views/home/dashboard';
import BrandMonitoringCyberGuard from 'src/views/monitoring/cyber-guard/BrandMonitoring';
import ParametersMonitoringCyberGuard from 'src/views/monitoring/cyber-guard/Parameters';
import MalwareAnalysis from 'src/views/monitoring/malware/MalwareAnalysis';
import MitreView from 'src/views/monitoring/mitreview/MitreView';
import AppScan from 'src/views/monitoring/mobile-app/AppScan';
// import SIEMMonitoring from 'src/views/monitoring/SIEM';
import GroupGuard from 'src/guards/authGuard/GroupGuard';
import ForgotPassword from 'src/views/authentication/auth/ForgotPassword';
import Register from 'src/views/authentication/auth/Register';
import ResetPassword from 'src/views/authentication/auth/ResetPassword';
import MobileApp from 'src/views/monitoring/mobile-app/MobileApp';
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
import SocNewsDetails from 'src/views/monitoring/SOC/NewsletterDetails';
import ServiceStatus from 'src/views/monitoring/SOC/serviceStatistics';
import SourceMonitoring from 'src/views/monitoring/SOC/sourceMonitoring';
import CloudObservability from 'src/views/observability/Cloud';
import DarkWeb from 'src/views/observability/DarkWeb';
import InstallationGuide from 'src/views/observability/InstallationGuide';
import NetworkObservability from 'src/views/observability/Network';
import ObservedAssets from 'src/views/observability/ObservedAssets';
import Solutions from 'src/views/support/Solutions';
import TicketFormComp from 'src/views/support/TicketForm';
import Tickets from 'src/views/support/Tickets';
import CloudVulnerabilities from 'src/views/vulnerabilities/Cloud';
import ManagedVulnerabilitiesDetail from 'src/views/vulnerabilities/ManagedVulnerabilitiesDetail';
import ManagedVulnerabilitiesForm from 'src/views/vulnerabilities/ManagedVulnerabilitiesForm';
import ManagementVulnerabilities from 'src/views/vulnerabilities/Management';
import NetworkVulnerabilities from 'src/views/vulnerabilities/Network';
import EHReport from 'src/views/vulnerabilities/redteam/EHReport';
import EHReportDetail from 'src/views/vulnerabilities/redteam/EHReportDetail';
import SummaryVulnerabilities from 'src/views/vulnerabilities/Summary';
import WebVulnerabilities from 'src/views/vulnerabilities/Web';
import WebApplications from 'src/views/vulnerabilities/Web/Aplications';
import WordpressAplications from 'src/views/vulnerabilities/Web/WordPress';
import Loadable from '../layouts/full/shared/loadable/Loadable';
import ThresholdSettings from '../views/observability/ThresholdSettings';

const FullLayout = Loadable(lazy(() => import('../layouts/full/FullLayout')));
const BlankLayout = Loadable(lazy(() => import('../layouts/blank/BlankLayout')));
const Login = Loadable(lazy(() => import('../views/authentication/auth/Login')));
const Error = Loadable(lazy(() => import('../views/general/Error')));
const Maintenance = Loadable(lazy(() => import('../views/general/Maintenance')));

const Router = [
  {
    path: '/',
    element: (
      <AuthGuard>
        <GroupGuard>
          <FullLayout />
        </GroupGuard>
      </AuthGuard>
    ),
    children: [
      // Home
      { path: '/home/dashboard', element: <Dashboard />, roles: ['Admin', 'Scan360'] },
      { path: '/home/assets', element: <Assets />, roles: ['Admin', 'Scan360'] },

      // Vulnerabilities
      { path: '/vulnerabilities/network', element: <NetworkVulnerabilities />, roles: ['Admin', 'Scan360'] },
      { path: '/vulnerabilities/network/scans', element: <NetworkVulnerabilities />, roles: ['Admin', 'Scan360'] },
      { path: '/vulnerabilities/network/scans/:scanId', element: <NetworkVulnerabilities />, roles: ['Admin', 'Scan360'] },
      {
        path: '/vulnerabilities/network/scans/:scanId/reports/:alertId',
        element: <NetworkVulnerabilities />,
        roles: ['Admin', 'Scan360']
      },
      {
        path: '/vulnerabilities/network/scans/:scanId/reports/:alertId/vulnerabilities/:vulnerabilityId',
        element: <NetworkVulnerabilities />,
        roles: ['Admin', 'Scan360']
      },

      { path: '/vulnerabilities/web', element: <WebVulnerabilities />, roles: ['Admin', 'Scan360'] },
      { path: '/vulnerabilities/web/applications', element: <WebApplications />, roles: ['Admin', 'Scan360'] },
      { path: '/vulnerabilities/web/applications/:scanId', element: <WebApplications />, roles: ['Admin', 'Scan360'] },
      {
        path: '/vulnerabilities/web/applications/:scanId/alerts/:alertId',
        element: <WebApplications />,
        roles: ['Admin', 'Scan360']
      },

      { path: '/vulnerabilities/web/wordpress', element: <WordpressAplications />, roles: ['Admin', 'Scan360'] },
      { path: '/vulnerabilities/web/wordpress/:scanId', element: <WordpressAplications />, roles: ['Admin', 'Scan360'] },
      {
        path: '/vulnerabilities/web/wordpress/:scanId/vulnerabilities/:vulnerabilityId',
        element: <WordpressAplications />,
        roles: ['Admin', 'Scan360']
      },

      { path: '/vulnerabilities/cloud', element: <CloudVulnerabilities />, roles: ['Admin', 'Scan360'] },
      { path: '/vulnerabilities/cloud/vulnerabilities', element: <CloudVulnerabilities />, roles: ['Admin', 'Scan360'] },
      {
        path: '/vulnerabilities/cloud/vulnerabilities/:cloudId',
        element: <CloudVulnerabilities />,
        roles: ['Admin', 'Scan360']
      },

      { path: '/vulnerabilities/summary', element: <SummaryVulnerabilities />, roles: ['Admin', 'Scan360'] },
      { path: '/vulnerabilities/management', element: <ManagementVulnerabilities />, roles: ['Admin', 'Scan360'] },
      { path: '/vulnerabilities/redteam', element: <EHReport />, roles: ['Admin', 'Scan360'] },
      { path: '/vulnerabilities/redteam/:ehReportId', element: <EHReportDetail />, roles: ['Admin', 'Scan360'] },
      { path: '/vulnerabilities/management/detail/:id', element: <ManagedVulnerabilitiesDetail />, roles: ['Admin', 'Scan360'] },
      { path: '/vulnerabilities/management/form/:id', element: <ManagedVulnerabilitiesForm />, roles: ['Admin', 'Scan360'] },

      // Monitoring
      { path: '/monitoring/threats-overview', element: <DarkWeb />, roles: ['Admin', 'CyberGuard'] },

      { path: '/monitoring/cyber-guard/parameters', element: <ParametersMonitoringCyberGuard />, roles: ['Admin', 'CyberGuard'] },
      { path: '/monitoring/cyber-guard/monitoring', element: <BrandMonitoringCyberGuard />, roles: ['Admin', 'CyberGuard'] },
      { path: '/monitoring/cyber-guard/monitoring/:id', element: <BrandMonitoringCyberGuard />, roles: ['Admin', 'CyberGuard'] },
      { path: '/monitoring/cyber-guard/malware-analysis', element: <MalwareAnalysis />, roles: ['Admin', 'CyberGuard'] },
      {
        path: '/monitoring/cyber-guard/malware-analysis/:malwareAnalysisId',
        element: <MalwareAnalysis />,
        roles: ['Admin', 'CyberGuard']
      },
      { path: '/monitoring/cyber-guard/mobile-apps', element: <AppScan />, roles: ['Admin', 'CyberGuard'] },
      { path: '/monitoring/cyber-guard/mobile-apps/:appScanId', element: <MobileApp />, roles: ['Admin', 'CyberGuard'] },
      {
        path: '/monitoring/cyber-guard/mobile-apps/:appScanId/results/:resultAppId',
        element: <MobileApp />,
        roles: ['Admin', 'CyberGuard']
      },

      { path: '/monitoring/soc', element: <SOCMonitoring />, roles: ['Admin'] },
      { path: '/monitoring/soc/service-statistics', element: <ServiceStatus />, roles: ['Admin'] },
      { path: '/monitoring/soc/source-monitoring', element: <SourceMonitoring />, roles: ['Admin'] },
      { path: '/monitoring/soc/cti', element: <CTI />, roles: ['Admin'] },
      { path: '/monitoring/soc/cti/abusech', element: <AbuseCH />, roles: ['Admin'] },
      { path: '/monitoring/soc/cti/files', element: <FilesSoc />, roles: ['Admin'] },
      { path: '/monitoring/soc/cti/urls', element: <UrlsSoc />, roles: ['Admin'] },
      { path: '/monitoring/soc/cti/threat-intelligence', element: <ThreatIntelligence />, roles: ['Admin'] },
      { path: '/monitoring/soc/cti/emerging-risks', element: <EmergingRisks />, roles: ['Admin'] },
      { path: '/monitoring/soc/cti/technologies-inventory', element: <TechInventory />, roles: ['Admin'] },
      { path: '/monitoring/soc/cti/mitre', element: <MitreView />, roles: ['Admin'] },
      { path: '/monitoring/soc/brand-monitoring', element: <BrandMonitoring />, roles: ['Admin'] },
      { path: '/monitoring/soc/brand-monitoring/demo', element: <DemoBrand />, roles: ['Admin'] },
      { path: '/monitoring/soc/brand-monitoring/darknet', element: <DarkNet />, roles: ['Admin'] },
      { path: '/monitoring/soc/newsletters', element: <SocNews />, roles: ['Admin', 'CyberGuard'], },
      { path: '/monitoring/soc/newsletters/:newsletterId', element: <SocNewsDetails />, roles: ['Admin', 'CyberGuard'], },
      { path: '/monitoring/soc/takedown', element: <TicketFormComp />, roles: ['Admin', 'CyberGuard'], },

      // { path: '/monitoring/siem', element: <SIEMMonitoring /> },
      { path: '/monitoring/siem', element: <Navigate to="/maintenance" />, roles: ['Admin'] },

      // Observability
      { path: '/observability/network', element: <NetworkObservability />, roles: ['Admin', 'Scan360'] },
      { path: '/observability/network/scans', element: <NetworkObservability />, roles: ['Admin', 'Scan360'] },
      { path: '/observability/network/scans/:scanId', element: <NetworkObservability />, roles: ['Admin', 'Scan360'] },
      { path: '/observability/cloud', element: <CloudObservability />, roles: ['Admin', 'Scan360'] },
      { path: '/observability/cloud/scans/:scanId', element: <CloudObservability />, roles: ['Admin', 'Scan360'] },
      { path: '/observability/cloud/scans', element: <CloudObservability />, roles: ['Admin', 'Scan360'] },
      { path: '/observability/observed-assets', element: <ObservedAssets />, roles: ['Admin', 'Scan360'] },
      { path: '/observability/observed-assets/assets', element: <ObservedAssets />, roles: ['Admin', 'Scan360'] },
      { path: '/observability/observed-assets/assets/:id', element: <ObservedAssets />, roles: ['Admin', 'Scan360'] },
      { path: '/observability/installation-guide', element: <InstallationGuide />, roles: ['Admin', 'Scan360'] },
      { path: '/observability/threshold-settings', element: <ThresholdSettings />, roles: ['Admin', 'Scan360'] },


      // Support
      { path: '/support/tickets', element: <Tickets />, roles: ['Admin'] },
      { path: '/support/solutions', element: <Solutions />, roles: ['Admin'] },
      { path: '/support/solutions/:id', element: <SolutionDetail />, roles: ['Admin'] },
      { path: '/support/ticketform', element: <TicketFormComp />, roles: ['Admin'] },
      { path: '/support/ticket/:id', element: <TicketDetail />, roles: ['Admin'] },

      // Configuration
      { path: '/configuration/scheduled-scans', element: <ScheduledScans />, roles: ['Admin'] },
      { path: '/configuration/schedule-scan', element: <ScheduleScanForm />, roles: ['Admin'] },

      // Audit
      { path: '/audit/logs', element: <AuditLogView />, roles: ['Admin'] },

      // User Profile
      { path: '/user-profile', element: <AccountSettings /> },

      // Default Route
      { path: '/', element: <Navigate to="/home/dashboard" />, roles: ['Admin'] },

      { path: '/maintenance', element: <Maintenance />, roles: ['Admin'] },

      // Ai soliution
      { path: '/aisolution', element: <AiSolution />, roles: ['Admin'] },
    ],
  },
  {
    path: '/',
    element: <BlankLayout />,
    children: [
      { path: '/auth/login', element: <Login /> },
      { path: '/auth/signup', element: <Register /> },
      { path: '/404', element: <Error /> },
      { path: '/auth/forgot-password', element: <ForgotPassword /> },
      { path: '/auth/reset-password', element: <ResetPassword /> },
    ],
  },
  { path: '*', element: <Navigate to="/404" /> },
];

export default Router;
