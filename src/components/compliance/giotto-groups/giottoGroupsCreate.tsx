import { ArrowBack } from '@mui/icons-material';
import {
  Box,
  Breadcrumbs,
  Button,
  Checkbox,
  IconButton,
  Link,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography
} from '@mui/material';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from 'src/components/shared/DashboardCard';
import { createGroup } from 'src/store/sections/compliance/giottoGroupsSlice';
import { useDispatch } from 'src/store/Store';
import * as Yup from 'yup';

interface Template {
  id: number;
  name: string;
}

interface Asset {
  id: number;
  name: string;
}

const CreateGiottoGroup: React.FC = ({ }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);

  const templatesList: Template[] = Array.from({ length: 5 }, (_, index) => ({
    id: index + 1,
    name: `Template ${index + 1}`,
  }));

  const assetsList: Asset[] = Array.from({ length: 5 }, (_, index) => ({
    id: index + 1,
    name: `Asset ${index + 1}`,
  }));

  const [selectedTemplates, setSelectedTemplates] = useState<number[]>([]);
  const [selectedAssets, setSelectedAssets] = useState<number[]>([]);

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
      name: Yup.string().required('Name is required'),
      description: Yup.string().nullable(),
    }),
    onSubmit: async (values) => {
      const newGroup = {
        name: values.name,
        description: values.description,
        templates: selectedTemplates,
        assets: selectedAssets,
      };

      try {
        setIsLoading(true);
        await dispatch(createGroup(newGroup));
        setIsLoading(false);
        navigate('/compliance/groups', {
          state: {
            message: t('wpscan.scan_created_successfully') || '',
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

  return (
    <PageContainer>
      <>
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
                create
              </Typography>
            </Breadcrumbs>
          </Box>
        </Box>
        <DashboardCard title=' Create Group'>
          <Box component="form" onSubmit={formik.handleSubmit} noValidate>

            <TextField
              fullWidth
              margin="normal"
              label="Name"
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
              label="Description"
              name="description"
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.description && Boolean(formik.errors.description)}
              helperText={formik.touched.description && formik.errors.description}
            />

            <Typography variant="h6" mt={3} gutterBottom>
              Templates
            </Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Select</TableCell>
                    <TableCell>Template Name</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {templatesList.map((template) => (
                    <TableRow key={template.id}>
                      <TableCell>
                        <Checkbox
                          checked={selectedTemplates.includes(template.id)}
                          onChange={() =>
                            toggleSelection(template.id, setSelectedTemplates, selectedTemplates)
                          }
                        />
                      </TableCell>
                      <TableCell>{template.name}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            <Typography variant="h6" mt={3} gutterBottom>
              Assets
            </Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Select</TableCell>
                    <TableCell>Asset Name</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {assetsList.map((asset) => (
                    <TableRow key={asset.id}>
                      <TableCell>
                        <Checkbox
                          checked={selectedAssets.includes(asset.id)}
                          onChange={() =>
                            toggleSelection(asset.id, setSelectedAssets, selectedAssets)
                          }
                        />
                      </TableCell>
                      <TableCell>{asset.name}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            <Box mt={3}>
              <Button type="submit" variant="contained" color="primary" fullWidth>
                Create Group
              </Button>
            </Box>
          </Box>
        </DashboardCard>
      </>
    </PageContainer>
  );
};

export default CreateGiottoGroup;
