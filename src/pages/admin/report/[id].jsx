import { useRouter } from "next/router"
import AdminNavbar from "@/components/organisms/AdminNavbar"
import AdminFooter from "@/components/organisms/AdminFooter"
import BackButton from "@/components/atoms/BackButton"
import ReportInfo from "@/components/molecules/ReportInfo"
import { useState, useEffect, useContext } from "react"
import { GlobalContext } from "@/context"
import LoadSpinner from "@/components/atoms/LoadSpinner"
import checkAuth from "@/utils/checkAuth"

function ReportDetails() {
  const router = useRouter()
  const id = router.query.id
  const [report, setReport] = useState({})
  const { token } = useContext(GlobalContext)
  const [tokenReady, setTokenReady] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const url = process.env.NEXT_PUBLIC_ADMIN_API_URL

  useEffect(() => {
    (async() => {
      console.log(id)
      const response = await fetch(`${url}/report/${id}`, { 
        headers: {
          "Authorization": `Bearer ${token}`,
          "Accept": "application/json"
        }
      })
      const data = await response.json()
      console.log(data.report)
      setReport(data.report)
      setIsLoading(false)
    })()
  }, [tokenReady])

  useEffect(() => {
    if (token && id) setTokenReady(true)
  }, [token, id])

  return !isLoading ? (
    <>
      <div className="flex flex-col justify-start min-h-screen">
        <AdminNavbar />
        <div className="w-full h-auto flex-auto pt-6 px-16 bg-[#F3F4F6]">
          <BackButton/>
          <div className="w-full m-auto py-11">
            {report && (
              <ReportInfo report={report}/>
            )}
          </div>
        </div>
        <AdminFooter />
      </div>
    </>
  ) : (
      <LoadSpinner />
    )
}

ReportDetails.getLayout = function getLayout(page) {
  return (
    <>
      <main>
        {page}
      </main>
    </>
  )
}

export default checkAuth(ReportDetails)
