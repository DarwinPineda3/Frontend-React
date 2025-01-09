import mock from '../mock'; // Ensure correct path to mock


interface ComplianceProject {
  id: number,
  name: string,
  companyName: string | undefined;
  startDate: string,
  endDate: string,
  isDisabled: boolean,
  disabledBy: boolean | null
  companyId?: number | null;
  groups?: any[] | null;
  managers?: any[] | null;

}

let projects: ComplianceProject[] = [
  {
    "id": 2,
    "name": "Grupo Demo Giotto 2",
    "companyName": "Octapus",
    "startDate": "2024-12-16T21:48:25.721+00:00",
    "endDate": "2025-01-15T21:48:25.722+00:00",
    "isDisabled": false,
    "disabledBy": null,
    "groups": [
      {
        "groupId": 2,
        "name": "group exam2",
        "groupTechnicians": [

        ],
        "groupTemplates": [
          {
            "id": 1,
            "name": "aWindows Server XYZies",
            "creationDate": "2024-10-15T15:29:01.8133333+00:00",
            "workingSystemName": "Windows Server 2019-2022"
          }
        ]
      },
      {
        "groupId": 1,
        "name": "Grupo Demo Giotto",
        "groupTechnicians": [

        ],
        "groupTemplates": [
          {
            "id": 2,
            "name": "Plantilla Windows Server 2019 (Recortada)",
            "creationDate": "2024-10-16T10:58:25.7786051-06:00",
            "workingSystemName": "Windows Server 2019-2022"
          }
        ]
      }
    ],
    "managers": [
      {
        "userId": "10147728-d58b-4858-a86d-73bc263ea7cc",
        "userName": "GiottoManager",
        "fullName": "Giotto Manager",
        "email": "manager@gmail.com"
      }
    ]
  },
  {
    "id": 1,
    "name": "Proyecto Demo Giotto",
    "companyName": "Octapus",
    "startDate": "2024-10-16T16:59:12.314+00:00",
    "endDate": "2024-11-15T16:59:12.322+00:00",
    "isDisabled": false,
    "disabledBy": null
  }
];

// GET: Fetch paginated projects
mock.onGet(new RegExp('api/gioto/projects')).reply((config) => {
  try {
    const urlParams = new URLSearchParams(config.url!.split('?')[1]);

    const limit = 5;
    const page = parseInt(urlParams.get('page') || '1', 10); // Default to page 1


    const totalProjects = projects.length;
    const totalPages = Math.ceil(totalProjects / limit);
    return [
      200,
      {
        totalItemsAmount: totalProjects,
        pageSize: limit,
        totalPages,
        currentPage: page,
        itemsResult: projects
      }
    ];
  } catch (error) {
    console.error('Error in projects API:', error);
    return [500, { message: 'Internal server error' }];
  }
});

// POST: Create a new project
mock.onPost('api/gioto/projects/').reply((config) => {
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
      id: (projects.length + 1),
      name,
      companyName,
      startDate,
      endDate,
      isDisabled,
      disabledBy
    };
    projects.push(newProject); // Add new project to mock database
    return [200, newProject];
  } catch (error) {
    console.error('Error in creating project:', error);
    return [500, { message: 'Failed to create project' }];
  }
});

// PUT: Update an existing project
mock.onPut(new RegExp('api/gioto/projects/*')).reply((config) => {
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
mock.onDelete(new RegExp('/api/gioto/projects/*')).reply((config) => {
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
