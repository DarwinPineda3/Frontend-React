import AddIcon from '@mui/icons-material/Add';
import { Box, Button, Dialog, DialogContent, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useTranslation } from 'react-i18next';
import DashboardCard from "src/components/shared/DashboardCard";
import HumanizedDate from "src/components/shared/HumanizedDate";
import Loader from "src/components/shared/Loader/Loader";
import SnackBarInfo from 'src/layouts/full/shared/SnackBar/SnackBarInfo';
import { fetchAssets, setLoading } from "src/store/sections/compliance/giotoAssetsSlice";
import { useDispatch, useSelector } from "src/store/Store";
import CreateUpdateGiottoAsset from './createUpdateGiottoAsset';

interface GiottoAssetsListProps {
  onScanClick: (scanId: string) => void;
}


const GiottoAssetsList: React.FC<GiottoAssetsListProps> = ({ onScanClick }) => {
  const { t } = useTranslation();
  const {
    assets, page, pageSize, loading, totalItemsAmount
  } = useSelector((state: any) => state.GiottoAssetsReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await dispatch(fetchAssets(page));
      setLoading(false);
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
      dispatch(fetchAssets(askedPage));
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
                  <TableCell>Name</TableCell>
                  <TableCell>Network Address</TableCell>
                  <TableCell>Company Name</TableCell>
                  <TableCell>Creation Date</TableCell>
                  <TableCell>Last Keep Alive</TableCell>
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
                  assets.map((asset: any) => (
                    <TableRow key={asset.id}>
                      <TableCell>
                        {asset.name}
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
                          <HumanizedDate dateString={asset.lastKeepAlive} />
                          <Typography variant="caption">
                            {new Date(asset.lastKeepAlive).toLocaleString()}
                          </Typography>
                        </Box>
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

export default GiottoAssetsList;
