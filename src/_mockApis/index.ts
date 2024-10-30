import mock from './mock';
import './auth/Account';
import './home/Asset';
import './home/cyber-guard/parameters/Parameter';
import './home/cyber-guard/brandMonitoring/BrandMonitoring'
import './home/Dashboard';
import './monitoring/cti/technologies_inventory/TechInventory';
import './monitoring/malware-analysis/MalwareAnalysis'
import './monitoring/mobile-app/MobileApp'
import './monitoring/mobile-app/appScan'
import './vulnerabilities/Summary';
import './monitoring/Newsletter';
mock.onAny().passThrough();
