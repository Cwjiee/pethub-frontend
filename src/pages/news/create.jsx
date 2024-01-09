import Navbar from "@/components/organisms/Navbar";
import BackButton from "@/components/atoms/BackButton";
import { useRouter } from "next/router";
import { useState } from "react";

export default function CreateNews() {
  const router = useRouter()
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [image, setImage] = useState("")
  const [category, setCategory] = useState("")

  const uploadToClient = (e) => {
    if (e.target.files && e.target.files[0]) {
      const i = e.target.files[0]

      setImage(i)
    }
  }

  const submitForm = async () => {
    e.preventDefault()
    const url = process.env.NEXT_PUBLIC_API_URL

    const body = new FormData()
    body.append("news_title", name)
    body.append("news_description", description)
    body.append("image", image)

    const response = await fetch(`${url}/register`, {
      method: "POST",
      body: body,
      headers: {
        "Accept": "application/json",
      },
    });

    const data = await response.json()
    if (!response.ok) {
      setErrors(data.errors)
      toast({
        title: 'Error',
        description: 'Failed to create news',
        status: 'error',
        duration: 9000,
        isClosable: true
      })
      console.log(errors)
    } else {
      toast({
        title: 'News created',
        description: 'We will redirect you back to news page',
        status: 'success',
        duration: 9000,
        isClosable: true
      })
      setTimeout(function () {router.push('/news')}, 1000)
    }
  }

  return (
    <>
      <Navbar title={false}>Pet News</Navbar>
        <div className="w-[80%] m-auto pt-6 px-6">
          <BackButton/>
        </div>
        <div className="w-[80%] sm:w-[40%] mt-12 m-auto py-11 px-16 bg-white">
          <div className="flex flex-col justify-between gap-[25px]">
            <h2 className="mx-auto font-bold text-xl">Create Pet News</h2>
            <div>
              <div>News Name:</div>
              <input 
              onChange={(e) => setName(e.target.value)}
              className="w-full h-10 rounded-[10px] border-2 border-neutral-200 px-8 p-2 placeholder:text-md outline-neutral-500"
              /> 
            </div>
            <div>
              <div>News Description:</div>
              <input
                onChange={(e) => setDescription(e.target.value)}
                className="w-full h-52 rounded-[10px] border-2 border-neutral-200 px-8 p-2 placeholder:text-md outline-neutral-500"
              />
            </div> 
            <div>
              <div>Upload Image:</div>
              <input
                onChange={uploadToClient}
                className="w-full h-10 rounded-[10px] border-2 border-neutral-200 px-8 p-2 placeholder:text-md outline-neutral-500"
              />
            </div>
            <div>
              <div>Category:</div>
              <input
                onChange={(e) => setCategory(e.target.value)}
                className="w-full h-10 rounded-[10px] border-2 border-neutral-200 px-8 p-2 placeholder:text-md outline-neutral-500"
              />
            </div>
            <input 
              type="submit"
              className="w-full h-10 rounded-[10px] bg-primary-500 hover:bg-primary-600 active:bg-primary-700 text-white cursor-pointer"
            />
        </div>
      </div>
    </>
  )
}
