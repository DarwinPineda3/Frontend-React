import { ArrowBack } from '@mui/icons-material';
import { Box, Breadcrumbs, Grid, IconButton, Link } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import PageContainer from 'src/components/container/PageContainer';
import AuditLogList from '../../components/auditlist/AuditLogList';

const AuditLogView: React.FC = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();

    return (
        <PageContainer title="Akila">
            <Box mb={2}>
                <Box display="flex" alignItems="center" mt={2}>
                    <IconButton onClick={() => navigate(-1)} color="primary">
                        <ArrowBack />
                    </IconButton>
                    <Breadcrumbs aria-label="breadcrumb">
                        <Link component={RouterLink} color="inherit" to="/audit/log">
                            {t('menu.audit')}
                        </Link>
                        <Link component={RouterLink} color="inherit" to="/audit/log">
                            {t('menu.log')}
                        </Link>
                    </Breadcrumbs>
                </Box>
            </Box>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <AuditLogList />
                </Grid>
            </Grid>
        </PageContainer>
    );
};

export default AuditLogView;
