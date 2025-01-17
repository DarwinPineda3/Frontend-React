import DeleteIcon from '@mui/icons-material/Delete';
import DownloadIcon from '@mui/icons-material/Download';
import {
  Box,
  IconButton,
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

const burntScansData = [
  {
    id: '1',
    provider: 'AWS',
    cloudId: 'AKIAU6GDVX2P643LZAIG',
    date: '9 de octubre de 2024 a las 08:23',
  },
  {
    id: '2',
    provider: 'AWS',
    cloudId: 'AKIAU6GDVX2P643LZAIG',
    date: '1 de octubre de 2024 a las 10:48',
  },
  {
    id: '3',
    provider: 'GCP',
    cloudId: '104892762537578212777',
    date: '28 de agosto de 2024 a las 15:04',
  },
  {
    id: '4',
    provider: 'AWS',
    cloudId: 'AKIAU6GDVX2P643LZAIG',
    date: '28 de agosto de 2024 a las 15:03',
  },
  {
    id: '5',
    provider: 'GCP',
    cloudId: '104892762537578212777',
    date: '20 de junio de 2024 a las 11:44',
  },
  {
    id: '6',
    provider: 'Azure',
    cloudId: '91d34f3c-fcc2-41ad-839c-339132964d4a',
    date: '20 de junio de 2024 a las 11:40',
  },
  {
    id: '7',
    provider: 'AWS',
    cloudId: 'AKIAU6GDVX2P643LZAIG',
    date: '20 de junio de 2024 a las 11:40',
  },
];

interface ScanListTableProps {
  onScanClick: (scanId: string) => void;
}

const CloudScansTable: React.FC<ScanListTableProps> = ({ onScanClick }) => {
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 1; // Adjust based on the number of pages

  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };

  const handleDownload = (scanId: string) => {
    //console.log(`Downloading scan ${scanId}`);
  };

  const handleDelete = (scanId: string) => {
    //console.log(`Deleting scan ${scanId}`);
  };

  return (
    <Box>
      <DashboardCard title={t('observability.scans')!} subtitle={t('observability.list_of_all_scans')!}>
        <Box>
          <TableContainer>
            <Table aria-label="scan list table">
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Typography variant="subtitle2" fontWeight={600}>
                      {t('observability.provider')}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2" fontWeight={600}>
                      {t('observability.cloud_id')}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2" fontWeight={600}>
                      {t('observability.date')}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2" fontWeight={600}>
                      {t('observability.actions')}
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {burntScansData.map((scan) => (
                  <TableRow key={scan.id}>
                    <TableCell>
                      <Typography variant="body2" fontWeight={600}>
                        {scan.provider}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="subtitle2"
                        fontWeight={600}
                        color="primary"
                        component="a"
                        onClick={() => onScanClick(scan.id)}
                        style={{ cursor: 'pointer' }}
                      >
                        {scan.cloudId}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">{scan.date}</Typography>
                    </TableCell>
                    <TableCell>
                      <IconButton color="primary" onClick={() => handleDownload(scan.id)}>
                        <DownloadIcon />
                      </IconButton>
                      <IconButton color="error" onClick={() => handleDelete(scan.id)}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Box my={3} display="flex" justifyContent={'center'}>
            <Pagination
              count={totalPages}
              color="primary"
              page={currentPage}
              onChange={handlePageChange}
            />
          </Box>
        </Box>
      </DashboardCard>
    </Box>
  );
};

export default CloudScansTable;
