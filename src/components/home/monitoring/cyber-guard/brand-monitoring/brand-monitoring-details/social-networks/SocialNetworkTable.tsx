import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Chip,
  TablePagination,
} from '@mui/material';
import { SocialNetwork } from 'src/types/cyber-guard/brand-monitoring/brandMonitoring';
import HumanizedDate from 'src/components/shared/HumanizedDate';
import SocialNetworkDetailModal from 'src/components/home/monitoring/cyber-guard/brand-monitoring/brand-monitoring-details/security-leaks/SecurityLeaksModal';
import { useTranslation } from 'react-i18next';

interface SecurityLeakTableProps {
  social: SocialNetwork[];
}

const SocialNetworkTable: React.FC<SecurityLeakTableProps> = ({ social }) => {
  const { t } = useTranslation();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedLeak, setSelectedLeak] = useState<SocialNetwork | null>(null);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const displayedLeaks = social.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const handleOpenModal = (social: SocialNetwork) => {
    setSelectedLeak(social);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedLeak(null);
  };

  const renderSentimentChip = (sentiment: string) => {
    switch (sentiment) {
      case '0':
        return <Chip label={t('monitoring.no_expresses_feeling')} color="default" />;
      case '1':
        return <Chip label={t('monitoring.very_dissatisfied')} color="error" />;
      case '2':
        return <Chip label={t('monitoring.dissatisfied')} color="warning" />;
      case '3':
        return <Chip label={t('monitoring.neutral')} color="info" />;
      case '4':
        return <Chip label={t('monitoring.satisfied')} color="success" />;
      case '5':
        return <Chip label={t('monitoring.very_satisfied')} color="primary" />;
      default:
        return <Chip label={t('monitoring.unknown')} color="default" />;
    }
  };

  return (
    <>
      <TableContainer>
        <Table aria-label="security social table">
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  {t('monitoring.data')}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  {t('monitoring.sentiment_analysis')}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  {t('monitoring.date')}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  {t('monitoring.source')}
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {displayedLeaks.map((social, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Typography
                    variant="subtitle2"
                    onClick={() => handleOpenModal(social)}
                    color="primary"
                    sx={{
                      cursor: 'pointer',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      maxWidth: 150,
                    }}
                  >
                    {social.data?.user_fullname ||
                      social.data?.username ||
                      social.data?.user_url ||
                      social.data?.url ||
                      'NA'}
                  </Typography>
                </TableCell>
                <TableCell>{renderSentimentChip(social.data?.sentiment_analysis || '0')}</TableCell>
                <TableCell>
                  <HumanizedDate dateString={social.date} />
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2">{social.source}</Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={social.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      <SocialNetworkDetailModal
        open={modalOpen}
        onClose={handleCloseModal}
        data={selectedLeak ? selectedLeak.data : {}}
      />
    </>
  );
};

export default SocialNetworkTable;
