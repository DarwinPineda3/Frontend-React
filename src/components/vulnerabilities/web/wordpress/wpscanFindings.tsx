import TranslateIcon from '@mui/icons-material/Translate';
import VisibilityIcon from '@mui/icons-material/Visibility';
import {
  Box,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import DashboardCard from 'src/components/shared/DashboardCard';

const WPSFindings: React.FC<{ findings: any[] }> = ({ findings }) => {
  const { t } = useTranslation();


  return (
    <DashboardCard>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><Typography variant="subtitle2" fontWeight={600}>{t('wpscan.url')}</Typography></TableCell>
              <TableCell><Typography variant="subtitle2" fontWeight={600}>{t('wpscan.description')}</Typography></TableCell>
              <TableCell><Typography variant="subtitle2" fontWeight={600}>{t('wpscan.type')}</Typography></TableCell>
              <TableCell><Typography variant="subtitle2" fontWeight={600}>{t('wpscan.detected_by')}</Typography></TableCell>
              <TableCell><Typography variant="subtitle2" fontWeight={600}>{t('wpscan.confidence')}</Typography></TableCell>
              {/* <TableCell><Typography variant="subtitle2" fontWeight={600}>{t('wpscan.references')}</Typography></TableCell> */}
              {/* <TableCell><Typography variant="subtitle2" fontWeight={600}>{t('wpscan.interesting_entries')}</Typography></TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {findings.map((alert, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Typography variant="body2" color="primary" style={{ cursor: 'pointer' }}>
                    {alert.url}
                  </Typography>
                </TableCell>
                <TableCell><Typography variant="body2">{alert.to_s}</Typography></TableCell>
                <TableCell><Typography variant="body2">{alert.type}</Typography></TableCell>
                <TableCell><Typography variant="body2">{alert.found_by}</Typography></TableCell>
                <TableCell><Typography variant="body2">{alert.confidence}%</Typography></TableCell>
                {/* <TableCell><Typography variant="body2">{alert.references}</Typography></TableCell> */} {/** view references in modal detail   */}
                <TableCell>
                  {alert.entries && (
                    <Box display="flex" gap={1}>
                      <IconButton color="primary">
                        <VisibilityIcon />
                      </IconButton>
                      <IconButton color="primary">
                        <TranslateIcon />
                      </IconButton>
                    </Box>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </DashboardCard>
  );
};

export default WPSFindings;
