import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from '@mui/material';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import DashboardCard from 'src/components/shared/DashboardCard';
import HumanizedDate from 'src/components/shared/HumanizedDate';
import Loader from 'src/components/shared/Loader/Loader';
import {
  fetchCustomTemplates,
  setLoading,
} from 'src/store/sections/compliance/giottoTemplatesSlice';

interface GiottoTemplateTableProps {
  handleDownload: () => void;
}

const GiottoCustomTemplatesTable: React.FC<GiottoTemplateTableProps> = ({ handleDownload }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { customTemplates, loading } = useSelector((state: any) => state.giottoTemplatesReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await dispatch(fetchCustomTemplates(customTemplates.currentPage, customTemplates.pageSize));
      setLoading(false);
    };
    fetchData();
  }, [dispatch, customTemplates.currentPage]);

  const handlePageChange = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    askedPage: number,
  ) => {
    if (customTemplates.currentPage !== askedPage) {
      dispatch(fetchCustomTemplates(askedPage, customTemplates.pageSize));
    }
  };

  return (
    <DashboardCard
      title={t('compliance_templates.custom_templates')!}
      subtitle={t('compliance_templates.custom_templates_description') ?? ''}
    >
      <Box>
        <TableContainer>
          {/* Table view */}
          <Table>
            {/* Table head */}
            <TableHead>
              <TableRow>
                <TableCell>{t('compliance_templates.template')}</TableCell>
                <TableCell>{t('compliance_templates.template_working_system_title')}</TableCell>
                <TableCell>{t('compliance_templates.template_control_create_date')}</TableCell>
                <TableCell align="right">{t('compliance_templates.template_options')}</TableCell>
              </TableRow>
            </TableHead>
            {/* Table body */}
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={6}>
                    <Box display="flex" justifyContent="center" alignItems="center" height="100px">
                      <Loader />
                    </Box>
                  </TableCell>
                </TableRow>
              ) : (
                customTemplates.itemsResult.map((template: any, index: number) => (
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
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 50, 100]}
          component="div"
          count={customTemplates.totalItemsAmount}
          rowsPerPage={customTemplates.pageSize}
          page={customTemplates.currentPage - 1}
          onPageChange={(e, destPage) => handlePageChange(e, destPage + 1)}
          onRowsPerPageChange={(e) =>
            dispatch(fetchCustomTemplates(customTemplates.currentPage, customTemplates.pageSize))
          }
        />
      </Box>
    </DashboardCard>
  );
};

export default GiottoCustomTemplatesTable;
