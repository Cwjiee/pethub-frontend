import { v4 } from "uuid"
import Link from "next/link"
import { GlobalContext } from "@/context"
import { useContext } from "react"
import { useToast } from "@chakra-ui/react"
import { TimeConvertNotForDateTime } from "@/utils/TimeConvertNotForDateTime"
import { modDate } from "@/utils/modDate"

export default function AppointmentApplication({ appointments, setReloadTable }) {
  const { token, userId } = useContext(GlobalContext)
  const toast = useToast()
  const url = process.env.NEXT_PUBLIC_API_URL

  const handleSubmit = async (status, appointmentId, e) => {
    e.preventDefault();
    const stringAppointmentId = appointmentId.toString()

    if(url) {
      const response = await fetch(`${url}/service-provider/appointments/${userId}/${stringAppointmentId}`, {
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
          description: 'Appointment status updated',
          status: 'success',
          duration: 3000,
          isClosable: true
        })
        setReloadTable(true)
      } else {
        toast({
          title: 'Error',
          description: 'Failed in updating appointment status',
          status: 'error',
          duration: 3000,
          isClosable: true
        })
      }
    }
  }

  return (
    <>
      <section class="sm:py-5 antialiased">
        <div class="mx-auto">
          <div class="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
            <div class="overflow-x-auto">
              <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" class="px-4 py-4">Pet Number</th>
                    <th scope="col" class="px-4 py-4">Appointment Date</th>
                    <th scope="col" class="px-4 py-4">Appointment Time</th>
                    <th scope="col" class="px-4 py-3">
                      <span class="sr-only">More Details</span>
                    </th>
                    <th scope="col" class="px-4 py-3">
                      <span class="sr-only">Approve and Reject</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {appointments && appointments.map((appointment) => {
                    return (
                      <tr class="border-b dark:border-gray-700" key={v4()}>
                        <th scope="row" class="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">{appointment.pet.pet_name}</th>
                        <td class="px-4 py-3 max-w-[12rem] truncate">{modDate(appointment.date)}</td>
                        <td class="px-4 py-3">{TimeConvertNotForDateTime(appointment.time)}</td>
                        <td class="px-4 py-3 justify-start">

                          <Link href={`./appointments/${appointment.appointment_id}`} className="text-[#0055D4] underline">
                            More Details
                          </Link>
                        </td>
                        <td class="px-4 py-3 flex flex-row gap-x-2 justify-end">
                          <button
                            className="flex justify-center px-4 py-[10px] rounded-[10px] bg-[#22C55E] hover:bg-[#1F9D4B] active:bg-[#0E6F33]"
                            onClick={(e) => handleSubmit('approved', appointment.appointment_id, e)}
                          >
                            <div className="my-auto text-white font-bold spacing tracking-[0.86px] text-md">
                              Approve
                            </div>
                          </button>
                          <button
                            className="flex justify-center px-6 py-[10px] rounded-[10px] bg-[#EF4444] hover:bg-[#D62828] active:bg-[#B91C1C]"
                            onClick={(e) => handleSubmit('rejected', appointment.appointment_id, e)}
                          >
                            <div className="my-auto text-white font-bold spacing tracking-[0.86px] text-md">
                              Reject
                            </div>
                          </button>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
