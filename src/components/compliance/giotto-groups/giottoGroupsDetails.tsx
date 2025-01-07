import ArrowBack from '@mui/icons-material/ArrowBack';
import { Box, Breadcrumbs, Chip, Grid, IconButton, Link } from '@mui/material';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom';
import PageContainer from 'src/components/container/PageContainer';
import Breadcrumb from 'src/components/shared/breadcrumb/Breadcrumb';
import Loader from 'src/components/shared/Loader/Loader';
import { fetchGroupById } from 'src/store/sections/compliance/giottoGroupsSlice';
import { useDispatch, useSelector } from 'src/store/Store';
import GiottoAssetsList from './giottoGroupsAssetsList';
import GiottoTemplatesList from './giottoGroupsTemplatesList';


const GroupDetails: React.FC = ({ }) => {
  const { groupId } = useParams<{ groupId?: string }>();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const groupDetail = useSelector((state: any) => state.giottoGroupReducer.groupDetail);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  React.useEffect(() => {
    const fetchData = async () => {
      if (groupId) {
        try {
          setIsLoading(true);
          await dispatch(fetchGroupById(groupId));
          setIsLoading(false);
        } catch (error) {
          console.error('Error fetching group:', error);
        }
      }
    };
    fetchData();
  }, [groupId, dispatch]);

  return (
    <PageContainer title="Akila">
      <Box mb={2}>
        <Box display="flex" alignItems="center" mt={2}>
          <IconButton onClick={() => navigate(-1)} color="primary">
            <ArrowBack />
          </IconButton>
          <Breadcrumbs aria-label="breadcrumb">
            <Link component={RouterLink} color="inherit" to="/compliance/groups">
              {t('compliance_menu.compliance')}
            </Link>
            <Link component={RouterLink} color="inherit" to="/compliance/groups">
              {t('compliance_menu.compliance_groups')}
            </Link>
            <Link component={RouterLink} color="inherit" to="/compliance/groups">
              cambiar detalle por el nombre del grupo
            </Link>
          </Breadcrumbs>
        </Box>
      </Box>
      <Grid container spacing={1}>
        {isLoading ? (
          <Box display="flex" justifyContent="center" alignItems="center" height="300px">
            <Loader />
          </Box>
        ) : (
          <Grid item xs={12} lg={12}>

            <Breadcrumb title={`${groupDetail?.name}`}>
              <Box display="flex" flexWrap="wrap" gap={1} mb={3}>
                <Chip label={`${t("vulnerabilities.cant_assets")}: ${groupDetail?.assets?.length}`} color="primary" variant="outlined" />
                <Chip label={`${t("vulnerabilities.cant_templates")}: ${groupDetail?.templates?.length}`} color="secondary" variant="outlined" />
                <Chip label={`${t("vulnerabilities.provider")}: ${groupDetail?.description}`} color="info" variant="outlined" />
              </Box>
            </Breadcrumb>
            <GiottoTemplatesList templates={groupDetail?.templates} />
            <GiottoAssetsList assets={groupDetail?.assets} />
          </Grid>
        )}
      </Grid>
    </PageContainer>
  );
};

export default GroupDetails;
