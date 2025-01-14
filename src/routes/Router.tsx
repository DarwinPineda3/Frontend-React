// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import AccountSettings from 'src/components/account-settings/AccountSettings';
import ProjectDetails from 'src/components/compliance/giotto-projects/giottoProjectDetails';
import ScheduleScanForm from 'src/components/configuration/ScheduleScanForm';
import CreateCloudInventory from 'src/components/observability/cloud/cloudInventoryCreate';
import SolutionDetail from 'src/components/solutions/SolutionsDetail';
import TicketDetail from 'src/components/ticketform/TicketDetail';
import CreateProwlerScan from 'src/components/vulnerabilities/cloud/cloudScanCreate';
import CreateWPScan from 'src/components/vulnerabilities/web/wordpress/wpscanCreate';
import WpVulDetail from 'src/components/vulnerabilities/web/wordpress/wpVulnerabilityDetail';
import AuthGuard from 'src/guards/authGuard/AuthGuard';
import GroupGuard from 'src/guards/authGuard/GroupGuard';
import AuditLogView from 'src/views/audit/AuditView';
import ForgotPassword from 'src/views/authentication/auth/ForgotPassword';
import Register from 'src/views/authentication/auth/Register';
import ResetPassword from 'src/views/authentication/auth/ResetPassword';
import ChangelogView from 'src/views/changelog/ChangelogView';
import AssessmentStatusByAsset from 'src/views/compliance/compliance-reports/AssessmentStatusByAsset';
import ComplianceAssetsView from 'src/views/compliance/ComplianceAssetsView';
import ComplianceExecutionsView from 'src/views/compliance/ComplianceExecutionsView';
import ComplianceGroupsView from 'src/views/compliance/ComplianceGroupsView';
import ComplianceProjectsView from 'src/views/compliance/ComplianceProjectsView';
import ComplianceReports from 'src/views/compliance/ComplianceReports';
import CreateComplianceProjects from 'src/views/compliance/CreateComplianceProjectsView';
import EditComplianceProjects from 'src/views/compliance/EditComplianceProjectsView';
import ScheduledScans from 'src/views/configuration/ScheduledScans';
import Assets from 'src/views/home/assets';
import Dashboard from 'src/views/home/dashboard';
import BrandMonitoringCyberGuard from 'src/views/monitoring/cyber-guard/BrandMonitoring';
import ParametersMonitoringCyberGuard from 'src/views/monitoring/cyber-guard/Parameters';
import MalwareAnalysis from 'src/views/monitoring/malware/MalwareAnalysis';
import MitreView from 'src/views/monitoring/mitreview/MitreView';
import AppScan from 'src/views/monitoring/mobile-app/AppScan';
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
import CloudInventory from 'src/views/observability/Cloud';
import DarkWeb from 'src/views/observability/DarkWeb';
import InstallationGuide from 'src/views/observability/InstallationGuide';
import NetworkObservability from 'src/views/observability/Network';
import NetworkObservabilityCreateScan from 'src/views/observability/NetworkObservabilityCreateScan';
import ObservedAssets from 'src/views/observability/ObservedAssets';
import Solutions from 'src/views/support/Solutions';
import TicketFormComp from 'src/views/support/TicketForm';
import Tickets from 'src/views/support/Tickets';
import CloudVulnerabilities from 'src/views/vulnerabilities/Cloud';
import CloudVulnerabilitiesDetails from 'src/views/vulnerabilities/CloudDetail';
import ManagedVulnerabilitiesDetail from 'src/views/vulnerabilities/ManagedVulnerabilitiesDetail';
import ManagedVulnerabilitiesForm from 'src/views/vulnerabilities/ManagedVulnerabilitiesForm';
import ManagementVulnerabilities from 'src/views/vulnerabilities/Management';
import NetworkVulnerabilities from 'src/views/vulnerabilities/Network';
import NetworkCreateScan from 'src/views/vulnerabilities/network/NetworkCreateScan';
import NetworkVulnerabilitiesDetail from 'src/views/vulnerabilities/NetworkDetail';
import EHReport from 'src/views/vulnerabilities/redteam/EHReport';
import EHReportDetail from 'src/views/vulnerabilities/redteam/EHReportDetail';
import SummaryVulnerabilities from 'src/views/vulnerabilities/Summary';
import WebVulnerabilities from 'src/views/vulnerabilities/Web';
import WebApplications from 'src/views/vulnerabilities/Web/Aplications';
import WebAppCreateScan from 'src/views/vulnerabilities/Web/WebAppCreateScan';
import WordpressAplications from 'src/views/vulnerabilities/Web/WordPress';
import Loadable from '../layouts/full/shared/loadable/Loadable';
import ThresholdSettings from '../views/observability/ThresholdSettings';

