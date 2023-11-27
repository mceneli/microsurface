import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const SnackbarComponent = ({ open, message, severity, onClose }) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={onClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      {severity === 'success' ? (
        <Alert onClose={onClose} severity="success" sx={{ width: '100%' }}>
          {message}
        </Alert>
      ) : severity === 'error' ? (
        <Alert severity="error">{message}</Alert>
      ) : null}
    </Snackbar>
  );
};

export default SnackbarComponent;
