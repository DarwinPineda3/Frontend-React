// home/MalwareAnalysis.ts

import mock from '../../mock'; // Ensure correct path to mock

interface ParameterAppType {
  id: string|undefined;
  parameter: string;
  createdOn?: Date;
}


let parameterApps: ParameterAppType[] = [
    {
      id: '1',
      parameter: 'Banco de Bogotá Móvil',
      createdOn: new Date()
    },
    {
      id: '2',
      parameter: 'Banco de Occidente Móvil',
      createdOn: new Date()
    },
    {
      id: '3',
      parameter: 'AV Villas App',
      createdOn: new Date()
    },
    {
      id: '4',
      parameter: 'Banco Popular App',
      createdOn: new Date()
    }
  ];
// GET: Fetch paginated parameterApps
mock.onGet(new RegExp('/api/data/parameterApps')).reply((config) => {
  try {
    const urlParams = new URLSearchParams(config.url!.split('?')[1]);

    const limit = 5;
    const page = parseInt(urlParams.get('page') || '1', 10); // Default to page 1
    
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;

    const paginatedParameterApps = parameterApps.slice(startIndex, endIndex);
    const totalParameterApps = parameterApps.length;
    const totalPages = Math.ceil(totalParameterApps / limit);

    return [
      200,
      {
        parameterApps: paginatedParameterApps,
        currentPage: page,
        totalPages,
      },
    ];
  } catch (error) {
    console.error('Error in parameterApps API:', error);
    return [500, { message: 'Internal server error' }];
  }
});

// POST: Create a new parmeterApp
mock.onPost('/api/data/parameterApps').reply((config) => {
  try {
    const { parameter, createdOn} = JSON.parse(config.data);

      const newparameterApp: ParameterAppType = {
          id: (parameterApps.length + 1).toString(), // Simple id generation
          parameter,
          createdOn
      };

    parameterApps.push(newparameterApp); // Add new parmeterApp to mock database

    return [200, { parmeterApp: newparameterApp }];
  } catch (error) {
    console.error('Error in creating parameter app:', error);
    return [500, { message: 'Failed to create parameter app' }];
  }
});

// PUT: Update an existing parmeterApp
mock.onPut(new RegExp('/api/data/parameterApps/*')).reply((config) => {
  try {
    const parameterAppId = config.url!.split('/').pop(); // Extract the parmeterApp ID from the URL
    const updatedData = JSON.parse(config.data); // New data for the parmeterApp

    const parameterAppIndex = parameterApps.findIndex((parmeterApp) => parmeterApp.id === parameterAppId);
    if (parameterAppIndex === -1) {
      return [404, { message: 'parameter app not found' }];
    }

    parameterApps[parameterAppIndex] = { ...parameterApps[parameterAppIndex], ...updatedData }; // Update the parmeterApp

    return [200, { parmeterApp: parameterApps[parameterAppIndex] }];
  } catch (error) {
    console.error('Error updating parameter app:', error);
    return [500, { message: 'Failed to update parameter app' }];
  }
});

// DELETE: Delete an parmeterApp
mock.onDelete(new RegExp('/api/data/parameterApps/*')).reply((config) => {
  try {
    const parameterAppId = config.url!.split('/').pop(); // Extract the parmeterApp ID from the URL

    const parameterAppIndex = parameterApps.findIndex((parmeterApp) => parmeterApp.id === parameterAppId);
    if (parameterAppIndex === -1) {
      return [404, { message: 'parameter app not found' }];
    }

    parameterApps.splice(parameterAppIndex, 1); // Remove parmeterApp from the mock database

    return [200, { message: 'parameter app deleted successfully' }];
  } catch (error) {
    console.error('Error deleting parameter app:', error);
    return [500, { message: 'Failed to delete parameter app' }];
  }
});
