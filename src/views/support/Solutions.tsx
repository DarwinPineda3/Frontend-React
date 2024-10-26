import React, { useState } from 'react';
import SolutionSearch from '../../components/solutions/SolutionSearch';
import SolutionsTable from '../../components/solutions/SolutionsTable';
import { useTranslation } from 'react-i18next';

const Solutions: React.FC = () => {
    const { t } = useTranslation();
    const [searchTerm, setSearchTerm] = useState('');

    return (
        <div>
            <h2>{t("support.solutions")}</h2>
            <SolutionSearch setSearchTerm={setSearchTerm} />
            <SolutionsTable searchTerm={searchTerm} />
        </div>
    );
};

export default Solutions;
