import Navbar from "@/components/organisms/Navbar"
import BackButton from "@/components/atoms/BackButton"
import { Radio, RadioGroup, Stack } from '@chakra-ui/react'
import { useContext, useEffect, useState } from "react"
import { GlobalContext } from "@/context"
import Link from "next/link"
import { useRouter } from "next/router"

export default function SelectPet() {
  const [pets, setPets] = useState()
  const [pet, setPet] = useState()
  const { token } = useContext(GlobalContext)
  const router = useRouter()
  const facilityId = router.query.id

  const url = process.env.NEXT_PUBLIC_API_URL

  useEffect(() => {
    (async () => {
      const response = await fetch(`${url}/pets`, {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Accept": "application/json"
        }
      })

      const result = await response.json()
      setPets(result.pets)

      console.log(result.pets)
    })()
  }, [url, token])

  return (
    <>
      <Navbar title={false}></Navbar>
      <div className="w-[80%] m-auto flex-auto pt-6 px-1 bg-[#F3F4F6]">
        <BackButton/>
      </div>
      <div className="w-[80%] sm:w-[25%] mt-12 m-auto py-11 px-20 bg-white flex flex-col justify-center gap-y-14 shadow-lg rounded-[10px]">
        <div className="text-lg mx-auto font-bold text-center">Select which pet would you like to make an appointment for</div>
        <div>
          <RadioGroup onChange={setPet} value={pet}>
            <Stack direction='column'>
              {pets && (
                pets.map((pet) => {
                  return <Radio value={pet}>{pet}</Radio>
                })
              )}
              <Radio value={pet}>{pet}</Radio>
              <Radio value={pet}>{pet}</Radio>
              <Radio value={pet}>{pet}</Radio>
            </Stack>
          </RadioGroup>
        </div>
        <Link
          href={`./healthcare-facility/${facilityId}/new/pet_id`}
          className="w-full h-10 rounded-[10px] bg-primary-500 hover:bg-primary-600 active:bg-primary-700 text-white cursor-pointer flex justify-center items-center"
        >
          Next
        </Link>
      </div>
    </>
  )
}
