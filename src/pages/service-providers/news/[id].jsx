import BackButton from "@/components/atoms/BackButton";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "@/context";
import LoadSpinner from "@/components/atoms/LoadSpinner";
import SPNavbar from "@/components/organisms/SPNavbar";
import SPFooter from "@/components/organisms/SPFooter";

export default function ServiceProviderSpecificNewsPage() {
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
        <SPNavbar/>
            <div className="w-[90%] m-auto pt-6 px-6">
                <BackButton/>
                <div className="mt-7 flex justify-center gap-12 w-full mx-auto">
                <div className="w-[550px] max-w-[90%] items-center mx-auto bg-white rounded-lg py-8 px-10 shadow-lg">
                    <h4 className="font-bold laptop:text-2xl text-center mb-5 tablet:text-xl phone:text-lg">{news.news_title}</h4>
                    <img className="mx-auto rounded-md" height={470} width={427} src={news.image} alt="news-image"/>
                    <div className="mt-4 flex justify-center gap-x-3">
                    <div className="py-[6px] px-6 text-center text-neutral-800 text-sm font-bold font-['Nunito'] rounded-[40px] border border-neutral-300">
                        Events
                    </div>
                    </div>
                    <div className="mt-8 text-justify md:text-md sm:tablet-sm">
                    {news.news_description}
                    </div>
                </div>
                </div>
            </div>
      <SPFooter/>
    </>
  ) : (
    <LoadSpinner />
  )  
}

ServiceProviderSpecificNewsPage.getLayout = function getLayout(page) {
    return (
      <>
        <main>
          {page}
        </main>
      </>
    )
  }