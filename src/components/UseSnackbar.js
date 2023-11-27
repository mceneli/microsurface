import { useState } from 'react';

const UseSnackbar = () => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState('');

  const handleOpenSnackbar = (message, severity) => {
    setMessage(message);
    setSeverity(severity);
    setOpen(true);
  };

  const handleCloseSnackbar = () => {
    setOpen(false);
  };

  return {
    open,
    message,
    severity,
    handleOpenSnackbar,
    handleCloseSnackbar,
  };
};

export default UseSnackbar;