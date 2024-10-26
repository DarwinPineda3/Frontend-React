import mock from './mock';
import './auth/Account';
import './home/Asset';
import './home/cyber-guard/parameters/Parameter';
import './home/cyber-guard/brandMonitoring/BrandMonitoring'
import './home/Dashboard';
import './monitoring/cti/technologies_inventory/TechInventory';
import './home/malwareanalysis/MalwareAnalysis'
import './monitoring/NewsLetters';
mock.onAny().passThrough();
