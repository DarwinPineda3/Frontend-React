import { ArrowBack } from '@mui/icons-material';
import { Box, Breadcrumbs, IconButton, Link } from '@mui/material';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom';
import GiottoExecutionDetail from 'src/components/compliance/executions/giotoExecutionDetail';
import GiottoExecutionList from 'src/components/compliance/executions/giottoExecutionList';
import PageContainer from 'src/components/container/PageContainer';

const ComplianceExecutionsView = () => {
  const { executionId } = useParams<{ executionId?: string }>();
  const { assetId } = useParams<{ assetId?: string }>();

  const [selectedExecution, setSelectedExecution] = useState<string | null>(null);
  const [selectedAsset, setselectedAsset] = useState<string | null>(null);

  useEffect(() => {
    if (assetId) {
      setselectedAsset(assetId);
    } else {
      setselectedAsset(null);
    }

    if (executionId) {
      setSelectedExecution(executionId);
    } else {
      setSelectedExecution(null);
    }
  });

  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <PageContainer title={String(t('compliance_menu.compliance_executions'))}>
      <Box mb={2}>
        <Box display="flex" alignItems="center" mt={2}>
          <IconButton onClick={() => navigate(-1)} color="primary">
            <ArrowBack />
          </IconButton>
          <Breadcrumbs aria-label="breadcrumb">
            <Link component={RouterLink} color="inherit" to="/compliance/executions">
              {t('compliance_menu.compliance')}
            </Link>
            <Link component={RouterLink} color="inherit" to="/compliance/executions">
              {t('compliance_menu.compliance_executions')}
            </Link>
            {
              selectedExecution != null && <Link component={RouterLink} color="inherit" to={`/compliance/executions/${executionId}`} >
                {executionId}
              </Link>
            }
            {
              selectedAsset != null && <Link component={RouterLink} color="inherit" to={`/compliance/executions/${executionId}/assets/${assetId}`} >
                {assetId}
              </Link>
            }
          </Breadcrumbs>
        </Box>
      </Box>
      {
        selectedExecution == null ? <GiottoExecutionList onScanClick={(id) => {
          navigate(`/compliance/executions/${id}`);
        }} /> :
          <GiottoExecutionDetail scanId={selectedExecution} assetId={selectedAsset}
            onAssetClick={
              (assetId) => {
                navigate(`/compliance/executions/${selectedExecution}/assets/${assetId}`);
              }
            } />
      }

    </PageContainer>

  );
};

export default ComplianceExecutionsView;
