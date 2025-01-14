import { Delete, PlayCircleOutline, SettingsSuggest, Visibility } from '@mui/icons-material';
import AddIcon from '@mui/icons-material/Add';
import { Box, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useTranslation } from 'react-i18next';
import DashboardCard from "src/components/shared/DashboardCard";
import HumanizedDate from "src/components/shared/HumanizedDate";
import Loader from "src/components/shared/Loader/Loader";
import SnackBarInfo from 'src/layouts/full/shared/SnackBar/SnackBarInfo';
import { fetchExecutions, TemplateExecution } from 'src/store/sections/compliance/giotoExecutionsSlice';
import { useDispatch, useSelector } from "src/store/Store";

interface GiottoExecutionListProps {
  onScanClick: (scanId: string) => void;
}


const GiottoExecutionList: React.FC<GiottoExecutionListProps> = ({ onScanClick }) => {
  const { t } = useTranslation();
  const {
    executions, page, pageSize, loading, totalItemsAmount
  } = useSelector((state: any) => state.GiottoExecutionsReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchExecutions(page));
    };
    fetchData();
  }, [dispatch, page]);

  const [editAsset, setEditAsset] = useState<null | any>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'info' | 'warning' | 'error'>('success');


  const handlePageChange = (event: React.MouseEvent<HTMLButtonElement> | null, askedPage: number) => {
    if (page !== askedPage) {
      dispatch(fetchExecutions(askedPage));
    }
  };

  const handleEditClick = (asset: any = null) => {
    onScanClick(asset.id);
  };

  const handleDeleteClick = (asset: any) => {
    setEditAsset(asset);
    setOpenDialog(true);
  }

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditAsset(null);
  };

  const handleFormSubmit = (message: string, severity: 'success' | 'info' | 'warning' | 'error') => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(false);
    setTimeout(() => {
      setSnackbarOpen(true);
    }, 0);
    handleCloseDialog();
  };


  const addButton = (
    <IconButton color="primary" onClick={() => handleEditClick(undefined)}>
      <AddIcon />
    </IconButton>
  );

  return (
    <DashboardCard
      title={t('compliance.executions_description') ?? ''}
      subtitle={t('compliance.executions_info') ?? ''}
    //action={addButton}
    >
      <Box>
        <Box>
          <TableContainer>
            {/* Table view */}
            <Table>
              {/* Table head */}
              <TableHead>
                <TableRow>
                  <TableCell>Creation Date</TableCell>
                  <TableCell>Execution Date</TableCell>
                  <TableCell>Process</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>User</TableCell>
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
                  executions.map((execution: TemplateExecution) => (
                    <TableRow key={execution.id}>
                      <TableCell>
                        <Box display="flex" flexDirection="column">
                          <HumanizedDate dateString={execution.creationDate} />
                          <Typography variant="caption">
                            {new Date(execution.creationDate).toLocaleString()}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Box display="flex" flexDirection="column">
                          {execution.executionDate ? (
                            <>
                              <HumanizedDate dateString={execution.executionDate} />
                              <Typography variant="caption">
                                {new Date(execution.executionDate).toLocaleString()}
                              </Typography>
                            </>
                          ) : (
                            <Typography variant="caption">
                              {t('never')}
                            </Typography>
                          )}
                        </Box>
                      </TableCell>
                      <TableCell>
                        {execution.processToExecute}
                      </TableCell>
                      <TableCell>
                        {execution.status}
                      </TableCell>
                      <TableCell>
                        {execution.userRequesting}
                      </TableCell>
                      <TableCell>
                        <Box display="flex" gap={1}>
                          <IconButton
                            color="primary"
                            about='Play'
                            onClick={() => handleEditClick(execution)}
                          >
                            <PlayCircleOutline />
                          </IconButton>
                          <IconButton
                            color="primary"
                            onClick={() => handleEditClick(execution)}
                          >
                            <SettingsSuggest />
                          </IconButton>
                          <IconButton
                            color="primary"
                            onClick={() => handleEditClick(execution)}
                          >
                            <Visibility />
                          </IconButton>
                          <IconButton
                            color="primary"
                            onClick={() => handleEditClick(execution)}
                          >
                            <Delete />
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
            onRowsPerPageChange={(e) => dispatch(fetchExecutions(page))}
          />
        </Box>
        {snackbarOpen && (
          <SnackBarInfo
            color={snackbarSeverity}
            title={t("dashboard.operation_status")}
            message={snackbarMessage}
          />
        )}
      </Box>

    </DashboardCard>

  );
};

export default GiottoExecutionList;
