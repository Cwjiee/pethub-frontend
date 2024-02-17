import AdminNavbar from "@/components/organisms/AdminNavbar"
import AdminFooter from "@/components/organisms/AdminFooter"
import { useRouter } from "next/router"
import BackButton from "@/components/atoms/BackButton" 
import { useContext, useEffect, useState } from "react"
import { GlobalContext } from "@/context"
import { useToast } from "@chakra-ui/react"
import LoadSpinner from "@/components/atoms/LoadSpinner"
import checkAuth from "@/utils/checkAuth"

function NewsDetails() {
  const router = useRouter()
  const toast = useToast()
  const id = router.query.id
  const { token } = useContext(GlobalContext)
  const [news, setNews] = useState({})
  const [tokenReady, setTokenReady] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const url = process.env.NEXT_PUBLIC_ADMIN_API_URL

  const handleSubmit = async (application, newsId) => {

    const response = await fetch(`${url}/news_application/${newsId}`, {
      method: "PUT",
      body: JSON.stringify({
        news_status: application,
      }),
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
        "Accept": "application/json"
      },
    })
    const result = await response.json()
    console.log(result)

    if (response.ok) {
      toast({
        title: 'Success',
        description: 'News status updated',
        status: 'success',
        duration: 3000,
        isClosable: true
      })
      router.push('/admin/news')
    } else {
      toast({
        title: 'Error',
        description: 'Failed in updating news status',
        status: 'error',
        duration: 3000,
        isClosable: true
      })
    }
  }

  useEffect(() => {
    (async () => {
      if (tokenReady) {
        const response = await fetch(`${url}/news_application/${id}`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Accept": "application/json"
          }
        })

        const result = await response.json()
        setNews(result.news)
        setIsLoading(false)
      }
    })()
  }, [tokenReady, url])

  useEffect(() => {
    if (token && url) setTokenReady(true)
  }, [token, id])

  return !isLoading ? (
    <>
      <div className="flex flex-col justify-between min-h-screen">
        <AdminNavbar />
        <div className="w-full m-auto mb-20 flex-auto pt-6 px-16 bg-[#F3F4F6]">
          <BackButton/>
          {news && 
            <div>
              <div className="flex justify-center items-center mb-5">
                <div className="flex flex-row gap-x-4">
                  <button onClick={() => handleSubmit('approved', news.news_id)} className="flex justify-around px-4 py-[10px] rounded-[10px] bg-[#22C55E] w-[160px] text-sm font-bold">
                    <div className="my-auto text-white font-bold spacing tracking-[0.86px] text-md">
                      Approve
                    </div>
                  </button>
                  <button onClick={() => handleSubmit('rejected', news.news_id)} className="flex justify-around px-6 py-[10px] rounded-[10px] bg-[#EF4444] w-[160px] text-sm font-bold">
                    <div className="my-auto text-white font-bold spacing tracking-[0.86px] text-md">
                      Reject
                    </div>
                  </button>
                </div>
              </div>
              <div className="w-[60%] mx-auto bg-white mt-6 pt-20 pb-10 px-24 flex flex-col justify-center items-center gap-y-4">
                <div className="font-bold text-2xl">{news.news_title}</div>
                <img src={news.image} width="632px" heigth="382px" alt="news-image" />
                <div className="flex flex-row gap-x-2">
                  {news.categories && ( 
                    news.categories.map((_, idx) => {
                      return (
                        <div key={news.categories[idx].category_id} className="flex justify-between">
                          <div className="flex justify-center items-center bg-white rounded-[40px] h-6 px-5 w-auto border border-[#D3D3D3]">
                            <span className="font-semibold text-sm spacing">{news.categories[idx].category_name}</span>
                          </div>
                        </div>
                      )
                    })
                  )}
                </div>
                <div>{news.news_description}</div>
              </div>
            </div>
          }
        </div>
        <AdminFooter />
      </div>
    </>
  ) : (
      <LoadSpinner />
    )
}

NewsDetails.getLayout = function getLayout(page) {
  return (
    <>
      <main>
        {page}
      </main>
    </>
  )
}

export default checkAuth(NewsDetails)
