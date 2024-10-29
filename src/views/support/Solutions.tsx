import React, { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { Box, Breadcrumbs, Link, IconButton } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SolutionSearch from '../../components/solutions/SolutionSearch';
import SolutionsTable from '../../components/solutions/SolutionsTable';

const Solutions: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    return (
        <Box>
            <Box display="flex" alignItems="center" mt={2}>
                <IconButton onClick={() => navigate(-1)} color="primary">
                    <ArrowBackIcon />
                </IconButton>
                <Breadcrumbs aria-label="breadcrumb">
                    <Link component={RouterLink} color="inherit" to="/">
                        Home
                    </Link>
                    <Link component={RouterLink} color="inherit" to="/support/solutions">
                        Solutions
                    </Link>
                </Breadcrumbs>
            </Box>
            <SolutionSearch setSearchTerm={setSearchTerm} />
            <SolutionsTable searchTerm={searchTerm} />
        </Box>
    );
};

export default Solutions;
