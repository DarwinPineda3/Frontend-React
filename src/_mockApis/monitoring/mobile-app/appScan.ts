// home/MalwareAnalysis.ts

import mock from '../../mock'; // Ensure correct path to mock

interface AppScanType {
  id: string | undefined;
  name: string;
  createdOn?: Date;
}


let appScans: AppScanType[] = [
  {
    id: '1',
    name: 'Banco de Bogotá Móvil',
    createdOn: new Date()
  },
  {
    id: '2',
    name: 'Banco de Occidente Móvil',
    createdOn: new Date()
  },
  {
    id: '3',
    name: 'AV Villas App',
    createdOn: new Date()
  },
  {
    id: '4',
    name: 'Banco Popular App',
    createdOn: new Date()
  }
];
// GET: Fetch paginated appScans
mock.onGet(new RegExp('/api/data/appScans')).reply((config) => {
  try {
    const urlParams = new URLSearchParams(config.url!.split('?')[1]);

    const limit = 25;
    const page = parseInt(urlParams.get('page') || '1', 10); // Default to page 1

    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;

    const paginatedAppScans = appScans.slice(startIndex, endIndex);
    const totalAppScans = appScans.length;
    const totalPages = Math.ceil(totalAppScans / limit);

    return [
      200,
      {
        appScans: paginatedAppScans,
        currentPage: page,
        totalPages,
      },
    ];
  } catch (error) {
    console.error('Error in appScans API:', error);
    return [500, { message: 'Internal server error' }];
  }
});

// POST: Create a new appScan
mock.onPost('/api/data/appScans').reply((config) => {
  try {
    const { name, createdOn } = JSON.parse(config.data);

    const newparameterApp: AppScanType = {
      id: (appScans.length + 1).toString(), // Simple id generation
      name,
      createdOn
    };

    appScans.push(newparameterApp); // Add new appScan to mock database

    return [200, { appScan: newparameterApp }];
  } catch (error) {
    console.error('Error in creating parameter app:', error);
    return [500, { message: 'Failed to create parameter app' }];
  }
});

// PUT: Update an existing appScan
mock.onPut(new RegExp('/api/data/appScans/*')).reply((config) => {
  try {
    const appScanId = config.url!.split('/').pop(); // Extract the appScan ID from the URL
    const updatedData = JSON.parse(config.data); // New data for the appScan

    const parameterAppIndex = appScans.findIndex((appScan) => appScan.id === appScanId);
    if (parameterAppIndex === -1) {
      return [404, { message: 'parameter app not found' }];
    }

    appScans[parameterAppIndex] = { ...appScans[parameterAppIndex], ...updatedData }; // Update the appScan

    return [200, { appScan: appScans[parameterAppIndex] }];
  } catch (error) {
    console.error('Error updating parameter app:', error);
    return [500, { message: 'Failed to update parameter app' }];
  }
});

// DELETE: Delete an appScan
mock.onDelete(new RegExp('/api/data/appScans/*')).reply((config) => {
  try {
    const appScanId = config.url!.split('/').pop(); // Extract the appScan ID from the URL

    const parameterAppIndex = appScans.findIndex((appScan) => appScan.id === appScanId);
    if (parameterAppIndex === -1) {
      return [404, { message: 'parameter app not found' }];
    }

    appScans.splice(parameterAppIndex, 1); // Remove appScan from the mock database

    return [200, { message: 'parameter app deleted successfully' }];
  } catch (error) {
    console.error('Error deleting parameter app:', error);
    return [500, { message: 'Failed to delete parameter app' }];
  }
});
