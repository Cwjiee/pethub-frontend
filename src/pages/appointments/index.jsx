import Navbar from "@/components/organisms/Navbar"
import BackButton from "@/components/atoms/BackButton"
import AppointmentsTable from "@/components/organisms/AppointmentsTable"
import { useContext, useEffect, useState } from "react"
import { GlobalContext } from "@/context"
import { Spinner } from "flowbite-react"
import LoadSpinner from "@/components/atoms/LoadSpinner"

export default function Appointments() {
  const [appointments, setAppointments] = useState()
  const { token } = useContext(GlobalContext)
  const url = process.env.NEXT_PUBLIC_API_URL
  const [tokenReady, setTokenReady] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  
  useEffect(() => {
    (async () => {
      const response = await fetch(`${url}/appointments`, {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Accept": "application/json"
        }
      })
      const result = await response.json()
      console.log(result);
      setAppointments(result.appointments)
      console.log(result.appointments)
      setIsLoading(false)
    })()
  }, [tokenReady])

  useEffect(() => {
    if (token) setTokenReady(true)
  }, [token])

  return !isLoading ? (
    <>
      <div className="flex flex-col justify-between min-h-screen">
        <Navbar title={false}></Navbar>
        <div className="w-full m-auto flex-auto pt-6 px-16 bg-[#F3F4F6]">
          <BackButton/>
          <div className="w-[80%] m-auto py-11">
            <div className="flex flex-col">
              <div className="text-2xl mx-auto font-bold">Appointments History</div>
            </div>
            <AppointmentsTable appointments={appointments} token={token}/>
          </div>
        </div>
      </div>
    </>
  ) : (
    <LoadSpinner />
  )
}
