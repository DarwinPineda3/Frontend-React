// home/MalwareAnalysis.ts

import mock from '../../mock'; // Ensure correct path to mock

interface ResultAppType {
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

let resultsApp: ResultAppType[] = [
  {
    id: "123867435",
    idApp: "co.com.ath.bbog.icbs",
    appName: "Banco de Bogotá App Negocios APK",
    downloadLink: "https://apk.support/download-app-es/co.com.ath.bbog.icbs",
    releaseDate: "2024-10-21",
    version: "1.15.3",
    source: "APK Support",
    digitalSignature: "3082025D308201C6A0030201020214C8F3A5D7E9B2C1A6F4D7E3B8A2C4D5E7",
    apkHash: "B2A6E8C5D9F3C4A1B5E7F1C8A3D2B9F6E4C1A5B8D7F3",
    score: 4,
    details: {
      language: "Español",
      downloads: "15.41 mil",
      permissions: [
        "Dangerous - Allows application to take pictures and videos with the camera. This allows the application to collect images that the camera is seeing at any time",
        "Dangerous - Allows the application to access the phone features of the device. An application with this permission can determine the phone number and serial number of this phone, whether a call is active, the number that call is connected to and so on.",
        "Normal - Allows an application to view the status of all networks.",
        "Normal - Allows a regular application to use Service.startForeground.",
        "Normal - Allows an application to create network sockets.",
        "Normal - Allows the application to control the vibrator.",
        "Normal - Allows an application to prevent the phone from going to sleep."
      ],
      risks: ["High - External data in SQL queries", "high - A5 - Configuración de seguridad incorrecta", "medium - JS enabled in a WebView"],
      OWASP: ["External data in SQL queries", "A5 - Configuración de seguridad incorrecta", "JS enabled in a WebView", "Usage of unencrypted HTTP protocol", "Hardcoded data", "Missing tapjacking protection", "Usage of implicit intent"],
      externalCommunications: ["No se detectaron comunicaciones no autorizadas"]
    }
  },
  {
    id: "123867435456",
    idApp: "com.bancodebogota.appmirror",
    appName: "Banco de Bogotá",
    downloadLink: "https://appmirror.com/bancodebogota",
    releaseDate: "2024-06-30",
    version: "3.2.1",
    source: "App Mirror",
    digitalSignature: "3082025D308201C6A0030201020214D7A9B6C4E5A1B3F8C2D1E7A3B5F9C6D8",
    apkHash: "A3B5F8C4D7A2C9E5B3D6F1A7E8C1D4B9F2C3E9A6D8",
    score: 2,
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
    id: "12312344867435",
    idApp: "com.bancodebogota.apklive",
    appName: "Banco de Bogotá",
    downloadLink: "https://apklive.com/bancodebogota",
    releaseDate: "2024-08-15",
    version: "3.4.7",
    source: "APK Live",
    digitalSignature: "3082025D308201C6A0030201020214A7B4C6D5F8A3B9E5D4C1F2B7A6E8F9C1",
    apkHash: "C1D8B5A4F7C2A9E3F5D1C4B9E7A6B3D8F1C2E9A4B5D3F6A7",
    score: 1,
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
    id: "123867123435",
    idApp: "com.bancodebogota.bancamovil",
    appName: "Banco de Bogotá",
    downloadLink: "https://play.google.com/store/apps/details?id=com.bancodebogota.bancamovil&hl=es_419",
    releaseDate: "2024-10-27",
    version: "10.20",
    source: "Play Store",
    digitalSignature: "3082025D308201C6A0030201020214A9B7C3D5F6E8B2A5D1C9F3A8B7E6C5D1F0A3",
    apkHash: "91A6B4D8F3C7A9E5B2C4E1F5D8A3B7C9F1E4D6A2C5B8F3D1A9C7E8F2B4D5A6E1",
    score: 0,
    details: {
      language: "Español",
      downloads: "5 millones+",
      permissions: ["The mobile application can access external storage", "The mobile application can answer and place calls, or access/modify phone state"],
      risks: ["High - External data in SQL queries", "high - A5 - Configuración de seguridad incorrecta", "medium - JS enabled in a WebView"],
      OWASP: ["External data in SQL queries", "A5 - Configuración de seguridad incorrecta", "JS enabled in a WebView", "Usage of unencrypted HTTP protocol", "Hardcoded data", "Missing tapjacking protection", "Usage of implicit intent"],
      externalCommunications: ["No se detectaron comunicaciones no autorizadas"]
    }
  },
  {
    id: "12386743235",
    idApp: "co.com.ath.bbog.icbs",
    appName: "Banco de Bogota App Negocios",
    downloadLink: "https://play.google.com/store/apps/details?id=com.whatsapp",
    releaseDate: "2024-10-20",
    version: "1.15.3",
    source: "Play Store",
    digitalSignature: "3082025D308201C6A0030201020214BCF5C9A4B20E89B8E7A7CC59B2A5C5E7F1A5C5E",
    apkHash: "53A7B52B8DFA34A9A3C7D8F1E8D1A5C7F2A3B2C4E5D7F6B7A9B5C6D8E9F7C3B5",
    score: 0,
    details: {
      language: "Español",
      downloads: "500 millones+",
      permissions: [
        "Dangerous - Allows application to take pictures and videos with the camera. This allows the application to collect images that the camera is seeing at any time",
        "Dangerous - Allows the application to access the phone features of the device. An application with this permission can determine the phone number and serial number of this phone, whether a call is active, the number that call is connected to and so on.",
        "Normal - Allows an application to view the status of all networks.",
        "Normal - Allows a regular application to use Service.startForeground.",
        "Normal - Allows an application to create network sockets.",
        "Normal - Allows the application to control the vibrator.",
        "Normal - Allows an application to prevent the phone from going to sleep."
      ],
      risks: ["Posibles fugas de datos", "Uso intensivo de recursos"],
      OWASP: [
        "High - External data in SQL queries",
        "Medium -Hardcoded Sensitive Data",
        "Medium - JS enabled in a WebView",
        "Use of Hidden UI elements"
      ],
      externalCommunications: ["Uso de conexiones encriptadas", "Detección de IPs externas"]
    },

  },
  {
    id: "123812367435",
    idApp: "com.bancodebogota.app",
    appName: "Banco de Bogotá",
    downloadLink: "https://play.google.com/store/apps/details?id=com.bancodebogota.app",
    releaseDate: "2024-09-30",
    version: "4.5.2",
    source: "Play Store",
    digitalSignature: "3082025D308201C6A0030201020214A9B7C3D5F6E8B2A5D1C9F3A8B7E6C5D1F0A3",
    apkHash: "91A6B4D8F3C7A9E5B2C4E1F5D8A3B7C9F1E4D6A2C5B8F3D1A9C7E8F2B4D5A6E1",
    score: 0,
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
    id: "1238674364565",
    idApp: "com.bancodebogota.mobogenie",
    appName: "Banco de Bogotá",
    downloadLink: "https://mobogenie.com/bancodebogota",
    releaseDate: "2024-05-14",
    version: "3.1.4",
    source: "Mobogenie",
    digitalSignature: "3082025D308201C6A0030201020214B6D9F2C5E3A8B4F7C1A3D2E9A5F1B8C7",
    apkHash: "F1A9C7E3B5D8C1A4F2D6B9E5A7C3D4B1F8A3C9",
    score: 0,
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
    id: "12386743422235",
    idApp: "com.bancodebogota.appsapk",
    appName: "Banco de Bogotá App Negocios APK",
    downloadLink: "https://apksuport.com/bancodebogota",
    releaseDate: "2024-04-10",
    version: "3.0.2",
    source: "APK Support",
    digitalSignature: "3082025D308201C6A0030201020214C9B2A6E4F8D3B1C7A5F2D9C3E7A1F6",
    apkHash: "A7C1F9D4B3A2E8F5D6C7B1F3C9D2A8E4B5F7",
    score: 0,
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

// GET: Fetch result mobile app by id
mock.onGet(new RegExp('/api/data/mobile-apps/result-detail/*')).reply((config) => {
  try {
    const resultAppId = config.url!.split('/').pop();

    // Buscar el objeto que coincida con el id
    const resultApp = resultsApp.find(app => app.id === resultAppId);

    if (!resultApp) {
      return [404, { message: 'MobileApp not found' }];
    }

    return [
      200,
      {
        resultApp: resultApp
      },
    ];
  } catch (error) {
    console.error('Error in mobileApps API:', error);
    return [500, { message: 'Internal server error' }];
  }
});