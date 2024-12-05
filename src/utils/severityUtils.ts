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
