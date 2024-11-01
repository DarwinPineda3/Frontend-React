import mock from '../../../mock';

import {
    LatestDataType,
    SummaryDataType,
} from '../../../../types/cyber-guard/brand-monitoring/brandMonitoring';
import { consolidateDataTest } from './result-test';

const latestData: LatestDataType[] = [
    {
        "query": "Banco AV Villas",
        "query_type": "WORD",
        "scan_date": "2024-10-26T06:28:37.177703Z",
        "total_results": 55,
        "id": "IYO0xJIBHPjIIpHRrOqy"
    },
    {
        "query": "Banco Popular",
        "query_type": "WORD",
        "scan_date": "2024-10-26T06:16:14.837249Z",
        "total_results": 57,
        "id": "K4O2xJIBHPjIIpHRPOpG"
    },
    {
        "query": "Banco de Bogota",
        "query_type": "WORD",
        "scan_date": "2024-10-26T06:26:00.073638Z",
        "total_results": 50,
        "id": "FoOzxJIBHPjIIpHRIuo8"
    },
    {
        "query": "Banco de Occidente",
        "query_type": "WORD",
        "scan_date": "2024-10-26T06:31:32.473566Z",
        "total_results": 56,
        "id": "NIO3xJIBHPjIIpHRqOoo"
    },
    {
        "query": "Grupo Aval",
        "query_type": "WORD",
        "scan_date": "2024-10-26T06:34:02.699429Z",
        "total_results": 58,
        "id": "PIO5xJIBHPjIIpHRGOo6"
    },
    {
        "query": "avvillas.com.co",
        "query_type": "DOMAIN",
        "scan_date": "2024-10-26T06:20:51.671980Z",
        "total_results": 83,
        "id": "vxJIBHPjIIpHRuekRdasRE"
    },
    {
        "query": "bancodebogota.com",
        "query_type": "DOMAIN",
        "scan_date": "2024-10-26T06:18:36.188735Z",
        "total_results": 519,
        "id": "R4O6xJIBHPjIIpHRxur5"
    },
    {
        "query": "bancodeoccidente.com.co",
        "query_type": "DOMAIN",
        "scan_date": "2024-10-26T06:37:17.967447Z",
        "total_results": 417,
        "id": "E4OLx5IBHPjIIpHRJvRD"
    },
    {
        "query": "grupoaval.com",
        "query_type": "DOMAIN",
        "scan_date": "2024-10-26T06:23:24.591311Z",
        "total_results": 197,
        "id": "-4OvxJIBHPjIIpHRuekR"
    },
    {
        "query": "mi.bancopopular.com.co",
        "query_type": "DOMAIN",
        "scan_date": "2024-10-26T07:17:13.479915Z",
        "total_results": 66,
        "id": "4oOsxJIBHPjIIpHRb-mQ"
    },
    {
        "query": "ATH",
        "query_type": "WORD",
        "scan_date": "2024-10-31T17:58:07.641115Z",
        "total_results": 43,
        "id": "O4S645IBHPjIIpHRQVTu"
    },
    {
        "query": "César Prado Villegas",
        "query_type": "WORD",
        "scan_date": "2024-10-31T17:42:30.129844Z",
        "total_results": 14,
        "id": "soSr45IBHPjIIpHR9FM-"
    },
    {
        "query": "Isabel Cristina Martínez",
        "query_type": "WORD",
        "scan_date": "2024-10-31T17:53:10.108713Z",
        "total_results": 9,
        "id": "DoS145IBHPjIIpHRuFTl"
    },
    {
        "query": "Luis Carlos Sarmiento Gutiérrez",
        "query_type": "WORD",
        "scan_date": "2024-10-31T17:50:25.807784Z",
        "total_results": 56,
        "id": "-ISz45IBHPjIIpHRNlMM"
    },
    {
        "query": "María Fernanda Suárez",
        "query_type": "WORD",
        "scan_date": "2024-10-31T17:47:15.418583Z",
        "total_results": 24,
        "id": "24Sw45IBHPjIIpHRT1Mp"
    },
    {
        "query": "ath.com.co",
        "query_type": "DOMAIN",
        "scan_date": "2024-10-31T17:55:38.072518Z",
        "total_results": 465,
        "id": "JYS345IBHPjIIpHR-VSL"
    },
    {
        "query": "bancopopular.com.co",
        "query_type": "DOMAIN",
        "scan_date": "2024-10-31T17:40:05.703370Z",
        "total_results": 377,
        "id": "noSp45IBHPjIIpHRwVNK"
    },
    {
        "query": "Óscar Bernal Quintero",
        "query_type": "WORD",
        "scan_date": "2024-10-31T17:44:18.149613Z",
        "total_results": 14,
        "id": "woSt45IBHPjIIpHRmlPT"
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
        "total_results": 50
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
        "total_results": 83
    },
    {
        "query": "bancodebogota.com",
        "total_results": 519
    },
    {
        "query": "bancodeoccidente.com.co",
        "total_results": 417
    },
    {
        "query": "grupoaval.com",
        "total_results": 197
    },
    {
        "query": "mi.bancopopular.com.co",
        "total_results": 66,

    },
    {
        "query": "ATH",
        "total_results": 43
    },
    {
        "query": "César Prado Villegas",
        "total_results": 14
    },
    {
        "query": "Isabel Cristina Martínez",
        "total_results": 9
    },
    {
        "query": "Luis Carlos Sarmiento Gutiérrez",
        "total_results": 56
    },
    {
        "query": "María Fernanda Suárez",
        "total_results": 24
    },
    {
        "query": "ath.com.co",
        "total_results": 465
    },
    {
        "query": "bancopopular.com.co",
        "total_results": 377
    },
    {
        "query": "Óscar Bernal Quintero",
        "total_results": 14
    }
];

