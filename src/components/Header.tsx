import Head from 'next/head';
import { texts } from '../texts';

export default function Header() {

  return (
    <Head>
      <title>{texts.title}</title>
      <meta name="description" content="Currency Search by country" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
}