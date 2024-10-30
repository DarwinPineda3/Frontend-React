import mock from './mock';
import './auth/Account';
import './home/Asset';
import './home/cyber-guard/parameters/Parameter';
import './home/cyber-guard/brandMonitoring/BrandMonitoring'
import './home/Dashboard';
import './monitoring/cti/technologies_inventory/TechInventory';
import './home/malwareanalysis/MalwareAnalysis'
import './vulnerabilities/Summary';
import './monitoring/Newsletter';
import './vulnerabilities/Management';
mock.onAny().passThrough();
