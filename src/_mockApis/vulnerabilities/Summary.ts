import mock from '../mock'; // Ensure correct path to mock

interface vulnerabilityType {
    id: string;
    type: string;
    hosts: string;
    severity: number;
    name: string;
    creation_time: string;
    qod: string;
    tool: string;
    port: string;
    report_date: string;
    description: string;
    report_url: string;
    report_id: string;
    creation_time_format: string;
}

let summaryVuln: vulnerabilityType[] = [
    {
        "id": "CVE-2021-24171",
        "type": "CRITICAL",
        "hosts": "https://prueba-tu-pala.ofertasdepadel.com/",
        "severity": 9.8,
        "name": "CVE-2021-24171 woocommerce",
        "creation_time": "2024-10-15T22:42:09.183142+00:00",
        "qod": "0",
        "tool": "WordPress",
        "port": "443",
        "report_date": "2024-10-15T22:42:09.183142+00:00",
        "description": "",
        "report_url": "/vulnerabilities/web/wordpress/scans/PdxYkpIBrQYYP_4wrz3C",
        "report_id": "PdxYkpIBrQYYP_4wrz3C",
        "creation_time_format": "2024-10-15T22:42:09.183142Z"
    },
    {
        "id": "CVE-2023-52222",
        "type": "HIGH",
        "severity": 8.8,
        "name": "CVE-2023-52222 woocommerce",
        "creation_time": "2024-10-15T22:42:09.183142+00:00",
        "qod": "0",
        "hosts": "https://prueba-tu-pala.ofertasdepadel.com/",
        "tool": "WordPress",
        "port": "443",
        "report_date": "2024-10-15T22:42:09.183142+00:00",
        "description": "",
        "report_url": "/vulnerabilities/web/wordpress/scans/PdxYkpIBrQYYP_4wrz3C",
        "report_id": "PdxYkpIBrQYYP_4wrz3C",
        "creation_time_format": "2024-10-15T22:42:09.183142Z"
    },
    {
        "id": "CVE-2024-35656",
        "type": "MEDIUM",
        "severity": 6.1,
        "name": "CVE-2024-35656 elementor",
        "creation_time": "2024-10-15T22:42:09.183142+00:00",
        "qod": "0",
        "hosts": "https://prueba-tu-pala.ofertasdepadel.com/",
        "tool": "WordPress",
        "port": "443",
        "report_date": "2024-10-15T22:42:09.183142+00:00",
        "description": "",
        "report_url": "/vulnerabilities/web/wordpress/scans/PdxYkpIBrQYYP_4wrz3C",
        "report_id": "PdxYkpIBrQYYP_4wrz3C",
        "creation_time_format": "2024-10-15T22:42:09.183142Z"
    },
    {
        "id": "CVE-2023-32801",
        "type": "LOW",
        "severity": 2,
        "name": "CVE-2023-32801 woocommerce",
        "creation_time": "2024-10-15T22:42:09.183142+00:00",
        "qod": "0",
        "hosts": "https://prueba-tu-pala.ofertasdepadel.com/",
        "tool": "WordPress",
        "port": "443",
        "report_date": "2024-10-15T22:42:09.183142+00:00",
        "description": "",
        "report_url": "/vulnerabilities/web/wordpress/scans/PdxYkpIBrQYYP_4wrz3C",
        "report_id": "PdxYkpIBrQYYP_4wrz3C",
        "creation_time_format": "2024-10-15T22:42:09.183142Z"
    },
    {
        "id": "CVE-2024-37437",
        "type": "MEDIUM",
        "severity": 5.4,
        "name": "CVE-2024-37437 elementor",
        "creation_time": "2024-10-15T22:42:09.183142+00:00",
        "qod": "0",
        "hosts": "https://prueba-tu-pala.ofertasdepadel.com/",
        "tool": "WordPress",
        "port": "443",
        "report_date": "2024-10-15T22:42:09.183142+00:00",
        "description": "",
        "report_url": "/vulnerabilities/web/wordpress/scans/PdxYkpIBrQYYP_4wrz3C",
        "report_id": "PdxYkpIBrQYYP_4wrz3C",
        "creation_time_format": "2024-10-15T22:42:09.183142Z"
    },
    {
        "id": "CVE-2024-5416",
        "type": "MEDIUM",
        "severity": 5.4,
        "name": "CVE-2024-5416 elementor",
        "creation_time": "2024-10-15T22:42:09.183142+00:00",
        "qod": "0",
        "hosts": "https://prueba-tu-pala.ofertasdepadel.com/",
        "tool": "WordPress",
        "port": "443",
        "report_date": "2024-10-15T22:42:09.183142+00:00",
        "description": "",
        "report_url": "/vulnerabilities/web/wordpress/scans/PdxYkpIBrQYYP_4wrz3C",
        "report_id": "PdxYkpIBrQYYP_4wrz3C",
        "creation_time_format": "2024-10-15T22:42:09.183142Z"
    },
    {
        "id": "CVE-2024-37297",
        "type": "LOW",
        "severity": 2.5,
        "name": "CVE-2024-37297 woocommerce",
        "creation_time": "2024-10-15T22:42:09.183142+00:00",
        "qod": "0",
        "hosts": "https://prueba-tu-pala.ofertasdepadel.com/",
        "tool": "WordPress",
        "port": "443",
        "report_date": "2024-10-15T22:42:09.183142+00:00",
        "description": "",
        "report_url": "/vulnerabilities/web/wordpress/scans/PdxYkpIBrQYYP_4wrz3C",
        "report_id": "PdxYkpIBrQYYP_4wrz3C",
        "creation_time_format": "2024-10-15T22:42:09.183142Z"
    },

];

// GET: Fetch paginated tecnology inventory
mock.onGet(new RegExp('/api/data/summary')).reply((config) => {
    try {
        const urlParams = new URLSearchParams(config.url!.split('?')[1]);

        const limit = 25;
        const page = parseInt(urlParams.get('page') || '1', 10); // Default to page 1

        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;

        const paginatedSummaryVuln = summaryVuln.slice(startIndex, endIndex);
        const totalVulnerabilities = summaryVuln.length;
        const totalPages = Math.ceil(totalVulnerabilities / limit);
        return [
            200,
            {
                summaryVuln: paginatedSummaryVuln,
                currentPage: page,
                totalPages,
            },
        ];
    } catch (error) {
        console.error('Error in summary vulnerabilities API:', error);
        return [500, { message: 'Internal server error' }];
    }
});

