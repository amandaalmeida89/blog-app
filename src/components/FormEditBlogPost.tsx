import { ChangeEvent, FC, useState } from 'react';
import { styled, } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { CustomAlert } from './CustomAlert';
import { PostResponse } from '../types/Post';
import { texts } from '../texts';
import { getBase64 } from '../utils/formatter';
import styles from '../styles/FormEditBlogPost.module.css';

type Props = {
  isEdit: boolean,
  post?: PostResponse,
  open: boolean,
  handleAction: (action?: string) => void,
  handleChange: (key: string, value: string) => void
}

type Severity = 'error' | 'success' | 'info' | 'warning'

type Alert = {
  severity: Severity,
  text: string
}

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});


export const FormEditBlogPost: FC<Props> = ({ isEdit, open, post, handleAction, handleChange }) => {
  const [fileName, setFileName] = useState('Upload file');
  const [alert, setAlert] = useState<Alert>({ severity: 'info', text: '' });
  const { title, content } = post || {};
  const titleLabel = isEdit ? texts.editTitle : texts.createTitle;

  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    const { name } = file || {};
    setFileName(name);
    getBase64(file)
    .then((result: string) => {
      const fileBaseUrl = result;
      handleChange('imgUrl', fileBaseUrl);
      setAlert({ severity: 'success', text: texts.uploadSuccess });
    })
    .catch(() => setAlert({ severity: 'error', text: texts.uploadError }));
  };

  return (
    <Dialog
      open={open}>
      <DialogTitle>{titleLabel}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {texts.editDescription}
        </DialogContentText>
        <Stack marginTop='16px'>
          <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
            {fileName}
            <VisuallyHiddenInput onChange={(e)=> handleFile(e)} type="file" />
          </Button>
          {alert.text
            ? <CustomAlert severity={alert.severity} text={alert.text} mt='8px'></CustomAlert>
            : ''}
        </Stack>
        <TextField
          sx={{marginTop: '16px'}}
          onChange={(e) => handleChange('title', e.target.value)}
          required
          autoFocus
          id="title"
          name="title"
          label="Title"
          type="text"
          defaultValue={title}
          fullWidth
        />
        <textarea required className={styles.textarea} rows={20} defaultValue={content} onChange={(e) => handleChange('content', e.target.value)}></textarea>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => handleAction()}>{texts.buttonCancel}</Button>
        <Button onClick={() => handleAction('save')} autoFocus>{texts.buttonSave}</Button>
      </DialogActions>
    </Dialog>
  );
};