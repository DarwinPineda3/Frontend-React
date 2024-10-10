import mock from './mock';
import './auth/Account';
import './home/Asset';
import './home/Dashboard';
mock.onAny().passThrough();
