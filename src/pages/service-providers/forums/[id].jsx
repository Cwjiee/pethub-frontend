import SPFooter from "@/components/organisms/SPFooter"
import SPNavbar from "@/components/organisms/SPNavbar"

export default function ServiceProviderSpecificPostPage() {
  return (
    <>
    <SPNavbar/>
    <SPFooter/>
    </>
  )
}

ServiceProviderSpecificPostPage.getLayout = function getLayout(page) {
    return (
      <>
        <main>
          {page}
        </main>
      </>
    )
  }