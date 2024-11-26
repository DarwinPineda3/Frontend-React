import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import StopIcon from '@mui/icons-material/Stop';
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
import { useNavigate } from 'react-router-dom';
import DashboardCard from 'src/components/shared/DashboardCard';
import HumanizedDate from 'src/components/shared/HumanizedDate';
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

  const handleActionClick = (action: string, scanId: number) => {
    switch (action) {
      case 'run':
        // dispatch(startScan(scanId));
        break;
      case 'stop':
        // dispatch(stopScan(scanId));
        break;
      case 'resume':
        // dispatch(resumeScan(scanId));
        break;
      case 'delete':
        // dispatch(deleteScan(scanId));
        break;
      default:
        break;
    }
  };

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
          {row.comment && (
            <Typography variant="caption" color="textSecondary">
              ({row.comment})
            </Typography>
          )}
        </TableCell>
        <TableCell>
          {row.status === 'Running' ? (
            <>
              <Typography variant="body2">
                {row.status} - {row.progress}%
              </Typography>
              <Typography variant="caption" color="textSecondary">
                ({row.current_report})
              </Typography>
            </>
          ) : (
            <Typography variant="body2">{row.status}</Typography>
          )}
        </TableCell>
        <TableCell>
          <Chip
            label={
              row.status !== 'New' ? row.report_count || row.report_count?.total || 'N/A' : '0'
            }
            onClick={row.status !== 'New' ? () => onScanClick(row.id_elastic) : undefined}
            style={{
              cursor: row.status !== 'New' ? 'pointer' : 'default',
              color: row.status !== 'New' ? 'blue' : 'gray',
            }}
            clickable={row.status !== 'New'}
          />
        </TableCell>
        <TableCell>
          <Typography variant="body2">
            {row.status !== 'New' ? <HumanizedDate dateString={row.last_report} /> : ''}
          </Typography>
        </TableCell>
        <TableCell>
          {row.status === 'Running' || row.status === 'Queued' ? (
            <IconButton color="primary" onClick={() => handleActionClick('stop', row.id_elastic)}>
              <StopIcon />
            </IconButton>
          ) : row.status !== 'Requested' ? (
            <>
              <IconButton color="primary" onClick={() => handleActionClick('run', row.id_elastic)}>
                <PlayCircleOutlineIcon />
              </IconButton>

              {row.status === 'Stopped' && (
                <IconButton
                  color="primary"
                  onClick={() => handleActionClick('resume', row.id_elastic)}
                >
                  <PlayArrowIcon />
                </IconButton>
              )}
            </>
          ) : null}

          <IconButton color="error" onClick={() => handleActionClick('delete', row.id_elastic)}>
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
  const navigate = useNavigate();
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

  const handleEditClick = () => {
    navigate('/vulnerabilities/network/scans/create');
  };
  const addButton = (
    <IconButton color="primary" onClick={() => handleEditClick()}>
      <AddIcon />
    </IconButton>
  );

  return (
    <DashboardCard
      title={t('vulnerabilities.network_scans')!}
      subtitle={t('vulnerabilities.network_scans_subtitle')!}
      action={addButton}
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
