import { FC } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { PostResponse } from '../types/Post';
import { texts } from '../texts';

type Props = {
  isEdit: boolean,
  post?: PostResponse,
  open: boolean,
  handleAction: (action?: string) => void,
  handleChange: (key: string, value: string) => void
}

export const FormEditBlogPost: FC<Props> =({ isEdit, open, post, handleAction, handleChange }) => {
  const { title, content } = post || {};
  const titleLabel = isEdit ? texts.editTitle : texts.createTitle;

  return (
    <Dialog
      open={open}>
      <DialogTitle>{titleLabel}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {texts.editDescription}
        </DialogContentText>
        <TextField
          sx={{marginTop: '16px'}}
          onChange={(e) => handleChange('title', e.target.value)}
          autoFocus
          id="title"
          name="title"
          label="Title"
          type="text"
          defaultValue={title}
          fullWidth
        />
        <textarea style={{ width: '100%', marginTop: '16px' }} rows={20} defaultValue={content} onChange={(e) => handleChange('content', e.target.value)}></textarea>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => handleAction()}>{texts.buttonCancel}</Button>
        <Button onClick={() => handleAction('save')} autoFocus>{texts.buttonSave}</Button>
      </DialogActions>
    </Dialog>
  );
};