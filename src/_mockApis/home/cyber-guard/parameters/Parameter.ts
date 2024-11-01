// home/Parameter.ts

import mock from '../../../mock';

import { ParameterCyberGuardType } from '../../../../types/cyber-guard/parameters/parameter';




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
  {
    "id": "6",
    "parameter": "bancopopular.com.co",
    "is_active": true,
    "created_date": "2024-10-31T03:38:48.687155Z",
    "updated_date": "2024-10-31T03:38:48.687170Z",
    "parameter_type": "DOMAIN"
  },
  {
    "id": "7",
    "parameter": "César Prado Villegas",
    "is_active": true,
    "created_date": "2024-10-31T03:46:34.498108Z",
    "updated_date": "2024-10-31T03:46:34.498132Z",
    "parameter_type": "WORD"
  },
  {
    "id": "8",
    "parameter": "Óscar Bernal Quintero",
    "is_active": true,
    "created_date": "2024-10-31T03:46:48.411496Z",
    "updated_date": "2024-10-31T03:46:48.411518Z",
    "parameter_type": "WORD"
  },
  {
    "id": "9",
    "parameter": "María Fernanda Suárez",
    "is_active": true,
    "created_date": "2024-10-31T03:47:17.969402Z",
    "updated_date": "2024-10-31T03:47:17.969422Z",
    "parameter_type": "WORD"
  },
  {
    "id": "10",
    "parameter": "Luis Carlos Sarmiento Gutiérrez",
    "is_active": true,
    "created_date": "2024-10-31T03:47:31.054456Z",
    "updated_date": "2024-10-31T03:47:31.054475Z",
    "parameter_type": "WORD"
  },
  {
    "id": "11",
    "parameter": "Isabel Cristina Martínez",
    "is_active": true,
    "created_date": "2024-10-31T03:48:13.261615Z",
    "updated_date": "2024-10-31T03:48:13.261641Z",
    "parameter_type": "WORD"
  },
  {
    "id": "12",
    "parameter": "ath.com.co",
    "is_active": true,
    "created_date": "2024-10-31T03:48:30.916471Z",
    "updated_date": "2024-10-31T03:48:30.916492Z",
    "parameter_type": "DOMAIN"
  },
  {
    "id": "13",
    "parameter": "ATH",
    "is_active": true,
    "created_date": "2024-10-31T03:49:51.356149Z",
    "updated_date": "2024-10-31T03:49:51.356179Z",
    "parameter_type": "WORD"
  },
  {
    "id": "14",
    "parameter": "Banco de Bogota",
    "is_active": true,
    "created_date": "2024-10-25T15:49:32.827006Z",
    "updated_date": "2024-10-25T15:49:32.827024Z",
    "parameter_type": "WORD"
  },
  {
    "id": "15",
    "parameter": "Banco de Occidente",
    "is_active": true,
    "created_date": "2024-10-25T15:49:42.248362Z",
    "updated_date": "2024-10-25T15:49:42.248383Z",
    "parameter_type": "WORD"
  },
  {
    "id": "16",
    "parameter": "Banco Popular",
    "is_active": true,
    "created_date": "2024-10-25T15:49:49.708290Z",
    "updated_date": "2024-10-25T15:49:49.708304Z",
    "parameter_type": "WORD"
  },
  {
    "id": "17",
    "parameter": "Banco AV Villas",
    "is_active": true,
    "created_date": "2024-10-25T15:49:56.291497Z",
    "updated_date": "2024-10-25T15:49:56.291516Z",
    "parameter_type": "WORD"
  },
  {
    "id": "18",
    "parameter": "Grupo Aval",
    "is_active": true,
    "created_date": "2024-10-25T15:50:05.113127Z",
    "updated_date": "2024-10-25T15:50:05.113148Z",
    "parameter_type": "WORD"
  },
];

// GET: Fetch paginated parameters
mock.onGet(new RegExp('/api/data/monitoring/cyber-guard/parameters')).reply((config) => {
  try {
    const urlParams = new URLSearchParams(config.url!.split('?')[1]);

    const limit = 25;
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
