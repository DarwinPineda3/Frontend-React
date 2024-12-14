import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import VisibilityIcon from '@mui/icons-material/Visibility';
import WarningIcon from '@mui/icons-material/Warning';
import {
  Box,
  Grid,
  IconButton,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography
} from '@mui/material';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import DashboardCard from 'src/components/shared/DashboardCard';
import HumanizedDate from 'src/components/shared/HumanizedDate';

const WPSPlugins: React.FC<{ plugins_list: any[], scanId: any }> = ({ plugins_list, scanId }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleViewDetails = (vulns_nvd: any, scanId: any) => {

    if (vulns_nvd) {
      navigate(`/vulnerabilities/web/wordpress/${scanId}/vulnerabilities`, { state: { vulns_nvd } });
    }
  };

  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  const totalPages = Math.ceil(plugins_list?.length / rowsPerPage);

  const handlePageChange = (event: any, value: any) => {
    setCurrentPage(value);
  };

  const currentData = plugins_list?.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  return (
    <DashboardCard title={t('wpscan.plugins_list')!}>
      <>
        {plugins_list?.length > 0 ? (
          <Box>
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
                        <HumanizedDate dateString={new Date(plugin?.last_updated).toISOString() } />
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {plugin?.vulnerabilities_nvd?.length === 0 ? (
                          <span>{t('wpscan.no_vulnerabilities')}</span>
                        ) : (
                          <Box display="flex" gap={1}>
                            <IconButton color="primary">
                              <VisibilityIcon onClick={() => handleViewDetails(plugin?.vulnerabilities_nvd, scanId)} />
                            </IconButton>
                          </Box>
                        )
                        }
                      </Typography>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>

        ) : (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6">{t('wpscan.no_data_available')}</Typography>
            </Grid>
          </Grid>
        )
        }
        <Box my={3} display="flex" justifyContent="center">
          {totalPages > 0 && (
            <Pagination
              count={totalPages}
              color="primary"
              page={currentPage}
              onChange={handlePageChange}
            />
          )}
        </Box>
      </>
    </DashboardCard>
  );
};

export default WPSPlugins;
