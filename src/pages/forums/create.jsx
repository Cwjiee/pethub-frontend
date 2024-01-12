import Navbar from "@/components/organisms/Navbar"
import BackButton from "@/components/atoms/BackButton"
import { useRouter } from "next/router"
import { useState, useContext } from "react"
import { GlobalContext } from "@/context"

export default function CreateForum() {
  const router = useRouter()
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const { userId, token } = useContext(GlobalContext)

  const url = process.env.NEXT_PUBLIC_API_URL

  const submitForm = async () => {
    console.log(userId)
    const response = await fetch(`${url}/posts`, {
      method: "POST",
      body: JSON.stringify({
        user_id: userId,
        post_title: title,
        post_description: description,
      }),
      headers: {
        "Content-type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    })

    const data = response.data
    console.log(data.message)
  }

  return (
    <>
      <Navbar title={false}>Pet News</Navbar>
      <div className="w-[80%] m-auto pt-6 px-6">
        <BackButton/>
      </div>
      <div className="w-[80%] sm:w-[40%] mt-12 m-auto py-11 px-16 bg-white">
        <div className="flex flex-col justify-between gap-[25px]">
          <h2 className="mx-auto font-bold text-xl">Create Post</h2>
          <div>
            <div>Title:</div>
            <input 
              type="text"
              onChange={(e) => setTitle(e.target.value)}
              className="w-full h-10 rounded-[10px] border-2 border-neutral-200 px-4 placeholder:text-md outline-neutral-500"
            /> 
          </div>
          <div>
          <div>Description:</div>
            <textarea
              id="message"
              rows="4"
              class="block p-2.5 w-full h-52 text-gray-900 rounded-[10px] border border-neutral-200 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your content here..."
              onChange={(e) => setDescription(e.target.value)}
            >
            </textarea>
          </div> 
          <input 
            type="submit"
            className="w-full h-10 rounded-[10px] bg-primary-500 hover:bg-primary-600 active:bg-primary-700 text-white cursor-pointer"
            onClick={submitForm}
          />
        </div>
      </div>
    </>
  )
}
