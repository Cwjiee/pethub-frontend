import Navbar from "@/components/organisms/Navbar";
import BackButton from "@/components/atoms/BackButton";
import { useRouter } from "next/router";
import { useState } from "react";

export default function CreateNews() {
        const route = "/news"
        const router = useRouter()
        const [name, setName] = useState("")
        const [description, setDescription] = useState("")
        const [image, setImage] = useState("")
        const [category, setCategory] = useState("")

	return (
              <>
                <Navbar title={false}>Pet News</Navbar>
                  <div className="w-[40%] mt-12 m-auto py-11 px-16 bg-white">
                    <BackButton route={route} />     
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
