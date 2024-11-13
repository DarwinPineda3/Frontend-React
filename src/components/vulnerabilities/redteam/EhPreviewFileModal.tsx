import CloseIcon from '@mui/icons-material/Close';
import { Box, Grid, IconButton, Modal, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';

interface PreviewFileModalProps {
  open: boolean;
  filePath: string | null;
  handleClose: () => void;
}

const PreviewFileModal: React.FC<PreviewFileModalProps> = ({
  open,
  filePath,
  handleClose,
}) => {
  const { t } = useTranslation();

  // Determinar el tipo de archivo basado en la extensión
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
            {t('monitoring.preview_file')}
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
                src={filePath || ''}
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
            <img src={filePath || ''} alt="Preview" style={{ maxWidth: '100%', maxHeight: '500px' }} />
          ) : (
            <Typography>{t('File format not supported for preview.')}</Typography>
          )}
        </Box>
      </Box>
    </Modal>
  );
};

export default PreviewFileModal;
