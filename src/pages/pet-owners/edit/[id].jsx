import Navbar from "@/components/organisms/Navbar";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { useToast } from "@chakra-ui/react"
import { GlobalContext } from "@/context";

function EditPetOwner() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [description, setDescription] = useState('')
  const [contact, setContact] = useState('')
  const [image, setImage] = useState(null)
  const [errors, setErrors] = useState();
  const router = useRouter()
  const toast = useToast()

  const id = router.query.id;

  const { token } = useContext(GlobalContext)

  const uploadToClient = (e) => {
    if (e.target.files && e.target.files[0]) {
      const i = e.target.files[0]

      setImage(i)
    }
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
      setErrors(data.errors)
      toast({
        title: 'Registration failed',
        description: 'Please try again',
        status: 'error',
        duration: 9000,
        isClosable: true
      })
      console.log(errors)
    } else {
      toast({
        title: 'Account created',
        description: 'We will redirect you to the main page',
        status: 'success',
        duration: 9000,
        isClosable: true
      })
      setTimeout(function () {router.push('/profile')}, 1000)
    }
  }

  return (
   <>
   <Navbar />
    <div className="w-[80%] h-full m-auto px-6 pt-10 flex flex-col gap-4">
        <div className="text-3xl font-bold">
          Edit Pet Owner Information
        </div>
        <div>
        <div className="grid grid-cols-2 gap-4 mt-[25px]">
          <div>
            <div className="flex flex-col">
              <span className="font-semibold">Name:</span>
              <input
                type="text"
                className="rounded-[10px] bg-transparent px-6 py-2 outline-none border border-solid ring-[#E1E1E1] border-[#E1E1E1] focus:border-[3px] focus:border-blue-500 focus:ring-blue-500 placeholder:text-xl"
                onChange={(e) => setName(e.target.value)}
              />
              {errors && errors.full_name && <p className="text-red-500">{errors.full_name.toString()}</p>}
            </div>
            <div className="flex flex-col mt-[25px]">
              <span className="font-semibold">Email:</span>
              <input
                type="email"
                className="rounded-[10px] bg-transparent px-6 py-2 outline-none border border-solid ring-[#E1E1E1] border-[#E1E1E1] focus:border-[3px] focus:border-blue-500 focus:ring-blue-500 placeholder:text-xl"
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors && errors.email && <p className="text-red-500">{errors.email.toString()}</p>}
            </div>
            <div className="flex flex-col mt-[25px]">
              <span className="font-semibold">Password:</span>
              <input
                type="password"
                className="rounded-[10px] bg-transparent px-6 py-2 outline-none border border-solid ring-[#E1E1E1] border-[#E1E1E1] focus:border-[3px] focus:border-blue-500 focus:ring-blue-500 placeholder:text-xl"
                onChange={(e) => setPassword(e.target.value)}
              />
              {errors && errors.password && <p className="text-red-500">{errors.password.toString()}</p>}
            </div>
            <div className="flex flex-col mt-[25px]">
              <span className="font-semibold">Confirm Password:</span>
              <input
                type="password"
                className="rounded-[10px] bg-transparent px-6 py-2 outline-none border border-solid ring-[#E1E1E1] border-[#E1E1E1] focus:border-[3px] focus:border-blue-500 focus:ring-blue-500 placeholder:text-xl"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              {password !== confirmPassword && <p className="text-red-500">Password does not match</p>}
            </div>
          </div>
          <div>
            <div className="flex flex-col">
              <span className="font-semibold">Description:</span>
              <textarea
                className="rounded-[10px] h-[132px] bg-transparent px-6 py-2 outline-none border border-solid ring-[#E1E1E1] border-[#E1E1E1] focus:border-[3px] focus:border-blue-500 focus:ring-blue-500 placeholder:text-xl"
                onChange={(e) => setDescription(e.target.value)}
              />
              {errors && errors.description && <p className="text-red-500">{errors.description.toString()}</p>}
            </div>
            <div className="flex flex-col mt-[25px]">
              <span className="font-semibold">Contact Number:</span>
              <input
                type="text"
                className="rounded-[10px] bg-transparent px-6 py-2 outline-none border border-solid ring-[#E1E1E1] border-[#E1E1E1] focus:border-[3px] focus:border-blue-500 focus:ring-blue-500 placeholder:text-xl"
                onChange={(e) => setContact(e.target.value)}
              />
              {errors && errors.contact_number && <p className="text-red-500">{errors.contact_number.toString()}</p>}
            </div>
            <div className="flex flex-col mt-[28px]">
              <label class="block text-sm font-medium dark:text-white" for="file_input">Upload Profile Image
                <input id="file_input" type="file" onChange={uploadToClient} class="block w-full text-sm text-gray-900 border border-solid  border-[#E1E1E1] rounded-lg cursor-pointer bg-transparent dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 file:rounded-xl file:p-2 file:bg-primary-500 hover:file:bg-primary-600 active:file:bg-primary-700" />
              </label>
              {errors && errors.image && <p className="text-red-500">{errors.image.toString()}</p>}
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
   </>
  )
}

export default checkAuth(EditPetOwner)
