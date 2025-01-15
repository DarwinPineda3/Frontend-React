import ArrowBack from '@mui/icons-material/ArrowBack';
import { Box, Breadcrumbs, Chip, Grid, IconButton, Link, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom';
import PageContainer from 'src/components/container/PageContainer';
import Breadcrumb from 'src/components/shared/breadcrumb/Breadcrumb';
import DashboardCard from 'src/components/shared/DashboardCard';
import HumanizedDate from 'src/components/shared/HumanizedDate';
import Loader from 'src/components/shared/Loader/Loader';
import { fetchTemplateById } from 'src/store/sections/compliance/giottoTemplatesSlice';
import { useDispatch, useSelector } from 'src/store/Store';

const TemplateDetails: React.FC = ({}) => {
  const { templateId } = useParams<{ templateId?: string }>();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const templateDetail = useSelector((state: any) => state.giottoTemplatesReducer.templateDetail);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (templateId) {
        try {
          setIsLoading(true);
          await dispatch(fetchTemplateById(templateId));
          setIsLoading(false);
        } catch (error) {
          console.error('Error fetching group:', error);
        }
      }
    };
    fetchData();
  }, [templateId, dispatch]);

  return (
    <PageContainer title="Akila">
      <Grid container spacing={1}>
        {isLoading ? (
          <Box display="flex" justifyContent="center" alignItems="center" height="300px">
            <Loader />
          </Box>
        ) : (
          <>
            <Box mb={2}>
              <Box display="flex" alignItems="center" mt={2}>
                <IconButton onClick={() => navigate(-1)} color="primary">
                  <ArrowBack />
                </IconButton>
                <Breadcrumbs aria-label="breadcrumb">
                  <Link component={RouterLink} color="inherit" to="/compliance/projects">
                    {t('compliance_menu.compliance')}
                  </Link>
                  <Link component={RouterLink} color="inherit" to="/compliance/projects">
                    {t('compliance_menu.compliance_projects')}
                  </Link>
                  <Typography color="textPrimary">{templateDetail?.name}</Typography>
                </Breadcrumbs>
              </Box>
            </Box>

            <Grid item xs={12} lg={12}>
              <Breadcrumb title={`${templateDetail?.name}`}>
                <Box display="flex" flexWrap="wrap" gap={1} mb={3}>
                  <Chip
                    label={`${t('compliance_projects.project_group_title')}: ${
                      templateDetail?.groups?.length
                    }`}
                    color="primary"
                    variant="outlined"
                  />
                  <Chip
                    label={`${t('compliance_projects.project_managers_title')}: ${
                      templateDetail?.managers?.length
                    }`}
                    color="info"
                    variant="outlined"
                  />
                </Box>
              </Breadcrumb>
            </Grid>
            <Grid item xs={12} lg={12}>
              <DashboardCard title={t('compliance_projects.project_details')!}>
                <Box display="flex" flexDirection="column" gap={2} mt={3}>
                  <Box>
                    <Typography variant="subtitle2" fontWeight={600}>
                      {t('compliance_projects.projects_description')}:
                    </Typography>
                    <Typography variant="body2">{templateDetail?.description || 'NA'}</Typography>
                  </Box>
                  <Box>
                    <Typography variant="subtitle2" fontWeight={600}>
                      {t('compliance_projects.project_start_date')}:
                    </Typography>
                    <Typography variant="body2">
                      <HumanizedDate dateString={templateDetail?.startDate} />
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="subtitle2" fontWeight={600}>
                      {t('compliance_projects.project_end_date')}:
                    </Typography>
                    <Typography variant="body2">
                      <HumanizedDate dateString={templateDetail?.endDate} />
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="subtitle2" fontWeight={600}>
                      {t('compliance_projects.project_template')}:
                    </Typography>
                    <Typography variant="body2">{templateDetail?.template || 'NA'}</Typography>
                  </Box>
                </Box>
              </DashboardCard>
            </Grid>
            <Grid item xs={12} lg={12}>
              <Box display="flex" flexDirection="column" gap={2} mt={1}>
                {/* <GiottoProjecGroupsList groups={templateDetail?.groups} /> */}
              </Box>
            </Grid>
            <Grid item xs={12} lg={12}>
              <Box display="flex" flexDirection="column">
                <Box>{/* <GiottoProjectManagersList managers={templateDetail?.managers} /> */}</Box>
              </Box>
            </Grid>
          </>
        )}
      </Grid>
    </PageContainer>
  );
};

export default TemplateDetails;
