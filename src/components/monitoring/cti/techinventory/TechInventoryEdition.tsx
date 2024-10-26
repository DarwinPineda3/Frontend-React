import React from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  FormControl, 
  FormHelperText, 
  Autocomplete,
} from '@mui/material';
import { useDispatch } from 'src/store/Store';
import { createTechnology, editTechnology } from 'src/store/sections/cti/TechInventorySlice';
import { TechInventoryType } from "src/types/cti/technologies/techInventory";
import { useFormik } from 'formik';
import * as Yup from 'yup';

interface Props {
  technology?: TechInventoryType; // Optional for edit
  onSubmit: (message: string, severity: 'success' | 'info' | 'warning' | 'error') => void; // Callback after submission
}

const CreateUpdateTechonology: React.FC<Props> = ({ technology, onSubmit }) => {
  const dispatch = useDispatch();

  // Formik setup with Yup validation schema
  const formik = useFormik({
    initialValues: {
      name: technology?.name || '',
      category: technology?.category || '',
      version: technology?.version || ''
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required'),
      category:  Yup.string()
      .oneOf([
        "OS",
        "APPS",
        null
      ]).required('Category is required'),
      version: Yup.string().required('Version is required')
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
    { value: "OS", label: "OS" },
    { value: "APPS", label: "Apps" }
  ];

  const selectedOption = menuItems.find(item => item.value === formik.values.category);

  return (
    <Container maxWidth="sm">
      <Box component="form" onSubmit={formik.handleSubmit} noValidate>
        <Typography variant="h5" gutterBottom>
          {technology ? 'Update Technology' : 'Create Technology'}
        </Typography>

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



        <FormControl fullWidth margin="normal" error={formik.touched.category && Boolean(formik.errors.category)}>
          <Autocomplete
                options={menuItems}
                getOptionLabel={(option) => option.label}
                value={selectedOption}
                onChange={(event, newValue) => {
                    formik.setFieldValue("category", newValue ? newValue.value : '');
                }}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Category"
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
          label="Version"
          name="version"
          value={formik.values.version}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.version && Boolean(formik.errors.version)}
          helperText={formik.touched.version && formik.errors.version}
        />

        <Box mt={2}>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            {technology ? 'Update' : 'Create'}
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default CreateUpdateTechonology;
