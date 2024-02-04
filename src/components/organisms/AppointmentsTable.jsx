import Link from "next/link"

export default function AppointmentsTable({ appointments, token }) {
    return (
    <>
      <section class="sm:py-5 antialiased">
        <div class="mx-auto">
          <div class="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
            <div class="overflow-x-auto">
                <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-black uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
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
                            <td class="px-4 py-3 max-w-[12rem] truncate">{appointment.date}</td>
                            <td class="px-4 py-3 max-w-[12rem] truncate">{appointment.time}</td>
                            <td class="px-4 py-3 max-w-[12rem] truncate">{appointment.appointment_type}</td>
                            <td class="px-4 py-3 max-w-[12rem] truncate font-bold">
                              <span className={`${
                                appointment.appointment_status === 'approved' ? 'text-green-600' :
                                appointment.appointment_status === 'pending' ? 'text-yellow-400' :
                                'text-red-600'
                              }`}>
                                {appointment.appointment_status.toUpperCase()}
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
