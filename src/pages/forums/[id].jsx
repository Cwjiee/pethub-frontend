import Navbar from "@/components/organisms/Navbar"
import BackButton from "@/components/atoms/BackButton"
import { useRouter } from "next/router"
import { useContext, useEffect, useState } from "react"
import { GlobalContext } from "@/context"
import { Avatar } from '@chakra-ui/react'
import DateTimeBlock from "@/components/atoms/DateTimeBlock"

export default function ForumsPage() {
  const router = useRouter()
  const id = router.query.id
  const { token, userId } = useContext(GlobalContext)
  const [post, setPost] = useState()

  const url = process.env.NEXT_PUBLIC_API_URL

  useEffect(() => {
    (async () => {
      const response = await fetch(`${url}/posts/${id}`, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })

      const result = await response.json()
      setPost(result.post)
    })()
  }, [id, url, token])

  return (
    <>
      <Navbar title={false}>Forums</Navbar>
      <div className="w-[80%] m-auto pt-6 px-6">
        <BackButton/>
      </div>
      {post && 
        <div className="bg-white w-[80%] mx-auto pt-10 px-12">
          <div className="title text-lg font-bold mt-3 spacing tracking-wide">
            {post.post_title}
          </div>
          <div className="flex justify-between">
            <div className="flex justify-center items-center bg-white rounded-[40px] h-6 px-5 w-auto border border-[#D3D3D3]">
              {post.categories.map((category) => {
                return <span key={category.category_id} className="font-medium text-sm spacing">{category.category_name}</span>
              })}
            </div>
          </div>
          <div>
            <div className="flex flex-row my-5 gap-2">
              <div className="flex justify-center items-center"><Avatar colorScheme="blue" size="sm" name=''/></div>
              <div className="flex flex-col">
                <div className="flex flex-row justify-center items-center gap-2">
                  <div>john</div>
                  <DateTimeBlock datetimeString={post.created_at}/>
                </div>
                <div className="text-[#4E4E4E] text-[12px]">{post.post_description}</div>
              </div>
            </div>
          </div>

          <div className="mt-10">
            <div className="text-[16px] font-bold">Comments</div>
          </div>
        </div>
      }
    </>
  )
}
