import { useBlogContext } from '../services/ContextProvider';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';

export default function SnackBarFeedback () {
  const { feedback, sendGlobalFeedback } = useBlogContext();
  const { message, action, isOpen } = feedback || {};
  const { label, trigger } = action || {};

  const handleAction = () => {
    if (trigger) {
      sendGlobalFeedback({ message: '', isOpen: false });
      trigger();
    }
  };

  const handleClose = (_: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    sendGlobalFeedback({ message: '', isOpen: false });
  };

  const actionButton = (
    <Button color="primary" size="small" onClick={handleAction}>
      {label || 'UNDO'}
    </Button>
  );

  return (
    <Snackbar
      open={isOpen}
      autoHideDuration={!trigger ? 5000 : null}
      onClose={handleClose}
      message={message}
      action={trigger ? actionButton : ''}
    />
);}