import mock from './mock';
import './auth/Account';
import './home/Asset';
import './home/cyber-guard/parameters/Parameter';
import './home/cyber-guard/brandMonitoring/BrandMonitoring'
import './home/Dashboard';
import './home/malwareanalysis/MalwareAnalysis'
mock.onAny().passThrough();
