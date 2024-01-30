import AdminNavbar from "@/components/organisms/AdminNavbar"
import AdminFooter from "@/components/organisms/AdminFooter"
import BackButton from "@/components/atoms/BackButton"
import UserTable from "@/components/organisms/UserTable"
import { GlobalContext } from "@/context"
import { useContext, useEffect, useState } from "react"

export default function AdminUser() {
  const [users, setUsers] = useState([])
  const { token } = useContext(GlobalContext)

  useEffect(() => {

    (async () => {
      const url = process.env.NEXT_PUBLIC_ADMIN_API_URL
      const response = await fetch(`${url}/user`, {
        headers: {
          "Content-type": "application/json",
          "Authorization": `Bearer ${token}`,
          "Accept": "application/json"
        }
      })
      const result = await response.json()

      const user = result.user.filter((user) => user.user_status !== 'rejected')
      setUsers(user)
    })()
  }, [token, users])

  return (
    <>
      <div className="flex flex-col justify-between min-h-screen">
        <AdminNavbar />
        <div className="w-full m-auto flex-auto pt-6 px-16 bg-[#F3F4F6]">
          <BackButton/>
          <div className="w-full m-auto py-8">
            <div className="flex flex-col">
              <div className="text-2xl mx-auto font-bold">Users</div>
              <UserTable users={users}/>
            </div>
          </div>
        </div>
        <AdminFooter />
      </div>
    </>
  )
}

AdminUser.getLayout = function getLayout(page) {
  return (
    <>
      <main>
        {page}
      </main>
    </>
  )
}
