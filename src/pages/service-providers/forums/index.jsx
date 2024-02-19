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
  const [reloadPost, setReloadPost] = useState(false)
  const [user,setUser] = useState()
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
    const fetchPost = async () => {
      const response = await fetch(`${url}/posts`)
      const result = await response.json()

      setPosts(result.posts)
      setResults(result.posts)
    }

    const fetchUser = async () => {
      if (tokenReady) {
        const response = await fetch(`http://localhost/api/v1/profile`, {
          headers: {
            "Authorization": `Bearer ${token}`,
            'Accept': 'application/json'
          }
        })

        const result = await response.json()
        setUser(result.user)
      }
    }

    fetchUser()
    fetchPost()

    setReloadPost(false)
    setIsLoading(false)
  }, [tokenReady, url, reloadPost])

  useEffect(() => {
    if (token) setTokenReady(true)
  }, [token])

  return !isLoading ? (
    <>
      <SPNavbar title={true}>Forums</SPNavbar>
      <div className="w-[80%] m-auto pt-6 px-6">
        <Searchbar results={results} setResult={setResults} label={"New Post"} href={"/service-providers/forums/create"} tags={tags} data={posts}/>
        {results ? 
          user && (
            results.map((post) => {
            {return user.user_id === post.user_id ? (
                <Posts key={post.post_id} isSP={true} post={post} ownPost={true} setReloadPost={setReloadPost} />
              ) : (
                <Posts key={post.post_id} isSP={true} post={post}/>
              )}
            })
          )
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
