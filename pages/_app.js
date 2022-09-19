import { UserProvider } from 'components/context/userContext'
import Layout from 'components/Layout'
import Head from 'next/head'
import { INFO } from '../CONSTANTS/PROJECT'
import '../styles/globals.css'

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>{INFO?.name}</title>
        <meta
          name="description"
          content="Keep control of your guests with this simple and powerfull web app. "
        />
        <link rel="icon" href="/icon.png"></link>
      </Head>
      <UserProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </UserProvider>
    </>
  )
}
