import { FC } from 'react';
import Stack from '@mui/material/Stack';
import Fab from '@mui/material/Fab';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

type Props = {
  handleOpen: (action: string) => void
}

export const FabBlogPost: FC<Props> = ({ handleOpen }) => {
  return (
    <Stack marginTop='16px' flexDirection='row' justifyContent='end'>
      <Fab onClick={() => handleOpen('edit')} color="primary" aria-label="edit" sx={{marginRight: '8px'}}>
        <EditIcon />
      </Fab>
      <Fab onClick={() => handleOpen('delete')} color="primary" aria-label="delete">
        <DeleteIcon />
      </Fab>
    </Stack>
  );
};