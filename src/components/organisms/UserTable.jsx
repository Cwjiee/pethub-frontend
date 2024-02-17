import { v4 } from "uuid"
import { useToast } from "@chakra-ui/react"
import { GlobalContext } from "@/context"
import { useContext } from "react"

export default function UserTable({ users, setReloadUsers }) {
  const toast = useToast()
  const { token } = useContext(GlobalContext)
  const url = process.env.NEXT_PUBLIC_ADMIN_API_URL

  const handleDelete = async (user) => {
    const id = user.user_id

    const response = await fetch(`${url}/user/${id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        "Authorization": `Bearer ${token}`,
        "Accept": "application/json"
      }
    })
    const result = await response.json()

    console.log(result)

    if (response.ok) {
      toast({
        title: 'Success',
        description: 'User successfully deleted',
        status: 'success',
        duration: 3000,
        isClosable: true
      })
      setReloadUsers(true)
    } else {
      toast({
        title: 'Error',
        description: 'Failed in deleting user',
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
                    <th scope="col" class="px-4 py-4">Full Name</th>
                    <th scope="col" class="px-4 py-4">Email</th>
                    <th scope="col" class="px-4 py-4">User Type</th>
                    <th scope="col" class="px-4 py-3">
                      <span class="sr-only">Delete User</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => {
                    return (
                      <tr class="border-b dark:border-gray-700" key={v4()}>
                        <th scope="row" class="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">{user.full_name}</th>
                        <td class="px-4 py-3 max-w-[12rem] truncate">{user.email}</td>
                        {user.permission_level == 1 ? (
                          <td class="px-4 py-3">Normal</td>
                        ) : user.permissoin_level == 2? (
                            <td class="px-4 py-3">Pet Boarder/Veterinary</td>
                          ) : (
                              <td class="px-4 py-3">Unknown</td>
                            )}
                        {user.permission_level != 3 && (
                          <td class="px-4 py-3 flex items-center justify-end">
                            <button
                              className="flex justify-around px-6 py-[10px] rounded-[10px] bg-[#EF4444] hover:bg-[#D62828] active:bg-[#B91C1C]"
                              onClick={() => handleDelete(user)}
                            >
                              <div className="my-auto text-white font-bold spacing tracking-[0.86px] text-md">
                                Ban User
                              </div>
                            </button>
                          </td>
                        )}
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
