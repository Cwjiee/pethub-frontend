import SPFooter from "@/components/organisms/SPFooter"
import SPNavbar from "@/components/organisms/SPNavbar"
import Searchbar from "@/components/molecules/SearchbarWithBtn";
import Posts from "@/components/molecules/Posts";
import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "@/context";
import Image from "next/image";
import Empty from "../../../../public/svg/EmptyNews.svg"
import LoadSpinner from "@/components/atoms/LoadSpinner";
import checkAuth from "@/utils/checkAuth";

function ServiceProviderPostPage() {
  const [results, setResults] = useState([])
  const [posts, setPosts] = useState([])
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
      }
    })()
  }, [tokenReady, url])

  useEffect(() => {
    if (token) setTokenReady(true)
  }, [token])
  return !isLoading ? (
    <>
      <SPNavbar title={true}>Forums</SPNavbar>
      <div className="w-[80%] m-auto pt-6 px-6">
        <Searchbar results={results} setResult={setResults} label={"New Post"} href={"/service-providers/forums/create"} tags={tags} data={posts}/>
        {results ? 
          results.map((post) => {
            return <Posts isSP={true} key={post.post_id} post={post}/>
          })
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

ServiceProviderPostPage.getLayout = function getLayout(page) {
  return (
    <>
      <main>
        {page}
      </main>
    </>
  )
}

export default checkAuth(ServiceProviderPostPage)
