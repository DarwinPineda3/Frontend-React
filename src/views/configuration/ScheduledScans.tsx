import React, { useState } from 'react';
import ScansTable from '../../components/configuration/ScanTable';
import { Box, Breadcrumbs, Link, IconButton } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { ArrowBack } from '@mui/icons-material';

const ScheduledScans: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
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
                    <Link component={RouterLink} color="inherit" to="/configuration/scheduled-scans">
                        Escaneos Programados
                    </Link>
                </Breadcrumbs>
            </Box>

            <div style={{ margin: '30px 0' }}>
                <ScansTable searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            </div>
        </Box>
    );
};

export default ScheduledScans;
