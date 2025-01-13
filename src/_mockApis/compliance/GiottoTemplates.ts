import mock from '../mock'; // Ensure correct path to mock


interface GiottoTemplateList {
  id: number,
  name: string,
  creationDate: string;
  workingSystemName: string,
  isBaseTemplate: boolean
}

interface GiottoTemplateObjList {
  itemsResult: GiottoTemplateList[],
  totalItemsAmount: number,
  pageSize: number,
  totalPages: number,
  currentPage: number
}

let baseTemplates: GiottoTemplateObjList = {
  "totalItemsAmount": 1,
  "pageSize": 10,
  "totalPages": 1,
  "currentPage": 1,
  "itemsResult": [
    {
      "id": 1,
      "name": "aWindows Server XYZies",
      "creationDate": "2024-10-15T15:29:01.8133333+00:00",
      "workingSystemName": "Windows Server 2019-2022",
      "isBaseTemplate": true
    }
  ]
};

let customTemplates: GiottoTemplateObjList =
{
  "totalItemsAmount": 1,
  "pageSize": 10,
  "totalPages": 1,
  "currentPage": 1,
  "itemsResult": [
    {
      "id": 1,
      "name": "aWindows Server XYZies",
      "creationDate": "2024-10-15T15:29:01.8133333+00:00",
      "workingSystemName": "Windows Server 2019-2022",
      "isBaseTemplate": true
    }
  ]
};

// GET: Fetch paginated base templates
mock.onGet(new RegExp('api/gioto/templates')).reply((config) => {
  try {

    return [
      200,
      {
        totalItemsAmount: baseTemplates.totalItemsAmount,
        pageSize: baseTemplates.pageSize,
        totalPages: baseTemplates.totalPages,
        currentPage: baseTemplates.currentPage,
        itemsResult: baseTemplates.itemsResult
      }
    ];
  } catch (error) {
    console.error('Error in templates API:', error);
    return [500, { message: 'Internal server error' }];
  }
});

// GET: Fetch paginated base templates
mock.onGet(new RegExp('api/gioto/customTemplates')).reply((config) => {
  try {

    return [
      200,
      {
        totalItemsAmount: customTemplates.totalItemsAmount,
        pageSize: customTemplates.pageSize,
        totalPages: customTemplates.totalPages,
        currentPage: customTemplates.currentPage,
        itemsResult: customTemplates.itemsResult
      }
    ];
  } catch (error) {
    console.error('Error in templates API:', error);
    return [500, { message: 'Internal server error' }];
  }
});

// POST: Create a new project
mock.onPost('api/gioto/templates/').reply((config) => {
  try {
    const {
      name,
      companyName,
      startDate,
      endDate,
      isDisabled,
      disabledBy
    } = JSON.parse(config.data);

    const newProject: ComplianceProject = {
      id: (templates.length + 1),
      name,
      companyName,
      startDate,
      endDate,
      isDisabled,
      disabledBy
    };
    templates.push(newProject); // Add new project to mock database
    return [200, newProject];
  } catch (error) {
    console.error('Error in creating project:', error);
    return [500, { message: 'Failed to create project' }];
  }
});

// PUT: Update an existing project
mock.onPut(new RegExp('api/gioto/templates/*')).reply((config) => {
  try {
    const projectId = Number(config.url!.split('/').pop());
    const updatedData = JSON.parse(config.data);

    const projectIndex = projects.findIndex((project) => project.id === projectId);
    if (projectIndex === -1) {
      return [404, { message: 'Project not found' }];
    }

    projects[projectIndex] = { ...projects[projectIndex], ...updatedData }; // Update the project

    return [200, projects[projectIndex]];
  } catch (error) {
    console.error('Error updating project:', error);
    return [500, { message: 'Failed to update project' }];
  }
});

// DELETE: Delete an project
mock.onDelete(new RegExp('/api/gioto/templates/*')).reply((config) => {
  try {
    const projectId = Number(config.url!.split('/').pop()); // Extract the project ID from the URL

    const projectIndex = projects.findIndex((project) => project.id === projectId);
    if (projectIndex === -1) {
      return [404, { message: 'Project not found' }];
    }

    projects.splice(projectIndex, 1); // Remove project from the mock database

    return [200, { message: 'Project deleted successfully' }];
  } catch (error) {
    console.error('Error deleting project:', error);
    return [500, { message: 'Failed to delete project' }];
  }
});