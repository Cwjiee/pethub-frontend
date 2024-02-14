import Navbar from "@/components/organisms/Navbar";
import Searchbar from "@/components/molecules/SearchbarWithBtn";
import { useEffect, useState } from "react";
import NewsBlock from "@/components/molecules/NewsBlock";
import Empty from "../../../public/svg/EmptyNews.svg"
import Image from "next/image";
import LoadSpinner from "@/components/atoms/LoadSpinner";

export default function News() {
  const [news, setNews] = useState([])
  const [results, setResults] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const href = "/news/create" 
  const url = process.env.NEXT_PUBLIC_API_URL

  const tags = [
    "Events",
    "Missing",
    "Promotions",
    "Adoption",
  ];

  useEffect(() => {
    (async () => {
      const response = await fetch(`${url}/news`)
      const data = await response.json()

      setNews(data.news)
      setResults(data.news)
      setIsLoading(false)
    })()
  }, [])

  return !isLoading ? (
    <>
      <Navbar title={true}>Pet News</Navbar>
      <div className="w-[80%] m-auto pt-6 px-6">
        <Searchbar setResult={setResults} label={"New News"} href={href} results={results} data={news} tags={tags}/>
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
    </>
  ) : (
    <LoadSpinner />
  )
}
