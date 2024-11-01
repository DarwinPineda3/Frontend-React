import AddIcon from '@mui/icons-material/Add';
import {
  Box,
  Chip,
  Dialog,
  DialogContent,
  IconButton,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useTheme,
} from '@mui/material';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'src/store/Store';
import { fetchMobileApps, setPage } from 'src/store/sections/mobile-app/MobileAppSlice';
import DashboardCard from '../../../shared/DashboardCard';

// const theme = useTheme();
// const { high, medium, low, critical } = theme.palette.level;

interface MobileAppListTableProps {
  onMobileAppClick: (mobileAppId: number, appName: string) => void;
}

const MobileAppList: React.FC<MobileAppListTableProps> = ({ onMobileAppClick }) => {
  const dispatch = useDispatch();
  const mobileApps = useSelector((state: any) => state.mobileAppsReducer.mobileApps);
  const currentPage = useSelector((state: any) => state.mobileAppsReducer.page);
  const totalPages = useSelector((state: any) => state.mobileAppsReducer.totalPages);
  const [editMobileApp, setEditMobileApp] = useState<null | any>(null); // State to hold the mobileApp being edited or created
  const [openDialog, setOpenDialog] = useState(false); // State to control the dialog/modal
  const { t } = useTranslation();

  React.useEffect(() => {
    dispatch(fetchMobileApps(currentPage));
  }, [dispatch, currentPage]);

  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    if (page !== currentPage) {
      dispatch(setPage(page));
    }
  };

  const handleEditClick = (mobileApp: any = null) => {
    setEditMobileApp(mobileApp); // Set the selected mobileApp for editing, or null for new mobileApp creation
    setOpenDialog(true); // Open the dialog/modal
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditMobileApp(null); // Reset the edit state when closing
  };

  const theme = useTheme();
  const { high, medium, low, critical } = theme.palette.level;

  const addButton = (
    <IconButton color="primary" onClick={() => handleEditClick(undefined)}>
      <AddIcon />
    </IconButton>
  );

  return (
    // pendiente de traducción
    <DashboardCard title="Search result" subtitle="List of mobile applications found">
      <Box>
        <TableContainer>
          <Table aria-label="mobileApp table" sx={{ whiteSpace: 'nowrap' }}>
            <TableHead>
              <TableRow>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={600}>
                    {t('mobile_apps.app_name')}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={600}>
                    {t('mobile_apps.source')}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={600}>
                    {t('mobile_apps.state')}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={600}>
                    {t('mobile_apps.version')}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={600}>
                    {t('mobile_apps.score')}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={600}>
                    {t('mobile_apps.downloads')}
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {mobileApps.map((mobileApp: any, index: number) => (
                <TableRow key={index}>
                  <TableCell>
                    <Typography
                      variant="subtitle2"
                      fontWeight={600}
                      color="primary"
                      component="a"
                      onClick={() => onMobileAppClick(mobileApp.id)}
                      style={{ cursor: 'pointer' }}
                    >
                      {mobileApp.appName}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                      {mobileApp.source}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    {/* aqui cambio de color */}
                    <Typography
                      variant="subtitle2"
                      fontWeight={600}
                      color={mobileApp.score > 7 ? high : mobileApp.score > 3.9 ? medium : low}
                    >
                      <Chip
                        label={
                          mobileApp.score > 7
                            ? t('mobile_apps.very_risky')
                            : mobileApp.score > 3.9
                            ? t('mobile_apps.risky')
                            : mobileApp.score > 0
                            ? t('mobile_apps.not_very_risky')
                            : t('mobile_apps.no_risk') // Asegúrate de agregar esta clave en el archivo de traducción
                        }
                        color="secondary"
                        size="small"
                        style={{
                          backgroundColor:
                            mobileApp.score > 7 ? high : mobileApp.score > 3.9 ? medium : low,
                          color: 'white',
                        }}
                      />
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography fontWeight={400}>{mobileApp.version}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2">
                      <Chip
                        label={mobileApp.score}
                        color="secondary"
                        size="small"
                        style={{
                          backgroundColor:
                            mobileApp.score > 7
                              ? high
                              : mobileApp.score > 3.9
                              ? medium
                              : mobileApp.score >= 0
                              ? low
                              : low,
                          color: 'white',
                        }}
                      />
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2">{mobileApp.details.downloads}</Typography>
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
        {/* Edit/Create MalwareAnalysis Dialog/Modal */}
        <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
          <DialogContent sx={{ padding: '50px' }}></DialogContent>
        </Dialog>
      </Box>
    </DashboardCard>
  );
};
export default MobileAppList;
