// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { Alert, AlertTitle, Snackbar } from '@mui/material';
import * as React from 'react';

interface SnackBarInfoProps {
  color: 'error' | 'warning' | 'info' | 'success'; // MUI colors for Alert
  title: string; // Custom text for the title
  message: string; // Custom text for the message
  onClose?: () => void; // Optional function to handle the close event
}

const SnackBarInfo: React.FC<SnackBarInfoProps> = ({ color, title, message, onClose }) => {
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (reason: any) => {
    onClose && onClose(); // Call the passed onClose function
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  React.useEffect(() => {
    const timer = setTimeout(() => {
      handleClick();
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <React.Fragment>
      <Snackbar
        open={open}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity={color} // Use the passed color
          variant="filled"
          sx={{ width: '100%' }}
        >
          <AlertTitle>{title}</AlertTitle> {/* Use the passed title */}
          {message} {/* Use the passed message */}
        </Alert>
      </Snackbar>
    </React.Fragment>
  );
};

export default SnackBarInfo;
