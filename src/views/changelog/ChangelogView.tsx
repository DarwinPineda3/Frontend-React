import React, { useState, useEffect } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import PageContainer from 'src/components/container/PageContainer';
import Logo from 'src/layouts/full/shared/logo/Logo';
import ChangelogList from 'src/components/changelog/ChangelogList';

const ChangelogView: React.FC = () => {
  const { t } = useTranslation();
  const [changes, setChanges] = useState<any[]>([]); 

  useEffect(() => {
    const fetchChangelogData = async () => {
      try {
        
        const response = await fetch('src/assets/changelog/changelog.json');
        const data = await response.json();
        setChanges(data);  
      } catch (error) {
        console.error('Error al cargar el changelog:', error);
      }
    };

    fetchChangelogData();  
  }, []);  

  return (
    <PageContainer title="Darwin's project">
      <Grid container spacing={3} alignItems="center">
        
        <Grid item xs={12} sm={4} container justifyContent="center">
          <Logo />
        </Grid>

        <Grid item xs={12} sm={8} container direction="column" alignItems="center"> 
          <Box mb={1} mt={4}> 
            <Typography variant="h4" gutterBottom textAlign="center"> 
              {t('changelog.title')}
            </Typography>
          </Box>

          <Box mb={2}>
            <Typography variant="body1" color="textSecondary" textAlign="center"> 
              {t('changelog.description')}
              <br />
              {t('changelog.format')}
            </Typography>
          </Box>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <ChangelogList changes={changes} />
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default ChangelogView;
