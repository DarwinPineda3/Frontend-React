import { Box, Button, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import DashboardCard from '../shared/DashboardCard';

interface Solution {
    id: number;
    name: string;
}

interface SolutionSearchProps {
    setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}

const SolutionSearch: React.FC<SolutionSearchProps> = ({ setSearchTerm }) => {
    const { t } = useTranslation();
    const [solutions, setSolutions] = useState<Solution[]>([]);
    const [filteredSolutions, setFilteredSolutions] = useState<Solution[]>([]);
    const [searchTerm, setSearchTermLocal] = useState<string>('');

    useEffect(() => {
        const fetchSolutions = async () => {
            const response = await fetch('/api/solutions');
            const data = await response.json();
            setSolutions(data);
            setFilteredSolutions(data);
        };

        fetchSolutions();
    }, []);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        setSearchTerm(searchTerm); 

        const filtered = solutions.filter(solution =>
            solution.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredSolutions(filtered);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTermLocal(e.target.value); 
    };

    return (
        <DashboardCard>
            <Box>
                <form onSubmit={handleSearch} style={{ width: '100%' }}>
                    <Box display="flex" alignItems="center" width="100%">
                        <TextField
                            variant="outlined"
                            placeholder={t("support.search_solutions") || ""}
                            onChange={handleChange}
                            value={searchTerm} 
                            required
                            fullWidth
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': {
                                        borderColor: 'rgba(0, 0, 0, 0.23)',
                                    },
                                    '&:hover fieldset': {
                                        borderColor: '#1976d2',
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: '#1976d2',
                                    },
                                    '& input': {
                                        height: '40px',
                                        padding: '0 14px',
                                    },
                                },
                                boxShadow: 'none',
                            }}
                        />
                        <Button variant="contained" color="primary" type="submit" sx={{ ml: 1, height: '40px' }}>
                            {t("support.search_solutions")}
                        </Button>
                    </Box>
                </form>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                    {filteredSolutions.map(solution => (
                        <li key={solution.id}>
                            <Typography variant="body2">{solution.name}</Typography>
                        </li>
                    ))}
                </ul>
            </Box>
        </DashboardCard>
    );
};

export default SolutionSearch;
