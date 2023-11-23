import Image from "next/image";
import PetOwnerRegisterForm from "@/components/molecules/RegisterForm";
import { useState } from "react";

export default function Signup() {
  return (
    <>
      <div className="w-[80%] h-full m-auto px-6 pt-14 flex flex-col gap-4">
        <div className="flex gap-x-2">
          <Image src="/logo.svg" alt="logo" width={48} height={48} />
          <Image src="/Pethub.svg" alt="pethub" width={85} height={85} />
        </div>
        <div className="text-3xl font-bold">
          Register Pet Owner Information
        </div>
        <PetOwnerRegisterForm />
      </div>
    </>
  )
}

Signup.getLayout = function getLayout(page) {
  return (
    <main>
      {page}
    </main>
  )
}
