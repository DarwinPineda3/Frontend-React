import ArrowBack from '@mui/icons-material/ArrowBack';
import { Box, Breadcrumbs, Chip, Grid, IconButton, Link, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom';
import PageContainer from 'src/components/container/PageContainer';
import Breadcrumb from 'src/components/shared/breadcrumb/Breadcrumb';
import DashboardCard from 'src/components/shared/DashboardCard';
import Loader from 'src/components/shared/Loader/Loader';
import { fetchTemplateById } from 'src/store/sections/compliance/giottoTemplatesSlice';
import { useDispatch, useSelector } from 'src/store/Store';
import GiottoTemplateControlsList from './giottoTemplateControls';

const TemplateDetails: React.FC = ({}) => {
  const { templateId } = useParams<{ templateId?: string }>();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const templateDetail = useSelector((state: any) => state.giottoTemplatesReducer.templateDetail);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const [groupedControls, setGroupedControls] = useState<any>(null);

  const groupByGroupName = (controls: any[]) => {
    return controls.reduce((groups, control) => {
      if (!groups[control.groupName]) {
        groups[control.groupName] = [];
      }
      groups[control.groupName].push(control);
      return groups;
    }, {});
  };

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

  useEffect(() => {
    if (templateDetail && templateDetail.controls) {
      const grouped = groupByGroupName(templateDetail.controls);
      setGroupedControls(grouped);
    }
  }, [templateDetail]);

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
            <Box mb={2}>
              <Box display="flex" alignItems="center" mt={2}>
                <IconButton onClick={() => navigate(-1)} color="primary">
                  <ArrowBack />
                </IconButton>
                <Breadcrumbs aria-label="breadcrumb">
                  <Link component={RouterLink} color="inherit" to="/compliance/templates">
                    {t('compliance_menu.compliance')}
                  </Link>
                  <Link component={RouterLink} color="inherit" to="/compliance/templates">
                    {t('compliance_menu.compliance_templates')}
                  </Link>
                  <Typography color="textPrimary">{templateDetail?.name}</Typography>
                </Breadcrumbs>
              </Box>
            </Box>

            <Grid item xs={12} lg={12}>
              <Breadcrumb title={`${templateDetail?.name}`}>
                <Box display="flex" flexWrap="wrap" gap={1} mb={3}>
                  <Chip
                    label={`${t('compliance_templates.template_controls_title')}: ${
                      templateDetail?.controls?.length
                    }`}
                    color="primary"
                    variant="outlined"
                  />
                </Box>
              </Breadcrumb>
            </Grid>
            <Grid item xs={12} lg={12}>
              <DashboardCard title={t('compliance_templates.template_details')!}>
                <Box display="flex" flexDirection="column" gap={2} mt={3}>
                  <Box>
                    <Typography variant="subtitle2" fontWeight={600}>
                      {t('compliance_templates.template_description')}:
                    </Typography>
                    <Typography variant="body2">{templateDetail?.description || 'NA'}</Typography>
                  </Box>
                  <Box>
                    <Typography variant="subtitle2" fontWeight={600}>
                      {t('compliance_templates.template_base_template_title')}:
                    </Typography>
                    <Typography variant="body2">{templateDetail?.name}</Typography>
                  </Box>
                  <Box>
                    <Typography variant="subtitle2" fontWeight={600}>
                      {t('compliance_templates.template_working_system_title')}:
                    </Typography>
                    <Typography variant="body2">{templateDetail?.workingSystemName}</Typography>
                  </Box>
                </Box>
              </DashboardCard>
            </Grid>
            <Grid item xs={12} lg={12}>
              <Box display="flex" flexDirection="column" gap={2} mt={1}>
                <GiottoTemplateControlsList groupsControl={groupedControls} />
              </Box>
            </Grid>
          </>
        )}
      </Grid>
    </PageContainer>
  );
};

export default TemplateDetails;
