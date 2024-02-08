import Image from "next/image";
import ServiceProviderRegisterForm from "@/components/molecules/ServiceProviderRegisterForm";
import { Inter, Nunito } from 'next/font/google'

const inter = Nunito({
  subsets: ["latin"],
  weight: ["300", "500", "700"],
});

export default function Signup() {
  return (
    <>
      <div className="w-[80%] h-full m-auto px-6 pt-10 flex flex-col gap-4 ">
        <div className="flex gap-x-2">
          <Image src="/logo.svg" alt="logo" width={48} height={48} />
          <Image src="/Pethub.svg" alt="pethub" width={85} height={85} />
        </div>
        <div className="text-3xl font-bold">
          Register Service Provider Information
        </div>
        <ServiceProviderRegisterForm />
      </div>
    </>
  )
}

Signup.getLayout = function getLayout(page) {
  return (
    <main className={inter.className}>
      {page}
    </main>
  )
}
