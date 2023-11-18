import Footer from './organisms/Footer'

export default function Layout({ children }) {
  return (
    <>
    <main>{children}</main>
      <Footer />
    </>
  )
}
