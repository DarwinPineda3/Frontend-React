import React from 'react';
import {
  Box,
  Button,
  Typography,
  Container,
} from '@mui/material';
import { useDispatch } from 'src/store/Store';
import { createMalwareAnalysis, editMalwareAnalysis } from 'src/store/sections/malware-analysis/MalwareAnalysisSlice';
// import { MalwareAnalysisType } from 'src/types/malwareAnalysis/MalwareAnalysis';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Thumbnail from './MalwareAnalysisThumbnail';

interface Props {
    // malwareAnalysis?: MalwareAnalysisType; // Optional for edit
    malwareAnalysis?: any; // Optional for edit
    onSubmit: (message: string, severity: 'success' | 'info' | 'warning' | 'error') => void; // Callback after submission
}

const CreateUpdateMalwareAnalysis: React.FC<Props> = ({ malwareAnalysis, onSubmit }) => {
  const dispatch = useDispatch();

  // Formik setup with Yup validation schema
  const formik = useFormik({
    initialValues: {
      file: null
    },
    validationSchema: Yup.object({
      file: Yup.string().required('File is required'),
    }),
    onSubmit: (values) => {
      const newMalwareAnalysis: any = {
        ...values,
        id: malwareAnalysis?.id || undefined, // Only include `id` if updating
      };

      if (malwareAnalysis) {
        dispatch(editMalwareAnalysis(newMalwareAnalysis));
        onSubmit('Asset updated successfully', 'success'); // Show success message for update
      } else {
        dispatch(createMalwareAnalysis(newMalwareAnalysis));
        onSubmit('Asset created successfully', 'success'); // Show success message for create
      }
    },
  });

  return (
    <Container maxWidth="sm">
      <Box component="form" onSubmit={formik.handleSubmit} noValidate>
        <Typography variant="h5" gutterBottom>
          {malwareAnalysis ? 'Update Malware Analysis' : 'Create Malware Analysis'}
        </Typography>

        <Thumbnail />

        <Box mt={2}>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            {malwareAnalysis ? 'Update Malware Analysis' : 'Create Malware Analysis'}
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default CreateUpdateMalwareAnalysis;