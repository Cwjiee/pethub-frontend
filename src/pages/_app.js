import Layout from '@/components/layout';
import '@/styles/globals.css'
import { Inter, Nunito } from 'next/font/google'
import { GlobalProvider } from '@/context';

const inter = Nunito({
  subsets: ["latin"],
  weight: ["300", "500", "700"],
});


export default function App({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => (
          <Layout>
            {page}
          </Layout>
  )) 

  return getLayout(
    <GlobalProvider>
      <main className={inter.className}>
        <Component  {...pageProps} />
      </main>
    </GlobalProvider>
  )
}
