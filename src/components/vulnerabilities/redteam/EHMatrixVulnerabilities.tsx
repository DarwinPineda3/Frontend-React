import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';

const CustomTable = ({ matrixRequest }) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const { high, medium, low, critical } = theme.palette.level;

  let styles = { color: 'white', textAlign: 'center', padding: '30px', border: 'none', width: '20%', fontWeight: 'bold', fontSize: '16px' }

  return (
    <TableContainer component={Paper} sx={{ boxShadow: 'none', margin: '0 auto', width: '80%' }}>
      <Table sx={{ border: 'none', tableLayout: 'fixed' }}>
        <TableHead>
          <TableRow>
            <TableCell sx={{ border: 'none' }}></TableCell>
            <TableCell align="center" sx={{ border: 'none' }}>
              <Typography variant="subtitle2" fontWeight={600}>{t("redteam.low")}</Typography>
            </TableCell>
            <TableCell align="center" sx={{ border: 'none' }}>
              <Typography variant="subtitle2" fontWeight={600}>{t("redteam.medium")}</Typography>
            </TableCell>
            <TableCell align="center" sx={{ border: 'none' }}>
              <Typography variant="subtitle2" fontWeight={600}>{t("redteam.high")}</Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell sx={{ border: 'none' }}>
              <Typography variant="subtitle2" fontWeight={600} sx={{ textAlign: 'right', border: 'none' }}>{t("redteam.high")}</Typography>
            </TableCell>
            <TableCell sx={{ backgroundColor: high, ...styles }}>
              {matrixRequest[6]}
            </TableCell>
            <TableCell sx={{ backgroundColor: critical, ...styles }}>
              {matrixRequest[7]}
            </TableCell>
            <TableCell sx={{ backgroundColor: "#721D88", ...styles }}>
              {matrixRequest[8]}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell sx={{ border: 'none' }}>
              <Typography variant="subtitle2" fontWeight={600} sx={{ textAlign: 'right', border: 'none' }}>{t("redteam.medium")}</Typography>
            </TableCell>
            <TableCell sx={{ backgroundColor: medium, ...styles }}>
              {matrixRequest[3]}
            </TableCell>
            <TableCell sx={{ backgroundColor: high, ...styles }}>
              {matrixRequest[4]}
            </TableCell>
            <TableCell sx={{ backgroundColor: critical, ...styles }}>
              {matrixRequest[5]}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell sx={{ border: 'none' }}>
              <Typography variant="subtitle2" fontWeight={600} sx={{ textAlign: 'right', border: 'none' }}>{t("redteam.low")}</Typography>
            </TableCell>
            <TableCell sx={{ backgroundColor: low, ...styles }}>
              {matrixRequest[0]}
            </TableCell>
            <TableCell sx={{ backgroundColor: medium, ...styles }}>
              {matrixRequest[1]}
            </TableCell>
            <TableCell sx={{ backgroundColor: high, ...styles }}>
              {matrixRequest[2]}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CustomTable;
