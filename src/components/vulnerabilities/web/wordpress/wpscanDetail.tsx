import React from 'react';
import {
  Grid,
  Box,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  TableContainer,
  IconButton,
  Stack,
  LinearProgress,
} from '@mui/material';
import DashboardCard from 'src/components/shared/DashboardCard';
import Breadcrumb from 'src/components/shared/breadcrumb/Breadcrumb';
import VisibilityIcon from '@mui/icons-material/Visibility';
import TranslateIcon from '@mui/icons-material/Translate';
import PluginVersionTable from './pluginVersionTable';
import WpScanTopCards from './wpScantopCards';
import { useTranslation } from 'react-i18next';

const WpScanDetail: React.FC<{ scanId: string; onAlertClick: (alertId: string) => void }> = ({
  scanId,
  onAlertClick,
}) => {
  const { t } = useTranslation();

  const mockAlerts = [
    {
      id: '1',
      url: 'https://prueba-tu-pala.ofertasdepadel.com/',
      description: t('vulnerabilities.headers'),
      type: t('vulnerabilities.type_headers'),
      foundBy: t('vulnerabilities.detected_by.headers_detection'),
      confidence: '100%',
      references: 'NA',
      entries: true,
    },
    {
      id: '2',
      url: 'https://prueba-tu-pala.ofertasdepadel.com/robots.txt',
      description: t('vulnerabilities.robots_description'),
      type: t('vulnerabilities.type_robots_txt'),
      foundBy: t('vulnerabilities.detected_by.robots_detection'),
      confidence: '100%',
      references: 'NA',
      entries: true,
    },
    {
      id: '3',
      url: 'https://prueba-tu-pala.ofertasdepadel.com/xmlrpc.php',
      description: t('vulnerabilities.xmlrpc_description'),
      type: t('vulnerabilities.type_xmlrpc'),
      foundBy: t('vulnerabilities.detected_by.xmlrpc_detection'),
      confidence: '100%',
      references: t('vulnerabilities.xmlrpc_references'),
      entries: true,
    },
    {
      id: '4',
      url: 'https://prueba-tu-pala.ofertasdepadel.com/readme.html',
      description: t('vulnerabilities.readme_description'),
      type: t('vulnerabilities.type_readme'),
      foundBy: t('vulnerabilities.detected_by.readme_detection'),
      confidence: '100%',
      references: 'NA',
      entries: true,
    },
    {
      id: '5',
      url: 'https://prueba-tu-pala.ofertasdepadel.com/wp-cron.php',
      description: t('vulnerabilities.wp_cron_description'),
      type: t('vulnerabilities.type_wp_cron'),
      foundBy: t('vulnerabilities.detected_by.wp_cron_detection'),
      confidence: '60%',
      references: t('vulnerabilities.wp_cron_references'),
      entries: true,
    },
  ];

  const scanName = t('vulnerabilities.scan_name');
  const status = t('vulnerabilities.status_outdated');
  const themeDetails = {
    name: 'hello-theme-child-master',
    location: 'https://prueba-tu-pala.ofertasdepadel.com/wp-content/themes/hello-theme-child-master/',
    lastVersion: 'NA',
    lastUpdate: 'NA',
    description: t('vulnerabilities.theme_description'),
    author: 'Elementor Team',
    authorUri: 'https://elementor.com/',
    license: 'GNU General Public License v3 or later.',
    licenseUri: 'https://www.gnu.org/licenses/gpl-3.0.html',
    foundBy: t('vulnerabilities.detected_by.css_homepage'),
    confidence: '100%',
  };

  return (
    <Grid container spacing={3}>
      {/* Scan Metadata Section */}
      <Grid item xs={12} xl={12}>
        <WpScanTopCards />
      </Grid>
      <Grid item xs={12} xl={6}>
        <DashboardCard>
          <PluginVersionTable />
        </DashboardCard>
      </Grid>

      <Grid item xs={12} xl={6}>
        <Breadcrumb title={scanName}>
          <Box display="flex" flexWrap="wrap" gap={1} mb={3}>
            <Chip label={`${t('vulnerabilities.status')}: ${status}`} color="info" variant="filled" />
            <Chip label={`${t('vulnerabilities.version')}: 1.0.0`} color="secondary" variant="outlined" />
            <Chip label={`${t('vulnerabilities.site_url')}: https://example.com`} color="info" variant="outlined" />
            <Chip label={`${t('vulnerabilities.effective_url')}: https://example.com`} color="warning" variant="outlined" />
          </Box>
        </Breadcrumb>
        <DashboardCard title={t('vulnerabilities.scan_details')!}>
          <Box display="flex" flexDirection="column" gap={2} mt={3}>
            <Box>
              <Stack direction="row" spacing={2} mb={1} justifyContent="space-between" alignItems="center">
                <Box>
                  <Typography variant="h6">{t('vulnerabilities.trust')}</Typography>
                </Box>
                <Chip sx={{ backgroundColor: 'primary', color: 'primary', width: 55, height: 24 }} label="12%" />
              </Stack>
              <LinearProgress value={12} variant="determinate" color={'primary'} />
            </Box>
            <Box>
              <Typography variant="subtitle2" fontWeight={600}>{t('vulnerabilities.name')}:</Typography>
              <Typography variant="body2">{themeDetails.name}</Typography>
            </Box>
            <Box>
              <Typography variant="subtitle2" fontWeight={600}>{t('vulnerabilities.location')}:</Typography>
              <Typography variant="body2">
                <a href={themeDetails.location} target="_blank" rel="noopener noreferrer">
                  {themeDetails.location}
                </a>
              </Typography>
            </Box>
            <Box>
              <Typography variant="subtitle2" fontWeight={600}>{t('vulnerabilities.last_version')}:</Typography>
              <Typography variant="body2">{themeDetails.lastVersion}</Typography>
            </Box>
            <Box>
              <Typography variant="subtitle2" fontWeight={600}>{t('vulnerabilities.last_update')}:</Typography>
              <Typography variant="body2">{themeDetails.lastUpdate}</Typography>
            </Box>
            <Box>
              <Typography variant="subtitle2" fontWeight={600}>{t('vulnerabilities.description')}:</Typography>
              <Typography variant="body2">{themeDetails.description}</Typography>
            </Box>
            <Box>
              <Typography variant="subtitle2" fontWeight={600}>{t('vulnerabilities.author')}:</Typography>
              <Typography variant="body2">{themeDetails.author}</Typography>
            </Box>
            <Box>
              <Typography variant="subtitle2" fontWeight={600}>{t('vulnerabilities.author_uri')}:</Typography>
              <Typography variant="body2">
                <a href={themeDetails.authorUri} target="_blank" rel="noopener noreferrer">
                  {themeDetails.authorUri}
                </a>
              </Typography>
            </Box>
            <Box>
              <Typography variant="subtitle2" fontWeight={600}>{t('vulnerabilities.license')}:</Typography>
              <Typography variant="body2">{themeDetails.license}</Typography>
            </Box>
            <Box>
              <Typography variant="subtitle2" fontWeight={600}>{t('vulnerabilities.license_uri')}:</Typography>
              <Typography variant="body2">
                <a href={themeDetails.licenseUri} target="_blank" rel="noopener noreferrer">
                  {themeDetails.licenseUri}
                </a>
              </Typography>
            </Box>
            <Box>
              <Typography variant="subtitle2" fontWeight={600}>{t('vulnerabilities.detected_by')}:</Typography>
              <Typography variant="body2">{themeDetails.foundBy}</Typography>
            </Box>
          </Box>
        </DashboardCard>
      </Grid>
      {/* Alerts Table Section */}
      <Grid item xs={12} xl={12}>
        <DashboardCard>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><Typography variant="subtitle2" fontWeight={600}>{t('vulnerabilities.url')}</Typography></TableCell>
                  <TableCell><Typography variant="subtitle2" fontWeight={600}>{t('vulnerabilities.description')}</Typography></TableCell>
                  <TableCell><Typography variant="subtitle2" fontWeight={600}>{t('vulnerabilities.type')}</Typography></TableCell>
                  <TableCell><Typography variant="subtitle2" fontWeight={600}>{t('vulnerabilities.detected_by')}</Typography></TableCell>
                  <TableCell><Typography variant="subtitle2" fontWeight={600}>{t('vulnerabilities.confidence')}</Typography></TableCell>
                  <TableCell><Typography variant="subtitle2" fontWeight={600}>{t('vulnerabilities.references')}</Typography></TableCell>
                  <TableCell><Typography variant="subtitle2" fontWeight={600}>{t('vulnerabilities.interesting_entries')}</Typography></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {mockAlerts.map((alert) => (
                  <TableRow key={alert.id}>
                    <TableCell>
                      <Typography variant="body2" color="primary" style={{ cursor: 'pointer' }}>
                        {alert.url}
                      </Typography>
                    </TableCell>
                    <TableCell><Typography variant="body2">{alert.description}</Typography></TableCell>
                    <TableCell><Typography variant="body2">{alert.type}</Typography></TableCell>
                    <TableCell><Typography variant="body2">{alert.foundBy}</Typography></TableCell>
                    <TableCell><Typography variant="body2">{alert.confidence}</Typography></TableCell>
                    <TableCell><Typography variant="body2">{alert.references}</Typography></TableCell>
                    <TableCell>
                      {alert.entries && (
                        <Box display="flex" gap={1}>
                          <IconButton color="primary" onClick={() => onAlertClick(alert.id)}>
                            <VisibilityIcon />
                          </IconButton>
                          <IconButton color="primary">
                            <TranslateIcon />
                          </IconButton>
                        </Box>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </DashboardCard>
      </Grid>
    </Grid>
  );
};

export default WpScanDetail;
