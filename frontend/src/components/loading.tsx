import React from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

interface LoadingScreenProps {
  open: boolean; // Controls the visibility of the loading screen
  message?: string; // Optional message to display
  severity?: 'success' | 'error' | 'info' | 'warning'; // Severity level for the message
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ open, message, severity }) => {
  return (
    <>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      {message && (
        <Snackbar open={open} autoHideDuration={6000} onClose={() => {}}>
          <Alert onClose={() => {}} severity={severity || 'info'} sx={{ width: '100%' }}>
            {message}
          </Alert>
        </Snackbar>
      )}
    </>
  );
};

export default LoadingScreen;
