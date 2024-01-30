import { useRouter } from "next/router"
import AdminNavbar from "@/components/organisms/AdminNavbar"
import AdminFooter from "@/components/organisms/AdminFooter"
import BackButton from "@/components/atoms/BackButton"
import ReportInfo from "@/components/molecules/ReportInfo"
import { useState, useEffect, useContext } from "react"
import { GlobalContext } from "@/context"

export default function ReportDetails() {
  const router = useRouter()
  const id = router.query.id
  const [report, setReport] = useState({})
  const { token } = useContext(GlobalContext)

  useEffect(() => {
    
    (async() => {
      console.log(id)
      const url = process.env.NEXT_PUBLIC_API_URL
      const response = await fetch(`${url}/report/${id}`, { 
        headers: {
          "Authorization": `Bearer ${token}`,
          "Accept": "application/json"
        }
      })
      const data = await response.json()
      console.log(data.report)

      setReport(data.report)
    })()
  }, [id, token])

  return (
    <>
      <div className="flex flex-col justify-start min-h-screen">
        <AdminNavbar />
        <div className="w-full h-auto flex-auto pt-6 px-16 bg-[#F3F4F6]">
          <BackButton/>
          <div className="w-full m-auto py-11">
            <ReportInfo report={report}/>
          </div>
        </div>
        <AdminFooter />
      </div>
    </>
  )
}
