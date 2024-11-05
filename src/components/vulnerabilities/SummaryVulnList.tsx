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

const SummaryVulnerabilitiesList = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const summaryVuln = useSelector((state: any) => state.summaryVulnReducer.summaryVuln);
    const currentPage = useSelector((state: any) => state.summaryVulnReducer.page);
    const totalPages = useSelector((state: any) => state.summaryVulnReducer.totalPages);
    const [snackbarOpen, setSnackbarOpen] = useState(false); // State to control the snackbar
    const [snackbarMessage, setSnackbarMessage] = useState(''); // Message for the snackbar
    const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'info' | 'warning' | 'error'>('success'); // Snackbar severity

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
                                            sx={{
                                            bgcolor:
                                                _.capitalize(vulnerability.type) === 'Critical'
                                                ? (theme) => theme.palette.level.critical
                                                : _.capitalize(vulnerability.type) === 'High'
                                                ? (theme) => theme.palette.level.high
                                                : _.capitalize(vulnerability.type) === 'Medium'
                                                ? (theme) => theme.palette.level.medium
                                                : _.capitalize(vulnerability.type) === 'Low'
                                                ? (theme) => theme.palette.level.low
                                                : (theme) => theme.palette.level.unknown,
                                            color: (theme) => theme.palette.background.default,
                                                borderRadius: '8px',
                                            }}
                                            size="small"
                                            label={t(`dashboard.${_.lowerCase(vulnerability.type)}`)}
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
                                        sx={{
                                            bgcolor:
                                                vulnerability.severity > 9.0
                                                ? (theme) => theme.palette.level.critical
                                                : vulnerability.severity > 7.0
                                                ? (theme) => theme.palette.level.high
                                                : vulnerability.severity > 4.0
                                                ? (theme) => theme.palette.level.medium
                                                : vulnerability.severity > 0
                                                ? (theme) => theme.palette.level.low
                                                : (theme) => theme.palette.level.unknown,
                                            color: (theme) => theme.palette.background.default,
                                            borderRadius: '8px',
                                            }}
                                            size="small"
                                            label={vulnerability.severity}
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
