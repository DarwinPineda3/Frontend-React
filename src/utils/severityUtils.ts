import { Theme } from '@mui/material/styles';

export const getSeverityColor = (severity: number, theme: Theme) => {
  const criticalColor = theme.palette.level.critical;
  const highColor = theme.palette.level.high;
  const mediumColor = theme.palette.level.medium;
  const lowColor = theme.palette.level.low;
  const noneColor = theme.palette.level.none;

  if (severity > 9.0) {
    return { color: criticalColor };
  } else if (severity > 7.0) {
    return { color: highColor };
  } else if (severity > 4.0) {
    return { color: mediumColor };
  } else if (severity > 0) {
    return { color: lowColor };
  } else {
    return { color: noneColor };
  }
};

export const getChipColor = (riskLevel: string, theme: Theme, t: Function) => {
  const criticalColor = theme.palette.level.critical;
  const highColor = theme.palette.level.high;
  const mediumColor = theme.palette.level.medium;
  const lowColor = theme.palette.level.low;
  const noneColor = theme.palette.level.none;

  switch (riskLevel) {
    case 'critical':
      return { color: criticalColor, label: t('vulnerabilities.critical') };
    case 'high':
      return { color: highColor, label: t('vulnerabilities.high') };
    case 'medium':
      return { color: mediumColor, label: t('vulnerabilities.medium') };
    case 'low':
      return { color: lowColor, label: t('vulnerabilities.low') };
    default:
      return { color: noneColor, label: 'N/A' };
  }
};
