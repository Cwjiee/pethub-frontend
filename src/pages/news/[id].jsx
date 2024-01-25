import Navbar from "@/components/organisms/Navbar";
import BackButton from "@/components/atoms/BackButton";
import NewsPlaceholder from "../../../public/png/NewsPlaceholder.png";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "@/context";

export default function NewsPage() {
  const router = useRouter()
  const id = router.query.id
  const url = process.env.NEXT_PUBLIC_API_URL
  const { token } = useContext(GlobalContext)
  const [news, setNews] = useState({})

  useEffect(() => {
    (async () => {
      const response = await fetch(`${url}/news/${id}`, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })

      const result = await response.json()
      setNews(result.news)
    })()
  }, [token, url, id])

  return (
    <>
      <Navbar title={false}>Pet News</Navbar>
      <div className="w-[80%] m-auto pt-6 px-6">
        <BackButton/>
        <div className="mt-7 flex flex-row gap-12 w-full mx-auto">
          <div className="flex flex-col w-[65%] justify-center items-center mx-auto bg-white">
            <h4 className="font-bold text-2xl">{news.news_title}</h4>
            <img height={470} width={427} src={news.image} alt="news-image"/>
            <div className="mt-4 flex justify-center items-center">
              <div className="py-[6px] px-6 text-center text-neutral-800 text-sm font-bold font-['Nunito'] rounded-[40px] border border-neutral-300">
                Events
              </div>
            </div>
            <div className="mt-8">
              {news.news_description}
            </div>
          </div>
        </div>
      </div>
    </>
  )  
}
