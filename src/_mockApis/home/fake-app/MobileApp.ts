// home/MalwareAnalysis.ts

import mock from '../../mock'; // Ensure correct path to mock

interface MobileAppType {
  id: string|undefined;
  appName: string;
  downloadLink: string;
  releaseDate: string;
  version: string;
  source: string;
  digitalSignature: string;
  apkHash: string;
  details?: any;
  score: number;
}

interface Detail {
  language: string;
  downloads: string;
  permissions: string[];
}

let mobileApps: MobileAppType[] = [
  {
    id: "com.whatsapp.client",
    appName: "WhatsApp Messenger",
    downloadLink: "https://play.google.com/store/apps/details?id=com.whatsapp",
    releaseDate: "2024-10-20",
    version: "2.23.20.79",
    source: "Play Store",
    digitalSignature: "3082025D308201C6A0030201020214BCF5C9A4B20E89B8E7A7CC59B2A5C5E7F1A5C5E",
    apkHash: "53A7B52B8DFA34A9A3C7D8F1E8D1A5C7F2A3B2C4E5D7F6B7A9B5C6D8E9F7C3B5",
    score: 3,
    details:{
        language: "Español",
        downloads: "500 millones+",
        permissions: ["Acceso a contactos", "Ubicación", "Almacenamiento"],
      }
  },
  {
    id: "com.whatsapp.business",
    appName: "WhatsApp Business",
    downloadLink: "https://play.google.com/store/apps/details?id=com.whatsapp.w4b",
    releaseDate: "2024-10-14",
    version: "2.23.20.10",
    source: "Play Store",
    digitalSignature: "3082025D308201C6A0030201020214D1A3C5E6F4B3A2D8E7B6C4A3B5E8F7A1B2C9D5",
    apkHash: "83A7C92B8FFA12E3C7A6D8F9D1B5A4C3F8D2A3B4C7E9F6D3A5B8C9E7D1F2A3C5",
    score: 0,
    details: 
      {
        language: "Español",
        downloads: "200 millones+",
        permissions: ["Almacenamiento", "Acceso a contactos"]
      }
  },
  {
    id: "431946152",
    appName: "WhatsApp Messenger",
    downloadLink: "https://apps.apple.com/app/whatsapp-messenger/id431946152",
    releaseDate: "2024-10-15",
    version: "2.23.20.78",
    source: "App Store",
    digitalSignature: "3082025D308201C6A0030201020214F5A9B7D6E2A3C5B4A8F6D1B9C3E7A1D4F9B7",
    apkHash: "53A7B52B8DFA34A9A3C7D8F1E8D1A5C7F2A3B2C4E5D7F6B7A9B5C6D8E9F7C3B5",
    score: 5,
    details:{
        language: "Inglés",
        downloads: "800 millones+",
        permissions: ["Acceso a contactos", "Acceso a cámara", "Ubicación"],
      }
  },
  {
    id: "429392983",
    appName: "WhatsApp Chat",
    downloadLink: "https://apps.apple.com/app/whatsapp-chat/id429392983",
    releaseDate: "2024-10-11",
    version: "2.23.20.79",
    source: "App Store",
    digitalSignature: "3082025D308201C6A0030201020214B8D3A5F7E6B4A2C9A5F6B1A3D4F5A1B3E4",
    apkHash: "74A9B82B8DFA34A9A3C7D8F1E8D1A5C7F2A3B2C4E5D7F6B7A9B5C6D8E9F7C3B5",
    score: 8,
    details:{
        language: "Español",
        downloads: "150 millones+",
        permissions: ["Acceso a contactos", "Almacenamiento"],
      }
  },
  {
    id: "id_5",
    appName: "WhatsApp Web",
    downloadLink: "https://web.whatsapp.com/",
    releaseDate: "2024-10-18",
    version: "Latest",
    source: "ApkMirror",
    digitalSignature: "N/A",
    apkHash: "N/A",
    score: 9,
    details:{
        language: "Español",
        downloads: "N/A",
        permissions: ["Acceso a contactos"],
      }
  },
  {
    id: "id_6",
    appName: "WhatsApp Desktop",
    downloadLink: "https://www.whatsapp.com/download",
    releaseDate: "2024-10-19",
    version: "Latest",
    source: "Apptoide",
    digitalSignature: "N/A",
    apkHash: "N/A",
    score: 9,
    details:{
        language: "Español",
        downloads: "N/A",
        permissions: ["Acceso a contactos", "Notificaciones"],
      }
  },
  {
    id: "com.whatsapp.red",
    appName: "WhatsApp Red",
    downloadLink: "https://play.google.com/store/apps/details?id=com.whatsapp.red",
    releaseDate: "2024-10-12",
    version: "1.0",
    source: "Play Store",
    digitalSignature: "3082025D308201C6A0030201020214B8C5F9A4B20E89B8E7A7CC59B2A5C5E7F1A5C5E",
    apkHash: "B3A7C52B8DFA34A9A3C7D8F1E8D1A5C7F2A3B2C4E5D7F6B7A9B5C6D8E9F7C3B5",
    score: 7,
    details:{
        language: "Español",
        downloads: "100 millones+",
        permissions: ["Almacenamiento", "Ubicación"],
      }
  },
  {
    id: "com.whatsapp.business.red",
    appName: "WhatsApp Business Red",
    downloadLink: "https://play.google.com/store/apps/details?id=com.whatsapp.business.red",
    releaseDate: "2024-10-10",
    version: "1.0",
    source: "Play Store",
    digitalSignature: "3082025D308201C6A0030201020214F1B5C5E6F4B3A2D8E7B6C4A3B5E8F7A1B2C9D5",
    apkHash: "D3A7C92B8FFA12E3C7A6D8F9D1B5A4C3F8D2A3B4C7E9F6D3A5B8C9E7D1F2A3C5",
    score: 8,
    details:{
        language: "Español",
        downloads: "50 millones+",
        permissions: ["Acceso a contactos"],
      }
  },
  {
    id: "com.whatsapp.chat",
    appName: "WhatsApp Chat",
    downloadLink: "https://play.google.com/store/apps/details?id=com.whatsapp.chat",
    releaseDate: "2024-10-09",
    version: "1.0",
    source: "Play Store",
    digitalSignature: "3082025D308201C6A0030201020214B8D3A5F7E6B4A2C9A5F6B1A3D4F5A1B3E4",
    apkHash: "74A9B82B8DFA34A9A3C7D8F1E8D1A5C7F2A3B2C4E5D7F6B7A9B5C6D8E9F7C3B5",
    score: 8,
    details:{
        language: "Español",
        downloads: "100 millones+",
        permissions: ["Acceso a contactos"],
      }
  },
];

