import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningIcon from '@mui/icons-material/Warning';
import {
  Box,
  Grid,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@mui/material';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import DashboardCard from 'src/components/shared/DashboardCard';
import HumanizedDate from 'src/components/shared/HumanizedDate';

const WPSPlugins: React.FC<{ plugins_list: any[] }> = ({ plugins_list }) => {
  const { t } = useTranslation();

  const renderVulnerabilities = (vulnerabilities: any) => {
    if (vulnerabilities.length === 0) {
      return <span>{t('wpscan.no_vulnerabilities')}</span>;
    }

    return vulnerabilities.map((vul: any, index: any) => (
      <Box key={index}>
        <p>{vul}</p>
      </Box>
    ));
  };

  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 9;

  const totalPages = Math.ceil(plugins_list?.length / rowsPerPage);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const currentData = plugins_list?.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  return (
    <DashboardCard title={t('wpscan.plugins_list')!}>
      <>
      {plugins_list?.length > 0 ? (
      <Table aria-label="plugin version table">
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography variant="subtitle2" fontWeight={600}>
                {t('wpscan.plugin_name')}
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="subtitle2" fontWeight={600}>
                {t('wpscan.version')}
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="subtitle2" fontWeight={600}>
                {t('wpscan.latest_version')}
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="subtitle2" fontWeight={600}>
                {t('wpscan.last_update')}
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="subtitle2" fontWeight={600}>
                {t('wpscan.vulnerabilities')}
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {currentData?.map((plugin, index) => (
            <TableRow key={index}>
              <TableCell>
                <Typography variant="body2" color="primary" style={{ cursor: 'pointer' }}>
                  {plugin.name}
                </Typography>
              </TableCell>
              <TableCell>
                <Box display="flex" alignItems="center" gap={1}>
                  <Typography variant="body2">{plugin.version?.number}</Typography>
                  {plugin.outdated ? (
                    <WarningIcon color="error" fontSize="small" />
                  ) : (
                    <CheckCircleIcon color="success" fontSize="small" />
                  )}
                </Box>
              </TableCell>
              <TableCell>
                <Typography variant="body2">{plugin?.latest_version}</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body2">
                  <HumanizedDate dateString={plugin?.last_updated} />
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body2">{renderVulnerabilities(plugin?.vulnerabilities)}</Typography>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
       ) : (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h6">{t('wpscan.no_data_available')}</Typography>
          </Grid>
        </Grid>
      )
      }
      <Box my={3} display="flex" justifyContent="center">
            <Pagination
              count={totalPages}
              color="primary"
              page={currentPage}
              onChange={handlePageChange}
            />
          </Box>
      </>
    </DashboardCard>
  );
};

export default WPSPlugins;
