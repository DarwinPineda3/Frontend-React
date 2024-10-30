// home/MalwareAnalysis.ts

import mock from '../../mock'; // Ensure correct path to mock

interface MobileAppType {
  id: string | undefined;
  idApp: string;
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
    id: "123867435",
    idApp: "com.bancodebogota.app",
    appName: "Banco de Bogotá",
    downloadLink: "https://play.google.com/store/apps/details?id=com.bancodebogota.app",
    releaseDate: "2024-09-30",
    version: "4.5.2",
    source: "Play Store",
    digitalSignature: "3082025D308201C6A0030201020214A9B7C3D5F6E8B2A5D1C9F3A8B7E6C5D1F0A3",
    apkHash: "91A6B4D8F3C7A9E5B2C4E1F5D8A3B7C9F1E4D6A2C5B8F3D1A9C7E8F2B4D5A6E1",
    score: 6,
    details: {
      language: "Español",
      downloads: "10 millones+",
      permissions: ["Acceso a contactos", "Ubicación", "Acceso a cámara"],
      risks: ["Exposición de datos personales", "Vulnerabilidad en la autenticación"],
      OWASP: ["A3 - Exposición de datos sensibles", "A5 - Configuración de seguridad incorrecta"],
      externalCommunications: ["Cifrado HTTPS", "No se detectaron comunicaciones no autorizadas"]
    }
  },
  {
    id: "123867435",
    idApp: "com.whatsapp.client",
    appName: "BdB Colombia",
    downloadLink: "https://play.google.com/store/apps/details?id=com.whatsapp",
    releaseDate: "2024-10-20",
    version: "2.23.20.79",
    source: "Play Store",
    digitalSignature: "3082025D308201C6A0030201020214BCF5C9A4B20E89B8E7A7CC59B2A5C5E7F1A5C5E",
    apkHash: "53A7B52B8DFA34A9A3C7D8F1E8D1A5C7F2A3B2C4E5D7F6B7A9B5C6D8E9F7C3B5",
    score: 3,
    details: {
      language: "Español",
      downloads: "500 millones+",
      permissions: ["Acceso a contactos", "Ubicación", "Almacenamiento"],
      risks: ["Posibles fugas de datos", "Uso intensivo de recursos"],
      OWASP: ["A2 - Control de acceso roto", "A4 - Autenticación rota"],
      externalCommunications: ["Uso de conexiones encriptadas", "Detección de IPs externas"]
    },

  },
  {
    id: "123867435",
    idApp: "com.bancodebogota.app",
    appName: "Banco de Bogotá",
    downloadLink: "https://play.google.com/store/apps/details?id=com.bancodebogota.app",
    releaseDate: "2024-09-30",
    version: "4.5.2",
    source: "Play Store",
    digitalSignature: "3082025D308201C6A0030201020214A9B7C3D5F6E8B2A5D1C9F3A8B7E6C5D1F0A3",
    apkHash: "91A6B4D8F3C7A9E5B2C4E1F5D8A3B7C9F1E4D6A2C5B8F3D1A9C7E8F2B4D5A6E1",
    score: 6,
    details: {
      language: "Español",
      downloads: "10 millones+",
      permissions: ["Acceso a contactos", "Ubicación", "Acceso a cámara"],
      risks: ["Exposición de datos personales", "Vulnerabilidad en la autenticación"],
      OWASP: ["A3 - Exposición de datos sensibles", "A5 - Configuración de seguridad incorrecta"],
      externalCommunications: ["Cifrado HTTPS", "No se detectaron comunicaciones no autorizadas"]
    }
  },
  {
    id: "123867435",
    idApp: "com.bancodebogota.apklive",
    appName: "Banco de Bogotá",
    downloadLink: "https://apklive.com/bancodebogota",
    releaseDate: "2024-08-15",
    version: "3.4.7",
    source: "APK Live",
    digitalSignature: "3082025D308201C6A0030201020214A7B4C6D5F8A3B9E5D4C1F2B7A6E8F9C1",
    apkHash: "C1D8B5A4F7C2A9E3F5D1C4B9E7A6B3D8F1C2E9A4B5D3F6A7",
    score: 5,
    details: {
      language: "Español",
      downloads: "2 millones+",
      permissions: ["Acceso a contactos", "Ubicación"],
      risks: ["Almacenamiento inseguro de datos", "Exposición de ubicaciones de usuarios"],
      OWASP: ["A7 - Almacenamiento de datos inseguro", "A4 - Configuración insegura"],
      externalCommunications: ["Comunicación no cifrada detectada", "Análisis de tráfico no autorizado"]
    }
  },
  {
    id: "123867435",
    idApp: "com.bancodebogota.apkpure",
    appName: "Banco de Bogotá",
    downloadLink: "https://apkpure.com/bancodebogota",
    releaseDate: "2024-07-22",
    version: "3.5.3",
    source: "APK Pure",
    digitalSignature: "3082025D308201C6A0030201020214C8F3A5D7E9B2C1A6F4D7E3B8A2C4D5E7",
    apkHash: "B2A6E8C5D9F3C4A1B5E7F1C8A3D2B9F6E4C1A5B8D7F3",
    score: 6,
    details: {
      language: "Español",
      downloads: "1 millón+",
      permissions: ["Almacenamiento", "Ubicación"],
      risks: ["Intercepción de datos no cifrados", "Acceso no autorizado a archivos de usuario"],
      OWASP: ["A3 - Exposición de datos sensibles", "A5 - Configuración incorrecta de permisos"],
      externalCommunications: ["Uso de conexiones HTTP", "Detección de solicitudes no cifradas"]
    }
  },
  {
    id: "123867435",
    idApp: "com.bancodebogota.appmirror",
    appName: "Banco de Bogotá",
    downloadLink: "https://appmirror.com/bancodebogota",
    releaseDate: "2024-06-30",
    version: "3.2.1",
    source: "App Mirror",
    digitalSignature: "3082025D308201C6A0030201020214D7A9B6C4E5A1B3F8C2D1E7A3B5F9C6D8",
    apkHash: "A3B5F8C4D7A2C9E5B3D6F1A7E8C1D4B9F2C3E9A6D8",
    score: 4,
    details: {
      language: "Español",
      downloads: "500,000+",
      permissions: ["Cámara", "Ubicación", "Almacenamiento"],
      risks: ["Exposición de datos personales", "Acceso no controlado a la cámara"],
      OWASP: ["A2 - Autenticación inadecuada", "A9 - Uso de APIs inseguras"],
      externalCommunications: ["Tráfico sin cifrar detectado", "Uso de servidores externos no autorizados"]
    }
  },
  {
    id: "123867435",
    idApp: "com.bancodebogota.mobogenie",
    appName: "Banco de Bogotá",
    downloadLink: "https://mobogenie.com/bancodebogota",
    releaseDate: "2024-05-14",
    version: "3.1.4",
    source: "Mobogenie",
    digitalSignature: "3082025D308201C6A0030201020214B6D9F2C5E3A8B4F7C1A3D2E9A5F1B8C7",
    apkHash: "F1A9C7E3B5D8C1A4F2D6B9E5A7C3D4B1F8A3C9",
    score: 3,
    details: {
      language: "Español",
      downloads: "200,000+",
      permissions: ["Almacenamiento", "Ubicación", "Acceso a contactos"],
      risks: ["Intercambio de datos no cifrados", "Fuga de información confidencial"],
      OWASP: ["A6 - Mala configuración de seguridad", "A8 - Vulnerabilidades en interfaces no seguras"],
      externalCommunications: ["Comunicación no cifrada", "Detección de actividades de red sospechosas"]
    }
  },
  {
    id: "123867435",
    idApp: "com.bancodebogota.appsapk",
    appName: "Banco de Bogotá",
    downloadLink: "https://appsapk.com/bancodebogota",
    releaseDate: "2024-04-10",
    version: "3.0.2",
    source: "Apps APK",
    digitalSignature: "3082025D308201C6A0030201020214C9B2A6E4F8D3B1C7A5F2D9C3E7A1F6",
    apkHash: "A7C1F9D4B3A2E8F5D6C7B1F3C9D2A8E4B5F7",
    score: 4,
    details: {
      language: "Español",
      downloads: "100,000+",
      permissions: ["Almacenamiento", "Cámara"],
      risks: ["Fuga de datos sensibles", "Uso de APIs inseguras"],
      OWASP: ["A1 - Inyección de código", "A10 - Acceso no controlado a APIs"],
      externalCommunications: ["Detección de tráfico sin cifrar", "Comunicaciones con servidores desconocidos"]
    }
  }
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

