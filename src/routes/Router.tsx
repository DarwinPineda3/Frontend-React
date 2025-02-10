// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import AccountSettings from 'src/components/account-settings/AccountSettings';
import GiottoAssetsCreate from 'src/components/compliance/giotto-assets/giottoAssetsCreate';
import GiottoAssetsImport from 'src/components/compliance/giotto-assets/giottoAssetsImport';
import CreateGiottoGroup from 'src/components/compliance/giotto-groups/giottoGroupsCreate';
import GroupDetails from 'src/components/compliance/giotto-groups/giottoGroupsDetails';
import EditGiottoGroup from 'src/components/compliance/giotto-groups/giottoGroupsEdit';
import ProjectDetails from 'src/components/compliance/giotto-projects/giottoProjectDetails';
import TemplateDetails from 'src/components/compliance/giotto-templates/giottoTemplateDetails';
import AssetsCreate from 'src/components/home/AssetCreate';
import CreateCloudInventory from 'src/components/observability/cloud/cloudInventoryCreate';
import SolutionDetail from 'src/components/solutions/SolutionsDetail';
import TicketDetail from 'src/components/ticketform/TicketDetail';
import CreateProwlerScan from 'src/components/vulnerabilities/cloud/cloudScanCreate';
import EHVulnerabilityDetail from 'src/components/vulnerabilities/redteam/EhVulnerabilityDetail';
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
import ComplianceInstallationGuidePage from 'src/views/compliance/ComplianceInstallationGuide';
import ComplianceProjectsView from 'src/views/compliance/ComplianceProjectsView';
import ComplianceReports from 'src/views/compliance/ComplianceReports';
import CreateComplianceProjects from 'src/views/compliance/CreateComplianceProjectsView';
import EditComplianceProjects from 'src/views/compliance/EditComplianceProjectsView';
import GiottoDashboard from 'src/views/compliance/GiottoDashboard';
import TemplateListPage from 'src/views/compliance/TemplateListPage';
import ScheduledScansDetail from 'src/views/configuration/ScheduledScanDetail';
import ScheduledScans from 'src/views/configuration/ScheduledScans';
import ScheduleScanFormView from 'src/views/configuration/ScheduleScanForm';
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
      {
        path: '/home/dashboard',
        element: <Dashboard />,
        roles: ['Administrator', 'Scan360', 'Defender', 'CyberGuard'],
      },
      { path: '/home/assets', element: <Assets />, roles: ['Administrator', 'Scan360'] },
      {
        path: '/home/assets/create',
        element: <AssetsCreate />,
        roles: ['Administrator', 'Scan360'],
      },

      // Vulnerabilities
      {
        path: '/vulnerabilities/network/scans',
        element: <NetworkVulnerabilities showHeader={true} />,
        roles: ['Administrator', 'Scan360'],
      },
      {
        path: '/vulnerabilities/network/scans/:scanId',
        element: <NetworkVulnerabilities showHeader={true} />,
        roles: ['Administrator', 'Scan360'],
      },
      {
        path: '/vulnerabilities/network/scans/create',
        element: <NetworkCreateScan />,
        roles: ['Administrator', 'Scan360'],
      },
      {
        path: '/vulnerabilities/network/scans/detail/:scanId',
        element: <NetworkVulnerabilitiesDetail />,
        roles: ['Administrator', 'Scan360'],
      },
      {
        path: '/vulnerabilities/network/scans/:scanId/reports/:alertId',
        element: <NetworkVulnerabilities />,
        roles: ['Administrator', 'Scan360'],
      },
      {
        path: '/vulnerabilities/network/scans/:scanId/reports/:alertId/vulnerabilities/:vulnerabilityId/:index',
        element: <NetworkVulnerabilities />,
        roles: ['Administrator', 'Scan360'],
      },

      {
        path: '/vulnerabilities/web',
        element: <WebVulnerabilities />,
        roles: ['Administrator', 'Scan360'],
      },
      {
        path: '/vulnerabilities/web/applications',
        element: <WebApplications />,
        roles: ['Administrator', 'Scan360'],
      },
      {
        path: '/vulnerabilities/web/applications/create',
        element: <WebAppCreateScan />,
        roles: ['Administrator', 'Scan360'],
      },
      {
        path: '/vulnerabilities/web/applications/:scanId',
        element: <WebApplications />,
        roles: ['Administrator', 'Scan360'],
      },
      {
        path: '/vulnerabilities/web/applications/:scanId/alerts/:alertId',
        element: <WebApplications />,
        roles: ['Administrator', 'Scan360'],
      },

      {
        path: '/vulnerabilities/web/wordpress',
        element: <WordpressAplications />,
        roles: ['Administrator', 'Scan360'],
      },
      {
        path: '/vulnerabilities/web/wordpress/create',
        element: <CreateWPScan />,
        roles: ['Administrator', 'Scan360'],
      },
      {
        path: '/vulnerabilities/web/wordpress/:scanId',
        element: <WordpressAplications />,
        roles: ['Administrator', 'Scan360'],
      },
      {
        path: '/vulnerabilities/web/wordpress/:scanId/vulnerabilities',
        element: <WpVulDetail />,
        roles: ['Administrator', 'Scan360'],
      },
      {
        path: '/vulnerabilities/web/wordpress/:scanId/vulnerabilities/:vulnerabilityId',
        element: <WordpressAplications />,
        roles: ['Administrator', 'Scan360'],
      },

      {
        path: '/vulnerabilities/cloud',
        element: <CloudVulnerabilities />,
        roles: ['Administrator', 'Scan360'],
      },
      {
        path: '/vulnerabilities/cloud/vulnerabilities/:cloudId',
        element: <CloudVulnerabilitiesDetails />,
        roles: ['Administrator', 'Scan360'],
      },
      {
        path: '/vulnerabilities/cloud',
        element: <CloudVulnerabilities />,
        roles: ['Administrator', 'Scan360'],
      },
      {
        path: '/vulnerabilities/cloud/vulnerabilities/:cloudId',
        element: <CloudVulnerabilitiesDetails />,
        roles: ['Administrator', 'Scan360'],
      },
      {
        path: '/vulnerabilities/cloud/create',
        element: <CreateProwlerScan />,
        roles: ['Administrator', 'Scan360'],
      },

      {
        path: '/vulnerabilities/summary',
        element: <SummaryVulnerabilities />,
        roles: ['Administrator', 'Scan360'],
      },
      {
        path: '/vulnerabilities/management',
        element: <ManagementVulnerabilities />,
        roles: ['Administrator', 'Scan360'],
      },
      {
        path: '/vulnerabilities/redteam',
        element: <EHReport />,
        roles: ['Administrator', 'Scan360'],
      },
      {
        path: '/vulnerabilities/redteam/:ehReportId',
        element: <EHReportDetail />,
        roles: ['Administrator', 'Scan360'],
      },
      {
        path: '/vulnerabilities/redteam/:ehReportId/vulnerability/detail',
        element: <EHVulnerabilityDetail />,
        roles: ['Administrator', 'Scan360'],
      },
      {
        path: '/vulnerabilities/management/detail/:id',
        element: <ManagedVulnerabilitiesDetail />,
        roles: ['Administrator', 'Scan360'],
      },
      {
        path: '/vulnerabilities/management/form/:id',
        element: <ManagedVulnerabilitiesForm />,
        roles: ['Administrator', 'Scan360'],
      },

      // Observability
      {
        path: '/observability/network',
        element: <NetworkObservability />,
        roles: ['Administrator', 'Scan360'],
      },
      {
        path: '/observability/network/scans',
        element: <NetworkObservability />,
        roles: ['Administrator', 'Scan360'],
      },
      {
        path: '/observability/network/create',
        element: <NetworkObservabilityCreateScan />,
        roles: ['Administrator', 'Scan360'],
      },
      {
        path: '/observability/network/scans/:scanId',
        element: <NetworkObservability />,
        roles: ['Administrator', 'Scan360'],
      },
      {
        path: '/observability/cloud',
        element: <CloudInventory />,
        roles: ['Administrator', 'Scan360'],
      },
      {
        path: '/observability/cloud/create',
        element: <CreateCloudInventory />,
        roles: ['Administrator', 'Scan360'],
      },
      {
        path: '/observability/cloud/scans/:scanId',
        element: <CloudInventory />,
        roles: ['Administrator', 'Scan360'],
      },
      {
        path: '/observability/cloud/scans',
        element: <CloudInventory />,
        roles: ['Administrator', 'Scan360'],
      },
      {
        path: '/observability/observed-assets',
        element: <ObservedAssets />,
        roles: ['Administrator', 'Scan360'],
      },
      {
        path: '/observability/observed-assets/assets',
        element: <ObservedAssets />,
        roles: ['Administrator', 'Scan360'],
      },
      {
        path: '/observability/observed-assets/assets/:id',
        element: <ObservedAssets />,
        roles: ['Administrator', 'Scan360'],
      },
      {
        path: '/observability/installation-guide',
        element: <InstallationGuide />,
        roles: ['Administrator', 'Scan360'],
      },
      {
        path: '/observability/threshold-settings',
        element: <ThresholdSettings />,
        roles: ['Administrator', 'Scan360'],
      },

      // Monitoring
      {
        path: '/monitoring/threats-overview',
        element: <DarkWeb />,
        roles: ['Administrator', 'CyberGuard'],
      },

      {
        path: '/monitoring/cyber-guard/parameters',
        element: <ParametersMonitoringCyberGuard />,
        roles: ['Administrator', 'CyberGuard'],
      },
      {
        path: '/monitoring/cyber-guard/monitoring',
        element: <BrandMonitoringCyberGuard />,
        roles: ['Administrator', 'CyberGuard'],
      },
      {
        path: '/monitoring/cyber-guard/monitoring/:id',
        element: <BrandMonitoringCyberGuard />,
        roles: ['Administrator', 'CyberGuard'],
      },
      {
        path: '/monitoring/cyber-guard/malware-analysis',
        element: <MalwareAnalysis />,
        roles: ['Administrator', 'CyberGuard'],
      },
      {
        path: '/monitoring/cyber-guard/malware-analysis/:malwareAnalysisId',
        element: <MalwareAnalysis />,
        roles: ['Administrator', 'CyberGuard'],
      },
      {
        path: '/monitoring/cyber-guard/mobile-apps',
        element: <AppScan />,
        roles: ['Administrator', 'CyberGuard'],
      },
      {
        path: '/monitoring/cyber-guard/mobile-apps/:appScanId',
        element: <MobileApp />,
        roles: ['Administrator', 'CyberGuard'],
      },
      {
        path: '/monitoring/cyber-guard/mobile-apps/:appScanId/results/:resultAppId',
        element: <MobileApp />,
        roles: ['Administrator', 'CyberGuard'],
      },

      // TODO: add CyberGuard role to monitoring routes once CTI is completed
      { path: '/monitoring/soc', element: <SOCMonitoring />, roles: ['Administrator'] },
      {
        path: '/monitoring/soc/service-statistics',
        element: <ServiceStatus />,
        roles: ['Administrator'],
      },
      {
        path: '/monitoring/soc/source-monitoring',
        element: <SourceMonitoring />,
        roles: ['Administrator'],
      },
      { path: '/monitoring/soc/cti', element: <CTI />, roles: ['Administrator'] },
      { path: '/monitoring/soc/cti/abusech', element: <AbuseCH />, roles: ['Administrator'] },
      { path: '/monitoring/soc/cti/files', element: <FilesSoc />, roles: ['Administrator'] },
      { path: '/monitoring/soc/cti/urls', element: <UrlsSoc />, roles: ['Administrator'] },
      {
        path: '/monitoring/soc/cti/threat-intelligence',
        element: <ThreatIntelligence />,
        roles: ['Administrator'],
      },
      {
        path: '/monitoring/soc/cti/emerging-risks',
        element: <EmergingRisks />,
        roles: ['Administrator'],
      },
      {
        path: '/monitoring/soc/cti/technologies-inventory',
        element: <TechInventory />,
        roles: ['Administrator'],
      },
      { path: '/monitoring/soc/cti/mitre', element: <MitreView />, roles: ['Administrator'] },
      {
        path: '/monitoring/soc/brand-monitoring',
        element: <BrandMonitoring />,
        roles: ['Administrator'],
      },
      {
        path: '/monitoring/soc/brand-monitoring/demo',
        element: <DemoBrand />,
        roles: ['Administrator'],
      },
      {
        path: '/monitoring/soc/brand-monitoring/darknet',
        element: <DarkNet />,
        roles: ['Administrator'],
      },
      // { path: '/monitoring/siem', element: <SIEMMonitoring /> },
      {
        path: '/monitoring/siem',
        element: <Navigate to="/maintenance" />,
        roles: ['Administrator'],
      },

      {
        path: '/monitoring/soc/newsletters',
        element: <SocNews />,
        roles: ['Administrator', 'CyberGuard'],
      },
      {
        path: '/monitoring/soc/newsletters/:newsletterId',
        element: <SocNewsDetails />,
        roles: ['Administrator', 'CyberGuard'],
      },
      {
        path: '/monitoring/soc/takedown',
        element: <TicketFormComp />,
        roles: ['Administrator', 'CyberGuard'],
      },

      // Support
      {
        path: '/support/tickets',
        element: <Tickets />,
        roles: ['Administrator', 'Scan360', 'CyberGuard', 'Defender'],
      },
      {
        path: '/support/solutions',
        element: <Solutions />,
        roles: ['Administrator', 'Scan360', 'CyberGuard', 'Defender'],
      },
      {
        path: '/support/solutions/:id',
        element: <SolutionDetail />,
        roles: ['Administrator', 'Scan360', 'CyberGuard', 'Defender'],
      },
      {
        path: '/support/ticketform',
        element: <TicketFormComp />,
        roles: ['Administrator', 'Scan360', 'CyberGuard', 'Defender'],
      },
      {
        path: '/support/ticket/:id',
        element: <TicketDetail />,
        roles: ['Administrator', 'Scan360', 'CyberGuard', 'Defender'],
      },

      // Configuration
      {
        path: '/configuration/scheduled-scans',
        element: <ScheduledScans />,
        roles: ['Administrator', 'Scan360'],
      },
      {
        path: '/configuration/schedule-scan/create',
        element: <ScheduleScanFormView />,
        roles: ['Administrator', 'Scan360'],
      },
      {
        path: '/configuration/schedule-scan/detail/:scanId',
        element: <ScheduledScansDetail />,
        roles: ['Administrator', 'Scan360'],
      },

      // Audit
      {
        path: '/audit/logs',
        element: <AuditLogView />,
        roles: ['Administrator', 'Scan360', 'CyberGuard', 'Defender'],
      },

      // User Profile
      { path: '/user-profile', element: <AccountSettings /> },

      // Maintenance
      {
        path: '/maintenance',
        element: <Maintenance />,
        roles: ['Administrator', 'Scan360', 'CyberGuard', 'Defender'],
      },

      // Default Route
      { path: '/', element: <Navigate to="/home/dashboard" /> },

      // Compliance
      {
        path: '/compliance/assets',
        element: <ComplianceAssetsView />,
        roles: ['Administrator', 'Defender'],
      },
      {
        path: '/compliance/assets/create',
        element: <GiottoAssetsCreate />,
        roles: ['Administrator', 'Defender'],
      },
      {
        path: '/compliance/assets/import',
        element: <GiottoAssetsImport />,
        roles: ['Administrator', 'Defender'],
      },
      {
        path: '/compliance/assets/:assetId',
        element: <ComplianceAssetsView />,
        roles: ['Administrator', 'Defender'],
      },
      {
        path: '/compliance/groups',
        element: <ComplianceGroupsView />,
        roles: ['Administrator', 'Defender'],
      },
      {
        path: '/compliance/groups/:groupId',
        element: <GroupDetails />,
        roles: ['Administrator', 'Defender'],
      },
      {
        path: '/compliance/groups/create',
        element: <CreateGiottoGroup />,
        roles: ['Administrator', 'Defender'],
      },
      {
        path: '/compliance/groups/edit/:groupId',
        element: <EditGiottoGroup />,
        roles: ['Administrator', 'Defender'],
      },
      {
        path: '/compliance/projects',
        element: <ComplianceProjectsView />,
        roles: ['Administrator', 'Defender'],
      },
      {
        path: '/compliance/executions',
        element: <ComplianceExecutionsView />,
        roles: ['Administrator', 'Defender'],
      },
      {
        path: '/compliance/executions/:executionId',
        element: <ComplianceExecutionsView />,
        roles: ['Administrator', 'Defender'],
      },
      {
        path: '/compliance/executions/:executionId/assets/:assetId',
        element: <ComplianceExecutionsView />,
        roles: ['Administrator', 'Defender'],
      },
      {
        path: '/compliance/reports',
        element: <ComplianceReports />,
        roles: ['Administrator', 'Defender'],
      },
      {
        path: '/compliance/assessment-status',
        element: <AssessmentStatusByAsset />,
        roles: ['Administrator', 'Defender'],
      },
      {
        path: '/compliance/templates',
        element: <TemplateListPage />,
        roles: ['Administrator', 'Defender'],
      },
      {
        path: '/compliance/templates/:templateId',
        element: <TemplateDetails />,
        roles: ['Administrator', 'Defender'],
      },
      {
        path: '/compliance/projects',
        element: <ComplianceProjectsView />,
        roles: ['Administrator', 'Defender'],
      },
      {
        path: '/compliance/projects/create',
        element: <CreateComplianceProjects />,
        roles: ['Administrator', 'Defender'],
      },
      {
        path: '/compliance/projects/:projectId',
        element: <ProjectDetails />,
        roles: ['Administrator', 'Defender'],
      },
      {
        path: '/compliance/projects/edit/:projectId',
        element: <EditComplianceProjects />,
        roles: ['Administrator', 'Defender'],
      },
      {
        path: '/compliance/installation-guide',
        element: <ComplianceInstallationGuidePage />,
        roles: ['Administrator', 'Defender'],
      },
      {
        path: '/compliance/dashboard',
        element: <GiottoDashboard />,
        roles: ['Administrator', 'Defender', 'Scan360', 'CyberGuard'],
      },
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
