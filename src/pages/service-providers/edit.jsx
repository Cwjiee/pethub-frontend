import SPFooter from '@/components/organisms/SPFooter'
import SPNavbar from '@/components/organisms/SPNavbar'
import Image from "next/image";
import ServiceProviderRegisterForm from "@/components/molecules/ServiceProviderRegisterForm";
import ServiceProviderEditForm from '@/components/molecules/ServiceProviderEditForm';

export default function ServiceProviderEditProfile() {
    return (
    <>
        <SPNavbar/>
            <div className="w-[80%] h-full m-auto px-6 pt-10 flex flex-col gap-4">
            <div className="text-3xl font-bold">
                Register Service Provider Information
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
  