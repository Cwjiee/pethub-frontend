import Navbar from "@/components/organisms/Navbar"
import BackButton from "@/components/atoms/BackButton"
import Image from "next/image"
import SpPlaceholder from "@/../public/svg/SpPlaceholder.svg"
import Link from "next/link"
import { useRouter } from "next/router"
import { useState, useEffect, useContext } from "react"
import LoadSpinner from "@/components/atoms/LoadSpinner"
import { GlobalContext } from "@/context"
import TimeConvert from "@/utils/TimeConvert"
import checkAuth from "@/utils/checkAuth"

function HealthcareFacilityInfo() {
  const router = useRouter()
  const { token } = useContext(GlobalContext)
  const [tokenReady, setTokenReady] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const facilityId = router.query.id
  const [healthcare, setHealthcare] = useState()
  const [time, setTime] = useState({})

  const url = process.env.NEXT_PUBLIC_API_URL

  useEffect(() => {
    (async () => {
      if (tokenReady) {
        const response = await fetch(`${url}/healthcare/${facilityId}`, {
          headers: {
            'Content-type': "application/json",
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json'
          }
        })

        const data = await response.json()
        console.log(data)
        setHealthcare(data.service_provider)
        setIsLoading(false)
      }
    })()
  }, [tokenReady])

  useEffect(() => {
    if (token && facilityId) setTokenReady(true)
  }, [token, facilityId])

  useEffect(() => {
    if(healthcare) {
      timeBlock(healthcare.opening_hour, healthcare.closing_hour)
    }
  }, [healthcare])

  const timeBlock = (openTimeString, closeTimeString) => {
    setTime(TimeConvert(openTimeString, closeTimeString))
  }

  return !isLoading ? (
    <>
      <Navbar title={false}></Navbar>
      <div className="w-[80%] m-auto pt-6 px-6">
        <BackButton/>
        <div className="mt-7 flex flex-col gap-12 w-full mx-auto justify-center items-center">
          <div className="ring-[5px] ring-white rounded-[10px]">
            <img src={healthcare.image} width={320} height={210} alt="service-provider-image" />
          </div>
          <div className="shadow-lg rounded-[10px] p-10 bg-white w-[70%] flex flex-col gap-y-12">
            <div className="flex flex-col gap-y-4">
              <div>Name: {healthcare.full_name}</div>
              <div>Contact Number:  {healthcare.contact_number}</div>
              <div>Opening Hours: {`${time.openTime} to ${time.closeTime}`}</div>
              <div>Service Type: {healthcare.service_type}</div>
              <div>Deposit Range: RM{healthcare.deposit_value.toFixed(2)}</div>
            </div>
            <div className="flex flex-col gap-y-5">
              <div className="font-semibold">About {healthcare.full_name}</div>
              <div>{healthcare.description}</div>
            </div>
          </div>
          <Link
            href={`./${facilityId}/new/`}
            className="w-[20%] h-12 rounded-[10px] bg-primary-500 hover:bg-primary-600 active:bg-primary-700 text-white cursor-pointer flex justify-center items-center"
          >
            Book Now
          </Link>
        </div>
      </div>
    </>
  ) : (
    <LoadSpinner />
  )
}

export default checkAuth(HealthcareFacilityInfo)
