import SPFooter from "@/components/organisms/SPFooter"
import SPNavbar from "@/components/organisms/SPNavbar"
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "@/context";
import LoadSpinner from "@/components/atoms/LoadSpinner";
import { TimeConvertNotForDateTime } from "@/utils/TimeConvertNotForDateTime";
import { useRouter } from "next/router";
import BackButton from "@/components/atoms/BackButton";
import { useToast } from "@chakra-ui/react";
import checkAuth from "@/utils/checkAuth";

function ServiceProviderSpecificAppointment() {
    const { token, userId } = useContext(GlobalContext)
    const [appointment, setAppointment] = useState({})
    const [tokenReady, setTokenReady] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const router = useRouter();
    const toast = useToast();
    const aptId = router.query.id;
    const url = process.env.NEXT_PUBLIC_API_URL

    useEffect(() => {
      (async () => {
        if (tokenReady) {
          const response = await fetch(`${url}/service-provider/appointments/${userId}/${aptId}`, {
            headers: {
                "method": "GET",
                "Authorization": `Bearer ${token}`,
                "Accept": "application/json"
            }
          })
          const result = await response.json()
          console.log(result)
          setAppointment(result.appointment)
          setIsLoading(false)
        }
      })()
    }, [tokenReady, aptId])
  
    useEffect(() => {
      if (token && aptId) setTokenReady(true)
    }, [token, aptId])

    async function handleSubmit(e, status) {
      e.preventDefault();
      if(url) {
        const response = await fetch(`${url}/service-provider/appointments/${userId}/${aptId}`, {
          method: "POST",
          body: JSON.stringify({
              status: status,
          }),
          headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`,
              "Accept": "application/json",
          },
        })

        const result = await response.json()
        console.log(result)

        if (response.ok) {
          toast({
            title: 'Success',
            description: 'User status updated',
            status: 'success',
            duration: 3000,
            isClosable: true
          })
        router.push('/service-providers/appointments')
        } else {
          toast({
            title: 'Error',
            description: 'Failed in updating user status',
            status: 'error',
            duration: 3000,
            isClosable: true
          })
        }
      }
    }
  
    return !isLoading ?  (
    <>
        <SPNavbar/>
          <div className="w-[90%] mx-auto mt-10">
              <BackButton/>
              <div className='flex gap-x-8 justify-center'>
                <button
                  className="py-[12px] px-14 bg-[#22C55E] rounded-xl text-white font-bold shadow-lg" 
                  onClick={(e) => handleSubmit(e, "approved")}
                >
                  Approve
                </button>
                <button 
                  className="py-[12px] px-16 bg-[#EF4444] rounded-xl text-white font-bold shadow-lg"
                  onClick={(e) => handleSubmit(e, "rejected")}
                >
                    Reject
                </button>
              </div>
              <div className="mt-6 bg-white rounded-lg shadow-lg py-8 px-10 w-[500px] mx-auto">
                <h1 className="text-lg font-bold text-center">Appointment Application Details</h1>
                <div className="mt-7">
                  <p className="font-bold">Owner Name:</p>
                  <p>{appointment.user.full_name}</p>
                </div>
                <div className="mt-7">
                  <p className="font-bold pb-2">Owner Status:</p>
                  <span className={`py-2 px-4 rounded-3xl ${
                                appointment.user.user_status === 'approved' ? 'bg-[#22C55E] text-white ' :
                                appointment.user.user_status === 'pending' ? 'bg-yellow-400 text-black' :
                                'bg-red-600 text-white'
                              }`}>
                                {appointment.user.user_status}
                              </span>
                </div>
                <div className="mt-7">
                  <p className="font-bold">Owner Email:</p>
                  <p>{appointment.user.email}</p>
                </div>
                <div className="mt-3">
                  <p className="font-bold">Pet Name:</p>
                  <p>{appointment.pet.pet_name}</p>
                </div>
                <div className="mt-5">
                  <p className="font-bold">Appointment Date:</p>
                  <p>{appointment.date}</p>
                </div>
                <div className="mt-5">
                  <p className="font-bold">Appointment Time:</p>
                  <p>{appointment.time}</p>
                </div>
                <div className="mt-5">
                  <p className="font-bold">Issue of pet:</p>
                  <p className="text-justify">{appointment.issue_description}</p>
                </div>
                <div className="mt-5">
                  <p className="font-bold">Important details of pet:</p>
                  <p className="text-justify">{appointment.important_details}</p>
                </div>
                <div className="mt-5">
                  <Link target="_blank" href={appointment.upload_payment_proof} className="underline text-blue-500 hover:text-blue-700 active: active:text-blue-900">View transaction image</Link>
                </div>
                <div className="mt-5">
                  <Link href={`./user-profile/${appointment.user.user_id}`} className="underline text-blue-500 hover:text-blue-700 active: active:text-blue-900" >View owner & pet profile</Link>
                </div>  
              </div>
          </div>
        <SPFooter/>
    </>
    
  ): (
    <LoadSpinner />
  )
}

// ServiceProviderSpecificAppointment.getLayout = function getLayout(page) {
//     return (
//       <>
//         <main>
//           {page}
//         </main>
//       </>
//     )
// }

export default checkAuth(ServiceProviderSpecificAppointment)
