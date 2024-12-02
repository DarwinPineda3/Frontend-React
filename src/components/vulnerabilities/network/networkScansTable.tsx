import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import StopIcon from '@mui/icons-material/Stop';
import {
  Box,
  Chip,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import DashboardCard from 'src/components/shared/DashboardCard';
import HumanizedDate from 'src/components/shared/HumanizedDate';
import Loader from 'src/components/shared/Loader/Loader';
import { useDispatch, useSelector } from 'src/store/Store';
import {
  fetchNetworkScans,
  setPage,
  setPageSize,
} from 'src/store/vulnerabilities/network/NetworkScansSlice';
import { NetworkScanType } from 'src/types/vulnerabilities/network/networkScansType';
// Collapsible row
const Row: React.FC<{ row: any; onScanClick: (scanId: string) => void }> = ({
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
        <TableCell>
          <Typography variant="subtitle2">{row.name}</Typography>
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
    </>
  );
};

interface NetworkScanTableProps {
  onScanClick: (scanId: string) => void;
}

const NetworkScanTable: React.FC<NetworkScanTableProps> = ({ onScanClick }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const networkScans = useSelector((state: any) => state.networkScanReducer.networkScans);
  const currentPage = useSelector((state: any) => state.networkScanReducer.page);
  const totalPages = useSelector((state: any) => state.networkScanReducer.totalPages);
  const pageSize = useSelector((state: any) => state.networkScanReducer.pageSize);
  const [isLoading, setIsLoading] = useState(false);

  React.useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      await dispatch(fetchNetworkScans(currentPage, pageSize));
      setIsLoading(false);
    };
    fetchData();
  }, [dispatch, currentPage, pageSize]);

  const handlePageChange = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
    page: number,
  ) => {
    const newPage = page + 1;
    if (newPage !== currentPage) {
      dispatch(setPage(newPage));
    }
  };

  const handlePageSizeChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const newPageSize = event.target.value as number;
    dispatch(setPageSize(newPageSize));
    dispatch(setPage(1));
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
        {isLoading ? (
          <Box display="flex" justifyContent="center" alignItems="center" height="300px">
            <Loader />
          </Box>
        ) : (
          <>
            <TableContainer>
              <Table aria-label="collapsible table" sx={{ whiteSpace: 'nowrap' }}>
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
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, 50, 100]}
              component="div"
              count={totalPages * pageSize}
              rowsPerPage={pageSize}
              page={currentPage - 1}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handlePageSizeChange}
            />
          </>
        )}
      </Box>
    </DashboardCard>
  );
};

export default NetworkScanTable;
