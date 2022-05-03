import { AppProps } from "next/app";
import Layout from "../components/Layout";
import { UserProvider } from '../components/context/userContext'
import "../styles/globals.css";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <UserProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </UserProvider>
    </>
  );
}
