import mock from '../mock'; // Ensure correct path to mock

interface NewsLettersType {
  id: string|undefined;
  mimeType: string;
  size: number;
  name: string;
  modifiedTime: string;
}

let newsLetters: NewsLettersType[] = [
  {
      "mimeType": "application/pdf",
      "size": 703711,
      "id": "1bdc9tg6Q8VrikR98p92WFM5udZ00Di43",
      "name": "Boletin de Ciberseguridad 13 de junio 2024 (1).pdf",
      "modifiedTime": "2024-07-29T14:36:24"
  },
  {
      "mimeType": "application/pdf",
      "size": 701351,
      "id": "1j5YG2VsYcxkKvturjM8CffKzH_VG3Ssm",
      "name": "Boletin de Ciberseguridad 9 abril.pdf",
      "modifiedTime": "2024-07-24T16:24:31.292000"
  },
  {
      "mimeType": "application/pdf",
      "size": 908374,
      "id": "1V8ErszHDyBD-7x6Ften40k3Yg_U2aW4x",
      "name": "Boletin de Ciberseguridad 24 de abril 2024.pdf",
      "modifiedTime": "2024-07-24T15:45:53"
  },
  {
      "mimeType": "application/pdf",
      "size": 922433,
      "id": "17j3CETaLJZ6JS25lBlXvsitd7oqogtRZ",
      "name": "Boletin de Ciberseguridad 16 abril 2024.docx.pdf",
      "modifiedTime": "2024-07-24T15:45:51"
  },
  {
      "mimeType": "application/pdf",
      "size": 921134,
      "id": "1u3ZEHlTO7JaFfJGfqRsWaMMl-4k73W52",
      "name": "Boletin de Ciberseguridad 17 de mayo 2024.pdf",
      "modifiedTime": "2024-07-24T15:45:50"
  },
  {
      "mimeType": "application/pdf",
      "size": 976911,
      "id": "1cabNomsVKlBtfXJvwsba_1el17CIdiwT",
      "name": "Boletin de Ciberseguridad 09 de mayo 2024.pdf",
      "modifiedTime": "2024-07-24T15:45:49"
  },
  {
      "mimeType": "application/pdf",
      "size": 712865,
      "id": "17-1lcLcGpRGEMiSUWfP28snlaLdZwcjL",
      "name": "Boletin de Ciberseguridad 23 de mayo 2024.pdf",
      "modifiedTime": "2024-07-24T15:45:48"
  },
  {
      "mimeType": "application/pdf",
      "size": 703711,
      "id": "1RIaRqQZ1AbHmd4pDosUYDI6e9fv-DL0V",
      "name": "Boletin de Ciberseguridad 13 de junio 2024.pdf",
      "modifiedTime": "2024-07-24T15:45:47"
  }
];

// GET: Fetch paginated tecnology inventory
mock.onGet(new RegExp('/api/data/newsLetter')).reply((config) => {
  try {
    const urlParams = new URLSearchParams(config.url!.split('?')[1]);

    const limit = 5;
    const page = parseInt(urlParams.get('page') || '1', 10); // Default to page 1
    
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;

    const paginatedNewsLetter = newsLetters.slice(startIndex, endIndex);
    const totalNewsLetters = newsLetters.length;
    const totalPages = Math.ceil(totalNewsLetters / limit);
    return [
      200,
      {
        newsLetters: paginatedNewsLetter,
        currentPage: page,
        totalPages,
      },
    ];
  } catch (error) {
    console.error('Error in newsletters API:', error);
    return [500, { message: 'Internal server error' }];
  }
});
