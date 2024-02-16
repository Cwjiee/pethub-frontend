import Navbar from "@/components/organisms/Navbar";
import BackButton from "@/components/atoms/BackButton";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { useToast } from '@chakra-ui/react'
import { GlobalContext } from "@/context";

function CreateAppointment() {
  const [date, setDate] = useState()
  const [time, setTime] = useState()
  const [issue, setIssue] = useState()
  const [details, setDetails] = useState()

  const router = useRouter()
  const petSpId = router.query.id
  const petId = router.query.pet_id
  const { token, userId } = useContext(GlobalContext)
  const toast = useToast()

  const url = process.env.NEXT_PUBLIC_API_URL

  const submitForm = async (e) => {
    e.preventDefault()

    const response = await fetch(`${url}/appointments`, {
      method: "POST",
      body: JSON.stringify({
        user_id: userId,
        pet_id: petId,
        pet_service_provider_ref: petSpId,
        appointment_type: "healthcare",
        date: date,
        time: time,
        issue_description: issue,
        important_details: details,
      }),
      headers: {
        "Accept": "application/json",
        "Authorization": `Bearer ${token}`,
        "Content-type": "application/json"
      },
    })

    console.log(response)
    const result = await response.json()
    const aptId = result.appointment.appointment_id

    if (response.ok) {
      toast({
        title: 'Appointment created',
        description: 'Please wait for admin approve appointment',
        status: 'success',
        duration: 3000,
        isClosable: true
      })
      setTimeout(function() {router.push(`/appointments/${aptId}/confirm`)}, 1000)
    } else {
      setDate('')
      setTime('')
      setIssue('')
      setDetails('')

      toast({
        title: 'Failed to create appointment',
        description: 'Please try again',
        status: 'error',
        duration: 3000,
        isClosable: true
      })
    }
  }

  return (
    <>
      <Navbar title={false}></Navbar>
      <div className="w-[80%] m-auto pt-6 px-1">
        <BackButton/>
      </div>
      <form 
        onSubmit={submitForm}
        className="w-[80%] sm:w-[40%] mt-10 m-auto py-11 px-20 bg-white shadow-lg rounded-[10px]"
      >
        <div className="flex flex-col justify-between gap-[50px]">
          <h2 className="mx-auto font-bold text-xl">Make Appointment for Pet A</h2>
          <div>
            <div className="font-semibold">Appointment Date:</div>
            <input 
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full h-10 rounded-[10px] border-2 border-neutral-200 p-2 placeholder:text-md outline-neutral-500"
            /> 
          </div>
          <div>
            <div className="font-semibold">Appointment Time:</div>
            <input 
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full h-10 rounded-[10px] border-2 border-neutral-200 p-2 placeholder:text-md outline-neutral-500"
            /> 
          </div>
          <div>
            <div className="font-semibold">Issues of pet:</div>
            <textarea
              id="issue"
              rows="4"
              class="block p-2.5 px-6 w-full h-52 text-gray-900 rounded-[10px] border border-neutral-200 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your content here..."
              onChange={(e) => setIssue(e.target.value)}
              value={issue}
            >
            </textarea>
          </div> 
          <div>
            <div className="font-semibold">Important details of pet:</div>
            <textarea
              id="details"
              rows="4"
              class="block p-2.5 px-6 w-full h-52 text-gray-900 rounded-[10px] border border-neutral-200 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your content here..."
              onChange={(e) => setDetails(e.target.value)}
              value={details}
            >
            </textarea>
          </div> 
          <input 
            type="submit"
            value="Submit"
            className="w-full h-14 rounded-[10px] text-lg font-semibold bg-primary-500 hover:bg-primary-600 active:bg-primary-700 text-white cursor-pointer"
          />
        </div>
      </form>
    </>
  )
}

export default checkAuth(CreateAppointment)
