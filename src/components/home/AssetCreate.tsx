import { ArrowBack } from "@mui/icons-material";
import { Box, Breadcrumbs, IconButton, Link, Typography, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import PageContainer from "src/components/container/PageContainer";
import DashboardCard from "src/components/shared/DashboardCard";
import SnackBarInfo from "src/layouts/full/shared/SnackBar/SnackBarInfo";
import { useDispatch, useSelector } from "src/store/Store";
import CreateUpdateAsset from "./AssetEdition";

const AssetsCreate: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { error } = useSelector((state: any) => state.assetsReducer);
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
    <PageContainer title="Darwin's project">
      <Box mb={2}>
        <Box display="flex" alignItems="center" mt={2}>
          <IconButton onClick={() => navigate(-1)} color="primary">
            <ArrowBack />
          </IconButton>
          <Breadcrumbs aria-label="breadcrumb">
            <Link component={RouterLink} color="inherit" to="/home/assets">
              {t('menu.home')}
            </Link>
            <Link component={RouterLink} color="inherit" to="/home/assets">
              {t('compliance_menu.compliance_assets')}
            </Link>
            <Typography color="textPrimary">{t('dashboard.create')}</Typography>
          </Breadcrumbs>
        </Box>
      </Box>

      <Box>
       
          <CreateUpdateAsset asset={editAsset ?? undefined} onSubmit={handleFormSubmit} />
        
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

export default AssetsCreate;