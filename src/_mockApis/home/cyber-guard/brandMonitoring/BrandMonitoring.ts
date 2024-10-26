// home/Parameter.ts

import mock from '../../../mock';

import { LatestDataType, SummaryDataType } from '../../../../types/cyber-guard/brand-monitoring/brandMonitoring';




const latestData: LatestDataType[] = [
    {
        "query": "avvillas.com.co",
        "query_type": "DOMAIN",
        "scan_date": "2024-10-18T22:07:40.247477Z",
        "total_results": 17,
        "id": "s4OsoZIBHPjIIpHRD34U"
    },
    {
        "query": "bancodebogota.com",
        "query_type": "DOMAIN",
        "scan_date": "2024-10-18T22:04:02.544585Z",
        "total_results": 39,
        "id": "m4OooZIBHPjIIpHRvX51"
    },
    {
        "query": "bancodeoccidente.com.co",
        "query_type": "DOMAIN",
        "scan_date": "2024-10-18T22:05:47.079609Z",
        "total_results": 150,
        "id": "p4OqoZIBHPjIIpHRVX4w"
    },
    {
        "query": "bancopopular.com.co",
        "query_type": "DOMAIN",
        "scan_date": "2024-10-18T22:06:43.149025Z",
        "total_results": 142,
        "id": "rIOroZIBHPjIIpHRMH41"
    },
    {
        "query": "grupoaval.com",
        "query_type": "DOMAIN",
        "scan_date": "2024-10-18T22:04:52.804644Z",
        "total_results": 109,
        "id": "ooOpoZIBHPjIIpHRgX4G"
    },
    {
        "query": "alianza.com",
        "query_type": "DOMAIN",
        "scan_date": "2024-10-16T22:41:46.107294Z",
        "total_results": 177,
        "id": "qoMxoZIBHPjIIpHRunu8"
    }
];

const summaryData: SummaryDataType[] = [
    {
        "query": "avvillas.com.co",
        "total_results": 17
    },
    {
        "query": "bancodebogota.com",
        "total_results": 39
    },
    {
        "query": "bancodeoccidente.com.co",
        "total_results": 150
    },
    {
        "query": "bancopopular.com.co",
        "total_results": 142
    },
    {
        "query": "grupoaval.com",
        "total_results": 109
    },
    {
        "query": "alianza.com",
        "total_results": 177
    }
];

latestData.sort((a, b) => b.total_results - a.total_results);
summaryData.sort((a, b) => b.total_results - a.total_results);

// GET: Fetch paginated brand monitoring data
mock.onGet(new RegExp('/api/data/monitoring/cyber-guard/brand-monitoring')).reply((config) => {
    try {
        const urlParams = new URLSearchParams(config.url!.split('?')[1]);
        
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