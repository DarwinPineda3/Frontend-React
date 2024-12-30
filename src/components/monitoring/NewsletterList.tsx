import DownloadIcon from '@mui/icons-material/Download';
import {
  Box,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography
} from '@mui/material';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'src/store/Store';
import { downloadNewsletter, fetchNewsletters, setPage } from 'src/store/sections/newsletter/NewslettersSlice';
import DashboardCard from '../shared/DashboardCard';
import HumanizedDate from '../shared/HumanizedDate';
import Loader from '../shared/Loader/Loader';

interface NewsletterTableProps {
  onNewsLetterClick: (newsletterId: string) => void;
}

const NewsLettersList: React.FC<NewsletterTableProps> = ({ onNewsLetterClick }) => {
  const dispatch = useDispatch();
  const newsletters = useSelector((state: any) => state.newsLettersReducer.newsletters);
  const currentPage = useSelector((state: any) => state.newsLettersReducer.page);
  const totalPages = useSelector((state: any) => state.newsLettersReducer.totalPages);
  const pageSize = useSelector((state: any) => state.cloudInventoryReducer.pageSize);
  const loading = useSelector((state: any) => state.cloudInventoryReducer.loading);
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);

  React.useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      await dispatch(fetchNewsletters(currentPage, pageSize));
      setIsLoading(false);
    };
    fetchData();
  }, [dispatch, currentPage]);

  const handlePageChange = (event: React.MouseEvent<HTMLButtonElement> | null, page: number) => {
    if (page !== currentPage) {
      dispatch(setPage(page));
    }
  };

  const handleDownload = (newsId: string, nameDownload: string) => {
    dispatch(downloadNewsletter(newsId, nameDownload));
  };

  return (
    <DashboardCard title={t('newsletter.newsletters')!} subtitle={t('newsletter.newsletters_list')!}>
      <Box>
        {isLoading ? (
          <Box display="flex" justifyContent="center" alignItems="center" height="300px">
            <Loader />
          </Box>
        ) : (
          <>
            <TableContainer>
              <Table aria-label="newsletter table" sx={{ whiteSpace: 'nowrap' }}>
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <Typography variant="subtitle2" fontWeight={600}>
                        {t('dashboard.name')}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle2" fontWeight={600}>
                        {t('newsletter.size')}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle2" fontWeight={600}>
                        {t('newsletter.last_modification')}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle2" fontWeight={600}>
                        {t('dashboard.actions')}
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>

                  {newsletters?.map((newsletter: any, index: number) => (
                    <TableRow key={index}>
                      <TableCell>
                        <Typography
                          variant="subtitle2"
                          fontWeight={600}
                          color="primary"
                          component="a"
                          onClick={() => onNewsLetterClick(newsletter.id)}
                          style={{ cursor: 'pointer' }}
                        >
                          {newsletter.name}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                          {Math.round(newsletter.size / 1024)} KB
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="subtitle2">
                          <HumanizedDate dateString={newsletter.modifiedTime} />
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <IconButton color="primary" onClick={() => handleDownload(newsletter.id, newsletter.name)}>
                          <DownloadIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, 50, 100]}
              component="div"
              count={totalPages * pageSize}
              rowsPerPage={pageSize}
              page={currentPage - 1}
              onPageChange={(e: any, destPage: any) => handlePageChange(e, destPage + 1)}
              onRowsPerPageChange={(e: any) => dispatch(fetchNewsletters(currentPage, e.target.value))}
            />
          </>
        )}
      </Box>
    </DashboardCard>
  );
};

export default NewsLettersList;
