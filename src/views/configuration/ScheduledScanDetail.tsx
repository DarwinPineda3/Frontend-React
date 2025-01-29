import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DashboardIcon from '@mui/icons-material/Dashboard';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import {
  Box,
  Breadcrumbs,
  Divider,
  IconButton,
  Link,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink, useLocation, useNavigate, useParams } from 'react-router-dom';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from 'src/components/shared/DashboardCard';
import Loader from 'src/components/shared/Loader/Loader';
import { fetchScheduleScanDetail } from 'src/store/sections/schedule-scans-settings/ScheduleScansSlice';
import { useDispatch, useSelector } from 'src/store/Store';
import {
  ScheduledExecutionType,
  ScheduledScanDetail,
  ScheduledTaskType,
} from 'src/types/schedule-scans-settings/schedule_scans_type';

const ScheduledScansDetail = () => {
  const { t } = useTranslation();
  const { scanId } = useParams<{
    scanId?: string;
  }>();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const scheduleScanOverview: ScheduledScanDetail = useSelector(
    (state: any) => state.scheduleScansReducer.scheduled_scan_detail,
  );

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        await dispatch(fetchScheduleScanDetail(scanId!));
      } catch (error) {
        console.error('error', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [dispatch, scanId]);

  const [selectedScan, setSelectedScan] = useState<string | null>(null);

  const scanTypeLabels: Record<number, string> = {
    1: t('settings.scheduled_scans.scan_types.network_vulnerability'),
    2: t('settings.scheduled_scans.scan_types.web_vulnerability'),
    3: t('settings.scheduled_scans.scan_types.wordpress_vulnerability'),
    4: t('settings.scheduled_scans.scan_types.network_observability'),
  };

  const Overview: React.FC<{ overview: ScheduledTaskType }> = ({ overview }) => {
    const executionTime = new Date(overview.execution_time);
    const timeString = executionTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    return (
      <>
        <DashboardCard>
          <Box>
            <Box display={'flex'}>
              <Typography variant="subtitle2" fontWeight={600}>
                {t('settings.scheduled_scans.detail.subtitles.name')}{' '}
              </Typography>
              <Typography color="textPrimary">: {overview?.name || 'NA'}</Typography>
            </Box>
            <Box display={'flex'} mt={2}>
              <Typography variant="subtitle2" fontWeight={600}>
                {t('settings.scheduled_scans.detail.subtitles.scan_type')}{' '}
              </Typography>
              <Typography color="textPrimary">
                :{' '}
                {scanTypeLabels[overview.scan_type] || t('settings.scheduled_scans.common.unknown')}
              </Typography>
            </Box>
            <Box display={'flex'} mt={2}>
              <Typography variant="subtitle2" fontWeight={600}>
                {' '}
                {t('settings.scheduled_scans.detail.subtitles.target')}
              </Typography>
              <Typography color="textPrimary">: {overview?.asset.name || 'NA'}</Typography>
            </Box>
            <Box display={'flex'} mt={2}>
              <Typography variant="subtitle2" fontWeight={600}>
                {' '}
                {t('settings.scheduled_scans.detail.subtitles.execution_frequency')}{' '}
              </Typography>
              <Typography>
                :{' '}
                {scanTypeLabels[overview.execution_frequency] ||
                  t('settings.scheduled_scans.common.unknown')}
              </Typography>
            </Box>
            <Box display={'flex'} mt={2}>
              <Typography variant="subtitle2" fontWeight={600}>
                {' '}
                {t('settings.scheduled_scans.detail.subtitles.execution_time')}{' '}
              </Typography>
              <Typography color="textPrimary">
                : {timeString || t('settings.scheduled_scans.common.unknown')}
              </Typography>
            </Box>
          </Box>
        </DashboardCard>
      </>
    );
  };

  const ScheduledExecutions: React.FC<{
    scheduledExecutions: ScheduledExecutionType[];
    scheduledScan: ScheduledTaskType;
  }> = ({ scheduledExecutions, scheduledScan }) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(25);

    const handleChangePage = (event: unknown, newPage: number) => {
      setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };

    const displayedLeaks = scheduledExecutions.slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage,
    );

    return (
      <>
        <DashboardCard>
          <>
            <Table aria-label="scheduled executions table">
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Typography variant="subtitle2" fontWeight={600}>
                      {t('settings.scheduled_scans.detail.subtitles.scheduled_date')}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2" fontWeight={600}>
                      {t('settings.scheduled_scans.detail.subtitles.status')}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2" fontWeight={600}>
                      {t('settings.scheduled_scans.detail.subtitles.actions')}
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {displayedLeaks.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={3} align="center">
                      <Typography color="textSecondary" variant="body2">
                        {t('settings.scheduled_scans.detail.no_scheduled_executions')}
                      </Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  displayedLeaks.map((execution) => (
                    <TableRow key={execution.id}>
                      <TableCell>{new Date(execution.scheduled_date).toLocaleString()}</TableCell>
                      <TableCell>{execution.scheduled_status}</TableCell>
                      <TableCell>
                        {execution.elastic_id && (
                          <>
                            {scheduledScan.scan_type === 1 && (
                              <IconButton
                                component="a"
                                href={`/vulnerabilities/network/scans/${execution.elastic_task_id}/reports/${execution.elastic_id}/`}
                              >
                                <VisibilityIcon />
                              </IconButton>
                            )}
                            {scheduledScan.scan_type === 2 && (
                              <IconButton
                                component="a"
                                href={`/observability/network/scans/${execution.elastic_id}`}
                              >
                                <VisibilityIcon />
                              </IconButton>
                            )}
                            {scheduledScan.scan_type === 3 && (
                              <IconButton
                                component="a"
                                href={`/vulnerabilities/web/wordpress/${execution.elastic_id}`}
                              >
                                <VisibilityIcon />
                              </IconButton>
                            )}
                            {scheduledScan.scan_type === 4 && (
                              <IconButton
                                component="a"
                                href={`/observability/network/scans/${execution.elastic_id}`}
                              >
                                <VisibilityIcon />
                              </IconButton>
                            )}
                          </>
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, 50, 100]}
              component="div"
              count={scheduledExecutions.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </>
        </DashboardCard>
      </>
    );
  };

  const COMMON_TAB = [
    {
      value: 'overview',
      icon: <DashboardIcon />,
      label: `${t('settings.scheduled_scans.detail.titles.first_title')}`,
      disabled: false,
      content: <Overview overview={scheduleScanOverview?.scheduled_scan!}></Overview>,
    },
    {
      value: 'target',
      icon: <AccessTimeIcon />,
      label: `${t('settings.scheduled_scans.detail.titles.second_title')}`,
      disabled: false,
      content: (
        <ScheduledExecutions
          scheduledExecutions={scheduleScanOverview?.scheduled_executions!}
          scheduledScan={scheduleScanOverview?.scheduled_scan!}
        ></ScheduledExecutions>
      ),
    },
  ];

  useEffect(() => {
    setSelectedScan(scanId ? String(scanId) : null);
  }, [scanId, location]);

  const [value, setValue] = useState('overview');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <PageContainer title="Akila">
      <Box mb={2}>
        <Box display="flex" alignItems="center" mt={2}>
          <IconButton onClick={() => navigate(-1)} color="primary">
            <ArrowBackIcon />
          </IconButton>
          <Breadcrumbs aria-label="breadcrumb">
            <Link component={RouterLink} color="inherit" to="/configuration/scheduled-scans">
              {t('menu.configuration')}
            </Link>
            <Link component={RouterLink} color="inherit" to="/configuration/scheduled-scans">
              {t('menu.scheduled_scans')}
            </Link>
            {selectedScan && (
              <Link
                color="inherit"
                component={RouterLink}
                to={`/configuration/schedule-scan/detail/${selectedScan}`}
              >
                {' '}
                {t('settings.scheduled_scans.detail.breadcrumbs.detail')}
              </Link>
            )}
            {selectedScan && (
              <Typography color="textPrimary">
                {scheduleScanOverview?.scheduled_scan?.name!}
              </Typography>
            )}
          </Breadcrumbs>
        </Box>
      </Box>

      <Box mt={3}>
        {isLoading ? (
          <Box display="flex" justifyContent="center" alignItems="center" height="300px">
            <Loader />
          </Box>
        ) : (
          <>
            <TabContext value={value}>
              <Box sx={{ p: 0 }}>
                <TabList
                  onChange={handleChange}
                  aria-label="Tabs Cyber Guard"
                  variant="scrollable"
                  scrollButtons="auto"
                >
                  {COMMON_TAB.map((tab) => (
                    <Tab
                      key={tab.value}
                      icon={tab.icon}
                      label={<>{tab.label}</>}
                      value={tab.value}
                      disabled={tab.disabled}
                      sx={{ mb: 1 }}
                    />
                  ))}
                </TabList>
              </Box>
              <Divider />
              <Box mt={2} sx={{ p: 0 }}>
                {COMMON_TAB.map((panel) => (
                  <TabPanel key={panel.value} value={panel.value} sx={{ p: 0 }}>
                    {panel.content}
                  </TabPanel>
                ))}
              </Box>
            </TabContext>
          </>
        )}
      </Box>
    </PageContainer>
  );
};

export default ScheduledScansDetail;
