import Navbar from "@/components/organisms/Navbar";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import BackButton from "../../../public/svg/BackButton.svg"

export default function CreateNews() {
        const router = useRouter()
        const [name, setName] = useState("")
        const [description, setDescription] = useState("")
        const [image, setImage] = useState("")
        const [category, setCategory] = useState("")

        const handleBack = () => {
          router.push("/news") 
        }

	return (
		<>
                  <Navbar title={false}>Pet News</Navbar>
                    <Link href="/news"></Link>
                    <div className="w-[40%] mt-12 m-auto py-11 px-16 bg-white">
                      <div className="flex flex-row gap-1 items-center hover:cursor-pointer" onClick={handleBack}>
                        <Image className="w-6 h-6" src={BackButton} alt="back-button"/>
                        <span className="text-base text-secondary-500 font-semibold">Back</span>
                      </div>
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
                            onChange={(e) => setImage(e.target.value)}
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
