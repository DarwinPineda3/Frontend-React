import React from 'react';
import { Modal, Box, Typography, List, ListItem, ListItemText, Divider } from '@mui/material';

interface SecurityLeakDetailModalProps {
  open: boolean;
  onClose: () => void;
  data: any;
}

const SecurityLeakDetailModal: React.FC<SecurityLeakDetailModalProps> = ({
  open,
  onClose,
  data,
}) => {
  const filteredData = Object.entries(data).reduce((acc, [key, value]) => {
    if (value !== null && value !== undefined) {
      const valueStr = String(value);
      if (valueStr.trim() !== '' && valueStr !== '0') {
        acc[key] = valueStr;
      }
    }
    return acc;
  }, {} as Record<string, string>);

  const formatKey = (key: string) => {
    return key.replace(/_/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase());
  };

  return (
    <Modal
    open={open}
    onClose={onClose}
    aria-labelledby="security-leak-detail-title"
    aria-describedby="security-leak-detail-description"
  >
    <Box
      sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: { xs: '90%', sm: 500 },
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
        borderRadius: 2,
        overflowY: 'auto',
        maxHeight: '80vh',
      }}
    >
      <Typography id="security-leak-detail-title" variant="h6" component="h2" gutterBottom>
        Detailed Information
      </Typography>
      <Divider sx={{ mb: 2 }} />
      <List>
        {Object.entries(filteredData).map(([key, value]) => (
          <ListItem key={key}>
            <ListItemText
              primary={
                <Typography
                  variant="body2"
                  sx={{
                    wordBreak: 'break-word',
                    maxWidth: '100%',
                  }}
                >
                  <strong>{formatKey(key)}:</strong> {value}
                </Typography>
              }
            />
          </ListItem>
        ))}
      </List>
    </Box>
  </Modal>
  );
};

export default SecurityLeakDetailModal;