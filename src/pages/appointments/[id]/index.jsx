import BackButton from "@/components/atoms/BackButton"
import LoadSpinner from "@/components/atoms/LoadSpinner"
import Navbar from "@/components/organisms/Navbar"
import { GlobalContext } from "@/context"
import { useRouter } from "next/router"
import { useContext, useEffect, useState } from "react"

function AppointmentPage() {
    const [appointment, setAppointment] = useState()
    const { token } = useContext(GlobalContext)
    const url = process.env.NEXT_PUBLIC_API_URL
    const [tokenReady, setTokenReady] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const router = useRouter();
    const id = router.query.id;

    useEffect(() => {
        (async () => {
            if (tokenReady) {
                const response = await fetch(`${url}/appointments/${id}`, {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Accept": "application/json"
                    }
                })
                const result = await response.json()
                setAppointment(result.appointment)
                console.log(result.appointment)
                setIsLoading(false)
            }
        })()
    }, [tokenReady, id])

    useEffect(() => {
        if (token && id) setTokenReady(true)
    }, [token, id])

    return !isLoading ? (
        <>
            <Navbar/>
            <div className="w-[90%] m-auto mt-10">
            <BackButton/>
            <div className="bg-white w-[500px] shadow-lg rounded-lg py-10 px-10 mx-auto mt-6">
                <h1 className="text-xl font-bold text-center mb-5">Appointment Details</h1>
                <div class="mb-4">
                    <p className="font-bold">Pet Name: </p>
                    <p>{appointment.pet.pet_name}</p>
                </div>
                <div class="mb-4">
                    <p className="font-bold">Service Name: </p>
                    <p>{appointment.service_provider.full_name}</p>
                </div>
                <div class="mb-4">
                    <p className="font-bold">Service Type: </p>
                    <p>Healthcare</p>
                </div>
                <div class="mb-4 font-bold">
                    <p>Appointment Status:</p>
                    <span className={`${
                        appointment.appointment_status === 'approved' ? 'text-green-600' :
                        appointment.appointment_status === 'pending' ? 'text-yellow-400' :
                        'text-red-600'
                        }`}>
                        {appointment.appointment_status.toUpperCase()}
                    </span>
                </div>
                <div class="mb-4">
                    <p className="font-bold">Appointment Date: </p>
                    <p>{appointment.date}</p>
                </div>
                <div class="mb-4">
                    <p className="font-bold">Appointment Time: </p>
                    <p>{appointment.time}</p>
                </div>
                <div class="mb-4">
                    <p className="font-bold">Important Details: </p>
                    <p>{appointment.important_details}</p>
                </div>
                <div >
                    <p className="font-bold">Issue Description: </p>
                    <p>{appointment.issue_description}</p>
                </div>
            </div>
            </div>
        </>
    ) : (
      <LoadSpinner />
    )
}

export default checkAuth(AppointmentPage)
