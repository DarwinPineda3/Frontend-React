import { Box, Chip, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
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
          <Grid item xs={12} lg={12}>
            <Box display="flex" justifyContent="center" alignItems="center" height="200px">
              <Loader></Loader>
            </Box>
          </Grid>
        ) : (
          <>
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
            </Grid>
            <Grid item xs={12} lg={12}>
              <DashboardCard title={t('compliance_projects.project_details')!}>
                <Box display="flex" flexDirection="column" gap={2} mt={3}>
                  <Box>
                    <Typography variant="subtitle2" fontWeight={600}>
                      {t('compliance_projects.projects_description')}:
                    </Typography>
                    <Typography variant="body2">{projectDetail?.description || 'NA'}</Typography>
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
                    <Typography variant="body2">{projectDetail?.template || 'NA'}</Typography>
                  </Box>
                </Box>
              </DashboardCard>
            </Grid>
            <Grid item xs={12} lg={12}>
              <Box display="flex" flexDirection="column" gap={2} mt={1}>
                <GiottoProjecGroupsList groups={projectDetail?.groups} />
              </Box>
            </Grid>
            <Grid item xs={12} lg={12}>
              <Box display="flex" flexDirection="column">
                <Box>
                  <GiottoProjectManagersList managers={projectDetail?.managers} />
                </Box>
              </Box>
            </Grid>
          </>
        )}
      </Grid>
    </PageContainer>
  );
};

export default ProjectDetails;
