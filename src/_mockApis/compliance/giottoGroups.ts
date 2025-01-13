import { formatISO } from 'date-fns';
import mock from '../mock'; // Ensure correct path to mock



interface ComplianceGroup {
  id: number,
  name: string,
  assetsQty: number
}

let groups: ComplianceGroup[] = [
  {"id": 1, "name": "Group Example 1", "assetsQty": 0},
  {"id": 2, "name": "Group Example 2", "assetsQty": 1},
  {"id": 3, "name": "Group Example 3", "assetsQty": 2},
  {"id": 4, "name": "Group Example 4", "assetsQty": 0},
  {"id": 5, "name": "Group Example 5", "assetsQty": 1},
  {"id": 6, "name": "Group Example 6", "assetsQty": 2},
  {"id": 7, "name": "Group Example 7", "assetsQty": 0},
  {"id": 8, "name": "Group Example 8", "assetsQty": 1},
  {"id": 9, "name": "Group Example 9", "assetsQty": 2},
  {"id": 10, "name": "Group Example 10", "assetsQty": 0},
  {"id": 11, "name": "Group Example 11", "assetsQty": 1},
  {"id": 12, "name": "Group Example 12", "assetsQty": 2},
  {"id": 13, "name": "Group Example 13", "assetsQty": 0},
  {"id": 14, "name": "Group Example 14", "assetsQty": 1},
  {"id": 15, "name": "Group Example 15", "assetsQty": 2},
  {"id": 16, "name": "Group Example 16", "assetsQty": 0},
  {"id": 17, "name": "Group Example 17", "assetsQty": 1},
  {"id": 18, "name": "Group Example 18", "assetsQty": 2},
  {"id": 19, "name": "Group Example 19", "assetsQty": 0},
  {"id": 20, "name": "Group Example 20", "assetsQty": 1},
  {"id": 21, "name": "Group Example 21", "assetsQty": 2},
  {"id": 22, "name": "Group Example 22", "assetsQty": 0},
  {"id": 23, "name": "Group Example 23", "assetsQty": 1},
  {"id": 24, "name": "Group Example 24", "assetsQty": 2},
  {"id": 25, "name": "Group Example 25", "assetsQty": 0},
  {"id": 26, "name": "Group Example 26", "assetsQty": 1},
  {"id": 27, "name": "Group Example 27", "assetsQty": 2},
  {"id": 28, "name": "Group Example 28", "assetsQty": 0},
  {"id": 29, "name": "Group Example 29", "assetsQty": 1},
  {"id": 30, "name": "Group Example 30", "assetsQty": 2}
];




// GET: Fetch paginated groups
mock.onGet(new RegExp('api/giotto/groups')).reply((res) => {
  try {
    const urlParams = new URLSearchParams(res.url!.split('?')[1]);

    const limit = 5;
    const page = parseInt(urlParams.get('page') || '1', 10); // Default to page 1


    const totalGroups = groups.length;
    const totalPages = Math.ceil(totalGroups / limit);
    return [
      200,
      {
        totalItemsAmount: totalGroups,
        pageSize: limit,
        totalPages,
        currentPage: page,
        itemsResult: groups
      }
    ];
  } catch (error) {
    console.error('Error in groups API:', error);
    return [500, { message: 'Internal server error' }];
  }
});

mock.onGet(new RegExp('api/giotto/groups/*')).reply((res) => {
  try {
    const groupId = res.url!.split('/').pop(); // Extract the group ID from the URL
    console.log(groupId);
    

    const data = {
      id: 1,
      name: 'Grupo Demo Giotto',
      description: 'Descripción del grupo Giotto.',
      assets: [
        {
          id: 1,
          name: 'giotto-win-srva',
          networkAddress: '192.168.2.8',
          lastKeepAlive: formatISO(new Date()),
        },
        {
          id: 2,
          name: 'giotto-win-srva',
          networkAddress: '192.168.2.8',
          lastKeepAlive: formatISO(new Date()),
        },
      ],
      templates: [
        {
          id: 2,
          name: 'Plantilla Windows Server 2019 (Recortada)',
          creationDate: '2024-10-16T10:58:25.7786051-06:00',
          workingSystemName: 'Windows Server 2019-2022',
        },
      ],
    };

    return [200, data];
  } catch (error) {
    console.error('Error in mock API:', error);
    return [500, { message: 'Internal server error' }];
  }
});

// POST: Create a new group
mock.onPost('api/giotto/groups/').reply((res) => {
  try {
    const {
      name,
      assetsQty
    } = JSON.parse(res.data);

    const newGroup: ComplianceGroup = {
      id: (groups.length + 1),
      name,
      assetsQty
    };
    groups.push(newGroup); // Add new group to mock database
    return [200, newGroup];
  } catch (error) {
    console.error('Error in creating group:', error);
    return [500, { message: 'Failed to create group' }];
  }
});

// PUT: Update an existing group
mock.onPut(new RegExp('api/giotto/groups/*')).reply((res) => {
  try {
    const groupId = res.url!.split('/').pop();
    const groupIdAsNumber = groupId ? parseInt(groupId, 10) : NaN;
    const updatedData = JSON.parse(res.data);

    const assetIndex = groups.findIndex((group) => group.id === groupIdAsNumber);
    if (assetIndex === -1) {
      return [404, { message: 'Group not found' }];
    }

    groups[assetIndex] = { ...groups[assetIndex], ...updatedData }; // Update the group

    return [200, groups[assetIndex]];
  } catch (error) {
    console.error('Error updating group:', error);
    return [500, { message: 'Failed to update group' }];
  }
});

// DELETE: Delete an group
mock.onDelete(new RegExp('/api/giotto/groups/*')).reply((res) => {
  try {
    const groupId = res.url!.split('/').pop(); // Extract the group ID from the URL
    const groupIdAsNumber = groupId ? parseInt(groupId, 10) : NaN;

    const assetIndex = groups.findIndex((group) => group.id === groupIdAsNumber);
    if (assetIndex === -1) {
      return [404, { message: 'Group not found' }];
    }

    groups.splice(assetIndex, 1); // Remove group from the mock database

    return [200, { message: 'Group deleted successfully' }];
  } catch (error) {
    console.error('Error deleting group:', error);
    return [500, { message: 'Failed to delete group' }];
  }
});