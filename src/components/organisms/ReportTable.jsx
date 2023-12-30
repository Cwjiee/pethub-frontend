import { v4 } from "uuid"
import Link from "next/link"
import { useEffect, useState, useContext } from "react"
import { GlobalContext } from "@/context"

export default function ReportTable() {
  const [reports, setReports] = useState([])
  const { token } = useContext(GlobalContext)

  useEffect(() => {
    
    (async() => {
      const url = process.env.NEXT_PUBLIC_API_URL
      const response = await fetch(`${url}/report`, { 
        headers: {
        "Authorization": `Bearer ${token}`
        }
      })
      const data = await response.json()
      console.log(data.report)

      setReports(data.report)
    })()
  }, [token])

  return (
    <>
      <section class="sm:py-5 antialiased">
        <div class="mx-auto">
          <div class="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
            <div class="overflow-x-auto">
                <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" class="px-4 py-4">Report Title</th>
                            <th scope="col" class="px-4 py-4">Report Description</th>
                            <th scope="col" class="px-4 py-4">Full Name</th>
                            <th scope="col" class="px-4 py-3">
                                <span class="sr-only">More Details</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {reports.map((report) => {
                          return (
                            <tr class="border-b dark:border-gray-700" key={v4()}>
                              <th scope="row" class="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">{report.report_title}</th>
                              <td class="px-4 py-3 max-w-[12rem] truncate">{report.report_description}</td>
                              <td class="px-4 py-3">{report.user.full_name}</td>
                              <td class="px-4 py-3 flex items-center justify-end">
                                <Link href={`./report/${report.report_id}`} className="text-[#0055D4] underline">
                                  More Details
                                </Link>
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
