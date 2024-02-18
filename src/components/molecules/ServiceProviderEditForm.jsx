import { GlobalContext } from "@/context"
import { useToast } from "@chakra-ui/react"
import { useRouter } from "next/router"
import { useContext, useState } from "react"

export default function ServiceProviderEditForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [contact, setContact] = useState('')
  const [deposit, setDeposit] = useState('')
  const [image, setImage] = useState(null)
  const [qrcode, setQrcode] = useState(null)
  const [description, setDescription] = useState('')
  const [startOperation, setStartOperaton] = useState(null)
  const [endOperation, setEndOperaton] = useState(null)
  const [serviceType, setServiceType] = useState('')
  const [bankName, setBankName] = useState('')
  const [accNumber, setAccNumber] = useState('')
  const [accName, setAccName] = useState('')
  const [errors, setErrors] = useState('');
  const router = useRouter()
  const toast = useToast()
  const url = process.env.NEXT_PUBLIC_API_URL
  const {token, userId} = useContext(GlobalContext)

  const uploadToClient = (e) => {
    if (e.target.files && e.target.files[0]) {
      const i = e.target.files[0]

      setImage(i)
    }
  }

  const uploadQr = (e) => {
    if (e.target.files && e.target.files[0]) {
      const i = e.target.files[0]

      setQrcode(i)
    }
  }

  const toastMessage = (message) => {
      toast({
        title: message,
        description: 'Please try again',
        status: 'error',
        duration: 3000,
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
    setDeposit("")
    setStartOperaton("")
    setEndOperaton("")
    setServiceType("")
    setBankName("")
    setAccNumber("")
    setAccName("")
  }

  const submitForm = async (e) => {
    e.preventDefault()

    const body = new FormData()
    body.append("full_name", name)
    body.append("email", email)
    body.append("password", password)
    body.append("image", image)
    body.append("contact_number", contact)
    body.append("description", description)
    body.append("deposit_value", deposit)
    body.append("service_type", serviceType)
    body.append("opening_hour", startOperation)
    body.append("closing_hour", endOperation)
    body.append("qr_code_image", qrcode)
    body.append("bank_name", bankName)
    body.append("beneficiary_acc_number", accNumber)
    body.append("beneficiary_name", accName)

    if(password !== confirmPassword) {
      clearField()
      toastMessage("password doens't match with confirmation")
      return
    }

    if (contact.length != 11 && contact.length != 12) {
      clearField()
      toastMessage("invalid contact number length")
      return
    }

    if (contact[0] !== '0') {
      clearField()
      toastMessage("contact number has to start with 0")
      return
    }

    if (url) {
      const response = await fetch(`${url}/service-provider/edit/${userId}`, {
        method: "POST",
        body: body,
        headers: {
          "Accept": "application/json",
          Authorization: "Bearer " + token
        },
      });

      const data = await response.json()
      console.log(data)
    
      document.cookie = `token=${data.token}`
      if (!response.ok) {
        setName("")
        setEmail("")
        setPassword("")
        setConfirmPassword("")
        setDescription("")
        setContact("")
        setDeposit("")
        setStartOperaton("")
        setEndOperaton("")
        setServiceType("")
        setBankName("")
        setAccNumber("")
        setAccName("")
        setErrors(data.errors)
        toast({
          title: 'Registration failed',
          description: 'Please try again',
          status: 'error',
          duration: 3000,
          isClosable: true
        })
        console.log(errors)
      } else {
        toast({
          title: 'Account created',
          description: 'Account is now on pending',
          status: 'success',
          duration: 3000,
          isClosable: true
        })
        setTimeout(function () {router.push('/service-providers/profile')}, 1000)
      }
    }
}

    return (
      <>
        <div>
          <div className="grid grid-cols-2 gap-4 mt-[25px]">
            <div>
              <div className="flex flex-col">
                <span className="font-semibold">Facility Name:</span>
                <input
                  type="text"
                  className="rounded-[10px] bg-transparent px-6 py-2 outline-none border border-solid border-[#E1E1E1] focus:border-[3px] focus:border-blue-500 focus:ring-blue-500 placeholder:text-xl"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                />
                 {errors && errors.full_name && <p className="text-red-500">{errors.full_name.toString()}</p>}
              </div>
              <div className="flex flex-col mt-[25px]">
                <span className="font-semibold">Email:</span>
                <input
                  type="email"
                  className="rounded-[10px] bg-transparent px-6 py-2 outline-none border border-solid border-[#E1E1E1] focus:border-[3px] focus:border-blue-500 focus:ring-blue-500 placeholder:text-xl"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
              {errors && errors.email && <p className="text-red-500">{errors.email.toString()}</p>}                
              </div>
              <div className="flex flex-col mt-[25px]">
                <span className="font-semibold">Password:</span>
                <input
                  type="password"
                  className="rounded-[10px] bg-transparent px-6 py-2 outline-none border border-solid border-[#E1E1E1] focus:border-[3px] focus:border-blue-500 focus:ring-blue-500 placeholder:text-xl"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />
                {errors && errors.password && <p className="text-red-500">{errors.password.toString()}</p>}
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
              <div className="flex flex-col mt-[25px]">
                <span className="font-semibold">Contact Number:</span>
                <input
                  type="text"
                  className="rounded-[10px] bg-transparent px-6 py-2 outline-none border border-solid border-[#E1E1E1] focus:border-[3px] focus:border-blue-500 focus:ring-blue-500 placeholder:text-xl"
                  onChange={(e) => setContact(e.target.value)}
                  value={contact}
                />
                {errors && errors.contact_number && <p className="text-red-500">{errors.contact_number.toString()}</p>}
              </div>
              <div className="flex flex-col mt-[25px]">
                <span className="font-semibold">Deposit value:</span>
                <input
                  type="text"
                  className="rounded-[10px] bg-transparent px-6 py-2 outline-none border border-solid border-[#E1E1E1] focus:border-[3px] focus:border-blue-500 focus:ring-blue-500 placeholder:text-xl"
                  onChange={(e) => setDeposit(e.target.value)}
                  value={deposit}
                />
                {errors && errors.deposit_range && <p className="text-red-500">{errors.deposit_range.toString()}</p>}
              </div>
              <div className="flex flex-col mt-[28px]">
                <label class="block text-sm font-medium dark:text-white" for="file_input">Upload Facility Image here:
                  <input id="file_input" type="file" onChange={uploadToClient} class="block w-full text-sm text-gray-900 border border-solid border-[#E1E1E1] rounded-lg cursor-pointer bg-transparent dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 file:rounded-xl file:p-2 file:bg-primary-500 hover:file:bg-primary-600 active:file:bg-primary-700" />
                </label>
                {errors && errors.image && <p className="text-red-500">{errors.image.toString()}</p>}
              </div>
              <div className="flex flex-col mt-[28px]">
                <label class="block text-sm font-medium dark:text-white" for="file_input">Upload QrCode here:
                  <input id="file_input" type="file" onChange={uploadQr} class="block w-full text-sm text-gray-900 border border-solid border-[#E1E1E1] rounded-lg cursor-pointer bg-transparent dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 file:rounded-xl file:p-2 file:bg-primary-500 hover:file:bg-primary-600 active:file:bg-primary-700" />
                </label>
                {errors && errors.qr_code_image && <p className="text-red-500">{errors.qr_code_image.toString()}</p>}
              </div>
            </div>
            <div>
              <div className="flex flex-col">
                <span className="font-semibold">Facility Description:</span>
                <textarea
                  className="rounded-[10px] h-[132px] bg-transparent px-6 py-2 outline-none border border-solid border-[#E1E1E1] focus:border-[3px] focus:border-blue-500 focus:ring-blue-500 placeholder:text-xl"
                  onChange={(e) => setDescription(e.target.value)}
                  value={description}
                />
                {errors && errors.description && <p className="text-red-500">{errors.description.toString()}</p>}
              </div>
              <div className="flex flex-col mt-[25px]">
                <span className="font-semibold">Operation Hours (start):</span>
                <input
                  type="time"
                  className="rounded-[10px] bg-transparent px-6 py-2 outline-none border border-solid border-[#E1E1E1] focus:border-[3px] focus:border-blue-500 focus:ring-blue-500 placeholder:text-xl"
                  onChange={(e) => setStartOperaton(e.target.value)}
                  value={startOperation}
                />
                {errors && errors.opening_hour && <p className="text-red-500">{errors.opening_hour.toString()}</p>}
              </div>
              <div className="flex flex-col mt-[25px]">
                <span className="font-semibold">Operation Hours (end):</span>
                <input
                  type="time"
                  className="rounded-[10px] bg-transparent px-6 py-2 outline-none border border-solid border-[#E1E1E1] focus:border-[3px] focus:border-blue-500 focus:ring-blue-500 placeholder:text-xl"
                  onChange={(e) => setEndOperaton(e.target.value)}
                  value={endOperation}
                />
                {errors && errors.closing_hour && <p className="text-red-500">{errors.closing_hour.toString()}</p>}
              </div>
              <div className="flex flex-col mt-[25px]">
                <span className="font-semibold">Service Type:</span>
                <input
                  type="text"
                  className="rounded-[10px] bg-transparent px-6 py-2 outline-none border border-solid border-[#E1E1E1] focus:border-[3px] focus:border-blue-500 focus:ring-blue-500 placeholder:text-xl"
                  onChange={(e) => setServiceType(e.target.value)}
                  value={serviceType}
                />
                {errors && errors.service_type && <p className="text-red-500">{errors.service_type.toString()}</p>}
              </div>
              <div className="flex flex-col mt-[25px]">
                <span className="font-semibold">Bank Name:</span>
                <input
                  type="text"
                  className="rounded-[10px] bg-transparent px-6 py-2 outline-none border border-solid border-[#E1E1E1] focus:border-[3px] focus:border-blue-500 focus:ring-blue-500 placeholder:text-xl"
                  onChange={(e) => setBankName(e.target.value)}
                  value={bankName}
                />
                {errors && errors.bank_name && <p className="text-red-500">{errors.bank_name.toString()}</p>}
              </div>
              <div className="flex flex-col mt-[25px]">
                <span className="font-semibold">Beneficiary Account Number:</span>
                <input
                  type="text"
                  className="rounded-[10px] bg-transparent px-6 py-2 outline-none border border-solid border-[#E1E1E1] focus:border-[3px] focus:border-blue-500 focus:ring-blue-500 placeholder:text-xl"
                  onChange={(e) => setAccNumber(e.target.value)}
                  value={accNumber}
                />
                {errors && errors.beneficiary_acc_number && <p className="text-red-500">{errors.beneficiary_acc_number.toString()}</p>}
              </div>
              <div className="flex flex-col mt-[25px]">
                <span className="font-semibold">Beneficiary Name:</span>
                <input
                  type="text"
                  className="rounded-[10px] bg-transparent px-6 py-2 outline-none border border-solid border-[#E1E1E1] focus:border-[3px] focus:border-blue-500 focus:ring-blue-500 placeholder:text-xl"
                  onChange={(e) => setAccName(e.target.value)}
                  value={accName}
                />
                {errors && errors.beneficiary_name && <p className="text-red-500">{errors.beneficiary_name.toString()}</p>}
              </div>
              
            </div>
            
          </div>
          <button
                className="mx-auto rounded-[10px] text-white flex justify-center items-center mt-[45px] hover:cursor-pointer px-24 py-3 bg-primary-500 hover:bg-primary-600 active:bg-primary-700"
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
