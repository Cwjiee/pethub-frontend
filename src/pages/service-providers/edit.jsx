import SPFooter from '@/components/organisms/SPFooter'
import SPNavbar from '@/components/organisms/SPNavbar'
import ServiceProviderEditForm from '@/components/molecules/ServiceProviderEditForm';
import BackButton from '@/components/atoms/BackButton';
import checkAuth from '@/utils/checkAuth';

function ServiceProviderEditProfile() {
    return (
    <>
        <SPNavbar/>
            <div className="w-[80%] h-full m-auto px-6 pt-10 flex flex-col gap-4">
            <BackButton/>
            <div className="text-3xl font-bold">
                Edit Pet Service Provider Information
            </div>
                <ServiceProviderEditForm />
            </div>
        <SPFooter/>
    </>
    )
}

ServiceProviderEditProfile.getLayout = function getLayout(page) {
  return (
    <main>
      {page}
    </main>
  )
}
  

export default checkAuth(ServiceProviderEditProfile)
