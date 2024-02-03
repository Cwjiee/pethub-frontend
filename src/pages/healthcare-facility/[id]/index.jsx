import Navbar from "@/components/organisms/Navbar"
import BackButton from "@/components/atoms/BackButton"
import Image from "next/image"
import SpPlaceholder from "@/../public/svg/SpPlaceholder.svg"
import Link from "next/link"
import { useRouter } from "next/router"

export default function HealthcareFacilityInfo() {
  const router = useRouter()
  const facilityId = router.query.id

  return (
    <>
      <Navbar title={false}>Pet News</Navbar>
      <div className="w-[80%] m-auto pt-6 px-6">
        <BackButton/>
        <div className="mt-7 flex flex-col gap-12 w-full mx-auto justify-center items-center">
          <div className="ring-[5px] ring-white rounded-[10px]">
            <Image src={SpPlaceholder} width={320} height={210} alt="service-provider-image" />
          </div>
          <div className="shadow-lg rounded-[10px] p-10 bg-white w-[70%] flex flex-col gap-y-12">
            <div className="flex flex-col gap-y-4">
              <div>Name: My Clinic</div>
              <div>Contact Number:  6003823209842</div>
              <div>Opening Hours: 10:00pm to 12:00am</div>
              <div>Service Type: Healthcare Facility</div>
              <div>Deposit Range: RM10.00</div>
            </div>
            <div className="flex flex-col gap-y-5">
              <div className="font-semibold">About My Clinic</div>
              <div>
                Animal lover dedicated to connecting pets and their owners. 
                Committed to making the lives of our furry friends happier and healthier.
                Join me on this pawsome journey
              </div>
            </div>
          </div>
          <Link
            href={`./${facilityId}/new/`}
            className="w-[20%] h-12 rounded-[10px] bg-primary-500 hover:bg-primary-600 active:bg-primary-700 text-white cursor-pointer flex justify-center items-center"
          >
            Book Now
          </Link>
        </div>
      </div>
    </>
  )
}
