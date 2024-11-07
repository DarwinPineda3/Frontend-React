// home/MalwareAnalysis.ts

import mock from '../../mock'; // Ensure correct path to mock

interface EHReportType {
  id: string | undefined;
  name?: string;
  start_date_report?: string;
  end_date_report?: string;
  objectives?: string;
  created_date?: Date;
}


const ehReports: EHReportType[] = [
  {
    id: "1",
    name: "Informe Técnico EH - Octapus - Diciembre 2024",
    start_date_report: "01 diciembre 2024",
    end_date_report: "02 diciembre 2024",
    objectives: "1",
    created_date: new Date(),
  },
  {
    id: "2",
    name: "Informe Técnico EH - Octapus - Noviembre 2024",
    start_date_report: "01 noviembre 2024",
    end_date_report: "02 noviembre 2024",
    objectives: "2",
    created_date: new Date(),
  },
  {
    id: "3",
    name: "Informe Técnico EH - Octapus - Octubre 2024",
    start_date_report: "01 octubre 2024",
    end_date_report: "02 octubre 2024",
    objectives: "3",
    created_date: new Date(),
  },
  {
    id: "4",
    name: "Informe Técnico EH - Octapus - Septiembre 2024",
    start_date_report: "01 septiembre 2024",
    end_date_report: "02 septiembre 2024",
    objectives: "1",
    created_date: new Date(),
  },
  {
    id: "5",
    name: "Informe Técnico EH - Octapus - Agosto 2024",
    start_date_report: "01 agosto 2024",
    end_date_report: "02 agosto 2024",
    objectives: "2",
    created_date: new Date(),
  },
  {
    id: "6",
    name: "Informe Técnico EH - Octapus - Julio 2024",
    start_date_report: "01 julio 2024",
    end_date_report: "02 julio 2024",
    objectives: "3",
    created_date: new Date(),
  },
  {
    id: "7",
    name: "Informe Técnico EH - Octapus - Junio 2024",
    start_date_report: "01 junio 2024",
    end_date_report: "02 junio 2024",
    objectives: "1",
    created_date: new Date(),
  },
  {
    id: "8",
    name: "Informe Técnico EH - Octapus - Mayo 2024",
    start_date_report: "01 mayo 2024",
    end_date_report: "02 mayo 2024",
    objectives: "2",
    created_date: new Date(),
  },
  {
    id: "9",
    name: "Informe Técnico EH - Octapus - Abril 2024",
    start_date_report: "01 abril 2024",
    end_date_report: "02 abril 2024",
    objectives: "3",
    created_date: new Date(),
  },
  {
    id: "10",
    name: "Informe Técnico EH - Octapus - Marzo 2024",
    start_date_report: "01 marzo 2024",
    end_date_report: "02 marzo 2024",
    objectives: "1",
    created_date: new Date(),
  }
];

// GET: Fetch paginated ehReports
mock.onGet(new RegExp('/api/data/ehReports')).reply((config) => {
  try {
    const urlParams = new URLSearchParams(config.url!.split('?')[1]);

    const limit = 25;
    const page = parseInt(urlParams.get('page') || '1', 10); // Default to page 1

    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;

    const paginated = ehReports.slice(startIndex, endIndex);
    const total = ehReports.length;
    const totalPages = Math.ceil(total / limit);

    return [
      200,
      {
        ehReports: paginated,
        currentPage: page,
        totalPages,
      },
    ];
  } catch (error) {
    console.error('Error in ehReports API:', error);
    return [500, { message: 'Internal server error' }];
  }
});

// POST: Create a new ehReport
mock.onPost('/api/data/ehReports').reply((config) => {
  try {
    const { start_date_report, end_date_report, objectives, created_date } = JSON.parse(config.data);

    const newItem: EHReportType = {
      id: (ehReports.length + 1).toString(), // Simple id generation
      start_date_report, end_date_report, objectives, created_date
    };

    ehReports.push(newItem);

    return [200, { ehReport: newItem }];
  } catch (error) {
    console.error('Error in creating Ethical Hacking Report:', error);
    return [500, { message: 'Failed to create Ethical Hacking Report' }];
  }
});

// PUT: Update an existing ehReport
mock.onPut(new RegExp('/api/data/ehReports/*')).reply((config) => {
  try {
    const id = config.url!.split('/').pop(); // Extract the ehReport ID from the URL
    const updatedData = JSON.parse(config.data); // New data for the ehReport

    const index = ehReports.findIndex((ehReport) => ehReport.id === id);
    if (index === -1) {
      return [404, { message: 'Ethical Hacking Report not found' }];
    }

    ehReports[index] = { ...ehReports[index], ...updatedData }; // Update the ehReport

    return [200, { ehReport: ehReports[index] }];
  } catch (error) {
    console.error('Error updating Ethical Hacking Report:', error);
    return [500, { message: 'Failed to update Ethical Hacking Report' }];
  }
});

// DELETE: Delete an ehReport
mock.onDelete(new RegExp('/api/data/ehReports/*')).reply((config) => {
  try {
    const id = config.url!.split('/').pop(); // Extract the ehReport ID from the URL

    const index = ehReports.findIndex((ehReport) => ehReport.id === id);
    if (index === -1) {
      return [404, { message: 'Ethical Hacking Report not found' }];
    }

    ehReports.splice(index, 1); // Remove ehReport from the mock database

    return [200, { message: 'Ethical Hacking Report deleted successfully' }];
  } catch (error) {
    console.error('Error deleting Ethical Hacking Report:', error);
    return [500, { message: 'Failed to delete Ethical Hacking Report' }];
  }
});
