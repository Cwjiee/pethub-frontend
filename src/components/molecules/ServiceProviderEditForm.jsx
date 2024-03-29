import { GlobalContext } from "@/context"
import { Select, useToast } from "@chakra-ui/react"
import { useRouter } from "next/router"
import { useContext, useEffect, useState } from "react"

export default function ServiceProviderEditForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showConf, setShowConf] = useState(false)
  const [contact, setContact] = useState('')
  const [deposit, setDeposit] = useState('')
  const [tokenReady, setTokenReady] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [show, setShow] = useState(false)
  const [description, setDescription] = useState('')
  const [startOperation, setStartOperaton] = useState(null)
  const [endOperation, setEndOperaton] = useState(null)
  const [serviceType, setServiceType] = useState('')
  const [bankName, setBankName] = useState('')
  const [accNumber, setAccNumber] = useState('')
  const [accName, setAccName] = useState('')
  const [location, setLocation] = useState('')
  const [errors, setErrors] = useState('');
  const router = useRouter()
  const toast = useToast()
  const url = process.env.NEXT_PUBLIC_API_URL
  const {token, userId} = useContext(GlobalContext)
  

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
        setDescription(user.description)
        setContact(user.contact_number)
        setBankName(user.bank_name) 
        setAccNumber(user.beneficiary_acc_number)
        setAccName(user.beneficiary_name)
        setStartOperaton(user.opening_hour)
        setEndOperaton(user.closing_hour)
        setLocation(user.facility_location)
        setDeposit(user.deposit_value.toFixed(2))
        setServiceType(user.service_type)
        setIsLoading(false)
      }
    })()
  }, [tokenReady])

  useEffect(() => {
    if (token) setTokenReady(true)
  }, [token])

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
    } else if (err === 'full_name') {
      setName("")
      return
    } else if (err === 'email') {
      setEmail("")
      return
    } else if (err === 'description') {
      setDescription("")
      return
    } else if (err === 'contact_number') {
      setContact("")
      return
    }
  }

  const submitForm = async (e) => {
    e.preventDefault()

    const body = new FormData()
    body.append("full_name", name)
    body.append("email", email)
    body.append("password", password)
    body.append("password_confirmation", confirmPassword)
    body.append("contact_number", contact)
    body.append("description", description)
    body.append("deposit_value", deposit)
    body.append("service_type", serviceType)
    body.append("opening_hour", startOperation)
    body.append("closing_hour", endOperation)
    body.append("bank_name", bankName)
    body.append("beneficiary_acc_number", accNumber)
    body.append("beneficiary_name", accName)
    body.append("facility_location", location)

    if (url) {
      const response = await fetch(`${url}/service-provider/edit/${userId}`, {
        method: "POST",
        body: body,
        headers: {
          "Accept": "application/json",
          "Authorization": "Bearer " + token
        },
      });

      const data = await response.json()
      console.log(data)
    
      if (!response.ok) {
        if (data.errors) {
          Object.keys(data.errors).forEach(key => {
            const errorMessage = data.errors[key]
            clearRespectiveField(key)
            toastMessage(errorMessage)
          })
        } else if (data.message) {
          clearRespectiveField("email")
          toastMessage(data.message)
        } else {
          toastMessage("Failed in editing info")
        }
      } else {
        toast({
          title: 'Account edited successfully',
          description: 'you will be directed back to profile page',
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
                  className="rounded-[10px] bg-transparent px-6 py-2 outline-none border border-solid border-[#E1E1E1] focus:border-[3px] focus:border-blue-500 focus:ring-blue-500 "
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                />
                 {errors && errors.full_name && <p className="text-red-500">{errors.full_name.toString()}</p>}
              </div>
              <div className="flex flex-col mt-[25px]">
                <span className="font-semibold">Email:</span>
                <input
                  type="email"
                  className="rounded-[10px] bg-transparent px-6 py-2 outline-none border border-solid border-[#E1E1E1] focus:border-[3px] focus:border-blue-500 focus:ring-blue-500 "
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
              {errors && errors.email && <p className="text-red-500">{errors.email.toString()}</p>}                
              </div>
              <div className="flex flex-col mt-[25px]">
                <span className="font-semibold">Password:</span>
                <input
                  type="password"
                  className="rounded-[10px] bg-transparent px-6 py-2 outline-none border border-solid border-[#E1E1E1] focus:border-[3px] focus:border-blue-500 focus:ring-blue-500 "
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />
                {errors && errors.password && <p className="text-red-500">{errors.password.toString()}</p>}
              </div>
              <div className="flex flex-col mt-[25px]">
                <span className="font-semibold">Confirm Password:</span>
                <input
                  type="password"
                  className="rounded-[10px] bg-transparent px-6 py-2 outline-none border border-solid border-[#E1E1E1] focus:border-[3px] focus:border-blue-500 focus:ring-blue-500 "
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  value={confirmPassword}
                />
              </div>
              <div className="flex flex-col mt-[25px]">
                <span className="font-semibold">Contact Number:</span>
                <input
                  type="text"
                  className="rounded-[10px] bg-transparent px-6 py-2 outline-none border border-solid border-[#E1E1E1] focus:border-[3px] focus:border-blue-500 focus:ring-blue-500 "
                  onChange={(e) => setContact(e.target.value)}
                  value={contact}
                  placeholder={"0106673148"}
                />
                {errors && errors.contact_number && <p className="text-red-500">{errors.contact_number.toString()}</p>}
              </div>
              <div className="flex flex-col mt-[25px]">
                <span className="font-semibold">Deposit value:</span>
                <input
                  type="text"
                  className="rounded-[10px] bg-transparent px-6 py-2 outline-none border border-solid border-[#E1E1E1] focus:border-[3px] focus:border-blue-500 focus:ring-blue-500 "
                  onChange={(e) => setDeposit(e.target.value)}
                  value={deposit}
                />
                {errors && errors.deposit_range && <p className="text-red-500">{errors.deposit_range.toString()}</p>}
              </div>
              <div className="flex flex-col mt-[25px]">
                <span className="font-semibold">Bank Name:</span>
                <input
                  type="text"
                  className="rounded-[10px] bg-transparent px-6 py-2 outline-none border border-solid border-[#E1E1E1] focus:border-[3px] focus:border-blue-500 focus:ring-blue-500 "
                  onChange={(e) => setBankName(e.target.value)}
                  value={bankName}
                />
                {errors && errors.bank_name && <p className="text-red-500">{errors.bank_name.toString()}</p>}
              </div>
              <div className="flex flex-col mt-[25px]">
                <span className="font-semibold">Beneficiary Account Number:</span>
                <input
                  type="text"
                  className="rounded-[10px] bg-transparent px-6 py-2 outline-none border border-solid border-[#E1E1E1] focus:border-[3px] focus:border-blue-500 focus:ring-blue-500 "
                  onChange={(e) => setAccNumber(e.target.value)}
                  value={accNumber}
                />
                {errors && errors.beneficiary_acc_number && <p className="text-red-500">{errors.beneficiary_acc_number.toString()}</p>}
              </div>
            </div>
            <div>
              <div className="flex flex-col">
                <span className="font-semibold">Facility Description:</span>
                <textarea
                  className="rounded-[10px] h-[132px] bg-transparent px-6 py-2 outline-none border border-solid border-[#E1E1E1] focus:border-[3px] focus:border-blue-500 focus:ring-blue-500 "
                  onChange={(e) => setDescription(e.target.value)}
                  value={description}
                  placeholder="our facility is located on the 2nd floor.../we provide free services for government staffs..."
                />
                {errors && errors.description && <p className="text-red-500">{errors.description.toString()}</p>}
              </div>
              <div className="flex flex-col mt-[25px]">
                <span className="font-semibold">Operation Hours (start):</span>
                <input
                  type="time"
                  className="rounded-[10px] bg-transparent px-6 py-2 outline-none border border-solid border-[#E1E1E1] focus:border-[3px] focus:border-blue-500 focus:ring-blue-500 "
                  onChange={(e) => setStartOperaton(e.target.value)}
                  value={startOperation}
                />
                {errors && errors.opening_hour && <p className="text-red-500">{errors.opening_hour.toString()}</p>}
              </div>
              <div className="flex flex-col mt-[25px]">
                <span className="font-semibold">Operation Hours (end):</span>
                <input
                  type="time"
                  className="rounded-[10px] bg-transparent px-6 py-2 outline-none border border-solid border-[#E1E1E1] focus:border-[3px] focus:border-blue-500 focus:ring-blue-500 "
                  onChange={(e) => setEndOperaton(e.target.value)}
                  value={endOperation}
                />
                {errors && errors.closing_hour && <p className="text-red-500">{errors.closing_hour.toString()}</p>}
              </div>
              <div className="flex flex-col mt-[25px]">
                <span className="font-semibold">Service Type:</span>
                <Select placeholder="select a service type" onChange={(e) => setServiceType(e.target.value)} value={serviceType}>
                  <option value='grooming'>Grooming</option>
                  <option value='healthcare'>Healthcare</option>
                </Select>
                {errors && errors.service_type && <p className="text-red-500">{errors.service_type.toString()}</p>}
              </div>
              <div className="flex flex-col mt-[25px]">
              <span className="font-semibold">Facility Location:</span>
              <input
                type="text"
                className="rounded-[10px] bg-transparent px-6 py-2 outline-none border border-solid border-[#E1E1E1] focus:border-[3px] focus:border-blue-500 focus:ring-blue-500"
                onChange={(e) => setLocation(e.target.value)}
                placeholder="9145 & 9146, Jalan Bandar 4, Taman Melawati..."
                value={location}
              />
              {errors && errors.facility_location && <p className="text-red-500">{errors.facility_location.toString()}</p>} 

            </div>
              
              <div className="flex flex-col mt-[25px]">
                <span className="font-semibold">Beneficiary Name:</span>
                <input
                  type="text"
                  className="rounded-[10px] bg-transparent px-6 py-2 outline-none border border-solid border-[#E1E1E1] focus:border-[3px] focus:border-blue-500 focus:ring-blue-500 "
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
