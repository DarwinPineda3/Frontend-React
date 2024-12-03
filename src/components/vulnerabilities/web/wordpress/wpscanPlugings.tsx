import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import HumanizedDate from 'src/components/shared/HumanizedDate';

const WPSPlugins: React.FC<{ plugins_list: any[] }> = ({ plugins_list }) => {
  const { t } = useTranslation();


  return (
    <TableContainer>
      <Table aria-label="plugin version table">
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography variant="subtitle2" fontWeight={600}> {/* colocar modal para ver más detalles */}
                {t('wpscan.plugin_name')}
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="subtitle2" fontWeight={600}>
                {t('wpscan.version')}
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="subtitle2" fontWeight={600}>
                {t('wpscan.latest_version')}
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="subtitle2" fontWeight={600}>
                {t('wpscan.last_update')}
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {plugins_list?.map((plugin, index) => (
            <TableRow key={index}>
              <TableCell>
                <Typography variant="body2" color="primary" style={{ cursor: 'pointer' }}>
                  {plugin.name}
                </Typography>
              </TableCell>
              <TableCell>
                <Box display="flex" alignItems="center" gap={1}>
                  <Typography variant="body2">{plugin.version?.number}</Typography>
                </Box>
              </TableCell>
              <TableCell>
                <Typography variant="body2">{plugin?.latest_version}</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body2"><HumanizedDate dateString={plugin?.last_updated} /></Typography>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default WPSPlugins;
