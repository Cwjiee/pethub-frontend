import Image from "next/image";
import Form from "@/components/molecules/LoginForm";
import { Inter, Nunito } from 'next/font/google'
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useToast } from "@chakra-ui/react";

const inter = Nunito({
  subsets: ["latin"],
  weight: ["300", "500", "700"],
});

export default function Login() {
  const router = useRouter()
  const toast = useToast()

  useEffect(() => {
    let notAuth = router.query.result
    if (notAuth) {
      toast({
        title: 'Unauthorized Access',
        description: 'Please login before you proceed',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  }, [router, toast])
  
  return (
    <div className="flex w-full h-screen">
      <div className="w-1/2 h-full px-[80px] pt-[70px] pb-[90px]">
        <div className="flex gap-x-2">
          <Image src="/logo.svg" alt="logo" width={48} height={48} />
          <Image src="/Pethub.svg" alt="pethub" width={85} height={85} />
        </div>
        <div className="mt-[70px]">
          <Image
            src={"/register.svg"}
            alt="register"
            width={560}
            height={470}
          />
        </div>
      </div>
      <div className="w-1/2 h-screen bg-white">
        <div className="px-[160px] pt-[20%] my-auto">
          <span className="text-4xl font-bold">Welcome</span>
          <Form/>
        </div>
      </div>
    </div>
  );
}

Login.getLayout = function getLayout(page) {
  return (
    <main className={inter.className}>
      {page}
    </main>
  )
}
