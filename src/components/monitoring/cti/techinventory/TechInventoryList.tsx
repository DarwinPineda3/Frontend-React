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
    Pagination,
    Button,
    IconButton,
    Dialog,
    DialogContent,
    Chip
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DashboardCard from '../../../shared/DashboardCard';
import { useDispatch, useSelector } from 'src/store/Store';
import { fetchTechInventory, setPage } from 'src/store/sections/cti/techInventorySlice';
import CreateUpdateTechnology from './TechInventoryEdition';
import SnackBarInfo from 'src/layouts/full/shared/SnackBar/SnackBarInfo';
import { TechInventoryType } from 'src/types/cti/technologies/techInventory';
import { useTranslation } from 'react-i18next';

const TechInventoryList = () => {
    const dispatch = useDispatch();
    const techsInventory = useSelector((state: any) => state.techInventoryReducer.techsInventory);
    const currentPage = useSelector((state: any) => state.techInventoryReducer.page);
    const totalPages = useSelector((state: any) => state.techInventoryReducer.totalPages);
    const [editTechnology, setEditTechonology] = useState<null | any>(null); // State to hold the technology being edited or created
    const [openDialog, setOpenDialog] = useState(false); // State to control the dialog/modal
    const [snackbarOpen, setSnackbarOpen] = useState(false); // State to control the snackbar
    const [snackbarMessage, setSnackbarMessage] = useState(''); // Message for the snackbar
    const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'info' | 'warning' | 'error'>('success'); // Snackbar severity
    const [TechnologyDelete, setTechnologyDelete] = useState<TechInventoryType | null >(null);
    const { t } = useTranslation();
    

React.useEffect(() => {
    dispatch(fetchTechInventory(currentPage));
}, [dispatch, currentPage]);

const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    if (page !== currentPage) {
    dispatch(setPage(page));
    }
};

const handleEditClick = (technology: any = null) => {
    setEditTechonology(technology); // Set the selected technology for editing, or null for new technology creation
    setOpenDialog(true); // Open the dialog/modal
};

const handleDeleteClick = (technology: any = null) => {
    setTechnologyDelete(technology); // Delete the selected technology for editing, or null for new technology creation
    setOpenDialog(true); // Open the dialog/modal
};

const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditTechonology(null); // Reset the edit state when closing
};

const handleSnackbarClose = () => {
    setSnackbarOpen(false);
};

// Callback when the technology is created or updated
const handleFormSubmit = (message: string, severity: 'success' | 'info' | 'warning' | 'error') => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(false); // Ensure snackbar is reset
    setTimeout(() => {
    setSnackbarOpen(true); // Show the snackbar after resetting it
    }, 0);
    handleCloseDialog(); // Close the dialog after submission
};

const addButton =<IconButton color="primary" onClick={() => handleEditClick(undefined)}><AddIcon /></IconButton>

return (
    <DashboardCard 
        title={t("technologies_inventory.technologies_inventory")} 
        subtitle={t("technologies_inventory.technologies_list")}
        action={addButton}>
    <Box>    
        <TableContainer>
        <Table aria-label="technology table" sx={{ whiteSpace: 'nowrap' }}>
            <TableHead>
            <TableRow>
                <TableCell>
                    <Typography variant="subtitle2" fontWeight={600}>
                        {t("dashboard.name")}
                    </Typography>
                    </TableCell>
                    <TableCell>
                        <Typography variant="subtitle2" fontWeight={600}>
                            {t("technologies_inventory.category")}
                        </Typography>
                    </TableCell>
                    <TableCell>
                        <Typography variant="subtitle2" fontWeight={600}>
                            {t("technologies_inventory.version")}
                        </Typography>
                    </TableCell>
                    <TableCell>
                        <Typography variant="subtitle2" fontWeight={600}>
                            {t("dashboard.actions")}
                        </Typography>
                </TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {techsInventory.map((technology: any, index: number) => (
                <TableRow key={index}>
                <TableCell>
                    <Typography variant="subtitle2" fontWeight={600}>
                    {technology.name}
                    </Typography>
                </TableCell>
                <TableCell>
                    <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                    {technology.category === 'OS' ? (
                        <Chip label={technology.category} color="primary" variant="outlined" />
                    ) : (
                        <Chip label={technology.category} color="info" variant="outlined" />
                    )}                                                
                    </Typography>
                </TableCell>
                <TableCell>
                    <Typography variant="subtitle2">{technology.version}</Typography>
                </TableCell>
                <TableCell>
                    <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={() => handleEditClick(technology)}
                    >
                        {t("dashboard.edit")}
                    </Button>
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
        {/* Edit/Create Techonology Dialog/Modal */}
    <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth >
        <DialogContent sx={{ padding: '50px' }}>
        <CreateUpdateTechnology technology={editTechnology ?? undefined} onSubmit={handleFormSubmit} /> {/* Pass the onSubmit callback */}
        </DialogContent>
    </Dialog>

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

export default TechInventoryList;
