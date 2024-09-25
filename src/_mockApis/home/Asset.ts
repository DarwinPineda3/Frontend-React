// home/Asset.ts

import mock from '../mock'; // Ensure correct path to mock



interface AssetType {
  id: string;
  name: string;
  ip: string;
  dominio: string;
  url: string;
}

let assets: AssetType[] = [
    {
      "id": "1",
      "name": "Asset 1",
      "ip": "192.168.1.1",
      "dominio": "domain1.com",
      "url": "https://domain1.com"
    },
    {
      "id": "2",
      "name": "Asset 2",
      "ip": "192.168.1.2",
      "dominio": "domain2.com",
      "url": "https://domain2.com"
    },
    {
      "id": "3",
      "name": "Asset 3",
      "ip": "192.168.1.3",
      "dominio": "domain3.com",
      "url": "https://domain3.com"
    },
    {
      "id": "4",
      "name": "Asset 4",
      "ip": "192.168.1.4",
      "dominio": "domain4.com",
      "url": "https://domain4.com"
    },
    {
      "id": "5",
      "name": "Asset 5",
      "ip": "192.168.1.5",
      "dominio": "domain5.com",
      "url": "https://domain5.com"
    },
    {
      "id": "6",
      "name": "Asset 6",
      "ip": "192.168.1.6",
      "dominio": "domain6.com",
      "url": "https://domain6.com"
    },
    {
      "id": "7",
      "name": "Asset 7",
      "ip": "192.168.1.7",
      "dominio": "domain7.com",
      "url": "https://domain7.com"
    },
    {
      "id": "8",
      "name": "Asset 8",
      "ip": "192.168.1.8",
      "dominio": "domain8.com",
      "url": "https://domain8.com"
    },
    {
      "id": "9",
      "name": "Asset 9",
      "ip": "192.168.1.9",
      "dominio": "domain9.com",
      "url": "https://domain9.com"
    },
    {
      "id": "10",
      "name": "Asset 10",
      "ip": "192.168.1.10",
      "dominio": "domain10.com",
      "url": "https://domain10.com"
    },
    {
      "id": "11",
      "name": "Asset 11",
      "ip": "192.168.1.11",
      "dominio": "domain11.com",
      "url": "https://domain11.com"
    },
    {
      "id": "12",
      "name": "Asset 12",
      "ip": "192.168.1.12",
      "dominio": "domain12.com",
      "url": "https://domain12.com"
    },
    {
      "id": "13",
      "name": "Asset 13",
      "ip": "192.168.1.13",
      "dominio": "domain13.com",
      "url": "https://domain13.com"
    },
    {
      "id": "14",
      "name": "Asset 14",
      "ip": "192.168.1.14",
      "dominio": "domain14.com",
      "url": "https://domain14.com"
    },
    {
      "id": "15",
      "name": "Asset 15",
      "ip": "192.168.1.15",
      "dominio": "domain15.com",
      "url": "https://domain15.com"
    },
    {
      "id": "16",
      "name": "Asset 16",
      "ip": "192.168.1.16",
      "dominio": "domain16.com",
      "url": "https://domain16.com"
    },
    {
      "id": "17",
      "name": "Asset 17",
      "ip": "192.168.1.17",
      "dominio": "domain17.com",
      "url": "https://domain17.com"
    },
    {
      "id": "18",
      "name": "Asset 18",
      "ip": "192.168.1.18",
      "dominio": "domain18.com",
      "url": "https://domain18.com"
    },
    {
      "id": "19",
      "name": "Asset 19",
      "ip": "192.168.1.19",
      "dominio": "domain19.com",
      "url": "https://domain19.com"
    },
    {
      "id": "20",
      "name": "Asset 20",
      "ip": "192.168.1.20",
      "dominio": "domain20.com",
      "url": "https://domain20.com"
    },
    {
      "id": "21",
      "name": "Asset 21",
      "ip": "192.168.1.21",
      "dominio": "domain21.com",
      "url": "https://domain21.com"
    },
    {
      "id": "22",
      "name": "Asset 22",
      "ip": "192.168.1.22",
      "dominio": "domain22.com",
      "url": "https://domain22.com"
    },
    {
      "id": "23",
      "name": "Asset 23",
      "ip": "192.168.1.23",
      "dominio": "domain23.com",
      "url": "https://domain23.com"
    },
    {
      "id": "24",
      "name": "Asset 24",
      "ip": "192.168.1.24",
      "dominio": "domain24.com",
      "url": "https://domain24.com"
    },
    {
      "id": "25",
      "name": "Asset 25",
      "ip": "192.168.1.25",
      "dominio": "domain25.com",
      "url": "https://domain25.com"
    },
    {
      "id": "26",
      "name": "Asset 26",
      "ip": "192.168.1.26",
      "dominio": "domain26.com",
      "url": "https://domain26.com"
    },
    {
      "id": "27",
      "name": "Asset 27",
      "ip": "192.168.1.27",
      "dominio": "domain27.com",
      "url": "https://domain27.com"
    },
    {
      "id": "28",
      "name": "Asset 28",
      "ip": "192.168.1.28",
      "dominio": "domain28.com",
      "url": "https://domain28.com"
    },
    {
      "id": "29",
      "name": "Asset 29",
      "ip": "192.168.1.29",
      "dominio": "domain29.com",
      "url": "https://domain29.com"
    },
    {
      "id": "30",
      "name": "Asset 30",
      "ip": "192.168.1.30",
      "dominio": "domain30.com",
      "url": "https://domain30.com"
    },
    {
      "id": "31",
      "name": "Asset 31",
      "ip": "192.168.1.31",
      "dominio": "domain31.com",
      "url": "https://domain31.com"
    },
    {
      "id": "32",
      "name": "Asset 32",
      "ip": "192.168.1.32",
      "dominio": "domain32.com",
      "url": "https://domain32.com"
    },
    {
      "id": "33",
      "name": "Asset 33",
      "ip": "192.168.1.33",
      "dominio": "domain33.com",
      "url": "https://domain33.com"
    },
    {
      "id": "34",
      "name": "Asset 34",
      "ip": "192.168.1.34",
      "dominio": "domain34.com",
      "url": "https://domain34.com"
    },
    {
      "id": "35",
      "name": "Asset 35",
      "ip": "192.168.1.35",
      "dominio": "domain35.com",
      "url": "https://domain35.com"
    },
    {
      "id": "36",
      "name": "Asset 36",
      "ip": "192.168.1.36",
      "dominio": "domain36.com",
      "url": "https://domain36.com"
    },
    {
      "id": "37",
      "name": "Asset 37",
      "ip": "192.168.1.37",
      "dominio": "domain37.com",
      "url": "https://domain37.com"
    },
];

