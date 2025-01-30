import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import VisibilityIcon from '@mui/icons-material/Visibility';
import WarningIcon from '@mui/icons-material/Warning';
import {
  Box,
  Grid,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
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

  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setCurrentPage(newPage);
  };
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(0);
  };

  const paginatedItems = (plugins_list || []).slice(
    currentPage * rowsPerPage,
    currentPage * rowsPerPage + rowsPerPage
  );

  return (
    <DashboardCard title={t('wpscan.plugins_list')!}>
      <>
        {plugins_list?.length > 0 ? (
          <Box>
            <Table aria-label="plugin version table">
              <TableHead>
                <TableRow>
                  <TableCell>{t('wpscan.plugin_name')}</TableCell>
                  <TableCell>{t('wpscan.version')}</TableCell>
                  <TableCell>{t('wpscan.latest_version')}</TableCell>
                  <TableCell>{t('wpscan.last_update')}</TableCell>
                  <TableCell>{t('wpscan.vulnerabilities')}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedItems?.map((plugin, index) => (
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
                        <HumanizedDate dateString={new Date(plugin?.last_updated).toISOString()} />
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
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, 50, 100]}
              component="div"
              count={(plugins_list || []).length}
              rowsPerPage={rowsPerPage}
              page={currentPage}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Box>
        ) : (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6">{t('wpscan.no_data_available')}</Typography>
            </Grid>
          </Grid>
        )
        }
      </>
    </DashboardCard>
  );
};

export default WPSPlugins;
