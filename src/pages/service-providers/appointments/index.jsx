
import BackButton from "@/components/atoms/BackButton"
import { GlobalContext } from "@/context"
import { useEffect, useState, useContext } from "react"
import { Spinner } from "@chakra-ui/react";
import SPNavbar from "@/components/organisms/SPNavbar";
import SPFooter from "@/components/organisms/SPFooter";
import AppointmentApplication from "@/components/organisms/AppointmentApplication";

function AdminServiceProvider() {
  const [appointments, setAppointments] = useState([])
  const { token, userId } = useContext(GlobalContext)
  const [tokenReady, setTokenReady] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
    console.log(userId);
  useEffect(() => {
      (async () => {
        if (tokenReady) {
          const url = process.env.NEXT_PUBLIC_API_URL
          const response = await fetch(`${url}/service-provider/appointments/${userId}`, {
            headers: {
              "Content-type": "application/json",
              "Authorization": `Bearer ${token}`,
              "Accept": "application/json"
            }
          })
          const result = await response.json()
          console.log(result.appointments);
          setAppointments(result.appointments)
          setIsLoading(false);
        }
      })()
  }, [tokenReady])

  useEffect(() => {
    if (token) setTokenReady(true)
  }, [token])

  if (isLoading) return <Spinner />

  return (
    <>
      <div className="flex flex-col justify-between min-h-screen">
      <SPNavbar title={true}>Appointments</SPNavbar>
        <div className="w-full m-auto flex-auto pt-6 px-16 bg-[#F3F4F6]">
          <BackButton/>
          <div className="w-full m-auto py-11">
            <div className="flex flex-col">
              <div className="text-2xl mx-auto font-bold">Pet Service Provider Applications</div>
              <AppointmentApplication appointments={appointments}/>
            </div>
          </div>
        </div>
        <SPFooter />
      </div>
    </>
  )
}

AdminServiceProvider.getLayout = function getLayout(page) {
  return (
    <>
      <main>
        {page}
      </main>
    </>
  )
}

export default checkAuth(AdminServiceProvider)
