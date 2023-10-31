import Layout from '@/components/layout';
import '@/styles/globals.css'
import { Inter, Nunito } from 'next/font/google'

const inter = Nunito({
  subsets: ["latin"],
  weight: ["300", "500", "700"],
});


export default function App({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => (
          <Layout>
            <div className={inter.className}>
              {page}
            </div>
          </Layout>
  )) 

  return getLayout(<Component  {...pageProps} />)
}
