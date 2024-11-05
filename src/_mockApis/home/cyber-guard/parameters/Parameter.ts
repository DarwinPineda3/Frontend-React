// home/Parameter.ts

import mock from '../../../mock';

import { ParameterCyberGuardType } from '../../../../types/cyber-guard/parameters/parameter'




let parameters: ParameterCyberGuardType[] = [
    {
        "id": "1",
        "parameter": "bancodebogota.com",
        "is_active": true,
        "created_date": "2024-10-18T21:58:05.347941+00:00",
        "updated_date": "2024-10-18T21:58:05.347950+00:00",
        "parameter_type": "DOMAIN"
    },
    {
        "id": "2",
        "parameter": "grupoaval.com",
        "is_active": true,
        "created_date": "2024-10-18T21:58:54.430846+00:00",
        "updated_date": "2024-10-18T21:58:54.430853+00:00",
        "parameter_type": "DOMAIN"
    },
    {
        "id": "3",
        "parameter": "bancodeoccidente.com.co",
        "is_active": true,
        "created_date": "2024-10-18T21:59:18.696749+00:00",
        "updated_date": "2024-10-18T21:59:18.696758+00:00",
        "parameter_type": "DOMAIN"
    },
    {
        "id": "4",
        "parameter": "bancopopular.com.co",
        "is_active": true,
        "created_date": "2024-10-18T21:59:34.331907+00:00",
        "updated_date": "2024-10-18T21:59:34.331915+00:00",
        "parameter_type": "DOMAIN"
    },
    {
        "id": "5",
        "parameter": "avvillas.com.co",
        "is_active": true,
        "created_date": "2024-10-18T21:59:50.624479+00:00",
        "updated_date": "2024-10-18T21:59:50.624488+00:00",
        "parameter_type": "DOMAIN"
    },
];

// GET: Fetch paginated parameters
mock.onGet(new RegExp('/api/data/monitoring/cyber-guard/parameters')).reply((config) => {
  try {
    const urlParams = new URLSearchParams(config.url!.split('?')[1]);

    const limit = 5;
    const page = parseInt(urlParams.get('page') || '1', 10);

    const activeParameters = parameters.filter(parameter => parameter.is_active);

    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;

    const paginatedParameters = activeParameters.slice(startIndex, endIndex);
    const totalParameters = activeParameters.length;
    const totalPages = Math.ceil(totalParameters / limit);

    return [
      200,
      {
        parameters: paginatedParameters,
        currentPage: page,
        totalPages,
      },
    ];
  } catch (error) {
    console.error('Error in parameters API:', error);
    return [500, { message: 'Internal server error' }];
  }
});

// POST: Create a new parameter
mock.onPost('/api/data/monitoring/cyber-guard/parameters').reply((config) => {
  try {
    const { parameter, is_active, created_date, updated_date, parameter_type } = JSON.parse(config.data);

    const newParameter: ParameterCyberGuardType = {
      id: (parameters.length + 1).toString(),
      parameter,
      is_active,
      created_date,
      updated_date,
      parameter_type,
    };

    parameters.push(newParameter);

    return [200, { parameter: newParameter }];
  } catch (error) {
    console.error('Error in creating parameter:', error);
    return [500, { message: 'Failed to create parameter' }];
  }
});

// PUT: Update an existing parameter
mock.onPut(new RegExp('/api/data/monitoring/cyber-guard/parameters/*')).reply((config) => {
  try {
    const parameterId = config.url!.split('/').pop();
    const updatedData = JSON.parse(config.data);

    const parameterIndex = parameters.findIndex((parameter) => parameter.id === parameterId);
    if (parameterIndex === -1) {
      return [404, { message: 'Parameter not found' }];
    }

    parameters[parameterIndex] = { ...parameters[parameterIndex], ...updatedData };

    return [200, { parameter: parameters[parameterIndex] }];
  } catch (error) {
    console.error('Error updating parameter:', error);
    return [500, { message: 'Failed to update parameter' }];
  }
});

// DELETE: Delete an parameter
mock.onDelete(new RegExp('/api/data/monitoring/cyber-guard/parameters/*')).reply((config) => {
  try {
    const parameterId = config.url!.split('/').pop();

    const parameterIndex = parameters.findIndex((parameter) => parameter.id === parameterId);
    if (parameterIndex === -1) {
      return [404, { message: 'Parameter not found' }];
    }

    parameters[parameterIndex].is_active = false;

    return [200, { message: 'Parameter deactivated successfully' }];
  } catch (error) {
    console.error('Error deactivating parameter:', error);
    return [500, { message: 'Failed to deactivate parameter' }];
  }
});
