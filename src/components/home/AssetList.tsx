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
import SnackBarInfo from 'src/layouts/full/shared/SnackBar/SnackBarInfo';
import { useDispatch, useSelector } from 'src/store/Store';
import { fetchAssets, setPage } from 'src/store/sections/AssetsSlice';
import DashboardCard from '../shared/DashboardCard';
import CreateUpdateAsset from './AssetEdition';

const AssetList = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const assets = useSelector((state: any) => state.assetsReducer.assets);
  const currentPage = useSelector((state: any) => state.assetsReducer.page);
  const totalPages = useSelector((state: any) => state.assetsReducer.totalPages);
  const [editAsset, setEditAsset] = useState<null | any>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'info' | 'warning' | 'error'>('success');

  React.useEffect(() => {
    dispatch(fetchAssets(currentPage));
  }, [dispatch, currentPage]);

  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    if (page !== currentPage) {
      dispatch(setPage(page));
    }
  };

  const handleEditClick = (asset: any = null) => {
    setEditAsset(asset);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditAsset(null);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
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
      title={t("dashboard.asset_list") as string}
      subtitle={t("dashboard.list_of_available_assets") as string}
      action={addButton}
    >
      <Box>
        <TableContainer>
          <Table aria-label="asset table" sx={{ whiteSpace: 'nowrap' }}>
            <TableHead>
              <TableRow>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={600}>
                    {t("dashboard.name")}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={600}>
                    {t("dashboard.ip_address")}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={600}>
                    {t("dashboard.domain")}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={600}>
                    {t("dashboard.url")}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={600}>
                    {t("dashboard.actions")}
                  </Typography>
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
                      {asset.domain}
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

        <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
          <DialogContent sx={{ padding: '50px' }}>
            <CreateUpdateAsset asset={editAsset ?? undefined} onSubmit={handleFormSubmit} />
          </DialogContent>
        </Dialog>

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

export default AssetList;
