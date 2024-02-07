import { FC } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { texts } from '../texts';

type Props = {
  open: boolean,
  handleAction: (action: string) => void
}

export const FormDeleteBlogPost: FC<Props> =({ open, handleAction }) => {
  return (
    <Dialog
      open={open}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description">
      <DialogTitle id="alert-dialog-delete">
        {texts.deleteTitle}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-delete-info">
          {texts.deleteDescription}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => handleAction('close')}>{texts.buttonDisagree}</Button>
        <Button onClick={() => handleAction('delete')} autoFocus>{texts.buttonAgree}</Button>
      </DialogActions>
    </Dialog>
  );
};