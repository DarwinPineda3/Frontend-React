// home/Asset.ts

import mock from '../mock'; // Ensure correct path to mock



interface ComplianceAsset {
  id: string,
  name: string,
  description: string | undefined;
  networkAddress: string,
  companyName: string,
  creationDate: string,
  lastKeepAlive: string
}

let assets: ComplianceAsset[] = [
  {
    "id": "1",
    "name": "giotto-win-srva",
    "networkAddress": "192.168.2.8",
    "companyName": "Octapus",
    "creationDate": "2024-10-15T16:37:23.7885339-06:00",
    "lastKeepAlive": "2025-01-01T19:49:39.3519072-06:00",
    "description": "Windows Server 2019"
  }
];

// GET: Fetch paginated assets
mock.onGet(new RegExp('api/gioto/assets')).reply((config) => {
  try {
    const urlParams = new URLSearchParams(config.url!.split('?')[1]);

    const limit = 5;
    const page = parseInt(urlParams.get('page') || '1', 10); // Default to page 1


    const totalAssets = assets.length;
    const totalPages = Math.ceil(totalAssets / limit);
    return [
      200,
      {
        totalItemsAmount: totalAssets,
        pageSize: limit,
        totalPages,
        currentPage: page,
        itemsResult: assets
      }
    ];
  } catch (error) {
    console.error('Error in assets API:', error);
    return [500, { message: 'Internal server error' }];
  }
});

// POST: Create a new asset
mock.onPost('api/gioto/assets/').reply((config) => {
  try {
    const {
      name,
      networkAddress,
      description,
      creationDate,
      lastKeepAlive,
      companyName
    } = JSON.parse(config.data);

    const newAsset: ComplianceAsset = {
      id: (assets.length + 1).toString(),
      name,
      networkAddress,
      description,
      creationDate,
      lastKeepAlive,
      companyName
    };
    assets.push(newAsset); // Add new asset to mock database
    return [200, newAsset];
  } catch (error) {
    console.error('Error in creating asset:', error);
    return [500, { message: 'Failed to create asset' }];
  }
});

// PUT: Update an existing asset
mock.onPut(new RegExp('api/gioto/assets/*')).reply((config) => {
  try {
    const assetId = config.url!.split('/').pop();
    const updatedData = JSON.parse(config.data);

    const assetIndex = assets.findIndex((asset) => asset.id === assetId);
    if (assetIndex === -1) {
      return [404, { message: 'Asset not found' }];
    }

    assets[assetIndex] = { ...assets[assetIndex], ...updatedData }; // Update the asset

    return [200, assets[assetIndex]];
  } catch (error) {
    console.error('Error updating asset:', error);
    return [500, { message: 'Failed to update asset' }];
  }
});

// DELETE: Delete an asset
mock.onDelete(new RegExp('/api/gioto/assets/*')).reply((config) => {
  try {
    const assetId = config.url!.split('/').pop(); // Extract the asset ID from the URL

    const assetIndex = assets.findIndex((asset) => asset.id === assetId);
    if (assetIndex === -1) {
      return [404, { message: 'Asset not found' }];
    }

    assets.splice(assetIndex, 1); // Remove asset from the mock database

    return [200, { message: 'Asset deleted successfully' }];
  } catch (error) {
    console.error('Error deleting asset:', error);
    return [500, { message: 'Failed to delete asset' }];
  }
});
