import { Box, Button, Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import DashboardCard from 'src/components/shared/DashboardCard';
import SnackBarInfo from 'src/layouts/full/shared/SnackBar/SnackBarInfo';
import { useDispatch } from 'src/store/Store';
import { createTicket } from 'src/store/support/FreshTicketsSlice';
import * as Yup from 'yup';
import CustomFormLabel from '../../components/forms/theme-elements/CustomFormLabel';
import CustomTextField from '../../components/forms/theme-elements/CustomTextField';
import '../../styles/TicketForm.css';
import Loader from '../shared/Loader/Loader';

const StyledFileInput = styled('input')({
  display: 'block',
  padding: '0.5rem',
  border: '1px solid #ccc',
  borderRadius: '4px',
  backgroundColor: '#f9f9f9',
  cursor: 'pointer',
  transition: 'background-color 0.3s, border-color 0.3s',
  '&:hover': {
    backgroundColor: '#eaeaea',
    borderColor: '#007BFF',
  },
});

const TicketFormComp: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'info' | 'warning' | 'error'>('success');
  const [isLoading, setIsLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      subject: '',
      description: '',
      attach_file: null,
    },
    validationSchema: Yup.object({
      subject: Yup.string().required('Subject is required'),
      description: Yup.string().required('Description is required'),
    }),
    onSubmit: async (values) => {
      setIsLoading(true);
      const newTicket = {
        subject: values.subject,
        description: values.description,
        attach_file: values.attach_file,
      };

      try {
        await dispatch(createTicket(newTicket));
        navigate('/support/tickets', {
          state: {
            message: 'Ticket created successfully!',
            severity: 'success',
          },
        });
      } catch (error) {
        console.error('Error creating ticket:', error);
        setSnackbarMessage('There was an error creating the ticket.');
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
      } finally {
        setIsLoading(false);
      }
      
    },
  });

  return (
    <DashboardCard
      title={t('support.create_ticket')}
      subtitle={t('support.create_ticket_subtitle')}
    >
      <Box>
        {isLoading && <Loader />}
        {!isLoading && (
          <form onSubmit={formik.handleSubmit}>
            <TableContainer>
              <Table sx={{ border: 'none' }}>
                <TableBody>
                  <TableRow>
                    <TableCell sx={{ border: 'none', padding: '0.1rem' }}>
                      <CustomFormLabel htmlFor="subject">{t('support.subject')}</CustomFormLabel>
                      <CustomTextField
                        id="subject"
                        name="subject"
                        placeholder={t('support.enter_ticket_subject')}
                        value={formik.values.subject}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        fullWidth
                      />
                      {formik.touched.subject && formik.errors.subject && (
                        <span className="error">{formik.errors.subject}</span>
                      )}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ border: 'none', padding: '0.5rem' }}>
                      <CustomFormLabel htmlFor="description">{t('support.description')}</CustomFormLabel>
                      <CustomTextField
                        id="description"
                        name="description"
                        value={formik.values.description}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        multiline
                        rows={4}
                        fullWidth
                      />
                      {formik.touched.description && formik.errors.description && (
                        <span className="error">{formik.errors.description}</span>
                      )}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ border: 'none', padding: '0.1rem' }}>
                      <CustomFormLabel htmlFor="attach_file">{t('support.attach_file')}</CustomFormLabel>
                      <StyledFileInput
                        type="file"
                        id="attach_file"
                        name="attach_file"
                        onChange={(e) => formik.setFieldValue('attach_file', e.target.files?.[0])}
                      />
                      {formik.touched.attach_file && formik.errors.attach_file && (
                        <span className="error">{formik.errors.attach_file}</span>
                      )}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ border: 'none', padding: '0.1rem', paddingTop: 3 }}>
                      <Box display="flex" justifyContent="flex-start">
                        <Button type="submit" variant="contained" color="primary" disabled={isLoading}>
                          {t('support.create_ticket')}
                        </Button>
                      </Box>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </form>
        )}

        {/* Snackbar */}
        {snackbarOpen && (
          <SnackBarInfo
            color={snackbarSeverity}
            title={snackbarSeverity === 'success' ? 'Success' : 'Error'}
            message={snackbarMessage}
          />
        )}
      </Box>
    </DashboardCard>
  );
};

export default TicketFormComp;
