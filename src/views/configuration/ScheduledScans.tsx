import React, { useState } from 'react';
import ScansTable from '../../components/configuration/ScanTable';

const ScheduledScans = () => {
    const [searchTerm, setSearchTerm] = useState('');

    return (
        <div>
            <h2 style={{ marginBottom: '30px' }}>Escaneos programados</h2>
            <ScansTable searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </div>
    );
};

export default ScheduledScans;
