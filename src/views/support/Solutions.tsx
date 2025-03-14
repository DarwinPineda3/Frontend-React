import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Box, Breadcrumbs, Grid, IconButton, Link, Typography} from "@mui/material";
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom';
import PageContainer from 'src/components/container/PageContainer';
import SolutionSearch from '../../components/solutions/SolutionSearch';
import SolutionsTable from '../../components/solutions/SolutionsTable';


const Solutions: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');

  const { selectedSolutionId } = useParams<{ selectedSolutionId?: string }>();

  return (
    <PageContainer title="Darwin's project">
      <Box mb={2}>
        <Box display="flex" alignItems="center" mt={2}>
          <IconButton onClick={() => navigate(-1)} color="primary">
            <ArrowBackIcon />
          </IconButton>
          <Breadcrumbs aria-label="breadcrumb">
           <Link component={RouterLink} color="inherit" to="/support/solutions">
             {t('menu.support')}
           </Link>
           {selectedSolutionId ? (
             <Link
              component={RouterLink}
              color="inherit"
              to={`/support/solutions/${selectedSolutionId}`}
             >
              {t('support.solutions')}
             </Link>
           ) : (
            <Typography color="textPrimary">{t('support.solutions')}</Typography>
           )}
           {selectedSolutionId && (
            <Typography color="textPrimary">{selectedSolutionId}</Typography>
           )}
          </Breadcrumbs>
        </Box>
      </Box>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <SolutionSearch setSearchTerm={setSearchTerm} />
        </Grid>
        <Grid item xs={12}>
          <SolutionsTable searchTerm={searchTerm} />
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default Solutions;
