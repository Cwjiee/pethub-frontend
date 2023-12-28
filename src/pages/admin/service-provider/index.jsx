import AdminNavbar from "@/components/organisms/AdminNavbar"
import AdminFooter from "@/components/organisms/AdminFooter"
import BackButton from "@/components/atoms/BackButton"
import ServiceProviderApplicationTable from "@/components/organisms/ServiceProviderApplicationTable"
import { useEffect, useState } from "react"

export default function AdminServiceProvider() {
  const [users, setUsers] = useState([])

  useEffect(() => {

    (async () => {
      const url = process.env.NEXT_PUBLIC_API_URL
      const response = await fetch(`${url}/users`)
      const result = await response.json()

      const users = result.users.filter((user) => user.permission_level === '2' && user.user_status === 'pending')
      setUsers(users)
    })()
  }, [])

  return (
    <>
      <div className="flex flex-col justify-between min-h-screen">
        <AdminNavbar />
        <div className="w-full m-auto flex-auto pt-6 px-16 bg-[#F3F4F6]">
          <BackButton/>
          <div className="w-full m-auto py-11">
            <div className="flex flex-col">
              <div className="text-2xl mx-auto font-bold">Pet Service Provider Applications</div>
              <ServiceProviderApplicationTable users={users}/>
            </div>
          </div>
        </div>
        <AdminFooter />
      </div>
    </>
  )
}

AdminServiceProvider.getLayout = function getLayout(page) {
  return (
    <>
      <main>
        {page}
      </main>
    </>
  )
}
