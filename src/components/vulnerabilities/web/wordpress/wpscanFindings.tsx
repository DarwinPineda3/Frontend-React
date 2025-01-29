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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography
} from '@mui/material';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import DashboardCard from 'src/components/shared/DashboardCard';

const WPSFindings: React.FC<{ findings: any[] }> = ({ findings = [] }) => {
  const { t } = useTranslation();
  const [modalContent, setModalContent] = useState<string[]>([]);


  const [modalOpen, setModalOpen] = useState(false);

  const handleOpenModal = (entries: string[]) => {
    setModalContent(entries);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setModalContent([]);
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

  const paginatedItems = findings.slice(
    currentPage * rowsPerPage,
    currentPage * rowsPerPage + rowsPerPage
  );

  return (
    <DashboardCard title={t('wpscan.interesting_findings_tittle')!}>
      <>
        {findings?.length > 0 ? (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>{t('wpscan.url')}</TableCell>
                  <TableCell>{t('wpscan.description')}</TableCell>
                  <TableCell>{t('wpscan.type')}</TableCell>
                  <TableCell>{t('wpscan.detected_by')}</TableCell>
                  <TableCell>{t('wpscan.confidence')}</TableCell>
                  <TableCell>{t('wpscan.interesting_entries')}</TableCell>

                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedItems?.map((alert, index) => (
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
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 50, 100]}
          component="div"
          count={findings.length}
          rowsPerPage={rowsPerPage}
          page={currentPage}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />

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
