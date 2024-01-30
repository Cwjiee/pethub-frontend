import AdminNavbar from "@/components/organisms/AdminNavbar"
import AdminFooter from "@/components/organisms/AdminFooter"
import BackButton from "@/components/atoms/BackButton"
import ServiceProviderApplicationTable from "@/components/organisms/ServiceProviderApplicationTable"
import { GlobalContext } from "@/context"
import { useEffect, useState, useContext } from "react"

export default function AdminServiceProvider() {
  const [users, setUsers] = useState([])
  const { token } = useContext(GlobalContext)

  useEffect(() => {

    (async () => {
      const url = process.env.NEXT_PUBLIC_ADMIN_API_URL
      const response = await fetch(`${url}/sp_application`, {
        headers: {
          "Content-type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      })
      const result = await response.json()
      setUsers(result.users)
    })()
  }, [token, users])

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
