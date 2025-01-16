import {
  Box,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const paginated = 10;

const GiottoTemplateControlTable: React.FC<{ technicians: any[] }> = ({ technicians }) => {
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(technicians?.length / paginated);

  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };

  return (
    <>
      <Box>
        <Table aria-label="technicians version table">
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  {t('compliance_tempaltes.template_control_name')}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  {t('compliance_tempaltes.template_control_name')}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  {t('compliance_tempaltes.template_control_name')}
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {technicians?.length > 0 ? (
              technicians.map((technician, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Typography variant="body2">{technician.name}</Typography>
                  </TableCell>
                  <TableCell>
                    <Box display="flex" alignItems="center" gap={1}>
                      <Typography variant="body2">{technician?.fullName}</Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box display="flex" alignItems="center" gap={1}>
                      <Typography variant="body2">{technician?.email}</Typography>
                    </Box>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3} align="center">
                  <Typography variant="body2" color="textSecondary">
                    {t('compliance_tempaltes.no_data_available')}
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Box>
      <Box my={3} display="flex" justifyContent="center">
        {totalPages > 0 && (
          <Pagination
            count={totalPages}
            color="primary"
            page={currentPage}
            onChange={handlePageChange}
          />
        )}
      </Box>
    </>
  );
};

export default GiottoTemplateControlTable;
