import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import { Visibility, Settings } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import Loader from 'src/components/shared/Loader/Loader';

interface BaseTemplateTableProps {
  isLoading: boolean;
  handleDownload: () => void;
}

const BaseTemplateTable: React.FC<BaseTemplateTableProps> = ({ isLoading, handleDownload }) => {
  const { t } = useTranslation();

  return (
    <TableContainer component={Paper}>
      <Table aria-label={String(t('templates.baseTemplates'))}>
        <TableHead>
          <TableRow>
            <TableCell>{t('templates.template')}</TableCell>
            <TableCell>{t('templates.system')}</TableCell>
            <TableCell>{t('templates.creationDate')}</TableCell>
            <TableCell align="right">{t('templates.options')}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>aWindows Server XYZies</TableCell>
            <TableCell>Windows Server 2019-2022</TableCell>
            <TableCell>Oct 15, 2024</TableCell>
            <TableCell align="right">
              <IconButton onClick={handleDownload} disabled={isLoading}>
                {isLoading ? <Loader /> : <Visibility />}
              </IconButton>
              <IconButton sx={{ ml: 1 }}>
                <Settings />
              </IconButton>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default BaseTemplateTable;
