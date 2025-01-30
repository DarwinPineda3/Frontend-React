import { ArrowBack } from "@mui/icons-material";
import { Box, Breadcrumbs, Dialog, DialogContent, IconButton, Link, Typography, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
// import { useNavigate } from "react-router";
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import PageContainer from "src/components/container/PageContainer";
import DashboardCard from "src/components/shared/DashboardCard";
import SnackBarInfo from "src/layouts/full/shared/SnackBar/SnackBarInfo";
import { useDispatch, useSelector } from "src/store/Store";
import CreateUpdateGiottoAsset from "./createUpdateGiottoAsset";

const GiottoAssetsCreate: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { error, loading } = useSelector((state: any) => state.GiottoAssetsReducer);
  const dispatch = useDispatch();
  const [myFiles, setMyFiles] = useState([]);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'info' | 'warning' | 'error'>('success');
  const [openDialog, setOpenDialog] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [editAsset, setEditAsset] = useState<null | any>(null);
  const handleFormSubmit = (message: string, severity: 'success' | 'info' | 'warning' | 'error') => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(false);
    setTimeout(() => {
      setSnackbarOpen(true);
    }, 0);
    handleCloseDialog();
  };

  useEffect(() => {
    if (error) {
      setSnackbarOpen(true);
    }
  }
    , [error]);


  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditAsset(null);
  };

  return (
    <PageContainer title={String(t('compliance_menu.compliance_assets'))}>
      <Box mb={2}>
        <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
          <DialogContent sx={{ padding: '50px' }}>
            <CreateUpdateGiottoAsset asset={editAsset ?? undefined} onSubmit={handleFormSubmit} />
          </DialogContent>
        </Dialog>

        <Box display="flex" alignItems="center" mt={2}>
          <IconButton onClick={() => navigate(-1)} color="primary">
            <ArrowBack />
          </IconButton>
          <Breadcrumbs aria-label="breadcrumb">
            <Link component={RouterLink} color="inherit" to="/compliance/assets">
              {t('compliance_menu.compliance')}
            </Link>
            <Link component={RouterLink} color="inherit" to="/compliance/assets">
              {t('compliance_menu.compliance_assets')}
            </Link>
            <Typography color="textPrimary">{t('dashboard.create')}</Typography>
          </Breadcrumbs>
        </Box>
      </Box>
      <Box>

        <DashboardCard
        >
          <CreateUpdateGiottoAsset asset={editAsset ?? undefined} onSubmit={handleFormSubmit} />
        </DashboardCard>
        {snackbarOpen && (
          <SnackBarInfo
            color={snackbarSeverity}
            title={t("dashboard.operation_status")}
            message={error}
          />
        )}
      </Box>
    </PageContainer>
  );
};

export default GiottoAssetsCreate;