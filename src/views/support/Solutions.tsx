import React, { useState } from 'react';
import SolutionSearch from '../../components/solutions/SolutionSearch';
import SolutionsTable from '../../components/solutions/SolutionsTable';

const Solutions: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');

    return (
        <div>
            <h2>Solutions</h2>
            <SolutionSearch setSearchTerm={setSearchTerm} />
            <SolutionsTable searchTerm={searchTerm} />
        </div>
    );
};

export default Solutions;
