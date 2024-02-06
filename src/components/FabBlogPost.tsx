import { FC } from 'react';
import Fab from '@mui/material/Fab';

type item = {
  type: string,
  icon: JSX.Element,
  mt?: string,
  label?: string,
  extended?: boolean
}

type Props = {
  item: item,
  handleOpen: (action: string) => void
}

export const FabBlogPost: FC<Props> = ({ item, handleOpen }) => {
  const { type, icon, mt, extended, label } = item || {}

  return (
    <Fab variant={extended ? 'extended' : 'circular'} onClick={() => handleOpen(type)} color="primary" aria-label={type} sx={{marginRight: mt}}>
      {icon}
      {label}
    </Fab>
  );
};