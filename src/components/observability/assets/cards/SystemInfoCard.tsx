import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, Typography, Box } from '@mui/material';
import Masonry from '@mui/lab/Masonry';
import DashboardCard from 'src/components/shared/DashboardCard';
import DiskCard from './DiskCard';

interface InfoCardProps {
  title: string;
  data: { label: string; value: string }[];
  titleColor: string;
}

const InfoCard = ({ title, data, titleColor }: InfoCardProps) => (
  <DashboardCard>
    <>
      <Typography variant="h6" style={{ color: titleColor }} gutterBottom>
        {title}
      </Typography>
      <Box>
        {data.map((item, index) => (
          <Box key={index} mb={1}>
            <Typography variant="body2" fontWeight={600}>
              {item.label}
            </Typography>
            <Typography variant="body2">{item.value}</Typography>
          </Box>
        ))}
      </Box>
    </>
  </DashboardCard>
);

const SystemInfoCards = () => {
  const { t } = useTranslation();
  
  const deviceInfo = [
    { label: t('observability.host_name'), value: 'OCTAPUS-JUAN' },
    { label: t('observability.ips'), value: '192.168.1.9, 172.25.96.1' },
    { label: t('observability.public_ip'), value: '190.69.224.161' },
    { label: t('observability.id'), value: '6bf865c5-3a7e-4794-ad03-4685dc931660' },
    { label: t('observability.agent_version'), value: '1.0.5' },
  ];

  const pcInfo = [
    { label: t('observability.model'), value: 'Dell G15 5525' },
    { label: t('observability.manufacturer'), value: 'Dell Inc.' },
    { label: t('observability.serial_number'), value: '5V3L4W3' },
  ];

  const cpuInfo = [
    { label: t('observability.name'), value: 'AMD Ryzen 7 6800H with Radeon Graphics' },
    { label: t('observability.processor_id'), value: '178BFBFF00A40F41' },
    { label: t('observability.architecture'), value: '64 bits' },
    { label: t('observability.core_count'), value: '8' },
    { label: t('observability.logical_processors'), value: '16' },
    { label: t('observability.max_clock_speed'), value: '3.20 GHz' },
    { label: t('observability.socket_count'), value: '1' },
    { label: t('observability.service_count'), value: '136' },
  ];

  const ramInfo = [
    { label: t('observability.total_physical_memory'), value: '15.24 GB' },
    { label: t('observability.free_physical_memory'), value: '3.86 GB' },
    { label: t('observability.used_physical_memory'), value: '11.38 GB' },
  ];

  const partitionInfo = [
    { label: t('observability.partitions'), value: 'Disk #0, Partition #0' },
    { label: t('observability.size'), value: '0.29 GB' },
    { label: t('observability.type'), value: 'GPT: System' },
    { label: t('observability.partitions'), value: 'Disk #0, Partition #1' },
    { label: t('observability.size'), value: '453.53 GB' },
    { label: t('observability.type'), value: 'GPT: Basic Data' },
    { label: t('observability.partitions'), value: 'Disk #0, Partition #2' },
    { label: t('observability.size'), value: '1.02 GB' },
    { label: t('observability.type'), value: 'GPT: Unknown' },
    { label: t('observability.partitions'), value: 'Disk #0, Partition #3' },
    { label: t('observability.size'), value: '20.54 GB' },
    { label: t('observability.type'), value: 'GPT: Unknown' },
    { label: t('observability.partitions'), value: 'Disk #0, Partition #4' },
    { label: t('observability.size'), value: '1.43 GB' },
    { label: t('observability.type'), value: 'GPT: Unknown' },
  ];

  const osInfo = [
    { label: t('observability.os_name'), value: 'Microsoft Windows 11 Home Single Language' },
    { label: t('observability.version'), value: '10.0.22631' },
    { label: t('observability.build_number'), value: '22631' },
    { label: t('observability.build_type'), value: 'Multiprocessor Free' },
    { label: t('observability.manufacturer'), value: 'Microsoft Corporation' },
    { label: t('observability.registered_user'), value: 'it2secure2o24@hotmail.com' },
    { label: t('observability.system_directory'), value: 'C:\\WINDOWS\\system32' },
    { label: t('observability.installation_date'), value: '2024-01-30T12:26:40-05:00' },
    { label: t('observability.architecture'), value: '64 bits' },
  ];

  return (
    <Masonry columns={{ xs: 1, sm: 2, md: 3 }} spacing={2}>
      <InfoCard title={t('observability.device_info')} data={deviceInfo} titleColor="#1e40af" />
      <InfoCard title={t('observability.pc_info')} data={pcInfo} titleColor="#047857" />
      <InfoCard title={t('observability.cpu_info')} data={cpuInfo} titleColor="#10b981" />
      <InfoCard title={t('observability.ram_info')} data={ramInfo} titleColor="#fbbf24" />
      <InfoCard title={t('observability.partition_info')} data={partitionInfo} titleColor="#ef4444" />
      <InfoCard title={t('observability.os_info')} data={osInfo} titleColor="#fb923c" />
      <DiskCard />
    </Masonry>
  );
};

export default SystemInfoCards;
