import { Shield as ShieldIcon } from '@mui/icons-material';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import DashboardCard from 'src/components/shared/DashboardCard';
import { AppState, useSelector } from 'src/store/Store';

interface AntivirusTableProps {
  id: string;
}

const AntivirusTable = ({ id }: AntivirusTableProps) => {
  const { t } = useTranslation();

  const { observedAssetsDetail, error } = useSelector(
    (state: AppState) => state.ObservedAssetsReducer,
  );

  const logoDispatcher = (DisplayName: string) => {
    if (DisplayName.includes('Sophos')) {
      return 'https://upload.wikimedia.org/wikipedia/commons/7/78/Sophos_logo.svg';
    }
    if (DisplayName.includes('McAfee')) {
      return 'https://upload.wikimedia.org/wikipedia/commons/c/cf/McAfee_logo.svg';
    }
    if (DisplayName.includes('Windows Defender')) {
      return 'https://upload.wikimedia.org/wikipedia/commons/a/a4/Windows-defender.svg';
    }
    if (DisplayName.includes('ClamAV')) {
      return 'https://upload.wikimedia.org/wikipedia/commons/f/f2/ClamAV_Logo.png';
    }
    return <ShieldIcon fontSize="large" color="action" />;
  };

  if (error) {
    return (
      <DashboardCard title={t('observability.antivirus_info')!}>
        <Box>{error}</Box>
      </DashboardCard>
    );
  }
  if (observedAssetsDetail?.cpuInfo.AntivirusInfo.AntivirusList.length === 0) {
    return <></>;
  }
  return (
    <DashboardCard title={t('observability.antivirus_info')!}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>{t('observability.logo')}</TableCell>
              <TableCell>{t('observability.installed_antivirus')}</TableCell>
              <TableCell>{t('observability.instance_guide')}</TableCell>
              <TableCell>{t('observability.product_executable_path')}</TableCell>
              <TableCell>{t('observability.report_executable_path')}</TableCell>
              <TableCell>{t('observability.product_status')}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {observedAssetsDetail?.cpuInfo.AntivirusInfo.AntivirusList.map((antivirus, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Box display="flex" alignItems="center" justifyContent="center">
                    {typeof logoDispatcher(antivirus.DisplayName) === 'string' ? (
                      <img
                        src={logoDispatcher(antivirus.DisplayName)}
                        alt={`${antivirus.DisplayName} Logo`}
                        width={50}
                        height={50}
                      />
                    ) : (
                      logoDispatcher(antivirus.DisplayName)
                    )}
                  </Box>
                </TableCell>
                <TableCell>{antivirus.DisplayName}</TableCell>
                <TableCell>{antivirus.InstanceGuid}</TableCell>
                <TableCell>{antivirus.PathToSignedProductExe}</TableCell>
                <TableCell>{antivirus.PathToSignedReportingExe}</TableCell>
                <TableCell>{antivirus.ProductState}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </DashboardCard>
  );
};

export default AntivirusTable;
