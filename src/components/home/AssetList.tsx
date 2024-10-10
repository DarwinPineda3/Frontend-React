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
  Button,
  IconButton,
  Dialog,
  DialogContent,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DashboardCard from '../shared/DashboardCard';
import { useDispatch, useSelector } from 'src/store/Store';
import { fetchAssets, setPage } from 'src/store/sections/AssetsSlice';
import CreateUpdateAsset from './AssetEdition';
import SnackBarInfo from 'src/layouts/full/shared/SnackBar/SnackBarInfo';

const AssetList = () => {
  const dispatch = useDispatch();
  const assets = useSelector((state: any) => state.assetsReducer.assets);
  const currentPage = useSelector((state: any) => state.assetsReducer.page);
  const totalPages = useSelector((state: any) => state.assetsReducer.totalPages);
  const [editAsset, setEditAsset] = useState<null | any>(null); // State to hold the asset being edited or created
  const [openDialog, setOpenDialog] = useState(false); // State to control the dialog/modal
  const [snackbarOpen, setSnackbarOpen] = useState(false); // State to control the snackbar
  const [snackbarMessage, setSnackbarMessage] = useState(''); // Message for the snackbar
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'info' | 'warning' | 'error'>('success'); // Snackbar severity

  React.useEffect(() => {
    dispatch(fetchAssets(currentPage));
  }, [dispatch, currentPage]);

  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    if (page !== currentPage) {
      dispatch(setPage(page));
    }
  };

  const handleEditClick = (asset: any = null) => {
    setEditAsset(asset); // Set the selected asset for editing, or null for new asset creation
    setOpenDialog(true); // Open the dialog/modal
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditAsset(null); // Reset the edit state when closing
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  // Callback when the asset is created or updated
  const handleFormSubmit = (message: string, severity: 'success' | 'info' | 'warning' | 'error') => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(false); // Ensure snackbar is reset
    setTimeout(() => {
      setSnackbarOpen(true); // Show the snackbar after resetting it
    }, 0);
    handleCloseDialog(); // Close the dialog after submission
  };
  
  const addButton =<IconButton color="primary" onClick={() => handleEditClick(undefined)}><AddIcon /></IconButton>

  return (
    <DashboardCard title="Asset List" subtitle="List of Available Assets" action={addButton}>
      <Box>    
        <TableContainer>
          <Table aria-label="asset table" sx={{ whiteSpace: 'nowrap' }}>
            <TableHead>
              <TableRow>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={600}>
                    Name
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={600}>
                    IP Address
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={600}>
                    Domain
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={600}>
                    URL
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={600}>
                    Actions
                  </Typography>
                  {/* Add New Asset Button */}

                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {assets.map((asset: any, index: number) => (
                <TableRow key={index}>
                  <TableCell>
                    <Typography variant="subtitle2" fontWeight={600}>
                      {asset.name}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                      {asset.ip}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                      {asset.dominio}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2">{asset.url}</Typography>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      onClick={() => handleEditClick(asset)}
                    >
                      Edit
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
        {/* Edit/Create Asset Dialog/Modal */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth >
        <DialogContent sx={{ padding: '50px' }}>
          <CreateUpdateAsset asset={editAsset ?? undefined} onSubmit={handleFormSubmit} /> {/* Pass the onSubmit callback */}
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
      </Box>

      
    </DashboardCard>
  );
};

export default AssetList;
