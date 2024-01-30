import AdminNavbar from "@/components/organisms/AdminNavbar"
import AdminFooter from "@/components/organisms/AdminFooter"
import BackButton from "@/components/atoms/BackButton"
import NewsTable from "@/components/organisms/NewsTable"
import { useContext, useEffect, useState } from "react"
import { GlobalContext } from "@/context"

export default function AdminNews() {
  const [news, setNews] = useState([])
  const { token } = useContext(GlobalContext)

  useEffect(() => {
    (async () => {
      const url = process.env.NEXT_PUBLIC_ADMIN_API_URL
      const response = await fetch(`${url}/news_application`, {
        headers: {
          "Content-type": "application/json",
          "Authorization": `Bearer ${token}`,
          "Accept": "application/json"
        }
      })
      const result = await response.json()
      setNews(result.news)
    })()
  }, [token])

  return (
    <>
      <div className="flex flex-col justify-between min-h-screen">
        <AdminNavbar />
        <div className="w-full m-auto flex-auto pt-6 px-16 bg-[#F3F4F6]">
          <BackButton/>
          <div className="w-full m-auto py-11">
            <div className="flex flex-col">
              <div className="text-2xl mx-auto font-bold">News</div>
            </div>
            <NewsTable news={news}/>
          </div>
        </div>
        <AdminFooter />
      </div>
    </>
  )
}

AdminNews.getLayout = function getLayout(page) {
  return (
    <main>
      {page}
    </main>
  )
}
