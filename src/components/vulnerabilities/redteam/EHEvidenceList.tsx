import ImageIcon from '@mui/icons-material/Image';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography
} from '@mui/material';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import DashboardCard from 'src/components/shared/DashboardCard';
import { EHEvidence } from 'src/types/vulnerabilities/redteam/ethicalHackingReport';
import PreviewFileModal from './EhPreviewFileModal';

interface EHReportTableListProps {
  evidences: any;
}

const paginated = 10;

const EHEvidencesList: React.FC<EHReportTableListProps> = ({ evidences }) => {

  const { t } = useTranslation();
  const [openModal, setOpenModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);

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
  const handleOpenModal = (filePath: string) => {
    setSelectedFile(filePath);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setSelectedFile(null);
    setOpenModal(false);
  };

  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setCurrentPage(newPage);
  };
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(0);
  };

  const paginatedItems = (evidences || []).slice(
    currentPage * rowsPerPage,
    currentPage * rowsPerPage + rowsPerPage
  );

  return (
    <DashboardCard title={t("redteam.vulnerabilities")!}>
      <>
        <Box>
          <TableContainer>
            <Table aria-label="evidences table" sx={{ whiteSpace: 'nowrap' }}>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Typography variant="subtitle2" fontWeight={600}>
                      {t("redteam.id")}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2" fontWeight={600}>
                      {t("redteam.file")}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2" fontWeight={600}>
                      {t("redteam.actions")}
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedItems.map((evidence: EHEvidence, index: number) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Typography fontWeight={400}>{index + 1}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography>{evidence.file}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography onClick={() => handleOpenModal(evidence?.file_path || '')} style={{ cursor: 'pointer' }}>
                        {getFileIcon(evidence?.file_path || '')}
                      </Typography>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, 50, 100]}
              component="div"
              count={(evidences || []).length}
              rowsPerPage={rowsPerPage}
              page={currentPage}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </TableContainer>
        </Box>
        <PreviewFileModal
          open={openModal}
          filePath={selectedFile}
          handleClose={handleCloseModal}
        />
      </>

    </DashboardCard>
  );
};

export default EHEvidencesList;
