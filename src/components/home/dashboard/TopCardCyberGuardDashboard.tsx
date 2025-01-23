import React, { useEffect } from 'react';
import TopCardsDarkWeb from 'src/components/observability/dark-web/topCardsDarkWeb';
import { fetchBrandMonitoringData, fetchBrandMonitoringResume } from 'src/store/sections/cyber-guard/BrandMonitoringSlice';
import { useDispatch, useSelector } from 'src/store/Store';

const TopCardCyberGuardDashboard: React.FC = () => {


  const brandMonitoringResume: any = useSelector((state: any) => state.brandMonitoringReducer.brandMonitoringResume);

  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(fetchBrandMonitoringResume());
    dispatch(fetchBrandMonitoringData());
  }, [dispatch]);


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

  if (!brandMonitoringResume) {
    return null;
  }
  return (
    <TopCardsDarkWeb values={cardsValues} />
  );
};

export default TopCardCyberGuardDashboard;