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
  Button,
  Chip
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DashboardCard from '../../../shared/DashboardCard';
import { useDispatch, useSelector } from 'src/store/Store';
import { fetchAppScans, setPage } from 'src/store/sections/mobile-app/AppScanSlice';
import HumanizedDate from 'src/components/shared/HumanizedDate';
import CreateUpdateAppScan from '../mobile-apps/MobileAppEdition';
import { useTranslation } from 'react-i18next';


// import CreateUpdateMalwareAnalysis from '../malware-analyses/MalwareAnalysisEdition';

interface AppScanListTableProps {
  onAppScanClick: (AppScanId: number) => void;
}



const AppScanList: React.FC<AppScanListTableProps> = ({ onAppScanClick }) => {
  const dispatch = useDispatch();
  const appScans = useSelector((state: any) => state.appScansReducer.appScans);
  const currentPage = useSelector((state: any) => state.appScansReducer.page);
  const totalPages = useSelector((state: any) => state.appScansReducer.totalPages);
  const [editAppScan, setEditAppScan] = useState<null | any>(null); // State to hold the appScan being edited or created
  const [openDialog, setOpenDialog] = useState(false); // State to control the dialog/modal
  const [snackbarName, setSnackbarName] = useState('');
  const { t } = useTranslation();

  React.useEffect(() => {
    dispatch(fetchAppScans(currentPage));
  }, [dispatch, currentPage]);

  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    if (page !== currentPage) {
      dispatch(setPage(page));
    }
  };

  const handleEditClick = (appScan: any = null) => {
    setEditAppScan(appScan); // Set the selected appScan for editing, or null for new appScan creation
    setOpenDialog(true); // Open the dialog/modal
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditAppScan(null); // Reset the edit state when closing
  };
  const handleFormSubmit = (name: string) => {
    setSnackbarName(name);
  };

  const addButton = <IconButton color="primary" onClick={() => handleEditClick(undefined)}><AddIcon /></IconButton>

  return (
    <DashboardCard title="Apps" subtitle="List app scans found" action={addButton}>
      <Box>
        <TableContainer>
          <Table aria-label="appScan table" sx={{ whiteSpace: 'nowrap' }}>
            <TableHead>
              <TableRow>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={600}>
                    App
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
              {appScans.map((appScan: any, index: number) => (
                <TableRow key={index}>
                  <TableCell>
                    <Typography
                      variant="subtitle2"
                      fontWeight={600}
                      color="primary"
                      component="a"
                      onClick={() => onAppScanClick(appScan.id)}
                      style={{ cursor: 'pointer' }}
                    >
                      {appScan.name}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography fontWeight={400}>
                    <HumanizedDate dateString={appScan.createdOn} />
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      onClick={() => handleEditClick(appScan)}
                    >
                      {t("dashboard.edit")}
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
        {/* Edit/Create MalwareAnalysis Dialog/Modal*/}
        <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth >
          <DialogContent sx={{ padding: '50px' }}>
            {/* Pass the onSubmit callback */}
            <CreateUpdateAppScan appScan={editAppScan ?? undefined} onSubmit={handleFormSubmit} />
          </DialogContent>
        </Dialog>
      </Box>


    </DashboardCard>
  );
};
export default AppScanList;