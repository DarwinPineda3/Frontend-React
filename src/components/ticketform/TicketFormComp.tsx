import { Box, Button, Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
import { styled } from '@mui/material/styles';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import DashboardCard from 'src/components/shared/DashboardCard';
import CustomFormLabel from '../../components/forms/theme-elements/CustomFormLabel';
import CustomTextField from '../../components/forms/theme-elements/CustomTextField';
import '../../styles/TicketForm.css';
import { TicketType } from '../../types/apps/ticket';

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
  const navigate = useNavigate();
  const [ticket, setTicket] = useState<TicketType>({
    Id: Date.now(),
    ticketTitle: '',
    ticketDescription: '',
    Status: '',
    Label: '',
    thumb: '',
    AgentName: '',
    Date: new Date(),
    deleted: false,
    category: 'none',
    subcategory: '',
    urgency: '',
    pending: false,
    attachment: '',
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTicket((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      const fileUrl = URL.createObjectURL(selectedFile);
      setTicket((prev) => ({ ...prev, attachment: fileUrl }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { [key: string]: string } = {};

    if (!ticket.ticketTitle) newErrors.ticketTitle = t("support.title_required");
    if (!ticket.ticketDescription) newErrors.ticketDescription = t("support.description_required");

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const existingTickets = JSON.parse(localStorage.getItem('tickets') || '[]');
    localStorage.setItem('tickets', JSON.stringify([...existingTickets, ticket]));

    navigate('/support/tickets');

    setTicket({
      Id: Date.now(),
      ticketTitle: '',
      ticketDescription: '',
      Status: '',
      Label: '',
      thumb: '',
      AgentName: '',
      Date: new Date(),
      deleted: false,
      category: 'none',
      subcategory: '',
      urgency: '',
      pending: false,
      attachment: '',
    });

    setErrors({});
  };

  return (
    <DashboardCard
      title={t("support.create_ticket") as string}
      subtitle={t("support.create_ticket_subtitle") as string}
    >
      <form onSubmit={handleSubmit}>
        <TableContainer>
          <Table sx={{ border: 'none' }}>
            <TableBody>
              <TableRow>
                <TableCell sx={{ border: 'none', padding: '0.1rem' }}>
                  <CustomFormLabel htmlFor="ticketTitle">{t("support.subject")}</CustomFormLabel>
                  <CustomTextField
                    id="ticketTitle"
                    name="ticketTitle"
                    placeholder={t("support.enter_ticket_subject")}
                    value={ticket.ticketTitle}
                    onChange={handleChange}
                    fullWidth
                    sx={{ mt: 0.1 }}
                  />
                  {errors.ticketTitle && <span className="error">{errors.ticketTitle}</span>}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ border: 'none', padding: '0.5rem' }}>
                  <CustomFormLabel htmlFor="ticketDescription">{t("support.description")}</CustomFormLabel>
                  <CustomTextField
                    id="ticketDescription"
                    name="ticketDescription"
                    value={ticket.ticketDescription}
                    onChange={handleChange}
                    multiline
                    rows={4}
                    fullWidth
                    sx={{ mt: 0.1 }}
                  />
                  {errors.ticketDescription && <span className="error">{errors.ticketDescription}</span>}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ border: 'none', padding: '0.1rem' }}>
                  <CustomFormLabel htmlFor="file">{t("support.attach_file")}</CustomFormLabel>
                  <StyledFileInput
                    type="file"
                    id="file"
                    name="file"
                    onChange={handleFileChange}
                    style={{ width: '100%', backgroundColor: 'white' }}
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ border: 'none', padding: '0.1rem', paddingTop: 3 }}>
                  <Box display="flex" justifyContent="flex-start">
                    <Button type="submit" variant="contained" color="primary">
                      {t("support.create_ticket")}
                    </Button>
                  </Box>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </form>
    </DashboardCard>
  );
};

export default TicketFormComp;
