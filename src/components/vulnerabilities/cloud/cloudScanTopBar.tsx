import { Box, Chip } from "@mui/material";
import { useTranslation } from 'react-i18next';
import Breadcrumb from 'src/components/shared/breadcrumb/Breadcrumb';

const CloudScanTopBar: React.FC<{ overview: any }> = ({ overview }) => {
  const { t } = useTranslation();

  return (
    <Breadcrumb title={`Scan to ${overview?.provider}: ${overview?.cloud_id}`}>
      <Box display="flex" flexWrap="wrap" gap={1} mb={3}>
        <Chip label={`${t("vulnerabilities.date")}: ${overview?.timestamp}`} color="primary" variant="outlined" />
        <Chip label={`${t("vulnerabilities.cloud_id")}: ${overview?.cloud_id}`} color="secondary" variant="outlined" />
        <Chip label={`${t("vulnerabilities.version")}: ${overview?.version}`} color="warning" variant="outlined" />
        <Chip label={`${t("vulnerabilities.provider")}: ${overview?.provider}`} color="info" variant="outlined" />
      </Box>
    </Breadcrumb>


  );

};

export default CloudScanTopBar;
