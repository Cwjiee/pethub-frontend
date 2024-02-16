import BackButton from "@/components/atoms/BackButton";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { useToast } from '@chakra-ui/react'
import { GlobalContext } from "@/context";
import SPNavbar from "@/components/organisms/SPNavbar";
import SPFooter from "@/components/organisms/SPFooter";

function ServiceProviderCreateNewsPage() {
  const router = useRouter()
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [image, setImage] = useState(null)
  const [category, setCategory] = useState([])
  const [categories, setCategories] = useState([])
  const { token, userId } = useContext(GlobalContext)
  const toast = useToast()

  const url = process.env.NEXT_PUBLIC_API_URL

  useEffect(() => {
    (async () => {
      const response = await fetch(`${url}/categories/news`, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })
      const result = await response.json()
      setCategories(result.categories)
    })()

  }, [url, token])

  const uploadToClient = (e) => {
    if (e.target.files && e.target.files[0]) {
      const i = e.target.files[0]

      setImage(i)
    }
  }

  const handleChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
    setCategory(selectedOptions);
  }

  const submitForm = async (e) => {
    e.preventDefault()

    const categoryData = category.toString()

    const body = new FormData()
    body.append("news_title", title)
    body.append("news_description", description)
    body.append("user_id", userId)
    body.append("image", image)
    body.append("categories", categoryData)

    body.forEach((x) => console.log(x))

    const response = await fetch(`${url}/news`, {
      method: "POST",
      body: body,
      headers: {
        "Accept": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    })

    console.log(response)

    if (response.ok) {
      toast({
        title: 'News created',
        description: 'Please wait for admin to validate the news',
        status: 'success',
        duration: 3000,
        isClosable: true
      })
      setTimeout(function() {router.push('/news')}, 1000)
    } else (
      toast({
        title: 'Failed to create news',
        description: 'Please try again',
        status: 'error',
        duration: 3000,
        isClosable: true
      })
    )
  }

  return (
    <>
      <SPNavbar/>
      <div className="w-[80%] m-auto pt-6 px-6">
        <BackButton/>
      </div>
      <form 
        onSubmit={submitForm}
        className="w-[80%] sm:w-[40%] mt-12 m-auto py-11 px-16 bg-white shadow-lg rounded-lg"
      >
        <div className="flex flex-col justify-between gap-[25px]">
          <h2 className="mx-auto font-bold text-xl">Create Pet News</h2>
          <div>
            <div>News Title:</div>
            <input 
              type="text"
              name="title"
              onChange={(e) => setTitle(e.target.value)}
              className="w-full h-10 rounded-[10px] border-2 border-neutral-200 p-2 placeholder:text-md outline-neutral-500"

            /> 
          </div>
          <div>
            <div>News Description:</div>
            <textarea
              id="message"
              name="description"
              rows="4"
              class="block p-2.5 w-full h-52 text-gray-900 rounded-[10px] border border-neutral-200 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your content here..."
              onChange={(e) => setDescription(e.target.value)}
            >
            </textarea>
          </div> 
          <div>
            <label class="block text-sm font-medium dark:text-white" for="file_input">Upload Profile Image
              <input id="file_input" type="file" onChange={uploadToClient} class="block w-full text-sm text-gray-900 border border-solid border-[#E1E1E1] rounded-lg cursor-pointer bg-transparent dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 file:rounded-xl file:p-2 file:bg-primary-500 hover:file:bg-primary-600 active:file:bg-primary-700" />
            </label>
          </div>
          <div>
            <div>Category:</div>
            <label for="countries" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select an option</label>
            <select multiple={true} name="category" onChange={handleChange} id="category" class="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              {categories.map((cat) => {
                return <option key={cat.category_id} value={cat.category_id}>{cat.category_name}</option>
              })}
            </select>
          </div>
          <input 
            type="submit"
            value="Submit"
            className="w-full h-10 rounded-[10px] bg-primary-500 hover:bg-primary-600 active:bg-primary-700 text-white cursor-pointer"
          />
        </div>
      </form>
      <SPFooter/>
    </>
  )
}

ServiceProviderCreateNewsPage.getLayout = function getLayout(page) {
  return (
    <>
      <main>
        {page}
      </main>
    </>
  )
}

export default checkAuth(ServiceProviderCreateNewsPage)
