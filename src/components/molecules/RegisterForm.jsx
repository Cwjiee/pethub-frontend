import { GlobalContext } from "@/context"
import { useToast } from "@chakra-ui/react"
import { useRouter } from "next/router"
import { useContext, useState } from "react"

export default function PetOwnerRegisterForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [description, setDescription] = useState('')
  const [contact, setContact] = useState('')
  const [image, setImage] = useState(null)
  const router = useRouter()
  const toast = useToast()

  const { setToken, setUserId } = useContext(GlobalContext)
  const url = process.env.NEXT_PUBLIC_API_URL

  const uploadToClient = (e) => {
    if (e.target.files && e.target.files[0]) {
      const i = e.target.files[0]

      setImage(i)
    }
  }

  const toastMessage = (message) => {
      toast({
        title: message,
        description: 'Please try again',
        status: 'error',
        duration: 4000,
        isClosable: true
      })
  }

  const clearField = () => {
    setName("")
    setEmail("")
    setPassword("")
    setConfirmPassword("")
    setDescription("")
    setContact("")
    setImage(null)
  }

  const submitForm = async (e) => {
    e.preventDefault

    const body = new FormData()
    body.append("full_name", name)
    body.append("email", email)
    body.append("password", password)
    body.append("permission_level", 1)
    body.append("description", description)
    body.append("contact_number", contact)
    body.append("image", image)

    if (password !== confirmPassword || password === '' && confirmPassword === '') {
      setPassword("")
      setConfirmPassword("")
      toastMessage("password does not match the confirmation")
      return
    }

    if (contact.length != 11 && contact.length != 12) {
      setContact("")
      toastMessage("invalid contact number length")
      return
    }

    if (contact[0] !== '0') {
      setContact("")
      toastMessage("contact number has to start with 0")
      return
    }

    if (url) {
      const response = await fetch(`${url}/register`, {
        method: "POST",
        body: body,
        headers: {
          "Accept": "application/json",
        },
      });

      const data = await response.json()

      console.log(data.message);

      if (!response.ok) {
        setName("")
        setEmail("")
        setPassword("")
        setConfirmPassword("")
        setDescription("")
        setContact("")
        Object.keys(data.errors).forEach(key => {
          const errorMessage = data.errors[key]
          toastMessage(errorMessage)
        })
      } else {
        let getToken = data.token
        let getUserId = data.user.user_id
        document.cookie = `token=${data.token}`
        setToken(getToken)
        setUserId(getUserId)
        toast({
          title: data.message,
          description: 'We will redirect you to the main page',
          status: 'success',
          duration: 3000,
          isClosable: true
        })
        setTimeout(function () {router.push('/healthcare-facility')}, 1000)
      }
    }
  }
 
  return (
    <>
      <div>
        <div className="grid grid-cols-2 gap-4 mt-[25px]">
          <div>
            <div className="flex flex-col">
              <span className="font-semibold">Name:</span>
              <input
                type="text"
                className="rounded-[10px] bg-transparent px-6 py-2 outline-none border border-solid border-[#E1E1E1] focus:border-[3px] focus:border-blue-500 focus:ring-blue-500 placeholder:text-xl"
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
            </div>
            <div className="flex flex-col mt-[25px]">
              <span className="font-semibold">Email:</span>
              <input
                type="email"
                className="rounded-[10px] bg-transparent px-6 py-2 outline-none border border-solid border-[#E1E1E1] focus:border-[3px] focus:border-blue-500 focus:ring-blue-500 placeholder:text-xl"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </div>
            <div className="flex flex-col mt-[25px]">
              <span className="font-semibold">Password:</span>
              <input
                type="password"
                className="rounded-[10px] bg-transparent px-6 py-2 outline-none border border-solid border-[#E1E1E1] focus:border-[3px] focus:border-blue-500 focus:ring-blue-500 placeholder:text-xl"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </div>
            <div className="flex flex-col mt-[25px]">
              <span className="font-semibold">Confirm Password:</span>
              <input
                type="password"
                className="rounded-[10px] bg-transparent px-6 py-2 outline-none border border-solid border-[#E1E1E1] focus:border-[3px] focus:border-blue-500 focus:ring-blue-500 placeholder:text-xl"
                onChange={(e) => setConfirmPassword(e.target.value)}
                value={confirmPassword}
              />
            </div>
          </div>
          <div>
            <div className="flex flex-col">
              <span className="font-semibold">Description:</span>
              <textarea
                className="rounded-[10px] h-[132px] bg-transparent px-6 py-2 outline-none border border-solid border-[#E1E1E1] focus:border-[3px] focus:border-blue-500 focus:ring-blue-500 placeholder:text-xl"
                onChange={(e) => setDescription(e.target.value)}
                value={description}
              />
            </div>
            <div className="flex flex-col mt-[25px]">
              <span className="font-semibold">Contact Number:</span>
              <input
                type="text"
                className="rounded-[10px] bg-transparent px-6 py-2 outline-none border border-solid border-[#E1E1E1] focus:border-[3px] focus:border-blue-500 focus:ring-blue-500 placeholder:text-md"
                placeholder="010-6673148"
                onChange={(e) => setContact(e.target.value)}
                value={contact}
              />
            </div>
            <div className="flex flex-col mt-[28px]">
              <label class="block text-sm font-medium dark:text-white" for="file_input">Upload Profile Image
                <input id="file_input" type="file" onChange={uploadToClient} class="block w-full text-sm text-gray-900 border border-solid border-[#E1E1E1] rounded-lg cursor-pointer bg-transparent dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 file:rounded-xl file:p-2 file:bg-primary-500 hover:file:bg-primary-600 active:file:bg-primary-700" />
              </label>
            </div>
          </div>
        </div>
      </div>
      <div>
        <button
          className="mx-auto rounded-[10px] text-white flex justify-center items-center mt-[50px] hover:cursor-pointer w-1/6 px-6 py-3 bg-primary-500 hover:bg-primary-600 active:bg-primary-700"
          style={{
            boxShadow:
              "0px 4px 6px -2px rgba(0, 0, 0, 0.05), 0px 10px 15px -3px rgba(0, 0, 0, 0.10)",
          }}
          onClick={submitForm}
        >
          Submit
        </button>
      </div>
    </>
  )
}
