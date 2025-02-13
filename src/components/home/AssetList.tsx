import AddIcon from '@mui/icons-material/Add';
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
  Typography
} from '@mui/material';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import SnackBarInfo from 'src/layouts/full/shared/SnackBar/SnackBarInfo';
import { useDispatch, useSelector } from 'src/store/Store';
import { fetchAssets, removeAsset, setError, setMessage, setPage } from 'src/store/sections/AssetsSlice';
import NoDataAvailable from 'src/views/general/NoDataAvailable';
import DashboardCard from '../shared/DashboardCard';
import Loader from '../shared/Loader/Loader';
import CreateUpdateAsset from './AssetEdition';
const AssetList = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { assets, error, message } = useSelector((state: any) => state.assetsReducer);
  const currentPage = useSelector((state: any) => state.assetsReducer.page);
  const totalPages = useSelector((state: any) => state.assetsReducer.totalPages);
  const pageSize = useSelector((state: any) => state.assetsReducer.pageSize);
  const loading = useSelector((state: any) => state.assetsReducer.loading);
  const [editAsset, setEditAsset] = useState<null | any>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [assetToDelete, setAssetToDelete] = useState<null | number>(null);

  React.useEffect(() => {
    dispatch(fetchAssets(currentPage, pageSize));
  }, [dispatch, currentPage]);

  const handlePageChange = (event: React.MouseEvent<HTMLButtonElement> | null, page: number) => {
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
    dispatch(setMessage(null));
    dispatch(setError(null));
  };


  const handleDeleteClick = (assetId: number) => {
    setAssetToDelete(assetId);
    setDeleteDialogOpen(true);
  };
  const confirmDelete = () => {
    if (assetToDelete !== null) {
      dispatch(removeAsset(String(assetToDelete)));
      setMessage(t("dashboard.asset_deleted_successfully")!);
    }
    setDeleteDialogOpen(false);
    setAssetToDelete(null);
  };

  const cancelDelete = () => {
    setDeleteDialogOpen(false);
    setAssetToDelete(null);
  };
  const addButton = (
    <IconButton color="primary" onClick={() => navigate('/home/assets/create')}>
      <AddIcon />
    </IconButton>
  );


  return (
    <>
      <DashboardCard
        title={t("dashboard.asset_list") as string}
        subtitle={t("dashboard.list_of_available_assets") as string}
        action={addButton}
      >
        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" height="200px">
            <Loader />
          </Box>
        ) : (
          <Box>
            <TableContainer sx={{ overflowX: 'auto' }}>
              <Table aria-label="asset table">
                <TableHead>
                  <TableRow>
                    <TableCell>{t("dashboard.name")}</TableCell>
                    <TableCell>{t("dashboard.ip_address")}</TableCell>
                    <TableCell>{t("dashboard.domain")}</TableCell>
                    <TableCell>{t("dashboard.url")}</TableCell>
                    <TableCell>{t("dashboard.actions")}</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {assets.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5}>
                        <NoDataAvailable entityType="asset" formUrl="/home/assets/create" />
                      </TableCell>
                    </TableRow>
                  ) : (
                    assets.map((asset: any, index: number) => (
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
                        <TableCell sx={{ wordBreak: 'break-word', maxWidth: 150 }}>
                          <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                            {asset.domain}
                          </Typography>
                        </TableCell>
                        <TableCell sx={{ wordBreak: 'break-word', maxWidth: 150 }}>
                          <Typography variant="subtitle2">{asset.url}</Typography>
                        </TableCell>
                        <TableCell>
                          <Box display="flex" gap={1}>
                            <Button
                              variant="contained"
                              color="primary"
                              size="small"
                              onClick={() => handleEditClick(asset)}
                            >
                              {t("dashboard.edit")}
                            </Button>
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
              count={totalPages * pageSize}
              rowsPerPage={pageSize}
              page={currentPage - 1}
              onPageChange={(e, page) => handlePageChange(e, page + 1)}
              onRowsPerPageChange={(e) => dispatch(fetchAssets(currentPage, e.target.value))}
            />
            <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
              <DialogContent sx={{ padding: '50px' }}>
                <CreateUpdateAsset asset={editAsset ?? undefined} onSubmit={() => setOpenDialog(false)} />
              </DialogContent>
            </Dialog>
            {/* Delete Confirmation Dialog */}
            <Dialog open={deleteDialogOpen} onClose={cancelDelete} maxWidth="xs" fullWidth>
              <DialogTitle>{t("dashboard.delete_asset_confirmation")}</DialogTitle>
              <DialogContent>
                <Typography>{t("dashboard.are_you_sure_to_delete_asset")}</Typography>
              </DialogContent>
              <DialogActions>
                <Button onClick={cancelDelete} color="info">
                  {t("dashboard.cancel")}
                </Button>
                <Button onClick={confirmDelete} color="primary" variant="contained">
                  {t("dashboard.confirm")}
                </Button>
              </DialogActions>
            </Dialog>

            {(message || error) ? (
              <SnackBarInfo
                color={message != null ? 'success' : 'error'}
                title={t("dashboard.operation_status")}
                message={message ?? error}
                onClose={() => handleSnackbarClose()}
              />
            ) : <> </>}
          </Box>
        )}
      </DashboardCard>
    </>
  );
};

export default AssetList;
