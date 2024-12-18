import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import DashboardCard from 'src/components/shared/DashboardCard';
import { AppState, useSelector } from 'src/store/Store';

interface ServiceTableProps {
  id: string;
}

const ServiceTable = ({ id }: ServiceTableProps) => {
  const { t } = useTranslation();

  const { observedAssetsDetail, error } = useSelector((state: AppState) => state.ObservedAssetsReducer);


  if (error) {
    return (
      <DashboardCard title={t('services')!}>
        <Typography variant="body1">{error}</Typography>
      </DashboardCard>
    );
  }
  return (
    <DashboardCard title={t('services')!}>
      <TableContainer>
        <Table aria-label="service table">
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  {t('service_name')}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  {t('status')}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  {t('startup_type')}
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {observedAssetsDetail?.cpuInfo.ServicesInfo.ServicesList.map((service, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Typography variant="body2">{service.ServiceName}</Typography>
                </TableCell>
                <TableCell>
                  <IconButton>
                    {service.ServiceStatus === 'Running' ? (
                      <LocalFireDepartmentIcon style={{ color: 'green' }} />
                    ) : (
                      <LocalFireDepartmentIcon style={{ color: 'grey' }} />
                    )}
                  </IconButton>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">{service.ServiceStartType}</Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </DashboardCard>
  );
};

export default ServiceTable;
