import React, { useEffect, useState } from 'react';
import TopCardsDarkWeb from 'src/components/observability/dark-web/topCardsDarkWeb';

const TopCardCyberGuardDashboard: React.FC = () => {
  const [brandMonitoringResume, setBrandMonitoringResume] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simular la carga de datos estáticos
    const fetchData = () => {
      setLoading(true);
      try {
        const exampleData = {
          total: 100,
          domains: 20,
          emails: 30,
          ip: 10,
          usernames: 15,
          phones: 5,
          social_network_total: 8,
          vins: 2,
          dark_web_total: 10,
        };
        setBrandMonitoringResume(exampleData);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch data');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const cardsValues = [
    brandMonitoringResume?.['total'] ?? 0, // Total Compromises
    brandMonitoringResume?.['domains'] ?? 0, // Domains
    brandMonitoringResume?.['emails'] ?? 0, // Emails
    brandMonitoringResume?.['ip'] ?? 0, // IPs
    brandMonitoringResume?.['usernames'] ?? 0, // Usernames
    brandMonitoringResume?.['phones'] ?? 0, // Phones
    brandMonitoringResume?.['social_network_total'] ?? 0, // Malware Count
    brandMonitoringResume?.['vins'] ?? 0, // Compromised VIPs Count
    brandMonitoringResume?.['dark_web_total'] ?? 0, // Fake Applications Count
  ];

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!brandMonitoringResume) {
    return null;
  }

  return <TopCardsDarkWeb values={cardsValues} />;
};

export default TopCardCyberGuardDashboard;