import AddIcon from '@mui/icons-material/Add';
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  IconButton,
  Pagination,
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
import ConfirmDeleteModal from 'src/components/modal/ConfirmDeleteModal';
import SnackBarInfo from 'src/layouts/full/shared/SnackBar/SnackBarInfo';
import { useDispatch, useSelector } from 'src/store/Store';
import {
  deleteParameter,
  fetchParameters,
  setPage,
} from 'src/store/sections/cyber-guard/ParametersSlice';
import { ParameterCyberGuardType } from 'src/types/cyber-guard/parameters/parameter';
import DashboardCard from '../../../../shared/DashboardCard';
import CreateUpdateParameter from './../../../monitoring/cyber-guard/parameters/ParameterEdition';

const ParameterList = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const parameters = useSelector((state: any) => state.parametersReducer.parameters);
  const currentPage = useSelector((state: any) => state.parametersReducer.page);
  const totalPages = useSelector((state: any) => state.parametersReducer.totalPages);
  const [editParameter, setEditParameter] = useState<null | any>(null); // State to hold the parameter being edited or created
  const [openDialog, setOpenDialog] = useState(false); // State to control the dialog/modal
  const [snackbarOpen, setSnackbarOpen] = useState(false); // State to control the snackbar
  const [snackbarMessage, setSnackbarMessage] = useState(''); // Message for the snackbar
  const [snackbarSeverity, setSnackbarSeverity] = useState<
    'success' | 'info' | 'warning' | 'error'
  >('success'); // Snackbar severity
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [parameterToDelete, setParameterToDelete] = useState<ParameterCyberGuardType | null>(null);

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
      dispatch(deleteParameter(parameterToDelete.id));
      setParameterToDelete(null);
      setOpenModal(false);
      handleFormSubmit(
        `${t('monitoring.parameter_deleted_successfully')}`,
        'success',
      );
    }
  };

  React.useEffect(() => {
    dispatch(fetchParameters(currentPage));
  }, [dispatch, currentPage]);

  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    if (page !== currentPage) {
      dispatch(setPage(page));
    }
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
              {parameters.map((parameter: any, index: number) => (
                <TableRow key={index}>
                  <TableCell>
                    <Typography variant="subtitle2" fontWeight={600}>
                      {parameter.parameter}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                      {t(`monitoring.${parameter.parameter_type.toLowerCase()}`).toUpperCase()}
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
      </Box>
    </DashboardCard>
  );
};

export default ParameterList;
