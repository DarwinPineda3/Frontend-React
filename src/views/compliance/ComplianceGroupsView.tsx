import { ArrowBack } from '@mui/icons-material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Box, Breadcrumbs, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton, Link, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from 'src/components/shared/DashboardCard';
import Loader from 'src/components/shared/Loader/Loader';
import SnackBarInfo from 'src/layouts/full/shared/SnackBar/SnackBarInfo';
import { fetchGroups, removeGroup, setPage } from 'src/store/sections/compliance/giottoGroupsSlice';
import { useDispatch, useSelector } from 'src/store/Store';

const ComplianceGroupsView: React.FC = ({ }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [groupToDelete, setGroupToDelete] = useState<null | string>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<
    'success' | 'info' | 'warning' | 'error'
  >('success');
  const loading = useSelector((state: any) => state.giottoGroupReducer.loading);

  const itemsResults = useSelector((state: any) => state.giottoGroupReducer.itemsResults);
  const page = useSelector((state: any) => state.giottoGroupReducer.page);
  const pageSize = useSelector((state: any) => state.giottoGroupReducer.pageSize);
  const totalItemsAmount = useSelector((state: any) => state.giottoGroupReducer.totalItemsAmount);

  const handlePageChange = (event: React.MouseEvent<HTMLButtonElement> | null, page: number) => {
    if (page !== page) {
      dispatch(setPage(page));
    }
  };

  React.useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchGroups(page, pageSize));
    };
    fetchData();
  }, [dispatch, page]);

  const handleDelete = (id: string) => {
    setGroupToDelete(id);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (groupToDelete !== null) {
      try {
        await dispatch(removeGroup(groupToDelete));
        setSnackbarMessage(t('giotto.group.group_deleted_successfully') || '');
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


  if (loading) {
    return <DashboardCard>
      <Box display="flex" justifyContent="center" alignItems="center" height="200px">
        <Loader></Loader>
      </Box>
    </DashboardCard>
  }

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
              <Link component={RouterLink} color="inherit" to="/compliance/groups">
                {t('compliance_menu.compliance_groups')}
              </Link>
            </Breadcrumbs>
          </Box>
        </Box>
        <DashboardCard
          title={t('compliance.groups_description')!}
          subtitle={t('compliance.groups_info')!}
          action={
            < IconButton color="primary" onClick={() => navigate('/compliance/groups/create')}>
              <AddIcon />
            </IconButton>
          }
        >
          <>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TableContainer>
                  <Table aria-label="group list table" >
                    <TableHead>
                      <TableRow>
                        <TableCell>
                          <Typography variant="subtitle2" fontWeight={600} >
                            {t('giotto.groups.name')}
                          </Typography>
                        </TableCell>
                        < TableCell >
                          <Typography variant="subtitle2" fontWeight={600} >
                            {t('giotto.groups.assetQty')}
                          </Typography>
                        </TableCell>
                        < TableCell >
                          <Typography variant="subtitle2" fontWeight={600} >
                            {t('giotto.groups.actions')}
                          </Typography>
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {
                        itemsResults?.length > 0 ? (
                          itemsResults?.map((group: any, index: any) => (
                            <TableRow key={group.id || index}>

                              < TableCell >
                                <Typography
                                  variant="body2"
                                  color="primary"
                                  style={{ cursor: 'pointer' }}
                                  onClick={() => navigate('/compliance/groups/1')}
                                >
                                  {group.name}
                                </Typography>
                              </TableCell>
                              <TableCell>
                                <Box display="flex" alignItems="center" >
                                  <Typography variant="body2" style={{ marginLeft: '8px' }}>
                                    {group.assetsQty}
                                  </Typography>
                                </Box>
                              </TableCell>
                              <TableCell>
                                {/* cambiar el navigate por la ruta correct */}
                                <IconButton color="primary" onClick={() => navigate(`/compliance/groups/edit/${group?.id}`)}>
                                  <EditIcon />
                                </IconButton>
                                <IconButton color="error" onClick={() => handleDelete(group['id'])}>
                                  <DeleteIcon />
                                </IconButton>
                              </TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell colSpan={5} align="center" >
                              <Box
                                display="flex"
                                flexDirection="column"
                                alignItems="center"
                                justifyContent="center"
                                height="100px"
                              >
                                <Typography variant="body2" color="textSecondary" >
                                  {t('giotto.groups.no_data_available')}
                                </Typography>
                                < Typography
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
                        )}
                    </TableBody>
                  </Table>
                </TableContainer>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25, 50, 100]}
                  component="div"
                  count={totalItemsAmount}
                  rowsPerPage={pageSize}
                  page={page - 1}
                  onPageChange={(e, destPage) => handlePageChange(e, destPage + 1)}
                  onRowsPerPageChange={(e) => dispatch(fetchGroups(page, pageSize))}
                />
              </Grid>
            </Grid>


            <Dialog open={deleteDialogOpen} onClose={cancelDelete} maxWidth="xs" fullWidth>
              <DialogTitle>{t('giotto.groups.delete_group')}</DialogTitle>
              <DialogContent>
                <Typography>{t('giotto.groups.are_you_sure_you_want_to_delete_this_group')}</Typography>
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
