import {
  Box,
  Grid,
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
  fetchBaseTemplates,
  setBasePage,
  setBasePageSize,
  setBaseTmpLoading,
} from 'src/store/sections/compliance/giottoTemplatesSlice';

interface GiottoTemplateTableProps {
  handleDownload: () => void;
}

const GiottoBaseTemplatesTable: React.FC<GiottoTemplateTableProps> = ({ handleDownload }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { baseTemplates, baseTmpLoading } = useSelector(
    (state: any) => state.giottoTemplatesReducer,
  );
  const currentPage = useSelector(
    (state: any) => state.giottoTemplatesReducer.baseTemplates.currentPage,
  );
  const totalPages = useSelector(
    (state: any) => state.giottoTemplatesReducer.baseTemplates.totalPages,
  );
  const pageSize = useSelector((state: any) => state.giottoTemplatesReducer.baseTemplates.pageSize);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      setBaseTmpLoading(true);
      await dispatch(fetchBaseTemplates(currentPage, pageSize));
      setBaseTmpLoading(false);
    };
    fetchData();
  }, [dispatch, currentPage, pageSize]);

  const handlePageChange = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
    page: number,
  ) => {
    const newPage = page + 1;
    if (newPage !== currentPage) {
      dispatch(setBasePage(newPage));
    }
  };

  const handlePageSizeChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const newPageSize = event.target.value as number;
    dispatch(setBasePageSize(newPageSize));
    dispatch(setBasePage(1));
  };

  return (
    <Grid item xs={12} xl={12}>
      <DashboardCard
        title={t('compliance_templates.base_templates')!}
        subtitle={t('compliance_templates.base_templates_description') ?? ''}
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
                {baseTmpLoading ? (
                  <TableRow>
                    <TableCell colSpan={6}>
                      <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        height="100px"
                      >
                        <Loader />
                      </Box>
                    </TableCell>
                  </TableRow>
                ) : baseTemplates.itemsResult.length > 0 ? (
                  baseTemplates.itemsResult.map((template: any, index: number) => (
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
                      <Typography variant="body2" color="textSecondary">
                        {t('vulnerabilities.no_data_available')}
                      </Typography>
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
    </Grid>
  );
};

export default GiottoBaseTemplatesTable;
