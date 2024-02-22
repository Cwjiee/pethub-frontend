import Navbar from "@/components/organisms/Navbar";
import { useRouter } from "next/router";
import { useContext, useState, useEffect } from "react";
import { useToast, Input, InputGroup, InputRightElement, Button, Textarea } from "@chakra-ui/react"
import { GlobalContext } from "@/context";
import checkAuth from "@/utils/checkAuth";
import Footer from "@/components/organisms/Footer";
import BackButton from "@/components/atoms/BackButton";

function EditPetOwner() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [description, setDescription] = useState('')
  const [contact, setContact] = useState('')
  const [tokenReady, setTokenReady] = useState(false)
  const [show, setShow] = useState(false)
  const [showConf, setShowConf] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const toast = useToast()

  const id = router.query.id;

  const { token } = useContext(GlobalContext)

  useEffect(() => {
    (async () => {
      if (tokenReady) {
        const response = await fetch(`http://localhost/api/v1/profile`, {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Accept": "application/json"
          }
        })
        const result = await response.json()
        const user = result.user

        console.log(result.user)
        setName(user.full_name)
        setEmail(user.email)
        setPassword(user.password)
        setConfirmPassword(user.password)
        setDescription(user.description)
        setContact(user.contact_number)
        setIsLoading(false)
      }
    })()
  }, [tokenReady, id])

  useEffect(() => {
    if (token && id) setTokenReady(true)
  }, [token, id])

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

    const url = process.env.NEXT_PUBLIC_API_URL

    const response = await fetch(`${url}/petowner/edit/${id}`, {
      method: "POST",
      body: body,
      headers: {
        "Accept": "application/json",
        "Authorization": "Bearer " + token
      },
    });

    const data = await response.json()

    if (!response.ok) {
      Object.keys(data.errors).forEach(key => {
        const errorMessage = data.errors[key]
        clearRespectiveField(key)
        toastMessage(errorMessage)
      })
    } else {
      toast({
        title: 'Account information edited',
        description: 'We will redirect you back to profile page',
        status: 'success',
        duration: 4000,
        isClosable: true
      })
      setTimeout(function () {router.push('/profile')}, 1000)
    }
  }

  return (
    <>
      <div className="w-full bg-white">
        <Navbar />
        <div className="w-[80%] mx-auto my-5">
          <BackButton />
        </div>
        <div className="w-[80%] h-full m-auto px-6 pt-10 flex flex-col gap-4">
          <div className="text-3xl font-bold">
            Edit Pet Owner Information
          </div>
          <div>
            <div className="grid grid-cols-2 gap-4 mt-[25px]">
              <div>
                <div className="flex flex-col">
                  <span className="font-semibold">Name:</span>
                  <Input value={name} type="text" onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="flex flex-col mt-[25px]">
                  <span className="font-semibold">Email:</span>
                  <Input value={email} type="email" onChange={(e) => setEmail(e.target.value)} />
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
                  <Input value={contact} type="text" onChange={(e) => setContact(e.target.value)} />
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
        </div>
        <Footer />
      </div>
    </>
  )
}

export default checkAuth(EditPetOwner)
