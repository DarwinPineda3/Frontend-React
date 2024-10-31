import React, { useState } from 'react';
import {
    Typography,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TableContainer,
    Box,
    MenuItem,
    Pagination,
    IconButton,
    Chip,
    Button
} from '@mui/material';
import { IconEye } from '@tabler/icons-react';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import CustomSelect from '../forms/theme-elements/CustomSelect';
import DashboardCard from '../shared/DashboardCard';
import { useDispatch, useSelector } from 'src/store/Store';
import { fetchSummaryVuln, setPage } from 'src/store/vulnerabilities/SummaryVulnSlice';
import SnackBarInfo from 'src/layouts/full/shared/SnackBar/SnackBarInfo';
import { useTranslation } from 'react-i18next';
import _ from 'lodash';
import { useTheme } from '@mui/material/styles';

const SummaryVulnerabilitiesList = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const summaryVuln = useSelector((state: any) => state.summaryVulnReducer.summaryVuln);
    const currentPage = useSelector((state: any) => state.summaryVulnReducer.page);
    const totalPages = useSelector((state: any) => state.summaryVulnReducer.totalPages);
    const [snackbarOpen, setSnackbarOpen] = useState(false); // State to control the snackbar
    const [snackbarMessage, setSnackbarMessage] = useState(''); // Message for the snackbar
    const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'info' | 'warning' | 'error'>('success'); // Snackbar severity
    const theme = useTheme();
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
        if (severity > 9.0) {
            return { color: criticalColor};
        } else if (severity > 7.0) {
            return { color: highColor};
        } else if (severity > 4.0) {
            return { color: mediumColor};
        } else if (severity > 0) {
        return { color: lowColor};
        } else {
            return { color: noneColor};
        }
    };

    React.useEffect(() => {
        dispatch(fetchSummaryVuln(currentPage));
    }, [dispatch, currentPage]);

    const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
        if (page !== currentPage) {
        dispatch(setPage(page));
        }
    };
    const [month, setMonth] = React.useState('1');
    const currentYear = new Date().getFullYear();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMonth(event.target.value);
    };

return (
    <DashboardCard 
        title={t("summary.vulnerabilities_summary")}
        subtitle={t("summary.vulnerabilities_summary_list")}
        action={
            <CustomSelect
                labelId="month-dd"
                id="month-dd"
                size="small"
                value={month}
                onChange={handleChange}
            >
                <MenuItem value={1}>{`${t("dashboard.march")} ${currentYear}`}</MenuItem>
                <MenuItem value={2}>{`${t("dashboard.april")} ${currentYear}`}</MenuItem>
                <MenuItem value={3}>{`${t("dashboard.may")} ${currentYear}`}</MenuItem>
            </CustomSelect>
        }>
        <Box>
            <Button
            variant="outlined"
            color="primary"
            >
                {t("summary.managed_selected_vuulnerabilities")}
            </Button>
            <TableContainer>
                <Table aria-label="technology table" sx={{ whiteSpace: 'nowrap' }}>
                    <TableHead>
                        <TableRow>
                        <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    {t("summary.select")}
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    {t("summary.type")}
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    {t("summary.hosts")}
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    {t("summary.severity")}
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    {t("summary.name")}
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    {t("summary.date")}
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    {t("summary.tool")}
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    {t("summary.view_report")}
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    {t("summary.ai_solution")}
                                </Typography>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {summaryVuln.map((vulnerability: any, index: number) => (
                            <TableRow key={index}>
                                <TableCell>
                                    <input
                                        type="checkbox"
                                        className="form-check-input"
                                        name = "allSelect"
                                        // onChange = {handleChange}
                                    />
                                </TableCell>
                                <TableCell>
                                    <Typography variant="subtitle2" fontWeight={600}>
                                        <Chip
                                            label={getChipColor(_.lowerCase(vulnerability.type)).label}
                                            sx={{
                                            backgroundColor: getChipColor(_.lowerCase(vulnerability.type)).color,
                                            color: 'white',
                                            }}
                                        />
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="subtitle2" fontWeight={600}>
                                        {vulnerability.hosts}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="subtitle2" fontWeight={600}>
                                        <Chip
                                            label={vulnerability.severity}
                                            sx={{
                                                backgroundColor: getChipColorSeverity(vulnerability.severity).color,
                                                color: 'white',
                                            }}
                                        />
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="subtitle2" fontWeight={600}>
                                        {vulnerability.name}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="subtitle2" fontWeight={600}>
                                        {vulnerability.report_date}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                        {vulnerability.tool}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <IconButton
                                        size="small"
                                        color="primary"
                                        href={vulnerability.report_url}
                                        target="_blank"
                                    >
                                        <IconEye />
                                    </IconButton>
                                </TableCell>
                                <TableCell>
                                    <IconButton
                                            size="small"
                                            color="primary"
                                            href={vulnerability.report_url}
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
            <Box my={3} display="flex" justifyContent={'center'}>
                <Pagination
                    count={totalPages}
                    color="primary"
                    page={currentPage}
                    onChange={handlePageChange}
                />
            </Box>
            {/* Snackbar */}
            {snackbarOpen && (
                <SnackBarInfo
                color={snackbarSeverity}
                title="Operation Status"
                message={snackbarMessage}
                />
            )}
        </Box>
    </DashboardCard>
);
};

export default SummaryVulnerabilitiesList;
