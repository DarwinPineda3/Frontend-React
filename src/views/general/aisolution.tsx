import React, { useState } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, Box } from '@mui/material';
import AiSolutionContent from 'src/components/aisolutioncontent/AiSolutionContent'; 

const AiSolution: React.FC = () => {
  const [showModal, setShowModal] = useState(false);

  const handleButtonClick = () => {
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <div>
      <Button 
        onClick={handleButtonClick} 
        variant="contained" 
        color="secondary"
        sx={{
          padding: '12px 24px',
          fontSize: '16px',
          fontWeight: 'bold',
          borderRadius: '8px',
          boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
          transition: 'background-color 0.3s, transform 0.3s',
          '&:hover': {
            backgroundColor: 'secondary.dark',
            transform: 'scale(1.05)',
          },
        }}
      >
        AI Solution
      </Button>

      <Dialog
        open={showModal}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        maxWidth="lg" 
        fullWidth
      >
        <DialogTitle id="modal-title">AI Solution</DialogTitle>
        <DialogContent dividers sx={{ padding: 2 }}>
          <AiSolutionContent />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="outlined" color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AiSolution;
