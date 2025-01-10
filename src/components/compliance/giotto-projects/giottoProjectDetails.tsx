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
import { fetchProjectById } from 'src/store/sections/compliance/giottoProjectsSlice';
import { useDispatch, useSelector } from 'src/store/Store';
import GiottoProjecGroupsList from './giottoProjectGroupsList';
import GiottoProjectManagersList from './giottoProjectManagersList';

const ProjectDetails: React.FC = ({}) => {
  const { projectId } = useParams<{ projectId?: string }>();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const projectDetail = useSelector((state: any) => state.giottoProjectsReducer.projectDetail);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (projectId) {
        try {
          setIsLoading(true);
          await dispatch(fetchProjectById(projectId));
          setIsLoading(false);
        } catch (error) {
          console.error('Error fetching group:', error);
        }
      }
    };
    fetchData();
  }, [projectId, dispatch]);

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
                  <Typography color="textPrimary">{projectDetail?.name}</Typography>
                </Breadcrumbs>
              </Box>
            </Box>
            <Grid item xs={12} lg={12}>
              <Breadcrumb title={`${projectDetail?.name}`}>
                <Box display="flex" flexWrap="wrap" gap={1} mb={3}>
                  <Chip
                    label={`${t('compliance_projects.project_group_title')}: ${
                      projectDetail?.groups?.length
                    }`}
                    color="primary"
                    variant="outlined"
                  />
                  <Chip
                    label={`${t('compliance_projects.project_managers_title')}: ${
                      projectDetail?.managers?.length
                    }`}
                    color="info"
                    variant="outlined"
                  />
                </Box>
              </Breadcrumb>
              <DashboardCard title={t('compliance_projects.project_details')!}>
                <Box display="flex" flexDirection="column" gap={2} mt={3}>
                  <Box>
                    <Typography variant="subtitle2" fontWeight={600}>
                      {t('compliance_projects.projects_description')}:
                    </Typography>
                    <Typography variant="body2">{projectDetail?.description}</Typography>
                  </Box>
                  <Box>
                    <Typography variant="subtitle2" fontWeight={600}>
                      {t('compliance_projects.project_start_date')}:
                    </Typography>
                    <Typography variant="body2">
                      <HumanizedDate dateString={projectDetail?.startDate} />
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="subtitle2" fontWeight={600}>
                      {t('compliance_projects.project_end_date')}:
                    </Typography>
                    <Typography variant="body2">
                      <HumanizedDate dateString={projectDetail?.endDate} />
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="subtitle2" fontWeight={600}>
                      {t('compliance_projects.project_template')}:
                    </Typography>
                    <Typography variant="body2">{projectDetail?.description}</Typography>
                  </Box>
                </Box>
              </DashboardCard>
              <Grid item xs={12} lg={12}>
                <Box display="flex" flexDirection="column" gap={2} mt={3}>
                  <GiottoProjecGroupsList groups={projectDetail?.groups} />
                </Box>
              </Grid>
              <Grid item xs={12} lg={12}>
                <Box display="flex" flexDirection="column" gap={2} mt={3}>
                  <GiottoProjectManagersList managers={projectDetail?.managers} />
                </Box>
              </Grid>
            </Grid>
          </>
        )}
      </Grid>
    </PageContainer>
  );
};

export default ProjectDetails;
