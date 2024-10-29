import React from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';

interface ConfirmDeleteModalProps {
  open: boolean;
  handleClose: () => void;
  handleConfirm: () => void;
}

const ConfirmDeleteModal: React.FC<ConfirmDeleteModalProps> = ({
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
          {t('monitoring.confirm_delete')}
        </Typography>
        <Typography sx={{ mt: 2 }}>{t('monitoring.delete_message_confirm')}</Typography>
        <Box mt={2}>
          <Button onClick={handleClose}>{t('monitoring.cancel_delete')}</Button>
          <Button onClick={handleConfirm} color="error" sx={{ ml: 2 }}>
            {t('monitoring.delete_parameter')}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ConfirmDeleteModal;
