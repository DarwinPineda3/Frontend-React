import { ArrowBack } from '@mui/icons-material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {
  Box,
  Breadcrumbs,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Link,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from 'src/components/shared/DashboardCard';
import Loader from 'src/components/shared/Loader/Loader';
import SnackBarInfo from 'src/layouts/full/shared/SnackBar/SnackBarInfo';
import {
  fetchGroups,
  removeGroup,
  setPage,
  setPageSize,
} from 'src/store/sections/compliance/giottoGroupsSlice';
import { useDispatch, useSelector } from 'src/store/Store';

const ComplianceGroupsView: React.FC = ({ }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const [groupToDelete, setGroupToDelete] = useState<null | string>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<
    'success' | 'info' | 'warning' | 'error'
  >('success');
  const loading = useSelector((state: any) => state.giottoGroupReducer.loading);

  const itemsResults = useSelector((state: any) => state.giottoGroupReducer.itemsResults);
  const currentPage = useSelector((state: any) => state.giottoGroupReducer.page);
  const pageSize = useSelector((state: any) => state.giottoGroupReducer.pageSize);
  const totalPages = useSelector((state: any) => state.giottoGroupReducer.totalPages);
  const error = useSelector((state: any) => state.giottoGroupReducer.error);

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

  React.useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchGroups(currentPage, pageSize));
    };
    fetchData();
  }, [dispatch, currentPage, pageSize]);

  useEffect(() => {
    if (location.state?.message) {
      setSnackbarMessage(location.state.message);
      setSnackbarSeverity(location.state.severity || 'success');
      setSnackbarOpen(true);
    }
  }, [location.state]);

  const handleDelete = (id: string) => {
    setGroupToDelete(id);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (groupToDelete !== null) {
      try {
        await dispatch(removeGroup(groupToDelete));
        setSnackbarMessage(t('giotto.groups.group_deleted_successfully') || '');
        setSnackbarSeverity('success');
        setSnackbarOpen(true);
      } catch (error: any) {
        setSnackbarMessage(error.error || '');
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
      }
    }
    setDeleteDialogOpen(false);
    setGroupToDelete(null);
  };

  const cancelDelete = () => {
    setDeleteDialogOpen(false);
    setGroupToDelete(null);
  };

  useEffect(() => {
    if (error) {
      setSnackbarOpen(true);
      setSnackbarMessage(error);
      setSnackbarSeverity('error');
    }
  }, [error]);

  return (
    <PageContainer>
      <>
        <Box mb={2}>
          <Box display="flex" alignItems="center" mt={2}>
            <IconButton onClick={() => navigate(-1)} color="primary">
              <ArrowBack />
            </IconButton>
            <Breadcrumbs aria-label="breadcrumb">
              <Link component={RouterLink} color="inherit" to="/compliance/groups">
                {t('compliance_menu.compliance')}
              </Link>
              <Typography>{t('compliance_menu.compliance_groups')}</Typography>
            </Breadcrumbs>
          </Box>
        </Box>
        <DashboardCard
          title={t('compliance.groups_description')!}
          subtitle={t('compliance.groups_info')!}
          action={
            <IconButton color="primary" onClick={() => navigate('/compliance/groups/create')}>
              <AddIcon />
            </IconButton>
          }
        >
          <>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TableContainer>
                  <Table aria-label="group list table">
                    <TableHead>
                      <TableRow>
                        <TableCell>{t('giotto.groups.name')}</TableCell>
                        <TableCell>{t('giotto.groups.assetQty')}</TableCell>
                        <TableCell>{t('giotto.groups.actions')}</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {loading ? (
                        <TableRow>
                          <TableCell colSpan={6}>
                            <Box
                              display="flex"
                              justifyContent="center"
                              alignItems="center"
                              height="100px"
                            >
                              <Loader />
                            </Box>
                          </TableCell>
                        </TableRow>
                      ) : (
                        itemsResults?.length > 0 ? (
                          itemsResults.map((group: any, index: any) => (
                            <TableRow key={group.id || index}>
                              <TableCell>
                                <Typography
                                  variant="subtitle2"
                                  fontWeight={600}
                                  color="primary"
                                  component="a"
                                  onClick={() => navigate(`/compliance/groups/${group.id}`)}
                                  style={{ cursor: 'pointer' }}
                                >
                                  {group.name}
                                </Typography>
                              </TableCell>
                              <TableCell>
                                <Box display="flex" alignItems="center">
                                  <Typography variant="body2" style={{ marginLeft: '8px' }}>
                                    {group.assetsQty}
                                  </Typography>
                                </Box>
                              </TableCell>
                              <TableCell>
                                <IconButton color="primary" onClick={() => navigate(`/compliance/groups/edit/${group.id}`)}>
                                  <EditIcon />
                                </IconButton>
                                <IconButton color="error" onClick={() => handleDelete(group.id)}>
                                  <DeleteIcon />
                                </IconButton>
                              </TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell colSpan={5} align="center">
                              <Box
                                display="flex"
                                flexDirection="column"
                                alignItems="center"
                                justifyContent="center"
                                height="100px"
                              >
                                <Typography variant="body2" color="textSecondary">
                                  {t('giotto.groups.no_data_available')}
                                </Typography>
                                <Typography
                                  variant="body2"
                                  color="primary"
                                  component="a"
                                  onClick={() => navigate('/compliance/groups/create')}
                                  style={{
                                    cursor: 'pointer',
                                    textDecoration: 'underline',
                                    marginTop: '8px',
                                  }}
                                >
                                  {t('giotto.groups.create_group')}
                                </Typography>
                              </Box>
                            </TableCell>
                          </TableRow>
                        ))
                      }
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
              </Grid>
            </Grid>

            <Dialog open={deleteDialogOpen} onClose={cancelDelete} maxWidth="xs" fullWidth>
              <DialogTitle>{t('giotto.groups.delete_group')}</DialogTitle>
              <DialogContent>
                <Typography>
                  {t('giotto.groups.are_you_sure_you_want_to_delete_this_group')}
                </Typography>
              </DialogContent>
              <DialogActions>
                <Button onClick={cancelDelete} color="info">
                  {t('giotto.groups.cancel')}
                </Button>
                <Button onClick={confirmDelete} color="primary" variant="contained">
                  {t('giotto.groups.confirm')}
                </Button>
              </DialogActions>
            </Dialog>

            {snackbarOpen && (
              <SnackBarInfo
                open={snackbarOpen}
                color={snackbarSeverity}
                title={snackbarSeverity === 'success' ? 'Success' : 'Error'}
                message={snackbarMessage}
                onClose={() => setSnackbarOpen(false)}
              />
            )}
          </>
        </DashboardCard>
      </>
    </PageContainer>
  );
};

export default ComplianceGroupsView;
