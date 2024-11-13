import {
  Box,
  Chip,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useTheme,
} from '@mui/material';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import DashboardCard from 'src/components/shared/DashboardCard';
import { EHVulnerabilityType } from 'src/types/vulnerabilities/redteam/ethicalHackingReport';

interface EHReportTableListProps {
  vulnerabilities: EHVulnerabilityType[];
}

const paginated = 10;

const EHVulnerabilitiesList: React.FC<EHReportTableListProps> = ({ vulnerabilities }) => {


  const scoreOrder = { "Critical": 1, "High": 2, "Medium": 3, "Low": 4 };

  const vulnerabilitiesSorted = [...vulnerabilities].sort((a, b) => scoreOrder[a.risk] - scoreOrder[b.risk]);
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(vulnerabilities.length / paginated);

  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };

  // Obtener elementos de la página actual
  const vuls = vulnerabilitiesSorted.slice(
    (currentPage - 1) * paginated,
    currentPage * paginated
  );

  const theme = useTheme();
  const { high, medium, low, critical } = theme.palette.level;


  return (
    <DashboardCard
      title="Vulnerabilities" // Translate
    >
      <Box>
        <TableContainer>
          <Table aria-label="vulnerabilities table" sx={{ whiteSpace: 'nowrap' }}>
            <TableHead>
              <TableRow>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={600}>
                    {t("redteam.id")}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={600}>
                    {t("redteam.vulnerability")}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={600}>
                    {t("redteam.risk")}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={600}>
                    {t("redteam.port")}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={600}>
                    {t("redteam.host")}
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {vuls.map((vuln, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Typography fontWeight={400}>{index + 1}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="subtitle2"
                      fontWeight={600}
                      color="primary"
                      component="a"
                      // onClick={() => onEHReportClick(vuln.id)} // modal
                      style={{ cursor: 'pointer' }}
                    >
                      {vuln.vulnerability}
                    </Typography>
                  </TableCell>

                  <TableCell>
                    <Typography fontWeight={400}>
                      <Chip
                        label={vuln.risk}
                        color="secondary"
                        size="small"
                        style={{
                          backgroundColor:
                            vuln.risk === 'Critical'
                              ? critical
                              : vuln.risk === 'High'
                                ? high
                                : vuln.risk === 'Medium'
                                  ? medium
                                  : low,
                          color: '#fff',
                        }}
                      />

                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography fontWeight={400}>{vuln.port_protocol}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography fontWeight={400}>{vuln.host}</Typography>
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

export default EHVulnerabilitiesList;
