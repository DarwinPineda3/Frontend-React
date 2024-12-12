import { Visibility } from '@mui/icons-material';
import { Dialog, DialogContent, DialogTitle, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const PortTable = ({ hostData }) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [selectedPorts, setSelectedPorts] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleOpen = (ports) => {
    setSelectedPorts(ports);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedPorts([]);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      <TableContainer>
        <Table aria-label="host table">
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  {t('observability.host')}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  {t('observability.protocol')}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  {t('observability.status')}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  {t('monitoring.actions')}
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {hostData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Typography variant="body2">{row.addr}</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">{row.addrtype}</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">{row.state}</Typography>
                </TableCell>
                <TableCell>
                  {
                    row.ports.length > 0 && (
                      <IconButton onClick={() => handleOpen(row.ports)}>
                        <Visibility />
                      </IconButton>
                    )
                  }
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={hostData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>{t('observability.ports')}</DialogTitle>
        <DialogContent>
          <TableContainer>
            <Table aria-label="ports table">
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Typography variant="subtitle2" fontWeight={600}>
                      {t('observability.protocol')}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2" fontWeight={600}>
                      {t('observability.port')}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2" fontWeight={600}>
                      {t('observability.status')}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2" fontWeight={600}>
                      {t('observability.service')}
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {selectedPorts.map((port, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Typography variant="body2">{port.protocol}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">{port.portid}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">{port.state}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">{port.service}</Typography>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PortTable;
