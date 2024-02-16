import Navbar from "@/components/organisms/Navbar";
import Searchbar from "@/components/molecules/SearchbarWithBtn";
import Posts from "@/components/molecules/Posts";
import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "@/context";
import Image from "next/image";
import Empty from "@/../../public/svg/EmptyNews.svg"
import LoadSpinner from "@/components/atoms/LoadSpinner";
import checkAuth from "@/utils/checkAuth";

function AdminForum() {
  const [posts, setPosts] = useState([])
  const [results, setResults] = useState([])
  const [isLoading, setIsLoading] = useState(true);
  const [tokenReady, setTokenReady] = useState(false)
  const { token } = useContext(GlobalContext)
  const [reloadPost, setReloadPost] = useState(false)
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
        setReloadPost(false)
      }
    })()
  }, [tokenReady, url, reloadPost])

  useEffect(() => {
    if (token) setTokenReady(true)
  }, [token])

  return !isLoading ? (
    <>
      <Navbar title={true}>Forums</Navbar>
      <div className="w-[80%] m-auto pt-6 px-6">
        <Searchbar setResult={setResults} label={"New Post"} href={"/forums/create"} results={results} data={posts} tags={tags}/>
        {results ? 
          results.map((post) => {
            return <Posts key={post.post_id} post={post} isAdmin={true} setReloadPost={setReloadPost}/>
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

export default checkAuth(AdminForum)
