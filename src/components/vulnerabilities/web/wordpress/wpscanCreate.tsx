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
import { createParameter } from 'src/store/sections/cyber-guard/ParametersSlice';
import * as Yup from 'yup';



const CreateWPScan: React.FC = ({ onSubmit }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  // Formik setup with Yup validation schema
  const formik = useFormik({
    initialValues: {
      hosts: '',
      config: ''
    },
    validationSchema: Yup.object({
      hosts: Yup.string().required(`${t('monitoring.parameter_required')}`),
      config: Yup.string()
        .oneOf([
          'scan_normal',
          'scan_deep',
          null,
        ])
        .required(`${t('monitoring.parameter_type_required')}`),
    }),
    onSubmit: async (values) => {
      const newWPScan: any = {
        id: undefined,
        hosts: values.hosts,
        config: values.config
      };

      try {
        await dispatch(createParameter(newWPScan));
        onSubmit(`creado exitosamente`, 'success');

      } catch (error: any) {
        const errorMessage =
          error instanceof Error
            ? error.message
            : Array.isArray(error)
              ? error[0]
              : error?.error
                ? error.error[0]
                : `${error}`;

        onSubmit(errorMessage, 'error');
      }
    },
  });

  const menuItems = [
    { value: 'scan_normal', label: `Scan normal` },
    { value: 'scan_deep', label: `Scan deep` },

  ];

  const selectedOption =
    menuItems.find((item) => item.value === formik.values.config) || null;

  return (
    <Container maxWidth="sm">
      <Box component="form" onSubmit={formik.handleSubmit} noValidate>
        <Typography variant="h5" gutterBottom>
          Crear escaneo
        </Typography>

        <TextField
          fullWidth
          margin="normal"
          label={t('monitoring.parameter_name')}
          name="hosts"
          value={formik.values.hosts}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.hosts && Boolean(formik.errors.hosts)}
          helperText={formik.touched.hosts && formik.errors.hosts}
        />

        <FormControl
          fullWidth
          margin="normal"
          error={formik.touched.config && Boolean(formik.errors.config)}
        >
          <Autocomplete
            options={menuItems}
            getOptionLabel={(option) => option.label}
            value={selectedOption}
            onChange={(event, newValue) => {
              formik.setFieldValue('config', newValue ? newValue.value : '');
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label={t('monitoring.config')}
                variant="outlined"
                error={formik.touched.config && Boolean(formik.errors.config)}
              />
            )}
            renderOption={(props, option) => (
              <li {...props} key={option.value}>
                {option.label}
              </li>
            )}
          />
          <FormHelperText>
            {formik.touched.config && formik.errors.config}
          </FormHelperText>
        </FormControl>

        <Box mt={2}>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Create scan
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default CreateWPScan;
