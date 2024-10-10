// src/views/audit/AuditView.tsx
import React from 'react';
import AuditLogList from '../../components/auditlist/AuditLogList'; 

const AuditLogView: React.FC = () => {
  return (
    <div>
      <h1>Audit Log</h1>
      <div style={{ margin: '30px 0' }}> 
        <AuditLogList />
      </div>
    </div>
  );
};

export default AuditLogView;
