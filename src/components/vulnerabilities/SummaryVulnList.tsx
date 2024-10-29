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
        title="Vulnerabilities Summary" 
        subtitle="Vulnerabilities Summary List"
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
                Managed selected vulnerabilities
            </Button>
            <TableContainer>
                <Table aria-label="technology table" sx={{ whiteSpace: 'nowrap' }}>
                    <TableHead>
                        <TableRow>
                        <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Select
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Type
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Hosts
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Severity
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Name
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Date
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Tool
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    View Report
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    AI Assistant Solution
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
                                            _.capitalize(vulnerability.type) === 'High'
                                                ? (theme) => theme.palette.error.light
                                                : _.capitalize(vulnerability.type) === 'Medium'
                                                ? (theme) => theme.palette.warning.light
                                                : _.capitalize(vulnerability.type) === 'Low'
                                                ? (theme) => theme.palette.success.light
                                                : (theme) => theme.palette.secondary.light,
                                            color:
                                            _.capitalize(vulnerability.type) === 'High'
                                                ? (theme) => theme.palette.error.main
                                                : _.capitalize(vulnerability.type) === 'Medium'
                                                ? (theme) => theme.palette.warning.main
                                                : _.capitalize(vulnerability.type) === 'Low'
                                                ? (theme) => theme.palette.success.main
                                                : (theme) => theme.palette.background.default,
                                            borderRadius: '8px',
                                            }}
                                            size="small"
                                            label={_.capitalize(vulnerability.type)}
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
                                                ? (theme) => theme.palette.error.light
                                                : vulnerability.severity > 7.0
                                                ? (theme) => theme.palette.warning.light
                                                : vulnerability.severity > 4.0
                                                ? (theme) => theme.palette.success.light
                                                : (theme) => theme.palette.secondary.light,
                                            color:
                                            vulnerability.severity > 9.0
                                                ? (theme) => theme.palette.error.main
                                                : vulnerability.severity > 7.0
                                                ? (theme) => theme.palette.warning.main
                                                : vulnerability.severity > 4.0
                                                ? (theme) => theme.palette.success.main
                                                : (theme) => theme.palette.background.default,
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
