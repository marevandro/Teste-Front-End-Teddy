import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

interface SnackbarAlertProps {
  open: boolean;
  onClose: () => void;
  message: string;
  severity?: 'success' | 'error' | 'warning' | 'info';
}

export const SnackbarAlert = ({
  open,
  onClose,
  message,
  severity = 'success',
}: SnackbarAlertProps) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={4000} 
      onClose={onClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    >
      <Alert onClose={onClose} severity={severity} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
};