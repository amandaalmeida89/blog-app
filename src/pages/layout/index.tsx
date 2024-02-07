import { PropsWithChildren } from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { ContextProvider } from '../../services/ContextProvider';
import { texts } from '../../texts';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import SnackBarFeedback from '../../components/SnackBarFeedback'

export default function Layout ({ children }: PropsWithChildren) {
  return (
    <ContextProvider>
      <Header></Header>
      <Stack marginTop='32px' justifyContent={'space-between'} sx={{minHeight: '100vh'}}>
        <SnackBarFeedback></SnackBarFeedback>
        <Stack padding={4}>
          <Typography sx={{typography: { xs: 'h4', md: 'h4', lg: 'h2' }}} textAlign='center' color='primary.dark'>{texts.title}</Typography>
          <Typography sx={{typography: { xs: 'h6', md: 'h5', lg: 'h5' }}} textAlign='center' color='primary.dark'>{texts.description}</Typography>
          {children}
        </Stack>
        <Footer></Footer>
      </Stack>
    </ContextProvider>
  );
}
