import Masonry from '@mui/lab/Masonry';
import { useTranslation } from 'react-i18next';
import InfoCard from 'src/components/shared/InfoCard';
import { AppState, useSelector } from 'src/store/Store';
import DiskCard from './DiskCard';

interface SystemInfoCardsProps {
  id: string;
}

const SystemInfoCards = ({ id }: SystemInfoCardsProps) => {
  const { t } = useTranslation();

  const { observedAssetsDetail, error } = useSelector(
    (state: AppState) => state.ObservedAssetsReducer,
  );

  const deviceInfo = [
    { label: t('observability.host_name'), value: observedAssetsDetail?.cpuInfo.Hostname },
    { label: t('observability.ips'), value: observedAssetsDetail?.cpuInfo.IpPublic },
    { label: t('observability.public_ip'), value: observedAssetsDetail?.cpuInfo.IpPublic },
    { label: t('observability.id'), value: observedAssetsDetail?.cpuInfo.UuId },
    { label: t('observability.agent_version'), value: observedAssetsDetail?.cpuInfo.BuildNumber },
  ];

  const pcInfo = [
    { label: t('observability.model'), value: observedAssetsDetail?.cpuInfo.PCInfo.Model },
    {
      label: t('observability.manufacturer'),
      value: observedAssetsDetail?.cpuInfo.PCInfo.Manufacturer,
    },
    {
      label: t('observability.serial_number'),
      value: observedAssetsDetail?.cpuInfo.PCInfo.SerialNumber,
    },
  ];

  const cpuInfo = [
    { label: t('observability.name'), value: observedAssetsDetail?.cpuInfo.CpuInfo.Name },
    {
      label: t('observability.processor_id'),
      value: observedAssetsDetail?.cpuInfo.CpuInfo.ProcessorId,
    },
    {
      label: t('observability.architecture'),
      value: observedAssetsDetail?.cpuInfo.CpuInfo.Architecture,
    },
    {
      label: t('observability.core_count'),
      value: observedAssetsDetail?.cpuInfo.CpuInfo.NumberOfCores.toString(),
    },
    {
      label: t('observability.logical_processors'),
      value: observedAssetsDetail?.cpuInfo.CpuInfo.NumberOfLogicalProcessors.toString(),
    },
    {
      label: t('observability.max_clock_speed'),
      value: observedAssetsDetail?.cpuInfo.CpuInfo.MaxClockSpeed,
    },
    {
      label: t('observability.socket_count'),
      value: observedAssetsDetail?.cpuInfo.CpuInfo.NumberOfSockets.toString(),
    },
    {
      label: t('observability.service_count'),
      value: observedAssetsDetail?.cpuInfo.CpuInfo.ServicesCount.toString(),
    },
  ];

  const ramInfo = [
    {
      label: t('observability.total_physical_memory'),
      value: observedAssetsDetail?.cpuInfo.RamInfo.TotalPhysicalMemory.toString(),
    },
    {
      label: t('observability.free_physical_memory'),
      value: observedAssetsDetail?.cpuInfo.RamInfo.FreePhysicalMemory.toString(),
    },
    {
      label: t('observability.used_physical_memory'),
      value: observedAssetsDetail?.cpuInfo.RamInfo.UsedPhysicalMemory.toString(),
    },
  ];

  const partitionInfo = observedAssetsDetail?.cpuInfo.Storage.Partitions
    ? [].concat(
        ...observedAssetsDetail.cpuInfo.Storage.Partitions.map((item) => [
          { label: t('observability.partitions'), value: item.Partition },
          { label: t('observability.size'), value: `${item.Size.toFixed(2)} GB` },
          { label: t('observability.type'), value: item.Type },
        ]),
      )
    : [];

  const partitionInfo_old = [
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
    {
      label: t('observability.os_name'),
      value: observedAssetsDetail?.cpuInfo.OSInfo.OperatingSystem,
    },
    { label: t('observability.version'), value: observedAssetsDetail?.cpuInfo.OSInfo.Version },
    {
      label: t('observability.build_number'),
      value: observedAssetsDetail?.cpuInfo.OSInfo.BuildNumber,
    },
    { label: t('observability.build_type'), value: observedAssetsDetail?.cpuInfo.OSInfo.BuildType },
    {
      label: t('observability.manufacturer'),
      value: observedAssetsDetail?.cpuInfo.OSInfo.Manufacturer,
    },
    {
      label: t('observability.registered_user'),
      value: observedAssetsDetail?.cpuInfo.OSInfo.RegisteredUser,
    },
    {
      label: t('observability.system_directory'),
      value: observedAssetsDetail?.cpuInfo.OSInfo.SystemDirectory,
    },
    {
      label: t('observability.installation_date'),
      value: observedAssetsDetail?.cpuInfo.OSInfo.InstallDate,
    },
    {
      label: t('observability.architecture'),
      value: observedAssetsDetail?.cpuInfo.OSInfo.Architecture,
    },
  ];

  return (
    <>
      <Masonry columns={{ xs: 1, sm: 2, md: 3 }} spacing={2}>
        <InfoCard title={t('observability.device_info')} data={deviceInfo} titleColor="#1e40af" />
        <InfoCard title={t('observability.pc_info')} data={pcInfo} titleColor="#047857" />
        <InfoCard title={t('observability.cpu_info')} data={cpuInfo} titleColor="#10b981" />
        <InfoCard title={t('observability.ram_info')} data={ramInfo} titleColor="#fbbf24" />

        <InfoCard
          title={t('observability.partition_info')}
          data={partitionInfo}
          titleColor="#ef4444"
        />
        <InfoCard title={t('observability.os_info')} data={osInfo} titleColor="#fb923c" />
      </Masonry>
      <DiskCard storage_charts={observedAssetsDetail?.storage_charts! || []} />
    </>
  );
};

export default SystemInfoCards;
