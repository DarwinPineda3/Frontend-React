// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React, { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import Loadable from '../layouts/full/shared/loadable/Loadable';
import Log from 'src/views/audit/Log';
import ScheduledScans from 'src/views/configuration/ScheduledScans';
import InstallationGuide from 'src/views/observability/InstallationGuide';
import ObservedAssets from 'src/views/observability/ObservedAssets';
import Solutions from 'src/views/support/Solutions';
import Assets from 'src/views/home/assets';
import Dashboard from 'src/views/home/dashboard';
import CloudVulnerabilities from 'src/views/vulnerabilities/Cloud';
import ManagementVulnerabilities from 'src/views/vulnerabilities/Management';
import NetworkVulnerabilities from 'src/views/vulnerabilities/Network';
import SummaryVulnerabilities from 'src/views/vulnerabilities/Summary';
import WebVulnerabilities from 'src/views/vulnerabilities/Web';
import SIEMMonitoring from 'src/views/monitoring/SIEM';
import SOCMonitoring from 'src/views/monitoring/SOC';
import CloudObservability from 'src/views/observability/Cloud';
import NetworkObservability from 'src/views/observability/Network';
import Tickets from 'src/views/support/Tickets';
import AuthGuard from 'src/guards/authGuard/AuthGuard';
import WebApplications from 'src/views/vulnerabilities/Web/Aplications';
import path from 'path';

/* ***Layouts**** */
const FullLayout = Loadable(lazy(() => import('../layouts/full/FullLayout')));
const BlankLayout = Loadable(lazy(() => import('../layouts/blank/BlankLayout')));
const Login = Loadable(lazy(() => import('../views/authentication/auth/Login')));

/* ****Pages***** */
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
      { path: '/vulnerabilities/web/wordpress', element: <WebVulnerabilities /> },
      { path: '/vulnerabilities/cloud', element: <CloudVulnerabilities /> },
      { path: '/vulnerabilities/summary', element: <SummaryVulnerabilities /> },
      { path: '/vulnerabilities/management', element: <ManagementVulnerabilities /> },

      // Monitoring
      { path: '/monitoring/soc', element: <SOCMonitoring /> },
      { path: '/monitoring/siem', element: <SIEMMonitoring /> },

      // Observability
      { path: '/observability/network', element: <NetworkObservability /> },
      { path: '/observability/cloud', element: <CloudObservability /> },
      { path: '/observability/observed-assets', element: <ObservedAssets /> },
      { path: '/observability/installation-guide', element: <InstallationGuide /> },

      // Support
      { path: '/support/tickets', element: <Tickets /> },
      { path: '/support/solutions', element: <Solutions /> },

      // Configuration
      { path: '/configuration/scheduled-scans', element: <ScheduledScans /> },

      // Audit
      { path: '/audit/log', element: <Log /> },

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
