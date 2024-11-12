import ImageIcon from '@mui/icons-material/Image';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import {
  Box,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import DashboardCard from 'src/components/shared/DashboardCard';
import { EHEvidence } from 'src/types/vulnerabilities/redteam/ethicalHackingReport';

interface EHReportTableListProps {
  evidences: any;
}

const paginated = 5;

const EHEvidencesList: React.FC<EHReportTableListProps> = ({ evidences }) => {

  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(evidences.length / paginated);

  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };

  // Obtener elementos de la página actual
  const evidencesPaginated = evidences.slice(
    (currentPage - 1) * paginated,
    currentPage * paginated
  );

  const getFileIcon = (filename: string) => {
    const extension = filename.split('.').pop()?.toLowerCase();
    switch (extension) {
      case 'pdf':
        return <PictureAsPdfIcon color="primary" />;
      case 'png':
      case 'jpg':
      case 'jpeg':
        return <ImageIcon color="primary" />;
      default:
        return <InsertDriveFileIcon color="action" />;
    }
  };

  return (
    <DashboardCard
      title="Vulnerabilities" // Translate
    >
      <Box>
        <TableContainer>
          <Table aria-label="evidences table" sx={{ whiteSpace: 'nowrap' }}>
            <TableHead>
              <TableRow>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={600}>
                    Id //Translate
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={600}>
                    File //Translate
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={600}>
                    Actions //Translate
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {evidencesPaginated.map((evidence: EHEvidence, index: number) => (
                <TableRow key={index}>
                  <TableCell>
                    <Typography fontWeight={400}>{index + 1}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography>
                      {evidence.file}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography fontWeight={400}>{getFileIcon(evidence.file_path)}</Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Box my={3} display="flex" justifyContent="center">
          <Pagination
            count={totalPages}
            color="primary"
            page={currentPage}
            onChange={handlePageChange}
          />
        </Box>
      </Box>
    </DashboardCard>
  );
};

export default EHEvidencesList;
