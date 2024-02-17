import Navbar from "@/components/organisms/Navbar";
import Searchbar from "@/components/molecules/SearchbarWithBtn";
import Posts from "@/components/molecules/Posts";
import { useContext, useEffect, useState } from "react";
import Image from "next/image";
import Empty from "../../../public/svg/EmptyNews.svg"
import LoadSpinner from "@/components/atoms/LoadSpinner";
import { GlobalContext } from "@/context";

export default function Forum() {
  const [posts, setPosts] = useState([])
  const [results, setResults] = useState([])
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState()
  const { token } = useContext(GlobalContext)
  const [tokenReady, setTokenReady] = useState(false)
  const [reloadPost, setReloadPost] = useState(false)

  const url = process.env.NEXT_PUBLIC_API_URL

  const tags = [
    "Dogs",
    "Cats",
    "Hamsters",
    "Tips",
    "Healthcare",
    "Food",
    "Grooming",
  ];

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
      <Navbar title={true}>Forums</Navbar>
      <div className="w-[80%] m-auto pt-6 px-6">
        <Searchbar setResult={setResults} label={"New Post"} href={"/forums/create"} results={results} data={posts} tags={tags}/>
        {results ? 
          user && (
            results.map((post) => {
            {return user.user_id === post.user_id ? (
                <Posts key={post.post_id} post={post} ownPost={true} setReloadPost={setReloadPost} />
              ) : (
                <Posts key={post.post_id} post={post}/>
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
    </>
  ) : (
    <LoadSpinner />
  )
}
