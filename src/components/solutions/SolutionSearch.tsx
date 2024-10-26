import React, { useEffect, useState } from 'react';
import { Typography, TextField, Button, Box } from '@mui/material';
import DashboardCard from '../shared/DashboardCard';
import { useTranslation } from 'react-i18next';

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
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const searchTerm = e.target.value;
        setSearchTerm(searchTerm);
        
        const filtered = solutions.filter(solution =>
            solution.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredSolutions(filtered);
    };

    return (
        <Box sx={{ margin: '30px', maxWidth: '100%', width: '100%', mx: 'auto' }}> 
            <DashboardCard>
                <Box>
                    <form onSubmit={handleSearch} style={{ width: '100%' }}>
                        <Box display="flex" alignItems="center" width="100%">
                            <TextField
                                variant="outlined"
                                placeholder={t("support.search_solutions")}
                                onChange={handleChange}
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
                            <Button variant="outlined" type="submit" sx={{ ml: 1, height: '40px' }}>
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
        </Box>
    );
};

export default SolutionSearch;
