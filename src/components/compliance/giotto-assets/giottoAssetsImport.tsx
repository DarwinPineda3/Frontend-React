import { ArrowBack } from "@mui/icons-material";
import { Box, Breadcrumbs, Button, Chip, Divider, IconButton, Link, Tooltip, Typography, useTheme } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useTranslation } from "react-i18next";
// import { useNavigate } from "react-router";
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import PageContainer from "src/components/container/PageContainer";
import DashboardCard from "src/components/shared/DashboardCard";
import { uploadAssets } from "src/store/sections/compliance/giotoAssetsSlice";
import { useDispatch, useSelector } from "src/store/Store";

const GiottoAssetsImport: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { error } = useSelector((state: any) => state.GiottoAssetsReducer);
  const dispatch = useDispatch();
  const [myFiles, setMyFiles] = useState([]);

  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    if (error) {
      setSnackbarOpen(true);
    }
  }
    , [error]);

  const onDrop = useCallback(acceptedFiles => {
    setMyFiles([...acceptedFiles])
  }, [myFiles])

  const uploadFile = (files: FileList) => {
    dispatch(uploadAssets(files));
    navigate('/compliance/assets');
  }

  const { getRootProps, getInputProps } = useDropzone(
    {
      onDrop,
      accept: {
        "text/plain": [".csv"],
        "application/vnd.ms-excel": [".csv"],
      },
      maxFiles: 1
    });

  const removeFile = () => {
    setMyFiles([]);
  }

  const files = myFiles.map((file: File, i) => (
    <Box
      key={i}
      display="flex"
      alignItems="center"
      py={1}
      mt={2}
      sx={{ borderTop: `1px solid ${theme.palette.divider}` }}
      justifyContent="space-between"
    >

      <Typography variant="body1" fontWeight="500">
        {file.name}{" "}
      </Typography>
      <Chip color="primary" label={`${(file.size / 1024).toFixed(2)} KB`} />
      <Chip
        label={t('giotto.assets.remove')}
        color="error"
        onClick={() => removeFile()} />
    </Box>
  ));

  const addButton = (
    <Box>
      <Tooltip title={t('giotto.assets.download_template')} arrow>
        <IconButton color="primary" onClick={() => handleHelpToBulkImportClick()}>
          <HelpOutlineIcon />
        </IconButton>
      </Tooltip>
    </Box>
  );

  const handleHelpToBulkImportClick = () => {
    const fileUrl = '/assets/template-bulk-import.csv';

    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = 'template.csv';
    link.click();
  };

  return (
    <PageContainer title={String(t('compliance_menu.compliance_assets'))}>
      <Box mb={2}>
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
            <Typography color="textPrimary">{t('compliance_menu.bulk_import')}</Typography>
          </Breadcrumbs>
        </Box>
      </Box>
      <Box>

        <DashboardCard
          title={t('giotto.assets.import_giotto_assets') || ''}
          action={addButton}
        >

          <Box>
            <Box
              mt={3}
              fontSize="12px"
              sx={{
                backgroundColor: "white",
                color: "primary.main",
                padding: "30px",
                textAlign: "center",
                border: `1px dashed`,
                borderColor: "primary.main",
              }}
              {...getRootProps({ className: "dropzone" })}
            >
              <input {...getInputProps()} />
              <Typography>{t('giotto.assets.select_file')}</Typography>
              <Typography fontSize="0.9em">{t('giotto.assets.select_csv_file')}</Typography>
            </Box>
            <Box mt={2}>
              <Typography variant="h6" fontSize="15px">
                {t('giotto.assets.selected_file')}:
              </Typography>
              <Box>{files}</Box>
            </Box>
            {
              myFiles.length > 0 && <Divider />
            }
            {
              myFiles.length > 0 && <Box sx={{ pt: 3, display: "flex", justifyContent: "end" }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={(e) => uploadFile(myFiles)}
                >
                  {t('giotto.assets.upload')}
                </Button>
              </Box>
            }

          </Box>

        </DashboardCard>
      </Box>
    </PageContainer>
  );
};

export default GiottoAssetsImport;