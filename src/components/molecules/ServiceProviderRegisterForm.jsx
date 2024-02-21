import { GlobalContext } from "@/context"
import { useToast, Input, InputGroup, InputRightElement, Button, Textarea, Select } from "@chakra-ui/react"
import { useRouter } from "next/router"
import { useContext, useState } from "react"

export default function ServiceProviderRegisterForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [contact, setContact] = useState('')
  const [deposit, setDeposit] = useState('')
  const [cert, setCert] = useState(null)
  const [image, setImage] = useState(null)
  const [qrcode, setQrcode] = useState(null)
  const [description, setDescription] = useState('')
  const [startOperation, setStartOperaton] = useState(null)
  const [endOperation, setEndOperaton] = useState(null)
  const [serviceType, setServiceType] = useState('')
  const [bankName, setBankName] = useState('')
  const [accNumber, setAccNumber] = useState('')
  const [accName, setAccName] = useState('')
  const [location, setLocation] = useState('')
  const [errors, setErrors] = useState('')
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

  const uploadCert = (e) => {
    if (e.target.files && e.target.files[0]) {
      const i = e.target.files[0]

      setCert(i)
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

  const clearRespectiveField = (err) => {
    if (err === 'password') {
      setPassword("")
      setConfirmPassword("")
      return
    }
  }

  const clearField = () => {
    setName("")
    setEmail("")
    setPassword("")
    setConfirmPassword("")
    setDescription("")
    setContact("")
    setImage(null)
    setDeposit("")
    setServiceType("")
    setStartOperaton("")
    setEndOperaton("")
    setCert(null)
    setQrcode(null)
    setBankName("")
    setAccName("")
    setAccNumber("")
    setLocation("")
  }

  const submitForm = async (e) => {
    setErrors('');
    e.preventDefault

    const body = new FormData()
    body.append("full_name", name)
    body.append("email", email)
    body.append("password", password)
    body.append("permission_level", "2")
    body.append("image", image)
    body.append("contact_number", contact)
    body.append("description", description)
    body.append("deposit_value", deposit)
    body.append("service_type", serviceType)
    body.append("opening_hour", startOperation)
    body.append("closing_hour", endOperation)
    body.append("sssm_certificate", cert)
    body.append("qr_code_image", qrcode)
    body.append("bank_name", bankName)
    body.append("beneficiary_acc_number", accNumber)
    body.append("beneficiary_name", accName)
    body.append("facility_location", location)

    if (url) {
      const response = await fetch(`${url}/register-service-provider`, {
        method: "POST",
        body: body,
        headers: {
          "Accept": "application/json",
        },
      });

      const data = await response.json()
      console.log(data);

      if (!response.ok) {
        Object.keys(data.errors).forEach(key => {
          const errorMessage = data.errors[key]
          clearRespectiveField(key)
          toastMessage(errorMessage)
        })
      } else {
        document.cookie = `token=${data.token}`
        let getToken = data.token ?? null
        let getUserId = data.user.user_id ?? null
        setToken(getToken)
        setUserId(getUserId)
        toast({
          title: data.message,
          description: 'Account is now on pending',
          status: 'success',
          duration: 3000,
          isClosable: true
        })
        setTimeout(function () {router.push('/service-providers/status')}, 1000)
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
            <div className="flex flex-col mt-[25px]">
              <span className="font-semibold">Contact Number:</span>
              <Input value={contact} type="text" onChange={(e) => setContact(e.target.value)} placeholder="0184076922" />
            </div>
            <div className="flex flex-col mt-[25px]">
              <span className="font-semibold">Deposit value (RM):</span>
              <Input value={deposit} type="text" onChange={(e) => setDeposit(e.target.value)} />
            </div>
            <div className="flex flex-col mt-[28px]">
              <label class="block text-sm font-medium dark:text-white" for="file_input">Upload SSSM Certification here:
                <input id="file_input" type="file" onChange={uploadCert} class="block w-full text-sm text-gray-900 border border-solid border-[#E1E1E1] rounded-lg cursor-pointer bg-transparent dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 file:rounded-xl file:p-2 file:bg-primary-500 hover:file:bg-primary-600 active:file:bg-primary-700" />
              </label>
            </div>
            <div className="flex flex-col mt-[28px]">
              <label class="block text-sm font-medium dark:text-white" for="file_input">Upload Facility Image here:
                <input id="file_input" type="file" onChange={uploadToClient} class="block w-full text-sm text-gray-900 border border-solid border-[#E1E1E1] rounded-lg cursor-pointer bg-transparent dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 file:rounded-xl file:p-2 file:bg-primary-500 hover:file:bg-primary-600 active:file:bg-primary-700" />
              </label>
            </div>
            <div className="flex flex-col mt-[22px]">
              <label class="block text-sm font-medium dark:text-white" for="file_input">Upload QrCode here:
                <input id="file_input" type="file" onChange={uploadQr} class="block w-full text-sm text-gray-900 border border-solid border-[#E1E1E1] rounded-lg cursor-pointer bg-transparent dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 file:rounded-xl file:p-2 file:bg-primary-500 hover:file:bg-primary-600 active:file:bg-primary-700" />
              </label>
            </div>
          </div>
          <div>
            <div className="flex flex-col">
              <span className="font-semibold">Facility Description:</span>
              <Textarea value={description} onChange={(e) => setDescription(e.target.value)} height={130} placeholder="our facility is located on the 2nd floor.../we provide free services for government staffs..."/>
            </div>
            <div className="flex flex-col mt-[25px]">
              <span className="font-semibold">Operation Hours (start):</span>
              <Input value={startOperation} type="time" onChange={(e) => setStartOperaton(e.target.value)} />
            </div>
            <div className="flex flex-col mt-[25px]">
              <span className="font-semibold">Operation Hours (end):</span>
              <Input value={endOperation} type="time" onChange={(e) => setEndOperaton(e.target.value)} />
            </div>
            <div className="flex flex-col mt-[25px]">
              <span className="font-semibold">Service Type:</span>
              <Select placeholder="select a service type" onChange={(e) => setServiceType(e.target.value)} value={serviceType}>
                <option value='grooming'>Grooming</option>
                <option value='healthcare'>Healthcare</option>
              </Select>
            </div>
            <div className="flex flex-col mt-[25px]">
              <span className="font-semibold">Facility Location:</span>
              <Input value={location} type="type" onChange={(e) => setLocation(e.target.value)} placeholder="9145 & 9146, Jalan Bandar 4, Taman Melawati..."/>
            </div>
            <div className="flex flex-col mt-[25px]">
              <span className="font-semibold">Bank Name:</span>
              <input
                type="text"
                className="rounded-[10px] bg-transparent px-6 py-2 outline-none border border-solid border-[#E1E1E1] focus:border-[3px] focus:border-blue-500 focus:ring-blue-500"
                onChange={(e) => setBankName(e.target.value)}
                value={bankName}
              />
              { errors && errors.bank_name && <p className="text-red-500">{errors.bank_name.toString()}</p> } 
            </div>
            <div className="flex flex-col mt-[25px]">
              <span className="font-semibold">Beneficiary Account Number:</span>
              <input
                type="text"
                className="rounded-[10px] bg-transparent px-6 py-2 outline-none border border-solid border-[#E1E1E1] focus:border-[3px] focus:border-blue-500 focus:ring-blue-500"
                onChange={(e) => setAccNumber(e.target.value)}
                value={accNumber}
              />
              { errors && errors.beneficiary_acc_number && <p className="text-red-500">{errors.beneficiary_acc_number.toString()}</p> } 
            </div>
            <div className="flex flex-col mt-[17px]">
              <span className="font-semibold">Beneficiary Name:</span>
              <input
                type="text"
                className="rounded-[10px] bg-transparent px-6 py-2 outline-none border border-solid border-[#E1E1E1] focus:border-[3px] focus:border-blue-500 focus:ring-blue-500"
                onChange={(e) => setAccName(e.target.value)}
                value={accName}
              />
              { errors && errors.beneficiary_name && <p className="text-red-500">{errors.beneficiary_name.toString()}</p> }
            </div>
          </div>
        </div>
        <button
          className="mx-auto rounded-[10px] text-white flex justify-center items-center mt-[45px] hover:cursor-pointer w-1/5 px-6 py-3 mb-16 bg-primary-500 hover:bg-primary-600 active:bg-primary-700"
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