latestData.sort((a, b) => b.total_results - a.total_results);
summaryData.sort((a, b) => b.total_results - a.total_results);


// GET: Fetch brand monitoring resume
mock.onGet('/api/data/monitoring/cyber-guard/monitoring/resume').reply(() => {

    // Initialize an object to store the required structure
    const aggregatedData = {
        ip: 0,
        emails: 0,
        usernames: 0,
        phones: 0,
        vins: 0,
        domains: 0,
        total: 0,
        security_leaks_total: 0,
        twitter: 0,
        instagram: 0,
        linkedin: 0,
        facebook: 0,
        social_network_total: 0,
        dark_web_total: 0,
    };
    for (const consolidate of consolidateDataTest.data) {
        const data: { [key: string]: Record<string, number> } = consolidate.consolidated_data;
        for (const key in data) {
            if (key.endsWith('_counters')) {
                for (const [subKey, value] of Object.entries(data[key])) {
                    switch (subKey) {
                        case 'ips':
                        case 'sl_ips':
                        case 'dw_ips':
                            aggregatedData.ip += value;
                            break;

                        case 'emails':
                        case 'sl_emails':
                        case 'dw_emails':
                            aggregatedData.emails += value;
                            break;

                        case 'names_usernames':
                        case 'sl_names_usernames':
                        case 'dw_names_usernames':
                            aggregatedData.usernames += value;
                            break;

                        case 'phones':
                        case 'sl_phones':
                        case 'dw_phones':
                            aggregatedData.phones += value;
                            break;

                        case 'vins':
                        case 'sl_vins':
                        case 'dw_vins':
                            aggregatedData.vins += value;
                            break;

                        case 'domains':
                        case 'sl_domains':
                        case 'dw_domains':
                            aggregatedData.domains += value;
                            break;

                        case 'security_leaks_total':
                            aggregatedData.security_leaks_total += value;
                            break;

                        case 'twitter':
                        case 'instagram':
                        case 'linkedin':
                        case 'facebook':
                            aggregatedData[key] += value;
                            aggregatedData.social_network_total += value;
                            break;

                        case 'dark_web_total':
                            aggregatedData.dark_web_total += value;
                            break;

                        case 'total':
                            aggregatedData.total += value;
                            break;
                    }
                }

            }
        }
    }



    return [200, { data: aggregatedData }];
});


// GET: Fetch paginated brand monitoring data
mock.onGet(new RegExp('/api/data/monitoring/cyber-guard/monitoring')).reply((config) => {
    try {
        const urlParams = new URLSearchParams(config.url!.split('?')[1]);
        const limit = 25;
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


mock.onGet(new RegExp('/api/data/monitoring/cyber-guard/detail/monitoring/*')).reply((config) => {
    try {
        const id = config.url!.split('/').pop();
        const brandMonitoringIndex = consolidateDataTest.data.findIndex((result) => result.id === id);

        if (brandMonitoringIndex === -1) {
            return [404, { message: 'Brand Monitoring result not found' }];
        }

        return [200, { brandMonitoring: consolidateDataTest.data[brandMonitoringIndex] }];
    } catch (error) {
        console.error('Error fetching Brand Monitoring:', error);
        return [500, { message: 'Failed to fetch Brand Monitoring' }];
    }
});


