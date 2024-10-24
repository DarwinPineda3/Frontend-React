import mock from './mock';
import './auth/Account';
import './home/Asset';
import './home/Dashboard';
import './monitoring/cti/technologies_inventory/TechInventory';
mock.onAny().passThrough();
