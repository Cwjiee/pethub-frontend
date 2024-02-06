import SPFooter from '@/components/organisms/SPFooter'
import SPNavbar from '@/components/organisms/SPNavbar'

export default function ServiceProviderSpecificUserProfile() {
  return (
    <>
      <SPNavbar/>
        
      <SPFooter/>
    </>
  )
}

ServiceProviderSpecificUserProfile.getLayout = function getLayout(page) {
  return (
    <>
      <main>
        {page}
      </main>
    </>
  )
}