import DownloadIcon from '@mui/icons-material/Download';
import {
  Box,
  IconButton,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'src/store/Store';
import { fetchNewsletters, setPage } from 'src/store/sections/newsletter/NewslettersSlice';
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
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);

  React.useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      await dispatch(fetchNewsletters(currentPage));
      setIsLoading(false);
    };
    fetchData();
  }, [dispatch, currentPage]);

  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    if (page !== currentPage) {
      dispatch(setPage(page));
    }
  };

  const handleDownload = (newsId: number) => {
    console.log(`Downloading newsletter ${newsId}`);
  };

  return (
    <DashboardCard title={t('newsletter.newsletters')} subtitle={t('newsletter.newsletters_list')}>
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
                  {newsletters.map((newsletter: any, index: number) => (
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
                          {Math.round(newsletter.size / 1024)} Mb
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="subtitle2">
                          <HumanizedDate dateString={newsletter.modifiedTime} />
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <IconButton color="primary" onClick={() => handleDownload(newsletter.id)}>
                          <DownloadIcon />
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
          </>
        )}
      </Box>
    </DashboardCard>
  );
};

export default NewsLettersList;
