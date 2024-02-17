import Image from "next/image"
import AccImage from "@../../../public/svg/accountPending.svg"
import { useRouter } from "next/router"
import Navbar from "@/components/organisms/Navbar"
import checkAuth from "@/utils/checkAuth"

function AppointmentStatus() {
  const router = useRouter()

  const handleRoute = () => {
    router.push('/profile')
    return
  }

  return (
    <>
      <Navbar title={false}></Navbar>
      <div className="my-36 m-auto flex justify-center items-center">
        <div className="p-10 bg-white flex flex-col items-center w-[28%] gap-5 rounded-[10px] shadow-[0px_4px_6px_-2px_rgba(0,0,0,0.05),0px_10px_15px_-3px_rgba(0,0,0,0.10)] active:shadow-[0_0_10px_0_rgba(0,0,0,0.3),0_0_15_0_rgba(0,0,0,0.5)]"> 
          <div className="text-2xl font-bold">Appointment is Pending!</div>
          <Image src={AccImage} alt="account-pending" />
          <div className="text-balance px-12 text-center">
            Appointment has been made. It will be checked by the veterinary/pet boarder staff. Wait for 1 or 2 days to know the status of your appointment
          </div>
          <button
            className="mx-auto rounded-[10px] text-white flex justify-center items-center hover:cursor-pointer w-3/4 px-6 py-3 bg-primary-500 hover:bg-primary-600 active:bg-primary-700"
            style={{
              boxShadow:
                "0px 4px 6px -2px rgba(0, 0, 0, 0.05), 0px 10px 15px -3px rgba(0, 0, 0, 0.10)",
            }}
            onClick={handleRoute}
          >
            Back to Profile Page
          </button>
        </div>
      </div>
    </>
  )
}

export default checkAuth(AppointmentStatus)
