import data from "../../../data/user.json"
import { v4 } from "uuid"

export default function UserTable() {
  return (
    <>
      <section class="sm:py-5 antialiased">
        <div class="mx-auto">
          <div class="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
            <div class="overflow-x-auto">
                <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" class="px-4 py-4">Full Name</th>
                            <th scope="col" class="px-4 py-4">Email</th>
                            <th scope="col" class="px-4 py-4">User Type</th>
                            <th scope="col" class="px-4 py-3">
                                <span class="sr-only">Delete User</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                      {data.data.map((x, idx) => {
                        return (
                          <tr class="border-b dark:border-gray-700" key={v4()}>
                            <th scope="row" class="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">{x.full_name}</th>
                            <td class="px-4 py-3 max-w-[12rem] truncate">{x.email}</td>
                            <td class="px-4 py-3">{x.user_type}</td>
                            <td class="px-4 py-3 flex items-center justify-end">
                              <button className="flex justify-around px-6 py-[10px] rounded-[10px] bg-[#EF4444]">
                                <div className="my-auto text-white font-bold spacing tracking-[0.86px] text-md">
                                  Delete User
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
