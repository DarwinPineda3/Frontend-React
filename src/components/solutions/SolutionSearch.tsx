import React, { useEffect, useState } from 'react';
import { Typography, TextField, Button, Box } from '@mui/material';

interface Solution {
    id: number;
    name: string;
}

interface SolutionSearchProps {
    setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}

const SolutionSearch: React.FC<SolutionSearchProps> = ({ setSearchTerm }) => {
    const [solutions, setSolutions] = useState<Solution[]>([]);
    const [filteredSolutions, setFilteredSolutions] = useState<Solution[]>([]);

    useEffect(() => {
        const fetchSolutions = async () => {
            const response = await fetch('/api/solutions'); // Cambiar esto a nuestro endpoint
            const data = await response.json();
            setSolutions(data);
            setFilteredSolutions(data); // Inicialmente, todas las soluciones serán visibles
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
        <div>
            <form onSubmit={handleSearch} style={{ width: '100%', maxWidth: 1600 }}>
                <Box display="flex" alignItems="center" width="100%">
                    <TextField
                        variant="outlined"
                        placeholder="Buscar Soluciones"
                        onChange={handleChange}
                        required
                        fullWidth
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    border: 'none', 
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
                        Buscar
                    </Button>
                </Box>
            </form>
            <ul>
                {filteredSolutions.map(solution => (
                    <li key={solution.id}>
                        <Typography variant="body2">{solution.name}</Typography>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SolutionSearch;
