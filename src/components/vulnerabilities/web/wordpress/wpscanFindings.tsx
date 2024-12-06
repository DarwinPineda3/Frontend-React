import VisibilityIcon from '@mui/icons-material/Visibility';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
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

const WPSFindings: React.FC<{ findings: any[] }> = ({ findings = [] }) => {
  const { t } = useTranslation();
  const [modalContent, setModalContent] = useState<string[]>([]);


  const [modalOpen, setModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  const totalPages = Math.ceil((findings?.length || 0) / rowsPerPage);

  const handlePageChange = (event: any, value: any) => {
    setCurrentPage(value);
  };

  const currentData = findings?.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  const handleOpenModal = (entries: string[]) => {
    setModalContent(entries);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setModalContent([]);
  };

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
                  <TableCell><Typography variant="subtitle2" fontWeight={600}>{t('wpscan.interesting_entries')}</Typography></TableCell>

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
                      {alert.interesting_entries?.length > 0 ? (
                        <Box display="flex" gap={1}>
                          <IconButton color="primary" onClick={() => handleOpenModal(alert.interesting_entries)}>
                            <VisibilityIcon />
                          </IconButton>
                        </Box>
                      ) : (
                        <Typography variant="body2">{t('wpscan.no_interesting_entries')}</Typography>
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
        <Dialog open={modalOpen} onClose={handleCloseModal} maxWidth="sm" fullWidth>
          <DialogTitle>{t('wpscan.interesting_entries')}</DialogTitle>
          <DialogContent>
            {modalContent?.length > 0 ? (
              modalContent.map((entry, idx) => (
                <Typography key={idx} variant="body2" gutterBottom>
                  {entry}
                </Typography>
              ))
            ) : (
              <Typography variant="body2">{t('wpscan.no_interesting_entries')}</Typography>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseModal} color="primary">
              {t('wpscan.close')}
            </Button>
          </DialogActions>
        </Dialog>
      </>
    </DashboardCard>

  );
};

export default WPSFindings;
