import '@/styles/globals.css'
import { Inter, Nunito } from 'next/font/google'

const inter = Nunito({
  subsets: ["latin"],
  weight: ["300", "500", "700"],
});


export default function App({ Component, pageProps }) {
  return (
    <main className={inter.className}>
      <Component  {...pageProps} />
    </main>
  ) 
}
