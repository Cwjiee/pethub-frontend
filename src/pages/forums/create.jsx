import Navbar from "@/components/organisms/Navbar"
import BackButton from "@/components/atoms/BackButton"
import { useRouter } from "next/router"
import { useState, useContext, useEffect } from "react"
import { GlobalContext } from "@/context"
import { useToast } from "@chakra-ui/react"
import LoadSpinner from "@/components/atoms/LoadSpinner"

function CreateForum() {
  const router = useRouter()
  const toast = useToast()
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const { userId, token } = useContext(GlobalContext)
  const [category, setCategory] = useState([])
  const [categories, setCategories] = useState([])
  const [tokenReady, setTokenReady] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const url = process.env.NEXT_PUBLIC_API_URL

  useEffect(() => {
    (async () => {
      if (tokenReady) {
        try {
          const response = await fetch(`${url}/categories/post`, {
            headers: {
              "Authorization": `Bearer ${token}`,
              'Content-type': "application/json",
            }
          })
          const result = await response.json()
          setCategories(result.categories)
          setIsLoading(false)
        } catch (error) {
          console.error('Error : ', error)
        }
      }
    })()

  }, [tokenReady])

  useEffect(() => {
    if (token) setTokenReady(true)
  }, [token])

  const handleChange = (e) => {
      const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
      setCategory(selectedOptions);
  }

  const submitForm = async () => {
    console.log(userId)
    const response = await fetch(`${url}/posts`, {
      method: "POST",
      body: JSON.stringify({
        user_id: userId,
        post_title: title,
        post_description: description,
        categories: category
      }),
      headers: {
        "Content-type": "application/json",
        "Authorization": `Bearer ${token}`,
        "Accept": "application/json"
      }
    })

    const data = await response.json()
    console.log(data.message)

    if (!response.ok) {
      setTitle("")
      setDescription("")
      setCategory([])
      toast({
        title: `${data.message}`,
        description: 'Please try again',
        status: 'error',
        duration: 3000,
        isClosable: true
      })
    } else {
      toast({
        title: `${data.message}`,
        description: 'Successfully created post! Redirecting you back...',
        status: 'success',
        duration: 3000,
        isClosable: true
      })
      router.push('./')
    }
  }

  return !isLoading ? (
    <>
      <Navbar title={false}>Forums</Navbar>
      <div className="w-[80%] m-auto pt-6 px-6">
        <BackButton/>
      </div>
      <div className="w-[80%] sm:w-[40%] mt-12 m-auto py-11 px-16 bg-white shadow-lg rounded-lg">
        <div className="flex flex-col justify-between gap-[25px]">
          <h2 className="mx-auto font-bold text-xl">Create Post</h2>
          <div>
            <div>Title:</div>
            <input 
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full h-10 rounded-[10px] border-2 border-neutral-200 px-4 placeholder:text-md outline-neutral-500"
            /> 
          </div>
          <div>
          <div>Description:</div>
            <textarea
              value={description}
              id="message"
              rows="4"
              class="block p-2.5 w-full h-52 text-gray-900 rounded-[10px] border border-neutral-200 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your content here..."
              onChange={(e) => setDescription(e.target.value)}
            >
            </textarea>
          </div> 
          <div>
            <div>Category:</div>
            <label for="countries" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select an option</label>
            <select multiple onChange={handleChange} value={category} id="countries" class="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              {categories.map((cat) => {
                return <option key={cat.category_id} value={cat.category_id}>{cat.category_name}</option>
              })}
            </select>
          </div>
          <input 
            type="submit"
            value="submit"
            className="w-full h-10 rounded-[10px] bg-primary-500 hover:bg-primary-600 active:bg-primary-700 text-white cursor-pointer"
            onClick={submitForm}
          />
        </div>
      </div>
    </>
  ) : (
    <LoadSpinner />
  )
}

export default checkAuth(CreateForum)
