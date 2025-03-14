import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import DashboardCard from './DashboardCard';

interface InfoCardProps {
  title: string;
  data: { label: string; value: string | undefined }[];
  titleColor: string;
}

const InfoCard = ({ title, data, titleColor }: InfoCardProps) => {
  // Filtramos valores vacíos
  const { t } = useTranslation();

  const filteredData = data.filter(
    (item) => item.value !== undefined && item.value !== null && item.value !== '',
  );

  return (
    <DashboardCard>
      <>
        <Typography variant="h6" style={{ color: titleColor }} gutterBottom>
          {title}
        </Typography>
        <Box>
          {filteredData.length > 0 ? (
            filteredData.map((item, index) => (
              <Box key={index} mb={1}>
                <Typography variant="body2" fontWeight={600}>
                  {item.label}
                </Typography>
                <Typography variant="body2">{item.value}</Typography>
              </Box>
            ))
          ) : (
            <Typography variant="body2" color="textSecondary">
              {t('observability.not_enough_data')}
            </Typography>
          )}
        </Box>
      </>
    </DashboardCard>
  );
};

export default InfoCard;
