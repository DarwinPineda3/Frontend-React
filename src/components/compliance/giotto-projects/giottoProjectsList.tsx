import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
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
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import DashboardCard from 'src/components/shared/DashboardCard';
import HumanizedDate from 'src/components/shared/HumanizedDate';
import Loader from 'src/components/shared/Loader/Loader';
import SnackBarInfo from 'src/layouts/full/shared/SnackBar/SnackBarInfo';
import {
  fetchProjects,
  removeProject,
  setLoading,
} from 'src/store/sections/compliance/giottoProjectsSlice';
import { useDispatch, useSelector } from 'src/store/Store';

const GiottoProjectsList = () => {
  const { t } = useTranslation();
  const { projects, page, pageSize, loading, totalItemsAmount } = useSelector(
    (state: any) => state.giottoProjectsReducer,
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await dispatch(fetchProjects(page));
      setLoading(false);
    };
    fetchData();
  }, [dispatch, page]);

  const [openDialog, setOpenDialog] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState<null | string>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<
    'success' | 'info' | 'warning' | 'error'
  >('success');

  const handlePageChange = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    askedPage: number,
  ) => {
    if (page !== askedPage) {
      dispatch(fetchProjects(askedPage));
    }
  };

  const handleDelete = (id: string) => {
    setProjectToDelete(id);
    setDeleteDialogOpen(true);
  };

  const handleEditClick = (project: any = null) => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const confirmDelete = async () => {
    if (projectToDelete !== null) {
      try {
        await dispatch(removeProject(projectToDelete));
        setSnackbarMessage(t('compliance_projects.project_deleted_successfully') || '');
        setSnackbarSeverity('success');
        setSnackbarOpen(true);
      } catch (error: any) {
        setSnackbarMessage(error.error || '');
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
      }
    }
    setDeleteDialogOpen(false);
    setProjectToDelete(null);
  };

  const cancelDelete = () => {
    setDeleteDialogOpen(false);
    setProjectToDelete(null);
  };

  const addButton = (
    <IconButton color="primary" onClick={() => navigate('/compliance/projects/create')}>
      <AddIcon />
    </IconButton>
  );

  return (
    <DashboardCard
      title={t('compliance.projects_description') ?? ''}
      subtitle={t('compliance.projects_info') ?? ''}
      action={addButton}
    >
      <Box>
        <Box>
          <TableContainer>
            {/* Table view */}
            <Table>
              {/* Table head */}
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Start Date</TableCell>
                  <TableCell>End Date</TableCell>
                  <TableCell>State</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              {/* Table body */}
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={5}>
                      <Loader />
                    </TableCell>
                  </TableRow>
                ) : (
                  projects.map((project: any) => (
                    <TableRow key={project.id}>
                      <TableCell>
                        <Typography
                          variant="subtitle2"
                          fontWeight={600}
                          color="primary"
                          component="a"
                          onClick={() => navigate(`/compliance/projects/${project.id}`)}
                          style={{ cursor: 'pointer' }}
                        >
                          {project.name}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="caption">
                          <HumanizedDate dateString={project?.start_date} />
                          {project?.startDate}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Box display="flex" flexDirection="column">
                          <Typography variant="caption">
                            <HumanizedDate dateString={project?.end_date} />
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Typography variant="caption">
                          {project.isDisabled ? 'Disabled' : 'Active'}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Box display="flex" gap={1}>
                          <IconButton
                            color="primary"
                            onClick={() => navigate(`/compliance/projects/edit/${project.id}`)}
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton color="error" onClick={() => handleDelete(project.id)}>
                            <DeleteIcon />
                          </IconButton>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))
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
            onRowsPerPageChange={(e) => dispatch(fetchProjects(page))}
          />
        </Box>
        <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
          <DialogContent sx={{ padding: '50px' }}></DialogContent>
        </Dialog>

        <Dialog open={deleteDialogOpen} onClose={cancelDelete} maxWidth="xs" fullWidth>
          <DialogTitle>{t('compliance_projects.project_delete_title')}</DialogTitle>
          <DialogContent>
            <Typography>{t('compliance_projects.project_delete_message')}</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={cancelDelete} color="info">
              {t('compliance_projects.project_cancel')}
            </Button>
            <Button onClick={confirmDelete} color="primary" variant="contained">
              {t('compliance_projects.project_confirm')}
            </Button>
          </DialogActions>
        </Dialog>

        {snackbarOpen && (
          <SnackBarInfo
            color={snackbarSeverity}
            title={t('dashboard.operation_status')}
            message={snackbarMessage}
          />
        )}
      </Box>
    </DashboardCard>
  );
};

export default GiottoProjectsList;
