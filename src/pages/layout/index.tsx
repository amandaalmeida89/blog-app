import { PropsWithChildren } from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { ContextProvider } from '../../services/ContextProvider';
import { texts } from '../../texts';

export default function Layout ({ children }: PropsWithChildren) {
  return (
    <ContextProvider>
      <Stack padding={4} sx={{minHeight: '100vh'}}>
        <Typography sx={{typography: { xs: 'h4', md: 'h4', lg: 'h2' }}} textAlign='center' color='primary.dark'>{texts.title}</Typography>
        <Typography sx={{typography: { xs: 'h6', md: 'h5', lg: 'h5' }}} textAlign='center' color='primary.dark'>{texts.description}</Typography>
        {children}
      </Stack>
    </ContextProvider>
  );
}
