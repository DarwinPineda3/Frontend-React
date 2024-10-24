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
  <DashboardCard >
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
  const deviceInfo = [
    { label: 'Nombre de Host', value: 'OCTAPUS-JUAN' },
    { label: 'IPs', value: '192.168.1.9, 172.25.96.1' },
    { label: 'Ip pública', value: '190.69.224.161' },
    { label: 'ID', value: '6bf865c5-3a7e-4794-ad03-4685dc931660' },
    { label: 'Agent Version', value: '1.0.5' },
  ];

  const pcInfo = [
    { label: 'Modelo', value: 'Dell G15 5525' },
    { label: 'Fabricante', value: 'Dell Inc.' },
    { label: 'Número de serial', value: '5V3L4W3' },
  ];

  const cpuInfo = [
    { label: 'Nombre', value: 'AMD Ryzen 7 6800H with Radeon Graphics' },
    { label: 'ID del procesador', value: '178BFBFF00A40F41' },
    { label: 'Arquitectura', value: '64 bits' },
    { label: 'Número de núcleos', value: '8' },
    { label: 'Número de procesadores lógicos', value: '16' },
    { label: 'Velocidad máxima del reloj', value: '3.20 GHz' },
    { label: 'Número de sockets', value: '1' },
    { label: 'Number of Services', value: '136' },
  ];

  const ramInfo = [
    { label: 'Memoria física total', value: '15.24 GB' },
    { label: 'Memoria física libre', value: '3.86 GB' },
    { label: 'Memoria física en uso', value: '11.38 GB' },
  ];

  const partitionInfo = [
    { label: 'Particiones', value: 'Disk #0, Partition #0' },
    { label: 'Tamaño', value: '0.29 GB' },
    { label: 'Tipo', value: 'GPT: System' },
    { label: 'Particiones', value: 'Disk #0, Partition #1' },
    { label: 'Tamaño', value: '453.53 GB' },
    { label: 'Tipo', value: 'GPT: Basic Data' },
    { label: 'Particiones', value: 'Disk #0, Partition #2' },
    { label: 'Tamaño', value: '1.02 GB' },
    { label: 'Tipo', value: 'GPT: Unknown' },
    { label: 'Particiones', value: 'Disk #0, Partition #3' },
    { label: 'Tamaño', value: '20.54 GB' },
    { label: 'Tipo', value: 'GPT: Unknown' },
    { label: 'Particiones', value: 'Disk #0, Partition #4' },
    { label: 'Tamaño', value: '1.43 GB' },
    { label: 'Tipo', value: 'GPT: Unknown' },
  ];

  const osInfo = [
    { label: 'Nombre del sistema operativo', value: 'Microsoft Windows 11 Home Single Language' },
    { label: 'Versión', value: '10.0.22631' },
    { label: 'Número de compilación', value: '22631' },
    { label: 'Tipo de compilación', value: 'Multiprocessor Free' },
    { label: 'Fabricante', value: 'Microsoft Corporation' },
    { label: 'Usuario registrado', value: 'it2secure2o24@hotmail.com' },
    { label: 'Directorio del sistema', value: 'C:\\WINDOWS\\system32' },
    { label: 'Fecha de instalación', value: '2024-01-30T12:26:40-05:00' },
    { label: 'Arquitectura', value: '64 bits' },
  ];

  return (
    <Masonry columns={{ xs: 1, sm: 2, md: 3 }} spacing={2}>
      <InfoCard title="INFORMACIÓN DEL DISPOSITIVO" data={deviceInfo} titleColor="#1e40af" />
      <InfoCard title="INFORMACIÓN DEL PC" data={pcInfo} titleColor="#047857" />
      <InfoCard title="INFORMACIÓN DEL CPU" data={cpuInfo} titleColor="#10b981" />
      <InfoCard title="INFORMACIÓN DE LA RAM" data={ramInfo} titleColor="#fbbf24" />
      <InfoCard title="INFORMACIÓN DE PARTICIONES" data={partitionInfo} titleColor="#ef4444" />
      <InfoCard title="INFORMACIÓN DEL SISTEMA OPERATIVO" data={osInfo} titleColor="#fb923c" />
      <DiskCard/>
    </Masonry>
  );
};

export default SystemInfoCards;
