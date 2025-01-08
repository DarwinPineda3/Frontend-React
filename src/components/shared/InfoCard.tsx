import { Box, Typography } from "@mui/material";
import DashboardCard from "./DashboardCard";

interface InfoCardProps {
  title: string;
  data: { label: string; value: string | undefined }[];
  titleColor: string;
}

const InfoCard = ({ title, data, titleColor }: InfoCardProps) => {
  // igfore the data vaules with undefined
  data = data.filter((item) => item.value !== undefined && item.value !== null && item.value !== '');
  return <DashboardCard>
    <>
      <Typography variant="h6" style={{ color: titleColor }} gutterBottom>
        {title}
      </Typography>
      <Box>
        {data.map((item, index) => (
          <Box key={index} mb={1}>
            <Typography variant="body2" fontWeight={600}>
              {item.label}
            </Typography>
            <Typography variant="body2">{item.value}</Typography>
          </Box>
        ))}
      </Box>
    </>
  </DashboardCard>
    ;
}

export default InfoCard;