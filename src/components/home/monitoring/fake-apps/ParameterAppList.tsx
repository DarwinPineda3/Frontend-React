import React, { useState } from 'react';
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Box,
  Pagination,
  IconButton,
  Dialog,
  DialogContent,
  Chip
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DashboardCard from '../../../shared/DashboardCard';
import { useDispatch, useSelector } from 'src/store/Store';
import { fetchParameterApps, setPage } from 'src/store/sections/fake-app/fakeAppSlice';

// import CreateUpdateMalwareAnalysis from '../malware-analyses/MalwareAnalysisEdition';

interface ParameterAppListTableProps {
  onParameterAppClick: (parameterAppId: string) => void;
}



const MobileAppList: React.FC<ParameterAppListTableProps> = ({ onParameterAppClick }) => {
  const dispatch = useDispatch();
  const parameterApps = useSelector((state: any) => state.parameterAppsReducer.parameterApps);
  const currentPage = useSelector((state: any) => state.parameterAppsReducer.page);
  const totalPages = useSelector((state: any) => state.parameterAppsReducer.totalPages);
  const [editParameterApp, setEditParameterApp] = useState<null | any>(null); // State to hold the parameterApp being edited or created
  const [openDialog, setOpenDialog] = useState(false); // State to control the dialog/modal

  React.useEffect(() => {
    dispatch(fetchParameterApps(currentPage));
  }, [dispatch, currentPage]);

  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    if (page !== currentPage) {
      dispatch(setPage(page));
    }
  };

  const handleEditClick = (parameterApp: any = null) => {
    setEditParameterApp(parameterApp); // Set the selected parameterApp for editing, or null for new parameterApp creation
    setOpenDialog(true); // Open the dialog/modal
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditParameterApp(null); // Reset the edit state when closing
  };

  const addButton = <IconButton color="primary" onClick={() => handleEditClick(undefined)}><AddIcon /></IconButton>

  return (
    <DashboardCard title="Search result" subtitle="List mobiles apps found" action={addButton}>
      <Box>
        <TableContainer>
          <Table aria-label="parameterApp table" sx={{ whiteSpace: 'nowrap' }}>
            <TableHead>
              <TableRow>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={600}>
                    Parameter
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={600}>
                    Created on
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={600}>
                    Actions
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {parameterApps.map((parameterApp: any, index: number) => (
                <TableRow key={index}>
                  <TableCell>
                    <Typography
                      variant="subtitle2"
                      fontWeight={600}
                      color="primary"
                      component="a"
                      onClick={() => onParameterAppClick(parameterApp.id)}
                      style={{ cursor: 'pointer' }}
                    >
                      {parameterApp.parameter}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography fontWeight={400}>
                      {parameterApp.createdOn}
                    </Typography>
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
        {/* Edit/Create MalwareAnalysis Dialog/Modal */}
        <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth >
          <DialogContent sx={{ padding: '50px' }}>
            {/* Pass the onSubmit callback */}
            {/* <CreateUpdateMalwareAnalysis parameterApp={editParameterApp ?? undefined} onSubmit={handleFormSubmit} /> */}
          </DialogContent>
        </Dialog>
      </Box>


    </DashboardCard>
  );
};
export default MobileAppList;