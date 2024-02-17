import AdminNavbar from "@/components/organisms/AdminNavbar"
import AdminFooter from "@/components/organisms/AdminFooter"
import BackButton from "@/components/atoms/BackButton"
import UserTable from "@/components/organisms/UserTable"
import { GlobalContext } from "@/context"
import { useContext, useEffect, useState } from "react"
import LoadSpinner from "@/components/atoms/LoadSpinner"
import checkAuth from "@/utils/checkAuth"

function AdminUser() {
  const [users, setUsers] = useState([])
  const { token } = useContext(GlobalContext)
  const [tokenReady, setTokenReady] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [reloadUsers, setReloadUsers] = useState(false)

  const url = process.env.NEXT_PUBLIC_ADMIN_API_URL

  useEffect(() => {
    (async () => {
      if (tokenReady) {
        const response = await fetch(`${url}/user`, {
          headers: {
            'Content-type': "application/json",
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json'
          }
        })

        const data = await response.json()
        setUsers(data.user)
        setIsLoading(false)
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
          <div className="w-full m-auto py-8">
            <div className="flex flex-col">
              <div className="text-2xl mx-auto font-bold">Users</div>
              <UserTable users={users} setReloadUsers={setReloadUsers} />
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

AdminUser.getLayout = function getLayout(page) {
  return (
    <>
      <main>
        {page}
      </main>
    </>
  )
}

export default checkAuth(AdminUser)
