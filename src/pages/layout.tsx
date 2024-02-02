import { PropsWithChildren } from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { ContextProvider } from '../services/ContextProvider';

export const Layout = ({ children }: PropsWithChildren) => {

  return (
    <ContextProvider>
      <Stack padding={4} sx={{backgroundColor: '#00796b', minHeight: '100vh'}}>
        <Typography sx={{typography: { xs: 'h4', md: "h4", lg: "h2" }}} textAlign='center' color='#e0f2f1'>Blog App</Typography>
        <Typography sx={{typography: { xs: 'h6', md: "h5", lg: "h5" }}} textAlign='center' color='#e0f2f1'>Share your story with the world.</Typography>
        {children}
      </Stack>
    </ContextProvider>
  );
};
