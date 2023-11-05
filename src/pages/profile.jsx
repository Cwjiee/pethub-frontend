import Navbar from "@/components/organisms/Navbar";
import BackButton from "@/components/atoms/BackButton";
import Image from "next/image";

export default function Profile() {
  return (
    <>
      <Navbar></Navbar>
      <div className="w-[80%] m-auto pt-6 px-6">
        <BackButton/>
        <div className="flex flex-col mt-5">
          <div className="flex flex-row">
            <img class="inline-block h-10 w-10 rounded-full ring-2 ring-white" src="/Logo.svg" width={50} height={50} alt="avatar"/>
          </div>
        </div>
      </div>
    </>
  )
}
