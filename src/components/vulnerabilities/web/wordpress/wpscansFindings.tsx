import TranslateIcon from '@mui/icons-material/Translate';
import VisibilityIcon from '@mui/icons-material/Visibility';
import {
  Box,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import DashboardCard from 'src/components/shared/DashboardCard';

const WPSFindings: React.FC= () => {
  const { t } = useTranslation();

  const mockAlerts = [
    {
      id: '1',
      url: 'https://prueba-tu-pala.ofertasdepadel.com/',
      description: t('vulnerabilities.headers'),
      type: t('vulnerabilities.type_headers'),
      foundBy: t('vulnerabilities.detected_by_headers_detection'),
      confidence: '100%',
      references: 'NAAAAAA',
      entries: true,
    },
    {
      id: '2',
      url: 'https://prueba-tu-pala.ofertasdepadel.com/robots.txt',
      description: t('vulnerabilities.robots_description'),
      type: t('vulnerabilities.type_robots_txt'),
      foundBy: t('vulnerabilities.detected_by_robots_detection'),
      confidence: '100%',
      references: 'NA',
      entries: true,
    },
    {
      id: '3',
      url: 'https://prueba-tu-pala.ofertasdepadel.com/xmlrpc.php',
      description: t('vulnerabilities.xmlrpc_description'),
      type: t('vulnerabilities.type_xmlrpc'),
      foundBy: t('vulnerabilities.detected_by_xmlrpc_detection'),
      confidence: '100%',
      references: t('vulnerabilities.xmlrpc_references'),
      entries: true,
    },
    {
      id: '4',
      url: 'https://prueba-tu-pala.ofertasdepadel.com/readme.html',
      description: t('vulnerabilities.readme_description'),
      type: t('vulnerabilities.type_readme'),
      foundBy: t('vulnerabilities.detected_by_readme_detection'),
      confidence: '100%',
      references: 'NA',
      entries: true,
    },
    {
      id: '5',
      url: 'https://prueba-tu-pala.ofertasdepadel.com/wp-cron.php',
      description: t('vulnerabilities.wp_cron_description'),
      type: t('vulnerabilities.type_wp_cron'),
      foundBy: t('vulnerabilities.detected_by_wp_cron_detection'),
      confidence: '60%',
      references: t('vulnerabilities.wp_cron_references'),
      entries: true,
    },
  ];



  return (
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
                          <IconButton color="primary">
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
  );
};

export default WPSFindings;
