import Searchbar from "@/components/molecules/SearchbarWithBtn";
import Tag from "@/components/atoms/Tag";
import { useContext, useEffect, useState } from "react";
import { v4 } from "uuid";
import NewsBlock from "@/components/molecules/NewsBlock";
import { GlobalContext } from "@/context";
import Empty from "../../../../public/svg/EmptyNews.svg"
import Image from "next/image";
import LoadSpinner from "@/components/atoms/LoadSpinner";
import SPNavbar from "@/components/organisms/SPNavbar";
import SPFooter from "@/components/organisms/SPFooter";

export default function ServiceProviderNewsPage() {
    const [input, setInput] = useState("");
    const { token } = useContext(GlobalContext)
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
          setIsLoading(false)
        }
      })()
    }, [tokenReady])
  
    useEffect(() => {
      if (token) setTokenReady(true)
    }, [token])
  
    return !isLoading ? (
      <>
        <SPNavbar/>
        <div className="w-[80%] m-auto pt-6 px-6">
          <Searchbar input={input} setInput={setInput} label={"New News"} href={href}/>
          <div className="flex justify-between mt-4 mb-6">
            <div className="flex gap-x-[12px]">
              {tags.map((tag) => {
                return <Tag tag={tag} tagId={v4()} key={v4()} />;
              })}
            </div>
          </div>
  
          {news ? 
            <div className="flex flex-row flex-wrap justify-between gap-5">
              {news.map((news) => {
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