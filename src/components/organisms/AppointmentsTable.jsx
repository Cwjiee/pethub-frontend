import { TimeConvertNotForDateTime } from "@/utils/TimeConvertNotForDateTime"
import { modDate } from "@/utils/modDate"
import Link from "next/link"

export default function AppointmentsTable({ appointments, token }) {
    return (
    <>
      <section class="sm:py-5 antialiased">
        <div class="mx-auto">
          <div class="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
            <div class="overflow-x-auto">
                <table class="w-full text-md text-left text-gray-500 dark:text-gray-400">
                    <thead class="text-sm font-bold text-black uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" class="px-4 py-4">Service Name</th>
                            <th scope="col" class="px-4 py-4">Appointment Date</th>
                            <th scope="col" class="px-4 py-4">Appointment Time</th>
                            <th scope="col" class="px-4 py-4">Service Type</th>
                            <th scope="col" class="px-4 py-4">Status</th>
                            <th scope="col" class="px-4 py-3">
                                <span class="sr-only">More Details</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                    {appointments && (
                      appointments.map((appointment) => {
                        return (
                          <tr class="border-b dark:border-gray-700" key={appointment.appointment_id}>
                            <th scope="row" class="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">{appointment.service_provider.full_name}</th>
                            <td class="px-4 py-3 max-w-[12rem] truncate">{modDate(appointment.date)}</td>
                            <td class="px-4 py-3 max-w-[12rem] truncate">{TimeConvertNotForDateTime(appointment.time)}</td>
                            <td class="px-4 py-3 max-w-[12rem] truncate">{appointment.appointment_type}</td>
                            <td class="px-4 py-3 max-w-[12rem] truncate font-bold">
                              <span className={`py-2 px-4 rounded-3xl ${
                                appointment.appointment_status === 'approved' ? 'bg-[#22C55E] text-white ' :
                                appointment.appointment_status === 'pending' ? 'bg-yellow-400 text-black' :
                                'bg-red-600 text-white'
                              }`}>
                                {appointment.appointment_status}
                              </span>
                            </td>
                            <td class="px-4 py-3 flex items-center justify-end">
                              <Link
                                href={`./appointments/${appointment.appointment_id}`}
                                className="flex justify-around px-6 py-[10px] rounded-[10px] bg-primary-500 hover:bg-primary:600 active:bg-primary-700"
                              >
                                <div className="my-auto text-white font-bold spacing tracking-[0.86px] text-md">
                                  More Details
                                </div>
                              </Link>
                            </td>
                          </tr>
                        )
                      })
                    )}
                    </tbody>
                </table>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
