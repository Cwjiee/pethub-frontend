import AdminNavbar from "@/components/organisms/AdminNavbar"
import AdminFooter from "@/components/organisms/AdminFooter"
import BackButton from "@/components/atoms/BackButton"
import ServiceProviderApplicationTable from "@/components/organisms/ServiceProviderApplicationTable"
import { GlobalContext } from "@/context"
import { useEffect, useState, useContext } from "react"
import LoadSpinner from "@/components/atoms/LoadSpinner"
import checkAuth from "@/utils/checkAuth"

function AdminServiceProvider() {
  const [users, setUsers] = useState([])
  const { token } = useContext(GlobalContext)
  const [tokenReady, setTokenReady] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [reloadUsers, setReloadUsers] = useState(false)

  useEffect(() => {
      (async () => {
        if (tokenReady) {
          const url = process.env.NEXT_PUBLIC_ADMIN_API_URL
          const response = await fetch(`${url}/sp_application`, {
            headers: {
              "Content-type": "application/json",
              "Authorization": `Bearer ${token}`,
              "Accept": "application/json"
            }
          })
          const result = await response.json()
          setUsers(result.users)
          setIsLoading(false);
          setReloadUsers(false)
        }
      })()
  }, [tokenReady, reloadUsers])

  useEffect(() => {
    if (token) setTokenReady(true)
  }, [token])

  return !isLoading ? (
    <>
      <div className="flex flex-col justify-between min-h-screen">
        <AdminNavbar />
        <div className="w-full m-auto flex-auto pt-6 px-16 bg-[#F3F4F6]">
          <BackButton/>
          <div className="w-full m-auto py-11">
            <div className="flex flex-col">
              <div className="text-2xl mx-auto font-bold">Pet Service Provider Applications</div>
              <ServiceProviderApplicationTable users={users} setReloadUsers={setReloadUsers} />
            </div>
          </div>
        </div>
        <AdminFooter />
      </div>
    </>
  ) : (
    <LoadSpinner />
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

export default checkAuth(AdminServiceProvider)
