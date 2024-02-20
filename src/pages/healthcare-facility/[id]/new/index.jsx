import Navbar from "@/components/organisms/Navbar"
import BackButton from "@/components/atoms/BackButton"
import { Radio, RadioGroup, Stack } from '@chakra-ui/react'
import { useContext, useEffect, useState } from "react"
import { GlobalContext } from "@/context"
import Link from "next/link"
import { useRouter } from "next/router"
import LoadSpinner from "@/components/atoms/LoadSpinner"
import checkAuth from "@/utils/checkAuth"
import Image from "next/image"
import Empty from "@/../../public/svg/EmptyNews.svg"
import Footer from "@/components/organisms/Footer"

function SelectPet() {
  const [pets, setPets] = useState()
  const [petId, setPetId] = useState('')
  const { token } = useContext(GlobalContext)
  const router = useRouter()
  const facilityId = router.query.id
  const [tokenReady, setTokenReady] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("");

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
          
          { petId ? (
            <div>
              <p className="h-8"></p>
                  <Link
                href={`/healthcare-facility/${facilityId}/new/${petId}`}
                className="w-full h-10 rounded-[10px] bg-primary-500 hover:bg-primary-600 font-bold active:bg-primary-700 text-white cursor-pointer flex justify-center items-center"
              >
                Next
              </Link>
            </div>
          ) : (
            <div>
              {error ? (<p className="text-red-500 h-8 text-center">{error}</p>) : (<p className="h-8"></p>)}
              <button
              className="w-full h-10 rounded-[10px] bg-gray-300 text-gray-600 font-bold cursor-pointer flex justify-center items-center" 
              onClick={() => setError("Select first before proceeding")}
              >
                Next
              </button>
            </div>
          )}
        </div>
      ) : (
          <div className="flex flex-col justify-center items-center mt-20">
            <Image src={Empty} width={200} height={245} alt="empty news"/>
            <div className="flex justify-center text-2xl mx-20 mt-20 font-bold text-secondary-500">You don&apos;t have any pets in your profile</div>
            <div className="flex justify-center text-2xl mx-20 font-bold text-secondary-500">Create a profile for your pet now!</div>
          </div>
        )}
      <Footer />
    </>
  ) : (
    <LoadSpinner />
  )
}

export default checkAuth(SelectPet)
