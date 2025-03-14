import {
  Badge,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  useTheme,
} from '@mui/material';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import SocialNetworkDetailModal from 'src/components/home/monitoring/cyber-guard/brand-monitoring/brand-monitoring-details/security-leaks/SecurityLeaksModal';
import HumanizedDate from 'src/components/shared/HumanizedDate';
import { SocialNetwork } from 'src/types/cyber-guard/brand-monitoring/brandMonitoring';

interface SecurityLeakTableProps {
  social: SocialNetwork[];
}

const SocialNetworkTable: React.FC<SecurityLeakTableProps> = ({ social }) => {
  const theme = useTheme();
  const { high, medium, low, critical, unknown, none, info } = theme.palette.level;
  const { t } = useTranslation();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);
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

  const renderRiskChip = (riskLevel: string) => {
    const score = parseFloat(riskLevel);

    if (isNaN(score)) {
      return { color: none, label: t('monitoring.unknown') };
    }

    if (score >= 9.0) {
      return { color: critical, label: t('monitoring.critical') };
    } else if (score >= 7.0) {
      return { color: high, label: t('monitoring.high') };
    } else if (score >= 4.0) {
      return { color: medium, label: t('monitoring.medium') };
    } else if (score > 0.0) {
      return { color: low, label: t('monitoring.low') };
    } else {
      return { color: none, label: t('risk_analysis.no_risk') };
    }
  };

  const renderDate = (dateString: string, socialNetwork: string, defaultDate: string) => {
    if (!dateString) return defaultDate;
    const dateStr = dateString;
    const date = new Date(dateStr);
    const isoString = date.toISOString();
    switch (socialNetwork) {
      case 'twitter':
        return <HumanizedDate dateString={isoString} />;
      case 'instagram':
        return <HumanizedDate dateString={isoString} />;
      case 'linkedin':
        return <HumanizedDate dateString={isoString} />;
      default:
        return <HumanizedDate dateString={defaultDate} />;
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
                  {t('monitoring.risk_analysis')}
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
                  <Chip
                    label={renderRiskChip(social.data?.risk_analysis!).label}
                    sx={{
                      backgroundColor: renderRiskChip(social.data?.risk_analysis!).color,
                      color: 'white',
                    }}
                  />
                </TableCell>
                <TableCell>
                  {renderDate(
                    social.data.posted_date || social.date,
                    social.data.engine,
                    social.date,
                  )}
                  {social.data_new && <Badge badgeContent={'New'} color="primary" sx={{ ml: 3 }} />}
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
        rowsPerPageOptions={[5, 10, 25, 50, 100]}
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
