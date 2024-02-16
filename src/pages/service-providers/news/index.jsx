import Searchbar from "@/components/molecules/SearchbarWithBtn";
import { useContext, useEffect, useState } from "react";
import NewsBlock from "@/components/molecules/NewsBlock";
import { GlobalContext } from "@/context";
import Empty from "../../../../public/svg/EmptyNews.svg"
import Image from "next/image";
import LoadSpinner from "@/components/atoms/LoadSpinner";
import SPNavbar from "@/components/organisms/SPNavbar";
import SPFooter from "@/components/organisms/SPFooter";

function ServiceProviderNewsPage() {
    const { token } = useContext(GlobalContext)
    const [results, setResults] = useState([])
    const [news, setNews] = useState([])
    const [tokenReady, setTokenReady] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
  
    const tags = ["Events", "Missing", "Promotions", "Adoptions"];
    const href = "/service-providers/news/create" 
    const url = process.env.NEXT_PUBLIC_API_URL
  
    useEffect(() => {
      (async () => {
        if (tokenReady) {
          const response = await fetch(`${url}/news`, {
            headers: {
              'Content-type': "application/json",
              'Authorization': `Bearer ${token}`,
              'Accept': 'application/json'
            }
          })
  
          const data = await response.json()
          console.log(data);
          setNews(data.news)
          setResults(data.news)
          setIsLoading(false)
        }
      })()
    }, [tokenReady])
  
    useEffect(() => {
      if (token) setTokenReady(true)
    }, [token])
  
    return !isLoading ? (
      <>
        <SPNavbar title={true}>Pet News</SPNavbar>
        <div className="w-[80%] m-auto pt-6 px-6">
          <Searchbar results={results} setResult={setResults} label={"New News"} href={href} data={news} tags={tags}/>
          {results ? 
            <div className="flex flex-row flex-wrap justify-between gap-5">
              {results.map((news) => {
                return <NewsBlock key={news.news_id} news={news}/>
              })}
            </div>
          : 
            <div className="flex flex-col justify-center items-center mt-20">
              <Image src={Empty} width={200} height={245} alt="empty news"/>
              <div className="flex justify-center text-2xl m-20 font-bold text-secondary-500">Wow, such emptiness :(</div>
            </div>
          }
        </div>
        <SPFooter/>
      </>
    ) : (
      <LoadSpinner />
    )
  }
  
ServiceProviderNewsPage.getLayout = function getLayout(page) {
    return (
        <>
        <main>
            {page}
        </main>
        </>
    )
}

export default checkAuth(ServiceProviderNewsPage)
