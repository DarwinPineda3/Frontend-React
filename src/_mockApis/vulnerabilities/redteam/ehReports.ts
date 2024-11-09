// home/MalwareAnalysis.ts

import mock from '../../mock'; // Ensure correct path to mock

export interface EHSummary {
  // charts
  risk_exposure_level?:number;
  matriz_low_low?: number;
  matriz_low_medium?: number;
  matriz_low_high?: number;
  matriz_medium_low?: number;
  matriz_medium_medium?: number;
  matriz_medium_high?: number;
  matriz_high_low?: number;
  matriz_high_medium?: number;
  matriz_high_high?: number;
  // Baseline info
  comments?: string;
  description_tests?: string;
  first_conclusion?: string;
  second_conclusion?: string;
  third_conclusion?: string;
  fourth_conclusion?: string;
  fifth_conclusion?: string;
}

interface EHReportType {
  id: string | undefined;
  name?: string;
  start_date_report?: string;
  end_date_report?: string;
  objectives?: string;
  created_date?: Date;
  ehsummaries?: EHSummary;
}


const ehReports: EHReportType[] = [
  {
    id: "1",
    name: "Informe Técnico EH - Octapus - Diciembre 2024",
    start_date_report: "01 diciembre 2024",
    end_date_report: "02 diciembre 2024",
    objectives: "1",
    created_date: new Date(),
    ehsummaries: {
      risk_exposure_level: 5,
      matriz_low_low: 8,
      matriz_low_medium: 4,
      matriz_low_high: 3,
      matriz_medium_low: 5,
      matriz_medium_medium: 7,
      matriz_medium_high: 1,
      matriz_high_low: 2,
      matriz_high_medium: 3,
      matriz_high_high: 0,
      comments: "Low risks with established controls.",
      description_tests: "Review of core security configurations.",
      first_conclusion: "Security standards are well-maintained.",
      second_conclusion: "No critical vulnerabilities found.",
      third_conclusion: "Regular audits are effective.",
      fourth_conclusion: "Access control is adequate.",
      fifth_conclusion: "Periodic monitoring is advised."
    }
  },
  {
    id: "2",
    name: "Informe Técnico EH - Octapus - Noviembre 2024",
    start_date_report: "01 noviembre 2024",
    end_date_report: "02 noviembre 2024",
    objectives: "2",
    created_date: new Date(),
    ehsummaries: {
      risk_exposure_level: 5,
      matriz_low_low: 8,
      matriz_low_medium: 4,
      matriz_low_high: 3,
      matriz_medium_low: 5,
      matriz_medium_medium: 7,
      matriz_medium_high: 1,
      matriz_high_low: 2,
      matriz_high_medium: 3,
      matriz_high_high: 0,
      comments: "Low risks with established controls.",
      description_tests: "Review of core security configurations.",
      first_conclusion: "Security standards are well-maintained.",
      second_conclusion: "No critical vulnerabilities found.",
      third_conclusion: "Regular audits are effective.",
      fourth_conclusion: "Access control is adequate.",
      fifth_conclusion: "Periodic monitoring is advised."
    }
  },
  {
    id: "3",
    name: "Informe Técnico EH - Octapus - Octubre 2024",
    start_date_report: "01 octubre 2024",
    end_date_report: "02 octubre 2024",
    objectives: "3",
    created_date: new Date(),
    ehsummaries: {
      risk_exposure_level: 5,
      matriz_low_low: 8,
      matriz_low_medium: 4,
      matriz_low_high: 3,
      matriz_medium_low: 5,
      matriz_medium_medium: 7,
      matriz_medium_high: 1,
      matriz_high_low: 2,
      matriz_high_medium: 3,
      matriz_high_high: 0,
      comments: "Low risks with established controls.",
      description_tests: "Review of core security configurations.",
      first_conclusion: "Security standards are well-maintained.",
      second_conclusion: "No critical vulnerabilities found.",
      third_conclusion: "Regular audits are effective.",
      fourth_conclusion: "Access control is adequate.",
      fifth_conclusion: "Periodic monitoring is advised."
    }
  },
  {
    id: "4",
    name: "Informe Técnico EH - Octapus - Septiembre 2024",
    start_date_report: "01 septiembre 2024",
    end_date_report: "02 septiembre 2024",
    objectives: "1",
    created_date: new Date(),
    ehsummaries: {
      risk_exposure_level: 5,
      matriz_low_low: 8,
      matriz_low_medium: 4,
      matriz_low_high: 3,
      matriz_medium_low: 5,
      matriz_medium_medium: 7,
      matriz_medium_high: 1,
      matriz_high_low: 2,
      matriz_high_medium: 3,
      matriz_high_high: 0,
      comments: "Low risks with established controls.",
      description_tests: "Review of core security configurations.",
      first_conclusion: "Security standards are well-maintained.",
      second_conclusion: "No critical vulnerabilities found.",
      third_conclusion: "Regular audits are effective.",
      fourth_conclusion: "Access control is adequate.",
      fifth_conclusion: "Periodic monitoring is advised."
    }
  },
  {
    id: "5",
    name: "Informe Técnico EH - Octapus - Agosto 2024",
    start_date_report: "01 agosto 2024",
    end_date_report: "02 agosto 2024",
    objectives: "2",
    created_date: new Date(),
    ehsummaries: {
      risk_exposure_level: 5,
      matriz_low_low: 8,
      matriz_low_medium: 4,
      matriz_low_high: 3,
      matriz_medium_low: 5,
      matriz_medium_medium: 7,
      matriz_medium_high: 1,
      matriz_high_low: 2,
      matriz_high_medium: 3,
      matriz_high_high: 0,
      comments: "Low risks with established controls.",
      description_tests: "Review of core security configurations.",
      first_conclusion: "Security standards are well-maintained.",
      second_conclusion: "No critical vulnerabilities found.",
      third_conclusion: "Regular audits are effective.",
      fourth_conclusion: "Access control is adequate.",
      fifth_conclusion: "Periodic monitoring is advised."
    }
  },
  {
    id: "6",
    name: "Informe Técnico EH - Octapus - Julio 2024",
    start_date_report: "01 julio 2024",
    end_date_report: "02 julio 2024",
    objectives: "3",
    created_date: new Date(),
    ehsummaries: {
      risk_exposure_level: 5,
      matriz_low_low: 8,
      matriz_low_medium: 4,
      matriz_low_high: 3,
      matriz_medium_low: 5,
      matriz_medium_medium: 7,
      matriz_medium_high: 1,
      matriz_high_low: 2,
      matriz_high_medium: 3,
      matriz_high_high: 0,
      comments: "Low risks with established controls.",
      description_tests: "Review of core security configurations.",
      first_conclusion: "Security standards are well-maintained.",
      second_conclusion: "No critical vulnerabilities found.",
      third_conclusion: "Regular audits are effective.",
      fourth_conclusion: "Access control is adequate.",
      fifth_conclusion: "Periodic monitoring is advised."
    }
  },
  {
    id: "7",
    name: "Informe Técnico EH - Octapus - Junio 2024",
    start_date_report: "01 junio 2024",
    end_date_report: "02 junio 2024",
    objectives: "1",
    created_date: new Date(),
    ehsummaries: {
      risk_exposure_level: 5,
      matriz_low_low: 8,
      matriz_low_medium: 4,
      matriz_low_high: 3,
      matriz_medium_low: 5,
      matriz_medium_medium: 7,
      matriz_medium_high: 1,
      matriz_high_low: 2,
      matriz_high_medium: 3,
      matriz_high_high: 0,
      comments: "Low risks with established controls.",
      description_tests: "Review of core security configurations.",
      first_conclusion: "Security standards are well-maintained.",
      second_conclusion: "No critical vulnerabilities found.",
      third_conclusion: "Regular audits are effective.",
      fourth_conclusion: "Access control is adequate.",
      fifth_conclusion: "Periodic monitoring is advised."
    }
  },
  {
    id: "8",
    name: "Informe Técnico EH - Octapus - Mayo 2024",
    start_date_report: "01 mayo 2024",
    end_date_report: "02 mayo 2024",
    objectives: "2",
    created_date: new Date(),
    ehsummaries: {
      risk_exposure_level: 5,
      matriz_low_low: 8,
      matriz_low_medium: 4,
      matriz_low_high: 3,
      matriz_medium_low: 5,
      matriz_medium_medium: 7,
      matriz_medium_high: 1,
      matriz_high_low: 2,
      matriz_high_medium: 3,
      matriz_high_high: 0,
      comments: "Low risks with established controls.",
      description_tests: "Review of core security configurations.",
      first_conclusion: "Security standards are well-maintained.",
      second_conclusion: "No critical vulnerabilities found.",
      third_conclusion: "Regular audits are effective.",
      fourth_conclusion: "Access control is adequate.",
      fifth_conclusion: "Periodic monitoring is advised."
    }
  },
  {
    id: "9",
    name: "Informe Técnico EH - Octapus - Abril 2024",
    start_date_report: "01 abril 2024",
    end_date_report: "02 abril 2024",
    objectives: "3",
    created_date: new Date(),
    ehsummaries: {
      risk_exposure_level: 5,
      matriz_low_low: 8,
      matriz_low_medium: 4,
      matriz_low_high: 3,
      matriz_medium_low: 5,
      matriz_medium_medium: 7,
      matriz_medium_high: 1,
      matriz_high_low: 2,
      matriz_high_medium: 3,
      matriz_high_high: 0,
      comments: "Low risks with established controls.",
      description_tests: "Review of core security configurations.",
      first_conclusion: "Security standards are well-maintained.",
      second_conclusion: "No critical vulnerabilities found.",
      third_conclusion: "Regular audits are effective.",
      fourth_conclusion: "Access control is adequate.",
      fifth_conclusion: "Periodic monitoring is advised."
    }
  },
  {
    id: "10",
    name: "Informe Técnico EH - Octapus - Marzo 2024",
    start_date_report: "01 marzo 2024",
    end_date_report: "02 marzo 2024",
    objectives: "1",
    created_date: new Date(),
    ehsummaries: {
      risk_exposure_level: 5,
      matriz_low_low: 8,
      matriz_low_medium: 4,
      matriz_low_high: 3,
      matriz_medium_low: 5,
      matriz_medium_medium: 7,
      matriz_medium_high: 1,
      matriz_high_low: 2,
      matriz_high_medium: 3,
      matriz_high_high: 0,
      comments: "Low risks with established controls.",
      description_tests: "Review of core security configurations.",
      first_conclusion: "Security standards are well-maintained.",
      second_conclusion: "No critical vulnerabilities found.",
      third_conclusion: "Regular audits are effective.",
      fourth_conclusion: "Access control is adequate.",
      fifth_conclusion: "Periodic monitoring is advised."
    }
  }
];

