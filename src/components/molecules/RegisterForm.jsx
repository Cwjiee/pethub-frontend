import { GlobalContext } from "@/context"
import { useToast, Input, InputGroup, InputRightElement, Button, Textarea } from "@chakra-ui/react"
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
  const [show, setShow] = useState(false)
  const [showConf, setShowConf] = useState(false)
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

  const clearRespectiveField = (err) => {
    if (err === 'password') {
      setPassword("")
      setConfirmPassword("")
      return
    }
  }

  const submitForm = async (e) => {
    e.preventDefault

    const body = new FormData()
    body.append("full_name", name)
    body.append("email", email)
    body.append("password", password)
    body.append("password_confirmation", confirmPassword)
    body.append("permission_level", 1)
    body.append("description", description)
    body.append("contact_number", contact)
    body.append("image", image)

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
        if (Object.keys[data.erros]) {
          Object.keys(data.errors).forEach(key => {
            const errorMessage = data.errors[key]
            clearRespectiveField(key)
            toastMessage(errorMessage)
          })
        } else if (data.message) {
          clearRespectiveField("email")
          toastMessage(data.message)
        } else {
          toastMessage("Server Error")
        }
      } else {
        let getToken = data.token
        let getUserId = data.user.user_id
        document.cookie = `roles=${data.user.permission_level}`
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
              <Input value={name} type="text" onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="flex flex-col mt-[25px]">
              <span className="font-semibold">Email:</span>
              <Input placeholder='tharshenUWU@gmail.com' value={email} type="email" onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="flex flex-col mt-[25px]">
              <span className="font-semibold">Password:</span>
              <InputGroup>
                <Input
                  pr='4.5rem'
                  type={show ? 'text' : 'password'}
                  placeholder='Enter password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <InputRightElement width='4.5rem'>
                  <Button h='1.75rem' size='sm' onClick={() => setShow(!show)}>
                    {show ? 'Hide' : 'Show'}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </div>
            <div className="flex flex-col mt-[25px]">
              <span className="font-semibold">Confirm Password:</span>
              <InputGroup>
                <Input
                  pr='4.5rem'
                  type={showConf ? 'text' : 'password'}
                  placeholder='Enter confirmation password'
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <InputRightElement width='4.5rem'>
                  <Button h='1.75rem' size='sm' onClick={() => setShowConf(!showConf)}>
                    {showConf ? 'Hide' : 'Show'}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </div>
          </div>
          <div>
            <div className="flex flex-col">
              <span className="font-semibold">Description:</span>
              <Textarea value={description} onChange={(e) => setDescription(e.target.value)} height={130} />
            </div>
            <div className="flex flex-col mt-[25px]">
              <span className="font-semibold">Contact Number:</span>
              <Input placeholder='0184076922' value={contact} type="text" onChange={(e) => setContact(e.target.value)} />
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
