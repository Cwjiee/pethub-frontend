import BackButton from "@/components/atoms/BackButton"
import Navbar from "@/components/organisms/Navbar"
import { useState } from "react"

export default function CreateReport() {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")

  return (
    <>
      <Navbar></Navbar> 
      <div className="w-[80%] m-auto pt-6 px-6">
        <BackButton/>
        <div className="w-[80%] sm:w-[50%] mt-8 m-auto py-11 px-16 bg-white">
          <div className="flex flex-col justify-between gap-[25px]">
            <div className="font-bold leading-normal text-center text-[20px]">Send a Report!</div>
            <div className="font-normal leading-normal text-[16px] text-center">Inform us of any unpleasant acts or bugs that are happening in our website!</div>
            <div>
              <div>Report Title:</div>
              <input 
                onChange={(e) => setTitle(e.target.value)}
                className="w-full h-10 rounded-[10px] border-2 border-neutral-200 px-8 p-2 placeholder:text-md outline-neutral-500"
              /> 
            </div>
            <div>
              <div>Report Description:</div>
              <input 
                onChange={(e) => setDescription(e.target.value)}
                className="w-full rounded-[10px] border-2 border-neutral-200 px-8 p-2 placeholder:text-md outline-neutral-500 h-52"
              /> 
            </div>
            <input 
              type="submit"
              className="w-full h-10 rounded-[10px] bg-primary-500 hover:bg-primary-600 active:bg-primary-700 text-white cursor-pointer"
            />
          </div>
        </div>
      </div>
    </>
  )
}
