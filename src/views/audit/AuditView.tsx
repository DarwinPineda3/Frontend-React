import React from 'react';
import AuditLogList from '../../components/auditlist/AuditLogList';
import { Box, Breadcrumbs, Link, Typography, IconButton } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { ArrowBack } from '@mui/icons-material';

const AuditLogView: React.FC = () => {
    const navigate = useNavigate();

    return (
        <Box>
            <Box display="flex" alignItems="center" mb={2} mt={2}>
                <IconButton onClick={() => navigate(-1)} color="primary">
                    <ArrowBack />
                </IconButton>
                <Breadcrumbs aria-label="breadcrumb">
                    <Link component={RouterLink} to="/" color="inherit">
                        Home
                    </Link>
                    <Link component={RouterLink} to="/audit/log" color="inherit">
                        Audit Logs
                    </Link>
                </Breadcrumbs>
            </Box>

            <div style={{ margin: '30px 0' }}>
                <AuditLogList />
            </div>
        </Box>
    );
};

export default AuditLogView;
