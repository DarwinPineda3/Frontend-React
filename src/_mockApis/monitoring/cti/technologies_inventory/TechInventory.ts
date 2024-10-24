import mock from '../../../mock'; // Ensure correct path to mock

interface TechInventoryType {
  id: string;
  name: string;
  category: string;
  version: string;
}

let techsInventory: TechInventoryType[] = [
    {
      "id": "1",
      "name": "SQL SERVER",
      "category": "APPS",
      "version": "2008 R2"
    },
    {
      "id": "2",
      "name": "SQL SERVER",
      "category": "APPS",
      "version": "2005"
    },
    {
      "id": "3",
      "name": "SQL SERVER",
      "category": "APPS",
      "version": "2012"
    },
    {
      "id": "4",
      "name": "SQL SERVER",
      "category": "APPS",
      "version": "2014"
    },
    {
      "id": "5",
      "name": "WINDOWS SERVER",
      "category": "OS",
      "version": "2003"
    },
    {
      "id": "6",
      "name": "WINDOWS SERVER",
      "category": "OS",
      "version": "2008"
    },
    {
      "id": "7",
      "name": "WINDOWS SERVER",
      "category": "OS",
      "version": "2008 R2"
    },
    {
      "id": "8",
      "name": "WINDOWS SERVER",
      "category": "OS",
      "version": "2012 R2"
    },
    {
      "id": "9",
      "name": "WINDOWS SERVER",
      "category": "OS",
      "version": "2016"
    },
    {
      "id": "10",
      "name": "WINDOWS SERVER",
      "category": "OS",
      "version": "2019"
    },
    {
      "id": "11",
      "name": "Red Hat Enterprise",
      "category": "OS",
      "version": "4"
    },
    {
      "id": "12",
      "name": "Red Hat Enterprise",
      "category": "OS",
      "version": "6.4"
    },
    {
      "id": "13",
      "name": "Red Hat Enterprise",
      "category": "OS",
      "version": "7.3"
    },
    {
      "id": "14",
      "name": "CentOs",
      "category": "OS",
      "version": "5"
    },
    {
      "id": "15",
      "name": "CentOs",
      "category": "OS",
      "version": "6"
    }
];

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
