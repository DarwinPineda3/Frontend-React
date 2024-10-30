import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
  } from '@mui/material';
  
  const DataTable = ({ data }) => {
    if (!data || data.length === 0) {
      return <Typography variant="body2">No data available.</Typography>;
    }
  
    return (
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  Table
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Typography variant="body2">
                    {item}
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };
  
  export default DataTable;
  