import mock from '../mock'; // Asegúrate de que la ruta sea correcta

import { managementVulnerabilityType } from 'src/types/vulnerabilities/vulnerabilityManagementType';

let managementVuln: managementVulnerabilityType[] = [
  {
    id: 1,
    type: 'CRITICAL',
    hosts: 'https://prueba-tu-pala.ofertasdepadel.com/',
    port: '443',
    severity: 9.8,
    name: 'CVE-2021-24171 woocommerce',
    creation_time: '2024-10-29T21:38:35.924805Z',
    tool: 'WordPress',
    status: 'OPEN',
  },
  {
    id: 2,
    type: 'HIGH',
    hosts: 'https://prueba-tu-pala.ofertasdepadel.com/',
    port: '443',
    severity: 8.8,
    name: 'CVE-2023-52222 woocommerce',
    creation_time: '2024-10-29T21:38:35.924805Z',
    tool: 'WordPress',
    status: 'OPEN',
  },
  {
    id: 3,
    type: 'MEDIUM',
    hosts: 'https://prueba-tu-pala.ofertasdepadel.com/',
    port: '443',
    severity: 6.1,
    name: 'CVE-2024-9944 woocommerce',
    creation_time: '2024-10-29T21:38:35.924805Z',
    tool: 'WordPress',
    status: 'OPEN',
  },
  {
    id: 4,
    type: 'MEDIUM',
    hosts: 'https://prueba-tu-pala.ofertasdepadel.com/',
    port: '443',
    severity: 6.1,
    name: 'CVE-2023-32801 woocommerce',
    creation_time: '2024-10-29T21:38:35.924805Z',
    tool: 'WordPress',
    status: 'OPEN',
  },
  {
    id: 5,
    type: 'MEDIUM',
    hosts: 'https://prueba-tu-pala.ofertasdepadel.com/',
    port: '443',
    severity: 6.1,
    name: 'CVE-2024-35656 elementor',
    creation_time: '2024-10-29T21:38:35.924805Z',
    tool: 'WordPress',
    status: 'OPEN',
  },
  {
    id: 6,
    type: 'MEDIUM',
    hosts: 'https://prueba-tu-pala.ofertasdepadel.com/',
    port: '443',
    severity: 5.4,
    name: 'CVE-2024-37297 woocommerce',
    creation_time: '2024-10-29T21:38:35.924805Z',
    tool: 'WordPress',
    status: 'OPEN',
  },
  {
    id: 7,
    type: 'MEDIUM',
    hosts: 'https://prueba-tu-pala.ofertasdepadel.com/',
    port: '443',
    severity: 5.4,
    name: 'CVE-2024-5416 elementor',
    creation_time: '2024-10-29T21:38:35.924805Z',
    tool: 'WordPress',
    status: 'OPEN',
  },
];

mock.onGet(new RegExp('/api/data/vulnerabilities/management')).reply((config) => {
  try {
    const urlParams = new URLSearchParams(config.url!.split('?')[1]);

    const limit = 5;
    const page = parseInt(urlParams.get('page') || '1', 10); // Default to page 1

    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;

    const paginatedManagementVuln = managementVuln.slice(startIndex, endIndex);
    const totalManagementVulnerabilities = managementVuln.length;
    const totalPages = Math.ceil(totalManagementVulnerabilities / limit);

    return [
      200,
      {
        managedVuln: paginatedManagementVuln,
        currentPage: page,
        totalPages,
      },
    ];
  } catch (error) {
    console.error('Error in management vulnerabilities API:', error);
    return [500, { message: 'Internal server error' }];
  }
});
