import '@/styles/globals.css'
import Layout from '@/components/layout';
import { SessionProvider } from "next-auth/react";
import { UserContextProvider } from '@/contexts/UserContext';

export default function App({ Component, pageProps: { session, ...pageProps}, }) {
  return (
    <SessionProvider session={session}>
      <UserContextProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
      </UserContextProvider>
    </SessionProvider>
  );
}
