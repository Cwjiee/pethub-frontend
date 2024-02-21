import { useRouter } from "next/router"
import Pet from "../../public/svg/pet-owner.svg"
import Vet from "../../public/svg/vet.svg"
import Image from "next/image"

export default function Account() {
  const router = useRouter()

  const handlePetOwner = () => {
    router.push('/pet-owners/register')
  }

  const handleServiceProvider = () => {
    router.push('/service-providers/register')
  }

  return (
    <>
      <div className="h-screen m-auto flex justify-center items-center">
        <div className="w-full h-full flex flex-col justify-center items-center text-[#222] text-center text-2xl font-semibold gap-11">
          <div>What kind of account would you like to register with?</div>
          <div className="flex flex-row gap-10">
            <div
              onClick={handlePetOwner}
              className="w-[45%] py-14 bg-white rounded-[10px] flex flex-col justify-center items-center cursor-pointer shadow-[0px_4px_6px_-2px_rgba(0,0,0,0.05),0px_10px_15px_-3px_rgba(0,0,0,0.10)] active:shadow-[0_0_10px_0_rgba(0,0,0,0.3),0_0_15_0_rgba(0,0,0,0.5)]">
              <Image src={Pet} alt="pet owner" />
              <div>Pet Owner</div>
            </div>
            <div
              onClick={handleServiceProvider}
              className="w-[45%] px-4 pt-4 py-10 bg-white rounded-[10px] flex flex-col justify-center items-center cursor-pointer shadow-[0px_4px_6px_-2px_rgba(0,0,0,0.05),0px_10px_15px_-3px_rgba(0,0,0,0.10)] active:shadow-[0_0_10px_0_rgba(0,0,0,0.3),0_0_15_0_rgba(0,0,0,0.5)]">
              <Image className="py-8" src={Vet} alt="vet"/>
              <div>Pet Service Provider</div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

Account.getLayout = function getLayout(page) {
  return (
    <main className="bg-[#F3F4F6]">
      {page}
    </main>
  )
}
