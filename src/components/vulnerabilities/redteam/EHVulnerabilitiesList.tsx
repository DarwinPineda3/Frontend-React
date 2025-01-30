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
import { useNavigate, useParams } from 'react-router-dom';
import DashboardCard from 'src/components/shared/DashboardCard';
import { EHVulnerabilityType } from 'src/types/vulnerabilities/redteam/ethicalHackingReport';


interface EHReportTableListProps {
  vulnerabilities: EHVulnerabilityType[];
  name: string
}

const paginated = 10;

const EHVulnerabilitiesList: React.FC<EHReportTableListProps> = ({ vulnerabilities, name }) => {
  const { ehReportId } = useParams<{ ehReportId?: string }>();
  const scoreOrder = { "critical": 1, "high": 2, "medium": 3, "low": 4 };
  const vulnerabilitiesSorted = [...vulnerabilities].sort((a, b) => scoreOrder[a.risk] - scoreOrder[b.risk]);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(vulnerabilities.length / paginated);

  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };
  const handleDetailsClick = (vulnerability: EHVulnerabilityType, report: string) => {
    navigate(`/vulnerabilities/redteam/${ehReportId}/vulnerability/detail`, {
      state: {
        vulnerability: vulnerability,
        nameReport: report,
        ehReportId: ehReportId,
      },
    });
  };

  const vuls = vulnerabilitiesSorted.slice(
    (currentPage - 1) * paginated,
    currentPage * paginated
  );

  const theme = useTheme();
  const { high, medium, low, critical } = theme.palette.level;

  return (
    <DashboardCard title={t("redteam.vulnerabilities") || ''}>
      <>
        <Box>
          <TableContainer>
            <Table aria-label="vulnerabilities table" sx={{ whiteSpace: 'nowrap' }}>
              <TableHead>
                <TableRow>
                  <TableCell>{t("redteam.id")}</TableCell>
                  <TableCell>{t("redteam.vulnerability")}</TableCell>
                  <TableCell>{t("redteam.risk")}</TableCell>
                  <TableCell>{t("redteam.port")}</TableCell>
                  <TableCell>{t("redteam.host")}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {vuls?.map((vuln, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Typography fontWeight={400}>{index + 1}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="subtitle2"
                        fontWeight={600}
                        color="primary"
                        component="span"
                        onClick={() => handleDetailsClick(vuln, name)}
                        style={{ cursor: 'pointer' }}
                      >
                        {vuln?.vulnerability}
                      </Typography>
                    </TableCell>

                    <TableCell>
                      <Typography fontWeight={400}>
                        <Chip
                          label={vuln?.risk === 'critical'
                            ? "critical"
                            : vuln?.risk === 'high'
                              ? "High"
                              : vuln?.risk === 'medium'
                                ? "Medium"
                                : "Low"}
                          color="secondary"
                          size="small"
                          style={{
                            backgroundColor:
                              vuln?.risk === 'critical'
                                ? critical
                                : vuln?.risk === 'high'
                                  ? high
                                  : vuln?.risk === 'medium'
                                    ? medium
                                    : low,
                            color: '#fff',
                          }}
                        />
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography fontWeight={400}>{vuln?.port_protocol}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography fontWeight={400}>{vuln?.host}</Typography>
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
      </>
    </DashboardCard>
  );
};

export default EHVulnerabilitiesList;
