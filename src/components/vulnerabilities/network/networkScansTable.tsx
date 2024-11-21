import DeleteIcon from '@mui/icons-material/Delete';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import {
  Box,
  Chip,
  IconButton,
  Pagination,
  Paper,
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
import { useDispatch, useSelector } from 'src/store/Store';
import { fetchNetworkScans, setPage } from 'src/store/vulnerabilities/network/NetworkScansSlice';
import { NetworkScanType } from 'src/types/vulnerabilities/network/networkScansType';

// Collapsible row
const Row: React.FC<{ row: any; onScanClick: (scanId: number) => void }> = ({
  row,
  onScanClick,
}) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  return (
    <>
      <TableRow>
        {/* <TableCell>
          <IconButton size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell> */}
        <TableCell>
          <Typography variant="body2">{row.name}</Typography>
        </TableCell>
        <TableCell>
          <Typography variant="body2">{row.status}</Typography>
        </TableCell>
        <TableCell>
          <Chip
            label={row.report_count}
            onClick={() => onScanClick(row.id_elastic)}
            style={{ cursor: 'pointer', color: 'blue' }}
            clickable
          />
        </TableCell>
        <TableCell>
          <Typography variant="body2">{row.last_report}</Typography>
        </TableCell>
        <TableCell>
          <IconButton color="primary">
            <PlayCircleOutlineIcon />
          </IconButton>
          <IconButton color="error">
            <DeleteIcon />
          </IconButton>
        </TableCell>
      </TableRow>
      {/* <TableRow>
        <TableCell colSpan={6} style={{ paddingBottom: 0, paddingTop: 0 }}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={2}>
              <Typography variant="h6">{t('vulnerabilities.detailed_information')}:</Typography>
              <Typography variant="body2">
                <strong>{t('vulnerabilities.type')}:</strong> {row.type}
              </Typography>
              <Typography variant="body2">
                <strong>{t('vulnerabilities.scan_configuration')}:</strong> {row.scanConfig}
              </Typography>
              <Typography variant="body2">
                <strong>{t('vulnerabilities.target_hosts')}:</strong> {row.targetHosts}
              </Typography>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow> */}
    </>
  );
};

interface NetworkScanTableProps {
  onScanClick: (scanId: number) => void;
}

const NetworkScanTable: React.FC<NetworkScanTableProps> = ({ onScanClick }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const networkScans = useSelector((state: any) => state.networkScanReducer.networkScans);
  const currentPage = useSelector((state: any) => state.networkScanReducer.page);
  const totalPages = useSelector((state: any) => state.networkScanReducer.totalPages);

  React.useEffect(() => {
    dispatch(fetchNetworkScans(currentPage));
  }, [dispatch, currentPage]);

  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    if (page !== currentPage) {
      dispatch(setPage(page));
    }
  };

  return (
    <DashboardCard
      title={t('vulnerabilities.network_scans')!}
      subtitle={t('vulnerabilities.network_scans_subtitle')!}
    >
      <Box>
        <TableContainer component={Paper}>
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow>
                {/* <TableCell /> */}
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={600}>
                    {t('vulnerabilities.name')}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={600}>
                    {t('vulnerabilities.status')}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={600}>
                    {t('vulnerabilities.reports')}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={600}>
                    {t('vulnerabilities.last_report')}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={600}>
                    {t('vulnerabilities.actions')}
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {networkScans.map((row: NetworkScanType) => (
                <Row key={row.id} row={row} onScanClick={onScanClick} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Box my={3} display="flex" justifyContent={'center'}>
          <Pagination
            count={totalPages}
            color="primary"
            page={currentPage}
            onChange={handlePageChange}
          />
        </Box>
      </Box>
    </DashboardCard>
  );
};

export default NetworkScanTable;
