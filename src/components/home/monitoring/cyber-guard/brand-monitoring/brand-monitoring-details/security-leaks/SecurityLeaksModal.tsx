import { Visibility } from '@mui/icons-material';
import {
  Box,
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
  Modal,
  Typography,
} from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();

  const filteredData = Object.entries(data).reduce((acc, [key, value]) => {
    const transformedKey = key === 'logo_path' ? 'screenshot_url' : key;

    if (transformedKey === 'data_classes') return acc;
    if (Array.isArray(value)) {
      if (value.length > 0) {
        acc[transformedKey] = value;
      }
    } else if (value !== null && value !== undefined) {
      const valueStr = String(value);
      if (valueStr.trim() !== '' && valueStr !== '0') {
        if (transformedKey === 'generated' && typeof valueStr === 'string') {
          const timestamp = parseFloat(valueStr);
          const date = new Date(timestamp * 1000);
          acc[transformedKey] = date.toLocaleString();
        } else {
          acc[transformedKey] = valueStr;
        }
      }
    }
    return acc;
  }, {} as Record<string, string | string[]>);

  const formatKey = (key: string) => {
    return (
      t(`monitoring.${key}`) ||
      key.replace(/_/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase())
    );
  };

  const isUrl = (value: string) => /^https?:\/\/[^\s]+$/.test(value);

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
          {t('monitoring.detailed_information')}
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
                    <strong>{formatKey(key)}:</strong>
                    {key === 'screenshot_url' ? (
                      <div style={{ marginTop: '5px' }}>
                        <a href={value as string} target="_blank" rel="noopener noreferrer">
                          <Button
                            variant="contained"
                            color="primary"
                            startIcon={<Visibility />}
                            size="small"
                          >
                            {t('monitoring.evidence')}
                          </Button>
                        </a>
                      </div>
                    ) : Array.isArray(value) ? (
                      value.map((item, index) => (
                        <div key={index}>
                          {isUrl(item) ? (
                            <a href={item} target="_blank" rel="noopener noreferrer">
                              {item}
                            </a>
                          ) : (
                            item
                          )}
                        </div>
                      ))
                    ) : isUrl(value) ? (
                      <a href={value} target="_blank" rel="noopener noreferrer">
                        {value}
                      </a>
                    ) : (
                      value
                    )}
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
