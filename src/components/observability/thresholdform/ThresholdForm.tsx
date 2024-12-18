import { Box, Button, Slider } from '@mui/material';
import { Field, Form, Formik } from 'formik';
import React from 'react';
import { useTranslation } from 'react-i18next';
import DashboardCard from 'src/components/shared/DashboardCard';
import * as Yup from 'yup';
import CustomFormLabel from '../../forms/theme-elements/CustomFormLabel';
import CustomTextField from '../../forms/theme-elements/CustomTextField';

interface ThresholdFormProps {
  onSubmit: (data: {
    CPU: number;
    RAM: number;
    STORAGE: number;
    USEREMAIL: string;
  }) => void;
  initialValues?: {
    cpu: number;
    ram: number;
    storage: number;
    email: string;
  };
}

const ThresholdForm: React.FC<ThresholdFormProps> = ({ onSubmit, initialValues }) => {
  const { t } = useTranslation();

  // Validation Schema with Yup
  const validationSchema = Yup.object({
    CPU: Yup.number().min(1).max(100).required(t('thresholdForm.cpu_required') ?? 'CPU threshold is required'),
    RAM: Yup.number().min(1).max(100).required(t('thresholdForm.ram_required') ?? 'RAM threshold is required'),
    STORAGE: Yup.number().min(1).max(100).required(t('thresholdForm.storage_required') ?? 'Storage threshold is required'),
    USEREMAIL: Yup.string()
      .email(t('thresholdForm.invalid_email') ?? 'Invalid email address')
      .required(t('thresholdForm.email_required') ?? 'Email is required'),
  });

  const handleSubmit = (values: { CPU: number; RAM: number; STORAGE: number; USEREMAIL: string }) => {
    onSubmit(values);
  };

  return (
    <DashboardCard
      title={t('threshold.threshold_settings') ?? 'Threshold Settings'}
      subtitle={t('thresholdForm.subtitle') ?? 'Adjust the resource usage limits below to set your thresholds.'}
    >
      <Formik
        initialValues={{
          CPU: initialValues?.cpu ?? 95,
          RAM: initialValues?.ram ?? 95,
          STORAGE: initialValues?.storage ?? 95,
          USEREMAIL: initialValues?.email ?? 'Example@email.com',
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, handleChange, handleBlur, errors, touched, setFieldValue }) => (
          <Form>
            {/* CPU Threshold */}
            <CustomFormLabel htmlFor="cpu-threshold" sx={{ mt: 0 }}>
              {t('thresholdForm.cpu_threshold', { defaultValue: 'CPU Threshold (%)' })}
            </CustomFormLabel>
            <Field
              id="cpu-threshold"
              name="CPU"
              value={values.CPU}
              onChange={handleChange}
              onBlur={handleBlur}
              as={CustomTextField}
              variant="outlined"
              fullWidth
              type="number"
              inputProps={{ min: 1, max: 100 }}
            />
            {errors.CPU && touched.CPU && <div>{errors.CPU}</div>}
            <Slider
              value={values.CPU}
              onChange={(_, value) => setFieldValue('CPU', Number(value))}
              min={0}
              max={100}
            />

            {/* RAM Threshold */}
            <CustomFormLabel htmlFor="ram-threshold" sx={{ mt: 3 }}>
              {t('thresholdForm.ram_threshold', { defaultValue: 'RAM Threshold (%)' })}
            </CustomFormLabel>
            <Field
              id="ram-threshold"
              name="RAM"
              value={values.RAM}
              onChange={handleChange}
              onBlur={handleBlur}
              as={CustomTextField}
              variant="outlined"
              fullWidth
              type="number"
              inputProps={{ min: 1, max: 100 }}
            />
            {errors.RAM && touched.RAM && <div>{errors.RAM}</div>}
            <Slider
              value={values.RAM}
              onChange={(_, value) => setFieldValue('RAM', Number(value))}
              min={0}
              max={100}
            />

            {/* Storage Threshold */}
            <CustomFormLabel htmlFor="storage-threshold" sx={{ mt: 3 }}>
              {t('thresholdForm.storage_threshold', { defaultValue: 'Storage Threshold (%)' })}
            </CustomFormLabel>
            <Field
              id="storage-threshold"
              name="STORAGE"
              value={values.STORAGE}
              onChange={handleChange}
              onBlur={handleBlur}
              as={CustomTextField}
              variant="outlined"
              fullWidth
              type="number"
              inputProps={{ min: 1, max: 100 }}
            />
            {errors.STORAGE && touched.STORAGE && <div>{errors.STORAGE}</div>}
            <Slider
              value={values.STORAGE}
              onChange={(_, value) => setFieldValue('STORAGE', Number(value))}
              min={0}
              max={100}
            />

            {/* User Email */}
            <CustomFormLabel htmlFor="user-email" sx={{ mt: 3 }}>
              {t('thresholdForm.user_email', { defaultValue: 'Email Address' })}
            </CustomFormLabel>
            <Field
              id="user-email"
              name="USEREMAIL"
              value={values.USEREMAIL}
              onChange={handleChange}
              onBlur={handleBlur}
              as={CustomTextField}
              variant="outlined"
              fullWidth
              type="email"
            />
            {errors.USEREMAIL && touched.USEREMAIL && <div>{errors.USEREMAIL}</div>}

            {/* Save Button */}
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
              <Button variant="contained" color="primary" type="submit">
                {t('thresholdForm.save_changes', { defaultValue: 'Save Changes' })}
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </DashboardCard>
  );
};

export default ThresholdForm;
