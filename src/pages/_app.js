import Layout from '@/components/layout';
import '@/styles/globals.css'
import { Inter, Nunito } from 'next/font/google'
import { GlobalProvider } from '@/context';
import { ChakraProvider } from '@chakra-ui/react'
import theme from "../../theme"

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
      <ChakraProvider theme={theme}>
        <main className={inter.className}>
          <Component  {...pageProps} />
        </main>
      </ChakraProvider>
    </GlobalProvider>
  )
}
