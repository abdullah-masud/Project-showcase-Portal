import Header from '@/components/Header/Header'
import '@/styles/globals.css'
import { SessionProvider } from "next-auth/react"
import { ToastContainer } from 'react-toastify';

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <Header />
      <Component {...pageProps} />
      <ToastContainer />
    </SessionProvider>
  )
}
