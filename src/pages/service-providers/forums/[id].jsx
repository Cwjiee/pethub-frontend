import BackButton from "@/components/atoms/BackButton"
import { useRouter } from "next/router"
import { useContext, useEffect, useState } from "react"
import { GlobalContext } from "@/context"
import { Avatar, useToast } from '@chakra-ui/react'
import DateTimeBlock from "@/components/atoms/DateTimeBlock"
import LoadSpinner from "@/components/atoms/LoadSpinner"
import CommentBlock from "@/components/molecules/CommentBlock"
import Image from "next/image"
import SendButton from "@/../public/svg/SendButton.svg"
import SPNavbar from "@/components/organisms/SPNavbar"
import SPFooter from "@/components/organisms/SPFooter"

function ServiceProviderSpecificPostPage() {
    const router = useRouter()
    const id = router.query.id
    const { token, userId } = useContext(GlobalContext)
    const [post, setPost] = useState()
    const [user, setUser] = useState()
    const [tokenReady, setTokenReady] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [description, setDescription] = useState('')
    const [reloadComment, setReloadComment] = useState(false)
    const toast = useToast()
  
    const url = process.env.NEXT_PUBLIC_API_URL
  
    useEffect(() => {
      const fetchPost = async () => {
        if (tokenReady) {
          const response = await fetch(`${url}/posts/${id}`, {
            headers: {
              "Authorization": `Bearer ${token}`,
              'Accept': 'application/json'
            }
          })
  
          const result = await response.json()
          setPost(result.post)
          console.log(result.post)
        }
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
          console.log(result.user)
        }
      }
  
      fetchPost()
      fetchUser()
  
      setIsLoading(false)
      setReloadComment(false)
    }, [tokenReady, id, reloadComment])
  
    useEffect(() => {
      if (token && userId && id) setTokenReady(true)
    }, [token, id, userId])
  
    const handleSubmit = async () => {
      console.log(userId)
      const response = await fetch(`${url}/comments`, {
        method: "POST",
        body: JSON.stringify({
          user_id: userId,
          post_id: id,
          comment_description: description,
        }),
        headers: {
          "Content-type": "application/json",
          "Authorization": `Bearer ${token}`,
        }
      })
  
      const data = await response.json()
      console.log(data.message)
  
      setDescription("")
      if (!response.ok) {
        toast({
          title: 'Failed to create comment',
          description: 'Please try again',
          status: 'error',
          duration: 3000,
          isClosable: true
        })
      } else {
        toast({
          title: 'Success',
          description: 'Comment created successfully',
          status: 'success',
          duration: 3000,
          isClosable: true
        })
  
        setReloadComment(true)
      }
    }
  
    return !isLoading ? (
      <>
        <SPNavbar/>
            <div className="w-[70%] m-auto pt-6 px-6">
            <BackButton/>
            </div>
            {post && 
            <div className="bg-white w-[70%] mx-auto py-4 px-12 mt-7 shadow-lg rounded-[10px]">
                <div className="title text-lg font-bold mt-3 spacing tracking-wide">
                {post.post_title}
                </div>
                <div className="flex justify-left gap-x-1">
                {post.categories.map((category) => {
                    return (
                    <div key={category.category_id} className="flex justify-center items-center bg-white rounded-[40px] h-6 px-5 w-auto border border-[#D3D3D3]">
                        <span className="font-medium text-sm spacing">{category.category_name}</span>
                    </div>
                    )}
                )}
                </div>
                <div>
                <div className="flex flex-row my-5 gap-2">
                    <div className="flex justify-center items-center"><Avatar src={post.user.image} colorScheme="blue" size="sm" name={post.user.full_name}/></div>
                    <div className="flex flex-col">
                    <div className="flex flex-row justify-left items-center gap-2">
                        <div>{post.user.full_name}</div>
                        <DateTimeBlock datetimeString={post.created_at}/>
                    </div>
                    <div className="text-[#4E4E4E] text-[14px]">{post.post_description}</div>
                    </div>
                </div>
                </div>
    
                <div className="mt-10">
                <div className="text-[16px] font-bold">Comments</div>
                <div className="mt-2 mb-8 flex flex-col gap-y-1">
                    {post.comments.map((comment) => {
                    return <CommentBlock key={comment.comment_id} id={comment.comment_id} isSP={true} name={comment.user.full_name} date={comment.updated_at} desc={comment.comment_description} setReloadComment={setReloadComment}/>
                    })}
                </div>
                <div>
                    {user && (
                    <div className="flex flex-row my-5 gap-2">
                        <div className="flex justify-center items-center"><Avatar src={user.image} colorScheme="blue" size="sm" name={user.full_name}/></div>
                        <input className="p px-4 border border-[#E0E0E0] rounded-[5px] w-full" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Add a comment..." />
                        <button onClick={handleSubmit} className="p-[10px] rounded-[5px] bg-primary-500 hover:bg-primary-600 active:bg-primary-700"><Image src={SendButton} width={25} height={'auto'} alt="send-button"/></button>
                    </div>
                    )}
                </div>
                </div>
            </div>
            }
        <SPFooter/>
      </>
    ) : (
      <LoadSpinner />
    )
}

ServiceProviderSpecificPostPage.getLayout = function getLayout(page) {
  return (
    <>
      <main>
        {page}
      </main>
    </>
  )
}

export default checkAuth(ServiceProviderSpecificPostPage)
