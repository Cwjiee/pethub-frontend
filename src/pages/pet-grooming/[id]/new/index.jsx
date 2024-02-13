import Navbar from "@/components/organisms/Navbar"
import BackButton from "@/components/atoms/BackButton"
import { Radio, RadioGroup, Stack } from '@chakra-ui/react'
import { useContext, useEffect, useState } from "react"
import { GlobalContext } from "@/context"
import Link from "next/link"
import { useRouter } from "next/router"
import LoadSpinner from "@/components/atoms/LoadSpinner"
import checkAuth from "@/utils/checkAuth"

function SelectPet() {
  const [pets, setPets] = useState()
  const [petId, setPetId] = useState('')
  const { token } = useContext(GlobalContext)
  const router = useRouter()
  const facilityId = router.query.id
  const [tokenReady, setTokenReady] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const url = process.env.NEXT_PUBLIC_API_URL

  useEffect(() => {
    (async () => {
      if (tokenReady) {
        const response = await fetch(`${url}/pets`, {
          headers: {
            'Content-type': "application/json",
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json'
          }
        })

        const data = await response.json()
        setPets(data.pets.pets)
        setIsLoading(false)
      }
    })()
  }, [tokenReady])

  useEffect(() => {
    if (token && facilityId) setTokenReady(true)
  }, [token, facilityId])

  return !isLoading ? (
    <>
      <Navbar title={false}></Navbar>
      <div className="w-[80%] m-auto flex-auto pt-6 px-1 bg-[#F3F4F6]">
        <BackButton/>
      </div>
      {pets && pets.length > 0 ? (
        <div className="w-[80%] sm:w-[25%] mt-12 m-auto py-11 px-20 bg-white flex flex-col justify-center gap-y-14 shadow-lg rounded-[10px]">
          <div className="text-lg mx-auto font-bold text-center">Select which pet would you like to make an appointment for</div>
          <div>
            <RadioGroup onChange={setPetId} value={petId}>
              <Stack direction='column'>
                {pets.map((pet) => {
                  return <Radio key={pet.pet_id} value={`${pet.pet_id}`}>{pet.pet_name}</Radio>
                })}
              </Stack>
            </RadioGroup>
          </div>
          <Link
            href={`/healthcare-facility/${facilityId}/new/${petId}`}
            className="w-full h-10 rounded-[10px] bg-primary-500 hover:bg-primary-600 active:bg-primary-700 text-white cursor-pointer flex justify-center items-center"
          >
            Next
          </Link>
        </div>
      ) : (
          <div>empty</div>
        )}
    </>
  ) : (
    <LoadSpinner />
  )
}

export default checkAuth(SelectPet)
