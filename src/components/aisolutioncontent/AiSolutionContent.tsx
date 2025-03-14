import { Box } from '@mui/material';
import { parse } from 'marked';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import SnackBarInfo from 'src/layouts/full/shared/SnackBar/SnackBarInfo';
import { useDispatch, useSelector } from 'src/store/Store';
import { fetchVulnerabilitySolution } from 'src/store/sections/vulnerabilities-solutions/SolutionVulnerabilitySlice';
import { vulnerabilitySolution } from 'src/types/solutions/vulnerabilitySolution';
import Loader from '../shared/Loader/Loader';

interface Props {
  vulnerabilityProps: vulnerabilitySolution;
}
const AiSolutionContent: React.FC<Props> = ({ vulnerabilityProps }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const vulnerabilitySolution = useSelector(
    (state: any) => state.vulnerabitySolutionReducer.vulnerabilitySolution,
  );
  const error = useSelector((state: any) => state.vulnerabitySolutionReducer.error);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      await dispatch(fetchVulnerabilitySolution(vulnerabilityProps));
      setIsLoading(false);
    };
    fetchData();
  }, [dispatch]);

  if (error) {
    return (
      <SnackBarInfo color="warning" title={t('dashboard.operation_status')} message={'error'} />
    );
  }
  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <Loader />
      </Box>
    );
  }

  const htmlContent = parse(vulnerabilitySolution);

  return (
    <Box sx={{ p: 2 }}>
      <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
    </Box>
  );
};

export default AiSolutionContent;
