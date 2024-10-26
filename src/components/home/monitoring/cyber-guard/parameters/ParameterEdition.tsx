import React from 'react';
import { 
    Container, 
    Box, 
    Typography, 
    TextField, 
    Button, 
    FormControl, 
    FormHelperText, 
    Autocomplete
} from '@mui/material';
import { useDispatch } from 'src/store/Store';
import { createParameter, updateParameter } from 'src/store/sections/cyber-guard/ParametersSlice';
import { ParameterCyberGuardType, ParameterTypeChoice } from 'src/types/cyber-guard/parameters/parameter';
import { useFormik } from 'formik';
import * as Yup from 'yup';

interface Props {
  parameter?: ParameterCyberGuardType; // Optional for edit
  onSubmit: (message: string, severity: 'success' | 'info' | 'warning' | 'error') => void; // Callback after submission
}

const CreateUpdateParameter: React.FC<Props> = ({ parameter, onSubmit }) => {
  const dispatch = useDispatch();

  // Formik setup with Yup validation schema
  const formik = useFormik({
    initialValues: {
      parameter: parameter?.parameter || '',
      parameter_type: parameter?.parameter_type || '',
      is_active: parameter?.is_active !== undefined ? parameter.is_active : true,
      created_date: parameter?.created_date || new Date().toISOString(),
      updated_date: parameter?.updated_date || new Date().toISOString(),
    },
    validationSchema: Yup.object({
      parameter: Yup.string().required('Parameter is required'),
      parameter_type: Yup.string()
        .oneOf([
          "DOMAIN",
          "IPV4",
          "IPV6",
          "SUBDOMAIN",
          "SUBNET",
          "EMAIL",
          "PHONE",
          "NAME",
          "USERNAME",
          "VIN",
          "WORD",
          null
        ])
        .required('Parameter type is required'),
    }),
    onSubmit: (values) => {
      const newParameter: ParameterCyberGuardType = {
        id: parameter?.id || undefined,
        parameter: values.parameter,
        is_active: values.is_active,
        created_date: values.created_date,
        updated_date: values.updated_date,
        parameter_type: values.parameter_type as ParameterTypeChoice,
      };

      if (parameter) {
        dispatch(updateParameter(newParameter));
        onSubmit('Parameter updated successfully', 'success');
      } else {
        dispatch(createParameter(newParameter));
        onSubmit('Parameter created successfully', 'success');
      }
    },
  });

  const menuItems = [
    { value: "DOMAIN", label: "Domain" },
    { value: "IPV4", label: "IPv4" },
    { value: "IPV6", label: "IPv6" },
    { value: "SUBDOMAIN", label: "Subdomain" },
    { value: "SUBNET", label: "Subnet" },
    { value: "EMAIL", label: "Email" },
    { value: "PHONE", label: "Phone" },
    { value: "NAME", label: "Name" },
    { value: "USERNAME", label: "Username" },
    { value: "VIN", label: "VIN" },
    { value: "WORD", label: "Word" },
  ];

  const selectedOption = menuItems.find(item => item.value === formik.values.parameter_type);
  
  return (
    <Container maxWidth="sm">
      <Box component="form" onSubmit={formik.handleSubmit} noValidate>
        <Typography variant="h5" gutterBottom>
          {parameter ? 'Update Parameter' : 'Create Parameter'}
        </Typography>

        <TextField
          fullWidth
          margin="normal"
          label="Parameter Name"
          name="parameter"
          value={formik.values.parameter}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.parameter && Boolean(formik.errors.parameter)}
          helperText={formik.touched.parameter && formik.errors.parameter}
        />

        <FormControl fullWidth margin="normal" error={formik.touched.parameter_type && Boolean(formik.errors.parameter_type)}>
          <Autocomplete
                options={menuItems}
                getOptionLabel={(option) => option.label}
                value={selectedOption}
                onChange={(event, newValue) => {
                    formik.setFieldValue("parameter_type", newValue ? newValue.value : '');
                }}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Parameter Type"
                        variant="outlined"
                        error={formik.touched.parameter_type && Boolean(formik.errors.parameter_type)}
                    />
                )}
                renderOption={(props, option) => (
                    <li {...props} key={option.value}>
                        {option.label}
                    </li>
                )}
            />
          <FormHelperText>{formik.touched.parameter_type && formik.errors.parameter_type}</FormHelperText>
        </FormControl>

        <Box mt={2}>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            {parameter ? 'Update Parameter' : 'Create Parameter'}
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default CreateUpdateParameter;
