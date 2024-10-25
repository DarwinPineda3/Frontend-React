import mock from './mock';
import './auth/Account';
import './home/Asset';
import './home/Dashboard';
import './home/malwareanalysis/MalwareAnalysis'
mock.onAny().passThrough();
