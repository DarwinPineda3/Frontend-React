import { Box, Button, Modal, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';

interface ConfirmActionModalProps {
  open: boolean;
  handleClose: () => void;
  handleConfirm: () => void;
}

const ConfirmActionModal: React.FC<ConfirmActionModalProps> = ({
  open,
  handleClose,
  handleConfirm,
}) => {
  const { t } = useTranslation();

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 300,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography variant="h6" component="h2">
          {t('modals.action.title')}
        </Typography>
        <Typography sx={{ mt: 2 }}>{t('modals.action.message')}</Typography>
        <Box mt={2}>
          <Button onClick={handleClose}>{t('modals.action.cancel')}</Button>
          <Button onClick={handleConfirm} color="error" sx={{ ml: 2 }}>
            {t('modals.action.confirm')}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ConfirmActionModal;
