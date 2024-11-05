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
import { fetchMobileApps, setPage } from 'src/store/sections/mobile-app/MobileAppSlice';
import AppleIcon from '@mui/icons-material/Apple';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone'
import AndroidIcon from '@mui/icons-material/Android';
import { ListItemIcon, ListItem, List, styled, ListItemText, useTheme } from '@mui/material';

// import CreateUpdateMalwareAnalysis from '../malware-analyses/MalwareAnalysisEdition';

interface MobileAppListTableProps {
  onMobileAppClick: (malwareAnalysisId: number) => void;
}



const MobileAppList: React.FC<MobileAppListTableProps> = ({ onMobileAppClick }) => {
  const dispatch = useDispatch();
  const mobileApps = useSelector((state: any) => state.mobileAppsReducer.mobileApps);
  const currentPage = useSelector((state: any) => state.mobileAppsReducer.page);
  const totalPages = useSelector((state: any) => state.mobileAppsReducer.totalPages);
  const [editMobileApp, setEditMobileApp] = useState<null | any>(null); // State to hold the mobileApp being edited or created
  const [openDialog, setOpenDialog] = useState(false); // State to control the dialog/modal

  React.useEffect(() => {
    dispatch(fetchMobileApps(currentPage));
  }, [dispatch, currentPage]);

  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    if (page !== currentPage) {
      dispatch(setPage(page));
    }
  };

  const handleEditClick = (mobileApp: any = null) => {
    setEditMobileApp(mobileApp); // Set the selected mobileApp for editing, or null for new mobileApp creation
    setOpenDialog(true); // Open the dialog/modal
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditMobileApp(null); // Reset the edit state when closing
  };

  const addButton = <IconButton color="primary" onClick={() => handleEditClick(undefined)}><AddIcon /></IconButton>

  return (
    <DashboardCard title="Search result" subtitle="List mobiles apps found" action={addButton}>
      <Box>
        <TableContainer>
          <Table aria-label="mobileApp table" sx={{ whiteSpace: 'nowrap' }}>
            <TableHead>
              <TableRow>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={600}>
                    App Name
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={600}>
                    Source
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={600}>
                    State
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={600}>
                    Version
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={600}>
                    Score
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={600}>
                    Downloads
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {mobileApps.map((mobileApp: any, index: number) => (
                <TableRow key={index}>
                  <TableCell>
                    <Typography
                      variant="subtitle2"
                      fontWeight={600}
                      color="primary"
                      component="a"
                      onClick={() => onMobileAppClick(mobileApp.id)}
                      style={{ cursor: 'pointer' }}
                    >
                      {mobileApp.appName}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                      {mobileApp.source === 'Play Store' && <AndroidIcon />}
                      {mobileApp.source === 'App Store' && <AppleIcon />}
                      {!['Play Store', 'App Store'].includes(mobileApp.source) && (
                        mobileApp.source
                      )}
                      
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2" fontWeight={600} color={
                      mobileApp.score > 7 ? 'Primary' :
                        mobileApp.score > 3.9 ? '#FFA500' :
                          mobileApp.score > 0 ? 'green' :
                            'green'
                    }>
                      
                      <Chip
                        label={mobileApp.score > 7 ? 'Very risk' :
                          mobileApp.score > 3.9 ? 'Risky' :
                            mobileApp.score > 0 ? 'Low' : 'No Risk'}
                        color="secondary"
                        size="small"
                        style={{
                          backgroundColor:
                            mobileApp.score > 7 ? 'Primary' :
                              mobileApp.score > 3.9 ? 'orange' :
                                mobileApp.score > 0 ? 'green' :
                                  'green',
                          color: 'white'
                        }}
                          />
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography fontWeight={400}>
                      {mobileApp.version}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2">
                      <Chip
                        label={mobileApp.score}
                        color="secondary"
                        size="small"
                        style={{
                          backgroundColor:
                            mobileApp.score > 7 ? 'primary' :
                              mobileApp.score > 3.9 ? 'orange' :
                                mobileApp.score > 0 ? 'green' :
                                  'green',
                          color: 'white'
                        }}
                      />
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2">
                      {mobileApp.details.downloads}
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
            {/* <CreateUpdateMalwareAnalysis mobileApp={editMobileApp ?? undefined} onSubmit={handleFormSubmit} /> */}
          </DialogContent>
        </Dialog>
      </Box>


    </DashboardCard>
  );
};
export default MobileAppList;