import {
  Box,
  Paper,
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
import { useNavigate } from 'react-router';
import HumanizedDate from 'src/components/shared/HumanizedDate';
import {
  GiottoObjTemplateList,
  GiottoTemplateList,
} from 'src/store/sections/compliance/giottoTemplatesSlice';

interface GiottoTemplateTableProps {
  templates: GiottoObjTemplateList[];
  isLoading: boolean;
  handleDownload: () => void;
}

const GiottoTemplateTable: React.FC<GiottoTemplateTableProps> = ({
  templates,
  isLoading,
  handleDownload,
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

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
          {templates.itemsResult?.map((template: GiottoTemplateList, index: number) => (
            <TableRow key={index}>
              <TableCell>
                <Typography
                  variant="subtitle2"
                  fontWeight={600}
                  color="primary"
                  component="a"
                  onClick={() => navigate(`/compliance/templates/${template.id}`)}
                  style={{ cursor: 'pointer' }}
                >
                  {template.name}
                </Typography>
              </TableCell>
              <TableCell>
                <Box display="flex" alignItems="center" gap={1}>
                  <Typography variant="body2">{template?.workingSystemName}</Typography>
                </Box>
              </TableCell>
              <TableCell>
                <Box display="flex" alignItems="center" gap={1}>
                  <Typography variant="body2">
                    <HumanizedDate dateString={template?.creationDate} />
                  </Typography>
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default GiottoTemplateTable;
