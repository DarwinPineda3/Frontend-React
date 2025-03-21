import { Delete, DesktopAccessDisabled, EditRounded, Monitor, Refresh } from '@mui/icons-material';
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
  Tooltip,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import DashboardCard from 'src/components/shared/DashboardCard';
import HumanizedDate from 'src/components/shared/HumanizedDate';
import Loader from 'src/components/shared/Loader/Loader';
import SnackBarInfo from 'src/layouts/full/shared/SnackBar/SnackBarInfo';
import {
  fetchAssets,
  removeAsset,
  requestRestartSession,
  setLoading,
} from 'src/store/sections/compliance/giotoAssetsSlice';
import { useDispatch, useSelector } from 'src/store/Store';
import CreateUpdateGiottoAsset from './createUpdateGiottoAsset';
import NoDataAvailable from 'src/views/general/NoDataAvailable';

interface GiottoAssetsListProps {
  onScanClick: (scanId: string) => void;
}

const GiottoAssetsList: React.FC<GiottoAssetsListProps> = ({ onScanClick }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { assets, page, pageSize, loading, totalItemsAmount, error } = useSelector(
    (state: any) => state.GiottoAssetsReducer,
  );
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await dispatch(fetchAssets(page));
      setLoading(false);
    };
    fetchData();
  }, [dispatch, page]);

  useEffect(() => {
    if (error) {
      setSnackbarOpen(true);
      setSnackbarSeverity('error');
    }
  }, [error]);

  const [editAsset, setEditAsset] = useState<null | any>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<
    'success' | 'info' | 'warning' | 'error'
  >('success');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [assetToDelete, setAssetToDelete] = useState<null | string>(null);

  const handlePageChange = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    askedPage: number,
  ) => {
    if (page !== askedPage) {
      dispatch(fetchAssets(askedPage));
    }
  };

  const isAssetAlive = (asset: any) => {
    const fiveMinutesAgo = new Date(new Date().getTime() - 5 * 60 * 1000);
    return asset.lastKeepAlive && new Date(asset.lastKeepAlive) > fiveMinutesAgo;
  };

  const handleEditClick = (asset: any = null) => {
    setEditAsset(asset);
    setOpenDialog(true);
  };

  const handleDeleteClick = (asset: any) => {
    setAssetToDelete(asset?.id);
    setDeleteDialogOpen(true);
  };

  const cancelDelete = () => {
    setDeleteDialogOpen(false);
    setAssetToDelete(null);
  };

  const confirmDelete = async () => {
    if (assetToDelete !== null) {
      try {
        await dispatch(removeAsset(assetToDelete));
        setSnackbarMessage(t('giotto.assets.asset_removed') || '');
        setSnackbarSeverity('success');
        setSnackbarOpen(true);
      } catch (error: any) {
        setSnackbarMessage(error.error || '');
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
      }
    }
    setDeleteDialogOpen(false);
    setAssetToDelete(null);
  };

  const handleRefreshTokenClick = (asset: any) => {
    const id = asset.id;
    dispatch(requestRestartSession(id));
    setSnackbarMessage(t('giotto.assets.asset_session_refresh') || '');
    setSnackbarSeverity('info');
    setSnackbarOpen(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditAsset(null);
  };

  const handleFormSubmit = (
    message: string,
    severity: 'success' | 'info' | 'warning' | 'error',
  ) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(false);
    setTimeout(() => {
      setSnackbarOpen(true);
    }, 0);
    handleCloseDialog();
  };

  const addButton = (
    <Box>
      <IconButton color="primary" onClick={() => navigate('/compliance/assets/create')}>
        <AddIcon />
      </IconButton>
      <Box display="inline-block" width="10px" />
      <Button
        variant="contained"
        color="primary"
        size="small"
        onClick={() => navigate('/compliance/assets/import')}
      >
        {t('giotto.assets.bulk_import') || ''}
      </Button>
    </Box>
  );

  return (
    <>
      <DashboardCard
        title={t('compliance.assets_description') ?? ''}
        subtitle={t('compliance.assets_info') ?? ''}
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
                    <TableCell>{t('giotto.assets.name') || ''}</TableCell>
                    <TableCell>{t('giotto.assets.network_address') || ''}</TableCell>
                    <TableCell>{t('giotto.assets.company_name') || ''}</TableCell>
                    <TableCell>{t('giotto.assets.creation_date') || ''}</TableCell>
                    <TableCell>{t('giotto.assets.last_keep_alive') || ''}</TableCell>
                    <TableCell>{t('giotto.assets.actions') || ''}</TableCell>
                  </TableRow>
                </TableHead>
                {/* Table body */}
                <TableBody>
                  {loading ? (
                    <TableRow>
                      <TableCell colSpan={6}>
                        <Box
                          display="flex"
                          justifyContent="center"
                          alignItems="center"
                          height="100px"
                        >
                          <Loader />
                        </Box>
                      </TableCell>
                    </TableRow>
                  ) : assets.length > 0 ? (
                    assets.map((asset: any) => (
                      <TableRow key={asset.id}>
                        <TableCell>
                          <Box display="flex" gap={1}>
                            {isAssetAlive(asset) ? (
                              <Monitor color={'success'} />
                            ) : (
                              <DesktopAccessDisabled color={'error'} />
                            )}
                            <Typography variant="subtitle1">{asset.name}</Typography>
                          </Box>
                        </TableCell>
                        <TableCell>{asset.networkAddress}</TableCell>
                        <TableCell>{asset.companyName}</TableCell>
                        <TableCell>
                          <Box display="flex" flexDirection="column">
                            <HumanizedDate dateString={asset.creationDate} />
                            <Typography variant="caption">
                              {new Date(asset.creationDate).toLocaleString()}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Box display="flex" flexDirection="column">
                            {asset.lastKeepAlive ? (
                              <HumanizedDate dateString={asset.lastKeepAlive} />
                            ) : (
                              'None'
                            )}
                            {asset.lastKeepAlive && (
                              <Typography variant="caption">
                                {new Date(asset.lastKeepAlive).toLocaleString()}
                              </Typography>
                            )}
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Box display="flex" gap={1}>
                            <IconButton color="primary" onClick={() => handleEditClick(asset)}>
                              <EditRounded />
                            </IconButton>
                            <IconButton color="primary" onClick={() => handleDeleteClick(asset)}>
                              <Delete />
                            </IconButton>
                            <Tooltip title="Restart Session">
                              <IconButton
                                color="primary"
                                onClick={() => handleRefreshTokenClick(asset)}
                              >
                                <Refresh />
                              </IconButton>
                            </Tooltip>
                          </Box>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} align="center">
                      <NoDataAvailable
                        entityType="asset"
                        formUrl='/compliance/assets/create'
                      />
                      </TableCell>
                    </TableRow>
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
              onRowsPerPageChange={(e) => dispatch(fetchAssets(page))}
            />
          </Box>
          <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
            <DialogContent sx={{ padding: '50px' }}>
              <CreateUpdateGiottoAsset asset={editAsset ?? undefined} onSubmit={handleFormSubmit} />
            </DialogContent>
          </Dialog>

          <Dialog open={deleteDialogOpen} onClose={cancelDelete} maxWidth="xs" fullWidth>
            <DialogTitle>{t('giotto.assets.delete_asset') || ''}</DialogTitle>
            <DialogContent>
              <Typography>{t('giotto.assets.confirm_delete') || ''}</Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={cancelDelete} color="info">
                {t('giotto.assets.cancel') || ''}
              </Button>
              <Button onClick={confirmDelete} color="primary" variant="contained">
                {t('giotto.assets.confirm') || ''}
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
    </>
  );
};

export default GiottoAssetsList;
