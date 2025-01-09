import { CalendarMonth, CalendarViewMonth, Check, FormatColorText, Info, MoreHoriz, Person, WarningTwoTone } from '@mui/icons-material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionDetails, AccordionSummary, Avatar, Box, Button, ButtonGroup, Chip, Grid, Link, List, ListItem, ListItemAvatar, ListItemText, Table, TableBody, TableCell, TableContainer, TableRow, Tooltip, Typography } from '@mui/material';
import { parseISO } from "date-fns";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Breadcrumb from "src/components/shared/breadcrumb/Breadcrumb";
import DashboardCard from "src/components/shared/DashboardCard";
import { fetchExecutionAssets, fetchExecutionControlResults, fetchExecutionControls, fetchExecutionDetail } from "src/store/sections/compliance/giotoExecutionsSlice";
import { useDispatch, useSelector } from "src/store/Store";
import GiottoExecutionTabs from './gittoExecutionTabs';

interface GiottoExecutionDetailProps {
  scanId: string;
  assetId: string | null;
  onAssetClick: (assetId: string) => void;
}


const GiottoExecutionDetail: React.FC<GiottoExecutionDetailProps> = ({ scanId, assetId, onAssetClick }) => {

  const { executionDetail, executionAssets, executionControls, executionControlResults } = useSelector((state: any) => state.GiottoExecutionsReducer);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const [currentControlsFilter, setcurrentControlsFilter] = useState('all');

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

  const selectedAsset = executionAssets.find((asset: any) => asset.id === Number(assetId));

  const consolidatedControlResults = executionControls.map((controlResult: any) => {
    var controlResultExecutions = executionControlResults.find((result: any) => result.controlId === controlResult.id);
    return {
      control: controlResult,
      hasUnexpextedResults: controlResultExecutions.controlResultExecutions.some((result: any) => !result.isExpectedResult),
      controlResultExecutions: controlResultExecutions
    }
  });

  const filteredControlResults = consolidatedControlResults.filter((control: any) => {
    if (control.hasUnexpextedResults && currentControlsFilter === 'failed') {
      return true;
    }
    if (!control.hasUnexpextedResults && currentControlsFilter === 'passed') {
      return true;
    }
    if (currentControlsFilter === 'all') {
      return true;
    } else {
      return false;
    }
  }
  );


  const getControlResultExecution = (controlExecutions: any) => {

    if (!controlExecutions) {
      return null;
    }
    return <GiottoExecutionTabs tabs={controlExecutions.controlResultExecutions}></GiottoExecutionTabs>;
  }

  const filter = (
    <ButtonGroup size="small" aria-label="Small button group">
      <Button onClick={() => setcurrentControlsFilter('all')} variant={currentControlsFilter === 'all' ? 'contained' : 'outlined'}>All</Button>
      <Button onClick={() => setcurrentControlsFilter('failed')} variant={currentControlsFilter === 'failed' ? 'contained' : 'outlined'}>Failed</Button>
      <Button onClick={() => setcurrentControlsFilter('passed')} variant={currentControlsFilter === 'passed' ? 'contained' : 'outlined'}>Passed</Button>
    </ButtonGroup>
  )

  return (
    <Box>
      <Breadcrumb
        title={executionDetail.processToExecute}>
        <Box display="flex" flexWrap="wrap" gap={1} mb={3}>
          <Chip label={`${parseISO(executionDetail.creationDate).toLocaleString()}`} color="primary" variant="outlined" />
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
          <Grid item xs={15} xl={10} md={8}>
            <Grid item xs={12} mb={2}>
              <DashboardCard title={'Execution Details'} >
                <List
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: 2, // Adjust spacing between items
                  }}
                >
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: 'primary.main' }}>
                        <CalendarMonth />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Creation Date" secondary={parseISO(executionDetail.creationDate).toLocaleString()} />
                  </ListItem>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: 'primary.main' }}>
                        <CalendarViewMonth />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Execution Date" secondary={executionDetail.endDate ? parseISO(executionDetail.endDate).toLocaleString() : "None"} />
                  </ListItem>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: 'primary.main' }}>
                        <MoreHoriz />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Status" secondary={executionDetail.status} />
                  </ListItem>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: 'primary.main' }}>
                        <Person />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="User Requesting" secondary={executionDetail.userRequesting} />
                  </ListItem>
                  {/*Asset Details*/}
                  {
                    selectedAsset && <ListItem>
                      <ListItemAvatar>
                        <Avatar sx={{ bgcolor: 'secondary.main' }}>
                          <Info />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText primary="Asset Name" secondary={selectedAsset.name} />
                    </ListItem>
                  }
                  {
                    selectedAsset && <ListItem>
                      <ListItemAvatar>
                        <Avatar sx={{ bgcolor: 'secondary.main' }}>
                          <FormatColorText />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText primary="Asset Description" secondary={selectedAsset.description} />
                    </ListItem>
                  }
                  {
                    selectedAsset && <ListItem>
                      <ListItemAvatar>
                        <Avatar sx={{ bgcolor: 'secondary.main' }}>
                          <CalendarMonth />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText primary="Last Connection" secondary={parseISO(selectedAsset.lastKeepAlive).toLocaleString()} />
                    </ListItem>
                  }
                  {
                    selectedAsset && <ListItem>
                      <ListItemAvatar>
                        <Avatar sx={{ bgcolor: 'secondary.main' }}>
                          <CalendarMonth />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText primary="Network Address" secondary={selectedAsset.networkAddress} />
                    </ListItem>
                  }
                </List>
              </DashboardCard>
            </Grid>
            {
              selectedAsset && <Grid item >
                <DashboardCard title={'Controls'}
                  action={filter}
                >
                  {
                    filteredControlResults.map((control: any) => (
                      <Accordion key={control.id}>
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="panel1-content"
                          id="panel1-header"
                        >
                          <Typography component="span">{control.control.name}</Typography>
                          <Typography component="span" sx={{ color: control.hasUnexpextedResults ? "red" : "green" }}>
                            {control.hasUnexpextedResults ? " - Failed" : " - Passed"}
                          </Typography>
                          {control.hasUnexpextedResults ? (
                            <Avatar sx={{ bgcolor: 'red', width: 24, height: 24, ml: 1 }}>
                              <WarningTwoTone />
                            </Avatar>
                          ) : (
                            <Avatar sx={{ bgcolor: 'green', width: 24, height: 24, ml: 1 }}>
                              <Check />
                            </Avatar>
                          )}
                        </AccordionSummary>
                        <AccordionDetails>
                          <TableContainer>
                            <Table>
                              <TableBody>
                                {getControlResultExecution(control.controlResultExecutions)}
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


        </Grid>
      </Box>
    </Box>
  );
};

export default GiottoExecutionDetail;