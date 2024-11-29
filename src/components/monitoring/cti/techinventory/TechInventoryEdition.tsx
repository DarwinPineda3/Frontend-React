import {
  Autocomplete,
  Box,
  Button,
  Container,
  FormControl,
  FormHelperText,
  TextField,
  Typography,
} from '@mui/material';
import { useFormik } from 'formik';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'src/store/Store';
import { createTechnology, editTechnology } from 'src/store/sections/cti/techInventorySlice';
import { TechInventoryType } from 'src/types/cti/technologies/techInventory';
import * as Yup from 'yup';

interface Props {
  technology?: TechInventoryType; // Optional for edit
  onSubmit: (message: string, severity: 'success' | 'info' | 'warning' | 'error') => void; // Callback after submission
}

const CreateUpdateTechonology: React.FC<Props> = ({ technology, onSubmit }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  // Formik setup with Yup validation schema
  const formik = useFormik({
    initialValues: {
      name: technology?.name || '',
      category: technology?.category || '',
      version: technology?.version || '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required'),
      category: Yup.string().oneOf(['OS', 'APPS', null]).required('Category is required'),
      version: Yup.string().required('Version is required'),
    }),
    onSubmit: (values) => {
      const newTechnology: TechInventoryType = {
        ...values,
        id: technology?.id || undefined, // Only include `id` if updating
      };

      if (technology) {
        dispatch(editTechnology(newTechnology));
        onSubmit('Technology updated successfully', 'success'); // Show success message for update
      } else {
        dispatch(createTechnology(newTechnology));
        onSubmit('Technology created successfully', 'success'); // Show success message for create
      }
    },
  });

  const menuItems = [
    { value: 'OS', label: 'OS' },
    { value: 'APPS', label: 'Apps' },
    { value: 'WEBSERVER', label: 'Web Server' },
    { value: 'BD', label: 'Database' },
    { value: 'FIREWALL', label: 'Firewall' },
    { value: 'ERP', label: 'ERP' },
    { value: 'CRM', label: 'CRM' },
    { value: 'VIRTUALIZATION', label: 'VIRTUALIZATION' },
    { value: 'VIRTUALIZATION', label: 'VIRTUALIZATION' },
    { value: 'SECURITY', label: 'Security' },
    { value: 'ANALYSIS', label: 'Analysis' },
    { value: 'MONITORING', label: 'Monitoring' },
  ];

  const selectedOption = menuItems.find((item) => item.value === formik.values.category);

  return (
    <Container maxWidth="sm">
      <Box component="form" onSubmit={formik.handleSubmit} noValidate>
        <Typography variant="h5" gutterBottom>
          {technology
            ? t('technologies_inventory.edit_technology')
            : t('technologies_inventory.create_technology')}
        </Typography>

        <TextField
          fullWidth
          margin="normal"
          label={t('dashboard.name')}
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
        />

        <FormControl
          fullWidth
          margin="normal"
          error={formik.touched.category && Boolean(formik.errors.category)}
        >
          <Autocomplete
            options={menuItems}
            getOptionLabel={(option) => option.label}
            value={selectedOption}
            onChange={(event, newValue) => {
              formik.setFieldValue('category', newValue ? newValue.value : '');
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label={t('technologies_inventory.category')}
                variant="outlined"
                error={formik.touched.category && Boolean(formik.errors.category)}
              />
            )}
            renderOption={(props, option) => (
              <li {...props} key={option.value}>
                {option.label}
              </li>
            )}
          />
          <FormHelperText>{formik.touched.category && formik.errors.category}</FormHelperText>
        </FormControl>

        <TextField
          fullWidth
          margin="normal"
          label={t('technologies_inventory.version')}
          name="version"
          value={formik.values.version}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.version && Boolean(formik.errors.version)}
          helperText={formik.touched.version && formik.errors.version}
        />

        <Box mt={2}>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            {technology ? t('dashboard.edit') : t('dashboard.create')}
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default CreateUpdateTechonology;
