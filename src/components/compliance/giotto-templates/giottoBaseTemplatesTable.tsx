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
import { fetchBaseTemplates, setLoading } from 'src/store/sections/compliance/giottoTemplatesSlice';

interface GiottoTemplateTableProps {
  handleDownload: () => void;
}

const GiottoBaseTemplatesTable: React.FC<GiottoTemplateTableProps> = ({ handleDownload }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { baseTemplates, loading } = useSelector((state: any) => state.giottoTemplatesReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await dispatch(fetchBaseTemplates(baseTemplates.currentPage, baseTemplates.pageSize));
      setLoading(false);
    };
    fetchData();
  }, [dispatch, baseTemplates.currentPage]);

  const handlePageChange = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    askedPage: number,
  ) => {
    if (baseTemplates.currentPage !== askedPage) {
      dispatch(fetchBaseTemplates(askedPage, baseTemplates.pageSize));
    }
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
                {loading ? (
                  <Grid item xs={12} xl={12}>
                    <Loader />
                  </Grid>
                ) : (
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
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25, 50, 100]}
            component="div"
            count={baseTemplates.totalItemsAmount}
            rowsPerPage={baseTemplates.pageSize}
            page={baseTemplates.currentPage - 1}
            onPageChange={(e, destPage) => handlePageChange(e, destPage + 1)}
            onRowsPerPageChange={(e) => dispatch(fetchBaseTemplates(baseTemplates.currentPage))}
          />
        </Box>
      </DashboardCard>
    </Grid>
  );
};

export default GiottoBaseTemplatesTable;