// GET: Fetch paginated assets
mock.onGet(new RegExp('/api/data/assets')).reply((config) => {
  try {
    const urlParams = new URLSearchParams(config.url!.split('?')[1]);

    const limit = 5;
    const page = parseInt(urlParams.get('page') || '1', 10); // Default to page 1
    
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;

    const paginatedAssets = assets.slice(startIndex, endIndex);
    const totalAssets = assets.length;
    const totalPages = Math.ceil(totalAssets / limit);

    return [
      200,
      {
        assets: paginatedAssets,
        currentPage: page,
        totalPages,
      },
    ];
  } catch (error) {
    console.error('Error in assets API:', error);
    return [500, { message: 'Internal server error' }];
  }
});

// POST: Create a new asset
mock.onPost('/api/data/assets').reply((config) => {
  try {
    const { name, ip, dominio, url } = JSON.parse(config.data);

    const newAsset: AssetType = {
      id: (assets.length + 1).toString(), // Simple id generation
      name,
      ip,
      dominio,
      url,
    };

    assets.push(newAsset); // Add new asset to mock database

    return [200, { asset: newAsset }];
  } catch (error) {
    console.error('Error in creating asset:', error);
    return [500, { message: 'Failed to create asset' }];
  }
});

// PUT: Update an existing asset
mock.onPut(new RegExp('/api/data/assets/*')).reply((config) => {
  try {
    const assetId = config.url!.split('/').pop(); // Extract the asset ID from the URL
    const updatedData = JSON.parse(config.data); // New data for the asset

    const assetIndex = assets.findIndex((asset) => asset.id === assetId);
    if (assetIndex === -1) {
      return [404, { message: 'Asset not found' }];
    }

    assets[assetIndex] = { ...assets[assetIndex], ...updatedData }; // Update the asset

    return [200, { asset: assets[assetIndex] }];
  } catch (error) {
    console.error('Error updating asset:', error);
    return [500, { message: 'Failed to update asset' }];
  }
});

// DELETE: Delete an asset
mock.onDelete(new RegExp('/api/data/assets/*')).reply((config) => {
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
