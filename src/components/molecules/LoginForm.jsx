import { GlobalContext } from "@/context";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import Link from "next/link";
import { useToast, Input, InputGroup, InputRightElement, Button } from "@chakra-ui/react";

export default function RegisterForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [show, setShow] = useState(false)
  const router = useRouter()
  const toast = useToast()
  const url = process.env.NEXT_PUBLIC_API_URL

  const { setToken, setUserId } = useContext(GlobalContext)

  const submitForm = async (e) => {
    e.preventDefault()

    if (url) {
      const response = await fetch(`${url}/login`, {
        method: "POST",
        body: JSON.stringify({
          email: email,
          password: password,
        }),
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
      });

      const data = await response.json()
      if (data.user?.user_status === 'pending') {
        router.push('/service-providers/status')
        return
      }    

      if (!response.ok) {
        setEmail("")
        setPassword("")
        toast({
          title: 'Login failed',
          description: 'Please try again',
          status: 'error',
          duration: 3000,
          isClosable: true
        })
      } else {
        let getToken = data.token
        let getUserId = data.user.user_id
        document.cookie = `roles=${data.user.permission_level}`
        setToken(getToken)
        setUserId(getUserId)
        console.log(data.token)
        console.log(data.user.user_id)
        toast({
          title: 'Successfully logged in',
          description: 'We will redirect you to the main page',
          status: 'success',
          duration: 3000,
          isClosable: true
        })

        if (data.user.permission_level === '1') {
          setTimeout(function () {
            router.push('/healthcare-facility')
          }, 1000)
        } else if (data.user.permission_level === '2') {
          setTimeout(function () {
            router.push('/service-providers/dashboard')
          }, 1000)
        } else if (data.user.permission_level === '3') {
          setTimeout(function () {
            router.push('/admin')
          }, 1000)
        }
      }
    }
  }

  return (
    <div className="mt-12">
      <div className="flex flex-col mt-[25px]">
        <span className="font-semibold">Email:</span>
        <Input placeholder='tharshenUWU@gmail.com' value={email} type="text" onChange={(e) => setEmail(e.target.value)} />
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
      <div className="mt-[40px]">
        Don&apos;t have an account?{" "}
        <Link href="/account" className="underline font-semibold text-primary-500 hover:text-primary-600 active:text-primary-700">
          Register
        </Link>{" "}
        here!
      </div>
      <button
        className="rounded-[10px] text-white h-12 flex justify-center items-center mt-[50px] hover:cursor-pointer w-full bg-primary-500 hover:bg-primary-600 active:bg-primary-700"
        style={{
          boxShadow:
            "0px 4px 6px -2px rgba(0, 0, 0, 0.05), 0px 10px 15px -3px rgba(0, 0, 0, 0.10)",
        }}
        onClick={submitForm}
      >
        Submit
      </button>
    </div>
  );
}
