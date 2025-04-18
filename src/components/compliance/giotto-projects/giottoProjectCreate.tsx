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
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import DashboardCard from 'src/components/shared/DashboardCard';
import { useDispatch, useSelector } from 'src/store/Store';
import { fetchGroups } from 'src/store/sections/compliance/giottoGroupsSlice';
import {
  ComplianceProjectCreate,
  createProject,
  setPage,
  setPageSize,
} from 'src/store/sections/compliance/giottoProjectsSlice';
import { ComplianceGroupListType } from 'src/types/giotto/ComplianceProjectType';
import * as Yup from 'yup';

interface Props {
  onSubmit: (message: string, severity: 'success' | 'info' | 'warning' | 'error') => void; // Callback after submission
}

const CreateGiottoProjectForm: React.FC<Props> = ({ onSubmit }) => {
  const groupsList = useSelector((state: any) => state.giottoGroupReducer.itemsResults);
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [selectedGroups, setSelectedGroups] = useState<any[]>([]);

  const page = useSelector((state: any) => state.giottoGroupReducer.page);
  const pageSize = useSelector((state: any) => state.giottoGroupReducer.pageSize);
  const totalItemsAmount = useSelector((state: any) => state.giottoGroupReducer.totalItemsAmount);
  const [allSelectedGroups, setAllSelectedGroups] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const steps = [
    t('compliance_projects.project_basic_information'),
    t('compliance_projects.project_group_title'),
  ];

  const isStepSkipped = (step: any) => skipped.has(step);
  React.useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchGroups(page, pageSize));
    };
    fetchData();
  }, [dispatch, page]);

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
    if (activeStep === steps.length - 1) {
      // Call create project
      formik.values.groups = selectedGroups;
      formik.handleSubmit();
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

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

  // Formik setup with Yup validation schema
  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      groups: [],
      managers: ['10147728-d58b-4858-a86d-73bc263ea7cc'],
      groupTechnicians: [],
      startDate: startDate.toString(),
      endDate: endDate.toString(),
      disabledBy: null,
      isDisabled: false,
    },
    validationSchema: Yup.object({
      name: Yup.string().required(`${t('compliance_projects.required_field')}`),
    }),
    onSubmit: async (values) => {
      const objProject: ComplianceProjectCreate = {
        ...values,
      };
      setIsSubmitting(true);
      try {
        await dispatch(createProject(objProject));
        onSubmit(`${t('compliance_projects.project_created_successfully')}`, 'success');
      } catch (error) {
        console.error('Error creating project:', error);
        onSubmit(`${t('compliance_projects.project_create_failed')}`, 'error');
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  React.useEffect(() => {
    const newEndDate = new Date(startDate);
    newEndDate.setMonth(newEndDate.getMonth() + 1);
    const newEndDateString = newEndDate.toISOString().split('T')[0];

    if (newEndDateString >= startDate) {
      setEndDate(newEndDateString);
    }
  }, [startDate]);

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

  const handleSelectAllGroups = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked;
    setAllSelectedGroups(isChecked);

    if (isChecked) {
      setSelectedGroups(groupsList.map((group) => group.id));
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

  React.useEffect(() => {
    setIsButtonDisabled(!formik.values.name.trim());
  }, [formik.values.name]);

  // eslint-disable-next-line consistent-return
  const handleSteps = (step) => {
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
                  {groupsList?.length > 0 ? (
                    groupsList?.map((group: any, index: number) => (
                      <TableRow key={index}>
                        <TableCell>
                          <input
                            type="checkbox"
                            checked={selectedGroups.some((g) => g === group?.id)}
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
      title={t('compliance_projects.project_create')!}
      subtitle={t('compliance_projects.project_create_description')!}
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
                <Alert severity="success">{t('compliance_projects.project_create_message')}</Alert>
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
                  disabled={isButtonDisabled}
                >
                  {activeStep === steps.length - 1
                    ? t('compliance_projects.project_btn_create')
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

export default CreateGiottoProjectForm;
