import VisibilityIcon from '@mui/icons-material/Visibility';
import {
  Box,
  Grid,
  IconButton,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import DashboardCard from 'src/components/shared/DashboardCard';

const WPSFindings: React.FC<{ findings: any[] }> = ({ findings = []}) => {
  const { t } = useTranslation();
  // const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  // const totalPages = Math.ceil(findings?.length / rowsPerPage);
  // const totalPages = Math.max(1, Math.ceil(findings?.length / rowsPerPage));
  const totalPages = Math.ceil((findings?.length || 0) / rowsPerPage);

  const handlePageChange = (event: any, value: any) => {
    setCurrentPage(value);
  };

  const currentData = findings?.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  return (
    <DashboardCard title={t('wpscan.interesting_findings_tittle')!}>
      <>
        {findings?.length > 0 ? (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><Typography variant="subtitle2" fontWeight={600}>{t('wpscan.url')}</Typography></TableCell>
                  <TableCell><Typography variant="subtitle2" fontWeight={600}>{t('wpscan.description')}</Typography></TableCell>
                  <TableCell><Typography variant="subtitle2" fontWeight={600}>{t('wpscan.type')}</Typography></TableCell>
                  <TableCell><Typography variant="subtitle2" fontWeight={600}>{t('wpscan.detected_by')}</Typography></TableCell>
                  <TableCell><Typography variant="subtitle2" fontWeight={600}>{t('wpscan.confidence')}</Typography></TableCell>
                  <TableCell><Typography variant="subtitle2" fontWeight={600}>{t('wpscan.actions')}</Typography></TableCell>
                  
                </TableRow>
              </TableHead>
              <TableBody>
                {currentData?.map((alert, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Typography variant="body2" color="primary" style={{ cursor: 'pointer' }}>
                        {alert.url}
                      </Typography>
                    </TableCell>
                    <TableCell><Typography variant="body2">{alert.to_s}</Typography></TableCell>
                    <TableCell><Typography variant="body2">{alert.type}</Typography></TableCell>
                    <TableCell><Typography variant="body2">{alert.found_by}</Typography></TableCell>
                    <TableCell><Typography variant="body2">{alert.confidence}%</Typography></TableCell>
                    <TableCell>
                      {alert && (
                        <Box display="flex" gap={1}>
                          <IconButton color="primary">
                            {/* <VisibilityIcon onClick={() => handleViewDetails(alert, scanId)} /> */}
                            <VisibilityIcon />
                          </IconButton>
                          {/* <IconButton color="primary">
                            <TranslateIcon />
                          </IconButton> */}
                        </Box>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
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

export default WPSFindings;
