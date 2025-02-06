import AddIcon from '@mui/icons-material/Add';
import {
  Box,
  Button,
  Dialog,
  DialogContent,
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
import ConfirmDeleteModal from 'src/components/modal/ConfirmDeleteModal';
import Loader from 'src/components/shared/Loader/Loader';
import SnackBarInfo from 'src/layouts/full/shared/SnackBar/SnackBarInfo';
import { useDispatch, useSelector } from 'src/store/Store';
import {
  fetchParameters,
  removeParameter,
  setPage,
  setPageSize,
} from 'src/store/sections/cyber-guard/ParametersSlice';
import { ParameterCyberGuardType } from 'src/types/cyber-guard/parameters/parameter';
import DashboardCard from '../../../../shared/DashboardCard';
import CreateUpdateParameter from './../../../monitoring/cyber-guard/parameters/ParameterEdition';
import NoDataAvailable from 'src/views/general/NoDataAvailable';

const ParameterList = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const parameters = useSelector((state: any) => state.parametersReducer.parameters);
  const currentPage = useSelector((state: any) => state.parametersReducer.page);
  const totalPages = useSelector((state: any) => state.parametersReducer.totalPages);
  const pageSize = useSelector((state: any) => state.parametersReducer.pageSize);
  const [editParameter, setEditParameter] = useState<null | any>(null); // State to hold the parameter being edited or created
  const [openDialog, setOpenDialog] = useState(false); // State to control the dialog/modal
  const [snackbarOpen, setSnackbarOpen] = useState(false); // State to control the snackbar
  const [snackbarMessage, setSnackbarMessage] = useState(''); // Message for the snackbar
  const [snackbarSeverity, setSnackbarSeverity] = useState<
    'success' | 'info' | 'warning' | 'error'
  >('success'); // Snackbar severity
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [parameterToDelete, setParameterToDelete] = useState<ParameterCyberGuardType | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleDeleteClick = (parameter: ParameterCyberGuardType) => {
    setParameterToDelete(parameter);
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
    setParameterToDelete(null);
  };

  const handleConfirmDelete = () => {
    if (parameterToDelete) {
      dispatch(removeParameter(parameterToDelete?.id!));
      setParameterToDelete(null);
      setOpenModal(false);
      handleFormSubmit(`${t('monitoring.parameter_deleted_successfully')}`, 'success');
    }
  };

  React.useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      await dispatch(fetchParameters(currentPage, pageSize));
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

  const handleEditClick = (parameter: any = null) => {
    setEditParameter(parameter); // Set the selected parameter for editing, or null for new parameter creation
    setOpenDialog(true); // Open the dialog/modal
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditParameter(null); // Reset the edit state when closing
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  // Callback when the parameter is created or updated
  const handleFormSubmit = (
    message: string,
    severity: 'success' | 'info' | 'warning' | 'error',
  ) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(false); // Ensure snackbar is reset
    setTimeout(() => {
      setSnackbarOpen(true); // Show the snackbar after resetting it
    }, 0);
    handleCloseDialog(); // Close the dialog after submission
  };

  const addButton = (
    <IconButton color="primary" onClick={() => handleEditClick(undefined)}>
      <AddIcon />
    </IconButton>
  );

  return (
    <DashboardCard
      title={t('monitoring.parameter_list') as string}
      subtitle={t('monitoring.list_of_available_parameters') as string}
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
              <Table aria-label="parameter table" sx={{ whiteSpace: 'nowrap' }}>
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <Typography variant="subtitle2" fontWeight={600}>
                        {t('monitoring.parameter')}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle2" fontWeight={600}>
                        {t('monitoring.parameter_type')}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography variant="subtitle2" fontWeight={600}>
                        {t('monitoring.actions')}
                      </Typography>
                      {/* Add New Parameter Button */}
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {parameters.length > 0 ? (
                    parameters.map((parameter: any, index: number) => (
                      <TableRow key={index}>
                        <TableCell>
                          <Typography variant="subtitle2" fontWeight={600}>
                            {parameter.parameter}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                            {t(
                              `monitoring.${parameter.parameter_type.toLowerCase()}`,
                            ).toUpperCase()}
                          </Typography>
                        </TableCell>
                        <TableCell align="center">
                          <Button
                            variant="contained"
                            color="primary"
                            size="small"
                            onClick={() => handleEditClick(parameter)}
                          >
                            {t('monitoring.edit_parameter')}
                          </Button>
                          <Button
                            variant="contained"
                            color="error"
                            size="small"
                            sx={{ ml: 2 }}
                            onClick={() => handleDeleteClick(parameter)}
                          >
                            {t('monitoring.delete_parameter')}
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={4}>
                       <NoDataAvailable entityType="parameter"/>
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

            {/* Edit/Create Parameter Dialog/Modal */}
            <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
              <DialogContent sx={{ padding: '50px' }}>
                <CreateUpdateParameter
                  parameter={editParameter ?? undefined}
                  onSubmit={handleFormSubmit}
                />{' '}
                {/* Pass the onSubmit callback */}
              </DialogContent>
            </Dialog>

            {/* Snackbar */}
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

export default ParameterList;
