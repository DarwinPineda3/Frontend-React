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
  Tooltip,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import ConfirmDeleteModal from 'src/components/modal/ConfirmDeleteModal';
import DashboardCard from 'src/components/shared/DashboardCard';
import HumanizedDate from 'src/components/shared/HumanizedDate';
import Loader from 'src/components/shared/Loader/Loader';
import SnackBarInfo from 'src/layouts/full/shared/SnackBar/SnackBarInfo';
import NoDataAvailable from 'src/views/general/NoDataAvailable';

const BlinkButton = ({ onClick }: { onClick: () => void }) => {
  const { t } = useTranslation();

  const [blinking, setBlinking] = useState(false);

  useEffect(() => {
    setBlinking(true);

    const timer = setTimeout(() => {
      setBlinking(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Tooltip title={t('vulnerabilities.network_vulnerabilities.start_network_scan')} arrow>
      <IconButton
        color="primary"
        onClick={onClick}
        sx={{
          animation: blinking ? 'blink 1s infinite, bounce 1s infinite' : 'none',
          '@keyframes blink': {
            '0%': {
              opacity: 1,
            },
            '50%': {
              opacity: 0.5,
            },
            '100%': {
              opacity: 1,
            },
          },
          '@keyframes bounce': {
            '0%': {
              transform: 'translateY(0)',
            },
            '50%': {
              transform: 'translateY(-5px)',
            },
            '100%': {
              transform: 'translateY(0)',
            },
          },
        }}
      >
        <PlayCircleOutlineIcon />
      </IconButton>
    </Tooltip>
  );
};

// Collapsible row
const Row: React.FC<{
  row: any;
  onScanClick: (scanId: string) => void;
  onDeleteScan: (networkScan: NetworkScanType) => void;
  onRunScan: (scanId: string) => void;
  onStopScan: (scanId: string) => void;
  onResumeScan: (scanId: string) => void;
  navigate: any;
}> = ({ row, onScanClick, onDeleteScan, onRunScan, onStopScan, onResumeScan, navigate }) => {
  const handleActionClick = (action: string, scanId: number) => {
    switch (action) {
      case 'run':
        onRunScan(`${scanId}`);
        break;
      case 'stop':
        onStopScan(`${scanId}`);
        break;
      case 'resume':
        onResumeScan(`${scanId}`);
        break;
      case 'delete':
        onDeleteScan(row);
        break;
      default:
        break;
    }
  };

  const handleScanClick = (scanId: string) => {
    navigate(`/vulnerabilities/network/scans/detail/${scanId}`);
  };

  return (
    <>
      <TableRow>
        <TableCell>
          <Typography
            variant="subtitle2"
            fontWeight={600}
            color="primary"
            component="a"
            onClick={() => handleScanClick(row.id_elastic)}
            style={{ cursor: 'pointer', display: 'block' }}
          >
            {row.name}
          </Typography>
          {row.comment && (
            <Tooltip title={row.comment} arrow>
              <Typography
                variant="caption"
                color="textSecondary"
                style={{
                  display: 'block',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  maxWidth: '250px',
                  cursor: 'default',
                }}
              >
                {row.comment}
              </Typography>
            </Tooltip>
          )}
        </TableCell>
        <TableCell>
          {row.status === 'Running' ? (
            <>
              <Typography variant="body2">
                {row.status} - {row.progress}%
              </Typography>
              <Typography variant="caption" color="textSecondary">
                <HumanizedDate dateString={row.current_report} />
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
            {row.status !== 'New' && row.last_report ? (
              <HumanizedDate dateString={row.last_report} />
            ) : null}
          </Typography>
        </TableCell>
        <TableCell>
          {row.status === 'Running' || row.status === 'Queued' ? (
            <IconButton color="primary" onClick={() => handleActionClick('stop', row.id_elastic)}>
              <StopIcon />
            </IconButton>
          ) : row.status !== 'Requested' ? (
            <>
              <BlinkButton onClick={() => handleActionClick('run', row.id_elastic)} />

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

          <IconButton color="error" onClick={() => handleActionClick('delete', row)}>
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
  const navigate = useNavigate();
  const [snackbarOpen, setSnackbarOpen] = useState(false); // State to control the snackbar
  const [snackbarMessage, setSnackbarMessage] = useState(''); // Message for the snackbar
  const [snackbarSeverity, setSnackbarSeverity] = useState<
    'success' | 'info' | 'warning' | 'error'
  >('success'); // Snackbar severity
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [networkScantoDelete, setNetworkScantoDelete] = useState<NetworkScanType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false); // State to control the dialog/modal
  const [networkScans, setNetworkScans] = useState<NetworkScanType[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(10);
  const [pageSize, setPageSize] = useState<number>(10);

  useEffect(() => {
    if (snackbarMessage && snackbarSeverity) {
      setSnackbarOpen(true); // Show the snackbar after the message and severity have been updated
    }
  }, [snackbarMessage, snackbarSeverity]);

  const handleDeleteClick = (networkScan: NetworkScanType) => {
    setNetworkScantoDelete(networkScan);
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
    setNetworkScantoDelete(null);
  };

  const handleConfirmDelete = async () => {
    if (networkScantoDelete) {
      try {
        // Simular la eliminación del escaneo de red
        setNetworkScans((prevScans) =>
          prevScans.filter((scan) => scan.id_elastic !== networkScantoDelete.id_elastic)
        );
        setNetworkScantoDelete(null);
        setOpenModal(false);
        handleFormSubmit(`${t('vulnerabilities.network_scan_deleted_successfully')}`, 'success');
      } catch (error) {
        console.error('Error deleting network scan:', error);
        setNetworkScantoDelete(null);
        setOpenModal(false);
        handleFormSubmit(`${t('vulnerabilities.scan_failed')}`, 'error');
      }
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleFormSubmit = (
    message: string,
    severity: 'success' | 'info' | 'warning' | 'error',
  ) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(false); // Reset snackbar visibility
    handleCloseDialog(); // Close the dialog after submission
  };

  useEffect(() => {
    // Simular la carga de datos estáticos
    const fetchData = () => {
      setIsLoading(true);
      try {
        const exampleData = [
          {
            id: 1,
            id_elastic: '1',
            name: 'Network Scan 1',
            status: 'Running',
            progress: 50,
            current_report: '2023-03-13T12:00:00Z',
            report_count: 5,
            last_report: '2023-03-13T12:00:00Z',
            comment: 'This is a comment for Network Scan 1',
          },
          {
            id: 2,
            id_elastic: '2',
            name: 'Network Scan 2',
            status: 'Stopped',
            progress: 75,
            current_report: '2023-03-12T12:00:00Z',
            report_count: 3,
            last_report: '2023-03-12T12:00:00Z',
            comment: 'This is a comment for Network Scan 2',
          },
          {
            id: 3,
            id_elastic: '3',
            name: 'Network Scan 3',
            status: 'Queued',
            progress: 0,
            current_report: '2023-03-11T12:00:00Z',
            report_count: 0,
            last_report: '2023-03-11T12:00:00Z',
            comment: 'This is a comment for Network Scan 3',
          },
          // Agrega más datos de ejemplo según sea necesario
        ];
        setNetworkScans(exampleData);
        setIsLoading(false);
      } catch (err) {
        console.error('Failed to fetch data:', err);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handlePageChange = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
    page: number,
  ) => {
    const newPage = page + 1;
    if (newPage !== currentPage) {
      setCurrentPage(newPage);
    }
  };

  const handlePageSizeChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const newPageSize = event.target.value as number;
    setPageSize(newPageSize);
    setCurrentPage(1);
  };

  const handleEditClick = () => {
    navigate('/vulnerabilities/network/scans/create');
  };

  const handleRunScanClick = async (scanId: string) => {
    try {
      setIsLoading(true);
      // Simular la ejecución del escaneo de red
      setNetworkScans((prevScans) =>
        prevScans.map((scan) =>
          scan.id_elastic === scanId ? { ...scan, status: 'Running', progress: 0 } : scan
        )
      );
      handleFormSubmit(t('vulnerabilities.scan_started_successfully'), 'success');
    } catch (error) {
      handleFormSubmit(t('vulnerabilities.scan_failed'), 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleStopScanClick = async (scanId: string) => {
    try {
      setIsLoading(true);
      // Simular la detención del escaneo de red
      setNetworkScans((prevScans) =>
        prevScans.map((scan) =>
          scan.id_elastic === scanId ? { ...scan, status: 'Stopped', progress: 0 } : scan
        )
      );
      handleFormSubmit(t('vulnerabilities.scan_stopped_successfully'), 'success');
    } catch (error) {
      handleFormSubmit(t('vulnerabilities.scan_failed'), 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResumeScanClick = async (scanId: string) => {
    try {
      setIsLoading(true);
      // Simular la reanudación del escaneo de red
      setNetworkScans((prevScans) =>
        prevScans.map((scan) =>
          scan.id_elastic === scanId ? { ...scan, status: 'Running', progress: 50 } : scan
        )
      );
      handleFormSubmit(t('vulnerabilities.scan_resumed_successfully'), 'success');
    } catch (error) {
      handleFormSubmit(t('vulnerabilities.scan_failed'), 'error');
    } finally {
      setIsLoading(false);
    }
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
                  {networkScans.length > 0 ? (
                    networkScans.map((row: NetworkScanType) => (
                      <Row
                        key={row.id}
                        row={row}
                        onDeleteScan={handleDeleteClick}
                        onScanClick={onScanClick}
                        onRunScan={handleRunScanClick}
                        onStopScan={handleStopScanClick}
                        onResumeScan={handleResumeScanClick}
                        navigate={navigate}
                      />
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} align="center">
                        <NoDataAvailable entityType="scan" formUrl='/vulnerabilities/network/scans/create'/>
                      </TableCell>
                    </TableRow>
                  )}
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

            {snackbarOpen && (
              <SnackBarInfo
                color={snackbarSeverity}
                title="Operation Status"
                message={snackbarMessage}
              />
            )}
            <ConfirmDeleteModal
              open={openModal}
              handleClose={handleClose}
              handleConfirm={handleConfirmDelete}
            />
          </>
        )}
      </Box>
    </DashboardCard>
  );
};

export default NetworkScanTable;