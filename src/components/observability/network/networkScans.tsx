import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  IconButton,
  TableContainer,
  Box,
  Pagination,
} from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import DeleteIcon from '@mui/icons-material/Delete';
import DashboardCard from 'src/components/shared/DashboardCard';
import { useTranslation } from 'react-i18next';

const burntScansData = [
  {
    id: '1',
    url: 'google.com',
    date: '8 de octubre de 2024 a las 07:47',
    scanSetting: 'Escaneo de puertos TCP',
  },
  {
    id: '2',
    url: 'google.com',
    date: '1 de octubre de 2024 a las 10:05',
    scanSetting: 'Escaneo de puertos TCP',
  },
  {
    id: '3',
    url: 'google.com',
    date: '10 de septiembre de 2024 a las 23:00',
    scanSetting: 'Escaneo de puertos TCP',
  },
  {
    id: '4',
    url: 'google.com/',
    date: '9 de septiembre de 2024 a las 23:00',
    scanSetting: 'Escaneo de puertos TCP',
  },
  {
    id: '5',
    url: 'google.com',
    date: '8 de septiembre de 2024 a las 23:00',
    scanSetting: 'Escaneo de puertos TCP',
  },
  {
    id: '6',
    url: 'google.com',
    date: '7 de septiembre de 2024 a las 23:00',
    scanSetting: 'Escaneo de puertos TCP',
  },
  {
    id: '7',
    url: 'google.com',
    date: '6 de septiembre de 2024 a las 23:00',
    scanSetting: 'Escaneo de puertos TCP',
  },
  {
    id: '8',
    url: 'google.com',
    date: '3 de septiembre de 2024 a las 12:11',
    scanSetting: 'Escaneo de puertos TCP',
  },
];

interface ScanListTableProps {
  onScanClick: (scanId: string) => void;
}

const NetworkScanListTable: React.FC<ScanListTableProps> = ({ onScanClick }) => {
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 1; // Adjust based on the number of pages

  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };

  const handleDownload = (scanId: string) => {
    console.log(`Downloading scan ${scanId}`);
  };

  const handleDelete = (scanId: string) => {
    console.log(`Deleting scan ${scanId}`);
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
                      {t('observability.url')}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2" fontWeight={600}>
                      {t('observability.date')}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2" fontWeight={600}>
                      {t('observability.scan_type')}
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
                      <Typography
                        variant="subtitle2"
                        fontWeight={600}
                        color="primary"
                        component="a"
                        onClick={() => onScanClick(scan.id)}
                        style={{ cursor: 'pointer' }}
                      >
                        {scan.url}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">{scan.date}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">{scan.scanSetting}</Typography>
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

export default NetworkScanListTable;
