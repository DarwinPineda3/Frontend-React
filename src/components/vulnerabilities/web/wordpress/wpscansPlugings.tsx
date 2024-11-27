import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import VisibilityIcon from '@mui/icons-material/Visibility';
import WarningIcon from '@mui/icons-material/Warning';
import {
  Box,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';

const PluginVersionTable: React.FC = () => {
  const { t } = useTranslation();
  const pluginData = [
    { name: 'contact-form-7', version: '5.8.2', latestVersion: '5.9.8', lastUpdate: '2024-07-25T08:29:00.000Z', vulnerabilities: true, status: 'outdated' },
    { name: 'cookie-law-info', version: '3.1.6', latestVersion: '3.2.6', lastUpdate: '2024-08-13T06:43:00.000Z', vulnerabilities: false, status: 'outdated' },
    { name: 'creame-whatsapp-me', version: '5.0.16', latestVersion: '5.1.8', lastUpdate: '2024-09-30T14:43:00.000Z', vulnerabilities: true, status: 'outdated' },
    { name: 'elementor', version: '3.17.3', latestVersion: '3.24.5', lastUpdate: '2024-10-01T08:54:00.000Z', vulnerabilities: true, status: 'outdated' },
    { name: 'elementor-pro', version: '3.17.1', latestVersion: 'NA', lastUpdate: 'NA', vulnerabilities: false, status: 'up-to-date' },
    { name: 'tp-product-image-flipper-for-woocommerce', version: '2.0.1', latestVersion: '2.0.2', lastUpdate: '2024-01-09T08:57:00.000Z', vulnerabilities: false, status: 'outdated' },
    { name: 'woo-variation-swatches', version: '2.0.28', latestVersion: '2.1.2', lastUpdate: '2024-08-29T12:42:00.000Z', vulnerabilities: true, status: 'outdated' },
    { name: 'woocommerce', version: '8.2.2', latestVersion: '9.3.3', lastUpdate: '2024-09-25T13:56:00.000Z', vulnerabilities: true, status: 'outdated' },
    { name: 'woocommerce-google-analytics-integration', version: '1.8.9', latestVersion: '2.1.6', lastUpdate: '2024-08-14T12:03:00.000Z', vulnerabilities: false, status: 'outdated' },
    { name: 'wordpress-seo', version: '21.5', latestVersion: '23.5', lastUpdate: '2024-09-24T07:41:00.000Z', vulnerabilities: true, status: 'outdated' },
    { name: 'wp-super-cache', version: '1.11.0', latestVersion: '1.12.4', lastUpdate: '2024-07-17T17:05:00.000Z', vulnerabilities: false, status: 'outdated' },
  ];

  return (
    <Box>
      <TableContainer>
        <Table aria-label="plugin version table">
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  {t('vulnerabilities.plugin_name')}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  {t('vulnerabilities.version')}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  {t('vulnerabilities.latest_version')}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  {t('vulnerabilities.last_update')}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  {t('vulnerabilities.vulnerabilities')}
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pluginData.map((plugin, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Typography variant="body2">{plugin.name}</Typography>
                </TableCell>
                <TableCell>
                  <Box display="flex" alignItems="center" gap={1}>
                    <Typography variant="body2">{plugin.version}</Typography>
                    {plugin.status === 'outdated' ? (
                      <WarningIcon color="error" fontSize="small" />
                    ) : (
                      <CheckCircleIcon color="success" fontSize="small" />
                    )}
                  </Box>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">{plugin.latestVersion}</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">{plugin.lastUpdate}</Typography>
                </TableCell>
                <TableCell>
                  {plugin.vulnerabilities ? (
                    <IconButton color="error" onClick={() => console.log(t('vulnerabilities.show_vulnerabilities'))}>
                      <VisibilityIcon />
                    </IconButton>
                  ) : (
                    <Typography variant="body2">{t('vulnerabilities.no')}</Typography>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default PluginVersionTable;
