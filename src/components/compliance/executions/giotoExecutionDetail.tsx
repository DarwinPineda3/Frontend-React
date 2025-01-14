import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionDetails, AccordionSummary, Box, Chip, Grid, Link, Table, TableBody, TableCell, TableContainer, TableRow, Tooltip, Typography } from '@mui/material';
import { parseISO } from "date-fns";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import Breadcrumb from "src/components/shared/breadcrumb/Breadcrumb";
import DashboardCard from "src/components/shared/DashboardCard";
import InfoCard from "src/components/shared/InfoCard";
import { fetchExecutionAssets, fetchExecutionControlResults, fetchExecutionControls, fetchExecutionDetail } from "src/store/sections/compliance/giotoExecutionsSlice";
import { useDispatch, useSelector } from "src/store/Store";

interface GiottoExecutionDetailProps {
  scanId: string;
  assetId: string | null;
  onAssetClick: (assetId: string) => void;
}


const GiottoExecutionDetail: React.FC<GiottoExecutionDetailProps> = ({ scanId, assetId, onAssetClick }) => {

  const { executionDetail, executionAssets, executionControls, executionControlResults } = useSelector((state: any) => state.GiottoExecutionsReducer);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchExecutionDetail(scanId));
      await dispatch(fetchExecutionAssets(scanId));
      if (assetId) {
        await dispatch(fetchExecutionControlResults(scanId, assetId));
        await dispatch(fetchExecutionControls(scanId, assetId));
      }
    };
    fetchData();
  }, [dispatch, scanId, assetId]);

  if (!executionDetail) {
    return null;
  }

  const infoCardData = [
    { label: 'Execution ID', value: executionDetail.id },
    { label: 'Process ID', value: executionDetail.processId },
    { label: 'Process to Execute', value: executionDetail.processToExecute },
    { label: 'Status', value: executionDetail.status },
    { label: 'Creation Date', value: parseISO(executionDetail.creationDate).toLocaleString() },
    { label: 'Start Date', value: parseISO(executionDetail.startDate).toLocaleString() },
    { label: 'End Date', value: parseISO(executionDetail.endDate).toLocaleString() },
    { label: 'Execution Time', value: executionDetail.executionTime },
    { label: 'Execution Error', value: executionDetail.executionError },
    { label: 'Execution Output', value: executionDetail.executionOutput },
  ];

  /**
   * Function that returns the ControlResultExecution object for a given controlId
   */
  const getControlResultExecution = (controlId: number) => {
    var found = executionControlResults.find((result: any) => result.controlId === controlId);

    if (!found) {
      return null;
    }

    const body = [
      {
        label: "Status",
        value: found.controlResultExecutions[0].status
      },
      {
        label: "Execution Date",
        value: parseISO(found.controlResultExecutions[0].executionDate).toLocaleString()
      },
      {
        label: "Value Result",
        value: found.controlResultExecutions[0].valueResult
      },
      {
        label: "Message Result",
        value: found.controlResultExecutions[0].messageResult
      },
      {
        label: "Exception Result",
        value: found.controlResultExecutions[0].exceptionResult
      }
    ]
    return <Box>
      <InfoCard title={found.name} data={body} titleColor={""} />
    </Box>;
  }



  return (
    <Box>
      <Breadcrumb
        title={executionDetail.processToExecute}>
        <Box display="flex" flexWrap="wrap" gap={1} mb={3}>
          <Chip label={`${parseISO(executionDetail.creationDate).toLocaleString()}`} color="primary" variant="outlined" />
          <Chip label={`${executionDetail.status}`} color="info" variant="outlined" />
        </Box>
      </Breadcrumb>
      <Box>
        <Grid container spacing={2}>
          <Grid item xl={2} xs={15} md={4}>
            <DashboardCard title={'Assets'} >
              <TableContainer>
                <Table>
                  <TableBody>
                    {executionAssets.map((asset: any) => (
                      <TableRow key={asset.id}>
                        <TableCell>
                          <Tooltip title={'Last Active: ' + parseISO(asset.lastKeepAlive).toLocaleString()} arrow>
                            <Box>
                              <Link variant="body2" onClick={() => onAssetClick(asset.id)}>{asset.name}({asset.networkAddress})</Link>
                            </Box>
                          </Tooltip>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </DashboardCard>
          </Grid>
          {assetId == null ?
            <Grid item xs={15} xl={10} md={8}>
              <InfoCard title={'Template Execution'} data={infoCardData} titleColor={""}>
              </InfoCard>
            </Grid> :
            <Grid item xs={15} xl={10} md={8}>
              <DashboardCard title={'Controls'} >
                {
                  executionControls.map((control: any) => (
                    <Accordion key={control.id}>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1-content"
                        id="panel1-header"
                      >
                        <Typography component="span">{control.name}</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <TableContainer>
                          <Table>
                            <TableBody>
                              {getControlResultExecution(control.id)}
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </AccordionDetails>
                    </Accordion>
                  ))
                }
              </DashboardCard>
            </Grid>
          }
        </Grid>
      </Box>
    </Box>
  );
};

export default GiottoExecutionDetail;