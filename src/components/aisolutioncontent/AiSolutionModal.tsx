import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import AiSolutionContent from 'src/components/aisolutioncontent/AiSolutionContent';
import { vulnerabilitySolution } from 'src/types/solutions/vulnerabilitySolution';

interface AiSolutionProps {
  showModal: boolean;
  onClose: () => void;
  vulnerabilityProps: vulnerabilitySolution;
}

const AiSolutionModal: React.FC<AiSolutionProps> = ({ showModal, onClose, vulnerabilityProps }) => {
  const { t } = useTranslation();

  return (
    <Dialog
      open={showModal}
      onClose={onClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      maxWidth="lg"
      fullWidth
    >
      <DialogTitle id="modal-title">{t('vulnerabilities.ai_solution_title')}</DialogTitle>
      <DialogContent dividers sx={{ padding: 2 }}>
        <AiSolutionContent vulnerabilityProps={vulnerabilityProps} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="outlined" color="primary">
          {t('vulnerabilities.close_modal')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AiSolutionModal;
