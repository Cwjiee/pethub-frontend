import Navbar from "@/components/organisms/Navbar";
import Searchbar from "@/components/molecules/SearchbarWithBtn";
import Posts from "@/components/molecules/Posts";
import Tag from "@/components/atoms/Tag";
import { useContext, useEffect, useState } from "react";
import { v4 } from "uuid";
import { GlobalContext } from "@/context";
import Image from "next/image";
import Empty from "../../../public/svg/EmptyNews.svg"
import LoadSpinner from "@/components/atoms/LoadSpinner";

export default function Forum() {
  const [posts, setPosts] = useState([])
  const [results, setResults] = useState([])
  const [isLoading, setIsLoading] = useState(true);
  const { token } = useContext(GlobalContext)
  const tags = [
    "Dogs",
    "Cats",
    "Hamsters",
    "Tips",
    "Healthcare",
    "Food",
    "Grooming",
  ];
  const url = process.env.NEXT_PUBLIC_API_URL
  const [tokenReady, setTokenReady] = useState(false)

  useEffect(() => {
    (async () => {
      if (tokenReady) {
        const response = await fetch(`${url}/posts`, {
          headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json'
          }
        })
        const result = await response.json()
        setPosts(result.posts)
        setResults(result.posts)
        setIsLoading(false)
        console.log(posts)
      }
    })()
  }, [tokenReady, url])

  useEffect(() => {
    if (token) setTokenReady(true)
  }, [token])

  useEffect(() => {
    console.log(posts)
  }, [posts])

  return !isLoading ? (
    <>
      <Navbar title={true}>Forums</Navbar>
      <div className="w-[80%] m-auto pt-6 px-6">
        <Searchbar setResult={setResults} label={"New Post"} href={"/forums/create"} results={results} data={posts}/>
        <div className="flex justify-between mt-4 mb-6">
          <div className="flex gap-x-[12px]">
            {tags.map((tag) => {
              return <Tag tag={tag} tagId={v4()} key={v4()} />;
            })}
          </div>
          <div
            className="flex justify-center items-center bg-white rounded-[40px] px-8 h-[32px] w-auto"
            style={{
              boxShadow:
                "0px 4px 6px -2px rgba(0, 0, 0, 0.05), 0px 10px 15px -3px rgba(0, 0, 0, 0.10)",
            }}
          >
            <span className="font-semibold text-md spacing tracking-[0.86px]">
              All
            </span>
          </div>
        </div>
        {results ? 
          results.map((post) => {
            return <Posts key={post.post_id} post={post}/>
          })
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
