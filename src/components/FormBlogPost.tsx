import { FC } from 'react';
import Stack from '@mui/material/Stack';
import Modal from '@mui/material/Modal';
import { FormDeleteBlogPost } from './FormDeleteBlogPost';
import { FormEditBlogPost } from './FormEditBlogPost';
import { PostResponse } from '../types/Post';

type Props = {
  isEdit: boolean,
  action: string,
  open: boolean,
  post?: PostResponse,
  handleAction: (action?: string) => void,
  handleChange: (key: string, value: string) => void
}

export const FormBlogPost: FC<Props> = ({ isEdit, post, action, open, handleAction, handleChange }) => {
  const isDelete = action === 'delete';

  return (
    <Stack>
      <Modal
        open={open}
        onClose={() => handleAction()}
        aria-labelledby="modal-modal-form"
        aria-describedby="modal-modal-form-blog">
        <Stack alignItems='center'justifyContent='center' minHeight='100vh'>
          {isDelete
            ? <FormDeleteBlogPost open={open} handleAction={handleAction}></FormDeleteBlogPost>
            : <FormEditBlogPost isEdit={isEdit} post={post} open={open} handleAction={handleAction} handleChange={handleChange}></FormEditBlogPost>
          }
        </Stack>
      </Modal>
    </Stack>
  );
};