const FullLayout = Loadable(lazy(() => import('../layouts/full/FullLayout')));
const BlankLayout = Loadable(lazy(() => import('../layouts/blank/BlankLayout')));
const Login = Loadable(lazy(() => import('../views/authentication/auth/Login')));
const Error = Loadable(lazy(() => import('../views/general/Error')));
const Maintenance = Loadable(lazy(() => import('../views/general/Maintenance')));
const Logout = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  return <Navigate to="/auth/login" />;
};

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
      {
        path: '/vulnerabilities/network/scans',
        element: <NetworkVulnerabilities />,
        roles: ['Admin', 'Scan360'],
      },
      {
        path: '/vulnerabilities/network/scans/:scanId',
        element: <NetworkVulnerabilities />,
        roles: ['Admin', 'Scan360'],
      },
      {
        path: '/vulnerabilities/network/scans/create',
        element: <NetworkCreateScan />,
        roles: ['Admin', 'Scan360'],
      },
      {
        path: '/vulnerabilities/network/scans/detail/:scanId',
        element: <NetworkVulnerabilitiesDetail />,
        roles: ['Admin', 'Scan360'],
      },
      {
        path: '/vulnerabilities/network/scans/:scanId/reports/:alertId',
        element: <NetworkVulnerabilities />,
        roles: ['Admin', 'Scan360'],
      },
      {
        path: '/vulnerabilities/network/scans/:scanId/reports/:alertId/vulnerabilities/:vulnerabilityId/:index',
        element: <NetworkVulnerabilities />,
        roles: ['Admin', 'Scan360'],
      },

      {
        path: '/vulnerabilities/web',
        element: <WebVulnerabilities />,
        roles: ['Admin', 'Scan360'],
      },
      {
        path: '/vulnerabilities/web/applications',
        element: <WebApplications />,
        roles: ['Admin', 'Scan360'],
      },
      {
        path: '/vulnerabilities/web/applications/create',
        element: <WebAppCreateScan />,
        roles: ['Admin', 'Scan360'],
      },
      {
        path: '/vulnerabilities/web/applications/:scanId',
        element: <WebApplications />,
        roles: ['Admin', 'Scan360'],
      },
      {
        path: '/vulnerabilities/web/applications/:scanId/alerts/:alertId',
        element: <WebApplications />,
        roles: ['Admin', 'Scan360'],
      },

      {
        path: '/vulnerabilities/web/wordpress',
        element: <WordpressAplications />,
        roles: ['Admin', 'Scan360'],
      },
      {
        path: '/vulnerabilities/web/wordpress/create',
        element: <CreateWPScan />,
        roles: ['Admin', 'Scan360'],
      },
      {
        path: '/vulnerabilities/web/wordpress/:scanId',
        element: <WordpressAplications />,
        roles: ['Admin', 'Scan360'],
      },
      {
        path: '/vulnerabilities/web/wordpress/:scanId/vulnerabilities',
        element: <WpVulDetail />,
        roles: ['Admin', 'Scan360'],
      },
      {
        path: '/vulnerabilities/web/wordpress/:scanId/vulnerabilities/:vulnerabilityId',
        element: <WordpressAplications />,
        roles: ['Admin', 'Scan360'],
      },

      {
        path: '/vulnerabilities/cloud',
        element: <CloudVulnerabilities />,
        roles: ['Admin', 'Scan360'],
      },
      {
        path: '/vulnerabilities/cloud/vulnerabilities/:cloudId',
        element: <CloudVulnerabilitiesDetails />,
        roles: ['Admin', 'Scan360'],
      },
      {
        path: '/vulnerabilities/cloud/create',
        element: <CreateProwlerScan />,
        roles: ['Admin', 'Scan360'],
      },

      {
        path: '/vulnerabilities/summary',
        element: <SummaryVulnerabilities />,
        roles: ['Admin', 'Scan360'],
      },
      {
        path: '/vulnerabilities/management',
        element: <ManagementVulnerabilities />,
        roles: ['Admin', 'Scan360'],
      },
      { path: '/vulnerabilities/redteam', element: <EHReport />, roles: ['Admin', 'Scan360'] },
      {
        path: '/vulnerabilities/redteam/:ehReportId',
        element: <EHReportDetail />,
        roles: ['Admin', 'Scan360'],
      },
      {
        path: '/vulnerabilities/management/detail/:id',
        element: <ManagedVulnerabilitiesDetail />,
        roles: ['Admin', 'Scan360'],
      },
      {
        path: '/vulnerabilities/management/form/:id',
        element: <ManagedVulnerabilitiesForm />,
        roles: ['Admin', 'Scan360'],
      },

      // Observability
      {
        path: '/observability/network',
        element: <NetworkObservability />,
        roles: ['Admin', 'Scan360'],
      },
      {
        path: '/observability/network/scans',
        element: <NetworkObservability />,
        roles: ['Admin', 'Scan360'],
      },
      {
        path: '/observability/network/create',
        element: <NetworkObservabilityCreateScan />,
        roles: ['Admin', 'Scan360'],
      },
      {
        path: '/observability/network/scans/:scanId',
        element: <NetworkObservability />,
        roles: ['Admin', 'Scan360'],
      },
      {
        path: '/observability/cloud',
        element: <CloudInventory />,
        roles: ['Admin', 'Scan360'],
      },
      {
        path: '/observability/cloud/create',
        element: <CreateCloudInventory />,
        roles: ['Admin', 'Scan360'],
      },
      {
        path: '/observability/cloud/scans/:scanId',
        element: <CloudInventory />,
        roles: ['Admin', 'Scan360'],
      },
      {
        path: '/observability/cloud/scans',
        element: <CloudInventory />,
        roles: ['Admin', 'Scan360'],
      },
      {
        path: '/observability/observed-assets',
        element: <ObservedAssets />,
        roles: ['Admin', 'Scan360'],
      },
      {
        path: '/observability/observed-assets/assets',
        element: <ObservedAssets />,
        roles: ['Admin', 'Scan360'],
      },
      {
        path: '/observability/observed-assets/assets/:id',
        element: <ObservedAssets />,
        roles: ['Admin', 'Scan360'],
      },
      {
        path: '/observability/installation-guide',
        element: <InstallationGuide />,
        roles: ['Admin', 'Scan360'],
      },
      {
        path: '/observability/threshold-settings',
        element: <ThresholdSettings />,
        roles: ['Admin', 'Scan360'],
      },

      // Monitoring
      {
        path: '/monitoring/threats-overview',
        element: <DarkWeb />,
        roles: ['Admin', 'CyberGuard'],
      },

      {
        path: '/monitoring/cyber-guard/parameters',
        element: <ParametersMonitoringCyberGuard />,
        roles: ['Admin', 'CyberGuard'],
      },
      {
        path: '/monitoring/cyber-guard/monitoring',
        element: <BrandMonitoringCyberGuard />,
        roles: ['Admin', 'CyberGuard'],
      },
      {
        path: '/monitoring/cyber-guard/monitoring/:id',
        element: <BrandMonitoringCyberGuard />,
        roles: ['Admin', 'CyberGuard'],
      },
      {
        path: '/monitoring/cyber-guard/malware-analysis',
        element: <MalwareAnalysis />,
        roles: ['Admin', 'CyberGuard'],
      },
      {
        path: '/monitoring/cyber-guard/malware-analysis/:malwareAnalysisId',
        element: <MalwareAnalysis />,
        roles: ['Admin', 'CyberGuard'],
      },
      {
        path: '/monitoring/cyber-guard/mobile-apps',
        element: <AppScan />,
        roles: ['Admin', 'CyberGuard'],
      },
      {
        path: '/monitoring/cyber-guard/mobile-apps/:appScanId',
        element: <MobileApp />,
        roles: ['Admin', 'CyberGuard'],
      },
      {
        path: '/monitoring/cyber-guard/mobile-apps/:appScanId/results/:resultAppId',
        element: <MobileApp />,
        roles: ['Admin', 'CyberGuard'],
      },

      // TODO: add CyberGuard role to monitoring routes once CTI is completed
      { path: '/monitoring/soc', element: <SOCMonitoring />, roles: ['Admin'] },
      { path: '/monitoring/soc/service-statistics', element: <ServiceStatus />, roles: ['Admin'] },
      {
        path: '/monitoring/soc/source-monitoring',
        element: <SourceMonitoring />,
        roles: ['Admin'],
      },
      { path: '/monitoring/soc/cti', element: <CTI />, roles: ['Admin'] },
      { path: '/monitoring/soc/cti/abusech', element: <AbuseCH />, roles: ['Admin'] },
      { path: '/monitoring/soc/cti/files', element: <FilesSoc />, roles: ['Admin'] },
      { path: '/monitoring/soc/cti/urls', element: <UrlsSoc />, roles: ['Admin'] },
      {
        path: '/monitoring/soc/cti/threat-intelligence',
        element: <ThreatIntelligence />,
        roles: ['Admin'],
      },
      { path: '/monitoring/soc/cti/emerging-risks', element: <EmergingRisks />, roles: ['Admin'] },
      {
        path: '/monitoring/soc/cti/technologies-inventory',
        element: <TechInventory />,
        roles: ['Admin'],
      },
      { path: '/monitoring/soc/cti/mitre', element: <MitreView />, roles: ['Admin'] },
      { path: '/monitoring/soc/brand-monitoring', element: <BrandMonitoring />, roles: ['Admin'] },
      { path: '/monitoring/soc/brand-monitoring/demo', element: <DemoBrand />, roles: ['Admin'] },
      { path: '/monitoring/soc/brand-monitoring/darknet', element: <DarkNet />, roles: ['Admin'] },
      // { path: '/monitoring/siem', element: <SIEMMonitoring /> },
      { path: '/monitoring/siem', element: <Navigate to="/maintenance" />, roles: ['Admin'] },

      { path: '/monitoring/soc/newsletters', element: <SocNews />, roles: ['Admin', 'CyberGuard'] },
      {
        path: '/monitoring/soc/newsletters/:newsletterId',
        element: <SocNewsDetails />,
        roles: ['Admin', 'CyberGuard'],
      },
      {
        path: '/monitoring/soc/takedown',
        element: <TicketFormComp />,
        roles: ['Admin', 'CyberGuard'],
      },

      // Support
      { path: '/support/tickets', element: <Tickets />, roles: ['Admin', 'Scan360', 'CyberGuard', 'Defender'] },
      { path: '/support/solutions', element: <Solutions />, roles: ['Admin', 'Scan360', 'CyberGuard', 'Defender'] },
      { path: '/support/solutions/:id', element: <SolutionDetail />, roles: ['Admin', 'Scan360', 'CyberGuard', 'Defender'] },
      { path: '/support/ticketform', element: <TicketFormComp />, roles: ['Admin', 'Scan360', 'CyberGuard', 'Defender'] },
      { path: '/support/ticket/:id', element: <TicketDetail />, roles: ['Admin', 'Scan360', 'CyberGuard', 'Defender'] },

      // Configuration
      { path: '/configuration/scheduled-scans', element: <ScheduledScans />, roles: ['Admin', 'Scan360'] },
      { path: '/configuration/schedule-scan', element: <ScheduleScanForm />, roles: ['Admin', 'Scan360'] },

      // Audit
      { path: '/audit/logs', element: <AuditLogView />, roles: ['Admin', 'Scan360', 'CyberGuard', 'Defender'] },

      // User Profile
      { path: '/user-profile', element: <AccountSettings /> },

      // Maintenance
      { path: '/maintenance', element: <Maintenance />, roles: ['Admin', 'Scan360', 'CyberGuard', 'Defender'] },

      // Default Route
      { path: '/', element: <Navigate to="/home/dashboard" /> },

      // Compliance
      { path: '/compliance/assets', element: <ComplianceAssetsView />, roles: ['Admin', 'Defender'] },
      { path: '/compliance/assets/:assetId', element: <ComplianceAssetsView />, roles: ['Admin', 'Defender'] },
      { path: '/compliance/groups', element: <ComplianceGroupsView />, roles: ['Admin', 'Defender'] },
      { path: '/compliance/projects', element: <ComplianceProjectsView />, roles: ['Admin', 'Defender'] },
      { path: '/compliance/projects/create', element: <CreateComplianceProjects />, roles: ['Admin', 'Defender'] },
      { path: '/compliance/projects/:projectId', element: <ProjectDetails />, roles: ['Admin', 'Defender'] },
      { path: '/compliance/projects/edit/:projectId', element: <EditComplianceProjects />, roles: ['Admin', 'Defender'] },
      { path: '/compliance/executions', element: <ComplianceExecutionsView />, roles: ['Admin', 'Defender'] },
      { path: '/compliance/executions/:executionId', element: <ComplianceExecutionsView />, roles: ['Admin', 'Defender'] },
      { path: '/compliance/executions/:executionId/assets/:assetId', element: <ComplianceExecutionsView />, roles: ['Admin', 'Defender'] },
      { path: '/compliance/reports', element: <ComplianceReports />, roles: ['Admin', 'Defender'] },
      { path: '/compliance/assessment-status', element: <AssessmentStatusByAsset />, roles: ['Admin', 'Defender'] },
    ],
  },
  {
    path: '/',
    element: <BlankLayout />,
    children: [
      { path: '/auth/login', element: <Login /> },
      { path: '/auth/signup', element: <Register /> },
      { path: '/logout', element: <Logout /> },
      { path: '/404', element: <Error /> },
      { path: '/auth/forgot-password', element: <ForgotPassword /> },
      { path: '/auth/reset-password', element: <ResetPassword /> },
      { path: '/changelog', element: <ChangelogView /> },
    ],
  },
  { path: '*', element: <Navigate to="/404" /> },
];

export default Router;
