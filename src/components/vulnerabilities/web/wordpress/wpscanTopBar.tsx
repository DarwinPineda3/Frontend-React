import {
  Box,
  Chip
} from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import Breadcrumb from 'src/components/shared/breadcrumb/Breadcrumb';

const WpScanTopBar: React.FC<{status:string, version:string, site_url:string, effective_url:string }> = ({status, version, site_url, effective_url}) => {
  const { t } = useTranslation();

  return (
    <Box mb={-2}>
      <Breadcrumb title={site_url}>
      <Box display="flex" flexWrap="wrap" gap={2} mt={3} >
        <Chip label={`${t('vulnerabilities.status')}: ${status}`} color="info" variant="filled" />
        <Chip label={`${t('vulnerabilities.version')}: ${version}`} color="secondary" variant="outlined" />
        <Chip label={`${t('vulnerabilities.effective_url')}: ${effective_url}`} color="warning" variant="outlined" />
      </Box>
    </Breadcrumb>
    </Box>
    

  );
};

export default WpScanTopBar;
