import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';

interface HelpModalProps {
    open: boolean;
    onClose: () => void;
}

const HelpModal: React.FC<HelpModalProps> = ({ open, onClose }) => {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="xl" 
            fullWidth 
        >
            <DialogTitle id="modal-solution-title">
                1. Scheduled Scans Settings
            </DialogTitle>
            <DialogContent>
                <Typography variant="body1" paragraph>
                    In this section, you can schedule one or multiple scans using the various tools provided by Akila.
                </Typography>
                <Typography variant="body1" paragraph>
                    To schedule scans, you must select the desired type of scan. Based on this selection, you will need to fill in different parameters to initiate the scan.
                </Typography>
                <Typography variant="body1" paragraph>
                    It is important to highlight that some scans have specific prerequisites depending on their type in order to create the task.
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary" variant="contained">
                    Cerrar
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default HelpModal;
