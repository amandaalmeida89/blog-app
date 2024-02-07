import { useEffect, useState } from 'react';
import { useBlogContext } from '../services/ContextProvider';
import Snackbar from '@mui/material/Snackbar';

export default function SnackBarFeedback () {
  const [open, setOpen] = useState(false);
  const { feedback } = useBlogContext();

  const handleClose = (_: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  useEffect(()=> {
    if(feedback) {
      setOpen(true);
    }
  }, [feedback]);

  return (
    <Snackbar
      open={open}
      autoHideDuration={5000}
      message={feedback}
      onClose={handleClose}
    />
);}