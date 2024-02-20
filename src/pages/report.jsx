import BackButton from "@/components/atoms/BackButton"
import Navbar from "@/components/organisms/Navbar"
import { useState, useContext } from "react"
import { useToast } from "@chakra-ui/react"
import { GlobalContext } from "@/context"
import checkAuth from "@/utils/checkAuth"
import Footer from "@/components/organisms/Footer"

function Report() {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const toast = useToast()
  const { token } = useContext(GlobalContext)

  const handleSubmit = async (e) => {
    e.preventDefault()

    const url = process.env.NEXT_PUBLIC_API_URL
    console.log(token)

    try {
      const response = await fetch(`${url}/report`, {
        method: "POST",
        body: JSON.stringify({
          report_title: title,
          report_description: description,
        }),
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
      });

      const result = await response.json()
      console.log(result.message)

      setTitle("")
      setDescription("")

      if(!response.ok) {
        toast({
          title: 'Failed to create report',
          description: 'Please try again',
          status: 'error',
          duration: 3000,
          isClosable: true
        })
      } else {
        toast({
          title: 'Success',
          description: 'Report created successfully',
          status: 'success',
          duration: 3000,
          isClosable: true
        })
      }

    } catch(err) {
      console.log(err)
    }
  }

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
                type="text"
                className="w-full h-10 rounded-[10px] text-gray-900 px-4 p-2 block border border-neutral-200 focus:ring-blue-500 focus:border-blue-500"
              /> 
            </div>
            <div>
              <div>Report Description:</div>
              <textarea
                id="message"
                rows="4"
                class="block p-2.5 w-full h-52 text-gray-900 rounded-[10px] border border-neutral-200 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your content here..."
                onChange={(e) => setDescription(e.target.value)}
              >
              </textarea>
                
            </div>
            <button
              className="w-full h-10 rounded-[10px] bg-primary-500 hover:bg-primary-600 active:bg-primary-700 text-white cursor-pointer flex justify-center items-center"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default checkAuth(Report)
