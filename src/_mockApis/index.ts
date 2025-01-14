import './auth/Account';
import './compliance/GiottoAssets';
import './compliance/GiottoExecutions';
import './compliance/giottoGroups';
import './home/Asset';
import './home/cyber-guard/brandMonitoring/BrandMonitoring';
import './home/cyber-guard/parameters/Parameter';
import './home/Dashboard';
import mock from './mock';
import './monitoring/cti/technologies_inventory/TechInventory';
import './monitoring/malware-analysis/MalwareAnalysis';
import './monitoring/mobile-app/appScan';
import './monitoring/mobile-app/MobileApp';
import './monitoring/soc/Newsletter';
import './vulnerabilities/Management';
import './vulnerabilities/redteam/ehReports';
import './vulnerabilities/Summary';

mock.onAny().passThrough();