// GET: Fetch result mobile app by id
mock.onGet(new RegExp('/api/data/eh-reports/detail/*')).reply((config) => {
  try {
    const resultAppId = config.url!.split('/').pop();

    // Buscar el objeto que coincida con el id
    const ehReport = ehReports.find(ehReport => ehReport.id === resultAppId);

    if (!ehReport) {
      return [404, { message: 'ehReport not found' }];
    }

    return [
      200,
      {
        ehReport: ehReport
      },
    ];
  } catch (error) {
    console.error('Error in mobileApps API:', error);
    return [500, { message: 'Internal server error' }];
  }
});

// GET: Fetch paginated ehReports
mock.onGet(new RegExp('/api/data/eh-reports')).reply((config) => {
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
mock.onPost('/api/data/eh-reports').reply((config) => {
  try {
    const { start_date_report, end_date_report, objectives, created_date, ehsummaries } = JSON.parse(config.data);

    const newItem: EHReportType = {
      id: (ehReports.length + 1).toString(), // Simple id generation
      start_date_report, end_date_report, objectives, created_date, ehsummaries
    };

    ehReports.push(newItem);

    return [200, { ehReport: newItem }];
  } catch (error) {
    console.error('Error in creating Ethical Hacking Report:', error);
    return [500, { message: 'Failed to create Ethical Hacking Report' }];
  }
});

// PUT: Update an existing ehReport
mock.onPut(new RegExp('/api/data/eh-reports/*')).reply((config) => {
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
mock.onDelete(new RegExp('/api/data/eh-reports/*')).reply((config) => {
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