// GET: Fetch paginated mobileApps
mock.onGet(new RegExp('/api/data/mobile-apps')).reply((config) => {
  try {
    const urlParams = new URLSearchParams(config.url!.split('?')[1]);

    const limit = 5;
    const page = parseInt(urlParams.get('page') || '1', 10); // Default to page 1
    
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;

    const paginatedMobileApps = mobileApps.slice(startIndex, endIndex);
    const totalmobileApps = mobileApps.length;
    const totalPages = Math.ceil(totalmobileApps / limit);

    return [
      200,
      {
        mobileApps: paginatedMobileApps,
        currentPage: page,
        totalPages,
      },
    ];
  } catch (error) {
    console.error('Error in mobileApps API:', error);
    return [500, { message: 'Internal server error' }];
  }
});

// POST: Create a new malwareAnalysis
mock.onPost('/api/data/mobileApps').reply((config) => {
  try {
    const { appName, downloadLink, releaseDate, version, score, source, digitalSignature, apkHash, details } = JSON.parse(config.data);

      const newMobileApp: MobileAppType = {
          id: (mobileApps.length + 1).toString(), // Simple id generation
          appName,
          downloadLink,
          releaseDate,
          version,
          source,
          digitalSignature,
          apkHash,
          details,
          score,
      };

    mobileApps.push(newMobileApp); // Add new malwareAnalysis to mock database

    return [200, { malwareAnalysis: newMobileApp }];
  } catch (error) {
    console.error('Error in creating mobile app:', error);
    return [500, { message: 'Failed to create mobile app' }];
  }
});

// PUT: Update an existing malwareAnalysis
mock.onPut(new RegExp('/api/data/mobileApps/*')).reply((config) => {
  try {
    const mobileAppId = config.url!.split('/').pop(); // Extract the malwareAnalysis ID from the URL
    const updatedData = JSON.parse(config.data); // New data for the malwareAnalysis

    const mobileAppIndex = mobileApps.findIndex((malwareAnalysis) => malwareAnalysis.id === mobileAppId);
    if (mobileAppIndex === -1) {
      return [404, { message: 'Analysis malware not found' }];
    }

    mobileApps[mobileAppIndex] = { ...mobileApps[mobileAppIndex], ...updatedData }; // Update the malwareAnalysis

    return [200, { malwareAnalysis: mobileApps[mobileAppIndex] }];
  } catch (error) {
    console.error('Error updating mobile app:', error);
    return [500, { message: 'Failed to update mobile app' }];
  }
});

// DELETE: Delete an malwareAnalysis
mock.onDelete(new RegExp('/api/data/mobileApps/*')).reply((config) => {
  try {
    const mobileAppId = config.url!.split('/').pop(); // Extract the malwareAnalysis ID from the URL

    const mobileAppIndex = mobileApps.findIndex((malwareAnalysis) => malwareAnalysis.id === mobileAppId);
    if (mobileAppIndex === -1) {
      return [404, { message: 'Analysis malware not found' }];
    }

    mobileApps.splice(mobileAppIndex, 1); // Remove malwareAnalysis from the mock database

    return [200, { message: 'Analysis malware deleted successfully' }];
  } catch (error) {
    console.error('Error deleting mobile app:', error);
    return [500, { message: 'Failed to delete mobile app' }];
  }
});
