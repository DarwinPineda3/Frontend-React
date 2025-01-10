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
import {
  ComplianceProjectUpdate,
  editProject,
  fetchProjectById,
  setPage,
  setPageSize,
} from 'src/store/sections/compliance/giottoProjectsSlice';
import { ComplianceGroupListType } from 'src/types/giotto/ComplianceProjectType';
import * as Yup from 'yup';

const steps = ['Basic Information', 'Goups'];
interface Props {
  onSubmit: (message: string, severity: 'success' | 'info' | 'warning' | 'error') => void; // Callback after submission
}

const EditGiottoProjectForm: React.FC<Props> = ({ onSubmit }) => {
  const groupsList = [
    {
      id: 1,
      name: 'Grupo Demo A',
      assetsQty: 1,
    },
    {
      id: 2,
      name: 'Grupo Demo B',
      assetsQty: 2,
    },
    {
      id: 3,
      name: 'Grupo Demo C',
      assetsQty: 3,
    },
    {
      id: 4,
      name: 'Grupo Demo D',
      assetsQty: 4,
    },
    {
      id: 5,
      name: 'Grupo Demo E',
      assetsQty: 5,
    },
    {
      id: 6,
      name: 'Grupo Demo F',
      assetsQty: 6,
    },
    {
      id: 7,
      name: 'Grupo Demo G',
      assetsQty: 7,
    },
    {
      id: 8,
      name: 'Grupo Demo H',
      assetsQty: 8,
    },
    {
      id: 9,
      name: 'Grupo Demo I',
      assetsQty: 9,
    },
    {
      id: 10,
      name: 'Grupo Demo J',
      assetsQty: 10,
    },
    {
      id: 11,
      name: 'Grupo Demo K',
      assetsQty: 11,
    },
    {
      id: 12,
      name: 'Grupo Demo L',
      assetsQty: 12,
    },
    {
      id: 13,
      name: 'Grupo Demo M',
      assetsQty: 13,
    },
    {
      id: 14,
      name: 'Grupo Demo N',
      assetsQty: 14,
    },
    {
      id: 15,
      name: 'Grupo Demo O',
      assetsQty: 15,
    },
    {
      id: 16,
      name: 'Grupo Demo P',
      assetsQty: 16,
    },
    {
      id: 17,
      name: 'Grupo Demo Q',
      assetsQty: 17,
    },
    {
      id: 18,
      name: 'Grupo Demo R',
      assetsQty: 18,
    },
    {
      id: 19,
      name: 'Grupo Demo S',
      assetsQty: 19,
    },
    {
      id: 20,
      name: 'Grupo Demo T',
      assetsQty: 20,
    },
    {
      id: 21,
      name: 'Grupo Demo U',
      assetsQty: 21,
    },
    {
      id: 22,
      name: 'Grupo Demo V',
      assetsQty: 22,
    },
    {
      id: 23,
      name: 'Grupo Demo W',
      assetsQty: 23,
    },
    {
      id: 24,
      name: 'Grupo Demo X',
      assetsQty: 24,
    },
    {
      id: 25,
      name: 'Grupo Demo Y',
      assetsQty: 25,
    },
  ];
  const { projectId } = useParams<{ projectId?: string }>();
  const projectDetail = useSelector((state: any) => state.giottoProjectsReducer.projectDetail);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const [selectedGroups, setSelectedGroups] = useState<any[]>([]);

  const currentPage = useSelector((state: any) => state.summaryVulnReducer.page);
  const totalPages = useSelector((state: any) => state.summaryVulnReducer.totalPages);
  const pageSize = useSelector((state: any) => state.summaryVulnReducer.pageSize);
  const [allSelectedGroups, setAllSelectedGroups] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isStepSkipped = (step) => skipped.has(step);
  const [isLoading, setIsLoading] = useState(false);

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

  useEffect(() => {
    const newEndDate = new Date(startDate);
    newEndDate.setMonth(newEndDate.getMonth() + 1);
    const newEndDateString = newEndDate.toISOString().split('T')[0];

    if (newEndDateString >= startDate) {
      setEndDate(newEndDateString);
    }
  }, [startDate]);

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

  const handleSelectAllGroups = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked;
    setAllSelectedGroups(isChecked);

    if (isChecked) {
      setSelectedGroups(groupsList);
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
    if (newPage !== currentPage) {
      dispatch(setPage(newPage));
    }
  };

  const handlePageSizeChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const newPageSize = event.target.value as number;
    dispatch(setPageSize(newPageSize));
    dispatch(setPage(1));
  };

  // Formik setup with Yup validation schema
  const formik = useFormik({
    initialValues: {
      id: projectDetail?.id || null,
      name: projectDetail?.name || '',
      description: projectDetail?.description || '',
      groups: [],
      managers: [],
      groupTechnicians: [],
      startDate: startDate.toString(),
      endDate: endDate.toString(),
      disabledBy: null,
      companyId: null,
      isDisabled: false,
    },
    validationSchema: Yup.object({
      name: Yup.string().required(`${t('vulnerabilities.network_vulnerabilities.required_field')}`),
    }),
    enableReinitialize: true,
    onSubmit: async (values) => {
      const objProject: ComplianceProjectUpdate = {
        ...values,
      };
      setIsSubmitting(true);
      try {
        await dispatch(editProject(objProject));
        onSubmit(
          `${t('vulnerabilities.network_vulnerabilities.network_scan_create_successfully')}`,
          'success',
        );
      } catch (error) {
        console.error('Error creating network scan:', error);
        onSubmit(
          `${t('vulnerabilities.network_vulnerabilities.network_scan_create_failed')}`,
          'error',
        );
      } finally {
        setIsSubmitting(false);
      }
    },
  });

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
                        {/* {t('summary.date')} */}
                        Name
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle2" fontWeight={600}>
                        {/* {t('summary.tool')} */}
                        Assets Qty
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
              count={totalPages * pageSize}
              rowsPerPage={pageSize}
              page={currentPage - 1}
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
                <Alert severity="success">All steps completed - you&apos;re finished</Alert>
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
                  Back
                </Button>
                <Box flex="1 1 auto" />
                <Button
                  onClick={handleNext}
                  variant="contained"
                  color={activeStep === steps.length - 1 ? 'success' : 'secondary'}
                >
                  {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
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
