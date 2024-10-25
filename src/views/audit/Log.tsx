import React from 'react';
import AuditLogList from '../../components/auditlist/AuditLogList'; 

const Log: React.FC = () => {
    return (
        <div>
            <h2>Audit Log</h2>
            <div style={{ margin: '30px 0' }}>
                <AuditLogList />
            </div>
        </div>
    );
};

export default Log;