// POST: Create a new mobileApp
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

    mobileApps.push(newMobileApp); // Add new mobileApp to mock database

    return [200, { mobileApp: newMobileApp }];
  } catch (error) {
    console.error('Error in creating mobile app:', error);
    return [500, { message: 'Failed to create mobile app' }];
  }
});

// PUT: Update an existing mobileApp
mock.onPut(new RegExp('/api/data/mobileApps/*')).reply((config) => {
  try {
    const mobileAppId = config.url!.split('/').pop(); // Extract the mobileApp ID from the URL
    const updatedData = JSON.parse(config.data); // New data for the mobileApp

    const mobileAppIndex = mobileApps.findIndex((mobileApp) => mobileApp.id === mobileAppId);
    if (mobileAppIndex === -1) {
      return [404, { message: 'Mobile App not found' }];
    }

    mobileApps[mobileAppIndex] = { ...mobileApps[mobileAppIndex], ...updatedData }; // Update the mobileApp

    return [200, { mobileApp: mobileApps[mobileAppIndex] }];
  } catch (error) {
    console.error('Error updating mobile app:', error);
    return [500, { message: 'Failed to update mobile app' }];
  }
});

// DELETE: Delete an mobileApp
mock.onDelete(new RegExp('/api/data/mobileApps/*')).reply((config) => {
  try {
    const mobileAppId = config.url!.split('/').pop(); // Extract the mobileApp ID from the URL

    const mobileAppIndex = mobileApps.findIndex((mobileApp) => mobileApp.id === mobileAppId);
    if (mobileAppIndex === -1) {
      return [404, { message: 'Mobile App not found' }];
    }

    mobileApps.splice(mobileAppIndex, 1); // Remove mobileApp from the mock database

    return [200, { message: 'Mobile App deleted successfully' }];
  } catch (error) {
    console.error('Error deleting mobile app:', error);
    return [500, { message: 'Failed to delete mobile app' }];
  }
});
