import mock from '../../../mock'; // Ensure correct path to mock

interface TechInventoryType {
  id: string;
  name: string;
  category: string;
  version: string;
}

let techsInventory: TechInventoryType[] = [
  { "id": "1", "name": "Windows Server", "category": "OS", "version": "2018 R2" },
  { "id": "2", "name": "Microsoft SQL Server", "category": "Base de Datos", "version": "2019" },
  { "id": "3", "name": "Oracle Database", "category": "Base de Datos", "version": "19c" },
  { "id": "4", "name": "Ubuntu Server", "category": "OS", "version": "20.04 LTS" },
  { "id": "5", "name": "IBM WebSphere", "category": "Servidor Web", "version": "9.0" },
  { "id": "6", "name": "Apache Tomcat", "category": "Servidor Web", "version": "9.0.41" },
  { "id": "7", "name": "Red Hat Enterprise", "category": "OS", "version": "8.2" },
  { "id": "8", "name": "Cisco ASA", "category": "Firewall", "version": "9.14" },
  { "id": "9", "name": "Fortinet FortiGate", "category": "Firewall", "version": "6.4" },
  { "id": "10", "name": "PostgreSQL", "category": "Base de Datos", "version": "13" },
  { "id": "11", "name": "SAP HANA", "category": "ERP", "version": "2.0 SPS04" },
  { "id": "12", "name": "Microsoft Dynamics", "category": "CRM", "version": "365" },
  { "id": "13", "name": "Citrix XenApp", "category": "Virtualización", "version": "7.15" },
  { "id": "14", "name": "VMware ESXi", "category": "Virtualización", "version": "7.0" },
  { "id": "15", "name": "IBM MQ", "category": "Mensajería", "version": "9.1" },
  { "id": "16", "name": "Check Point", "category": "Firewall", "version": "R80.40" },
  { "id": "17", "name": "Symantec Endpoint", "category": "Seguridad", "version": "14.3" },
  { "id": "18", "name": "Palo Alto Networks", "category": "Firewall", "version": "PAN-OS 10.0" },
  { "id": "19", "name": "Elastic Stack", "category": "Análisis", "version": "7.10" },
  { "id": "20", "name": "Zabbix", "category": "Monitorización", "version": "5.2" },
  { "id": "21", "name": "Jira", "category": "Gestión Proyectos", "version": "8.13" },
  { "id": "22", "name": "FortiAnalyzer", "category": "Gestión de Logs", "version": "6.4" },
  { "id": "23", "name": "FortiAuthenticator", "category": "Autenticación", "version": "6.0" },
  { "id": "24", "name": "FortiWeb", "category": "Firewall de Aplicaciones Web", "version": "6.3" },
  { "id": "25", "name": "FortiMail", "category": "Seguridad de Correo", "version": "6.4" },
  { "id": "26", "name": "FortiSandbox", "category": "Sandbox y Análisis de Amenazas", "version": "3.2" },
  { "id": "27", "name": "FortiSIEM", "category": "SIEM", "version": "5.3" },
  { "id": "28", "name": "FortiClient", "category": "Seguridad Endpoint", "version": "6.4" },
  { "id": "29", "name": "FortiManager", "category": "Gestión de Redes", "version": "6.4" },
  { "id": "30", "name": "FortiToken", "category": "Autenticación Multifactor", "version": "5.4" },
  { "id": "31", "name": "FortiGate-VM", "category": "Firewall Virtual", "version": "7.0" }
]

// GET: Fetch paginated tecnology inventory
mock.onGet(new RegExp('/api/data/techinventory')).reply((config) => {
  try {
    const urlParams = new URLSearchParams(config.url!.split('?')[1]);

    const limit = 5;
    const page = parseInt(urlParams.get('page') || '1', 10); // Default to page 1
    
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;

    const paginatedTechsInventory = techsInventory.slice(startIndex, endIndex);
    const totalTechnologies = techsInventory.length;
    const totalPages = Math.ceil(totalTechnologies / limit);
    return [
      200,
      {
        techsInventory: paginatedTechsInventory,
        currentPage: page,
        totalPages,
      },
    ];
  } catch (error) {
    console.error('Error in technologies inventory API:', error);
    return [500, { message: 'Internal server error' }];
  }
});

// POST: Create a new tecnology
mock.onPost('/api/data/techinventory').reply((config) => {
  try {
    const { name, category, version } = JSON.parse(config.data);

    const newTechnology: TechInventoryType = {
      id: (techsInventory.length + 1).toString(), // Simple id generation
      name,
      category,
      version
    };

    techsInventory.push(newTechnology); // Add new tecnology to mock database

    return [200, { Technology: newTechnology }];
  } catch (error) {
    console.error('Error in creating technology:', error);
    return [500, { message: 'Failed to create technology' }];
  }
});

// PUT: Update an existing tecnology
mock.onPut(new RegExp('/api/data/techinventory/*')).reply((config) => {
  try {
    const technologyId = config.url!.split('/').pop(); // Extract the technology ID from the URL
    const updatedData = JSON.parse(config.data); // New data for the technology

    const technologyIndex = techsInventory.findIndex((tecnology) => tecnology.id === technologyId);
    if (technologyIndex === -1) {
      return [404, { message: 'Techonolgy not found' }];
    }

    techsInventory[technologyIndex] = { ...techsInventory[technologyIndex], ...updatedData }; // Update the technology

    return [200, { tecnology: techsInventory[technologyIndex] }];
  } catch (error) {
    console.error('Error updating technology:', error);
    return [500, { message: 'Failed to update technology' }];
  }
});

// DELETE: Delete an techonolgy inventory
mock.onDelete(new RegExp('/api/data/techinventory/*')).reply((config) => {
  try {
    const technologyId = config.url!.split('/').pop(); // Extract the technology ID from the URL

    const techonologyIndex = techsInventory.findIndex((technology) => technology.id === technologyId);
    if (techonologyIndex === -1) {
      return [404, { message: 'Techonology not found' }];
    }

    techsInventory.splice(techonologyIndex, 1); // Remove technology from the mock database

    return [200, { message: 'Techonology deleted successfully' }];
  } catch (error) {
    console.error('Error deleting techonolgy:', error);
    return [500, { message: 'Failed to delete techonolgy' }];
  }
});
