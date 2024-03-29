import Navbar from "@/components/organisms/Navbar";
import BackButton from "@/components/atoms/BackButton";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "@/context";
import LoadSpinner from "@/components/atoms/LoadSpinner";
import checkAuth from "@/utils/checkAuth";
import Footer from "@/components/organisms/Footer";

function NewsPage() {
  const router = useRouter()
  const id = router.query.id
  const url = process.env.NEXT_PUBLIC_API_URL
  const { token } = useContext(GlobalContext)
  const [news, setNews] = useState({})
  const [tokenReady, setTokenReady] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    (async () => {
      if (tokenReady) {
        const response = await fetch(`${url}/news/${id}`, {
          headers: {
            "Authorization": `Bearer ${token}`,
            'Accept': 'application/json'
          }
        })

        const result = await response.json()
        setNews(result.news)
        setIsLoading(false)
      }
    })()
  }, [tokenReady, id])

  useEffect(() => {
    if (token && id) setTokenReady(true)
  }, [token, id])

  return !isLoading ? (
    <>
      <Navbar title={false}>Pet News</Navbar>
      <div className="w-[80%] m-auto pt-6 px-6">
        <BackButton/>
        <div className="mt-7 flex justify-center gap-12 w-full mx-auto">
          <div className="w-[550px] max-w-[90%] items-center mx-auto bg-white rounded-lg py-8 px-10 shadow-lg">
            <h4 className="font-bold laptop:text-2xl text-center mb-5 tablet:text-xl phone:text-lg">{news.news_title}</h4>
            <img className="mx-auto rounded-md" height={470} width={427} src={news.image} alt="news-image"/>
            <div className="mt-4 flex justify-center gap-x-3">
              <div className="flex flex-row flex-wrap justify-between gap-5">
                {news.categories.map((category) => {
                  return (
                    <div key={category.category_id} className="flex justify-center items-center rounded-[40px] h-auto px-5 w-auto border border-[#D3D3D3]">
                      <span className="font-semibold text-sm spacing">{category.category_name}</span>
                    </div>
                  )}
                )}
              </div>
            </div>
            <div className="mt-8 text-justify tablet:text-md phone:tablet-sm">
              {news.news_description}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  ) : (
    <LoadSpinner />
  )  
}

export default checkAuth(NewsPage)
