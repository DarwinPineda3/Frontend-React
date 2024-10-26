import mock from '../../../mock';

import {
  LatestDataType,
  SummaryDataType,
} from '../../../../types/cyber-guard/brand-monitoring/brandMonitoring';
import { consolidateData } from './results'

const latestData: LatestDataType[] = [
    // {
    //     "query": "Banco AV Villas",
    //     "query_type": "WORD",
    //     "scan_date": "2024-10-26T06:28:37.177703Z",
    //     "total_results": 55,
    //     "id": "CIODx5IBHPjIIpHRNPRI"
    // },
    // {
    //     "query": "Banco Popular",
    //     "query_type": "WORD",
    //     "scan_date": "2024-10-26T06:16:14.837249Z",
    //     "total_results": 57,
    //     "id": "94N3x5IBHPjIIpHR4fPE"
    // },
    // {
    //     "query": "Banco de Bogota",
    //     "query_type": "WORD",
    //     "scan_date": "2024-10-26T06:26:00.073638Z",
    //     "total_results": 50,
    //     "id": "BIOAx5IBHPjIIpHRzvQK"
    // },
    // {
    //     "query": "Banco de Occidente",
    //     "query_type": "WORD",
    //     "scan_date": "2024-10-26T06:31:32.473566Z",
    //     "total_results": 56,
    //     "id": "C4OFx5IBHPjIIpHR4PTU"
    // },
    // {
    //     "query": "Grupo Aval",
    //     "query_type": "WORD",
    //     "scan_date": "2024-10-26T06:34:02.699429Z",
    //     "total_results": 58,
    //     "id": "D4OIx5IBHPjIIpHRK_Sg"
    // },
    // {
    //     "query": "avvillas.com.co",
    //     "query_type": "DOMAIN",
    //     "scan_date": "2024-10-26T06:20:51.671980Z",
    //     "total_results": 68,
    //     "id": "_YN8x5IBHPjIIpHRGfOw"
    // },
    // {
    //     "query": "bancodebogota.com",
    //     "query_type": "DOMAIN",
    //     "scan_date": "2024-10-26T06:18:36.188735Z",
    //     "total_results": 486,
    //     "id": "-oN6x5IBHPjIIpHRCPMd"
    // },
    {
        "query": "bancodeoccidente.com.co",
        "query_type": "DOMAIN",
        "scan_date": "2024-10-26T06:37:17.967447Z",
        "total_results": 376,
        "id": "E4OLx5IBHPjIIpHRJvRD"
    },
    {
        "query": "grupoaval.com",
        "query_type": "DOMAIN",
        "scan_date": "2024-10-26T06:23:24.591311Z",
        "total_results": 135,
        "id": "-4OvxJIBHPjIIpHRuekR"
    },
    {
        "query": "mi.bancopopular.com.co",
        "query_type": "DOMAIN",
        "scan_date": "2024-10-26T07:17:13.479915Z",
        "total_results": 53,
        "id": "4oOsxJIBHPjIIpHRb-mQ"
    }
];

const summaryData: SummaryDataType[] = [
    // {
    //     "query": "Banco AV Villas",
    //     "total_results": 55
    // },
    // {
    //     "query": "Banco Popular",
    //     "total_results": 57
    // },
    // {
    //     "query": "Banco de Bogota",
    //     "total_results": 50
    // },
    // {
    //     "query": "Banco de Occidente",
    //     "total_results": 56
    // },
    // {
    //     "query": "Grupo Aval",
    //     "total_results": 58
    // },
    // {
    //     "query": "avvillas.com.co",
    //     "total_results": 68
    // },
    // {
    //     "query": "bancodebogota.com",
    //     "total_results": 486
    // },
    {
        "query": "bancodeoccidente.com.co",
        "total_results": 376
    },
    {
        "query": "grupoaval.com",
        "total_results": 135
    },
    {
        "query": "mi.bancopopular.com.co",
        "total_results": 53
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
