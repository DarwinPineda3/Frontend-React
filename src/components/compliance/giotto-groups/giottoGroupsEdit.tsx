import { ArrowBack } from '@mui/icons-material';
import {
  Box,
  Breadcrumbs,
  Button,
  Checkbox,
  Grid,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography
} from '@mui/material';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, Link as RouterLink, useNavigate, useParams } from 'react-router-dom';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from 'src/components/shared/DashboardCard';
import Loader from 'src/components/shared/Loader/Loader';
import SnackBarInfo from 'src/layouts/full/shared/SnackBar/SnackBarInfo';
import { fetchAssets, setLoading } from 'src/store/sections/compliance/giotoAssetsSlice';
import { editGroup, fetchGroupById, fetchGroupName } from 'src/store/sections/compliance/giottoGroupsSlice';
import { fetchGetAllTemplates } from 'src/store/sections/compliance/giottoTemplatesSlice';
import { useDispatch, useSelector } from 'src/store/Store';
import * as Yup from 'yup';

interface Template {
  id: number;
  name: string;
}

const EditGiottoGroup: React.FC = () => {
  const { groupId } = useParams<{ groupId?: string }>();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    assets, page, pageSize, loading, totalItemsAmount
  } = useSelector((state: any) => state.GiottoAssetsReducer);

  const { templates } = useSelector((state: any) => state.giottoTemplatesReducer);

  useEffect(() => {
    const fetchDataAssets = async () => {
      setLoading(true);
      await dispatch(fetchAssets(page));
      setLoading(false);
    };

    const fetchDataTemplates = async () => {
      setLoading(true);
      await dispatch(fetchGetAllTemplates(templates.currentPage, templates.pageSize));
      setLoading(false);
    };
    fetchDataTemplates();
    fetchDataAssets();
  }, [dispatch, page, templates.currentPage]);

  const handlePageChange = (event: React.MouseEvent<HTMLButtonElement> | null, askedPage: number) => {
    if (page !== askedPage) {
      dispatch(fetchAssets(askedPage));
    }
  };

  const [isLoading, setIsLoading] = useState(false);

  const groupDetail = useSelector((state: any) => state.giottoGroupReducer.groupDetail);

  const templatesList: Template[] = Array.from({ length: 2 }, (_, index) => ({
    id: index + 1,
    name: `Template ${index + 1}`,
  }));

  const [selectedTemplates, setSelectedTemplates] = useState<number[]>([]);
  const [selectedAssets, setSelectedAssets] = useState<number[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      if (groupId) {
        try {
          setIsLoading(true);
          await dispatch(fetchGroupById(groupId));
          setIsLoading(false);
        } catch (error) {
          console.error('Error fetching group:', error);
        }
      }
    };
    fetchData();
  }, [dispatch]);


  useEffect(() => {
    if (groupDetail) {
      formik.setValues({
        name: groupDetail.name || '',
        description: groupDetail.description || '',
      });
      setSelectedTemplates(groupDetail.templates?.map((template: any) => template.id));
      setSelectedAssets(groupDetail.assets?.map((asset: any) => asset.id));
    }
  }, [groupDetail]);

  const toggleSelection = (
    id: number,
    setSelected: React.Dispatch<React.SetStateAction<number[]>>,
    selected: number[]
  ) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required(t('giotto.groups.name_required')!),
      description: Yup.string().nullable(),
    }),
    onSubmit: async (values, { setFieldError }) => {

      const originalAssetIds = groupDetail?.assets?.map((asset: any) => asset.id);
      const originalTemplateIds = groupDetail?.templates?.map((template: any) => template.id);

      const currentAssetIds = selectedAssets;
      const currentTemplateIds = selectedTemplates;

      const addedAssets = currentAssetIds?.filter((id) => !originalAssetIds.includes(id));
      const addedTemplates = currentTemplateIds?.filter((id) => !originalTemplateIds.includes(id));

      const removedAssets = originalAssetIds?.filter((id: any) => !currentAssetIds.includes(id));
      const removedTemplates = originalTemplateIds?.filter((id: any) => !currentTemplateIds.includes(id));

      const payload = {
        id: groupId,
        name: formik.values.name,
        description: formik.values.description,
        addedAssets,
        addedTemplates,
        removedAssets,
        removedTemplates,
      };

      const existGroupName = await fetchGroupName(values.name)

      if (existGroupName) {
        setFieldError('name', t('giotto.groups.group_name_already_exists')!);
        return;
      }


      try {
        setIsLoading(true);
        await dispatch(editGroup(payload));
        setIsLoading(false);
        navigate('/compliance/groups', {
          state: {
            message: t('giotto.groups.group_edited_successfully') || '',
            severity: 'success',
          },
        });
      } catch (error: any) {
        navigate('/compliance/groups', {
          state: {
            message: error,
            severity: 'error',
          },
        });

      }
    },
  });

  const paginatedT = 5;
  const [currentPageT, setCurrentPageT] = useState(1);
  const totalPagesT = Math.ceil(templatesList?.length / paginatedT);

  const handlePageChangeT = (event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPageT(page);
  };

  const templatesPaginated = templatesList?.slice(
    (currentPageT - 1) * paginatedT,
    currentPageT * paginatedT
  );


  return (
    <PageContainer>
      {/* <></> */}
      <Box mb={2}>
        <Box display="flex" alignItems="center" mt={2}>
          <IconButton onClick={() => navigate(-1)} color="primary">
            <ArrowBack />
          </IconButton>
          <Breadcrumbs aria-label="breadcrumb">
            <Link component={RouterLink} color="inherit" to="/compliance/groups">
              {t('compliance_menu.compliance')}
            </Link>
            <Link component={RouterLink} color="inherit" to="/compliance/groups">
              {t('compliance_menu.compliance_groups')}
            </Link>
            <Typography color="textPrimary">
              {t('giotto.groups.edit_group')}
            </Typography>
          </Breadcrumbs>
        </Box>
      </Box>
      <Grid container spacing={3}>
        <Grid item xs={12} xl={12}>
          <>
            {isLoading ? (
              <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" height="300px">
                <Loader />
                <Box component="small" mt={2} color="gray" textAlign="center" style={{ fontSize: '0.875rem' }}>
                  {t('giotto.groups.group_creation_message') || ''}
                </Box>
              </Box>
            ) : (
              <Box component="form" onSubmit={formik.handleSubmit} noValidate>
                <>
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <DashboardCard title={t('giotto.groups.edit_group')!}>
                        <Box>
                          <TextField
                            fullWidth
                            margin="normal"
                            label={t('giotto.groups.name')}
                            name="name"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.name && Boolean(formik.errors.name)}
                            helperText={formik.touched.name && formik.errors.name}
                          />

                          <TextField
                            fullWidth
                            margin="normal"
                            label={t('giotto.groups.description')}
                            name="description"
                            value={formik.values.description}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.description && Boolean(formik.errors.description)}
                            helperText={formik.touched.description && formik.errors.description}
                          />
                        </Box>

                      </DashboardCard>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <DashboardCard title={t('giotto.groups.assets')!}>
                        <Box>
                          <TableContainer>
                            {/* Table view */}
                            {loading ? (
                              <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" height="300px">
                                <Loader />
                              </Box>
                            ) : (
                              <Table>
                                {/* Table head */}
                                <TableHead>
                                  <TableRow>
                                    <TableCell>{t('giotto.groups.select')}</TableCell>
                                    <TableCell>{t('giotto.groups.name')}</TableCell>
                                    <TableCell>{t('giotto.groups.network_address')}</TableCell>
                                  </TableRow>
                                </TableHead>
                                {/* Table body */}
                                <TableBody>
                                  {assets.map((asset: any) => (
                                    <TableRow key={asset.id}>
                                      <TableCell>
                                        <Checkbox
                                          checked={selectedAssets.includes(parseInt(asset.id))}
                                          onChange={() =>
                                            toggleSelection(parseInt(asset.id), setSelectedAssets, selectedAssets)
                                          }
                                        />
                                      </TableCell>
                                      <TableCell>
                                        {asset.name}
                                      </TableCell>
                                      <TableCell>
                                        <Box display="flex" flexDirection="column">
                                          <Typography variant="caption">

                                            {asset.networkAddress}
                                          </Typography>
                                        </Box>
                                      </TableCell>
                                    </TableRow>
                                  ))}

                                </TableBody>
                              </Table>
                            )}
                          </TableContainer>
                          <TablePagination
                            rowsPerPageOptions={[5, 10, 25, 50, 100]}
                            component="div"
                            count={totalItemsAmount}
                            rowsPerPage={pageSize}
                            page={page - 1}
                            onPageChange={(e, destPage) => handlePageChange(e, destPage + 1)}
                            onRowsPerPageChange={(e) => dispatch(fetchAssets(page))}
                          />
                        </Box>
                      </DashboardCard>
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <DashboardCard title={t('giotto.groups.templates')!}>
                        <DashboardCard title={t('giotto.groups.templates')!}>
                          <Box>
                            <TableContainer>
                              {/* Table view */}
                              {loading ? (
                                <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" height="300px">
                                  <Loader />
                                </Box>
                              ) : (
                                <Table>
                                  {/* Table head */}
                                  <TableHead>
                                    <TableRow>
                                      <TableCell>{t('giotto.groups.select')}</TableCell>
                                      <TableCell>{t('giotto.groups.name')}</TableCell>
                                      <TableCell>{t('giotto.groups.working_system')}</TableCell>
                                    </TableRow>
                                  </TableHead>
                                  {/* Table body */}
                                  <TableBody>

                                    {templates.itemsResult.map((template: any) => (
                                      <TableRow key={template.id}>
                                        <TableCell>
                                          <Checkbox
                                            checked={selectedTemplates.includes(parseInt(template.id))}
                                            onChange={() =>
                                              toggleSelection(parseInt(template.id), setSelectedTemplates, selectedTemplates)
                                            }
                                          />
                                        </TableCell>
                                        <TableCell>
                                          {template.name}
                                        </TableCell>
                                        <TableCell>
                                          <Box display="flex" flexDirection="column">
                                            {template.workingSystemName}
                                          </Box>
                                        </TableCell>
                                      </TableRow>
                                    ))}
                                  </TableBody>
                                </Table>
                              )}
                            </TableContainer>
                            <TablePagination
                              rowsPerPageOptions={[5, 10, 25, 50, 100]}
                              component="div"
                              count={templates.totalItemsAmount}
                              rowsPerPage={templates.pageSize}
                              page={page - 1}
                              onPageChange={(e, destPage) => handlePageChange(e, destPage + 1)}
                              onRowsPerPageChange={(e) => dispatch(fetchGetAllTemplates(templates.currentPage, templates.pageSize))}
                            />
                          </Box>
                        </DashboardCard>
                      </DashboardCard>
                    </Grid>
                  </Grid>
                </>
                <Box mt={3}>
                  <Button type="submit" variant="contained" color="primary" fullWidth>
                    {t('giotto.groups.edit_group')}
                  </Button>
                </Box>
              </Box>
            )}
            {isLoading && (
              <SnackBarInfo
                color="info"
                title={t('giotto.groups.operation_status')}
                message={t('giotto.groups.group_in_progress')}
              />
            )}
          </>
        </Grid>
      </Grid>

    </PageContainer>
  );
};

export default EditGiottoGroup;