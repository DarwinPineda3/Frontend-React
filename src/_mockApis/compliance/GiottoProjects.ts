import mock from '../mock'; // Ensure correct path to mock


interface ComplianceProject {
  id: number,
  name: string,
  description?: string,
  companyName: string | undefined;
  startDate: string,
  endDate: string,
  isDisabled: boolean,
  disabledBy: boolean | null
  companyId?: number | null;
  groups?: any[] | null;
  managers?: any[] | null;

}

interface ComplianceProjectObjList {
  id: number,
  name: string,
  companyName: string | undefined;
  start_date: string,
  end_date: string,
  disabledBy: boolean,
  disabledDate: boolean | null,
}
interface ComplianceProjectList {
  itemsResult: ComplianceProjectObjList[],
  page: number,
  totalPages: number,
  totalItemsAmount: number,
  pageSize: number
}



let projects: any =
{
  "itemsResult": [
    {
      "id": 1,
      "name": "Grupo Demo A",
      "start_date": "2025-01-03T17:40:29.205Z",
      "end_date": "2025-02-02T17:40:29.207Z",
      "disabledBy": null,
      "disabledDate": false
    },
    {
      "id": 2,
      "name": "Grupo Demo B",
      "start_date": "2025-01-03T17:40:29.205Z",
      "end_date": "2025-02-02T17:40:29.207Z",
      "disabledBy": null,
      "disabledDate": false
    },
    {
      "id": 3,
      "name": "Grupo Demo C",
      "start_date": "2025-01-03T17:40:29.205Z",
      "end_date": "2025-02-02T17:40:29.207Z",
      "disabledBy": null,
      "disabledDate": false
    },
    {
      "id": 4,
      "name": "Grupo Demo D",
      "start_date": "2025-01-03T17:40:29.205Z",
      "end_date": "2025-02-02T17:40:29.207Z",
      "disabledBy": null,
      "disabledDate": false
    },
    {
      "id": 5,
      "name": "Grupo Demo E",
      "start_date": "2025-01-03T17:40:29.205Z",
      "end_date": "2025-02-02T17:40:29.207Z",
      "disabledBy": null,
      "disabledDate": false
    },
    {
      "id": 6,
      "name": "Grupo Demo F",
      "start_date": "2025-01-03T17:40:29.205Z",
      "end_date": "2025-02-02T17:40:29.207Z",
      "disabledBy": null,
      "disabledDate": false
    },
    {
      "id": 7,
      "name": "Grupo Demo G",
      "start_date": "2025-01-03T17:40:29.205Z",
      "end_date": "2025-02-02T17:40:29.207Z",
      "disabledBy": null,
      "disabledDate": false
    },
    {
      "id": 8,
      "name": "Grupo Demo H",
      "start_date": "2025-01-03T17:40:29.205Z",
      "end_date": "2025-02-02T17:40:29.207Z",
      "disabledBy": null,
      "disabledDate": false
    },
    {
      "id": 9,
      "name": "Grupo Demo I",
      "start_date": "2025-01-03T17:40:29.205Z",
      "end_date": "2025-02-02T17:40:29.207Z",
      "disabledBy": null,
      "disabledDate": false
    },
    {
      "id": 10,
      "name": "Grupo Demo J",
      "start_date": "2025-01-03T17:40:29.205Z",
      "end_date": "2025-02-02T17:40:29.207Z",
      "disabledBy": null,
      "disabledDate": false
    },
    {
      "id": 11,
      "name": "Grupo Demo K",
      "start_date": "2025-01-03T17:40:29.205Z",
      "end_date": "2025-02-02T17:40:29.207Z",
      "disabledBy": null,
      "disabledDate": false
    },
    {
      "id": 12,
      "name": "Grupo Demo L",
      "start_date": "2025-01-03T17:40:29.205Z",
      "end_date": "2025-02-02T17:40:29.207Z",
      "disabledBy": null,
      "disabledDate": false
    },
    {
      "id": 13,
      "name": "Grupo Demo M",
      "start_date": "2025-01-03T17:40:29.205Z",
      "end_date": "2025-02-02T17:40:29.207Z",
      "disabledBy": null,
      "disabledDate": false
    },
    {
      "id": 14,
      "name": "Grupo Demo N",
      "start_date": "2025-01-03T17:40:29.205Z",
      "end_date": "2025-02-02T17:40:29.207Z",
      "disabledBy": null,
      "disabledDate": false
    },
    {
      "id": 15,
      "name": "Grupo Demo O",
      "start_date": "2025-01-03T17:40:29.205Z",
      "end_date": "2025-02-02T17:40:29.207Z",
      "disabledBy": null,
      "disabledDate": false
    },
    {
      "id": 16,
      "name": "Grupo Demo P",
      "start_date": "2025-01-03T17:40:29.205Z",
      "end_date": "2025-02-02T17:40:29.207Z",
      "disabledBy": null,
      "disabledDate": false
    },
    {
      "id": 17,
      "name": "Grupo Demo Q",
      "start_date": "2025-01-03T17:40:29.205Z",
      "end_date": "2025-02-02T17:40:29.207Z",
      "disabledBy": null,
      "disabledDate": false
    },
    {
      "id": 18,
      "name": "Grupo Demo R",
      "start_date": "2025-01-03T17:40:29.205Z",
      "end_date": "2025-02-02T17:40:29.207Z",
      "disabledBy": null,
      "disabledDate": false
    },
    {
      "id": 19,
      "name": "Grupo Demo S",
      "start_date": "2025-01-03T17:40:29.205Z",
      "end_date": "2025-02-02T17:40:29.207Z",
      "disabledBy": null,
      "disabledDate": false
    },
    {
      "id": 20,
      "name": "Grupo Demo T",
      "start_date": "2025-01-03T17:40:29.205Z",
      "end_date": "2025-02-02T17:40:29.207Z",
      "disabledBy": null,
      "disabledDate": false
    },
    {
      "id": 21,
      "name": "Grupo Demo U",
      "start_date": "2025-01-03T17:40:29.205Z",
      "end_date": "2025-02-02T17:40:29.207Z",
      "disabledBy": null,
      "disabledDate": false
    },
    {
      "id": 22,
      "name": "Grupo Demo V",
      "start_date": "2025-01-03T17:40:29.205Z",
      "end_date": "2025-02-02T17:40:29.207Z",
      "disabledBy": null,
      "disabledDate": false
    },
    {
      "id": 23,
      "name": "Grupo Demo W",
      "start_date": "2025-01-03T17:40:29.205Z",
      "end_date": "2025-02-02T17:40:29.207Z",
      "disabledBy": null,
      "disabledDate": false
    },
    {
      "id": 24,
      "name": "Grupo Demo X",
      "start_date": "2025-01-03T17:40:29.205Z",
      "end_date": "2025-02-02T17:40:29.207Z",
      "disabledBy": null,
      "disabledDate": false
    },
    {
      "id": 25,
      "name": "Grupo Demo Y",
      "start_date": "2025-01-03T17:40:29.205Z",
      "end_date": "2025-02-02T17:40:29.207Z",
      "disabledBy": null,
      "disabledDate": false
    }
  ],
  "page": 1,
  "totalPages": 2,
  "totalItemsAmount": 49,
  "pageSize": 25
}

