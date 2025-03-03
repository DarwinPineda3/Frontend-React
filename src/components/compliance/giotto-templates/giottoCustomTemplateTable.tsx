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
  setCustomPage,
  setCustomPageSize,
  setCustomTmpLoading,
} from 'src/store/sections/compliance/giottoTemplatesSlice';
import NoDataAvailable from 'src/views/general/NoDataAvailable';

interface GiottoTemplateTableProps {
  handleDownload: () => void;
}

const GiottoCustomTemplatesTable: React.FC<GiottoTemplateTableProps> = ({ handleDownload }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { customTemplates, customTmpLoading } = useSelector(
    (state: any) => state.giottoTemplatesReducer,
  );
  const currentPage = useSelector(
    (state: any) => state.giottoTemplatesReducer.customTemplates.currentPage,
  );
  const totalPages = useSelector(
    (state: any) => state.giottoTemplatesReducer.customTemplates.totalPages,
  );
  const pageSize = useSelector(
    (state: any) => state.giottoTemplatesReducer.customTemplates.pageSize,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      setCustomTmpLoading(true);
      await dispatch(fetchCustomTemplates(currentPage, pageSize));
      setCustomTmpLoading(false);
    };
    fetchData();
  }, [dispatch, currentPage, pageSize]);

  const handlePageChange = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
    page: number,
  ) => {
    const newPage = page + 1;
    if (newPage !== currentPage) {
      dispatch(setCustomPage(newPage));
    }
  };

  const handlePageSizeChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const newPageSize = event.target.value as number;
    dispatch(setCustomPageSize(newPageSize));
    dispatch(setCustomPage(1));
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
              {customTmpLoading ? (
                <TableRow>
                  <TableCell colSpan={6}>
                    <Box display="flex" justifyContent="center" alignItems="center" height="100px">
                      <Loader />
                    </Box>
                  </TableCell>
                </TableRow>
              ) : customTemplates.itemsResult.length > 0 ? (
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
              ) : (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    <NoDataAvailable entityType="template" />
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 50, 100]}
          component="div"
          count={totalPages * pageSize}
          rowsPerPage={pageSize}
          page={currentPage - 1}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handlePageSizeChange}
        />
      </Box>
    </DashboardCard>
  );
};

export default GiottoCustomTemplatesTable;
