import type { AppProps } from 'next/app';
import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import Layout from './layout';
import theme from '../theme';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
}