let projectDetail: ComplianceProject =
{
  "id": 2,
  "name": "Grupo Demo Giotto 2",
  "description": "Grupo Demo Giotto 2",
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
}

// DELETE: Delete an project
mock.onDelete(new RegExp('api/giotto/projects/delete/*')).reply((config) => {
  try {
    const projectId = Number(config.url!.split('/').pop()); // Extract the project ID from the URL
    const projectIndex = projects.itemsResult.findIndex((project: ComplianceProjectObjList) => project.id === projectId);
    if (projectIndex === -1) {
      return [404, { message: 'Project not found' }];
    }

    projects.itemsResult.splice(projectIndex, 1); // Remove project from the mock database

    return [200, { message: 'Project deleted successfully' }];
  } catch (error) {
    console.error('Error deleting project:', error);
    return [500, { message: 'Failed to delete project' }];
  }
});

// GET: Fetch project app by id
mock.onGet(new RegExp('api/giotto/projects/detail/*')).reply((config) => {
  try {
    const projectId = config.url!.split('/').pop();

    // if (!data) {
    //   return [404, { message: 'MobileApp not found' }];
    // }

    return [
      200,
      {
        data: projectDetail
      },
    ];
  } catch (error) {
    console.error('Error in mobileApps API:', error);
    return [500, { message: 'Internal server error' }];
  }
});

// GET: Fetch paginated projects
mock.onGet(new RegExp('api/giotto/projects')).reply((config) => {
  try {

    return [
      200,
      {
        totalItemsAmount: projects.totalItemsAmount,
        pageSize: projects.pageSize,
        totalPages: projects.totalPages,
        page: projects.page,
        itemsResult: projects.itemsResult
      }
    ];
  } catch (error) {
    console.error('Error in projects API:', error);
    return [500, { message: 'Internal server error' }];
  }
});

// POST: Create a new project
mock.onPost('api/giotto/projects/').reply((config) => {
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
mock.onPut(new RegExp('api/giotto/projects/edit/*')).reply((config) => {
  try {
    const projectId = Number(config.url!.split('/').pop());
    const updatedData = JSON.parse(config.data);
    // const projectIndex = projects.findIndex((project) => project.id === projectId);
    const projectIndex = 5;
    // if (projectIndex === -1) {
    //   return [404, { message: 'Project not found' }];
    // }

    projects[projectIndex] = { ...projects[projectIndex], ...updatedData }; // Update the project

    return [200, projects[projectIndex]];
  } catch (error) {
    console.error('Error updating project:', error);
    return [500, { message: 'Failed to update project' }];
  }
});

