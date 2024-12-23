import mock from '../mock';

const fakeRequest = (time: Date | any) => {
  return new Promise((res) => setTimeout(res, time));
};

mock.onGet('/api/dashboard/topcards').reply(
  async () => {
    await fakeRequest(1000);
    return [200, [
      { severity: 'critical', value: '96' },
      { severity: 'high', value: '350' },
      { severity: 'medium', value: '356' },
      { severity: 'low', value: '696' },
      { severity: 'total', value: '80' },
    ]];
  }
);

mock.onGet('/api/dashboard/vulnerabilities').reply(
  async () => {
    await fakeRequest(2500);
    return [200, [
      {
        id: '1',
        type: 'Critical',
        hosts: 3,
        severity: 9.5,
        name: 'Vulnerability 1',
        date: '2023-05-01',
        tool: 'Network',
        aiAssistantSolution: 'Run this patch...',
      },
      {
        id: '2',
        type: 'High',
        hosts: 5,
        severity: 8,
        name: 'Vulnerability 2',
        date: '2023-05-10',
        tool: 'Web App',
        aiAssistantSolution: 'Apply this fix...',
      },
      {
        id: '3',
        type: 'Medium',
        hosts: 2,
        severity: 4.5,
        name: 'Vulnerability 3',
        date: '2023-05-20',
        tool: 'WordPress',
        aiAssistantSolution: 'Mitigate this risk...',
      },
      {
        id: '4',
        type: 'Low',
        hosts: 2,
        severity: 2.5,
        name: 'Vulnerability 4',
        date: '2023-05-20',
        tool: 'WordPress',
        aiAssistantSolution: 'Mitigate this risk...',
      },
    ]];
  }
);

mock.onGet('/api/revenue-updates').reply(
  async () => {
    await fakeRequest(1800);
    return [200, {
      totalReports: 1,
      redTeamReports: 2,
      categories: ['16/08', '17/08', '18/08', '19/08', '20/08', '21/08', '22/08'], // The dates of the reports
      series: [
        {
          name: 'Red team reports',
          data: [1.5, 2.7, 2.2, 3.6, 1.5, 1.0], // The number of red team reports for each date
        },
      ],
    }];
  }
);

mock.onGet('/api/hosts').reply(
  async () => {
    await fakeRequest(5000);
    return [200, [
      {
        id: 1,
        hostName: 'OCTAPUS-JUAN',
        cpuUsage: 45,
        ramUsage: 70,
        storageUsage: 36,
        firewallStatus: 'Active',
        lastUpdate: '4 hours ago',
      },
      {
        id: 2,
        hostName: 'OCTAPUS-MARIA',
        cpuUsage: 67,
        ramUsage: 83,
        storageUsage: 52,
        firewallStatus: 'Inactive',
        lastUpdate: '2 hours ago',
      },
    ]];
  }
);

mock.onGet('/api/asset-status').reply(
  async () => {
    await fakeRequest(700);
    return [200, {
      connectedAssets: {
        title: 'Connected Assets',
        subtitle: '',
        amount: 6235,
      },
      disconnectedAssets: {
        title: 'Disconnected Assets',
        subtitle: '',
        amount: 345,
      },
    }];
  }
);

mock.onGet('/api/alert-distribution').reply(
  async () => {
    await fakeRequest(1200);
    return [200, {
      labels: ['Critical', 'High', 'Medium', 'Low'],
      series: [45, 15, 27, 18],
    }];

  }
);

mock.onGet('/api/recent-events').reply(
  async () => {
    await fakeRequest(2000);
    return [200, [
      { time: '08:15 am', description: 'Detected unauthorized login attempt', color: 'primary' },
      { time: '09:00 am', description: 'Malware detected in network traffic', color: 'secondary', link: 'Incident ID #CS-7429' },
      { time: '11:45 am', description: 'System vulnerability patched successfully', color: 'success' },
    ]];
  }
);


mock.onGet('/api/weekly-stats').reply(
  async () => {
    await fakeRequest(1500);
    return [200, {
      series: [5, 15, 5, 10, 5],
      stats: [
        {
          title: 'Service Uptime',
          subtitle: 'API Gateway',
          percent: '99.9',
          color: '#2196f3',  // Adjust colors as needed
          lightcolor: '#bbdefb',
          icon: 'IconGridDots',  // Icon placeholder
        },
        {
          title: 'Active Incidents',
          subtitle: 'Web Services',
          percent: '2',
          color: '#4caf50',
          lightcolor: '#c8e6c9',
          icon: 'IconGridDots',  // Icon placeholder
        },
        {
          title: 'Resolved Tickets',
          subtitle: 'Security Issues',
          percent: '85',
          color: '#f44336',
          lightcolor: '#ffcdd2',
          icon: 'IconGridDots',  // Icon placeholder
        },
      ],
    }];
  }
);

mock.onGet('/api/org-breaches').reply(
  async () => {
    await fakeRequest(1100);
    return [200, {
      labels: ['Username', 'Phone', 'P.Email', 'IP', 'Domain'],
      series: [
        {
          name: 'Breaches',
          data: [8, 0, 10, 40, 1],
        },
      ],
    }];
  }
);




export default mock;


