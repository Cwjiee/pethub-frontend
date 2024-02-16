import Navbar from "@/components/organisms/Navbar";
import BackButton from "@/components/atoms/BackButton";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { useToast } from '@chakra-ui/react'
import { GlobalContext } from "@/context";
import Image from "next/image";
import Bank from "@/../public/svg/Bank.svg"
import LoadSpinner from "@/components/atoms/LoadSpinner";
import checkAuth from "@/utils/checkAuth";

function CreateAppointment() {
  const [appointment, setAppointment] = useState({})
  const [image, setImage] = useState(null)
  const router = useRouter()
  const { token } = useContext(GlobalContext)
  const aptId = router.query.id
  const toast = useToast()
  const [isLoading, setIsLoading] = useState(true)
  const [tokenReady, setTokenReady] = useState(false)

  const url = process.env.NEXT_PUBLIC_API_URL

  useEffect(() => {
    (async () => {
      if (tokenReady) {
        const response = await fetch(`${url}/appointments/${aptId}`, {
          headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json'
          }
        })
        const result = await response.json()
        console.log(result.appointment)
        setAppointment(result.appointment)
        console.log(appointment)
      }
    })()
    setIsLoading(false)
  }, [tokenReady, url])

  useEffect(() => {
    if (token && aptId) setTokenReady(true)
  }, [token, aptId])

  const uploadToClient = (e) => {
    if (e.target.files && e.target.files[0]) {
      const i = e.target.files[0]

      setImage(i)
    }
  }

  const submitForm = async (e) => {
    e.preventDefault()

    const body = new FormData()
    body.append("upload_payment_proof", image)

    const response = await fetch(`${url}/appointments/payment_proof/${aptId}`, {
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
        title: 'Payment proof submitted',
        description: 'Please wait for admin to validate the payment',
        status: 'success',
        duration: 3000,
        isClosable: true
      })
      setTimeout(function() {router.push(`/appointments/${aptId}/status`)}, 1000)
    } else (
      toast({
        title: 'Failed to submit payment proof',
        description: 'Please try again',
        status: 'error',
        duration: 3000,
        isClosable: true
      })
    )
  }

  return !isLoading ? (
    <>
      <Navbar title={false}></Navbar>
      <div className="w-[80%] m-auto pt-6 px-1">
        <BackButton/>
      </div>
      <div className="w-[80%] sm:w-[35%] mt-12 m-auto py-11 px-20 bg-white shadow-lg rounded-[10px]">
        <div className="flex flex-col justify-between items-center gap-[50px]">
          <h2 className="font-bold text-xl text-center">Confirm Payment With Deposit</h2>
          <div>
            <Image src={Bank} width={295} height={400} alt="bank" />
          </div>
          <div>Or</div>
          {appointment && appointment.service_provider && (
            <div className="w-full p-5 border border-black flex flex-col gap-y-2">
              <div>Bank Name: {appointment.service_provider.bank_name}</div>
              <div>Bank Acc No: {appointment.service_provider.beneficiary_acc_number}</div>
              <div>Beneficary Name: {appointment.service_provider.beneficiary_name}</div>
              <div>Deposit Amount: RM {appointment.service_provider.deposit_value.toFixed(2)}</div>
            </div>
          )}
          <div className="text-justify">
            To confirm your appointment, please deposit the stated amount to the respective veterinary/pet boarder and upload proof of it.
            Your appointment status will be confirmed in 1 or 2 days. You may choose to scan the qr code or pay using the system with the details given.
          </div>
          <div className="w-full">
            <label class="block text-sm font-semibold dark:text-white" for="file_input">Upload Image
              <input id="file_input" type="file" onChange={uploadToClient} class="bg-secondary-500 block w-full text-sm text-secondary-500 border border-solid border-[#E1E1E1] rounded-lg cursor-pointer bg-transparent dark:text-gray-400 focus:outline-none dark:bg-secondary-500 dark:border-gray-600 dark:placeholder-gray-400 file:rounded-xl file:p-2 file:bg-primary-500 hover:file:bg-primary-600 active:file:bg-primary-700" />
            </label>
          </div>
          <input 
            type="submit"
            value="Submit"
            onClick={submitForm}
            className="w-full h-10 rounded-[10px] bg-primary-500 hover:bg-primary-600 active:bg-primary-700 text-white cursor-pointer"
          />
        </div>
      </div>
    </>
  ) : (
    <LoadSpinner />
  )
}

export default checkAuth(CreateAppointment)
