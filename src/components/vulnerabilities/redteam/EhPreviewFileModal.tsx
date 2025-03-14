import CloseIcon from '@mui/icons-material/Close';
import { Box, Grid, IconButton, Modal, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { getBaseApiUrl, getTenant } from 'src/guards/jwt/Jwt';

interface PreviewFileModalProps {
  open: boolean;
  filePath: string | null;
  handleClose: () => void;
}

const getBaseUrl = (): string => {
  const tenant = getTenant();
  return `${import.meta.env.VITE_API_BACKEND_BASE_URL_TEMPLATE.replace("{}", tenant)}`;
}

const PreviewFileModal: React.FC<PreviewFileModalProps> = ({
  open,
  filePath,
  handleClose,
}) => {
  const { t } = useTranslation();

  
  const getFileType = (filePath: string | null): 'pdf' | 'image' | null => {
    if (!filePath) return null;
    const extension = filePath.split('.').pop()?.toLowerCase();
    if (extension === 'pdf') return 'pdf';
    if (['png', 'jpg', 'jpeg', 'gif'].includes(extension || '')) return 'image';
    return null;
  };

  const fileType = getFileType(filePath);

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '80%',
          maxWidth: '800px',
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 2,
          borderRadius: 2,
        }}
      >
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h6">
            {t("redteam.preview_file")}
          </Typography>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '60vh',
          }}
        >
          {fileType === 'pdf' ? (
            <Grid item xs={12} xl={12}>
              <iframe
                src={`${getBaseUrl()}${filePath}` || ''}
                style={{
                  overflow: 'hidden',
                  height: 'calc(100vh - 20px)',
                  width: '100%',
                  border: 'none',
                  display: 'block',
                  position: 'relative',
                }}
                allow="fullscreen"
                seamless={true}
              />
            </Grid>
          ) : fileType === 'image' ? (
            <img src={`${getBaseUrl()}${filePath}` || ''} alt="Preview" style={{ maxWidth: '100%', maxHeight: '500px' }} />
          ) : (
            <Typography>{t('redteam.file_format_not_supported_for_preview')}</Typography>
          )}
        </Box>
      </Box>
    </Modal>
  );
};

export default PreviewFileModal;
