import {
  Alert,
  Box,
  Button,
  Grid,
  Step,
  StepLabel,
  Stepper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import { Stack } from '@mui/system';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router';
import DashboardCard from 'src/components/shared/DashboardCard';
import { useDispatch, useSelector } from 'src/store/Store';
import { fetchGroups } from 'src/store/sections/compliance/giottoGroupsSlice';
import {
  ComplianceProjectUpdate,
  editProject,
  fetchProjectById,
  setPage,
  setPageSize,
} from 'src/store/sections/compliance/giottoProjectsSlice';
import { ComplianceGroupListType } from 'src/types/giotto/ComplianceProjectType';
import * as Yup from 'yup';

interface Props {
  onSubmit: (message: string, severity: 'success' | 'info' | 'warning' | 'error') => void; // Callback after submission
}

const EditGiottoProjectForm: React.FC<Props> = ({ onSubmit }) => {
  const groupsList = useSelector((state: any) => state.giottoGroupReducer.itemsResults);
  const { projectId } = useParams<{ projectId?: string }>();
  const projectDetail = useSelector((state: any) => state.giottoProjectsReducer.projectDetail);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const [selectedGroups, setSelectedGroups] = useState<any[]>([]);

  const page = useSelector((state: any) => state.giottoGroupReducer.page);
  const pageSize = useSelector((state: any) => state.giottoGroupReducer.pageSize);
  const totalItemsAmount = useSelector((state: any) => state.giottoGroupReducer.totalItemsAmount);
  const [allSelectedGroups, setAllSelectedGroups] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isStepSkipped = (step) => skipped.has(step);
  const [isLoading, setIsLoading] = useState(false);
  const steps = [
    t('compliance_projects.project_basic_information'),
    t('compliance_projects.project_group_title'),
  ];

  React.useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchGroups(page, pageSize));
    };
    fetchData();
  }, [dispatch, page]);

  // Dates
  const [startDate, setStartDate] = useState(() => {
    const now = new Date();
    now.setDate(1);
    return now.toISOString().split('T')[0];
  });

  const [endDate, setEndDate] = useState(() => {
    const now = new Date();
    now.setMonth(now.getMonth() + 1, 1);
    return now.toISOString().split('T')[0];
  });

  // Fetch project details
  useEffect(() => {
    const fetchData = async () => {
      if (projectId) {
        try {
          setIsLoading(true);
          await dispatch(fetchProjectById(projectId));
          setIsLoading(false);
        } catch (error) {
          console.error('Error fetching group:', error);
        }
      }
    };
    fetchData();
  }, [projectId, dispatch]);

  // Load to checkboxes
  useEffect(() => {
    if (projectDetail?.groups) {
      setSelectedGroups(projectDetail?.groups.map((group: any) => group.groupId));
    }
  }, [projectDetail]);

  // Set end date to be one month after start date
  useEffect(() => {
    const newEndDate = new Date(startDate);
    newEndDate.setMonth(newEndDate.getMonth() + 1);
    const newEndDateString = newEndDate.toISOString().split('T')[0];

    if (newEndDateString >= startDate) {
      setEndDate(newEndDateString);
    }
  }, [startDate]);

  const handleNext = async () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
    if (activeStep === steps.length - 1) {
      // Call create project
      const currentGroupIds = formik.values.groups.map((group) => group.groupId);
      const addedGroups = selectedGroups.filter((groupId) => !currentGroupIds.includes(groupId));
      const removedGroups = currentGroupIds.filter((groupId) => !selectedGroups.includes(groupId));
      delete formik.values.groups;
      formik.values.addedGroups = addedGroups;
      formik.values.removedGroups = removedGroups;
      formik.handleSubmit();
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSelectAllGroups = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked;
    setAllSelectedGroups(isChecked);
    if (isChecked) {
      setSelectedGroups(groupsList.map((group: any) => group.id));
    } else {
      setSelectedGroups([]);
    }
  };

  const handleSelectionChange = (group: ComplianceGroupListType) => {
    setSelectedGroups((prev) => {
      const exists = prev.find((g) => g === group.id);
      if (exists) {
        return prev.filter((g) => g !== group.id);
      }
      return [...prev, group.id];
    });
  };

  const handlePageChange = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
    page: number,
  ) => {
    const newPage = page + 1;
    if (newPage !== page) {
      dispatch(setPage(newPage));
    }
  };

  const handlePageSizeChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const newPageSize = event.target.value as number;
    dispatch(setPageSize(newPageSize));
    dispatch(setPage(1));
  };

  const formatDate = (dateString: any) => {
    if (!dateString) return '';
    return new Date(dateString).toISOString().split('T')[0];
  };

  // Formik setup with Yup validation schema
  const formik = useFormik({
    initialValues: {
      id: projectDetail?.id || null,
      name: projectDetail?.name || '',
      description: projectDetail?.description || '',
      groups: projectDetail?.groups,
      addedGroups: [],
      removedGroups: [],
      startDate: formatDate(projectDetail?.startDate) || startDate.toString(),
      endDate: formatDate(projectDetail?.endDate) || endDate.toString(),
      disabledBy: null,
      companyId: null,
      isDisabled: false,
    },
    validationSchema: Yup.object({
      name: Yup.string().required(`${t('compliance_projects.required_field')}`),
    }),
    enableReinitialize: true,
    onSubmit: async (values) => {
      const objProject: ComplianceProjectUpdate = {
        ...values,
      };
      setIsSubmitting(true);
      try {
        await dispatch(editProject(objProject));
        onSubmit(`${t('compliance_projects.project_updated_successfully')}`, 'success');
      } catch (error) {
        console.error('Error updating project:', error);
        onSubmit(`${t('compliance_projects.project_update_failed')}`, 'error');
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  // Data for steps
  const handleSteps = (step: any) => {
    switch (step) {
      case 0:
        return (
          <Box>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label={t('compliance_projects.project_name')}
                  name="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  error={formik.touched.name && Boolean(formik.errors.name)}
                  helperText={formik.touched.name && formik.errors.name}
                  margin="normal"
                />
              </Grid>

              {/* description */}
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label={t('compliance_projects.projects_description')}
                  name="description"
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  error={formik.touched.description && Boolean(formik.errors.description)}
                  helperText={formik.touched.description && formik.errors.description}
                  margin="normal"
                />
              </Grid>

              {/* Hosts */}
              <Grid item xs={12} sm={6}>
                <TextField
                  label={t('compliance_projects.project_start_date')!}
                  name="startDate"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  value={formik.values.startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  sx={{ minWidth: '150px' }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label={t('compliance_projects.project_end_date')!}
                  name="endDate"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  value={formik.values.endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  sx={{ minWidth: '150px' }}
                />
              </Grid>
            </Grid>
          </Box>
        );
      case 1:
        return (
          <Box>
            <TableContainer>
              <Table aria-label="groups table" sx={{ whiteSpace: 'nowrap' }}>
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <input
                        type="checkbox"
                        checked={allSelectedGroups}
                        onChange={handleSelectAllGroups}
                      />
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle2" fontWeight={600}>
                        {t('compliance_projects.project_group_name')}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle2" fontWeight={600}>
                        {t('compliance_projects.project_group_assets_qty')}
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {groupsList.length > 0 ? (
                    groupsList.map((group: any, index: number) => (
                      <TableRow key={index}>
                        <TableCell>
                          <input
                            type="checkbox"
                            checked={selectedGroups.some((g) => g === group.id)}
                            onChange={() => handleSelectionChange(group)}
                          />
                        </TableCell>
                        <TableCell>
                          <Typography variant="subtitle2" fontWeight={600}>
                            {group.name}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="subtitle2" fontWeight={600}>
                            {group.assetsQty}
                          </Typography>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={4}>
                        <Typography color="textSecondary" variant="subtitle2" align="center">
                          {t('compliance_projects.no_data_available')}
                        </Typography>
                      </TableCell>
                    </TableRow>
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
              onPageChange={handlePageChange}
              onRowsPerPageChange={handlePageSizeChange}
            />
          </Box>
        );
      default:
        break;
    }
  };

  return (
    <DashboardCard
      title={t('compliance_projects.project_edit_title')!}
      subtitle={t('compliance_projects.project_edit_subtitle')!}
    >
      <Grid item xs={12}>
        <Box component="form" onSubmit={formik.handleSubmit} noValidate>
          <Stepper activeStep={activeStep}>
            {steps.map((label, index) => {
              const stepProps = {};
              const labelProps = {};

              return (
                <Step key={label} {...stepProps}>
                  <StepLabel {...labelProps}>{label}</StepLabel>
                </Step>
              );
            })}
          </Stepper>
          {activeStep === steps.length ? (
            <>
              <Stack spacing={2} mt={3}>
                <Alert severity="success">{t('compliance_projects.project_updated_message')}</Alert>
              </Stack>
            </>
          ) : (
            <>
              <Box>{handleSteps(activeStep)}</Box>

              <Box display="flex" flexDirection="row" mt={3}>
                <Button
                  color="inherit"
                  variant="contained"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  sx={{ mr: 1 }}
                >
                  {t('compliance_projects.project_btn_back')}
                </Button>
                <Box flex="1 1 auto" />
                <Button
                  onClick={handleNext}
                  variant="contained"
                  color={activeStep === steps.length - 1 ? 'success' : 'secondary'}
                >
                  {activeStep === steps.length - 1
                    ? t('compliance_projects.project_btn_update')
                    : t('compliance_projects.project_btn_next')}
                </Button>
              </Box>
            </>
          )}
        </Box>
      </Grid>
    </DashboardCard>
  );
};

export default EditGiottoProjectForm;
