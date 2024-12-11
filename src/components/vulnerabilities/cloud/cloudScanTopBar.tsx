import { Box, Chip } from "@mui/material";
import { useTranslation } from 'react-i18next';
import Breadcrumb from 'src/components/shared/breadcrumb/Breadcrumb';

const CloudScanTopBar = () => {
  const { t } = useTranslation();

  const mockDate = new Date('2024-09-23T10:20:30Z');
  const mockId = '104892762537578212777';
  const mockVersion = 1;
  const scanName = "Scan Name Example";
  const mockProvider = 'gcp';

  return (
    <Breadcrumb title={scanName}>
      <Box display="flex" flexWrap="wrap" gap={1} mb={3}>
        <Chip label={`${t("vulnerabilities.date")}: ${mockDate.toLocaleString()}`} color="primary" variant="outlined" />
        <Chip label={`${t("vulnerabilities.cloud_id")}: ${mockId}`} color="secondary" variant="outlined" />
        <Chip label={`${t("vulnerabilities.version")}: ${mockVersion}`} color="warning" variant="outlined" />
        <Chip label={`${t("vulnerabilities.provider")}: ${mockProvider}`} color="info" variant="outlined" />
      </Box>
    </Breadcrumb>


  );

};

export default CloudScanTopBar;
