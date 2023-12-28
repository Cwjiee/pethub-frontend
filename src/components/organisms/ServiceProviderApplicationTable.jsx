import data from "../../../data/news.json"
import { v4 } from "uuid"
import Link from "next/link"

export default function ServiceProviderApplicationTable() {
  return (
    <>
      <section class="sm:py-5 antialiased">
        <div class="mx-auto">
          <div class="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
            <div class="overflow-x-auto">
                <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" class="px-4 py-4">Facility Name</th>
                            <th scope="col" class="px-4 py-4">Contact Number</th>
                            <th scope="col" class="px-4 py-4">Type</th>
                            <th scope="col" class="px-4 py-3">
                                <span class="sr-only">More Details</span>
                            </th>
                            <th scope="col" class="px-4 py-3">
                                <span class="sr-only">Accept and Reject</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                      {data.data.map((x, idx) => {
                        return (
                          <tr class="border-b dark:border-gray-700" key={v4()}>
                            <th scope="row" class="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">{x.title}</th>
                            <td class="px-4 py-3 max-w-[12rem] truncate">{x.author}</td>
                            <td class="px-4 py-3">{x.category}</td>
                            <td class="px-4 py-3 justify-start">
                              <Link href={`./news/${idx}`} className="text-[#0055D4] underline">
                                More Details
                              </Link>
                            </td>
                            <td class="px-4 py-3 flex flex-row gap-x-2 justify-end">
                              <button className="flex justify-around px-6 py-[10px] rounded-[10px] bg-[#22C55E]">
                                <div className="my-auto text-white font-bold spacing tracking-[0.86px] text-md">
                                  Accept
                                </div>
                              </button>
                              <button className="flex justify-around px-6 py-[10px] rounded-[10px] bg-[#EF4444]">
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
