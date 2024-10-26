import mock from '../../../mock';

import {
  LatestDataType,
  SummaryDataType,
} from '../../../../types/cyber-guard/brand-monitoring/brandMonitoring';
import { consolidateData } from './results'

const latestData: LatestDataType[] = [
    {
        "query": "Banco AV Villas",
        "query_type": "WORD",
        "scan_date": "2024-10-25T17:23:47.498786Z",
        "total_results": 55,
        "id": "IYO0xJIBHPjIIpHRrOqy"
    },
    {
        "query": "Banco Popular",
        "query_type": "WORD",
        "scan_date": "2024-10-25T17:25:29.750333Z",
        "total_results": 57,
        "id": "K4O2xJIBHPjIIpHRPOpG"
    },
    {
        "query": "Banco de Bogota",
        "query_type": "WORD",
        "scan_date": "2024-10-25T17:22:06.570062Z",
        "total_results": 40,
        "id": "FoOzxJIBHPjIIpHRIuo8"
    },
    {
        "query": "Banco de Occidente",
        "query_type": "WORD",
        "scan_date": "2024-10-25T17:27:02.999362Z",
        "total_results": 56,
        "id": "NIO3xJIBHPjIIpHRqOoo"
    },
    {
        "query": "Grupo Aval",
        "query_type": "WORD",
        "scan_date": "2024-10-25T17:28:37.218920Z",
        "total_results": 58,
        "id": "PIO5xJIBHPjIIpHRGOo6"
    },
    {
        "query": "bancodebogota.com",
        "query_type": "DOMAIN",
        "scan_date": "2024-10-25T17:30:27.488378Z",
        "total_results": 4522,
        "id": "R4O6xJIBHPjIIpHRxur5"
    },
    {
        "query": "bancodeoccidente.com.co",
        "query_type": "DOMAIN",
        "scan_date": "2024-10-25T17:20:13.121784Z",
        "total_results": 1015,
        "id": "B4OxxJIBHPjIIpHRZ-oT"
    },
    {
        "query": "bancopopular.com.co",
        "query_type": "DOMAIN",
        "scan_date": "2024-10-25T17:14:47.069952Z",
        "total_results": 969,
        "id": "4oOsxJIBHPjIIpHRb-mQ"
    },
    {
        "query": "grupoaval.com",
        "query_type": "DOMAIN",
        "scan_date": "2024-10-25T17:18:22.956182Z",
        "total_results": 165,
        "id": "-4OvxJIBHPjIIpHRuekR",
    }
];

const summaryData: SummaryDataType[] = [
    {
        "query": "Banco AV Villas",
        "total_results": 55
    },
    {
        "query": "Banco Popular",
        "total_results": 57
    },
    {
        "query": "Banco de Bogota",
        "total_results": 40
    },
    {
        "query": "Banco de Occidente",
        "total_results": 56
    },
    {
        "query": "Grupo Aval",
        "total_results": 58
    },
    {
        "query": "avvillas.com.co",
        "total_results": 962
    },
    {
        "query": "bancodebogota.com",
        "total_results": 4522
    },
    {
        "query": "bancodeoccidente.com.co",
        "total_results": 1015
    },
    {
        "query": "bancopopular.com.co",
        "total_results": 969
    },
    {
        "query": "grupoaval.com",
        "total_results": 165
    }
];

latestData.sort((a, b) => b.total_results - a.total_results);
summaryData.sort((a, b) => b.total_results - a.total_results);

// GET: Fetch paginated brand monitoring data
mock.onGet(new RegExp('/api/data/monitoring/cyber-guard/brand-monitoring')).reply((config) => {
  try {
    const urlParams = new URLSearchParams(config.url!.split('?')[1]);
    console.log('entre');

    const limit = 5;
    const page = parseInt(urlParams.get('page') || '1', 10);

    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;

    const paginatedLatestData = latestData.slice(startIndex, endIndex);
    const totalResults = latestData.length;
    const totalPages = Math.ceil(totalResults / limit);

    return [
      200,
      {
        latest_data: paginatedLatestData,
        summary_data: summaryData,
        page,
        totalPages,
      },
    ];
  } catch (error) {
    console.error('Error in brand monitoring API:', error);
    return [500, { message: 'Internal server error' }];
  }
});


mock.onGet(new RegExp('/api/data/monitoring/cyber-guard/detail/brand-monitoring/*')).reply((config) => {
    try {
      const id = config.url!.split('/').pop();
      const brandMonitoringIndex = consolidateData.data.findIndex((result) => result.id === id);
      
      if (brandMonitoringIndex === -1) {
        return [404, { message: 'Brand Monitoring result not found' }];
      }
  
      return [200, { brandMonitoring: consolidateData.data[brandMonitoringIndex] }];
    } catch (error) {
      console.error('Error fetching Brand Monitoring:', error);
      return [500, { message: 'Failed to fetch Brand Monitoring' }];
    }
  });
