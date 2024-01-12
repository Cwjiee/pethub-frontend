import { v4 } from "uuid"
import Link from "next/link"
import { GlobalContext } from "@/context"
import { useContext } from "react"
import { useToast } from "@chakra-ui/react"

export default function ServiceProviderApplicationTable({ users }) {
  const { token } = useContext(GlobalContext)
  const toast = useToast()

  const handleSubmit = async (application, user) => {
    
    const url = process.env.NEXT_PUBLIC_API_URL
    const id = user.user_id

    const answer = application === 'Accept' ? 'success' : 'rejected'

    const response = await fetch(`http://localhost:8000/api/v1/admin/service_provider_application/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        user_status: answer,
      }),
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
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
                      {users.map((user, idx) => {
                        return (
                          <tr class="border-b dark:border-gray-700" key={v4()}>
                            <th scope="row" class="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">{user.full_name}</th>
                            <td class="px-4 py-3 max-w-[12rem] truncate">{user.contact_number}</td>
                            <td class="px-4 py-3">{user.service_type}</td>
                            <td class="px-4 py-3 justify-start">
                              <Link href={`./news/${idx}`} className="text-[#0055D4] underline">
                                More Details
                              </Link>
                            </td>
                            <td class="px-4 py-3 flex flex-row gap-x-2 justify-end">
                              <button
                                className="flex justify-around px-6 py-[10px] rounded-[10px] bg-[#22C55E]"
                                onClick={() => handleSubmit('Accept', user)}
                              >
                                <div className="my-auto text-white font-bold spacing tracking-[0.86px] text-md">
                                  Accept
                                </div>
                              </button>
                              <button
                                className="flex justify-around px-6 py-[10px] rounded-[10px] bg-[#EF4444]"
                                onClick={() => handleSubmit('Reject', user)}
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
