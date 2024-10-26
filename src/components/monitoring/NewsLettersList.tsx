import React from 'react';
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
  IconButton
} from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import DashboardCard from '../shared/DashboardCard';
import { useDispatch, useSelector } from 'src/store/Store';
import { fetchNewsLetters, setPage } from 'src/store/sections/newsletters/NewsLettersSlice';


interface NewsLettersTableProps {
  onNewsLetterClick: (newsLetterId: string) => void;
}

const NewsLettersList: React.FC<NewsLettersTableProps> = ({ onNewsLetterClick }) => {
  const dispatch = useDispatch();
  const newsLetters = useSelector((state: any) => state.newsLettersReducer.newsLetters);
  const currentPage = useSelector((state: any) => state.newsLettersReducer.page);
  const totalPages = useSelector((state: any) => state.newsLettersReducer.totalPages);

  React.useEffect(() => {
    dispatch(fetchNewsLetters(currentPage));
  }, [dispatch, currentPage]);

  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    if (page !== currentPage) {
      dispatch(setPage(page));
    }
  };

  const handleDownload = (newsId: number) => {
    console.log(`Downloading newsLetter ${newsId}`);
  };

  
  return (
    <DashboardCard title="NewsLetters" subtitle="NewsLetters List" >
      <Box>    
        <TableContainer>
          <Table aria-label="newsletter table" sx={{ whiteSpace: 'nowrap' }}>
            <TableHead>
              <TableRow>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={600}>
                    Name
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={600}>
                    Size
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={600}>
                    Last modification	
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={600}>
                    Actions
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {newsLetters.map((newsLetter: any, index: number) => (
                <TableRow key={index}>
                  <TableCell>
                    <Typography                       
                      variant="subtitle2"
                      fontWeight={600}
                      color="primary"
                      component="a"
                      onClick={() => onNewsLetterClick(newsLetter.id)}
                      style={{ cursor: 'pointer' }}>
                      {newsLetter.name}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                    {newsLetter.size}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2">
                      {newsLetter.modifiedTime}
                    </Typography>
                  </TableCell>
                  <TableCell>
                  <IconButton color="primary" onClick={() => handleDownload(newsLetter.id)}>
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
      </Box>      
    </DashboardCard>
  );
};

export default NewsLettersList;
