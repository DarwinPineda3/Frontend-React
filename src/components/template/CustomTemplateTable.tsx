import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import { Visibility, Edit, DeleteForever } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import Loader from 'src/components/shared/Loader/Loader';

interface CustomTemplateTableProps {
  isLoading: boolean;
  handleDownload: () => void;
}

const CustomTemplateTable: React.FC<CustomTemplateTableProps> = ({ isLoading, handleDownload }) => {
  const { t } = useTranslation();

  return (
    <TableContainer component={Paper}>
      <Table aria-label={String(t('templates.customTemplates'))}>
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
            <TableCell>Plantilla Windows Server 2019 (Recortada)</TableCell>
            <TableCell>Windows Server 2019-2022</TableCell>
            <TableCell>Oct 16, 2024</TableCell>
            <TableCell align="right">
              <IconButton onClick={handleDownload} disabled={isLoading}>
                {isLoading ? <Loader /> : <Visibility />}
              </IconButton>
              <IconButton sx={{ ml: 1 }}>
                <Edit />
              </IconButton>
              <IconButton sx={{ ml: 1 }} color="error">
                <DeleteForever />
              </IconButton>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CustomTemplateTable;
