import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import {
  Box,
  Chip,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@mui/material';
import { IconEye } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardCard from '../../shared/DashboardCard';
import Loader from '../../shared/Loader/Loader';
import { useTheme } from '@mui/material/styles';
import _ from 'lodash';
import { useTranslation } from 'react-i18next';
import EmptyState from 'src/components/shared/EmptyState';
import HumanizedDate from 'src/components/shared/HumanizedDate';

const TopVulnerabilities = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const theme = useTheme();

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simular la carga de datos estáticos
    const fetchData = () => {
      setLoading(true);
      try {
        const exampleData = [
          {
            id: '1',
            type: 'critical',
            hosts: 5,
            severity: 9.1,
            name: 'Vulnerability 1',
            date: '2023-03-13T12:00:00Z',
            tool: 'Network',
          },
          {
            id: '2',
            type: 'high',
            hosts: 10,
            severity: 7.5,
            name: 'Vulnerability 2',
            date: '2023-03-12T12:00:00Z',
            tool: 'Web App',
          },
          {
            id: '3',
            type: 'medium',
            hosts: 15,
            severity: 5.0,
            name: 'Vulnerability 3',
            date: '2023-03-11T12:00:00Z',
            tool: 'WordPress',
          },
          {
            id: '4',
            type: 'low',
            hosts: 20,
            severity: 2.5,
            name: 'Vulnerability 4',
            date: '2023-03-10T12:00:00Z',
            tool: 'Cloud',
          },
          // Agrega más datos de ejemplo según sea necesario
        ];
        setData(exampleData);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch data');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <DashboardCard title={t("dashboard.vulnerability_reports")} subtitle={t("dashboard.most_recent_scans")}>
        <Box display="flex" justifyContent="center" mt={4} mb={4}>
          <Loader />
        </Box>
      </DashboardCard>
    );
  }

  if (error) {
    return <div>{t("dashboard.error", { error })}</div>;
  }

  const criticalColor = theme.palette.level.critical;
  const highColor = theme.palette.level.high;
  const mediumColor = theme.palette.level.medium;
  const lowColor = theme.palette.level.low;
  const noneColor = theme.palette.level.none;

  const getChipColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'critical':
        return { color: criticalColor, label: t('monitoring.critical') };
      case 'high':
        return { color: highColor, label: t('monitoring.high') };
      case 'medium':
        return { color: mediumColor, label: t('monitoring.medium') };
      case 'low':
        return { color: lowColor, label: t('monitoring.low') };
      default:
        return { color: noneColor, label: 'N/A' };
    }
  };

  const getChipColorSeverity = (severity: number) => {
    if (severity > 8.0) {
      return { color: criticalColor };
    } else if (severity > 6.9) {
      return { color: highColor };
    } else if (severity > 3.9) {
      return { color: mediumColor };
    } else if (severity > 0) {
      return { color: lowColor };
    } else {
      return { color: noneColor };
    }
  };

  const handleViewReport = (id: string, tool: string) => {
    let url = '';
    if (tool === 'Network') {
      url = `/vulnerabilities/network/scans/detail/${id}`;
    } else if (tool === 'Web App') {
      url = `/vulnerabilities/web/applications/${id}`;
    } else if (tool === 'WordPress') {
      url = `/vulnerabilities/web/wordpress/${id}`;
    } else if (tool === 'Cloud') {
      url = `/vulnerabilities/cloud/vulnerabilities/${id}`;
    } else if (tool === 'Applications') {
      url = `/vulnerabilities/web/applications/${id}`;
    }
    return url;
  };

  return (
    <DashboardCard
      title={t("dashboard.vulnerability_reports")!}
      subtitle={t("dashboard.most_recent_scans")!}
    >
      {
        !data || data.length === 0 ?
          <EmptyState />
          : <TableContainer>
            <Table aria-label="vulnerability report table" sx={{ whiteSpace: 'wrap' }}>
              <TableHead>
                <TableRow>
                  {['type', 'hosts', 'severity', 'name', 'date', 'tool', 'view_report', 'ai_assistant_solution'].map((key) => (
                    <TableCell key={key}>
                      <Typography variant="subtitle2" fontWeight={600}>
                        {t(`dashboard.${key}`)}
                      </Typography>
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {data?.map((report) => (
                  <TableRow key={report.id}>
                    <TableCell>
                      <Typography variant="subtitle2" fontWeight={600}>
                        <Chip
                          label={getChipColor(_.lowerCase(report.type)).label}
                          sx={{
                            backgroundColor: getChipColor(_.lowerCase(report.type)).color,
                            color: 'white',
                          }}
                        />
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                        {report.hosts}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={report.severity}
                        sx={{
                          backgroundColor: getChipColorSeverity(report.severity).color,
                          color: 'white',
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                        {report.name}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <HumanizedDate dateString={report.date} />
                      <Typography>{new Date(report.date).toLocaleDateString()}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle2">{report.tool}</Typography>
                    </TableCell>
                    <TableCell>
                      <IconButton
                        size="small"
                        color="primary"
                        href={handleViewReport(report.id, report.tool)}
                      >
                        <IconEye />
                      </IconButton>
                    </TableCell>
                    <TableCell>
                      <IconButton
                        size="small"
                        color="primary"
                        href="#"
                        target="_blank"
                      >
                        <AutoAwesomeIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
      }
    </DashboardCard>
  );
};

export default TopVulnerabilities;