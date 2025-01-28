import { FlipCameraAndroid, PlayCircleOutline, Refresh, SettingsSuggest, Visibility } from '@mui/icons-material';
import AddIcon from '@mui/icons-material/Add';
import { Box, FormControl, IconButton, InputLabel, LinearProgress, MenuItem, Select, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import DashboardCard from "src/components/shared/DashboardCard";
import HumanizedDate from "src/components/shared/HumanizedDate";
import Loader from "src/components/shared/Loader/Loader";
import SnackBarInfo from 'src/layouts/full/shared/SnackBar/SnackBarInfo';
import { fetchExecutions, requestAssessmentExecution, requestCreateExecution, requestHardeningExecution, requestRollbackExecution, TemplateExecution } from 'src/store/sections/compliance/giotoExecutionsSlice';
import { fetchProjectById, fetchProjects } from 'src/store/sections/compliance/giottoProjectsSlice';
import { useDispatch, useSelector } from "src/store/Store";

interface GiottoExecutionListProps {
  onScanClick: (scanId: string) => void;
}


const GiottoExecutionList: React.FC<GiottoExecutionListProps> = ({ onScanClick }) => {
  const [searchParams, setsearchParams] = useSearchParams();
  const { t } = useTranslation();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const {
    executions, page, pageSize, loading, totalItemsAmount
  } = useSelector((state: any) => state.GiottoExecutionsReducer);

  const { projects, projectDetail } = useSelector((state: any) => state.giottoProjectsReducer);

  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [selectedTemplate, setSelectedTemplate] = useState(null);


  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      //Get all the projects
      await dispatch(fetchProjects(page));

    };
    fetchData();
  }, [dispatch]);

  useEffect(() => {
    if (searchParams.get('project')) {
      setSelectedProject(Number(searchParams.get('project')));
    }
    if (searchParams.get('group')) {
      setSelectedGroup(Number(searchParams.get('group')));
    }
    if (searchParams.get('template')) {
      setSelectedTemplate(Number(searchParams.get('template')));
    }
  }, [searchParams, projects]);



  useEffect(() => {
    if (selectedProject != null) {
      dispatch(fetchProjectById(selectedProject.toString()));
      //add the selected project to the search params
      setsearchParams({ project: selectedProject.toString() });
    }
  }, [dispatch, selectedProject]);

  useEffect(() => {
    if (selectedTemplate) {
      dispatch(fetchExecutions(selectedProject!, selectedGroup!, selectedTemplate));
      //add the selected template to the search params
      setsearchParams({ template: selectedTemplate.toString(), project: selectedProject.toString(), group: selectedGroup.toString() });
    }
  }, [dispatch, selectedTemplate]
  );
  const [editAsset, setEditAsset] = useState<null | any>(null);
  const [openDialog, setOpenDialog] = useState(false);


  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'info' | 'warning' | 'error'>('success');


  const handlePageChange = (event: React.MouseEvent<HTMLButtonElement> | null, askedPage: number) => {
    if (page !== askedPage) {
      dispatch(fetchExecutions(askedPage));
    }
  };

  const handleDetailClick = (asset: any = null) => {
    onScanClick(asset.id);
  };

  const handleDeleteClick = (asset: any) => {
    setEditAsset(asset);
    setOpenDialog(true);
  }

  const handleAssessmentClick = (asset: any) => {
    const id = asset.id;
    dispatch(requestAssessmentExecution(id));
    setSnackbarMessage('Assessment execution requested');
    setSnackbarSeverity('info');
    setSnackbarOpen(true);
  }

  const handleHardeningClick = (asset: any) => {
    const id = asset.id;
    dispatch(requestHardeningExecution(id));
    setSnackbarMessage('Hardening execution requested');
    setSnackbarSeverity('info');
    setSnackbarOpen(true);
  }

  const handleRollbackClick = (asset: any) => {
    const id = asset.id;
    dispatch(requestRollbackExecution(id));
    setSnackbarMessage('Rollback execution requested');
    setSnackbarSeverity('info');
    setSnackbarOpen(true);
  }

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditAsset(null);
  };

  const handleAddClick = () => {
    dispatch(requestCreateExecution(selectedTemplate!, selectedProject!, selectedGroup!));
    setSnackbarMessage('Execution Creation requested');
    setSnackbarSeverity('info');
    setSnackbarOpen(true);
  }

  const groups = projectDetail?.groups;
  const templates = projectDetail?.groups?.find((group: any) => group.groupId === selectedGroup)?.groupTemplates;



  const addButton = (
    <IconButton color="primary" onClick={() => handleAddClick()}>
      <AddIcon />
    </IconButton>
  );

  const canRollback = (execution: TemplateExecution) => {
    const rollbackList = executions.filter((te: TemplateExecution) => te.processToExecute === 'Rollback');

    const maxDate = new Date(Math.max.apply(null, rollbackList.map((e: TemplateExecution) => new Date(e.creationDate))));

    return execution.processToExecute === 'Rollback' && execution.status !== 'Requested' && new Date(execution.creationDate).valueOf() === maxDate.valueOf();
  }

  const canCreate = () => {
    const workingList = executions.filter((te: TemplateExecution) => te.status !== 'Executed');
    return workingList.length === 0
  }

  const refreshButton = (
    <IconButton color="primary" onClick={() => dispatch(fetchExecutions(selectedProject!, selectedGroup!, selectedTemplate!))}>
      <Refresh />
    </IconButton>
  );

  const buttonActions = (
    <Box display="flex" justifyContent="flex-end">
      {addButton}
      {refreshButton}
    </Box>
  );

  const selectors = (
    <Box sx={{ marginBottom: 2 }}>
      <DashboardCard >
        <Box
          display="flex"
          flexDirection={isSmallScreen ? "column" : "row"}
          gap={2}
          padding={2}
        >
          {/* Project Selector*/}
          {
            projects && projects.length > 0 ? (
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Project</InputLabel>
                <Select
                  value={selectedProject}
                  onChange={(e) => {
                    setSelectedProject(Number(e.target.value));
                    setSelectedGroup(null);
                    setSelectedTemplate(null);
                  }}
                >
                  {projects.map((project: any) => (
                    <MenuItem value={project.id} key={project.id}>
                      {project.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            ) : <LinearProgress />
          }

          {/* Group Selector*/}
          {
            groups && groups.length > 0 ? (
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Group</InputLabel>
                <Select
                  value={selectedGroup}
                  onChange={(e) => {
                    setSelectedGroup(Number(e.target.value));
                    setSelectedTemplate(null);
                  }}
                >
                  {groups.map((group: any) => (
                    <MenuItem value={group.groupId} key={group.groupId}>
                      {group.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            ) : <LinearProgress />
          }

          {/* Template Selector*/}
          {
            templates && templates.length > 0 ? (
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Template</InputLabel>
                <Select
                  value={selectedTemplate}
                  onChange={(e) => setSelectedTemplate(Number(e.target.value))}
                >
                  {templates.map((template: any) => (
                    <MenuItem value={template.id} key={template.id}>
                      {template.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            ) : <LinearProgress />
          }
        </Box>
      </DashboardCard>
    </Box>
  )

  const tableResults = (
    <Box>
      <TableContainer>
        {/* Table view */}
        <Table>
          {/* Table head */}
          <TableHead>
            <TableRow>
              <TableCell>Creation Date</TableCell>
              <TableCell>Execution Date</TableCell>
              <TableCell>Process</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>User</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          {/* Table body */}
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={5}>
                  <Loader />
                </TableCell>
              </TableRow>
            ) : (
              executions.map((execution: TemplateExecution) => (
                <TableRow key={execution.id}>
                  <TableCell>
                    <Box display="flex" flexDirection="column">
                      <HumanizedDate dateString={execution.creationDate} />
                      <Typography variant="caption">
                        {new Date(execution.creationDate).toLocaleString()}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box display="flex" flexDirection="column">
                      {execution.executionDate ? (
                        <>
                          <HumanizedDate dateString={execution.executionDate} />
                          <Typography variant="caption">
                            {new Date(execution.executionDate).toLocaleString()}
                          </Typography>
                        </>
                      ) : (
                        <Typography variant="caption">
                          {t('never')}
                        </Typography>
                      )}
                    </Box>
                  </TableCell>
                  <TableCell>
                    {execution.processToExecute}
                  </TableCell>
                  <TableCell>
                    {execution.status}
                    {
                      execution.status === 'Requested' ? (
                        <LinearProgress />
                      ) : null
                    }
                  </TableCell>
                  <TableCell>
                    {execution.userRequesting}
                  </TableCell>
                  <TableCell>
                    <Box display="flex" gap={1}>
                      <IconButton
                        color="primary"
                        about='Play'
                        onClick={() => handleAssessmentClick(execution)}
                        disabled={
                          !(execution.processToExecute === 'Assessment' && execution.status === 'Registered')
                        }
                      >
                        <PlayCircleOutline />
                      </IconButton>
                      <IconButton
                        color="primary"
                        onClick={() => handleHardeningClick(execution)}
                        disabled={
                          !(execution.processToExecute === 'Hardening')
                        }
                      >
                        <SettingsSuggest />
                      </IconButton>
                      <IconButton
                        color="primary"
                        onClick={() => handleRollbackClick(execution)}
                        disabled={
                          !(execution.processToExecute === 'Rollback' && canRollback(execution))
                        }
                      >
                        <FlipCameraAndroid />
                      </IconButton>
                      <IconButton
                        color="primary"
                        onClick={() => handleDetailClick(execution)}
                      >
                        <Visibility />
                      </IconButton>
                    </Box>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 50, 100]}
        component="div"
        count={totalItemsAmount}
        rowsPerPage={pageSize}
        page={page - 1}
        onPageChange={(e, destPage) => handlePageChange(e, destPage + 1)}
        onRowsPerPageChange={(e) => { }}
      />
    </Box>
  );

  return (
    <Box>
      {projects && projects.length > 0 ? selectors : <LinearProgress></LinearProgress>}
      <DashboardCard
        title={t('compliance.executions_description') ?? ''}
        subtitle={t('compliance.executions_info') ?? ''}

        action={selectedTemplate ? buttonActions : null}
      >
        <Box>
          {
            selectedTemplate ? tableResults :
              <Box display="flex" justifyContent="center" alignItems="center" height="200px">
                <Typography variant="body1">
                  {"Please select a template to view executions"}
                </Typography>
              </Box>
          }
          {snackbarOpen && (
            <SnackBarInfo
              color={snackbarSeverity}
              title={t("dashboard.operation_status")}
              message={snackbarMessage}
            />
          )}
        </Box>

      </DashboardCard>
    </Box>


  );
};

export default GiottoExecutionList;

